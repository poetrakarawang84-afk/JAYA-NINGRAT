import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Bell, BellRing, BookOpen, Clock, ArrowRight, X, Eye } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
  onTriggerNotification: (title: string, body: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, onTriggerNotification }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    return localStorage.getItem('bsm_push_subscribed') === 'true';
  });

  const categories = ['Semua', 'Tips Bengkel', 'Produk & Spek', 'Kabar Perusahaan'];

  const filteredPosts = posts.filter(
    (p) => selectedCategory === 'Semua' || p.category === selectedCategory
  );

  const handleToggleSubscribe = () => {
    if (!isSubscribed) {
      if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            setIsSubscribed(true);
            localStorage.setItem('bsm_push_subscribed', 'true');
            onTriggerNotification(
              'Notifikasi BSM Aktif!',
              'Terima kasih telah berlangganan info rilis suku cadang dan artikel bengkel PT BSM.'
            );
          }
        }).catch(() => {
          setIsSubscribed(true);
          localStorage.setItem('bsm_push_subscribed', 'true');
          onTriggerNotification(
            'Notifikasi Berhasil Diaktifkan',
            'Anda akan menerima notifikasi setiap ada artikel atau promo grosir baru.'
          );
        });
      } else {
        setIsSubscribed(true);
        localStorage.setItem('bsm_push_subscribed', 'true');
        onTriggerNotification(
          'Notifikasi Berhasil Diaktifkan',
          'Anda akan menerima notifikasi setiap ada artikel atau promo grosir baru.'
        );
      }
    } else {
      setIsSubscribed(false);
      localStorage.setItem('bsm_push_subscribed', 'false');
      onTriggerNotification('Notifikasi Dinonaktifkan', 'Langganan notifikasi artikel telah dihentikan.');
    }
  };

  return (
    <section id="blog" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Push Notification Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
              Wawasan & Berita Terbaru Perusahaan
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Kabar Industri Otomotif & Edukasi Bengkel
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl">
              Artikel berkala mengenai teknologi pelumas, tips perawatan motor matic, standarisasi suku cadang, dan pembaruan logistik PT BSM.
            </p>
          </div>

          {/* Push Notification Box */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-4 max-w-md shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${isSubscribed ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-700'}`}>
                {isSubscribed ? <BellRing className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900">
                  {isSubscribed ? 'Notifikasi Aktif' : 'Notifikasi Artikel'}
                </p>
                <p className="text-slate-500">
                  {isSubscribed ? 'Mendapat update artikel terbaru' : 'Dapatkan update instan artikel & promo'}
                </p>
              </div>
            </div>
            <button
              onClick={handleToggleSubscribe}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                isSubscribed
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-blue-700 text-white hover:bg-blue-800'
              }`}
            >
              {isSubscribed ? 'Matikan' : 'Aktifkan'}
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-lg overflow-x-auto mb-8 max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-slate-300 transition-all hover:shadow-sm"
            >
              <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded">
                  {post.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Eye className="w-3 h-3" />
                      {post.views}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2.5 leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">{post.author}</span>
                  <button
                    onClick={() => setActivePost(post)}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 hover:underline"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Read Article Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] border border-slate-200 shadow-xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                {activePost.category}
              </span>
              <button
                onClick={() => setActivePost(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {activePost.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-200">
                <span>Penulis: <strong>{activePost.author}</strong></span>
                <span>·</span>
                <span>{activePost.date}</span>
                <span>·</span>
                <span>{activePost.readTime}</span>
              </div>

              <div className="aspect-[16/9] rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={activePost.coverImage}
                  alt={activePost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
                {activePost.content}
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-1.5">
                {activePost.tags.map((t, i) => (
                  <span key={i} className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActivePost(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
