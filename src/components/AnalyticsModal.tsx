import React from 'react';
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
  Share2
} from 'lucide-react';

interface AnalyticsModalProps {
  onClose: () => void;
  activeLiveUsers: number;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ onClose, activeLiveUsers }) => {
  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Back Navigation */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Server Analytics Node Jakarta Active</span>
          </div>
        </div>

        {/* Analytics Main View */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-600 rounded-lg text-white">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Real-Time Visitor & Trafik Analitik</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pemantauan lalu lintas pengunjung portal PT Bintang Semesta Motor & modul Sales Order.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert('Laporan analitik trafik bulanan PT BSM berhasil diunduh (format CSV)!')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Laporan</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Real-time Hero Card */}
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-6 rounded-xl border border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center border-2 border-emerald-400">
                    <span className="text-2xl font-black font-mono text-emerald-300 tabular-nums">
                      {activeLiveUsers}
                    </span>
                  </div>
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-500 animate-ping"></span>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Pengunjung Aktif Saat Ini (Live Real-Time)</span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Pengunjung sedang menjelajahi formulir sales order, katalog pelumas, dan galeri ulasan.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs w-full md:w-auto">
                <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                  <span className="text-slate-400 block">Total Tayangan Hari Ini</span>
                  <span className="text-lg font-bold font-mono text-white">4.820</span>
                </div>
                <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                  <span className="text-slate-400 block">Pengunjung Unik</span>
                  <span className="text-lg font-bold font-mono text-white">1.940</span>
                </div>
                <div className="bg-white/10 p-3 rounded-lg border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block">Avg. Dwell Time</span>
                  <span className="text-lg font-bold font-mono text-white">4m 12s</span>
                </div>
              </div>
            </div>

            {/* 3-Column Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Traffic Sources */}
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-700" />
                  <span>Kanal Sumber Trafik</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-700">Google Search Organik</span>
                      <span className="font-mono text-slate-500 font-semibold">44%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '44%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-700">WhatsApp Catalog B2B</span>
                      <span className="font-mono text-slate-500 font-semibold">32%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-700">Langsung (Direct / Bookmark)</span>
                      <span className="font-mono text-slate-500 font-semibold">16%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '16%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-700">Media Sosial (IG / TikTok)</span>
                      <span className="font-mono text-slate-500 font-semibold">8%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-600 h-2 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Devices Breakdown */}
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-700" />
                  <span>Perangkat Pengunjung</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">Smartphone (Android & iOS)</p>
                      <p className="text-slate-500 text-[11px]">Mayoritas mekanik & owner bengkel</p>
                    </div>
                    <span className="text-base font-extrabold font-mono text-blue-700">68%</span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">Desktop / Laptop</p>
                      <p className="text-slate-500 text-[11px]">Admin kasir & input Sales Order</p>
                    </div>
                    <span className="text-base font-extrabold font-mono text-indigo-700">28%</span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">Tablet / POS Display</p>
                      <p className="text-slate-500 text-[11px]">Display katalog etalase bengkel</p>
                    </div>
                    <span className="text-base font-extrabold font-mono text-slate-700">4%</span>
                  </div>
                </div>
              </div>

              {/* Top Queried Products */}
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-700" />
                  <span>Produk Paling Banyak Dilihat</span>
                </h3>

                <div className="space-y-2.5 text-xs">
                  {[
                    { name: 'Oli Matic Sintetik BSM Max 10W-40', hits: '1.240 klik' },
                    { name: 'Busi Injeksi Iridium Dual Platinum', hits: '920 klik' },
                    { name: 'Ban Luar Tubeless BSM ProGrip', hits: '840 klik' },
                    { name: 'Kampas Rem Depan Ceramic Disc Pad', hits: '710 klik' },
                    { name: 'V-Belt & Roller Kit Beat / Vario', hits: '430 klik' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                      <span className="text-slate-800 font-medium truncate max-w-[180px]">{item.name}</span>
                      <span className="text-blue-700 font-mono font-bold">{item.hits}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Live Activity Stream */}
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-700" />
                <span>Log Aktivitas Pengunjung Terakhir (Real-Time Stream)</span>
              </h3>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 bg-white rounded border border-slate-200 text-slate-700">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Pengunjung dari Surabaya membuka formulir Sales Order Beecloud</span>
                  </span>
                  <span className="text-slate-400">Baru saja</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border border-slate-200 text-slate-700">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>Mitra Bengkel di Tangerang melihat spesifikasi Busi Injeksi Iridium</span>
                  </span>
                  <span className="text-slate-400">1 mnt lalu</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border border-slate-200 text-slate-700">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <span>Pengguna mengaktifkan langganan push notification artikel blog</span>
                  </span>
                  <span className="text-slate-400">3 mnt lalu</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
