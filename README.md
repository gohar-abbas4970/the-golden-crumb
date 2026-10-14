# The Golden Crumb — Premium Artisan Bakery Website

A modern, fully responsive, multi-page website for **The Golden Crumb**, an artisan bakery in DHA Raya, Lahore, Pakistan.

**Tagline:** *Freshly Baked Happiness in the Heart of DHA Raya.*

## Features

- **Four pages** with shared design system: Home, About, Products, Contact
- **Sticky navigation** with active-page indication, mobile hamburger menu, and order basket indicator
- **Product catalog** with category filtering (All, Cakes, Pastries, Breads, Cookies, Custom Orders)
- **Client-side order basket** — add items, adjust quantities, remove items, view subtotal
- **Basket persistence** — cart survives page navigation and browser refresh (localStorage)
- **WhatsApp order handoff** — sends a prefilled order summary to the bakery's WhatsApp
- **Floating WhatsApp button** on all pages
- **Contact form** with full validation (email, Pakistani phone, required fields)
- **Newsletter signup** with email validation
- **SEO** — unique titles, meta descriptions, canonical URLs, Open Graph, Schema.org Bakery structured data
- **Accessibility** — keyboard navigation, ARIA labels, visible focus, reduced-motion support
- **Responsive** — mobile-first design tested from 320px to desktop

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React (icons)
- React Helmet Async (SEO)

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Type Check

```bash
npm run typecheck
```

## Customization

All business configuration is centralized in `src/data/siteConfig.ts`:

| Field | Description |
|-------|-------------|
| `whatsappNumber` | WhatsApp business number in international digits-only format (no + or spaces). Currently a placeholder. |
| `email` | Business email. Currently a placeholder. |
| `phone` | Display phone number. Currently a placeholder. |
| `address` | Bakery address. |
| `openingHours` | Operating hours. Requires confirmation. |
| `deliveryAreas` | Delivery coverage text. |
| `social.instagram` / `social.facebook` | Social media profile URLs. Currently placeholders. |
| `domain` | Production domain for canonical URLs and SEO. |
| `isContactInfoVerified` / `isHoursVerified` | Set to `true` once verified to remove placeholder notices. |

All product data (names, prices, descriptions, images) is in `src/data/products.ts`.

## Placeholder Notices

The following items are placeholders and must be verified before launch:
- Phone number, email, and WhatsApp number
- Opening hours
- Social media URLs
- Team member names and photos
- Testimonial reviews (sample content)
- Product prices (sample catalog values)

All placeholders are visually labeled in the UI so they cannot be mistaken for verified business facts.

## Forms (Demo Mode)

The contact form and newsletter signup are currently in demo mode — they simulate submission but do not send data anywhere. To connect real submission, integrate a form service (e.g., Formspree, Supabase) and replace the simulated submission in the respective components.

## Project Structure

```
src/
  components/     — Navbar, Footer, ProductCard, CategoryFilter, OrderBasket, WhatsAppButton, ContactForm, NewsletterForm, Seo, ScrollToTop
  pages/          — Home, About, Products, Contact
  data/           — products.ts, siteConfig.ts
  hooks/          — useCart.tsx (cart context + localStorage)
  lib/            — formatting.ts (PKR formatting, WhatsApp URL builder, validators)
  types.ts        — shared TypeScript types
  App.tsx         — routing + providers
  main.tsx        — entry point
  index.css       — Tailwind + custom styles
```

## License

All product photography sourced from Pexels (license-free).
