import React, { useState } from 'react';
import { Category } from '../../../types';
import { MANOVA_CATEGORIES } from '../../../data/manovaData';
import { 
  FolderTree, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X,
  Layers,
  Watch
} from 'lucide-react';

interface CategoryViewProps {
  lang: 'bn' | 'en';
}

export const CategoryView: React.FC<CategoryViewProps> = ({ lang }) => {
  const isBn = lang === 'bn';

  const [categories, setCategories] = useState<Category[]>(MANOVA_CATEGORIES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      productCount: 0,
      isActive: true,
      displayOrder: categories.length + 1
    };

    setCategories([...categories, newCat]);
    setName('');
    setSlug('');
    setDescription('');
    setShowAddModal(false);
  };

  const handleToggleActive = (id: string) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <FolderTree className="w-3.5 h-3.5" />
            {isBn ? 'ক্যাটালগ স্ট্রাকচার' : 'Store Taxonomy'}
          </div>
          <h2 className="text-lg font-bold text-stone-900">
            {isBn ? 'ঘড়ি ক্যাটাগরি ম্যানেজমেন্ট' : 'Watch Category Management'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn ? 'ক্লাসিক, অটোমেটিক, ক্রোনোগ্রাফ এবং লিমিটেড এডিশন কালেকশন পরিচালনা করুন।' : 'Organize wristwatches into discoverable collections across storefront navigation.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{isBn ? 'নতুন ক্যাটাগরি তৈরি করুন' : 'Add Category'}</span>
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  {cat.displayOrder}
                </span>
                <button
                  onClick={() => handleToggleActive(cat.id)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-colors cursor-pointer ${
                    cat.isActive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {cat.isActive ? 'Active' : 'Hidden'}
                </button>
              </div>

              <h3 className="font-bold text-stone-900 text-base">{cat.name}</h3>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2">{cat.description}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 font-mono text-stone-600">
                <Watch className="w-3.5 h-3.5 text-stone-400" />
                <span>{cat.productCount} {isBn ? 'টি ঘড়ি' : 'watches'}</span>
              </span>

              <span className="font-mono text-[10px] text-stone-400 bg-stone-50 px-2 py-0.5 rounded">
                /{cat.slug}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-stone-900 text-sm">Add New Collection Category</h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Moonphase & Complications"
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">URL Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. moonphase"
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description for customer storefront..."
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border border-stone-200 text-stone-600 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#15803D] hover:bg-[#166534] text-white rounded-lg font-semibold"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
