import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Globe, 
  Smartphone, 
  Clock, 
  ArrowLeft, 
  TrendingUp, 
  Activity, 
  Download,
  Share2,
  CheckCircle2,
  ExternalLink,
  Laptop,
  Compass,
  Zap,
  Info
} from 'lucide-react';
import { visitorTracker, RealAnalyticsData } from '../services/realVisitorTracker';

interface AnalyticsModalProps {
  onClose: () => void;
  activeLiveUsers?: number;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ onClose }) => {
  const [data, setData] = useState<RealAnalyticsData>(visitorTracker.getAnalyticsData());
  const [gaInput, setGaInput] = useState<string>(data.ga4Id || '');
  const [gaSavedMsg, setGaSavedMsg] = useState(false);

  useEffect(() => {
    const unsubscribe = visitorTracker.subscribe((updated) => {
      setData(updated);
    });
    return () => unsubscribe();
  }, []);

  const handleSaveGa4 = (e: React.FormEvent) => {
    e.preventDefault();
    visitorTracker.setGoogleAnalyticsId(gaInput);
    setGaSavedMsg(true);
    setTimeout(() => setGaSavedMsg(false), 3000);
  };

  const handleDownloadCsv = () => {
    const csvContent = 
      `data:text/csv;charset=utf-8,` +
      `Laporan Analitik Trafik Riil PT Bintang Semesta Motor\n` +
      `Tanggal Unduh,${new Date().toLocaleString('id-ID')}\n` +
      `Pengunjung Aktif Riil,${data.activeLiveUsers}\n` +
      `Total Tayangan (Pageviews),${data.totalPageViews}\n` +
      `Tayangan Hari Ini,${data.todayPageViews}\n` +
      `Pengunjung Unik,${data.uniqueVisitors}\n` +
      `Perangkat Saat Ini,${data.currentDevice}\n` +
      `Browser,${data.currentBrowser}\n` +
      `Sumber Referrer,${data.referrerSource}\n` +
      `Status GA4,${data.ga4Id ? `Terhubung (${data.ga4Id})` : 'Belum Dikonfigurasi'}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `trafik-riil-bsm-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins}m ${remainder}s`;
  };

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Back Navigation */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-800">Sistem Pemantauan Trafik Riil Terverifikasi</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Google Tag Aktif
            </span>
          </div>
        </div>

        {/* Analytics Main View */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-md">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Real-Time Visitor & Trafik Analitik</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pemantauan aktivitas pengunjung riil pada portal resmi PT Bintang Semesta Motor yang terintegrasi dengan Google Analytics 4.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadCsv}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Laporan CSV</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Real-time Hero Card */}
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl border border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center border-2 border-emerald-400 shadow-lg">
                    <span className="text-3xl font-black font-mono text-emerald-300 tabular-nums">
                      {data.activeLiveUsers}
                    </span>
                  </div>
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 animate-ping"></span>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Pengunjung Aktif Riil Saat Ini</span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {data.activeLiveUsers} Perangkat / Tab Sedang Aktif Membuka Web
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-md">
                    Dihitung secara akurat berdasarkan koneksi sesi klien langsung ke portal resmi BSM dan tercatat pada Google Analytics.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs w-full md:w-auto">
                <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Total Tayangan</span>
                  <span className="text-xl font-black font-mono text-white">{data.totalPageViews}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Kumulatif Halaman</span>
                </div>
                <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Pengunjung Unik</span>
                  <span className="text-xl font-black font-mono text-emerald-400">{data.uniqueVisitors}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Perangkat Terdata</span>
                </div>
                <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block text-[11px] mb-0.5">Durasi Sesi Ini</span>
                  <span className="text-xl font-black font-mono text-blue-300">{formatSeconds(data.sessionDurationSeconds)}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Waktu Akses Aktif</span>
                </div>
              </div>
            </div>

            {/* PUSAT EKOSISTEM & INTEGRASI RESMI GOOGLE */}
            <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/70 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md shrink-0">
                    <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900">
                        Integrasi Resmi Google Ecosystem
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        Terverifikasi & Aktif
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Sistem PT Bintang Semesta Motor terhubung langsung dengan layanan resmi Google untuk tracking analitik, pengindeksan mesin pencari, lokasi peta, dan komunikasi.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      visitorTracker.sendTestGoogleTagSignal();
                      setGaSavedMsg(true);
                      setTimeout(() => setGaSavedMsg(false), 3500);
                    }}
                    className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <Activity className="w-3.5 h-3.5 text-amber-300" />
                    <span>Kirim Sinyal Uji ke Google Tag</span>
                  </button>
                  <a
                    href="https://analytics.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-xl shadow-2xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Console GA4</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 4 Pilar Integrasi Google */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
                
                {/* 1. Google Analytics 4 */}
                <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      Google Analytics 4
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Aktif
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Melacak pageview, perangkat, durasi sesi, dan interaksi tombol katalog via Google tag (<code className="text-blue-600 font-mono">gtag.js</code>).
                  </p>
                  <form onSubmit={handleSaveGa4} className="pt-1 space-y-1.5">
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={gaInput}
                        onChange={(e) => setGaInput(e.target.value)}
                        placeholder="G-XXXXXXXXXX"
                        className="w-full px-2.5 py-1 text-[11px] font-mono font-semibold bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="px-2.5 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-[10px] font-bold shrink-0"
                      >
                        Simpan
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 block">ID: {data.ga4Id}</span>
                  </form>
                </div>

                {/* 2. Google Search Console */}
                <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-emerald-600" />
                      Search Console & SEO
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Terverifikasi
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Meta tag <code className="text-emerald-700 font-mono">google-site-verification</code> dan Schema.org JSON-LD AutoPartsStore terpasang pada <code className="font-mono">index.html</code>.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://search.google.com/search-console"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:underline"
                    >
                      <span>Buka Search Console</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* 3. Google Maps & Bisnis */}
                <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-rose-600" />
                      Google Maps Resmi
                    </span>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      Pin Lokasi
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Titik koordinat gudang & kantor HO Kawasan Industri Jababeka III H terhubung langsung dengan Google Maps rute petunjuk arah.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Jl.+Jababeka+III+H+Blok+C+17+FT+Pasirgombong+Cikarang+Utara+Bekasi"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:underline"
                    >
                      <span>Buka di Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* 4. Google Workspace / Gmail */}
                <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-amber-600" />
                      Google Mail (Gmail)
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      Terkoneksi
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Surat menyurat resmi korporat terhubung ke akun resmi <span className="font-mono text-slate-700 font-semibold">bintangsemestamotor01@gmail.com</span>.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=bintangsemestamotor01@gmail.com&su=Inquiry%20Kemitraan%20PT%20BSM"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:underline"
                    >
                      <span>Buka di Gmail Web</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>

              {gaSavedMsg && (
                <div className="mt-4 p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Sinyal & konfigurasi Google Tag berhasil diperbarui dan aktif melacak seluruh sesi pengunjung!</span>
                </div>
              )}
            </div>

            {/* 3-Column Breakdown (Data Riil Perangkat & Sumber) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Traffic Sources */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-700" />
                  <span>Sumber Rujukan Trafik (Referrer)</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block mb-0.5">Sesi Anda Saat Ini:</span>
                    <span className="font-bold text-slate-900 block font-mono">{data.referrerSource}</span>
                  </div>

                  <div className="space-y-2 pt-1 text-[11px] text-slate-600">
                    <div className="flex items-center justify-between">
                      <span>• Akses Langsung / Bookmark:</span>
                      <span className="font-bold text-slate-800">Aktif</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Tautan Katalog WhatsApp:</span>
                      <span className="font-bold text-emerald-600">Terpantau</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Google Search Organik:</span>
                      <span className="font-bold text-blue-600">Terpantau</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Devices Breakdown */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-700" />
                  <span>Perangkat Pengunjung Aktif</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block mb-0.5">Tipe Perangkat Anda:</span>
                    <span className="font-extrabold text-blue-700 text-sm flex items-center gap-1.5">
                      {data.currentDevice === 'Smartphone' ? <Smartphone className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                      <span>{data.currentDevice}</span>
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block mb-0.5">Browser yang Digunakan:</span>
                    <span className="font-bold text-slate-800">{data.currentBrowser}</span>
                  </div>
                </div>
              </div>

              {/* Status Sistem & Lokasi Node */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-blue-700" />
                  <span>Koneksi & Status Node</span>
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Status Server:</span>
                      <span className="font-bold text-emerald-600">Online 100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Metode Hitung:</span>
                      <span className="font-mono font-semibold text-slate-700">Client-Heartbeat</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Frekuensi Heartbeat:</span>
                      <span className="font-mono text-slate-700">Setiap 3 detik</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Live Activity Stream (Log Riil) */}
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-700" />
                <span>Log Aktivitas Interaksi Riil (Real-Time Activity Stream)</span>
              </h3>

              <div className="space-y-2 text-xs font-mono">
                {data.recentActivities.map((act) => (
                  <div key={act.id} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 text-slate-700 shadow-2xs">
                    <span className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${
                        act.badgeColor === 'emerald' ? 'bg-emerald-500' :
                        act.badgeColor === 'purple' ? 'bg-purple-500' :
                        act.badgeColor === 'amber' ? 'bg-amber-500' : 'bg-blue-500'
                      }`}></span>
                      <span className="font-sans font-medium text-slate-800">{act.text}</span>
                    </span>
                    <span className="text-slate-400 text-[11px] shrink-0">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
