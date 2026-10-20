import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { BsmLogo } from './BsmLogo';

interface FooterProps {
  onOpenCms: () => void;
  onOpenAnalytics: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCms, onOpenAnalytics }) => {
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

          {/* Quick Nav */}
          <div>
            <p className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">Navigasi Utama</p>
            <ul className="space-y-2">
              <li><a href="#produk" className="hover:text-white transition-colors">Katalog Sparepart</a></li>
              <li><a href="#testimoni" className="hover:text-white transition-colors">Testimoni Bengkel Mitra</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Berita & Tips Otomotif</a></li>
              <li><a href="#kontak" className="hover:text-white transition-colors">Hubungi Sales & Gudang</a></li>
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

          {/* Legal / Certifications */}
          <div>
            <p className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">Standar Kualitas</p>
            <div className="space-y-1.5 text-slate-400">
              <p>· ISO 9001:2015 Manajemen Mutu</p>
              <p>· Standar Nasional Indonesia (SNI)</p>
              <p>· Sertifikasi JASO MB & API SL</p>
              <p>· Garansi Pabrik 100% Produk Asli</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} PT Bintang Semesta Motor. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="flex items-center gap-1.5 text-slate-500">
            <span>Website Profil Resmi PT Bintang Semesta Motor</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
