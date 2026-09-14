import React from 'react';
import { Product, ThemeSection, ButtonStyle, TypographyPreset } from '../../types';
import { ShoppingBag, Eye, Heart } from 'lucide-react';

interface SignaturePiecesSectionProps {
  section: ThemeSection;
  products: Product[];
  primaryColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onShopAllClick: () => void;
}

export const SignaturePiecesSection: React.FC<SignaturePiecesSectionProps> = ({
  section,
  products,
  primaryColor,
  buttonStyle,
  fontFamily,
  wishlistIds = [],
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
  onShopAllClick,
}) => {
  const {
    headline = 'Explore Our Signature Pieces',
    subheadline = 'From early mornings to late nights, our watches move with you: symbols of confidence, precision, and individuality.',
    buttonText = 'Shop All Watches'
  } = section.settings;

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

  // Find the signature products or take the first 3 (matching Image 1)
  const signatureProducts = products.filter(p => p.isSignature).slice(0, 3);
  const displayProducts = signatureProducts.length === 3 ? signatureProducts : products.slice(0, 3);

  return (
    <section id="signature-pieces-section" className="py-16 md:py-24 bg-white text-stone-900 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header matching Image 1 */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-stone-500 mb-2 block">
            CHRONOVA ATELIER CURATION
          </span>
          <h2 className={`${fontClass} text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-stone-900 mb-4`}>
            {headline}
          </h2>
          <p className="text-stone-500 text-sm sm:text-base font-sans-luxury leading-relaxed max-w-2xl mx-auto font-light">
            {subheadline}
          </p>
        </div>

        {/* 3 Signature Cards Grid matching Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {displayProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <div
                key={product.id}
                id={`signature-card-${product.id}`}
                className="group flex flex-col bg-white border border-stone-200/80 p-6 transition-all duration-300 hover:border-stone-400 hover:shadow-xl relative rounded-xl overflow-hidden"
              >
                {/* Wishlist Top-Right Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist?.(product.id);
                  }}
                  className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-sm transition-colors duration-200 cursor-pointer ${
                    isWishlisted 
                      ? 'bg-rose-50 text-rose-600 shadow-sm' 
                      : 'bg-white/80 text-stone-400 hover:text-stone-900 hover:bg-white'
                  }`}
                  aria-label="Wishlist Timepiece"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                {/* Product Image Frame */}
                <div 
                  className="relative aspect-square w-full overflow-hidden bg-stone-50/50 flex items-center justify-center p-4 cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="p-3 bg-white text-stone-900 rounded-full shadow-md hover:bg-stone-100 transition-colors cursor-pointer"
                      title="Quick Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="p-3 bg-[#0A192F] text-white rounded-full shadow-md hover:bg-[#152e52] transition-colors cursor-pointer"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Info exactly as formatted in Image 1 */}
                <div className="pt-6 pb-2 text-center flex flex-col items-center flex-grow">
                  {product.brand && (
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#2A7B9B]/10 text-[#2A7B9B] border border-[#2A7B9B]/20 font-semibold mb-1">
                      {product.brand}
                    </span>
                  )}

                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="text-base sm:text-lg font-medium text-stone-900 hover:text-[#2A7B9B] transition-colors cursor-pointer font-sans-luxury tracking-wide"
                  >
                    {product.title}
                  </h3>
                  
                  <p className="text-xs text-stone-500 font-sans-luxury mt-1 font-light line-clamp-1">
                    {product.subtitle || 'Stainless steel with sapphire crystal'}
                  </p>

                  <div className="flex items-baseline gap-2 mt-2 font-sans-luxury">
                    <span className="text-base font-semibold text-stone-900">
                      ৳ {product.price.toLocaleString()}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-xs text-stone-400 line-through">
                        ৳ {product.compareAtPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="mt-4 text-xs tracking-wider uppercase font-medium text-stone-700 hover:text-stone-950 underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center CTA button matching Image 1 */}
        <div className="mt-14 text-center">
          <button
            id="shop-all-watches-btn"
            onClick={onShopAllClick}
            className={`${buttonRadiusClass} px-10 py-3.5 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2`}
            style={{ backgroundColor: primaryColor || '#0A192F' }}
          >
            <span>{buttonText}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
