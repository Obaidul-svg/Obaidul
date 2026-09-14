export interface ProductVariant {
  id: string;
  name: string;
  type: 'strap' | 'dial' | 'size' | 'finish';
  inStock: boolean;
  sku?: string;
  priceDelta?: number;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number; // in ৳ BDT
  compareAtPrice?: number;
  category: 'chronograph' | 'heritage' | 'automatic' | 'diver' | 'classic' | 'olevs' | 'arabic' | 'sabr' | 'poedagar' | string;
  brand?: 'OLEVS' | 'Arabic Watch' | 'SABR' | 'POEDAGAR' | 'MANOVA' | string;
  image: string;
  additionalImages?: string[];
  inventory: number;
  sku?: string;
  isPublished?: boolean;
  isSignature?: boolean;
  isFeatured?: boolean;
  rating?: number;
  reviewCount?: number;
  variants?: ProductVariant[];
  specs: {
    movement: string;
    caseDiameter: string;
    waterResistance: string;
    crystal: string;
    strap: string;
    powerReserve?: string;
    lugWidth?: string;
  };
}

export type SectionType = 
  | 'hero' 
  | 'signature' 
  | 'featured'
  | 'collections' 
  | 'imageText'
  | 'craftsmanship' 
  | 'promoBanner'
  | 'chronosBanner' 
  | 'testimonials' 
  | 'newsletter' 
  | 'footer';

export interface ThemeSection {
  id: string;
  type: SectionType;
  name: string;
  enabled: boolean;
  settings: {
    headline?: string;
    subheadline?: string;
    buttonText?: string;
    buttonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    imageUrl?: string;
    secondaryImageUrl?: string;
    badgeText?: string;
    alignment?: 'left' | 'center' | 'right';
    quote?: string;
    author?: string;
    publication?: string;
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    bannerText?: string;
    layout?: 'imageLeft' | 'imageRight';
  };
}

export type ThemePreset = 'fashion' | 'minimal' | 'modern';
export type TypographyPreset = 'serif' | 'sans' | 'display';
export type ButtonStyle = 'sharp' | 'pill' | 'soft';

export interface ThemeSettings {
  preset: ThemePreset;
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
  textColor: string;
  fontFamily: TypographyPreset;
  buttonStyle: ButtonStyle;
  showAnnouncement: boolean;
  announcementText: string;
  sections: ThemeSection[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export type DeliveryZone = 'inside_dhaka' | 'outside_dhaka';
export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'card';

export interface BangladeshShippingAddress {
  fullName?: string;
  phone?: string;
  email?: string;
  district: string;
  area: string;
  fullAddress: string;
  orderNotes?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Paid';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded' | 'COD Pending' | 'COD Collected';

export interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  phone: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  deliveryZone: DeliveryZone;
  discountCode?: string;
  discountAmount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus?: PaymentStatus;
  trxId?: string;
  status: OrderStatus;
  courierName?: string;
  trackingNumber?: string;
  shippedAt?: string;
  createdAt: string;
  shippingAddress: BangladeshShippingAddress;
}

export interface IncompleteOrder {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  district?: string;
  cartItems: OrderItem[];
  cartValue: number;
  lastActivity: string;
  createdAt: string;
  converted?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  district?: string;
  ordersCount?: number;
  totalSpent: number;
  joinedDate?: string;
  vipTier?: 'Silver' | 'Gold' | 'Platinum';
  status?: 'active' | 'blocked';
  lastOrderDate?: string;
  address?: string;
  isVip?: boolean;
  totalOrders?: number;
}

export interface Category {
  id: string;
  name: string;
  nameBn?: string;
  slug: string;
  description: string;
  image?: string;
  productCount: number;
  status?: 'active' | 'inactive';
  isActive?: boolean;
  order?: number;
  displayOrder?: number;
}

export interface AltTextRecord {
  id: string;
  productId: string;
  productTitle: string;
  imageUrl: string;
  currentAlt?: string;
  altText?: string;
  status: 'optimized' | 'missing' | 'generated' | 'needs_review';
  isPrimary?: boolean;
  lastUpdated?: string;
}

export interface Review {
  id: string;
  productId?: string;
  productTitle: string;
  customerName?: string;
  userName?: string;
  customerPhone?: string;
  rating: number;
  reviewText?: string;
  comment?: string;
  date: string;
  status?: 'Pending' | 'Approved' | 'Rejected';
  isApproved?: boolean;
  isVerified?: boolean;
}

export interface Transaction {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  date: string;
  type: 'order_payment' | 'refund' | 'cod_remittance';
}

export interface AuditLog {
  id: string;
  date?: string;
  admin?: string;
  user?: string;
  role?: string;
  timestamp?: string;
  ipAddress?: string;
  details?: string;
  action: string;
  target?: string;
  previousValue?: string;
  newValue?: string;
  category?: 'product' | 'order' | 'inventory' | 'coupon' | 'customer' | 'review' | 'theme' | 'settings';
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  logoUrl?: string;
  phone: string;
  email: string;
  address: string;
  currency: string;
  shippingInsideDhaka: number;
  shippingOutsideDhaka: number;
  freeShippingThreshold: number;
  enableCod: boolean;
  enableBkash: boolean;
  enableNagad: boolean;
  enableCard: boolean;
  bkashMerchantNumber: string;
  nagadMerchantNumber: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

export interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  isActive: boolean;
  usageCount: number;
  minSpend?: number;
  maxDiscount?: number;
  usageLimit?: number;
  perCustomerLimit?: number;
  startDate?: string;
  endDate?: string;
  expiresAt?: string;
  description?: string;
}

export type ActivePage = 
  | 'home'
  | 'shop'
  | 'collections'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'contact'
  | 'craftsmanship'
  | 'journal'
  | 'faq'
  | 'about'
  | 'account'
  | 'wishlist';

export type ActiveView = ActivePage | 'storefront' | 'customizer' | 'admin';

