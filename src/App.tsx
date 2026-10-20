import React, { useState, useEffect } from 'react';
import { Product, Testimonial, BlogPost } from './types';
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

export default function App() {
  // Navigation View State
  const [activeView, setActiveView] = useState<'home' | 'cms' | 'analytics'>('home');

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

    // Also trigger native browser notification if granted
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

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeView === 'cms' && (
          <CmsAdminModal
            products={products}
            setProducts={setProducts}
            blogPosts={blogPosts}
            setBlogPosts={setBlogPosts}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
            onClose={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onResetDefaults={handleResetDefaults}
            onLogout={handleAdminLogout}
          />
        )}

        {activeView === 'analytics' && (
          <AnalyticsModal
            onClose={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            activeLiveUsers={activeLiveUsers}
          />
        )}

        {activeView === 'home' && (
          <>
            <HeroSection
              onExploreProducts={() => {
                const el = document.getElementById('produk');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onContactClick={() => {
                const el = document.getElementById('kontak');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <ProductCatalog
              products={products}
            />

            <TestimonialGallery
              testimonials={testimonials}
              onAddTestimonial={handleAddTestimonial}
            />

            <BlogSection
              posts={blogPosts}
              onTriggerNotification={handleTriggerNotification}
            />

            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenCms={handleRequestOpenCms}
        onOpenAnalytics={() => { setActiveView('analytics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      />
    </div>
  );
}
