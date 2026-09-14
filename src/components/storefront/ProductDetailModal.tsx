import React, { useState } from 'react';
import { Product } from '../../types';
import { X, ShoppingBag, ShieldCheck, Check, Clock, Award, Compass } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  if (!product) return null;

  const currentImage = selectedImage || product.image;
  const gallery = [product.image, ...(product.additionalImages || [])];

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white text-stone-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[92vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-900 bg-white/80 backdrop-blur-md rounded-full transition-colors shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12">
          {/* Left: Gallery */}
          <div className="md:col-span-6 bg-stone-50/70 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div className="relative aspect-square w-full flex items-center justify-center p-4">
              <img
                src={currentImage}
                alt={product.title}
                className="w-full h-full object-contain transition-all duration-300 drop-shadow-xl"
              />
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex items-center justify-center gap-3 pt-4">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border p-1 bg-white cursor-pointer transition-all ${
                      currentImage === img ? 'border-amber-700 ring-2 ring-amber-700/20 scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Specs */}
          <div className="md:col-span-6 p-6 sm:p-8 text-left flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-amber-800">
                <Compass className="w-3.5 h-3.5" />
                <span>{product.category} Collection • Dhaka Atelier</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-normal text-stone-900">
                {product.title}
              </h2>

              <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-semibold font-mono text-stone-900">
                  ৳ {product.price.toLocaleString()} BDT
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ৳ {product.compareAtPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Technical Specifications */}
              <div className="pt-3 border-t border-stone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2.5">
                  Technical Specifications
                </h4>
                <div className="bg-stone-50 rounded-xl p-3.5 space-y-2 text-xs text-stone-700 font-sans-luxury">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Calibre Movement</span>
                    <span className="font-medium text-stone-900">{product.specs.movement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Case Diameter</span>
                    <span className="font-medium text-stone-900">{product.specs.caseDiameter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Water Resistance</span>
                    <span className="font-medium text-stone-900">{product.specs.waterResistance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Crystal Dome</span>
                    <span className="font-medium text-stone-900">{product.specs.crystal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Strap / Bracelet</span>
                    <span className="font-medium text-stone-900">{product.specs.strap}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-100 rounded-l-lg transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-semibold font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-100 rounded-r-lg transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  id="modal-add-to-bag-btn"
                  onClick={handleAdd}
                  className="flex-1 py-3.5 bg-[#0A192F] hover:bg-[#122744] text-white rounded-xl text-xs sm:text-sm font-medium transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag — ${(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                  <span>5-Year Atelier Warranty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-stone-700" />
                  <span>Insured Global Courier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
