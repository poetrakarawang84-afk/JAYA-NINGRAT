import React, { useState, useRef } from 'react';
import { Product, BlogPost, Testimonial } from '../types';
import { BsmLogo } from './BsmLogo';
import { 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Image as ImageIcon, 
  X, 
  ArrowLeft, 
  CheckCircle2, 
  Eye, 
  Star,
  Save,
  RotateCcw,
  Lock,
  KeyRound,
  LogOut,
  AlertTriangle
} from 'lucide-react';

interface DeleteConfirmState {
  type: 'product' | 'blog' | 'testimonial' | 'reset';
  id?: string;
  name: string;
  details?: string;
}

interface CmsAdminModalProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  onClose: () => void;
  onResetDefaults: () => void;
  onLogout: () => void;
}

export const CmsAdminModal: React.FC<CmsAdminModalProps> = ({
  products,
  setProducts,
  blogPosts,
  setBlogPosts,
  testimonials,
  setTestimonials,
  onClose,
  onResetDefaults,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'blog' | 'testimonials'>('products');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // ==========================================
  // 1. TAMBAH PRODUK STATE
  // ==========================================
  const [newProdName, setNewProdName] = useState('');
  const [newProdCode, setNewProdCode] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'Oli & Pelumas' | 'Busi' | 'Ban' | 'Pengereman' | 'Transmisi'>('Oli & Pelumas');
  const [newProdUnit, setNewProdUnit] = useState<'BOTOL' | 'PCS' | 'DUS'>('BOTOL');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdSpecs, setNewProdSpecs] = useState<string[]>([
    'Kualitas Standar OEM',
    'Garansi Resmi Pabrik',
    'Lolos Uji Durabilitas'
  ]);
  const [newProdImage, setNewProdImage] = useState<string>('/src/assets/images/bsm_product_oil_1790577728878.jpg');
  const [imageFileName, setImageFileName] = useState<string>('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ==========================================
  // 2. EDIT PRODUK STATE & MODAL
  // ==========================================
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const editProductFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingEditImage, setIsUploadingEditImage] = useState(false);

  // ==========================================
  // 3. TAMBAH BLOG STATE
  // ==========================================
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState<'Tips Bengkel' | 'Produk & Spek' | 'Kabar Perusahaan'>('Tips Bengkel');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogCover, setNewBlogCover] = useState<string>('/src/assets/images/bsm_hero_warehouse_1790577715463.jpg');
  const [blogCoverFileName, setBlogCoverFileName] = useState<string>('');
  const [isUploadingBlogCover, setIsUploadingBlogCover] = useState(false);
  const blogFileInputRef = useRef<HTMLInputElement>(null);

  // ==========================================
  // 4. EDIT BLOG STATE & MODAL
  // ==========================================
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [isUploadingEditBlogCover, setIsUploadingEditBlogCover] = useState(false);
  const editBlogFileInputRef = useRef<HTMLInputElement>(null);

  // ==========================================
  // 5. EDIT TESTIMONI STATE & MODAL
  // ==========================================
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // ==========================================
  // 6. GANTI KATA SANDI / PIN ADMIN STATE
  // ==========================================
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // ==========================================
  // 7. KONFIRMASI HAPUS / RESET (IN-APP DIALOG)
  // ==========================================
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmState | null>(null);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminPassword || newAdminPassword.length < 4) {
      setPasswordError('Kata sandi minimal 4 karakter!');
      return;
    }
    if (newAdminPassword !== confirmAdminPassword) {
      setPasswordError('Konfirmasi kata sandi tidak cocok!');
      return;
    }
    localStorage.setItem('bsm_admin_pin', newAdminPassword.trim());
    setIsPasswordModalOpen(false);
    setNewAdminPassword('');
    setConfirmAdminPassword('');
    setPasswordError(null);
    triggerFeedback('Kata sandi / PIN admin berhasil diubah! Gunakan kata sandi baru untuk login berikutnya.');
  };

  const triggerFeedback = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  // Helper kompresi gambar agar tetap ringan disimpan di browser & cepat dimuat
  const processImageFile = (file: File, callback: (dataUrl: string) => void, setLoading: (l: boolean) => void) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 800;

        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          callback(compressed);
        } else {
          callback(e.target?.result as string);
        }
        setLoading(false);
      };
      img.onerror = () => {
        setLoading(false);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Handler upload foto produk baru
  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFileName(file.name);
    processImageFile(file, (dataUrl) => {
      setNewProdImage(dataUrl);
    }, setIsUploadingImage);
  };

  // Handler upload foto produk saat EDIT
  const handleEditProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;

    processImageFile(file, (dataUrl) => {
      setEditingProduct({
        ...editingProduct,
        image: dataUrl
      });
    }, setIsUploadingEditImage);
  };

  // Handler upload foto cover artikel blog baru
  const handleBlogCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBlogCoverFileName(file.name);
    processImageFile(file, (dataUrl) => {
      setNewBlogCover(dataUrl);
    }, setIsUploadingBlogCover);
  };

  // Handler upload foto cover artikel saat EDIT
  const handleEditBlogCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingBlogPost) return;

    processImageFile(file, (dataUrl) => {
      setEditingBlogPost({
        ...editingBlogPost,
        coverImage: dataUrl
      });
    }, setIsUploadingEditBlogCover);
  };

  // ------------------------------------------
  // ACTION: TAMBAH PRODUK
  // ------------------------------------------
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdCode) return;

    const validSpecs = newProdSpecs.map((s) => s.trim()).filter((s) => s.length > 0);

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      code: newProdCode.toUpperCase().trim(),
      name: newProdName.trim(),
      category: newProdCategory,
      unit: newProdUnit,
      price: 0,
      stock: 0,
      minOrder: 1,
      description: newProdDesc || 'Suku cadang motor presisi tinggi garansi resmi PT BSM.',
      specs: validSpecs.length > 0 ? validSpecs : ['Kualitas Standar OEM', 'Garansi Resmi Pabrik'],
      image: newProdImage || '/src/assets/images/bsm_product_oil_1790577728878.jpg',
      isPopular: false
    };

    const updated = [newProd, ...products];
    setProducts(updated);
    localStorage.setItem('bsm_custom_products', JSON.stringify(updated));

    // Reset Form
    setNewProdName('');
    setNewProdCode('');
    setNewProdDesc('');
    setNewProdSpecs(['Kualitas Standar OEM', 'Garansi Resmi Pabrik', 'Lolos Uji Durabilitas']);
    setImageFileName('');
    setNewProdImage('/src/assets/images/bsm_product_oil_1790577728878.jpg');
    if (fileInputRef.current) fileInputRef.current.value = '';

    triggerFeedback('Produk baru berhasil ditambahkan ke katalog!');
  };

  // ------------------------------------------
  // ACTION: SIMPAN EDIT PRODUK
  // ------------------------------------------
  const handleSaveEditedProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const validSpecs = (editingProduct.specs || []).map((s) => s.trim()).filter((s) => s.length > 0);
    const productToSave: Product = {
      ...editingProduct,
      specs: validSpecs.length > 0 ? validSpecs : ['Standar Mutu OEM Resmi']
    };

    const updated = products.map((p) => (p.id === productToSave.id ? productToSave : p));
    setProducts(updated);
    localStorage.setItem('bsm_custom_products', JSON.stringify(updated));
    setEditingProduct(null);
    triggerFeedback(`Perubahan produk [${editingProduct.name}] berhasil disimpan!`);
  };

  const handleDeleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setDeleteConfirm({
      type: 'product',
      id,
      name: target ? target.name : 'Produk',
      details: target ? `Kode SKU: ${target.code} (${target.category})` : undefined
    });
  };

  // ------------------------------------------
  // ACTION: TAMBAH BLOG
  // ------------------------------------------
  const handleAddBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogContent) return;

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug: newBlogTitle.toLowerCase().replace(/\s+/g, '-').slice(0, 40),
      title: newBlogTitle,
      excerpt: newBlogExcerpt || newBlogContent.slice(0, 120) + '...',
      content: newBlogContent,
      category: newBlogCategory,
      author: 'Tim Editorial PT BSM',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTime: '3 menit baca',
      coverImage: newBlogCover,
      tags: ['Update Resmi', 'Otomotif'],
      views: 12
    };

    const updated = [newPost, ...blogPosts];
    setBlogPosts(updated);
    localStorage.setItem('bsm_custom_blog_posts', JSON.stringify(updated));

    setNewBlogTitle('');
    setNewBlogExcerpt('');
    setNewBlogContent('');
    setBlogCoverFileName('');
    setNewBlogCover('/src/assets/images/bsm_hero_warehouse_1790577715463.jpg');
    if (blogFileInputRef.current) blogFileInputRef.current.value = '';
    triggerFeedback('Artikel blog baru berhasil dipublikasikan!');
  };

  // ------------------------------------------
  // ACTION: SIMPAN EDIT BLOG
  // ------------------------------------------
  const handleSaveEditedBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlogPost) return;

    const updated = blogPosts.map((post) => (post.id === editingBlogPost.id ? editingBlogPost : post));
    setBlogPosts(updated);
    localStorage.setItem('bsm_custom_blog_posts', JSON.stringify(updated));
    setEditingBlogPost(null);
    triggerFeedback(`Artikel "${editingBlogPost.title}" berhasil diperbarui!`);
  };

  const handleDeleteBlogPost = (id: string) => {
    const target = blogPosts.find((p) => p.id === id);
    setDeleteConfirm({
      type: 'blog',
      id,
      name: target ? target.title : 'Artikel Berita',
      details: target ? `Kategori: ${target.category}` : undefined
    });
  };

  // ------------------------------------------
  // ACTION: SIMPAN EDIT TESTIMONIAL
  // ------------------------------------------
  const handleSaveEditedTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    const updated = testimonials.map((t) => (t.id === editingTestimonial.id ? editingTestimonial : t));
    setTestimonials(updated);
    localStorage.setItem('bsm_custom_testimonials', JSON.stringify(updated));
    setEditingTestimonial(null);
    triggerFeedback(`Testimoni dari ${editingTestimonial.author} berhasil diperbarui!`);
  };

  const handleDeleteTestimonial = (id: string) => {
    const target = testimonials.find((t) => t.id === id);
    setDeleteConfirm({
      type: 'testimonial',
      id,
      name: target ? `Ulasan dari ${target.author}` : 'Testimoni',
      details: target ? `${target.workshopName} (${target.city})` : undefined
    });
  };

  const handleRequestResetDefaults = () => {
    setDeleteConfirm({
      type: 'reset',
      name: 'Reset Semua Data ke Default Pabrik',
      details: 'Semua katalog produk, artikel berita, dan ulasan akan dikembalikan ke setelan awal pabrik.'
    });
  };

  const handleConfirmAction = () => {
    if (!deleteConfirm) return;

    if (deleteConfirm.type === 'product' && deleteConfirm.id) {
      const targetId = deleteConfirm.id;
      const targetName = deleteConfirm.name;
      const updated = products.filter((p) => p.id !== targetId);
      setProducts(updated);
      localStorage.setItem('bsm_custom_products', JSON.stringify(updated));
      triggerFeedback(`Produk "${targetName}" berhasil dihapus.`);
    } else if (deleteConfirm.type === 'blog' && deleteConfirm.id) {
      const targetId = deleteConfirm.id;
      const targetTitle = deleteConfirm.name;
      const updated = blogPosts.filter((p) => p.id !== targetId);
      setBlogPosts(updated);
      localStorage.setItem('bsm_custom_blog_posts', JSON.stringify(updated));
      triggerFeedback(`Artikel "${targetTitle}" berhasil dihapus.`);
    } else if (deleteConfirm.type === 'testimonial' && deleteConfirm.id) {
      const targetId = deleteConfirm.id;
      const updated = testimonials.filter((t) => t.id !== targetId);
      setTestimonials(updated);
      localStorage.setItem('bsm_custom_testimonials', JSON.stringify(updated));
      triggerFeedback('Ulasan berhasil dihapus.');
    } else if (deleteConfirm.type === 'reset') {
      onResetDefaults();
      triggerFeedback('Semua data berhasil dikembalikan ke default pabrik.');
    }

    setDeleteConfirm(null);
  };

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </button>

            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition-colors shadow-sm"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-600" />
              <span>Ubah Kata Sandi Admin</span>
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleRequestResetDefaults}
              className="text-xs text-rose-600 hover:text-rose-800 font-medium underline flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default Pabrik</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-white hover:bg-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Kunci & Keluar CMS</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {saveSuccessMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 shadow-sm animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* CMS Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <BsmLogo size="md" className="bg-white p-1 rounded-lg" />
              <div>
                <h1 className="text-xl font-bold">Sistem Manajemen Konten (CMS)</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kelola, tambah, edit data produk & spesifikasi, artikel berita, dan ulasan pelanggan secara mandiri.
                </p>
              </div>
            </div>

            {/* Nav Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'products'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Katalog Produk ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('blog')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'blog'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Artikel Blog ({blogPosts.length})
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'testimonials'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Testimoni ({testimonials.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            
            {/* ======================================================== */}
            {/* TAB 1: PRODUK (TAMBAH + EDIT + HAPUS)                    */}
            {/* ======================================================== */}
            {activeTab === 'products' && (
              <div className="space-y-8">
                {/* Form Tambah Produk dengan Upload Gambar */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-blue-700" />
                      <span>Tambah Produk Baru & Upload Foto</span>
                    </h3>
                    <span className="text-[11px] text-slate-500">Mendukung format JPG, PNG, WEBP (Otomatis Kompresi)</span>
                  </div>

                  <form onSubmit={handleAddProduct} className="space-y-6">
                    
                    {/* SECTION UPLOAD GAMBAR */}
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <label className="block text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-blue-700" />
                        <span>Foto / Gambar Produk</span>
                        <span className="text-rose-500">*</span>
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        {/* Preview Box 4:3 */}
                        <div className="md:col-span-4 aspect-[4/3] bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 overflow-hidden relative group flex items-center justify-center">
                          {newProdImage ? (
                            <>
                              <img
                                src={newProdImage}
                                alt="Pratinjau Produk"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-3 py-1.5 bg-white text-slate-900 text-xs font-semibold rounded shadow-md flex items-center gap-1.5"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Ganti Foto</span>
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="text-center p-4 text-slate-400">
                              <ImageIcon className="w-8 h-8 mx-auto mb-1 text-slate-300" />
                              <span className="text-xs">Belum ada foto</span>
                            </div>
                          )}
                          {isUploadingImage && (
                            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                              <span className="text-xs font-semibold text-blue-700 animate-pulse">Memproses Foto...</span>
                            </div>
                          )}
                        </div>

                        {/* Upload Controls */}
                        <div className="md:col-span-8 space-y-3">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleProductImageChange}
                            className="hidden"
                            id="product-file-upload"
                          />

                          <div className="flex flex-wrap items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
                            >
                              <Upload className="w-4 h-4" />
                              <span>Pilih File Gambar dari Komputer / HP</span>
                            </button>

                            {imageFileName && (
                              <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded border border-slate-200">
                                {imageFileName}
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            Pilih file foto dari galeri HP atau komputer Anda. Gambar akan otomatis dioptimalkan agar website tetap cepat dimuat.
                          </p>

                          {/* Preset Sample Images */}
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                              Atau pilih dari foto master katalog:
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setNewProdImage('/src/assets/images/bsm_product_oil_1790577728878.jpg');
                                  setImageFileName('Preset Oli BSM');
                                }}
                                className="px-2.5 py-1 text-[11px] rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-200"
                              >
                                Foto Botol Pelumas
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setNewProdImage('/src/assets/images/bsm_product_parts_1790577740282.jpg');
                                  setImageFileName('Preset Busi & Kampas');
                                }}
                                className="px-2.5 py-1 text-[11px] rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-200"
                              >
                                Foto Busi & Kampas
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setNewProdImage('/src/assets/images/bsm_hero_warehouse_1790577715463.jpg');
                                  setImageFileName('Preset Gudang');
                                }}
                                className="px-2.5 py-1 text-[11px] rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-200"
                              >
                                Foto Dus Gudang
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DETAIL SPESIFIKASI PRODUK */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nama Produk <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Oli Shock Depan BSM 200ml"
                          value={newProdName}
                          onChange={(e) => setNewProdName(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Kode SKU / Master <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: OLI-SCK-07"
                          value={newProdCode}
                          onChange={(e) => setNewProdCode(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                        <select
                          value={newProdCategory}
                          onChange={(e) => setNewProdCategory(e.target.value as any)}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                        >
                          <option value="Oli & Pelumas">Oli & Pelumas</option>
                          <option value="Busi">Busi</option>
                          <option value="Ban">Ban</option>
                          <option value="Pengereman">Pengereman</option>
                          <option value="Transmisi">Transmisi</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Satuan Kemasan</label>
                        <select
                          value={newProdUnit}
                          onChange={(e) => setNewProdUnit(e.target.value as any)}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                        >
                          <option value="BOTOL">BOTOL</option>
                          <option value="PCS">PCS</option>
                          <option value="DUS">DUS</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 lg:col-span-4">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Singkat Produk</label>
                        <textarea
                          rows={2}
                          placeholder="Fungsi utama, kecocokan tipe motor (matic/manual/bebek), serta spesifikasi keunggulan..."
                          value={newProdDesc}
                          onChange={(e) => setNewProdDesc(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>

                      {/* SPESIFIKASI TEKNIS OEM */}
                      <div className="sm:col-span-2 lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2.5">
                          <div>
                            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                              <span>Spesifikasi Teknis OEM</span>
                              <span className="text-[11px] font-normal text-slate-500">(Bisa ditambah, diedit, atau dihapus)</span>
                            </label>
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              Poin-poin spesifikasi ini akan langsung tampil di pop-up spesifikasi pada katalog publik.
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setNewProdSpecs([...newProdSpecs, ''])}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-md transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Tambah Poin Spek</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {newProdSpecs.map((spec, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2">
                              <span className="text-[11px] font-mono font-bold text-slate-400 w-5 text-right">
                                {sIdx + 1}.
                              </span>
                              <input
                                type="text"
                                placeholder={`Contoh: Sertifikasi Standar OEM ${sIdx + 1}`}
                                value={spec}
                                onChange={(e) => {
                                  const updated = [...newProdSpecs];
                                  updated[sIdx] = e.target.value;
                                  setNewProdSpecs(updated);
                                }}
                                className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                              />
                              <button
                                type="button"
                                onClick={() => setNewProdSpecs(newProdSpecs.filter((_, i) => i !== sIdx))}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                                title="Hapus spesifikasi ini"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                          {newProdSpecs.length === 0 && (
                            <p className="text-xs text-slate-400 italic py-1">Belum ada poin spesifikasi. Klik tombol di atas untuk menambah.</p>
                          )}
                        </div>

                        {/* Quick preset suggestions */}
                        <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                          <span className="font-semibold text-slate-700">Preset Cepat:</span>
                          {[
                            'Kualitas Standar OEM',
                            'Garansi Resmi Pabrik',
                            'Lolos Uji Durabilitas',
                            'Sertifikasi SNI & ISO',
                            'Tahan Panas & Gesekan Ekstrem',
                            'Presisi Tinggi Pabrikan'
                          ].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => {
                                if (!newProdSpecs.includes(preset)) {
                                  setNewProdSpecs([...newProdSpecs, preset]);
                                }
                              }}
                              className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-700 text-slate-600 transition-colors shadow-2xs"
                            >
                              + {preset}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-3 border-t border-slate-200">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Simpan & Terbitkan Produk ke Katalog</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* List Produk dengan Tombol EDIT & HAPUS */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Daftar Master Produk Terdaftar ({products.length} Item)
                    </h3>
                    <span className="text-[11px] text-slate-500">Klik ikon pensil biru untuk mengedit produk</span>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-100 uppercase text-[11px] font-bold text-slate-800 border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3 w-16 text-center">Foto</th>
                          <th className="py-2.5 px-3 w-28">Kode SKU</th>
                          <th className="py-2.5 px-4 min-w-[200px]">Nama Produk & Spek</th>
                          <th className="py-2.5 px-3">Kategori</th>
                          <th className="py-2.5 px-3">Satuan</th>
                          <th className="py-2.5 px-3 text-center w-24">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {products.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2 px-3 text-center">
                              <div className="w-10 h-10 rounded-md bg-slate-100 border border-slate-200 overflow-hidden mx-auto">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                              </div>
                            </td>
                            <td className="py-2.5 px-3 font-mono text-blue-700 font-semibold">{p.code}</td>
                            <td className="py-2.5 px-4">
                              <div className="font-bold text-slate-900">{p.name}</div>
                              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                                <span className="bg-slate-100 px-1.5 py-0.2 rounded font-mono text-[10px] text-slate-600">
                                  {p.specs?.length || 0} Spek OEM
                                </span>
                                <span className="truncate max-w-[220px]">
                                  {p.specs?.slice(0, 2).join(' · ')}
                                </span>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">{p.category}</td>
                            <td className="py-2.5 px-3 font-mono">{p.unit}</td>
                            <td className="py-2.5 px-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setEditingProduct({ ...p })}
                                  className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                  title="Edit Produk ini"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded transition-colors"
                                  title="Hapus produk"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 2: BLOG POSTS (TAMBAH + EDIT + HAPUS)                */}
            {/* ======================================================== */}
            {activeTab === 'blog' && (
              <div className="space-y-8">
                {/* Form Tambah Artikel */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-blue-700" />
                    <span>Tulis & Terbitkan Artikel Berita Baru</span>
                  </h3>

                  <form onSubmit={handleAddBlogPost} className="space-y-4">
                    {/* SECTION UPLOAD FOTO COVER ARTIKEL */}
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <label className="block text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-blue-700" />
                        <span>Foto Cover / Gambar Utama Artikel</span>
                        <span className="text-slate-400 font-normal">(Rasio 16:9 Landscape)</span>
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        {/* Preview Box 16:9 */}
                        <div className="md:col-span-5 aspect-[16/9] bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 overflow-hidden relative group flex items-center justify-center">
                          {newBlogCover ? (
                            <>
                              <img
                                src={newBlogCover}
                                alt="Pratinjau Cover Artikel"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => blogFileInputRef.current?.click()}
                                  className="px-3 py-1.5 bg-white text-slate-900 text-xs font-semibold rounded shadow-md flex items-center gap-1.5"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Ganti Foto</span>
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="text-center p-4 text-slate-400">
                              <ImageIcon className="w-8 h-8 mx-auto mb-1 text-slate-300" />
                              <span className="text-xs">Belum ada foto</span>
                            </div>
                          )}
                          {isUploadingBlogCover && (
                            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                              <span className="text-xs font-semibold text-blue-700 animate-pulse">Memproses Foto...</span>
                            </div>
                          )}
                        </div>

                        {/* Upload Controls */}
                        <div className="md:col-span-7 space-y-3">
                          <input
                            ref={blogFileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleBlogCoverChange}
                            className="hidden"
                            id="blog-file-upload"
                          />

                          <div className="flex flex-wrap items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => blogFileInputRef.current?.click()}
                              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
                            >
                              <Upload className="w-4 h-4" />
                              <span>Pilih File Gambar dari Komputer / HP</span>
                            </button>

                            {blogCoverFileName && (
                              <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded border border-slate-200 truncate max-w-[200px]">
                                {blogCoverFileName}
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            Upload foto ilustrasi atau berita kegiatan. Gambar dikompresi otomatis untuk menjaga kecepatan loading website.
                          </p>

                          {/* Preset Sample Images */}
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                              Atau pilih foto cover cepat:
                            </span>
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setNewBlogCover('/src/assets/images/bsm_hero_warehouse_1790577715463.jpg');
                                  setBlogCoverFileName('Preset Gudang Logistik');
                                }}
                                className="px-2.5 py-1 text-[11px] rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-200"
                              >
                                Foto Gudang & Logistik
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setNewBlogCover('/src/assets/images/bsm_product_oil_1790577728878.jpg');
                                  setBlogCoverFileName('Preset Pelumas Mesin');
                                }}
                                className="px-2.5 py-1 text-[11px] rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-200"
                              >
                                Foto Edukasi Oli
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setNewBlogCover('/src/assets/images/bsm_product_parts_1790577740282.jpg');
                                  setBlogCoverFileName('Preset Sparepart Busi');
                                }}
                                className="px-2.5 py-1 text-[11px] rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-200"
                              >
                                Foto Suku Cadang & Busi
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setNewBlogCover('/src/assets/images/bsm_workshop_owner_1790577752304.jpg');
                                  setBlogCoverFileName('Preset Bengkel');
                                }}
                                className="px-2.5 py-1 text-[11px] rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium border border-slate-200"
                              >
                                Foto Bengkel Rekanan
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Artikel</label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Tips Menjaga Usia Pakai Kampas Rem Motor Bebek & Matic"
                          value={newBlogTitle}
                          onChange={(e) => setNewBlogTitle(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                        <select
                          value={newBlogCategory}
                          onChange={(e) => setNewBlogCategory(e.target.value as any)}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                        >
                          <option value="Tips Bengkel">Tips Bengkel</option>
                          <option value="Produk & Spek">Produk & Spek</option>
                          <option value="Kabar Perusahaan">Kabar Perusahaan</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Ringkasan / Excerpt</label>
                      <input
                        type="text"
                        placeholder="Ringkasan 1-2 kalimat untuk kartu artikel..."
                        value={newBlogExcerpt}
                        onChange={(e) => setNewBlogExcerpt(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Isi Konten Lengkap</label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Tuliskan isi artikel lengkap..."
                        value={newBlogContent}
                        onChange={(e) => setNewBlogContent(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Publikasikan Artikel Sekarang</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* List Artikel dengan Tombol EDIT & HAPUS */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Daftar Artikel Blog yang Terpublikasi ({blogPosts.length} Artikel)
                    </h3>
                    <span className="text-[11px] text-slate-500">Klik ikon pensil untuk mengedit teks / isi</span>
                  </div>

                  <div className="space-y-3">
                    {blogPosts.map((post) => (
                      <div
                        key={post.id}
                        className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-4 hover:border-slate-300 transition-colors"
                      >
                        <div className="w-16 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                            <span className="font-semibold text-blue-700">{post.category}</span>
                            <span>·</span>
                            <span>{post.date}</span>
                            <span>·</span>
                            <span>{post.readTime}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 truncate">{post.title}</h4>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{post.excerpt}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => setEditingBlogPost({ ...post })}
                            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                            title="Edit artikel"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlogPost(post.id)}
                            className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded transition-colors"
                            title="Hapus artikel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 3: TESTIMONIALS (EDIT + HAPUS)                       */}
            {/* ======================================================== */}
            {activeTab === 'testimonials' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Kelola Ulasan & Testimoni Pelanggan ({testimonials.length} Ulasan)
                  </h3>
                  <span className="text-[11px] text-slate-500">Klik ikon pensil untuk mengedit teks atau bintang</span>
                </div>

                <div className="space-y-3">
                  {testimonials.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-4 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-xs text-slate-900">{t.author}</span>
                          <span className="text-[11px] text-slate-500">({t.role} · {t.workshopName}, {t.city})</span>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 italic line-clamp-2">"{t.review}"</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => setEditingTestimonial({ ...t })}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                          title="Edit testimoni ini"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded transition-colors"
                          title="Hapus ulasan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* MODAL 1: EDIT PRODUK POPUP                               */}
      {/* ======================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-base font-bold">Edit Informasi Produk</h3>
                  <p className="text-xs text-slate-400 font-mono">Kode SKU: {editingProduct.code}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedProduct} className="p-6 space-y-5">
              
              {/* Ganti Foto Produk saat Edit */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Foto Produk (Bisa Ganti / Upload Baru)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0 relative">
                    <img
                      src={editingProduct.image}
                      alt={editingProduct.name}
                      className="w-full h-full object-cover"
                    />
                    {isUploadingEditImage && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-blue-700">Loading...</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <input
                      ref={editProductFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleEditProductImageChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => editProductFileInputRef.current?.click()}
                      className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Foto Baru</span>
                    </button>
                    <p className="text-[11px] text-slate-500">
                      Pilih gambar baru dari HP/komputer untuk mengganti foto saat ini.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Form Edit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Produk</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kode SKU / Master</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.code}
                    onChange={(e) => setEditingProduct({ ...editingProduct, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  >
                    <option value="Oli & Pelumas">Oli & Pelumas</option>
                    <option value="Busi">Busi</option>
                    <option value="Ban">Ban</option>
                    <option value="Pengereman">Pengereman</option>
                    <option value="Transmisi">Transmisi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Satuan</label>
                  <select
                    value={editingProduct.unit}
                    onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  >
                    <option value="BOTOL">BOTOL</option>
                    <option value="PCS">PCS</option>
                    <option value="DUS">DUS</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Singkat</label>
                  <textarea
                    rows={3}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* SPESIFIKASI TEKNIS OEM (BISA DI-EDIT) */}
                <div className="sm:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2.5">
                    <div>
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <span>Spesifikasi Teknis OEM</span>
                        <span className="text-[11px] font-normal text-slate-500">(Bisa ditambah, diedit teksnya, atau dihapus)</span>
                      </label>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Daftar spesifikasi ini akan langsung diperbarui di halaman katalog produk publik.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingProduct({
                        ...editingProduct,
                        specs: [...(editingProduct.specs || []), '']
                      })}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-md transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Poin Spek</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(editingProduct.specs || []).map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-slate-400 w-5 text-right">
                          {sIdx + 1}.
                        </span>
                        <input
                          type="text"
                          placeholder={`Spesifikasi teknis #${sIdx + 1}`}
                          value={spec}
                          onChange={(e) => {
                            const updated = [...(editingProduct.specs || [])];
                            updated[sIdx] = e.target.value;
                            setEditingProduct({
                              ...editingProduct,
                              specs: updated
                            });
                          }}
                          className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (editingProduct.specs || []).filter((_, i) => i !== sIdx);
                            setEditingProduct({
                              ...editingProduct,
                              specs: updated
                            });
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="Hapus spesifikasi ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {(editingProduct.specs || []).length === 0 && (
                      <p className="text-xs text-slate-400 italic py-1">Belum ada poin spesifikasi. Klik tombol di atas untuk menambah.</p>
                    )}
                  </div>

                  {/* Preset Cepat saat Edit */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Preset Cepat:</span>
                    {[
                      'Kualitas Standar OEM',
                      'Garansi Resmi Pabrik',
                      'Lolos Uji Durabilitas',
                      'Sertifikasi SNI & ISO',
                      'Tahan Panas & Gesekan Ekstrem',
                      'Presisi Tinggi Pabrikan'
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          const currentSpecs = editingProduct.specs || [];
                          if (!currentSpecs.includes(preset)) {
                            setEditingProduct({
                              ...editingProduct,
                              specs: [...currentSpecs, preset]
                            });
                          }
                        }}
                        className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-700 text-slate-600 transition-colors shadow-2xs"
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Produk</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: EDIT BLOG POST POPUP                            */}
      {/* ======================================================== */}
      {editingBlogPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold">Edit Artikel Berita</h3>
              </div>
              <button
                onClick={() => setEditingBlogPost(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedBlogPost} className="p-6 space-y-4">
              {/* Ganti Foto Cover saat Edit */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Foto Cover Artikel (Bisa Ganti / Upload Baru)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full sm:w-44 aspect-[16/9] rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0 relative">
                    <img
                      src={editingBlogPost.coverImage}
                      alt={editingBlogPost.title}
                      className="w-full h-full object-cover"
                    />
                    {isUploadingEditBlogCover && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-blue-700">Loading...</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 w-full">
                    <input
                      ref={editBlogFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleEditBlogCoverChange}
                      className="hidden"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => editBlogFileInputRef.current?.click()}
                        className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Cover Baru</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Pilih file gambar baru dari HP/komputer untuk memperbarui cover artikel ini.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Artikel</label>
                  <input
                    type="text"
                    required
                    value={editingBlogPost.title}
                    onChange={(e) => setEditingBlogPost({ ...editingBlogPost, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={editingBlogPost.category}
                    onChange={(e) => setEditingBlogPost({ ...editingBlogPost, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  >
                    <option value="Tips Bengkel">Tips Bengkel</option>
                    <option value="Produk & Spek">Produk & Spek</option>
                    <option value="Kabar Perusahaan">Kabar Perusahaan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ringkasan / Excerpt</label>
                <input
                  type="text"
                  value={editingBlogPost.excerpt}
                  onChange={(e) => setEditingBlogPost({ ...editingBlogPost, excerpt: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Isi Konten Lengkap</label>
                <textarea
                  rows={6}
                  required
                  value={editingBlogPost.content}
                  onChange={(e) => setEditingBlogPost({ ...editingBlogPost, content: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingBlogPost(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Artikel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: EDIT TESTIMONIAL POPUP                          */}
      {/* ======================================================== */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold">Edit Ulasan Testimoni</h3>
              </div>
              <button
                onClick={() => setEditingTestimonial(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedTestimonial} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.author}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Peran / Jabatan</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.role}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kota / Daerah</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.city}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Bengkel / Toko</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.workshopName}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, workshopName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Rating Bintang (1 - 5)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditingTestimonial({ ...editingTestimonial, rating: star })}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= editingTestimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ulasan / Pengalaman</label>
                <textarea
                  rows={4}
                  required
                  value={editingTestimonial.review}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, review: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Testimoni</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: UBAH KATA SANDI / PIN ADMIN POPUP               */}
      {/* ======================================================== */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">Ubah Kata Sandi Admin CMS</h3>
              </div>
              <button
                onClick={() => {
                  setIsPasswordModalOpen(false);
                  setPasswordError(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdatePassword} className="p-6 space-y-4">
              {passwordError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                  {passwordError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kata Sandi / PIN Baru (Minimal 4 Karakter)
                </label>
                <input
                  type="password"
                  required
                  placeholder="Masukkan kata sandi baru..."
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Konfirmasi Kata Sandi Baru
                </label>
                <input
                  type="password"
                  required
                  placeholder="Ulangi kata sandi baru..."
                  value={confirmAdminPassword}
                  onChange={(e) => setConfirmAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Setelah kata sandi diubah, siapa pun yang ingin membuka CMS Admin harus memasukkan kata sandi baru ini.
              </p>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsPasswordModalOpen(false);
                    setPasswordError(null);
                  }}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Kata Sandi Baru</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL KONFIRMASI HAPUS / RESET (IN-APP POPUP)            */}
      {/* ======================================================== */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6 text-center">
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-600 shadow-inner">
                <AlertTriangle className="w-7 h-7" />
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">
                {deleteConfirm.type === 'reset' ? 'Konfirmasi Reset Data Pabrik' : 'Konfirmasi Hapus Data'}
              </h3>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 text-left">
                <p className="text-sm font-bold text-slate-800 break-words">
                  {deleteConfirm.name}
                </p>
                {deleteConfirm.details && (
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    {deleteConfirm.details}
                  </p>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {deleteConfirm.type === 'reset'
                  ? 'Apakah Anda yakin ingin mereset seluruh data katalog produk, artikel berita, dan ulasan ke setelan default pabrik? Semua perubahan Anda akan dikembalikan.'
                  : 'Data ini akan segera dihapus permanen dari sistem dan tidak akan tampil lagi di katalog publik. Apakah Anda yakin ingin melanjutkan?'}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAction}
                  className="px-4 py-2.5 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Ya, Hapus Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
