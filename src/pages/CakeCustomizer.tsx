import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  ShoppingCart,
  Save,
  FileText,
  ChevronRight,
} from 'lucide-react';
import Seo from '@/components/Seo';
import ImageUploadPreview from '@/components/ImageUploadPreview';
import {
  cakeTypes,
  cakeSizes,
  cakeShapes,
  cakeFlavors,
  cakeFillings,
  cakeFrostings,
  cakeColors,
  deliveryFee,
  customCakeDisclaimer,
  customCakePriceDisclaimer,
  maxInscriptionLength,
  calculateCustomCakePrice,
  type CakeTypeOption,
  type CakeSizeOption,
  type CakeShapeOption,
  type CakeFlavorOption,
  type CakeFillingOption,
  type CakeFrostingOption,
} from '@/data/cakeConfig';
import { products } from '@/data/products';
import { siteConfig } from '@/data/siteConfig';

import { useCart } from '@/hooks/useCart';
import { formatPKR } from '@/lib/formatting';
import type { CustomCakeConfig } from '@/types';

const customCakeProduct = products.find((p) => p.id === 'birthday-cakes')!;

function StepWrapper({
  stepNumber,
  title,
  children,
}: {
  stepNumber: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl-card border border-beige/50 p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-8 rounded-full bg-caramel text-white font-heading font-bold text-sm flex items-center justify-center flex-shrink-0">
          {stepNumber}
        </span>
        <h2 className="font-heading font-semibold text-chocolate text-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SelectionCard({
  label,
  selected,
  onClick,
  image,
  alt,
  priceText,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  image?: string;
  alt?: string;
  priceText?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-3 rounded-xl-card border-2 transition-all ${
        selected
          ? 'border-caramel bg-blush/10 ring-2 ring-caramel/20'
          : 'border-beige hover:border-caramel/50 bg-white'
      }`}
    >
      {image && (
        <div className="w-full aspect-square rounded-lg overflow-hidden">
          <img src={image} alt={alt || label} className="w-full h-full object-cover" />
        </div>
      )}
      <span className="text-sm font-medium text-chocolate text-center">{label}</span>
      {priceText && <span className="text-xs text-caramel">{priceText}</span>}
    </button>
  );
}

export default function CakeCustomizer() {
  const navigate = useNavigate();
  const { addCustomCake, setCartOpen } = useCart();

  const [cakeType, setCakeType] = useState<CakeTypeOption | null>(null);
  const [size, setSize] = useState<CakeSizeOption | null>(null);
  const [shape, setShape] = useState<CakeShapeOption | null>(null);
  const [flavor, setFlavor] = useState<CakeFlavorOption | null>(null);
  const [filling, setFilling] = useState<CakeFillingOption | null>(null);
  const [frosting, setFrosting] = useState<CakeFrostingOption | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [inscription, setInscription] = useState('');
  const [nameOnCake, setNameOnCake] = useState('');
  const [occasion, setOccasion] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [referenceImageName, setReferenceImageName] = useState<string | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'Delivery' | 'Pickup' | ''>('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('');
  const [saved, setSaved] = useState(false);

  const estimatedPrice = useMemo(
    () => calculateCustomCakePrice(cakeType, size, shape, flavor, filling, frosting, deliveryMethod),
    [cakeType, size, shape, flavor, filling, frosting, deliveryMethod],
  );

  const isPriceOnRequest = frosting?.id === 'custom-design' || (cakeType?.id === 'wedding' && !frosting);

  const config: CustomCakeConfig = {
    cakeType: cakeType?.label || '',
    size: size?.label || '',
    shape: shape?.label || '',
    flavor: flavor?.label || '',
    filling: filling?.label || '',
    frosting: frosting?.label || '',
    colors,
    inscription,
    nameOnCake,
    occasion,
    specialInstructions,
    referenceImageName,
    deliveryMethod,
    deliveryAddress,
    deliveryArea,
  };

  const toggleColor = (colorLabel: string) => {
    setColors((prev) =>
      prev.includes(colorLabel)
        ? prev.filter((c) => c !== colorLabel)
        : [...prev, colorLabel],
    );
  };

  const handleAddToCart = () => {
    addCustomCake(customCakeProduct, config, isPriceOnRequest ? 0 : estimatedPrice);
  };

  const handleBuyNow = () => {
    addCustomCake(customCakeProduct, config, isPriceOnRequest ? 0 : estimatedPrice);
    setCartOpen(true);
  };

  const handleSave = () => {
    try {
      localStorage.setItem('golden-crumb-saved-cake', JSON.stringify(config));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <>
      <Seo
        title="Custom Cake Designer | The Golden Crumb"
        description="Design your perfect custom cake step by step — choose type, size, shape, flavor, filling, frosting, colors, inscription, and delivery. Get an instant price estimate."
        path="/custom-cake"
      />

      <div className="section-container pt-6 pb-8 text-center">
        <span className="text-caramel text-sm font-medium uppercase tracking-wide">
          Custom Cake Designer
        </span>
        <h1 className="font-heading font-bold text-chocolate text-3xl sm:text-4xl mt-2 mb-3">
          Design Your Perfect Cake
        </h1>
        <p className="text-chocolate/60 max-w-2xl mx-auto leading-relaxed">
          Customize every detail of your celebration cake. Get an instant estimate and send
          your design to The Golden Crumb for confirmation.
        </p>
      </div>

      <div className="section-container pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Steps */}
          <div className="lg:col-span-2 space-y-4">
            {/* Step 1: Cake Type */}
            <StepWrapper stepNumber={1} title="Select Cake Type">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {cakeTypes.map((type) => (
                  <SelectionCard
                    key={type.id}
                    label={type.label}
                    selected={cakeType?.id === type.id}
                    onClick={() => setCakeType(type)}
                    image={type.image}
                    alt={type.alt}
                    priceText={`from ${formatPKR(type.basePrice)}`}
                  />
                ))}
              </div>
            </StepWrapper>

            {/* Step 2: Size */}
            <StepWrapper stepNumber={2} title="Select Cake Size">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {cakeSizes.map((s) => (
                  <SelectionCard
                    key={s.id}
                    label={s.label}
                    selected={size?.id === s.id}
                    onClick={() => setSize(s)}
                    priceText={s.priceAdjustment > 0 ? `+${formatPKR(s.priceAdjustment)}` : s.priceAdjustment < 0 ? `${formatPKR(s.priceAdjustment)}` : undefined}
                  />
                ))}
              </div>
              {size?.servingEstimate && (
                <p className="text-xs text-chocolate/50 mt-3">{size.servingEstimate}</p>
              )}
            </StepWrapper>

            {/* Step 3: Shape */}
            <StepWrapper stepNumber={3} title="Select Cake Shape">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {cakeShapes.map((s) => (
                  <SelectionCard
                    key={s.id}
                    label={s.label}
                    selected={shape?.id === s.id}
                    onClick={() => setShape(s)}
                    priceText={s.priceAdjustment > 0 ? `+${formatPKR(s.priceAdjustment)}` : undefined}
                  />
                ))}
              </div>
              {shape?.id === 'custom-shape' && (
                <p className="text-xs text-chocolate/50 mt-3">
                  Custom shapes are subject to bakery approval. Please describe your desired shape in the special instructions.
                </p>
              )}
            </StepWrapper>

            {/* Step 4: Flavor */}
            <StepWrapper stepNumber={4} title="Select Flavor">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {cakeFlavors.map((f) => (
                  <SelectionCard
                    key={f.id}
                    label={f.label}
                    selected={flavor?.id === f.id}
                    onClick={() => setFlavor(f)}
                    priceText={f.extraPrice > 0 ? `+${formatPKR(f.extraPrice)}` : undefined}
                  />
                ))}
              </div>
            </StepWrapper>

            {/* Step 5: Filling */}
            <StepWrapper stepNumber={5} title="Select Filling">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {cakeFillings.map((f) => (
                  <SelectionCard
                    key={f.id}
                    label={f.label}
                    selected={filling?.id === f.id}
                    onClick={() => setFilling(f)}
                    priceText={f.extraPrice > 0 ? `+${formatPKR(f.extraPrice)}` : undefined}
                  />
                ))}
              </div>
            </StepWrapper>

            {/* Step 6: Frosting & Decoration */}
            <StepWrapper stepNumber={6} title="Select Frosting & Decoration">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {cakeFrostings.map((f) => (
                  <SelectionCard
                    key={f.id}
                    label={f.label}
                    selected={frosting?.id === f.id}
                    onClick={() => setFrosting(f)}
                    priceText={f.extraPrice > 0 ? `+${formatPKR(f.extraPrice)}` : f.id === 'custom-design' ? 'On Request' : undefined}
                  />
                ))}
              </div>
            </StepWrapper>

            {/* Step 7: Colors */}
            <StepWrapper stepNumber={7} title="Choose Colors">
              <p className="text-xs text-chocolate/50 mb-3">
                Select one or more colors for your cake decoration.
              </p>
              <div className="flex flex-wrap gap-3">
                {cakeColors.map((c) => {
                  const isSelected = colors.includes(c.label);
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleColor(c.label)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl-card border-2 transition-all ${
                        isSelected
                          ? 'border-caramel ring-2 ring-caramel/20'
                          : 'border-beige hover:border-caramel/50'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-beige/50"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-sm font-medium text-chocolate">{c.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-caramel" />}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-chocolate/40 mt-3">
                Final appearance may vary slightly depending on ingredients and decoration techniques.
              </p>
            </StepWrapper>

            {/* Step 8: Personalized Message */}
            <StepWrapper stepNumber={8} title="Add a Personalized Message">
              <div className="space-y-4">
                <div>
                  <label htmlFor="inscription" className="block text-sm font-medium text-chocolate mb-1.5">
                    Cake Inscription
                  </label>
                  <input
                    id="inscription"
                    type="text"
                    value={inscription}
                    onChange={(e) => setInscription(e.target.value.slice(0, maxInscriptionLength))}
                    placeholder="e.g. Happy Birthday Sara"
                    maxLength={maxInscriptionLength}
                    className="input-field"
                  />
                  <p className="text-xs text-chocolate/40 mt-1 text-right">
                    {inscription.length}/{maxInscriptionLength} characters
                  </p>
                </div>
                <div>
                  <label htmlFor="name-on-cake" className="block text-sm font-medium text-chocolate mb-1.5">
                    Name to be Written on Cake
                  </label>
                  <input
                    id="name-on-cake"
                    type="text"
                    value={nameOnCake}
                    onChange={(e) => setNameOnCake(e.target.value)}
                    placeholder="e.g. Sara"
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="occasion" className="block text-sm font-medium text-chocolate mb-1.5">
                    Occasion
                  </label>
                  <select
                    id="occasion"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select an occasion</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="special-instructions" className="block text-sm font-medium text-chocolate mb-1.5">
                    Special Instructions
                  </label>
                  <textarea
                    id="special-instructions"
                    rows={3}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any additional details about design, theme, or preferences..."
                    className="input-field resize-none"
                  />
                </div>
              </div>
            </StepWrapper>

            {/* Step 9: Reference Image */}
            <StepWrapper stepNumber={9} title="Upload a Reference Image">
              <ImageUploadPreview onImageSelected={setReferenceImageName} />
            </StepWrapper>

            {/* Step 10: Delivery or Pickup */}
            <StepWrapper stepNumber={10} title="Delivery or Pickup">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <SelectionCard
                  label="Home Delivery"
                  selected={deliveryMethod === 'Delivery'}
                  onClick={() => setDeliveryMethod('Delivery')}
                  priceText={`+${formatPKR(deliveryFee)}`}
                />
                <SelectionCard
                  label="Bakery Pickup"
                  selected={deliveryMethod === 'Pickup'}
                  onClick={() => setDeliveryMethod('Pickup')}
                />
              </div>

              {deliveryMethod === 'Delivery' && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="delivery-address" className="block text-sm font-medium text-chocolate mb-1.5">
                      Delivery Address
                    </label>
                    <textarea
                      id="delivery-address"
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House number, street, block..."
                      className="input-field resize-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="delivery-area" className="block text-sm font-medium text-chocolate mb-1.5">
                      DHA Lahore Area
                    </label>
                    <input
                      id="delivery-area"
                      type="text"
                      value={deliveryArea}
                      onChange={(e) => setDeliveryArea(e.target.value)}
                      placeholder="e.g. DHA Raya, DHA Phase 6..."
                      className="input-field"
                    />
                    <p className="text-xs text-chocolate/40 mt-1">
                      Delivery available in {siteConfig.deliveryAreas}. We do not deliver to unsupported locations.
                    </p>
                  </div>
                </div>
              )}
            </StepWrapper>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={handleSave} className="btn-outline flex-1">
                {saved ? (
                  <>
                    <Check className="w-5 h-5" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Customization
                  </>
                )}
              </button>
              <button onClick={handleAddToCart} className="btn-caramel flex-1">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button onClick={handleBuyNow} className="btn-outline flex-1">
                Buy Now
              </button>
            </div>
          </div>

          {/* Live Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl-card border border-beige/50 p-5">
              <h3 className="font-heading font-bold text-chocolate text-lg mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-caramel" />
                Order Summary
              </h3>

              <div className="space-y-2 text-sm">
                <SummaryRow label="Cake Type" value={config.cakeType} />
                <SummaryRow label="Size" value={config.size} />
                <SummaryRow label="Shape" value={config.shape} />
                <SummaryRow label="Flavor" value={config.flavor} />
                <SummaryRow label="Filling" value={config.filling} />
                <SummaryRow label="Frosting" value={config.frosting} />
                <SummaryRow
                  label="Colors"
                  value={colors.length > 0 ? colors.join(', ') : ''}
                />
                <SummaryRow label="Inscription" value={inscription ? `"${inscription}"` : ''} />
                <SummaryRow label="Name on Cake" value={nameOnCake} />
                <SummaryRow label="Occasion" value={occasion} />
                {specialInstructions && (
                  <SummaryRow label="Instructions" value={specialInstructions} />
                )}
                <SummaryRow
                  label="Reference Image"
                  value={referenceImageName ? 'Uploaded' : ''}
                />
                <SummaryRow label="Delivery" value={deliveryMethod || ''} />
                {deliveryAddress && <SummaryRow label="Address" value={deliveryAddress} />}
                {deliveryArea && <SummaryRow label="Area" value={deliveryArea} />}
              </div>

              {/* Price */}
              <div className="border-t border-beige/50 mt-4 pt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-chocolate/60 text-sm">Estimated Total</span>
                  {isPriceOnRequest || estimatedPrice === 0 ? (
                    <span className="font-heading font-bold text-chocolate text-lg">
                      Price on Request
                    </span>
                  ) : (
                    <span className="font-heading font-bold text-chocolate text-lg">
                      {formatPKR(estimatedPrice)}
                    </span>
                  )}
                </div>
                {deliveryMethod === 'Delivery' && !isPriceOnRequest && estimatedPrice > 0 && (
                  <p className="text-xs text-chocolate/40">
                    Includes {formatPKR(deliveryFee)} delivery fee
                  </p>
                )}
              </div>

              <p className="text-xs text-chocolate/50 mt-3 leading-relaxed">
                {customCakeDisclaimer}
              </p>
              <p className="text-xs text-chocolate/40 mt-2">
                {customCakePriceDisclaimer}
              </p>

              <button
                onClick={() => navigate('/products')}
                className="flex items-center gap-1 text-caramel text-sm font-medium mt-4 hover:underline"
              >
                Continue Shopping
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-2">
      <span className="text-chocolate/50 flex-shrink-0">{label}:</span>
      <span className="text-chocolate font-medium text-right truncate">{value}</span>
    </div>
  );
}
