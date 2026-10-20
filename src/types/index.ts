export interface Product {
  id: string;
  code: string;
  name: string;
  category: 'Oli & Pelumas' | 'Busi' | 'Ban' | 'Pengereman' | 'Transmisi';
  unit: 'BOTOL' | 'PCS' | 'DUS';
  price: number;
  stock: number;
  minOrder: number;
  description: string;
  specs: string[];
  image: string;
  isPopular?: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  productCode: string;
  productName: string;
  qty: number;
  unit: string;
  price: number;
  discountPercent: number;
  subtotal: number;
}

export interface SalesOrder {
  id: string;
  orderNo: string;
  date: string;
  customer: string;
  salesman: string;
  warehouse: string;
  branch: string;
  status: 'Belum Dikirim' | 'Diproses' | 'Dikirim' | 'Selesai';
  items: OrderItem[];
  notes: string;
  isPpn: boolean;
  discountNote: number;
  subtotal: number;
  ppnAmount: number;
  grandTotal: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  workshopName: string;
  city: string;
  rating: number;
  review: string;
  avatar: string;
  verifiedPartner: boolean;
  date: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Tips Bengkel' | 'Produk & Spek' | 'Kabar Perusahaan' | 'Distribusi';
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  views: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  workshopName: string;
  purpose: 'Kemitraan Bengkel' | 'Pemesanan Grosir' | 'Klaim Garansi' | 'Pertanyaan Umum';
  message: string;
  date: string;
}
