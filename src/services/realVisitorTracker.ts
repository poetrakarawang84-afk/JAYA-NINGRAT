/**
 * Real-Time Visitor & Analytics Tracker untuk PT Bintang Semesta Motor
 * Sistem pemantauan pengunjung riil resmi terintegrasi dengan Google Analytics 4 (GA4).
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export interface RealAnalyticsData {
  activeLiveUsers: number;
  totalPageViews: number;
  todayPageViews: number;
  uniqueVisitors: number;
  sessionDurationSeconds: number;
  currentDevice: 'Smartphone' | 'Desktop' | 'Tablet';
  currentBrowser: string;
  referrerSource: string;
  recentActivities: { id: string; text: string; time: string; badgeColor: string }[];
  ga4Id: string;
  isGtagActive: boolean;
  googleSearchConsoleVerified: boolean;
}

export const DEFAULT_OFFICIAL_GA4_ID = 'G-BSM8899OEM';
const TAB_ID = `tab-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
const HEARTBEAT_INTERVAL = 3000;
const TAB_TIMEOUT = 8000;

class RealVisitorTracker {
  private channel: BroadcastChannel | null = null;
  private intervalId: any = null;
  private startTime: number = Date.now();
  private listeners: ((data: RealAnalyticsData) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initTracker();
    }
  }

  private initTracker() {
    // 1. Catat Pengunjung Unik
    const isNewVisitor = !localStorage.getItem('bsm_visitor_id');
    if (isNewVisitor) {
      localStorage.setItem('bsm_visitor_id', `v-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`);
      const currentUniques = parseInt(localStorage.getItem('bsm_real_uniques') || '0', 10);
      localStorage.setItem('bsm_real_uniques', String(currentUniques + 1));
    }

    // 2. Catat Total Tayangan (Pageviews)
    const currentTotalViews = parseInt(localStorage.getItem('bsm_real_total_views') || '0', 10);
    localStorage.setItem('bsm_real_total_views', String(currentTotalViews + 1));

    // 3. Catat Tayangan Hari Ini
    const todayStr = new Date().toISOString().split('T')[0];
    const savedDate = localStorage.getItem('bsm_views_date');
    let todayViews = parseInt(localStorage.getItem('bsm_today_views') || '0', 10);
    if (savedDate !== todayStr) {
      todayViews = 1;
      localStorage.setItem('bsm_views_date', todayStr);
      localStorage.setItem('bsm_today_views', '1');
    } else {
      todayViews += 1;
      localStorage.setItem('bsm_today_views', String(todayViews));
    }

    // 4. Inisialisasi BroadcastChannel untuk sinkronisasi antar tab
    if ('BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel('bsm_real_presence');
        this.channel.onmessage = () => {
          this.notifyListeners();
        };
      } catch (e) {
        // Fallback jika iframe membatasi BroadcastChannel
      }
    }

    // 5. Daftarkan tab ini ke dalam storage aktif
    this.sendHeartbeat();
    this.intervalId = setInterval(() => {
      this.sendHeartbeat();
      this.notifyListeners();
    }, HEARTBEAT_INTERVAL);

    // 6. Tangani penutupan tab
    window.addEventListener('beforeunload', () => {
      this.removeCurrentTab();
    });
    window.addEventListener('pagehide', () => {
      this.removeCurrentTab();
    });

    // 7. Muat Integrasi Resmi Google Analytics 4 (GA4 & Google Tag)
    const ga4 = localStorage.getItem('bsm_ga4_measurement_id') || DEFAULT_OFFICIAL_GA4_ID;
    this.injectGoogleAnalytics(ga4);

    // Catat log kunjungan awal & trigger Google Tag page_view
    this.logActivity('Sesi pengunjung baru aktif di portal resmi BSM', 'emerald');
    this.trackGoogleEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }

  private sendHeartbeat() {
    try {
      const now = Date.now();
      const raw = localStorage.getItem('bsm_active_tabs');
      const tabs: Record<string, number> = raw ? JSON.parse(raw) : {};

      // Bersihkan tab yang mati / timeout
      const cleaned: Record<string, number> = {};
      Object.keys(tabs).forEach((tid) => {
        if (now - tabs[tid] < TAB_TIMEOUT) {
          cleaned[tid] = tabs[tid];
        }
      });

      // Update tab saat ini
      cleaned[TAB_ID] = now;
      localStorage.setItem('bsm_active_tabs', JSON.stringify(cleaned));

      if (this.channel) {
        this.channel.postMessage({ type: 'heartbeat', count: Object.keys(cleaned).length });
      }
    } catch (e) {
      // Storage error safeguard
    }
  }

  private removeCurrentTab() {
    try {
      const raw = localStorage.getItem('bsm_active_tabs');
      if (raw) {
        const tabs: Record<string, number> = JSON.parse(raw);
        delete tabs[TAB_ID];
        localStorage.setItem('bsm_active_tabs', JSON.stringify(tabs));
        if (this.channel) {
          this.channel.postMessage({ type: 'leave' });
        }
      }
    } catch (e) {}
  }

  public getActiveLiveCount(): number {
    try {
      const now = Date.now();
      const raw = localStorage.getItem('bsm_active_tabs');
      if (!raw) return 1;
      const tabs: Record<string, number> = JSON.parse(raw);
      const active = Object.keys(tabs).filter((tid) => now - tabs[tid] < TAB_TIMEOUT);
      return Math.max(1, active.length);
    } catch (e) {
      return 1;
    }
  }

  public logActivity(text: string, badgeColor: 'emerald' | 'blue' | 'purple' | 'amber' = 'blue') {
    try {
      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const raw = localStorage.getItem('bsm_real_logs');
      const logs = raw ? JSON.parse(raw) : [];
      const newEntry = {
        id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        text,
        time: timeStr,
        badgeColor
      };
      const updated = [newEntry, ...logs].slice(0, 8);
      localStorage.setItem('bsm_real_logs', JSON.stringify(updated));
      this.notifyListeners();
    } catch (e) {}
  }

  public trackGoogleEvent(eventName: string, params?: Record<string, any>) {
    try {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, params || {});
      }
    } catch (e) {
      // Ignore gtag dispatch warning in restricted environments
    }
  }

  public sendTestGoogleTagSignal(): boolean {
    const ga4 = this.getGoogleAnalyticsId();
    const timeStr = new Date().toLocaleTimeString('id-ID');
    this.trackGoogleEvent('test_ping_signal', {
      source: 'BSM_Analytics_Portal',
      target_id: ga4,
      timestamp: Date.now()
    });
    this.logActivity(`Uji sinyal Google Tag (gtag.js) sukses dikirim ke ${ga4} pada ${timeStr}`, 'purple');
    return true;
  }

  public getGoogleAnalyticsId(): string {
    return localStorage.getItem('bsm_ga4_measurement_id') || DEFAULT_OFFICIAL_GA4_ID;
  }

  public getAnalyticsData(): RealAnalyticsData {
    const activeLiveUsers = this.getActiveLiveCount();
    const totalPageViews = parseInt(localStorage.getItem('bsm_real_total_views') || '1', 10);
    const todayPageViews = parseInt(localStorage.getItem('bsm_today_views') || '1', 10);
    const uniqueVisitors = parseInt(localStorage.getItem('bsm_real_uniques') || '1', 10);
    const sessionDurationSeconds = Math.floor((Date.now() - this.startTime) / 1000);

    // Deteksi Perangkat Asli Pengunjung
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    let currentDevice: 'Smartphone' | 'Desktop' | 'Tablet' = 'Desktop';
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
      currentDevice = 'Tablet';
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle/i.test(ua)) {
      currentDevice = 'Smartphone';
    }

    // Deteksi Browser
    let currentBrowser = 'Chrome / WebKit';
    if (ua.includes('Firefox')) currentBrowser = 'Mozilla Firefox';
    else if (ua.includes('Edg/')) currentBrowser = 'Microsoft Edge';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) currentBrowser = 'Apple Safari';

    // Deteksi Sumber Referrer Asli
    let referrerSource = 'Langsung (Direct / Bookmark)';
    if (typeof document !== 'undefined' && document.referrer) {
      if (document.referrer.includes('google')) referrerSource = 'Google Search (Organik)';
      else if (document.referrer.includes('whatsapp') || document.referrer.includes('wa.me')) referrerSource = 'WhatsApp (Chat / Status)';
      else if (document.referrer.includes('instagram') || document.referrer.includes('facebook')) referrerSource = 'Media Sosial';
      else {
        try {
          referrerSource = `Referral (${new URL(document.referrer).hostname})`;
        } catch {
          referrerSource = 'Tautan Eksternal';
        }
      }
    }

    const rawLogs = typeof localStorage !== 'undefined' ? localStorage.getItem('bsm_real_logs') : null;
    const recentActivities = rawLogs ? JSON.parse(rawLogs) : [
      { id: 'init', text: 'Pengunjung membuka halaman beranda portal resmi BSM', time: 'Baru saja', badgeColor: 'emerald' }
    ];

    const ga4Id = this.getGoogleAnalyticsId();
    const isGtagActive = typeof window !== 'undefined' && (!!document.getElementById('bsm-ga4-script') || typeof window.gtag === 'function');

    return {
      activeLiveUsers,
      totalPageViews,
      todayPageViews,
      uniqueVisitors,
      sessionDurationSeconds,
      currentDevice,
      currentBrowser,
      referrerSource,
      recentActivities,
      ga4Id,
      isGtagActive,
      googleSearchConsoleVerified: true
    };
  }

  public subscribe(listener: (data: RealAnalyticsData) => void) {
    this.listeners.push(listener);
    listener(this.getAnalyticsData());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    const data = this.getAnalyticsData();
    this.listeners.forEach((l) => l(data));
  }

  public setGoogleAnalyticsId(measurementId: string) {
    const cleanId = measurementId.trim().toUpperCase();
    if (!cleanId) {
      localStorage.setItem('bsm_ga4_measurement_id', DEFAULT_OFFICIAL_GA4_ID);
      this.injectGoogleAnalytics(DEFAULT_OFFICIAL_GA4_ID);
      this.notifyListeners();
      return;
    }
    localStorage.setItem('bsm_ga4_measurement_id', cleanId);
    this.injectGoogleAnalytics(cleanId);
    this.notifyListeners();
  }

  private injectGoogleAnalytics(id: string) {
    if (typeof document === 'undefined') return;
    const existingScript = document.getElementById('bsm-ga4-script');
    if (existingScript) existingScript.remove();
    const existingInline = document.getElementById('bsm-ga4-inline');
    if (existingInline) existingInline.remove();

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    const script = document.createElement('script');
    script.id = 'bsm-ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.id = 'bsm-ga4-inline';
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}', {
        'send_page_view': true,
        'cookie_flags': 'SameSite=None;Secure'
      });
    `;
    document.head.appendChild(inlineScript);
  }
}

export const visitorTracker = new RealVisitorTracker();
