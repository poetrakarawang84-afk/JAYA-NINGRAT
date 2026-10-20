import { Product, Testimonial, BlogPost } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    code: 'OLI-MTC-01',
    name: 'Oli Matic Sintetik BSM Max 10W-40 0.8L',
    category: 'Oli & Pelumas',
    unit: 'BOTOL',
    price: 54000,
    stock: 480,
    minOrder: 1,
    description: 'Pelumas matic teknologi ester mutakhir dengan aditif anti-wear tingkat tinggi. Menjaga suhu transmisi tetap dingin dan tarikan enteng.',
    specs: ['SAE 10W-40', 'JASO MB', 'API SL', 'Isi 800ml', 'Direkomendasikan untuk matic 110cc - 160cc'],
    image: '/src/assets/images/bsm_product_oil_1790577728878.jpg',
    isPopular: true
  },
  {
    id: 'prod-2',
    code: 'BSI-INJ-02',
    name: 'Busi Injeksi Iridium Dual Platinum BSM',
    category: 'Busi',
    unit: 'PCS',
    price: 28500,
    stock: 1200,
    minOrder: 1,
    description: 'Busi elektroda iridium 0.6mm menghasilkan percikan api fokus dan pembakaran tuntas. Tahan hingga 40.000 KM.',
    specs: ['Elektroda Iridium 0.6mm', 'Resistor 5k Ohm', 'Tahan Panas Ekstrem', 'Kompatibel Honda / Yamaha / Suzuki Injeksi'],
    image: '/src/assets/images/bsm_product_parts_1790577740282.jpg',
    isPopular: true
  },
  {
    id: 'prod-3',
    code: 'BAN-LUR-03',
    name: 'Ban Luar Tubeless BSM ProGrip 90/90-14',
    category: 'Ban',
    unit: 'PCS',
    price: 185000,
    stock: 240,
    minOrder: 1,
    description: 'Ban tapak lebar kompon medium-soft dengan alur pembuang air diagonal. Daya cengkeram maksimal di jalan basah maupun kering.',
    specs: ['Ukuran 90/90-14 Tubeless', 'Pattern V-Grip Hydro', 'Medium Soft Compound', 'Sertifikasi SNI & ISO 9001'],
    image: '/src/assets/images/bsm_product_parts_1790577740282.jpg',
    isPopular: true
  },
  {
    id: 'prod-4',
    code: 'KMP-REM-04',
    name: 'Kampas Rem Depan Cakram BSM Ceramic Disc Pad',
    category: 'Pengereman',
    unit: 'PCS',
    price: 38000,
    stock: 850,
    minOrder: 1,
    description: 'Kampas rem formula keramik non-asbes yang tidak merusak piringan cakram, minim debu, dan tahan pengereman intensif.',
    specs: ['Bahan Ceramic Non-Asbestos', 'Daya Gigit Konstan', 'Anti-Decit', 'Sertifikasi DOT 4 Compatible'],
    image: '/src/assets/images/bsm_product_parts_1790577740282.jpg',
    isPopular: true
  },
  {
    id: 'prod-5',
    code: 'OLI-GRD-05',
    name: 'Oli Gardan Matic BSM Gear Oil 120ml',
    category: 'Oli & Pelumas',
    unit: 'BOTOL',
    price: 16500,
    stock: 620,
    minOrder: 2,
    description: 'Pelumas roda gigi transmisi otomatis dengan aditif extreme-pressure untuk mencegah gesekan dan keausan gear box.',
    specs: ['SAE 80W-90', 'API GL-5', 'Isi 120ml', 'Aplikasi per 8.000 KM'],
    image: '/src/assets/images/bsm_product_oil_1790577728878.jpg',
    isPopular: false
  },
  {
    id: 'prod-6',
    code: 'VBL-ROLR-06',
    name: 'V-Belt & Roller Kit Beat / Vario BSM Super Kevlar',
    category: 'Transmisi',
    unit: 'PCS',
    price: 125000,
    stock: 190,
    minOrder: 1,
    description: 'Paket sabuk transmisi berlapis serat Kevlar aramid dan roller teflon presisi tinggi untuk akselerasi responsif dan awet.',
    specs: ['Bahan EPDM + Kevlar Aramid', 'Roller Teflon 13 Gram', 'Tahan Tarikan 25.000 RPM', 'Garansi 6 Bulan'],
    image: '/src/assets/images/bsm_product_parts_1790577740282.jpg',
    isPopular: false
  }
];

