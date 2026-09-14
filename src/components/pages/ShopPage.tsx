import React, { useState, useMemo } from 'react';
import { Product, ButtonStyle, TypographyPreset } from '../../types';
import { Search, ShoppingBag, Eye, Heart, Filter, Check, ArrowUpDown } from 'lucide-react';

interface ShopPageProps {
  products: Product[];
  primaryColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
  initialCategory?: string;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  primaryColor,
  buttonStyle,
  fontFamily,
  initialCategory = 'all',
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

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

  const categories = [
    { id: 'all', label: 'All Timepieces' },
    { id: 'automatic', label: 'Automatic' },
    { id: 'chronograph', label: 'Chronograph' },
    { id: 'heritage', label: 'Heritage Gold' },
    { id: 'classic', label: 'Executive Classic' },
    { id: 'diver', label: 'Marine Diver' }
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (inStockOnly && p.inventory <= 0) return false;
        if (showWishlistOnly && !wishlistIds.includes(p.id)) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchSub = p.subtitle.toLowerCase().includes(q);
          const matchMovement = p.specs.movement.toLowerCase().includes(q);
          if (!matchTitle && !matchSub && !matchMovement) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // featured default
      });
  }, [products, selectedCategory, inStockOnly, showWishlistOnly, searchQuery, sortBy, wishlistIds]);

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-stone-900 pb-24">
      {/* Header Banner */}
      <div className="bg-[#FAF7F2] border-b border-stone-200/80 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-stone-500 mb-2 block">
            CHRONOVA ATELIER CATALOGUE
          </span>
          <h1 className={`${fontClass} text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900 mb-3`}>
            {showWishlistOnly ? 'Your Saved Timepieces' : 'Master Timepiece Vault'}
          </h1>
          <p className="text-stone-600 text-sm sm:text-base font-sans-luxury max-w-xl mx-auto font-light">
            {showWishlistOnly 
              ? 'Curated horology pieces saved to your private wishlist for future acquisition.'
              : 'Precision Swiss-engineered movements, regulated in our Dhaka atelier. Available with insured 24–48h delivery across Bangladesh.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
        {/* Filter and Search Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-stone-200/80">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setShowWishlistOnly(false);
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id && !showWishlistOnly
                    ? 'bg-[#0A192F] text-white shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}

            {/* Wishlist Pill */}
            <button
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                showWishlistOnly
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-white' : ''}`} />
              <span>Wishlist ({wishlistIds.length})</span>
            </button>
          </div>

          {/* Search & Sort Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calibre, model..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
            </div>

            {/* In-Stock Toggle */}
            <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer bg-white px-3 py-2 rounded-lg border border-stone-200 select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-stone-900 focus:ring-0 cursor-pointer"
              />
              <span>In Stock</span>
            </label>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-stone-200 rounded-lg px-3 py-2 pr-8 text-xs text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="py-4 flex items-center justify-between text-xs text-stone-500 font-mono">
          <span>Displaying {filteredProducts.length} Timepieces in Bangladesh Vault</span>
          {showWishlistOnly && (
            <button 
              onClick={() => setShowWishlistOnly(false)}
              className="text-stone-800 underline hover:text-stone-950 font-sans cursor-pointer"
            >
              View All Watches
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-stone-200/80 p-8 my-6">
            <Filter className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-medium text-stone-900">No timepieces matched your criteria</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Try adjusting your category filter, clearing your search query, or checking back for new allocations.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setInStockOnly(false);
                setShowWishlistOnly(false);
              }}
              className="mt-4 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-white border border-stone-200/90 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative"
                >
                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer ${
                      isWishlisted ? 'bg-rose-50 text-rose-600' : 'bg-white/80 text-stone-400 hover:text-stone-900'
                    }`}
                    aria-label="Wishlist Timepiece"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Stock Tag */}
                  {product.inventory < 5 && product.inventory > 0 && (
                    <span className="absolute top-3 left-3 z-20 px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-semibold rounded tracking-wider uppercase">
                      Only {product.inventory} Left
                    </span>
                  )}

                  {/* Product Image Frame */}
                  <div
                    className="relative aspect-square bg-[#FDFBF7] p-5 flex items-center justify-center overflow-hidden cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Hover Action Overlay */}
                    <div className="absolute inset-0 bg-stone-950/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="p-2.5 bg-white text-stone-900 rounded-full shadow-md hover:bg-stone-100 transition-transform active:scale-95 cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="p-2.5 bg-[#0A192F] text-white rounded-full shadow-md hover:bg-[#152e52] transition-transform active:scale-95 cursor-pointer"
                        title="Add to Bag"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content & Price */}
                  <div className="p-5 flex flex-col flex-grow justify-between text-left">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">
                          {product.category}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-medium">
                          {product.specs.caseDiameter}
                        </span>
                      </div>

                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="text-base font-medium text-stone-900 group-hover:text-amber-700 transition-colors cursor-pointer font-sans-luxury"
                      >
                        {product.title}
                      </h3>

                      <p className="text-xs text-stone-500 font-light line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-stone-100">
                      <div className="flex items-baseline justify-between mb-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-semibold text-stone-900 font-sans-luxury">
                            ৳ {product.price.toLocaleString()}
                          </span>
                          {product.compareAtPrice && (
                            <span className="text-xs text-stone-400 line-through">
                              ৳ {product.compareAtPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-400 font-mono">BDT</span>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onAddToCart(product)}
                          className={`${buttonRadiusClass} py-2 text-xs font-medium border border-stone-300 hover:border-stone-900 text-stone-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => onBuyNow(product)}
                          className={`${buttonRadiusClass} py-2 text-xs font-medium text-white shadow transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center`}
                          style={{ backgroundColor: primaryColor || '#0A192F' }}
                        >
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
