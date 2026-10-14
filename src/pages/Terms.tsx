import Seo from '@/components/Seo';

export default function Terms() {
  return (
    <>
      <Seo title="Terms & Conditions | The Golden Crumb" description="Terms and conditions for The Golden Crumb bakery website." path="/terms" />
      <div className="section-container pt-8 pb-16 lg:pt-16 lg:pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-chocolate text-4xl mb-8">Terms &amp; Conditions</h1>
          <div className="text-chocolate/70 leading-relaxed space-y-6">
            <p className="text-sm text-chocolate/50">Last updated: October 2026</p>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">1. Overview</h2>
              <p>These terms govern your use of The Golden Crumb website. By placing an order or using our services, you agree to these terms.</p>
              <p className="mt-2"><strong>Note:</strong> This is a demonstration website. Orders placed in demo mode are simulated and will not be delivered or charged.</p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">2. Orders and Pricing</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>All prices shown are sample catalog values in Pakistani Rupees (Rs.) and must be confirmed before any real launch.</li>
                <li>Custom cake price estimates are indicative and subject to final confirmation by the bakery.</li>
                <li>We reserve the right to refuse or cancel any order.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">3. Payment</h2>
              <p>We accept Cash on Delivery, Cash on Pickup, and online payment. In demo mode, online payments are simulated. No real charges are processed. When a real payment gateway is configured, payment status will only be marked as paid after verified gateway confirmation.</p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">4. Delivery and Pickup</h2>
              <p>Delivery is available in {`DHA Raya and selected DHA Lahore phases`}. A delivery fee applies. Pickup is available at our bakery location. Requested dates and times are subject to availability.</p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">5. Custom Cakes</h2>
              <p>Custom cake designs are subject to bakery approval. Reference images provided by customers are used as guidance only and the final product may vary. We do not guarantee exact replication of reference designs.</p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">6. Allergens</h2>
              <p>All products are baked in a facility that handles wheat, dairy, eggs, and nuts. Cross-contamination is possible. Customers with allergies should review allergen information on product pages and contact us with any concerns.</p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">7. Reviews</h2>
              <p>Customer reviews reflect individual experiences and opinions. Sample reviews are labeled as demo content. We reserve the right to moderate reviews that are inappropriate, offensive, or misleading.</p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">8. Limitation of Liability</h2>
              <p>The Golden Crumb is not liable for any damages arising from the use of this website. In demo mode, no real transactions occur.</p>
            </section>

            <section>
              <h2 className="font-heading font-semibold text-chocolate text-xl mb-3">9. Changes to Terms</h2>
              <p>We may update these terms at any time. Continued use of the website constitutes acceptance of updated terms.</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
