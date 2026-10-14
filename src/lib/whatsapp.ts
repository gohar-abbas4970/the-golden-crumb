import type { Order, OrderItem, CustomCakeConfig } from '@/types';

export function formatOrderForWhatsApp(order: Order, items: OrderItem[]): string {
  const lines: string[] = [];

  lines.push(`*New Order — ${order.order_number}*`);
  lines.push('');
  lines.push(`Customer: ${order.customer_name}`);
  lines.push(`Phone: ${order.customer_phone}`);
  if (order.customer_email) lines.push(`Email: ${order.customer_email}`);
  lines.push('');
  lines.push('*Items:*');

  for (const item of items) {
    const priceText = item.unit_price > 0
      ? ` — Rs. ${(item.unit_price * item.quantity).toLocaleString('en-PK')}`
      : ' — Price on Request';
    lines.push(`${item.quantity}x ${item.product_name}${priceText}`);

    if (item.custom_config) {
      const cfg = item.custom_config as CustomCakeConfig;
      const details: string[] = [];
      if (cfg.cakeType) details.push(`Type: ${cfg.cakeType}`);
      if (cfg.size) details.push(`Size: ${cfg.size}`);
      if (cfg.shape) details.push(`Shape: ${cfg.shape}`);
      if (cfg.flavor) details.push(`Flavor: ${cfg.flavor}`);
      if (cfg.filling) details.push(`Filling: ${cfg.filling}`);
      if (cfg.frosting) details.push(`Frosting: ${cfg.frosting}`);
      if (cfg.colors.length > 0) details.push(`Colors: ${cfg.colors.join(', ')}`);
      if (cfg.inscription) details.push(`Inscription: "${cfg.inscription}"`);
      if (cfg.nameOnCake) details.push(`Name: ${cfg.nameOnCake}`);
      if (cfg.occasion) details.push(`Occasion: ${cfg.occasion}`);
      if (cfg.specialInstructions) details.push(`Instructions: ${cfg.specialInstructions}`);
      if (cfg.referenceImageName) details.push(`Ref Image: ${cfg.referenceImageName}`);
      for (const d of details) lines.push(`  - ${d}`);
    }
  }

  lines.push('');
  lines.push(`Subtotal: Rs. ${order.subtotal.toLocaleString('en-PK')}`);
  lines.push(`Delivery Fee: Rs. ${order.delivery_fee.toLocaleString('en-PK')}`);
  lines.push(`*Total: Rs. ${order.total.toLocaleString('en-PK')}*`);
  lines.push('');
  lines.push(`Delivery: ${order.delivery_method}`);
  if (order.delivery_address) {
    const addr = order.delivery_area
      ? `${order.delivery_address}, ${order.delivery_area}`
      : order.delivery_address;
    lines.push(`Address: ${addr}`);
  }
  lines.push(`Payment: ${order.payment_method}`);
  if (order.order_notes) lines.push(`Notes: ${order.order_notes}`);

  return lines.join('\n');
}

export function buildWhatsAppLink(phoneNumber: string, message: string): string {
  const digits = phoneNumber.replace(/[\s-]/g, '').replace(/^\+/, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
