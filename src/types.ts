export type ProductCategory = 'Cakes' | 'Pastries' | 'Breads' | 'Cookies' | 'Custom Orders';

export interface GalleryImage {
  url: string;
  alt: string;
}

export interface ProductVariant {
  label: string;
  price: number;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  rating: number;
  title: string | null;
  body: string;
  image_url: string | null;
  created_at: string;
  is_verified: boolean;
  is_sample?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  priceNote?: string;
  category: ProductCategory;
  image: string;
  gallery: GalleryImage[];
  alt: string;
  availability?: 'In Stock' | 'Made to Order' | 'Limited';
  featured?: boolean;
  variants?: ProductVariant[];
  flavorInfo?: string;
  ingredients?: string;
  allergens?: string;
  servingInfo?: string;
  prepTime?: string;
  faqs?: ProductFaq[];
  rating: number;
  reviewCount: number;
}

export interface CustomCakeConfig {
  cakeType: string;
  size: string;
  shape: string;
  flavor: string;
  filling: string;
  frosting: string;
  colors: string[];
  inscription: string;
  nameOnCake: string;
  occasion: string;
  specialInstructions: string;
  referenceImageName: string | null;
  deliveryMethod: 'Delivery' | 'Pickup' | '';
  deliveryAddress: string;
  deliveryArea: string;
}

export interface CartItem {
  lineId: string;
  product: Product;
  quantity: number;
  customConfig?: CustomCakeConfig;
  customPrice?: number;
}

export interface TeamMember {
  role: string;
  name: string;
  image: string;
  alt: string;
  isPlaceholder: boolean;
}

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export type OrderStatus = 'confirmed' | 'done';

export type PaymentStatus = 'pending' | 'paid' | 'failed';

export type PaymentMethod = 'COD' | 'Cash on Pickup' | 'Online';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  custom_config: CustomCakeConfig | null;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  delivery_method: 'Delivery' | 'Pickup';
  delivery_address: string | null;
  delivery_area: string | null;
  order_notes: string | null;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  subtotal: number;
  delivery_fee: number;
  total: number;
  created_at: string;
}

