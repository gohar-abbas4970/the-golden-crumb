import Seo from '@/components/Seo';

export default function PrivacyPolicy() {
  return (
    <>
      <Seo title="Privacy Policy | The Golden Crumb" description="Privacy policy for The Golden Crumb bakery website." path="/privacy-policy" />
      <div className="section-container pt-8 pb-16 lg:pt-16 lg:pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-chocolate text-4xl mb-8">Privacy Policy</h1>
          <div className="prose prose-sm max-w-none text-chocolate/70 leading-relaxed space-y-6">
            <p className="text-sm text-chocolate/50">Last updated: October 2026</p>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">1. Introduction</h2>
              <p>The Golden Crumb ("we", "us", "our") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or place an order.</p>
              <p className="mt-2"><strong>Note:</strong> This is a demonstration website. No real business operations are conducted, and no real payments are processed in demo mode.</p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">2. Information We Collect</h2>
              <p>When you place an order, we may collect:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Your name and phone number</li>
                <li>Your email address (if provided)</li>
                <li>Your delivery address (for delivery orders)</li>
                <li>Order details including product selections and custom cake configurations</li>
                <li>Payment method selected (we do not store card details)</li>
              </ul>
              <p className="mt-2">When you submit a review, we collect your display name, rating, and review text.</p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To process and fulfill your orders</li>
                <li>To communicate with you about your order status</li>
                <li>To display customer reviews (with your chosen display name)</li>
                <li>To improve our products and services</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">4. Data Storage and Security</h2>
              <p>Your data is stored securely using Supabase (PostgreSQL) with Row Level Security enabled. We do not store payment card details. Access to personal data is restricted to authorized administrators only.</p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">5. Cookies and Local Storage</h2>
              <p>We use browser local storage to save your shopping cart contents between visits. We do not use tracking cookies for advertising purposes.</p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">6. Your Rights</h2>
              <p>You have the right to request access to, correction of, or deletion of your personal data. Contact us through our Contact page to exercise these rights.</p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">7. Third-Party Services</h2>
              <p>We use Supabase for data storage. When configured, we may use third-party services for payment processing. These services have their own privacy policies.</p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">8. Contact</h2>
              <p>For privacy-related questions, please contact us through our Contact page.</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
