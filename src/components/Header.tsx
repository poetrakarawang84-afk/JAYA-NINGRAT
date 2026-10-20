import React, { useState } from 'react';
import { BarChart3, Settings, Menu, X, MessageCircle, Lock } from 'lucide-react';
import { BsmLogo } from './BsmLogo';

interface HeaderProps {
  activeView: 'home' | 'cms' | 'analytics';
  setActiveView: (view: 'home' | 'cms' | 'analytics') => void;
  activeLiveUsers: number;
  onOpenCms?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeView, 
  setActiveView, 
  activeLiveUsers,
  onOpenCms 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element Brand Zone */}
          <button 
            onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <BsmLogo size="md" className="group-hover:scale-105 transition-transform" />
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
              PT Bintang Semesta Motor
            </span>
          </button>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button 
              onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-blue-700 transition-colors ${activeView === 'home' ? 'text-blue-700 font-semibold' : ''}`}
            >
              Beranda
            </button>
            <button 
              onClick={() => scrollToSection('produk')}
              className="hover:text-blue-700 transition-colors"
            >
              Katalog Produk
            </button>
            <button 
              onClick={() => scrollToSection('testimoni')}
              className="hover:text-blue-700 transition-colors"
            >
              Testimoni Mitra
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="hover:text-blue-700 transition-colors"
            >
              Berita & Blog
            </button>
            <button 
              onClick={() => scrollToSection('kontak')}
              className="hover:text-blue-700 transition-colors"
            >
              Kontak
            </button>
          </nav>

          {/* Zone 3: Primary action buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => setActiveView(activeView === 'analytics' ? 'home' : 'analytics')}
              title="Pantau Trafik Real-time"
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'analytics'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{activeLiveUsers} Live</span>
            </button>

            <button
              onClick={() => {
                if (activeView === 'cms') {
                  setActiveView('home');
                } else if (onOpenCms) {
                  onOpenCms();
                } else {
                  setActiveView('cms');
                }
              }}
              title="Kelola Konten Website (Khusus Admin)"
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'cms'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>CMS Admin</span>
            </button>

            <a
              href="https://wa.me/6281288889999?text=Halo%20PT%20Bintang%20Semesta%20Motor,%20saya%20ingin%20berkonsultasi%20mengenai%20kemitraan%20dan%20produk%20sparepart."
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Sales (WA)</span>
            </a>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="https://wa.me/6281288889999"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-xs font-semibold rounded-md bg-emerald-600 text-white flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WA</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2 text-sm font-medium">
          <button
            onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 px-2 rounded-md hover:bg-slate-100 text-slate-800"
          >
            Beranda
          </button>
          <button
            onClick={() => scrollToSection('produk')}
            className="block w-full text-left py-2 px-2 rounded-md hover:bg-slate-100 text-slate-800"
          >
            Katalog Produk
          </button>
          <button
            onClick={() => scrollToSection('testimoni')}
            className="block w-full text-left py-2 px-2 rounded-md hover:bg-slate-100 text-slate-800"
          >
            Testimoni Mitra
          </button>
          <button
            onClick={() => scrollToSection('blog')}
            className="block w-full text-left py-2 px-2 rounded-md hover:bg-slate-100 text-slate-800"
          >
            Berita & Blog
          </button>
          <button
            onClick={() => scrollToSection('kontak')}
            className="block w-full text-left py-2 px-2 rounded-md hover:bg-slate-100 text-slate-800"
          >
            Kontak Perusahaan
          </button>
          <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
            <a
              href="https://wa.me/6281288889999"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 text-center text-xs font-semibold rounded-lg bg-emerald-600 text-white flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Sales via WhatsApp</span>
            </a>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { 
                  setMobileMenuOpen(false);
                  if (activeView === 'cms') {
                    setActiveView('home');
                  } else if (onOpenCms) {
                    onOpenCms();
                  } else {
                    setActiveView('cms');
                  }
                }}
                className="py-1.5 px-2 text-center text-xs font-medium rounded-lg border border-slate-300 text-slate-700 flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3 h-3 text-slate-500" />
                <span>CMS Admin</span>
              </button>
              <button
                onClick={() => { setActiveView('analytics'); setMobileMenuOpen(false); }}
                className="py-1.5 px-2 text-center text-xs font-medium rounded-lg border border-slate-300 text-slate-700"
              >
                Live Analitik
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
