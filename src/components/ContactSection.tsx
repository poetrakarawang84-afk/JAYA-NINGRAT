import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Instagram, Facebook, Video, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    workshopName: '',
    purpose: 'Kemitraan Bengkel',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Halo Tim PT Bintang Semesta Motor, saya ${formData.name || 'Mitra'} dari ${formData.workshopName || 'Bengkel'}. Ingin berkonsultasi mengenai: ${formData.purpose}. Pesan: ${formData.message || 'Mohon informasi katalog dan syarat kemitraan.'}`
    );
    window.open(`https://wa.me/6281288889999?text=${text}`, '_blank');
  };

  return (
    <section id="kontak" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
            Hubungi PT Bintang Semesta Motor
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Konsultasi Kemitraan & Layanan Pelanggan
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Tim sales representative kami siap membantu pengadaan suku cadang, pendaftaran bengkel rekanan, dan konsultasi teknis pelumas motor Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Company Info & Social Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-5">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
                Kantor Pusat & Gudang Logistik HO
              </h3>

              <div className="flex items-start gap-3.5 text-xs text-slate-700">
                <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">PT Bintang Semesta Motor</p>
                  <p className="text-slate-600 mt-0.5">
                    Jl. Jababeka III H Blok C 17 FT, Pasirgombong, Kec. Cikarang Utara, Kabupaten Bekasi, Jawa Barat 17530
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-slate-700">
                <Mail className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Email Resmi</p>
                  <p className="text-slate-600 font-mono mt-0.5">bintangsemestamotor01@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-slate-700">
                <Phone className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Telepon & WhatsApp B2B</p>
                  <p className="text-slate-600 font-mono mt-0.5">+62 21-5890-8888 / +62 812-8888-9999</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-slate-700">
                <Clock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Jam Operasional Pengiriman & Kantor</p>
                  <p className="text-slate-600 mt-0.5">Senin - Jum'at: 08:00 - 17:00 WIB (Sabtu & Minggu Libur)</p>
                </div>
              </div>
            </div>

            {/* Social Media Integration */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
                Konektivitas Media Sosial Resmi
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://wa.me/6281288889999"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-2.5 bg-white rounded-lg border border-slate-200 hover:border-emerald-400 hover:text-emerald-700 transition-colors text-xs font-semibold text-slate-800"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp B2B</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-2.5 bg-white rounded-lg border border-slate-200 hover:border-pink-400 hover:text-pink-700 transition-colors text-xs font-semibold text-slate-800"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>@bsm_motorpart</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-400 hover:text-blue-700 transition-colors text-xs font-semibold text-slate-800"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <span>Facebook Fans</span>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-2.5 bg-white rounded-lg border border-slate-200 hover:border-slate-400 hover:text-slate-900 transition-colors text-xs font-semibold text-slate-800"
                >
                  <Video className="w-4 h-4 text-slate-800" />
                  <span>TikTok Otomotif</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Responsive Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Pesan Anda Telah Terkirim!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Terima kasih, <strong>{formData.name}</strong>. Sales representatif wilayah Anda akan menghubungi melalui WhatsApp/Email dalam 1x24 jam kerja.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Lanjutkan Diskusi ke WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        workshopName: '',
                        purpose: 'Kemitraan Bengkel',
                        message: ''
                      });
                    }}
                    className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Bambang Setiawan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Bengkel / Toko
                    </label>
                    <input
                      type="text"
                      placeholder="Bengkel Jaya Motor"
                      value={formData.workshopName}
                      onChange={(e) => setFormData({ ...formData, workshopName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Alamat Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="bambang@bengkeljaya.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp / HP <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="081234567890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jenis Keperluan
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Kemitraan Bengkel">Kemitraan Suplai Bengkel Berkala</option>
                    <option value="Pemesanan Grosir">Pemesanan Grosir / Ritel Sparepart</option>
                    <option value="Klaim Garansi">Klaim Garansi / Pengembalian Produk</option>
                    <option value="Pertanyaan Umum">Pertanyaan Umum / Info Distribusi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pesan atau Kebutuhan Spesifik <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Sebutkan jenis suku cadang yang dicari, estimasi volume kebutuhan bulanan, dan lokasi pengiriman..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <p className="text-[11px] text-slate-500">
                    Data Anda dilindungi oleh kebijakan privasi PT BSM.
                  </p>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Pesan Sekarang</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