export const INITIAL_CUSTOMERS = [
  'CASH',
  'Toko Maju Jaya Motor - Kebon Jeruk',
  'Bengkel Berkah Abadi Motor - Tangerang',
  'Sentral Motor Perkasa - Bandung',
  'Surya Kencana Motor - Semarang',
  'Mitra Sejati Onderdil - Bekasi'
];

export const INITIAL_SALESMEN = [
  'Budi Santoso (SL01)',
  'Rian Pratama (SL02)',
  'Siti Rahmawati (SL03)',
  'Agus Supriyadi (SL04)'
];

export const INITIAL_WAREHOUSES = [
  'GUDANG HO - PT. BSM',
  'GUDANG CABANG SURABAYA - BSM',
  'GUDANG LOGISTIK SEMARANG - BSM',
  'GUDANG HUB BANDUNG - BSM'
];

export const INITIAL_BRANCHES = [
  'PUSAT - JAKARTA',
  'CABANG SURABAYA',
  'CABANG SEMARANG',
  'CABANG BANDUNG'
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    author: 'Hendra Gunawan',
    role: 'Owner & Kepala Bengkel',
    workshopName: 'Bengkel Maju Jaya Motor',
    city: 'Jakarta Barat',
    rating: 5,
    review: 'Sudah lebih dari 4 tahun kami mempercayakan pasokan sparepart ke PT Bintang Semesta Motor. Ketersediaan Oli Matic Sintetik dan Kampas Rem selalu terjamin, tidak pernah kosong stok. Pelanggan kami sangat puas karena tarikan motor jadi lebih enteng dan rem tidak berdecit.',
    avatar: '/src/assets/images/bsm_workshop_owner_1790577752304.jpg',
    verifiedPartner: true,
    date: '15 September 2026',
    tags: ['Oli Matic', 'Kampas Rem', 'Mitra Prioritas']
  },
  {
    id: 'testi-2',
    author: 'Didik Riyadi',
    role: 'Master Mekanik',
    workshopName: 'Berkah Abadi Servis Motor',
    city: 'Tangerang',
    rating: 5,
    review: 'Busi Injeksi Iridium Dual Platinum BSM sangat diminati para pengendara ojek online dan pekerja komuter. Pengapian jauh lebih stabil dan tahan banting. Pemesanan via Sales Order ERP Beecloud sangat cepat, pesanan sore hari langsung sampai besok pagi.',
    avatar: '/src/assets/images/bsm_workshop_owner_1790577752304.jpg',
    verifiedPartner: true,
    date: '2 September 2026',
    tags: ['Busi Injeksi', 'Layanan Cepat', 'Kemitraan 3 Thn']
  },
  {
    id: 'testi-3',
    author: 'Ratna Sari',
    role: 'Manajer Pembelian',
    workshopName: 'Toko Onderdil Sentral Motor',
    city: 'Bandung',
    rating: 5,
    review: 'Harga grosir dari PT BSM sangat kompetitif untuk kelas distributor resmi dengan jaminan barang 100% original pabrik. Penagihan dan faktur pajaknya rapi sekali, sesuai standar pembukuan enterprise.',
    avatar: '/src/assets/images/bsm_workshop_owner_1790577752304.jpg',
    verifiedPartner: true,
    date: '28 Agustus 2026',
    tags: ['Grosir Ritel', 'Faktur Resmi', 'Ban Tubeless']
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: '5-cara-membedakan-oli-matic-asli-vs-palsu',
    title: '5 Cara Mudah Membedakan Oli Matic Asli vs Rekondisi di Bengkel',
    excerpt: 'Jangan sampai bengkel Anda merugi karena reputasi oli oplosan. Kenali ciri fisik segel botol, aroma kimia, dan nomor batch produksi resmi PT BSM.',
    content: `Peredaran oli palsu atau pelumas oplosan masih menjadi ancaman serius bagi keselamatan mesin kendaraan dan reputasi bengkel independen di Indonesia. Pelumas yang tidak sesuai standar viskositas dapat menyebabkan kerusakan fatal pada komponen CVT, piston baret, hingga overheat mesin dalam kurun waktu kurang dari 1.000 KM.\n\nBerikut 5 langkah validasi oli resmi:\n1. Cek Segel Hologram Laser pada tutup botol yang memantulkan logo PT BSM.\n2. Periksa nomor seri batch di leher botol yang harus identik dengan cetakan barcode kardus distributor.\n3. Warna oli asli jernih keemasan dan tidak berbau menyengat atau berbau hangus.\n4. Gunakan fitur QR scanner resmi untuk memverifikasi autentisitas di server pusat.\n5. Selalu minta faktur resmi Sales Order ber-PPN dari distributor resmi berlisensi.`,
    category: 'Tips Bengkel',
    author: 'Tim Teknis PT BSM',
    date: '24 September 2026',
    readTime: '4 menit baca',
    coverImage: '/src/assets/images/bsm_product_oil_1790577728878.jpg',
    tags: ['Oli Asli', 'Edukasi Bengkel', 'Perawatan CVT'],
    views: 1420
  },
  {
    id: 'post-2',
    slug: 'keunggulan-busi-iridium-untuk-motor-injeksi',
    title: 'Keunggulan Busi Iridium: Tingkatkan Efisiensi BBM Motor Injeksi Modern',
    excerpt: 'Pelajari mengapa busi berujung elektroda 0.6mm iridium mampu membakar tuntas campuran bahan bakar bahkan pada kompresi mesin rasio tinggi.',
    content: `Mesin motor injeksi generasi terbaru seperti eSP+, Blue Core, dan VVA menuntut pengapian berenergi tinggi yang konsisten pada setiap siklus langkah tenaga. Busi nikel konvensional cenderung mengalami degradasi celah loncatan api setelah 8.000 KM.\n\nDengan material Iridium Platinum BSM yang memiliki titik lebur melebihi 2.400 derajat Celsius, elektroda tidak mudah terkikis. Hasil uji lab menunjukkan peningkatan efisiensi konsumsi bahan bakar hingga 8.5% dan akselerasi responsif seketika putaran gas dipelintir.`,
    category: 'Produk & Spek',
    author: 'Ir. Aditya Pratama (R&D Specialist)',
    date: '18 September 2026',
    readTime: '5 menit baca',
    coverImage: '/src/assets/images/bsm_product_parts_1790577740282.jpg',
    tags: ['Busi Iridium', 'Efisiensi BBM', 'Injeksi'],
    views: 980
  },
  {
    id: 'post-3',
    slug: 'perluasan-gudang-distribusi-hub-jawa-timur',
    title: 'PT Bintang Semesta Motor Resmi Operasikan Pusat Distribusi Baru di Surabaya',
    excerpt: 'Fasilitas gudang seluas 4.500 m2 ini memangkas lead time pengiriman sparepart ke wilayah Jawa Timur, Bali, dan Nusa Tenggara menjadi maksimal 24 jam.',
    content: `Sebagai wujud komitmen melayani lebih dari 15.000 bengkel rekanan di seluruh Indonesia, PT Bintang Semesta Motor meresmikan operasional Pusat Distribusi Terpadu Surabaya. Gudang ini terintegrasi penuh dengan sistem cloud ERP Beecloud sehingga setiap Sales Order yang masuk dapat langsung teralokasikan ke rak stok terdekat secara otomatis dalam hitungan menit.`,
    category: 'Kabar Perusahaan',
    author: 'Corporate Secretary BSM',
    date: '10 September 2026',
    readTime: '3 menit baca',
    coverImage: '/src/assets/images/bsm_hero_warehouse_1790577715463.jpg',
    tags: ['Logistik', 'Ekspansi Gudang', 'Beecloud ERP'],
    views: 2150
  }
];
