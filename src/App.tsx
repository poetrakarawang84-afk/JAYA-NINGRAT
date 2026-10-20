import React, { useState, useEffect } from 'react';
import { Product, Testimonial, BlogPost, PageView } from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_TESTIMONIALS, 
  INITIAL_BLOG_POSTS 
} from './data/initialData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { TestimonialGallery } from './components/TestimonialGallery';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { CmsAdminModal } from './components/CmsAdminModal';
import { AnalyticsModal } from './components/AnalyticsModal';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';
import { AdminLoginModal } from './components/AdminLoginModal';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Award, 
  CheckCircle2, 
  ShoppingBag,
  Clock,
  Star,
  Building2,
  PhoneCall,
  MessageCircle
} from 'lucide-react';

export default function App() {
  // Navigation View State (Separate Pages for Company Profile & Products)
  const [activeView, setActiveView] = useState<PageView>('home');

  // CMS Admin Authentication Gate State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('bsm_admin_auth') === 'true';
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Master Data State with LocalStorage Persistence
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bsm_custom_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('bsm_custom_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('bsm_custom_blog_posts');
    return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
  });

  // Real-time visitor simulation
  const [activeLiveUsers, setActiveLiveUsers] = useState<number>(34);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLiveUsers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(18, Math.min(52, prev + delta));
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // In-app Push Notification State
  const [currentNotification, setCurrentNotification] = useState<{
    id: string;
    title: string;
    body: string;
  } | null>(null);

  const handleTriggerNotification = (title: string, body: string) => {
    const notif = {
      id: `notif-${Date.now()}`,
      title,
      body
    };
    setCurrentNotification(notif);

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, { body, icon: '/favicon.ico' });
      } catch (err) {
        // Ignore native error in iframe sandbox
      }
    }

    setTimeout(() => {
      setCurrentNotification((cur) => (cur?.id === notif.id ? null : cur));
    }, 6000);
  };

  const handleAddTestimonial = (testi: Omit<Testimonial, 'id' | 'date'>) => {
    const newTestimonial: Testimonial = {
      ...testi,
      id: `testi-${Date.now()}`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('bsm_custom_testimonials', JSON.stringify(updated));
    handleTriggerNotification('Ulasan Diterima!', 'Terima kasih atas testimoni kemitraan bersama PT BSM.');
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('bsm_custom_products');
    localStorage.removeItem('bsm_custom_blog_posts');
    localStorage.removeItem('bsm_custom_testimonials');
    setProducts(INITIAL_PRODUCTS);
    setBlogPosts(INITIAL_BLOG_POSTS);
    setTestimonials(INITIAL_TESTIMONIALS);
    handleTriggerNotification('Data Direset', 'Semua katalog dan konten telah dikembalikan ke default.');
  };

  // Auth Gate Handlers for CMS
  const handleRequestOpenCms = () => {
    if (sessionStorage.getItem('bsm_admin_auth') === 'true') {
      setActiveView('cms');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsLoginModalOpen(false);
    setActiveView('cms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleTriggerNotification('Akses Terverifikasi', 'Selamat datang di Panel Manajemen Konten (CMS) PT BSM.');
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('bsm_admin_auth');
    setIsAdminAuthenticated(false);
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleTriggerNotification('Sesi Ditutup', 'Panel CMS telah dikunci kembali untuk keamanan data.');
  };

  const navigateTo = (view: PageView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4 Produk Terpopuler untuk Teaser di Halaman Beranda
  const popularProducts = products.filter(p => p.isPopular).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Bar Navigation */}
      <Header 
        activeView={activeView} 
        setActiveView={setActiveView} 
        activeLiveUsers={activeLiveUsers}
        onOpenCms={handleRequestOpenCms}
      />

      {/* Admin Login Verification Gate Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Global In-App Notification Toast */}
      <NotificationToast 
        notification={currentNotification} 
        onDismiss={() => setCurrentNotification(null)} 
      />

      {/* Breadcrumb Navigation Bar (Tampil di Halaman Terpisah) */}
      {activeView !== 'home' && activeView !== 'cms' && activeView !== 'analytics' && (
        <div className="bg-white border-b border-slate-200 py-3 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-500 overflow-x-auto py-1">
              <button 
                onClick={() => navigateTo('home')} 
                className="hover:text-blue-700 font-medium whitespace-nowrap"
              >
                Beranda
              </button>
              <span>/</span>
              <span className="font-bold text-slate-900 whitespace-nowrap">
                {activeView === 'katalog' && 'Katalog Suku Cadang & Pelumas Resmi'}
                {activeView === 'testimoni' && 'Testimoni & Kemitraan Bengkel'}
                {activeView === 'blog' && 'Berita, Tips & Wawasan Otomotif'}
                {activeView === 'kontak' && 'Kontak & Jaringan Gudang Distribusi'}
              </span>
            </div>

            <button 
              onClick={() => navigateTo('home')}
              className="hidden sm:inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 font-semibold"
            >
              <span>← Kembali ke Beranda</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area: Render Halaman Terpisah Sesuai Tab yang Dipilih */}
      <main className="flex-grow">
        
        {/* ======================================================== */}
        {/* 1. HALAMAN BERANDA (HOME)                                */}
        {/* ======================================================== */}
        {activeView === 'home' && (
          <div>
            <HeroSection
              onExploreProducts={() => navigateTo('katalog')}
              onContactClick={() => navigateTo('kontak')}
            />

            {/* Keunggulan Distribusi BSM (4 Pilar) */}
            <section className="py-16 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
                    Keunggulan Distribusi BSM
                  </h2>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Mitra Terpercaya untuk Efisiensi & Kecepatan Pasokan Bengkel
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">100% Standar OEM</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Seluruh produk suku cadang dan pelumas melalui uji kontrol presisi tinggi dan bergaransi resmi pabrik.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                      <Truck className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">Pengiriman 48 Jam</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Armada kargo terpadu melayani pengiriman kilat langsung ke pintu bengkel rekanan di seluruh pulau Jawa.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">Harga Grosir Mitra</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Skema harga grosir langsung dari distributor dengan margin keuntungan optimal bagi pemilik bengkel dan toko sparepart.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">Stok Selalu Siap</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Kapasitas pergudangan modern menjamin ketersediaan ribuan varian oli, busi, ban, dan kampas rem setiap hari.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* TEASER KATALOG PRODUK UNGGULAN */}
            <section className="py-16 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                      Katalog Pilihan
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Suku Cadang & Pelumas Terlaris
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Produk pilihan utama dengan perputaran paling cepat di ribuan bengkel rekanan
                    </p>
                  </div>

                  <button
                    onClick={() => navigateTo('katalog')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-all hover:gap-3"
                  >
                    <span>Buka Semua Katalog ({products.length} Item)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {popularProducts.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => navigateTo('katalog')}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded">
                          {product.code}
                        </div>
                        <div className="absolute top-2.5 right-2.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          Terlaris
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[11px] text-slate-500 block mb-1">{product.category}</span>
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mb-2 group-hover:text-blue-700 transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-blue-700">
                            Rp {product.price.toLocaleString('id-ID')}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">
                            Satuan: {product.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  <button
                    onClick={() => navigateTo('katalog')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-blue-600 hover:text-blue-700 text-slate-700 text-xs font-bold shadow-2xs transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                    <span>Lihat Seluruh Daftar Produk & Spesifikasi OEM Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* PROFIL PERUSAHAAN & KEMITRAAN B2B BANNER */}
            <section className="py-14 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-blue-900/30 p-8 sm:p-10 rounded-2xl border border-blue-700/50">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-3">
                      <Building2 className="w-3.5 h-3.5 text-blue-300" />
                      <span>Jaringan Distribusi Terpercaya Indonesia</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                      Solusi Pasokan Sparepart Lengkap untuk Bengkel Anda
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      Didukung pergudangan modern dan jaringan pengiriman terpadu, PT Bintang Semesta Motor siap membantu pertumbuhan bisnis toko suku cadang dan bengkel rekanan dengan pasokan konsisten dan jaminan produk 100% orisinil.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => navigateTo('katalog')}
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Jelajahi Produk Kami</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => navigateTo('kontak')}
                        className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span>Hubungi Tim Kemitraan</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-6 rounded-xl border border-slate-800 text-xs space-y-3 min-w-[280px]">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Jaminan 100% Asli Standar OEM</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Harga Grosir Langsung Distributor</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Gudang Hub Jakarta, Jabar & Jatim</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Konsultasi Teknis Sparepart Cepat</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TEASER TESTIMONI & BLOG */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Card Teaser Testimoni */}
                  <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-amber-500 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs font-bold text-slate-700 ml-1">4.9 / 5.0 Rating Mitra</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                        Dipercaya oleh 15.000+ Bengkel di Seluruh Indonesia
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        Baca pengalaman nyata para pemilik toko dan kepala mekanik mengenai kecepatan suplai dan keaslian suku cadang PT BSM.
                      </p>
                    </div>

                    <button
                      onClick={() => navigateTo('testimoni')}
                      className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 self-start"
                    >
                      <span>Lihat Halaman Testimoni & Kirim Ulasan →</span>
                    </button>
                  </div>

                  {/* Card Teaser Blog */}
                  <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-2">
                        Wawasan Bengkel & Produk
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                        Artikel Edukasi Teknis & Tips Bisnis Otomotif
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        Panduan pemilihan viskositas oli, perawatan busi injeksi, strategi stok toko, serta kabar resmi perusahaan.
                      </p>
                    </div>

                    <button
                      onClick={() => navigateTo('blog')}
                      className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 self-start"
                    >
                      <span>Buka Halaman Berita & Artikel →</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. HALAMAN TERPISAH: KATALOG PRODUK                      */}
        {/* ======================================================== */}
        {activeView === 'katalog' && (
          <div className="animate-in fade-in duration-200">
            <ProductCatalog
              products={products}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. HALAMAN TERPISAH: TESTIMONI MITRA                     */}
        {/* ======================================================== */}
        {activeView === 'testimoni' && (
          <div className="animate-in fade-in duration-200">
            <TestimonialGallery
              testimonials={testimonials}
              onAddTestimonial={handleAddTestimonial}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. HALAMAN TERPISAH: BERITA & BLOG                       */}
        {/* ======================================================== */}
        {activeView === 'blog' && (
          <div className="animate-in fade-in duration-200">
            <BlogSection
              posts={blogPosts}
              onTriggerNotification={handleTriggerNotification}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* 5. HALAMAN TERPISAH: KONTAK & JARINGAN GUDANG            */}
        {/* ======================================================== */}
        {activeView === 'kontak' && (
          <div className="animate-in fade-in duration-200">
            <ContactSection />
          </div>
        )}

        {/* ======================================================== */}
        {/* 6. PORTAL CMS ADMIN (MANAJEMEN MASTER DATA)              */}
        {/* ======================================================== */}
        {activeView === 'cms' && (
          <CmsAdminModal
            products={products}
            setProducts={setProducts}
            blogPosts={blogPosts}
            setBlogPosts={setBlogPosts}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
            onClose={() => navigateTo('home')}
            onResetDefaults={handleResetDefaults}
            onLogout={handleAdminLogout}
          />
        )}

        {/* ======================================================== */}
        {/* 7. LIVE ANALYTICS MODAL / PAGE                           */}
        {/* ======================================================== */}
        {activeView === 'analytics' && (
          <AnalyticsModal
            onClose={() => navigateTo('home')}
            activeLiveUsers={activeLiveUsers}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenCms={handleRequestOpenCms}
        onOpenAnalytics={() => navigateTo('analytics')}
        onNavigate={navigateTo}
      />
    </div>
  );
}
