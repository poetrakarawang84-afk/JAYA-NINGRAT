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
  MessageCircle,
  Heart
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
            {/* 1. BAGIAN UTAMA (HERO SECTION) */}
            <HeroSection
              onExploreProducts={() => navigateTo('katalog')}
              onContactClick={() => navigateTo('kontak')}
            />

            {/* 2. BAGIAN PERUSAHAAN & 4 PILAR KEUNGGULAN (COMPANY PROFILE) */}
            <section className="py-20 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Intro Perusahaan Singkat */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-3">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Profil Singkat Perusahaan</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                    Pusat Distribusi Terpercaya Menghubungkan Pabrikan & Ribuan Bengkel Mitra
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    PT Bintang Semesta Motor (BSM) adalah mitra distributor resmi terkemuka yang bergerak di bidang pasokan suku cadang dan pelumas motor berstandar OEM di Indonesia. Kami mendedikasikan infrastruktur pergudangan modern dan jaringan rantai pasok untuk menjamin efisiensi, keaslian produk, serta pertumbuhan berkelanjutan bagi seluruh mitra ritel dan bengkel rekanan di seluruh Indonesia.
                  </p>
                </div>

                {/* 4 Pilar Keunggulan */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Pilar 1 */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block mb-1">Pilar 1</span>
                      <h3 className="text-base font-bold text-slate-900 mb-2">100% Standar OEM & SNI</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Seluruh suku cadang dan pelumas diuji ketahanannya sesuai spesifikasi pabrikan resmi dan standar mutu nasional.
                      </p>
                    </div>
                  </div>

                  {/* Pilar 2 */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-md flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <Truck className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">Pilar 2</span>
                      <h3 className="text-base font-bold text-slate-900 mb-2">Distribusi & Logistik Cepat</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Pengiriman sigap dan terencana ke berbagai daerah guna memastikan ketersediaan suku cadang bengkel mitra selalu terpenuhi.
                      </p>
                    </div>
                  </div>

                  {/* Pilar 3 */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 transition-all hover:shadow-md flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <Award className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block mb-1">Pilar 3</span>
                      <h3 className="text-base font-bold text-slate-900 mb-2">Harga Grosir Kompetitif</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Memberikan struktur harga terbaik untuk mendukung margin keuntungan bengkel rekanan secara optimal dan berkelanjutan.
                      </p>
                    </div>
                  </div>

                  {/* Pilar 4 */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all hover:shadow-md flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <Clock className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">Pilar 4</span>
                      <h3 className="text-base font-bold text-slate-900 mb-2">Kapasitas Stok Stabil</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Didukung fasilitas gudang modern di kawasan industri strategis untuk meminimalisir risiko kelangkaan barang.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. BAGIAN KHUSUS: MOTO & SEMANGAT KERJA TIM KARYAWAN (THE HEART OF BSM) */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
              {/* Background gradient decorative glow */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="max-w-3xl mx-auto text-center mb-14">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 text-blue-300 text-xs font-bold border border-blue-700/60 mb-3">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>The Heart of BSM · Integritas & Profesionalisme</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
                    Moto & Semangat Kerja Tim Karyawan PT BSM
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Dedikasi dan ketulusan para staf operasional gudang, armada logistik, serta konsultan sales representative kami adalah fondasi utama yang menjaga kepuasan serta rasa aman ribuan pemilik bengkel setiap hari.
                  </p>
                </div>

                {/* Moto Utama Banner */}
                <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-r from-blue-950 via-slate-800 to-blue-950 p-8 sm:p-10 rounded-3xl border border-blue-600/40 shadow-2xl text-center relative">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-blue-400 mb-2">
                    Moto Utama Tim Operasional & Sales BSM
                  </div>
                  <blockquote className="text-xl sm:text-3xl font-black text-white italic tracking-tight leading-snug">
                    "Cepat, Presisi, dan Solutif untuk Setiap Mitra Bengkel."
                  </blockquote>
                  <p className="text-xs text-slate-400 mt-3 max-w-xl mx-auto">
                    Prinsip kerja yang dipegang teguh oleh seluruh insan karyawan PT BSM dari proses pengecekan mutu hingga barang sampai di rak bengkel Anda.
                  </p>
                </div>

                {/* Budaya Kerja & Nilai Inti Karyawan (Core Values - BUDAYA BSM) */}
                <div className="mb-4">
                  <div className="text-center mb-8">
                    <span className="text-xs uppercase font-bold tracking-widest text-slate-400">
                      Budaya Kerja & Nilai Inti Karyawan (Core Values)
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                      Pilar Karakter "B - S - M"
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* B - Berintegritas */}
                    <div className="p-7 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/80 transition-all hover:bg-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl font-mono shadow-lg mb-5">
                          B
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">
                          Berintegritas
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Menjaga keaslian produk dan kejujuran dalam setiap transaksi bisnis.
                        </p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-slate-700/60 text-[11px] text-blue-400 font-semibold">
                        ✓ Kejujuran & Keaslian Mutlak
                      </div>
                    </div>

                    {/* S - Sigap */}
                    <div className="p-7 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/80 transition-all hover:bg-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-2xl font-mono shadow-lg mb-5">
                          S
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">
                          Sigap
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Merespon setiap kebutuhan mendesak dan pertanyaan teknis dari pemilik bengkel tanpa menunda.
                        </p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-slate-700/60 text-[11px] text-emerald-400 font-semibold">
                        ✓ Respon Cepat & Responsif
                      </div>
                    </div>

                    {/* M - Melayani dengan Prima */}
                    <div className="p-7 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-purple-500/80 transition-all hover:bg-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-2xl font-mono shadow-lg mb-5">
                          M
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">
                          Melayani dengan Prima
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Mengutamakan kepuasan jangka panjang serta kemitraan yang saling menguntungkan.
                        </p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-slate-700/60 text-[11px] text-purple-400 font-semibold">
                        ✓ Kemitraan Saling Menguntungkan
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. CUPLIKAN PRODUK UNGGULAN & TESTIMONI MITRA */}
            <section className="py-20 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Cuplikan Produk Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                      Koleksi Pilihan
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Sampel Produk Suku Cadang Terlaris
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Sampel standar mutu OEM resmi paling diminati oleh pelanggan bengkel (Oli, Busi, Ban, dan Kampas Rem)
                    </p>
                  </div>

                  <button
                    onClick={() => navigateTo('katalog')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-all hover:gap-3"
                  >
                    <span>Jelajahi Semua Produk di Katalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 4 Produk Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {popularProducts.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => navigateTo('katalog')}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group"
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
                          Pilihan Unggulan
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

                {/* KUTIPAN MITRA (TESTIMONI SINGKAT RESMI) */}
                <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-1.5 text-amber-500 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-slate-600 ml-1.5">Ulasan Terverifikasi Mitra</span>
                    </div>

                    <blockquote className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed italic mb-4">
                      "Semenjak bermitra dengan BSM, pasokan oli dan suku cadang di bengkel kami selalu aman. Pengirimannya cepat dan produknya terbukti asli!"
                    </blockquote>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                        RM
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Bpk. Rahmat</p>
                        <p className="text-xs text-slate-500">Pemilik Bengkel Mandiri Motor</p>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => navigateTo('testimoni')}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                    >
                      Lihat Testimoni Mitra Lainnya →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. AJAKAN BERGABUNG (CALL TO ACTION TERAKHIR) */}
            <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white text-center relative overflow-hidden">
              <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-6">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Kemitraan Resmi Distributor BSM</span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                  Bergabunglah Bersama 15.000+ Bengkel Rekanan yang Telah Mempercayakan Kebutuhan Suku Cadangnya pada PT Bintang Semesta Motor.
                </h2>

                <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Dapatkan kemudahan akses pasokan suku cadang bergaransi resmi, skema harga grosir bersahabat, dan pengiriman prioritas untuk mendukung kemajuan usaha bengkel Anda.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="https://wa.me/6281288889999?text=Halo%20PT%20BSM,%20saya%20ingin%20Daftar%20Menjadi%20Mitra%20Resmi%20bengkel%20dan%20mendapatkan%20info%20kemitraan."
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 transition-all hover:scale-105 flex items-center gap-2.5"
                  >
                    <span>Daftar Menjadi Mitra Resmi</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => navigateTo('kontak')}
                    className="px-7 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-colors flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Hubungi Kantor & Gudang</span>
                  </button>
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
