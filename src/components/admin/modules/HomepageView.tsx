import React from 'react';
import { ThemeSettings, ThemeSection } from '../../../types';
import { 
  Sparkles, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Sliders, 
  ExternalLink,
  Layers,
  Palette,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface HomepageViewProps {
  currentTheme: ThemeSettings;
  onUpdateTheme: (theme: ThemeSettings) => void;
  onOpenThemeEditor?: () => void;
  lang: 'bn' | 'en';
}

export const HomepageView: React.FC<HomepageViewProps> = ({
  currentTheme,
  onUpdateTheme,
  onOpenThemeEditor,
  lang,
}) => {
  const isBn = lang === 'bn';

  const handleToggleSection = (sectionId: string) => {
    const updatedSections = currentTheme.sections.map(sec => 
      sec.id === sectionId ? { ...sec, enabled: !sec.enabled } : sec
    );
    onUpdateTheme({
      ...currentTheme,
      sections: updatedSections,
    });
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...currentTheme.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    onUpdateTheme({
      ...currentTheme,
      sections: newSections,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            {isBn ? 'স্টোরফ্রন্ট হোমপেজ আর্কিটেকচার' : 'Storefront Homepage Architecture'}
          </div>
          <h1 className="text-xl font-bold text-stone-900">
            {isBn ? 'হোমপেজ সেকশন ম্যানেজার' : 'Homepage Section Manager'}
          </h1>
          <p className="text-xs text-stone-500 mt-1 max-w-xl">
            {isBn
              ? 'হোমপেজের প্রতিটি সেকশন চালু/বন্ধ করুন, ক্রম পরিবর্তন করুন এবং শপিফাই-স্টাইল কাস্টমাইজারে সরাসরি রঙ, টেক্সট ও ইমেজ এডিট করুন।'
              : 'Toggle visibility, reorder layout sections, and launch the Shopify-style customizer to modify typography, hero banners, and collections.'}
          </p>
        </div>

        {onOpenThemeEditor && (
          <button
            onClick={onOpenThemeEditor}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-sm font-semibold shadow-xs transition-all cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isBn ? 'থিম কাস্টমাইজারে যান (/admin/theme-editor)' : 'Open Theme Customizer'}</span>
          </button>
        )}
      </div>

      {/* Preset & Global Styles Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-stone-200">
          <span className="text-xs text-stone-500 font-medium">{isBn ? 'সক্রিয় থিম প্রিসেট' : 'Active Preset'}</span>
          <p className="text-lg font-bold text-stone-900 capitalize mt-1 flex items-center gap-2">
            <span>{currentTheme.preset}</span>
            <span className="px-2 py-0.5 text-xs bg-emerald-100 text-emerald-800 rounded-full font-sans font-semibold">
              Live
            </span>
          </p>
          <p className="text-xs text-stone-400 mt-1">
            {currentTheme.preset === 'minimal' ? 'Screenshot 1 match (Minimal luxury)' : currentTheme.preset}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200">
          <span className="text-xs text-stone-500 font-medium">{isBn ? 'টাইপোগ্রাফি ও কালার প্যালেট' : 'Typography & Color'}</span>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full border border-stone-300" style={{ backgroundColor: currentTheme.primaryColor }} />
              <span className="w-5 h-5 rounded-full border border-stone-300" style={{ backgroundColor: currentTheme.accentColor }} />
              <span className="w-5 h-5 rounded-full border border-stone-300" style={{ backgroundColor: currentTheme.backgroundColor }} />
            </div>
            <span className="text-xs font-mono font-medium uppercase text-stone-700">
              {currentTheme.fontFamily} font
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200">
          <span className="text-xs text-stone-500 font-medium">{isBn ? 'অ্যানাউন্সমেন্ট বার' : 'Announcement Bar'}</span>
          <p className="text-xs font-medium text-stone-800 truncate mt-1.5">
            {currentTheme.showAnnouncement ? `✓ ${currentTheme.announcementText}` : 'Disabled'}
          </p>
          <p className="text-[11px] text-stone-400 mt-1">
            {currentTheme.showAnnouncement ? (isBn ? 'হেডারে প্রদর্শিত হচ্ছে' : 'Active on header') : (isBn ? 'বন্ধ আছে' : 'Hidden')}
          </p>
        </div>
      </div>

      {/* Reorderable Section List */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between">
          <h3 className="font-semibold text-stone-900 text-sm">
            {isBn ? 'হোমপেজ সেকশন তালিকা ও প্রদর্শন ক্রম' : 'Storefront Sections & Rendering Order'}
          </h3>
          <span className="text-xs text-stone-500 font-mono">
            {currentTheme.sections.filter(s => s.enabled).length} / {currentTheme.sections.length} {isBn ? 'সেকশন সক্রিয়' : 'active'}
          </span>
        </div>

        <div className="divide-y divide-stone-100">
          {currentTheme.sections.map((section, idx) => (
            <div 
              key={section.id} 
              className={`p-4 flex items-center justify-between transition-colors ${
                section.enabled ? 'bg-white hover:bg-stone-50/50' : 'bg-stone-50/70 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-6 text-center font-mono text-xs font-semibold text-stone-400">
                  {idx + 1}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900 text-sm">{section.name}</span>
                    <span className="text-[10px] font-mono uppercase bg-stone-100 px-2 py-0.5 rounded text-stone-600">
                      {section.type}
                    </span>
                  </div>
                  {section.settings.headline && (
                    <p className="text-xs text-stone-500 truncate max-w-md mt-0.5">
                      "{section.settings.headline}"
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMoveSection(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleMoveSection(idx, 'down')}
                  disabled={idx === currentTheme.sections.length - 1}
                  className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleToggleSection(section.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    section.enabled
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-stone-100 text-stone-500 border-stone-200 hover:bg-stone-200'
                  }`}
                >
                  {section.enabled ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isBn ? 'চালু' : 'Visible'}</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>{isBn ? 'লুকানো' : 'Hidden'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
