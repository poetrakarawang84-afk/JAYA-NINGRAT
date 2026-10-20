import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Award, MessageCircle } from 'lucide-react';
import { BsmLogo } from './BsmLogo';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onExploreProducts, 
  onContactClick
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background Image with Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/bsm_hero_warehouse_1790577715463.jpg"
          alt="Gudang Distribusi PT Bintang Semesta Motor"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Subtle Trust Label with Official Logo */}
          <div className="inline-flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-sm border border-slate-700/70 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-200 mb-6 shadow-sm">
            <BsmLogo size="sm" className="w-5 h-5" />
            <span>Distributor Resmi Sparepart & Pelumas Motor Indonesia</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Pusat Distribusi Suku Cadang Motor Andal untuk Bengkel & Ritel
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
            PT Bintang Semesta Motor (BSM) menyuplai oli matic sintetik, busi injeksi platinum, ban tubeless, dan kampas rem berkualitas standar OEM. Memberikan pasokan konsisten, jaminan keaslian 100%, serta kemudahan pemesanan cepat untuk ribuan mitra di seluruh Nusantara.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={onExploreProducts}
              className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2.5"
            >
              <span>Jelajahi Katalog Produk</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onContactClick}
              className="px-6 py-3.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/90 text-slate-100 font-semibold text-sm border border-slate-700 transition-colors flex items-center gap-2"
            >
              <span>Konsultasi & Kemitraan Bengkel</span>
            </button>

            <a
              href="https://wa.me/6281288889999?text=Halo%20PT%20BSM,%20saya%20ingin%20info%20katalog%20dan%20harga%20grosir%20sparepart."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp B2B</span>
            </a>
          </div>


          {/* Proof Adjacency Metrics */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-white font-mono tabular-nums">15.000+</p>
              <p className="text-xs text-slate-400 mt-1">Bengkel & Toko Rekanan</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-white font-mono tabular-nums">48 Jam</p>
              <p className="text-xs text-slate-400 mt-1">Jaminan Kirim Cepat</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-white font-mono tabular-nums">100%</p>
              <p className="text-xs text-slate-400 mt-1">Asli Garansi Pabrik</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-white font-mono tabular-nums">4 Hub</p>
              <p className="text-xs text-slate-400 mt-1">Gudang Logistik Jawa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
