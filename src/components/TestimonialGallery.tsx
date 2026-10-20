import React, { useState } from 'react';
import { Testimonial } from '../types';
import { Star, CheckCircle2, MessageSquarePlus, X } from 'lucide-react';

interface TestimonialGalleryProps {
  testimonials: Testimonial[];
  onAddTestimonial: (testi: Omit<Testimonial, 'id' | 'date'>) => void;
}

export const TestimonialGallery: React.FC<TestimonialGalleryProps> = ({ testimonials, onAddTestimonial }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('Owner Bengkel');
  const [workshopName, setWorkshopName] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [tagInput, setTagInput] = useState('Oli Matic, Layanan Cepat');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !workshopName || !review) return;

    onAddTestimonial({
      author,
      role,
      workshopName,
      city: city || 'Indonesia',
      rating,
      review,
      avatar: '/src/assets/images/bsm_workshop_owner_1790577752304.jpg',
      verifiedPartner: true,
      tags: tagInput.split(',').map((t) => t.trim()).filter(Boolean)
    });

    setAuthor('');
    setWorkshopName('');
    setCity('');
    setReview('');
    setModalOpen(false);
  };

  return (
    <section id="testimoni" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
              Galeri Testimoni Pelanggan & Mitra
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Kepercayaan Lebih dari 15.000 Bengkel di Seluruh Indonesia
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl">
              Simak bagaimana para pemilik bengkel dan toko suku cadang meningkatkan omzet dan kepuasan pelanggan bersama produk berkualitas PT BSM.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 rounded-lg border border-blue-700 text-blue-700 hover:bg-blue-50 text-xs font-semibold flex items-center gap-2 self-start md:self-auto transition-colors"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Kirim Ulasan Bengkel Anda</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                {/* Rating Stars & Verified Mark */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  {item.verifiedPartner && (
                    <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Mitra Terverifikasi</span>
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-6 italic">
                  "{item.review}"
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.tags.map((t, idx) => (
                    <span key={idx} className="text-[11px] text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Lockup */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.author}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-slate-300"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">{item.author}</p>
                  <p className="text-slate-600">{item.role} · {item.workshopName}</p>
                  <p className="text-[11px] text-slate-400">{item.city} · {item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Testimonial Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Tulis Ulasan Mitra PT BSM
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bambang Suhendra"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Peran / Jabatan</label>
                  <input
                    type="text"
                    required
                    placeholder="Owner / Kepala Bengkel"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kota / Daerah</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sidoarjo"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Bengkel / Toko</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bengkel Motor Berkah Jaya"
                  value={workshopName}
                  onChange={(e) => setWorkshopName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Rating Bintang</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pengalaman & Ulasan</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ceritakan pengalaman Anda memesan oli, busi, atau kampas rem di PT BSM..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tag Produk (Pisahkan koma)</label>
                <input
                  type="text"
                  placeholder="Oli Matic, Kampas Rem, Pengiriman Cepat"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white"
                >
                  Publikasikan Ulasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
