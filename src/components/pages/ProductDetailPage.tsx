import React, { useState } from 'react';
import { Product, ButtonStyle, TypographyPreset } from '../../types';
import { 
  ShoppingBag, 
  Zap, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Check, 
  ArrowLeft,
  Clock,
  Sparkles
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  primaryColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity: number, variant?: string) => void;
  onBuyNow: (product: Product, quantity: number, variant?: string) => void;
  onBackToShop: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  primaryColor,
  buttonStyle,
  fontFamily,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onBackToShop,
}) => {
  const images = [product.image, ...(product.additionalImages || [])];
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0].name : 'Default Strap'
  );
  const [activeTab, setActiveTab] = useState<'specs' | 'warranty' | 'shipping'>('specs');
  const [addedToast, setAddedToast] = useState(false);

  const fontClass = fontFamily === 'serif' 
    ? 'font-serif-luxury' 
    : fontFamily === 'display' 
    ? 'font-display-luxury' 
    : 'font-sans-luxury';

  const buttonRadiusClass = buttonStyle === 'pill' 
    ? 'rounded-full' 
    : buttonStyle === 'sharp' 
    ? 'rounded-none' 
    : 'rounded-lg';

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedVariant);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity, selectedVariant);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-stone-900 pb-24">
      {/* Breadcrumb & Back bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
        <button
          onClick={onBackToShop}
          className="inline-flex items-center gap-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Watches</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage View */}
            <div className="relative aspect-square w-full rounded-2xl bg-white border border-stone-200/90 p-8 flex items-center justify-center overflow-hidden shadow-sm">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain transition-all duration-300 drop-shadow-xl"
              />

              {/* Wishlist Floating Button */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm ${
                  isWishlisted 
                    ? 'bg-rose-50 text-rose-600' 
                    : 'bg-white/90 text-stone-400 hover:text-stone-900'
                }`}
                aria-label="Wishlist Timepiece"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              {/* Atelier Inspection Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-stone-200 text-[11px] font-mono text-stone-600">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Calibre Inspection Certified</span>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-xl bg-white border p-2 shrink-0 transition-all cursor-pointer ${
                      selectedImage === idx 
                        ? 'border-stone-900 ring-2 ring-stone-900/10 scale-105' 
                        : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Commerce Controls */}
          <div className="lg:col-span-5 flex flex-col justify-start text-left space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-800">
                  {product.category} COLLECTION
                </span>
                <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  In Stock • Gulshan Atelier
                </span>
              </div>

              <h1 className={`${fontClass} text-3xl sm:text-4xl font-normal text-stone-900 leading-tight`}>
                {product.title}
              </h1>

              <p className="text-xs sm:text-sm text-stone-500 mt-1 font-light">
                {product.subtitle}
              </p>

              {/* Price Display */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-semibold text-stone-900 font-sans-luxury">
                  ৳ {product.price.toLocaleString()}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-stone-400 line-through">
                    ৳ {product.compareAtPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
                  BDT
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-stone-600 font-light leading-relaxed border-t border-stone-200/80 pt-4">
              {product.description}
            </p>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                  Select Strap &amp; Finishes: <span className="font-normal text-stone-500 ml-1">{selectedVariant}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.name)}
                      className={`px-3.5 py-2 text-xs rounded-lg transition-all cursor-pointer ${
                        selectedVariant === v.name
                          ? 'bg-stone-900 text-white font-medium shadow-sm'
                          : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Quantity:
              </label>
              <div className="flex items-center border border-stone-200 bg-white rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer text-sm"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-semibold text-stone-900 font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer text-sm"
                >
                  +
                </button>
              </div>
              <span className="text-[11px] text-stone-400 font-mono">
                ({product.inventory} units available)
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`${buttonRadiusClass} w-full py-3.5 text-xs font-semibold uppercase tracking-wider border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className={`${buttonRadiusClass} w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer active:scale-95`}
                  style={{ backgroundColor: primaryColor || '#0A192F' }}
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Buy Now</span>
                </button>
              </div>

              {addedToast && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Added {quantity} × {product.title} to your cart.</span>
                </div>
              )}
            </div>

            {/* Micro Benefits list for Bangladesh */}
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-stone-200/80 text-center text-[11px] text-stone-600">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-stone-800" />
                <span className="font-medium text-stone-900">24-48h Delivery</span>
                <span className="text-[10px] text-stone-400">৳80 Dhaka / ৳130 BD</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-stone-800" />
                <span className="font-medium text-stone-900">5-Yr Official Warranty</span>
                <span className="text-[10px] text-stone-400">Gulshan Atelier</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-stone-800" />
                <span className="font-medium text-stone-900">Cash on Delivery</span>
                <span className="text-[10px] text-stone-400">bKash &amp; Nagad OK</span>
              </div>
            </div>

            {/* Tabbed Info for Specs, Warranty & Shipping */}
            <div className="pt-2">
              <div className="flex border-b border-stone-200 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 mr-6 uppercase tracking-wider cursor-pointer ${
                    activeTab === 'specs' 
                      ? 'text-stone-950 border-b-2 border-stone-950 font-semibold' 
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('warranty')}
                  className={`pb-2.5 mr-6 uppercase tracking-wider cursor-pointer ${
                    activeTab === 'warranty' 
                      ? 'text-stone-950 border-b-2 border-stone-950 font-semibold' 
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Warranty
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2.5 uppercase tracking-wider cursor-pointer ${
                    activeTab === 'shipping' 
                      ? 'text-stone-950 border-b-2 border-stone-950 font-semibold' 
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Bangladesh Shipping
                </button>
              </div>

              <div className="py-4 text-xs">
                {activeTab === 'specs' && (
                  <div className="space-y-2.5">
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Calibre Movement:</span>
                      <span className="font-medium text-stone-900">{product.specs.movement}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Case Diameter:</span>
                      <span className="font-medium text-stone-900">{product.specs.caseDiameter}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Crystal Glass:</span>
                      <span className="font-medium text-stone-900">{product.specs.crystal}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Water Resistance:</span>
                      <span className="font-medium text-stone-900">{product.specs.waterResistance}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Power Reserve:</span>
                      <span className="font-medium text-stone-900">{product.specs.powerReserve || '48 Hours'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-stone-500">Strap / Lug Width:</span>
                      <span className="font-medium text-stone-900">{product.specs.strap} ({product.specs.lugWidth || '20mm'})</span>
                    </div>
                  </div>
                )}

                {activeTab === 'warranty' && (
                  <div className="space-y-2 text-stone-600 font-light leading-relaxed">
                    <p>
                      Every CHRONOVA timepiece is backed by our official <strong className="text-stone-900 font-medium">5-Year Global Warranty</strong>, serviced directly at our Gulshan-2 Dhaka Atelier.
                    </p>
                    <p>
                      Covers internal movement malfunctions, manufacturing defects, crown stem regulation, and water resistance seal maintenance free of charge.
                    </p>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2 text-stone-600 font-light leading-relaxed">
                    <p>
                      <strong className="text-stone-900 font-medium">Inside Dhaka:</strong> ৳80 delivery fee. Dispatched via priority armored courier within 24 to 48 hours.
                    </p>
                    <p>
                      <strong className="text-stone-900 font-medium">Outside Dhaka:</strong> ৳130 delivery fee across all 64 districts (Chattogram, Sylhet, Rajshahi, Khulna, etc.) delivered in 48 to 72 hours.
                    </p>
                    <p className="text-amber-800 font-medium">
                      Cash on Delivery is supported — you may examine the luxury presentation box and timepiece prior to payment.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
