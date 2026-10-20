import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { BsmLogo } from './BsmLogo';
import { PageView } from '../types';

interface FooterProps {
  onOpenCms: () => void;
  onOpenAnalytics: () => void;
  onNavigate?: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCms, onOpenAnalytics, onNavigate }) => {
  const handleNav = (view: PageView) => {
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <BsmLogo size="sm" />
              <span>PT Bintang Semesta Motor</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Distributor resmi suku cadang motor OEM & pelumas berstandar internasional. Melayani ribuan jaringan bengkel rekanan di seluruh Indonesia.
            </p>
          </div>

          {/* Quick Nav (Separate Pages) */}
          <div>
            <p className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">Halaman Website</p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors text-left">
                  Beranda Utama
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('katalog')} className="hover:text-white transition-colors text-left">
                  Katalog Suku Cadang Resmi
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('testimoni')} className="hover:text-white transition-colors text-left">
                  Testimoni Bengkel Mitra
                </button>
              </li>

              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-white transition-colors text-left">
                  Berita & Tips Otomotif
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('kontak')} className="hover:text-white transition-colors text-left">
                  Hubungi Sales & Gudang
                </button>
              </li>
            </ul>
          </div>

          {/* Admin Portal & Analytics */}
          <div>
            <p className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">Portal Manajemen & Analitik</p>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenCms} className="hover:text-white transition-colors text-left text-blue-400 font-semibold">
                  Sistem Manajemen Konten (CMS)
                </button>
              </li>
              <li>
                <button onClick={onOpenAnalytics} className="hover:text-white transition-colors text-left">
                  Live Traffic Analytics
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/6281288889999"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors text-emerald-500 font-medium"
                >
                  Layanan B2B WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Warehouse & Legal Info */}
          <div>
            <p className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">Kantor Pusat & Gudang</p>
            <p className="text-slate-400 leading-relaxed mb-2">
              Kawasan Industri Sentra Niaga Blok B-12, Jl. Raya Bekasi KM 28, Cikarang Barat, Jawa Barat 17530
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>NIB Resmi Terdaftar & Terverifikasi</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} PT Bintang Semesta Motor (BSM). Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('kontak')} className="hover:text-slate-300">Hubungi Kami</button>
            <span>·</span>
            <button onClick={() => handleNav('katalog')} className="hover:text-slate-300">Katalog Produk</button>
            <span>·</span>
            <button onClick={onOpenCms} className="hover:text-slate-300">Login Karyawan (CMS)</button>
          </div>

        </div>
      </div>
    </footer>
  );
};
