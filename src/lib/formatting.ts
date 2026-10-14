import type { CartItem, CustomCakeConfig } from '@/types';

export function formatPKR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `GC-${year}-${random}`;
}

function formatCustomCakeSummary(config: CustomCakeConfig): string[] {
  const lines: string[] = [];
  if (config.cakeType) lines.push(`  Cake Type: ${config.cakeType}`);
  if (config.size) lines.push(`  Size: ${config.size}`);
  if (config.shape) lines.push(`  Shape: ${config.shape}`);
  if (config.flavor) lines.push(`  Flavor: ${config.flavor}`);
  if (config.filling) lines.push(`  Filling: ${config.filling}`);
  if (config.frosting) lines.push(`  Frosting: ${config.frosting}`);
  if (config.colors.length > 0) lines.push(`  Colors: ${config.colors.join(', ')}`);
  if (config.inscription) lines.push(`  Inscription: "${config.inscription}"`);
  if (config.nameOnCake) lines.push(`  Name on Cake: ${config.nameOnCake}`);
  if (config.occasion) lines.push(`  Occasion: ${config.occasion}`);
  if (config.specialInstructions) lines.push(`  Special Instructions: ${config.specialInstructions}`);
  if (config.referenceImageName) lines.push(`  Reference Image: ${config.referenceImageName}`);
  if (config.deliveryMethod) lines.push(`  Delivery: ${config.deliveryMethod}`);
  if (config.deliveryAddress) lines.push(`  Delivery Address: ${config.deliveryAddress}`);
  if (config.deliveryArea) lines.push(`  Delivery Area: ${config.deliveryArea}`);
  return lines;
}

export function formatOrderItemsForDisplay(items: CartItem[]): string {
  return items.map((item, idx) => {
    const lines = [`${idx + 1}. ${item.quantity}x ${item.product.name}`];
    if (item.customConfig) lines.push(...formatCustomCakeSummary(item.customConfig));
    return lines.join('\n');
  }).join('\n');
}

export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return 'Email address is required.';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(trimmed)) return 'Please enter a valid email address.';
  return null;
}

export function validatePakistaniPhone(phone: string): string | null {
  const trimmed = phone.trim();
  if (!trimmed) return 'Phone number is required.';
  const digits = trimmed.replace(/[\s-]/g, '');
  const re = /^(\+?92|0)?3\d{9}$/;
  if (!re.test(digits)) {
    return 'Please enter a valid Pakistani mobile number (e.g. 03001234567).';
  }
  return null;
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value.trim()) return `${fieldName} is required.`;
  return null;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
