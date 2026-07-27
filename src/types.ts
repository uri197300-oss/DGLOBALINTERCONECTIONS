export type CategoryType = 
  | 'todos'
  | 'aloe_organica'
  | 'jugos_bebidas'
  | 'sobres_viaje'
  | 'belleza_cuidado'
  | 'electronicos';

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: CategoryType;
  image: string;
  mercadoLibreUrl: string;
  stock: number;
  benefits: string[];
  isKosher: boolean;
  isAloineFree: boolean;
  featured: boolean;
  isSpecialOffer: boolean;
  badges: string[];
  description: string;
  specifications: Record<string, string>;
  priceDropHistory?: { date: string; price: number }[];
}

export type OrderStatus = 'pendiente' | 'en_preparacion' | 'enviado' | 'entregado' | 'cancelado';

export type PaymentMethodType = 'mercado_pago' | 'tarjeta' | 'paypal' | 'transferencia_spei';

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  paymentMethod: PaymentMethodType;
  trackingNumber: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  encryptedSignature: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userEmail: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
  ratingBreakdown: {
    eficiencia: number;
    calidad: number;
    empaque: number;
  };
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  userEmail: string;
  action: string;
  ipAddress: string;
  details: string;
  category: 'inventory' | 'order' | 'system' | 'security';
}

export interface NotificationAlert {
  id: string;
  type: 'price_drop' | 'exclusive_promo' | 'system_alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  productId?: string;
  discountPercentage?: number;
}

export interface UserPermissions {
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'support' | 'customer';
  isUriAdmin: boolean;
  permissions: {
    manageInventory: boolean;
    processOrders: boolean;
    viewAnalytics: boolean;
    viewLogs: boolean;
    manageUsers: boolean;
  };
}

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'customer';
  receivePromotions: boolean;
  registeredAt: string;
  totalOrdersCount?: number;
}

export interface PromoCampaign {
  id: string;
  title: string;
  subject: string;
  message: string;
  couponCode?: string;
  discountPercentage?: number;
  sentAt: string;
  recipientsCount: number;
}
