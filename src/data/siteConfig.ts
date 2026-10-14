import type { NavLink, TeamMember, Testimonial } from '@/types';

export const DEMO_MODE = true;

export const siteConfig = {
  name: 'The Golden Crumb',
  tagline: 'Freshly Baked Happiness in the Heart of DHA Raya',
  domain: 'https://www.thegoldencrumb.pk',
  email: 'hello@example.com', // PLACEHOLDER — replace with verified business email
  phone: '+92 3XX XXXXXXX', // PLACEHOLDER — replace with verified business number
  address: 'DHA Raya, Lahore, Punjab, Pakistan',
  openingHours: '10:00 AM – 11:00 PM daily', // Requires confirmation
  deliveryAreas: 'DHA Raya and selected DHA Lahore phases (subject to availability)',
  deliveryFee: 250,
  minPrepDays: 2,
  social: {
    instagram: 'https://instagram.com/', // PLACEHOLDER
    facebook: 'https://facebook.com/', // PLACEHOLDER
  },
  mapsEmbedUrl: 'https://www.google.com/maps?q=DHA+Raya+Lahore+Pakistan&output=embed',
  mapsLinkUrl: 'https://www.google.com/maps/search/?api=1&query=DHA+Raya+Lahore+Pakistan',
  isContactInfoVerified: false,
  isHoursVerified: false,
  // Owner-only WhatsApp number for order notifications (NOT customer-facing)
  // Uses normal WhatsApp — the admin reviews the prepared message and manually sends it
  ownerWhatsappNumber: '', // e.g. '923001234567' — leave empty until configured
};

export const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Shop', path: '/products' },
  { label: 'Custom Cake', path: '/custom-cake' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export const footerLinks: { title: string; links: NavLink[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', path: '/products' },
      { label: 'Cakes', path: '/products?category=Cakes' },
      { label: 'Pastries', path: '/products?category=Pastries' },
      { label: 'Custom Cake Designer', path: '/custom-cake' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Customer Reviews', path: '/reviews' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms & Conditions', path: '/terms' },
      { label: 'Track Order', path: '/track-order' },
    ],
  },
];

export const teamMembers: TeamMember[] = [
  {
    role: 'Head Baker',
    name: 'To be confirmed',
    image: 'https://images.pexels.com/photos/2680601/pexels-photo-2680601.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Head baker holding fresh baguettes',
    isPlaceholder: true,
  },
  {
    role: 'Pastry Chef',
    name: 'To be confirmed',
    image: 'https://images.pexels.com/photos/6654116/pexels-photo-6654116.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Pastry chef holding a jar of flour',
    isPlaceholder: true,
  },
  {
    role: 'Cake Designer',
    name: 'To be confirmed',
    image: 'https://images.pexels.com/photos/9271569/pexels-photo-9271569.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Cake decorator plating a chocolate dessert',
    isPlaceholder: true,
  },
  {
    role: 'Customer Experience Manager',
    name: 'To be confirmed',
    image: 'https://images.pexels.com/photos/28945108/pexels-photo-28945108.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Customer experience staff serving in a restaurant',
    isPlaceholder: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Ayesha Malik',
    rating: 5,
    text: 'The chocolate truffle cake was absolutely divine. It melted in our mouths and made the birthday so special. The Golden Crumb is my go-to bakery in DHA Raya now.',
  },
  {
    name: 'Hamza Ahmed',
    rating: 5,
    text: 'Fresh croissants every morning — buttery, flaky, and perfectly baked. The sourdough loaf is the best I have had in Lahore. Highly recommended.',
  },
  {
    name: 'Zainab Khan',
    rating: 5,
    text: 'Ordered a custom cake for my daughter\'s birthday and it exceeded all expectations. Beautiful design, delicious flavor, and delivered on time.',
  },
];

export const testimonialDisclaimer =
  'These reviews are illustrative sample content and have not been verified. They will be replaced with genuine customer feedback once available.';
