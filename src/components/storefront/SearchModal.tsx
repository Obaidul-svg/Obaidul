import React, { useState, useMemo } from 'react';
import { Product } from '../../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return products.slice(0, 4);
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.specs.movement.toLowerCase().includes(q)
    );
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fadeIn">
      <div 
        className="bg-white text-stone-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative p-4 sm:p-6 border-b border-stone-200 flex items-center">
          <Search className="w-5 h-5 text-stone-400 absolute left-6" />
          <input
            type="text"
            autoFocus
            placeholder="Search timepieces by model, calibre, or complication..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 text-sm sm:text-base text-stone-900 placeholder-stone-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="absolute right-6 p-1 text-stone-400 hover:text-stone-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
          <p className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold px-2">
            {query ? `Found ${results.length} results` : 'Signature Suggestions'}
          </p>

          <div className="divide-y divide-stone-100">
            {results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 rounded-xl hover:bg-stone-50 flex items-center gap-4 transition-colors cursor-pointer group"
              >
                <div className="w-14 h-14 bg-stone-100 rounded-lg p-1.5 shrink-0 flex items-center justify-center">
                  <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                </div>

                <div className="flex-1 text-left">
                  <h4 className="text-sm font-medium text-stone-900 group-hover:text-amber-800 transition-colors">
                    {product.title}
                  </h4>
                  <p className="text-xs text-stone-500 font-light line-clamp-1">{product.subtitle}</p>
                </div>

                <div className="text-right">
                  <span className="text-sm font-semibold text-stone-900 font-mono">
                    ৳ {product.price.toLocaleString()}
                  </span>
                  <div className="flex items-center text-[10px] text-amber-700 font-medium justify-end gap-1 mt-0.5">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <div className="text-center py-10 text-stone-400 text-xs">
              No timepieces found matching "{query}". Try searching "Gold", "Chrono", or "Automatic".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
