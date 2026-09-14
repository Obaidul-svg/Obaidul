import React, { useState } from 'react';
import { Product } from '../../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Check, 
  X,
  Watch,
  Boxes
} from 'lucide-react';

interface ProductsViewProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  lang: 'bn' | 'en';
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  lang,
}) => {
  const isBn = lang === 'bn';

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(35000);
  const [comparePrice, setComparePrice] = useState<number>(39000);
  const [category, setCategory] = useState<Product['category']>('classic');
  const [sku, setSku] = useState('MAN-NEW-001');
  const [inventory, setInventory] = useState<number>(15);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85');
  const [movement, setMovement] = useState('Calibre MAN-820 Automatic (48h Reserve)');
  const [caseDiameter, setCaseDiameter] = useState('40mm');
  const [waterResistance, setWaterResistance] = useState('100m / 10 ATM');
  const [crystal, setCrystal] = useState('Double Domed Sapphire AR Coated');
  const [strap, setStrap] = useState('316L Stainless Steel / Full Grain Leather');

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setTitle(p.title);
    setSubtitle(p.subtitle);
    setDescription(p.description);
    setPrice(p.price);
    setComparePrice(p.compareAtPrice || 0);
    setCategory(p.category);
    setSku(p.sku || '');
    setInventory(p.inventory);
    setImage(p.image);
    setMovement(p.specs.movement);
    setCaseDiameter(p.specs.caseDiameter);
    setWaterResistance(p.specs.waterResistance);
    setCrystal(p.specs.crystal);
    setStrap(p.specs.strap);
    setShowAddModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        title,
        subtitle,
        description,
        price: Number(price),
        compareAtPrice: Number(comparePrice) || undefined,
        category,
        sku,
        inventory: Number(inventory),
        image,
        specs: {
          ...editingProduct.specs,
          movement,
          caseDiameter,
          waterResistance,
          crystal,
          strap,
        }
      });
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        title,
        subtitle,
        description,
        price: Number(price),
        compareAtPrice: Number(comparePrice) || undefined,
        category,
        sku,
        inventory: Number(inventory),
        image,
        isPublished: true,
        isSignature: false,
        isFeatured: true,
        rating: 5.0,
        reviewCount: 1,
        specs: {
          movement,
          caseDiameter,
          waterResistance,
          crystal,
          strap,
          powerReserve: '48 Hours',
        }
      };
      onAddProduct(newProd);
    }

    setShowAddModal(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(p => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-stone-900">
            {isBn ? 'ঘড়ি ক্যাটালগ ও প্রোডাক্ট ম্যানেজমেন্ট' : 'Watch Catalogue & Products'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn ? 'মোট ২০টি লাক্সারি টাইমপিস লাইভ স্টোরে যুক্ত রয়েছে।' : 'Managing 20 luxury timepieces live in the atelier vault.'}
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setTitle('');
            setSubtitle('');
            setDescription('');
            setPrice(35000);
            setSku(`MAN-${Date.now().toString().slice(-4)}`);
            setShowAddModal(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isBn ? 'নতুন ঘড়ি যোগ করুন' : 'Add New Watch'}</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isBn ? 'ঘড়ির নাম বা SKU খুঁজুন...' : 'Search watch title or SKU...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-stone-500">{isBn ? 'ক্যাটাগরি:' : 'Category:'}</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-700"
          >
            <option value="all">{isBn ? 'সকল ক্যাটাগরি' : 'All Categories'}</option>
            <option value="classic">Classic</option>
            <option value="automatic">Automatic</option>
            <option value="chronograph">Chronograph</option>
            <option value="heritage">Heritage</option>
            <option value="diver">Diver & Pro</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3.5">{isBn ? 'ছবি' : 'Image'}</th>
                <th className="p-3.5">{isBn ? 'মডেল ও বিবরণ' : 'Watch Model & SKU'}</th>
                <th className="p-3.5">{isBn ? 'ক্যাটাগরি' : 'Category'}</th>
                <th className="p-3.5">{isBn ? 'মূল্য (৳)' : 'Price (৳)'}</th>
                <th className="p-3.5">{isBn ? 'স্টক' : 'Stock'}</th>
                <th className="p-3.5">{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="p-3.5 text-right">{isBn ? 'অ্যাকশন' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="p-3.5">
                    <img src={p.image} alt={p.title} className="w-12 h-12 object-cover rounded-lg border border-stone-200" />
                  </td>

                  <td className="p-3.5">
                    <p className="font-bold text-stone-900 text-sm">{p.title}</p>
                    <p className="text-stone-500 text-[11px] truncate max-w-xs">{p.subtitle}</p>
                    <span className="font-mono text-[10px] text-stone-400 block mt-0.5">
                      SKU: {p.sku || 'N/A'}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <span className="capitalize px-2.5 py-1 bg-stone-100 text-stone-700 rounded-md font-medium text-[11px]">
                      {p.category}
                    </span>
                  </td>

                  <td className="p-3.5 font-mono">
                    <p className="font-bold text-stone-900">৳ {p.price.toLocaleString()}</p>
                    {p.compareAtPrice && (
                      <p className="text-[10px] text-stone-400 line-through">
                        ৳ {p.compareAtPrice.toLocaleString()}
                      </p>
                    )}
                  </td>

                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-bold ${
                      p.inventory < 10 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {p.inventory} {isBn ? 'টি' : 'units'}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[11px] font-semibold">
                      Published
                    </span>
                  </td>

                  <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg cursor-pointer transition-colors inline-block"
                      title="Edit Watch"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${p.title}?`)) {
                          onDeleteProduct(p.id);
                        }
                      }}
                      className="p-1.5 bg-stone-100 hover:bg-rose-100 hover:text-rose-600 text-stone-500 rounded-lg cursor-pointer transition-colors inline-block"
                      title="Delete Watch"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-bold text-stone-900">
                {editingProduct ? (isBn ? 'ঘড়ি সম্পাদনা করুন' : 'Edit Watch') : (isBn ? 'নতুন ঘড়ি যুক্ত করুন' : 'Add New Watch')}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Watch Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Midnight Automatic"
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Subtitle / Key Feature</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Stainless steel with sapphire crystal & exhibition caseback"
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Price (৳ BDT)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Compare-at Price (৳)</label>
                  <input
                    type="number"
                    value={comparePrice}
                    onChange={(e) => setComparePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Inventory (Units)</label>
                  <input
                    type="number"
                    required
                    value={inventory}
                    onChange={(e) => setInventory(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg"
                  >
                    <option value="classic">Classic</option>
                    <option value="automatic">Automatic</option>
                    <option value="chronograph">Chronograph</option>
                    <option value="heritage">Heritage</option>
                    <option value="diver">Diver & Pro</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Image URL</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Masterpiece horology description..."
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg"
                />
              </div>

              {/* Specs */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                <span className="font-bold text-stone-800 uppercase tracking-wider text-[11px] block">
                  Horological Specifications
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-0.5">Calibre / Movement</label>
                    <input
                      type="text"
                      value={movement}
                      onChange={(e) => setMovement(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-0.5">Case Diameter</label>
                    <input
                      type="text"
                      value={caseDiameter}
                      onChange={(e) => setCaseDiameter(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-0.5">Glass / Crystal</label>
                    <input
                      type="text"
                      value={crystal}
                      onChange={(e) => setCrystal(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-0.5">Water Resistance</label>
                    <input
                      type="text"
                      value={waterResistance}
                      onChange={(e) => setWaterResistance(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#15803D] hover:bg-[#166534] text-white rounded-xl font-semibold shadow-xs"
                >
                  Save Watch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
