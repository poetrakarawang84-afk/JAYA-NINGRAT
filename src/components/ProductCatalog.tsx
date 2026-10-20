import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Search, Info, MessageCircle, Check, X, ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailModalProduct, setDetailModalProduct] = useState<Product | null>(null);
  const [zoomedProduct, setZoomedProduct] = useState<Product | null>(null);

  // Pan & Zoom State for Lightbox
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Reset Pan & Zoom when changing product or opening modal
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
  }, [zoomedProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomedProduct(null);
        setDetailModalProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Zoom Controllers
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.35, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.35, 0.8);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.25, 4));
    } else {
      setScale((prev) => {
        const next = Math.max(prev - 0.25, 0.8);
        if (next <= 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Mouse drag / pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag / pan handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      touchStartRef.current = { x: touch.clientX - position.x, y: touch.clientY - position.y };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - touchStartRef.current.x,
      y: touch.clientY - touchStartRef.current.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Double click toggles between 100% and 200% zoom
  const handleDoubleClick = () => {
    if (scale > 1) {
      handleResetZoom();
    } else {
      setScale(2);
      setPosition({ x: 0, y: 0 });
    }
  };

  const categories = ['Semua', 'Oli & Pelumas', 'Busi', 'Ban', 'Pengereman', 'Transmisi'];

  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInquireProduct = (product: Product) => {
    const text = encodeURIComponent(
      `Halo Tim Sales PT Bintang Semesta Motor, saya ingin menanyakan penawaran harga grosir dan ketersediaan untuk produk: [${product.code}] ${product.name}. Mohon informasi minimal pemesanan dan pengiriman.`
    );
    window.open(`https://wa.me/6281288889999?text=${text}`, '_blank');
  };

  return (
    <section id="produk" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
              Katalog Suku Cadang & Pelumas Resmi
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Produk Unggulan Distributor PT BSM
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl">
              Seluruh produk telah melewati sertifikasi pengujian ketahanan dan memenuhi spesifikasi teknis pabrikan kendaraan bermotor terkemuka.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kode atau nama produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-lg overflow-x-auto mb-8 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-slate-300 transition-all hover:shadow-sm group"
            >
              {/* Image Aspect 4:3 with click to zoom preview */}
              <div 
                onClick={() => setZoomedProduct(product)}
                className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer group/img"
                title="Klik untuk memperbesar gambar produk"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Hover zoom overlay badge */}
                <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-sm text-white text-xs font-semibold shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                    <span>Klik Perbesar</span>
                  </span>
                </div>

                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-mono px-2 py-0.5 rounded">
                  {product.code}
                </div>
                {product.isPopular && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-sm">
                    Terlaris
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-slate-500 mb-1">
                    <span>{product.category}</span>
                    <span className="mx-1.5">·</span>
                    <span>Satuan: {product.unit}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDetailModalProduct(product)}
                      className="py-2 px-3 text-xs font-medium rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Info className="w-3.5 h-3.5 text-slate-500" />
                      <span>Spesifikasi</span>
                    </button>
                    <button
                      onClick={() => handleInquireProduct(product)}
                      className="py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Tanya via WA</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-sm font-medium text-slate-600">Tidak ada produk yang cocok dengan pencarian.</p>
            <button
              onClick={() => { setSelectedCategory('Semua'); setSearchQuery(''); }}
              className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {detailModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {detailModalProduct.code}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {detailModalProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setDetailModalProduct(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Product Photo Preview (Click to Zoom) */}
              <div 
                onClick={() => setZoomedProduct(detailModalProduct)}
                className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer group"
                title="Klik untuk melihat foto resolusi besar"
              >
                <img 
                  src={detailModalProduct.image} 
                  alt={detailModalProduct.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                    <span>Klik Perbesar Foto</span>
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400 mb-1">Deskripsi Produk</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {detailModalProduct.description}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400 mb-2">Spesifikasi Teknis OEM</p>
                <ul className="space-y-1.5">
                  {detailModalProduct.specs.map((spec, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block">Kategori Distribusi</span>
                  <span className="font-semibold text-slate-800">{detailModalProduct.category}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Kemasan Minimum</span>
                  <span className="font-semibold text-slate-800">{detailModalProduct.minOrder} {detailModalProduct.unit}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Sistem Pembelian</span>
                  <span className="font-semibold text-blue-700">Khusus Grosir Mitra</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                onClick={() => setDetailModalProduct(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  handleInquireProduct(detailModalProduct);
                  setDetailModalProduct(null);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Konsultasi Produk via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* LIGHTBOX / ZOOM & GESER GAMBAR PRODUK MODAL             */}
      {/* ======================================================== */}
      {zoomedProduct && (
        <div 
          onClick={() => setZoomedProduct(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-150 select-none"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-slate-900 rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 cursor-default"
          >
            {/* Modal Header */}
            <div className="p-3.5 sm:px-6 bg-slate-950/95 border-b border-slate-800 flex items-center justify-between gap-3 text-white z-20">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/80 border border-blue-800/80 px-2 py-0.5 rounded">
                  {zoomedProduct.code}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                    {zoomedProduct.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {zoomedProduct.category} · Satuan: {zoomedProduct.unit}
                  </p>
                </div>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomedProduct(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Tutup (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Floating Zoom & Pan Controls Toolbar */}
            <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-full shadow-2xl text-white">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={scale <= 0.8}
                className="p-1.5 hover:bg-slate-800 disabled:opacity-30 rounded-full text-slate-300 hover:text-white transition-colors"
                title="Perkecil Zoom (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="font-mono text-xs font-bold px-1.5 min-w-[46px] text-center text-blue-400 select-none">
                {Math.round(scale * 100)}%
              </span>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={scale >= 4}
                className="p-1.5 hover:bg-slate-800 disabled:opacity-30 rounded-full text-slate-300 hover:text-white transition-colors"
                title="Perbesar Zoom (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-4 bg-slate-700 mx-1" />

              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1.5 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white transition-colors"
                title="Reset Ukuran (100%)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 pl-1 border-l border-slate-700 ml-1">
                <Move className="w-3 h-3 text-slate-400" />
                <span>Klik & geser gambar · Scroll untuk zoom</span>
              </div>
            </div>

            {/* Interactive Pan & Zoom Canvas */}
            <div 
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onDoubleClick={handleDoubleClick}
              className={`relative bg-slate-950 flex items-center justify-center p-4 min-h-[360px] h-[65vh] sm:h-[70vh] overflow-hidden select-none ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              <img
                src={zoomedProduct.image}
                alt={zoomedProduct.name}
                draggable={false}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out'
                }}
                className="max-h-full max-w-full w-auto h-auto object-contain pointer-events-none select-none rounded-lg shadow-2xl origin-center"
              />

              {/* Bottom hint badge */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-80 sm:opacity-90">
                <span className="text-[11px] bg-slate-900/80 backdrop-blur-sm text-slate-300 px-3 py-1 rounded-full border border-slate-700/60 shadow">
                  {scale > 1 ? '🔍 Gambar diperbesar · Geser mouse untuk menjelajah' : '💡 Klik 2x atau gunakan tombol di atas untuk zoom & geser'}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:px-6 bg-slate-950/95 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5 z-20">
              <p className="text-xs text-slate-400 max-w-md line-clamp-1 hidden sm:block">
                {zoomedProduct.description}
              </p>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setZoomedProduct(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    handleInquireProduct(zoomedProduct);
                    setZoomedProduct(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Tanya via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
