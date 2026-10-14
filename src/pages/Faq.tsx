import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Seo from '@/components/Seo';
import { siteConfig } from '@/data/siteConfig';
import { Link } from 'react-router-dom';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: 'What are your opening hours?',
    answer: `Our bakery is open ${siteConfig.openingHours}. However, these hours are currently unconfirmed and will be updated once verified.`,
  },
  {
    question: 'Where are you located?',
    answer: `We are located in ${siteConfig.address}. Delivery is available in ${siteConfig.deliveryAreas}.`,
  },
  {
    question: 'How much advance notice is required for custom cakes?',
    answer: `We recommend at least ${siteConfig.minPrepDays} days notice for custom cake orders. Simple inscriptions can be done with 4 hours notice. Wedding cakes should be booked 2–4 weeks in advance.`,
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Cash on Delivery, Cash on Pickup, and online payment. In demo mode, online payments are simulated and no real charges are processed.',
  },
  {
    question: 'Do you deliver?',
    answer: `Yes, we deliver to ${siteConfig.deliveryAreas}. A delivery fee of Rs. ${siteConfig.deliveryFee} applies to delivery orders. Pickup is available at our bakery at no extra charge.`,
  },
  {
    question: 'How should I store my cake?',
    answer: 'Cakes with cream cheese or fresh cream frosting should be refrigerated and consumed within 2–3 days. Bring to room temperature 15 minutes before serving. Butter-creamed cakes can be stored in a cool, dry place.',
  },
  {
    question: 'Do you offer allergen information?',
    answer: 'Yes, allergen information is listed on each product page. All our products are baked in a facility that handles wheat, dairy, eggs, and nuts. Please contact us if you have specific allergy concerns.',
  },
  {
    question: 'Can I customize a cake?',
    answer: 'Absolutely! Visit our Custom Cake Designer to choose cake type, size, shape, flavor, filling, frosting, colors, inscription, and delivery options. You will get an instant price estimate.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order is placed, you will receive an order number. You can track your order status on our Track Order page using your order number and phone number.',
  },
  {
    question: 'What is the difference between order status and payment status?',
    answer: 'Order status tracks the progress of your order (pending, confirmed, preparing, ready, etc.). Payment status tracks whether payment has been received (pending, paid, failed). They are tracked separately.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <Seo
        title="FAQ | The Golden Crumb"
        description="Find answers to common questions about The Golden Crumb bakery — orders, delivery, custom cakes, payment methods, and more."
        path="/faq"
      />
      <div className="section-container pt-8 pb-12 lg:pt-16 text-center">
        <div className="inline-flex items-center gap-2 text-caramel text-sm font-medium uppercase tracking-wide">
          <HelpCircle className="w-4 h-4" />
          Help Center
        </div>
        <h1 className="font-heading font-bold text-chocolate text-4xl sm:text-5xl mt-3 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-chocolate/60 max-w-2xl mx-auto leading-relaxed">
          Have a question? We might already have the answer. Browse our most common inquiries below.
        </p>
      </div>

      <section className="section-container pb-16 lg:pb-20">
        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl-card border border-beige/50 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
                aria-expanded={openIndex === idx}
              >
                <span className="font-medium text-chocolate text-sm sm:text-base">{faq.question}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-caramel flex-shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-caramel flex-shrink-0 ml-2" />
                )}
              </button>
              {openIndex === idx && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-chocolate/70 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-chocolate/60 text-sm mb-4">Could not find what you were looking for?</p>
          <Link to="/contact" className="btn-caramel">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
