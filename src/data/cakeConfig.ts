export interface CakeTypeOption {
  id: string;
  label: string;
  basePrice: number;
  image: string;
  alt: string;
}

export interface CakeSizeOption {
  id: string;
  label: string;
  priceAdjustment: number;
  servingEstimate?: string;
}

export interface CakeShapeOption {
  id: string;
  label: string;
  priceAdjustment: number;
}

export interface CakeFlavorOption {
  id: string;
  label: string;
  extraPrice: number;
}

export interface CakeFillingOption {
  id: string;
  label: string;
  extraPrice: number;
}

export interface CakeFrostingOption {
  id: string;
  label: string;
  extraPrice: number;
  isPremium: boolean;
}

export interface CakeColorOption {
  id: string;
  label: string;
  hex: string;
}

export const cakeTypes: CakeTypeOption[] = [
  { id: 'birthday', label: 'Birthday Cake', basePrice: 2500, image: 'https://images.pexels.com/photos/5691261/pexels-photo-5691261.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Stylish birthday cake with macarons and golden accents' },
  { id: 'chocolate', label: 'Chocolate Cake', basePrice: 2800, image: 'https://images.pexels.com/photos/7381533/pexels-photo-7381533.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Rich chocolate cake with cherry topping' },
  { id: 'red-velvet', label: 'Red Velvet Cake', basePrice: 3200, image: 'https://images.pexels.com/photos/6363069/pexels-photo-6363069.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Elegant red velvet cake with blueberries and cream' },
  { id: 'vanilla-celebration', label: 'Vanilla Celebration Cake', basePrice: 2500, image: 'https://images.pexels.com/photos/32191351/pexels-photo-32191351.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Festive pink frosted cake with candles' },
  { id: 'wedding', label: 'Wedding Cake', basePrice: 8000, image: 'https://images.pexels.com/photos/38986757/pexels-photo-38986757.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Three-tier wedding cake with flowers' },
  { id: 'anniversary', label: 'Anniversary Cake', basePrice: 3000, image: 'https://images.pexels.com/photos/36568715/pexels-photo-36568715.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Decorated cake with heart accents and message' },
  { id: 'theme', label: 'Theme Cake', basePrice: 3500, image: 'https://images.pexels.com/photos/32370608/pexels-photo-32370608.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Colorful fondant cake toppers for themed parties' },
  { id: 'photo', label: 'Photo Cake', basePrice: 3500, image: 'https://images.pexels.com/photos/10455239/pexels-photo-10455239.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Creatively decorated celebration cakes' },
];

export const cakeSizes: CakeSizeOption[] = [
  { id: '1lb', label: '1 lb', priceAdjustment: -500, servingEstimate: 'Approximately 4–6 servings (serving counts can vary)' },
  { id: '2lb', label: '2 lb', priceAdjustment: 0, servingEstimate: 'Approximately 8–12 servings (serving counts can vary)' },
  { id: '3lb', label: '3 lb', priceAdjustment: 800, servingEstimate: 'Approximately 12–16 servings (serving counts can vary)' },
  { id: '4lb', label: '4 lb', priceAdjustment: 1600, servingEstimate: 'Approximately 16–20 servings (serving counts can vary)' },
  { id: 'custom', label: 'Custom Size', priceAdjustment: 0, servingEstimate: 'Serving size to be discussed with the bakery' },
];

export const cakeShapes: CakeShapeOption[] = [
  { id: 'round', label: 'Round', priceAdjustment: 0 },
  { id: 'square', label: 'Square', priceAdjustment: 200 },
  { id: 'heart', label: 'Heart-shaped', priceAdjustment: 500 },
  { id: 'custom-shape', label: 'Custom Shape', priceAdjustment: 0 },
];

export const cakeFlavors: CakeFlavorOption[] = [
  { id: 'chocolate', label: 'Chocolate', extraPrice: 0 },
  { id: 'vanilla', label: 'Vanilla', extraPrice: 0 },
  { id: 'red-velvet', label: 'Red Velvet', extraPrice: 200 },
  { id: 'coffee', label: 'Coffee', extraPrice: 200 },
  { id: 'lotus-biscoff', label: 'Lotus Biscoff', extraPrice: 300 },
  { id: 'strawberry', label: 'Strawberry', extraPrice: 200 },
];

export const cakeFillings: CakeFillingOption[] = [
  { id: 'chocolate-ganache', label: 'Chocolate Ganache', extraPrice: 0 },
  { id: 'whipped-cream', label: 'Whipped Cream', extraPrice: 0 },
  { id: 'vanilla-cream', label: 'Vanilla Cream', extraPrice: 100 },
  { id: 'strawberry-filling', label: 'Strawberry Filling', extraPrice: 200 },
  { id: 'lotus-filling', label: 'Lotus Filling', extraPrice: 300 },
];

export const cakeFrostings: CakeFrostingOption[] = [
  { id: 'buttercream', label: 'Buttercream', extraPrice: 0, isPremium: false },
  { id: 'whipped-cream', label: 'Whipped Cream', extraPrice: 0, isPremium: false },
  { id: 'chocolate-ganache', label: 'Chocolate Ganache', extraPrice: 300, isPremium: false },
  { id: 'minimalist', label: 'Minimalist Design', extraPrice: 500, isPremium: false },
  { id: 'floral', label: 'Floral Design', extraPrice: 800, isPremium: true },
  { id: 'wedding-elegant', label: 'Elegant Wedding Design', extraPrice: 1500, isPremium: true },
  { id: 'theme-cartoon', label: 'Cartoon or Theme Design', extraPrice: 1000, isPremium: true },
  { id: 'custom-design', label: 'Customized Design', extraPrice: 0, isPremium: true },
];

export const cakeColors: CakeColorOption[] = [
  { id: 'white', label: 'White', hex: '#FFFFFF' },
  { id: 'pink', label: 'Pink', hex: '#F8D7DA' },
  { id: 'chocolate-brown', label: 'Chocolate Brown', hex: '#6B4226' },
  { id: 'cream', label: 'Cream', hex: '#FFF8F0' },
  { id: 'blue', label: 'Blue', hex: '#A8C8E8' },
  { id: 'lavender', label: 'Lavender', hex: '#C8B8E8' },
  { id: 'custom-color', label: 'Custom Color', hex: '#D98C5F' },
];

export const deliveryFee = 250;

export const customCakeDisclaimer =
  'Your final price and design will be confirmed by The Golden Crumb before the order is accepted.';

export const customCakePriceDisclaimer =
  'Estimated prices are sample values for the prototype. Actual pricing must be confirmed by the bakery.';

export const maxInscriptionLength = 50;

export function calculateCustomCakePrice(
  cakeType: CakeTypeOption | null,
  size: CakeSizeOption | null,
  shape: CakeShapeOption | null,
  flavor: CakeFlavorOption | null,
  filling: CakeFillingOption | null,
  frosting: CakeFrostingOption | null,
  deliveryMethod: string,
): number {
  if (!cakeType) return 0;
  let total = cakeType.basePrice;
  if (size) total += size.priceAdjustment;
  if (shape) total += shape.priceAdjustment;
  if (flavor) total += flavor.extraPrice;
  if (filling) total += filling.extraPrice;
  if (frosting) total += frosting.extraPrice;
  if (frosting?.id === 'custom-design') return 0; // Price on request
  if (deliveryMethod === 'Delivery') total += deliveryFee;
  return Math.max(0, total);
}
