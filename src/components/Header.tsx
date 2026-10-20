import React, { useState } from 'react';
import { BarChart3, Settings, Menu, X, MessageCircle, Lock } from 'lucide-react';
import { BsmLogo } from './BsmLogo';
import { PageView } from '../types';

interface HeaderProps {
  activeView: PageView;
  setActiveView: (view: PageView) => void;
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

  const handleNavigate = (view: PageView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: PageView; label: string; badge?: string }[] = [
    { id: 'home', label: 'Beranda' },
    { id: 'katalog', label: 'Katalog Produk' },
    { id: 'testimoni', label: 'Testimoni Mitra' },
    { id: 'blog', label: 'Berita & Blog' },
    { id: 'kontak', label: 'Kontak Kami' },
  ];


  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element Brand Zone */}
          <button 
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
          >
            <BsmLogo size="md" className="group-hover:scale-105 transition-transform" />
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
              PT Bintang Semesta Motor
            </span>
          </button>

          {/* Zone 2: Clean text navigation links for separate pages */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs xl:text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`relative py-1.5 px-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-blue-700 font-bold bg-blue-50/80 shadow-2xs' 
                      : 'hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 uppercase tracking-tighter">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary action buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleNavigate(activeView === 'analytics' ? 'home' : 'analytics')}
              title="Pantau Trafik Real-time"
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
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
                  handleNavigate('home');
                } else if (onOpenCms) {
                  onOpenCms();
                } else {
                  handleNavigate('cms');
                }
              }}
              title="Kelola Konten Website (Khusus Admin)"
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeView === 'cms'
                  ? 'bg-blue-50 text-blue-700 border-blue-300 font-bold'
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
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Sales WA</span>
            </a>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex lg:hidden items-center gap-2">


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
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-1 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 font-bold' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
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
                    handleNavigate('home');
                  } else if (onOpenCms) {
                    onOpenCms();
                  } else {
                    handleNavigate('cms');
                  }
                }}
                className="py-1.5 px-2 text-center text-xs font-medium rounded-lg border border-slate-300 text-slate-700 flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3 h-3 text-slate-500" />
                <span>CMS Admin</span>
              </button>
              <button
                onClick={() => handleNavigate('analytics')}
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
