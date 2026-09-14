import React, { useState, useMemo } from 'react';
import { Product, ButtonStyle, TypographyPreset } from '../../types';
import { ShoppingBag, Eye, SlidersHorizontal, Check } from 'lucide-react';

interface CollectionGridProps {
  products: Product[];
  primaryColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({
  products,
  primaryColor,
  buttonStyle,
  fontFamily,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Timepieces' },
    { id: 'olevs', label: 'OLEVS Watches' },
    { id: 'arabic', label: 'Arabic Dial' },
    { id: 'sabr', label: 'SABR (صبر)' },
    { id: 'poedagar', label: 'POEDAGAR' },
    { id: 'chronograph', label: 'Chronographs' },
    { id: 'automatic', label: 'Automatic' },
    { id: 'heritage', label: 'Heritage Gold' },
    { id: 'diver', label: 'Diver & Titanium' },
    { id: 'limited', label: 'Limited Atelier' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (inStockOnly && p.inventory <= 0) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0; // featured default order
      });
  }, [products, selectedCategory, sortBy, inStockOnly]);

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

  return (
    <section id="collections" className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-stone-500">
              Curated Catalog
            </span>
            <h2 className={`${fontClass} text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900 mt-1`}>
              The Complete Collection
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Stock filter */}
            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5 cursor-pointer ${
                inStockOnly ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
              }`}
            >
              {inStockOnly && <Check className="w-3.5 h-3.5" />}
              In Stock Only
            </button>

            {/* Sort selector */}
            <div className="relative inline-flex items-center">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-200 text-stone-700 text-xs rounded-full pl-8 pr-4 py-1.5 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-stone-400"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-5 py-2 text-xs uppercase tracking-wider font-medium transition-all duration-200 rounded-full cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0A192F] text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="group bg-white border border-stone-200/80 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div 
                className="relative aspect-square bg-stone-50/50 p-6 flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Stock Tag */}
                {product.inventory < 5 && product.inventory > 0 && (
                  <span className="absolute top-3 left-3 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Only {product.inventory} left
                  </span>
                )}

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-stone-900/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="p-3 bg-white text-stone-900 rounded-full shadow-md hover:bg-stone-100 transition-transform active:scale-95"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="p-3 bg-[#0A192F] text-white rounded-full shadow-md hover:bg-[#122744] transition-transform active:scale-95"
                    title="Add to Bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-grow justify-between text-left">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-stone-400 font-sans-luxury uppercase tracking-wider mb-1.5">
                    {product.brand ? (
                      <span className="font-semibold text-[#2A7B9B] bg-[#2A7B9B]/10 px-2 py-0.5 rounded text-[10px]">
                        {product.brand}
                      </span>
                    ) : (
                      <span>{product.category}</span>
                    )}
                    <span className="font-mono">{product.specs.caseDiameter}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="font-sans-luxury text-base font-medium text-stone-900 hover:text-[#2A7B9B] transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.title}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-1 mt-0.5 font-light">
                    {product.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-semibold text-stone-900 font-sans-luxury">
                      ৳ {product.price.toLocaleString()} BDT
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-xs text-stone-400 line-through">
                        ৳ {product.compareAtPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className={`${buttonRadiusClass} text-xs font-medium px-4 py-2 bg-stone-900 hover:bg-black text-white transition-colors cursor-pointer flex items-center gap-1.5`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-sm">No timepieces match the selected criteria.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setInStockOnly(false); }}
              className="mt-3 text-xs text-stone-900 font-semibold underline underline-offset-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
