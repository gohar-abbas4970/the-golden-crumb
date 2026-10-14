import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from '@/hooks/useCart';
import { AuthProvider } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrderBasket from '@/components/OrderBasket';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import CakeCustomizer from '@/pages/CakeCustomizer';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import TrackOrder from '@/pages/TrackOrder';
import Contact from '@/pages/Contact';
import Faq from '@/pages/Faq';
import Reviews from '@/pages/Reviews';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Terms from '@/pages/Terms';
import NotFound from '@/pages/NotFound';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminReviews from '@/pages/admin/AdminReviews';
import AdminSettings from '@/pages/admin/AdminSettings';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <ScrollToTop />
            <div className="min-h-screen bg-cream flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:slug" element={<ProductDetail />} />
                  <Route path="/custom-cake" element={<CakeCustomizer />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="reviews" element={<AdminReviews />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <OrderBasket />
            </div>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
