import React, { useState } from 'react';
import { 
  ThemeSettings, 
  ThemeSection, 
  ThemePreset, 
  TypographyPreset, 
  ButtonStyle,
  SectionType,
  Product,
} from '../../types';
import { THEME_PRESETS } from '../../data/mockData';
import { 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  EyeOff, 
  Sliders, 
  Palette, 
  Type, 
  Layout, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Save, 
  Check, 
  Plus, 
  ArrowLeft, 
  Trash2, 
  Sparkles, 
  Image as ImageIcon, 
  MoveUp, 
  MoveDown, 
  ExternalLink,
  SlidersHorizontal,
  Maximize2,
  Minimize2,
  X,
  Layers,
  HelpCircle,
  Undo2,
  CheckCircle,
  Tag,
  Link2
} from 'lucide-react';
import { HeroSection } from '../storefront/HeroSection';
import { SignaturePiecesSection } from '../storefront/SignaturePiecesSection';
import { FeaturedWatchesSection } from '../storefront/FeaturedWatchesSection';
import { CraftsmanshipSection } from '../storefront/CraftsmanshipSection';
import { CollectionGrid } from '../storefront/CollectionGrid';
import { ChronosWatermarkBanner } from '../storefront/ChronosWatermarkBanner';
import { TestimonialsSection } from '../storefront/TestimonialsSection';
import { NewsletterSection } from '../storefront/NewsletterSection';
import { FooterSection } from '../storefront/FooterSection';
import { ImageTextSection } from '../storefront/ImageTextSection';
import { PromoBannerSection } from '../storefront/PromoBannerSection';
import { ManovaLogo } from '../ManovaLogo';

interface ThemeCustomizerProps {
  currentTheme: ThemeSettings;
  onUpdateTheme: (theme: ThemeSettings) => void;
  onSaveToCloud?: () => Promise<void>;
  onExit: () => void;
  products: Product[];
  onOpenPrompt?: () => void;
  onSelectProduct?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

// 6 Curated High-Res Watch Photography Presets for Quick 1-Click swapping
const LUXURY_IMAGE_PRESETS = [
  {
    name: 'Minimal Rose Gold (Screenshot Match)',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Atelier Steel Chrono',
    url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Fluted Bezel Gold Diver',
    url: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Modern Matte White & Tan',
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Horology Atelier Bench',
    url: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Titanium Maritime Blue',
    url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
  }
];

// Available Section Types that can be added
const SECTION_TEMPLATES: {
  type: SectionType;
  name: string;
  description: string;
  defaultSettings: ThemeSection['settings'];
}[] = [
  {
    type: 'hero',
    name: 'Hero',
    description: 'Large hero showcase with serif headline, background styling, and watch imagery',
    defaultSettings: {
      headline: 'Designed to Endure',
      subheadline: 'Inspired by modern simplicity and crafted with unmatched detail. Our timepieces balance innovation and tradition.',
      buttonText: 'View Collections',
      buttonLink: '#collections',
      secondaryButtonText: 'Explore Craftsmanship',
      secondaryButtonLink: '#craftsmanship',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
      badgeText: 'CHRONOVA Atelier • Bangladesh Series 01',
      alignment: 'left'
    }
  },
  {
    type: 'signature',
    name: 'Featured Products',
    description: 'Curated 3-column signature pieces showcase matching reference layout',
    defaultSettings: {
      headline: 'Explore Our Signature Pieces',
      subheadline: 'From early mornings to late nights, our watches move with you: symbols of confidence, precision, and individuality.',
      buttonText: 'Shop All Watches',
      buttonLink: '#shop'
    }
  },
  {
    type: 'collections',
    name: 'Collection Grid',
    description: 'Filterable product category grid across chronograph, automatic, and heritage',
    defaultSettings: {
      headline: 'Curated Horological Collections',
      subheadline: 'Chronograph, Heritage, Automatic, and Maritime Diver series engineered for distinction.',
      buttonText: 'Explore Collections'
    }
  },
  {
    type: 'imageText',
    name: 'Image + Text',
    description: 'Editorial layout with high-resolution horology photography and narrative copy',
    defaultSettings: {
      headline: 'Engineering Without Compromise',
      subheadline: 'Each timepiece represents over 200 hours of master assembly, acoustic calibration, and hand-polishing in our Dhaka atelier.',
      buttonText: 'Discover The Story',
      badgeText: 'HOROLOGY CRAFT',
      imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
      layout: 'imageRight',
      alignment: 'left',
      backgroundColor: '#FFFFFF'
    }
  },
  {
    type: 'craftsmanship',
    name: 'Craftsmanship',
    description: 'Atelier standards showcase with acoustic and metallurgical credentials',
    defaultSettings: {
      headline: 'Uncompromising Horological Precision',
      subheadline: 'Every CHRONOVA timepiece undergoes 240 hours of rigorous acoustic calibration, hydro-pressure testing, and hand-finishing.',
      badgeText: 'THE CHRONOVA STANDARD',
      buttonText: 'Our Atelier Heritage',
      imageUrl: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&w=1000&q=85'
    }
  },
  {
    type: 'promoBanner',
    name: 'Promo Banner',
    description: 'High-impact invitation or promotional discount banner for special privileges',
    defaultSettings: {
      headline: 'Private Atelier Privilege — ৳ 2,000 Complimentary Credit',
      subheadline: 'Enter code CHRONOVA2000 at checkout on any order over ৳ 30,000. Includes insured expedited courier delivery across Bangladesh.',
      buttonText: 'Claim Invitation Code',
      badgeText: 'EXCLUSIVE INVITATION',
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=85',
      backgroundColor: '#0A192F'
    }
  },
  {
    type: 'newsletter',
    name: 'Newsletter',
    description: 'VIP collector circle email capture with inaugural discount incentive',
    defaultSettings: {
      headline: 'Join The CHRONOVA Circle',
      subheadline: 'Receive private allocations for limited edition calibres and ৳ 2,000 inaugural credit on your first order.',
      buttonText: 'Claim Invitation'
    }
  },
  {
    type: 'footer',
    name: 'Footer',
    description: 'Storefront brand values, atelier address in Gulshan, and payment credentials',
    defaultSettings: {
      headline: 'CHRONOVA Atelier Horology',
      subheadline: 'Plot 21, Road 71, Gulshan-2, Dhaka-1212'
    }
  }
];

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  currentTheme,
  onUpdateTheme,
  onSaveToCloud,
  onExit,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  // Working Theme State (changes apply instantly to live center preview)
  const [theme, setTheme] = useState<ThemeSettings>(() => currentTheme);

  // Selected Section for Right Panel Editing (null = Global Theme Settings)
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(() => {
    return theme.sections.length > 0 ? theme.sections[0].id : null;
  });

  // Left Panel Tab: 'sections' | 'global'
  const [leftTab, setLeftTab] = useState<'sections' | 'global'>('sections');

  // Device Viewport Preview
  const [deviceViewport, setDeviceViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Fullscreen Preview Toggle
  const [isFullscreenPreview, setIsFullscreenPreview] = useState<boolean>(false);

  // Add Section Modal
  const [showAddSectionModal, setShowAddSectionModal] = useState<boolean>(false);

  // Feedback Toasts
  const [draftToast, setDraftToast] = useState<string | null>(null);
  const [publishToast, setPublishToast] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  // Drag and Reorder State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Switch Starter Theme Preset
  const handleSelectPreset = (presetKey: ThemePreset) => {
    const preset = THEME_PRESETS[presetKey];
    if (preset) {
      setTheme({ ...preset });
      if (preset.sections.length > 0) {
        setSelectedSectionId(preset.sections[0].id);
      }
    }
  };

  // Reorder Sections: Move Up or Down
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...theme.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    setTheme((prev) => ({
      ...prev,
      sections: newSections,
    }));
  };

  // Drag Reorder
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newSections = [...theme.sections];
    const item = newSections.splice(draggedIndex, 1)[0];
    newSections.splice(index, 0, item);
    setDraggedIndex(index);
    setTheme((prev) => ({ ...prev, sections: newSections }));
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Toggle Visibility
  const handleToggleSectionVisibility = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setTheme((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.id === id ? { ...sec, enabled: !sec.enabled } : sec
      ),
    }));
  };

  // Delete Section
  const handleDeleteSection = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setTheme((prev) => {
      const filtered = prev.sections.filter((sec) => sec.id !== id);
      return {
        ...prev,
        sections: filtered,
      };
    });

    if (selectedSectionId === id) {
      setSelectedSectionId(null);
    }
  };

  // Add Section
  const handleAddSection = (template: typeof SECTION_TEMPLATES[0]) => {
    const newId = `sec-${template.type}-${Date.now().toString().slice(-4)}`;
    const newSection: ThemeSection = {
      id: newId,
      type: template.type,
      name: template.name,
      enabled: true,
      settings: { ...template.defaultSettings },
    };

    setTheme((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));

    setSelectedSectionId(newId);
    setShowAddSectionModal(false);
  };

  // Update Specific Section Setting
  const handleUpdateSectionSetting = (id: string, key: string, value: any) => {
    setTheme((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) => {
        if (sec.id === id) {
          return {
            ...sec,
            settings: {
              ...sec.settings,
              [key]: value,
            },
          };
        }
        return sec;
      }),
    }));
  };

  // Update Section Name
  const handleUpdateSectionName = (id: string, name: string) => {
    setTheme((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.id === id ? { ...sec, name } : sec
      ),
    }));
  };

  // Update Global Theme Setting
  const handleUpdateGlobalSetting = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => {
    setTheme((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Save Draft (Local state + LocalStorage)
  const handleSaveDraft = () => {
    localStorage.setItem('chronova_theme_draft', JSON.stringify(theme));
    setDraftToast('Draft saved successfully to local cache!');
    setTimeout(() => setDraftToast(null), 3000);
  };

  // Publish (Writes to live storefront theme)
  const handlePublish = async () => {
    setIsPublishing(true);
    onUpdateTheme(theme);
    localStorage.setItem('chronova_theme_settings', JSON.stringify(theme));
    if (onSaveToCloud) {
      try {
        await onSaveToCloud();
      } catch (err) {
        // ignore cloud err
      }
    }
    setIsPublishing(false);
    setPublishToast('Theme published successfully to Live Storefront!');
    setTimeout(() => setPublishToast(null), 3500);
  };

  // Selected Section Object
  const selectedSection = theme.sections.find((s) => s.id === selectedSectionId);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0F172A] text-stone-100 font-sans antialiased select-none">
      {/* ============================================================ */}
      {/* TOP ACTION BAR: SHOPIFY THEME EDITOR HEADER                 */}
      {/* ============================================================ */}
      <header className="h-14 bg-[#0A192F] border-b border-stone-800 px-4 sm:px-6 flex items-center justify-between z-30 shrink-0 shadow-md">
        {/* Left: Brand & Return to Admin */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title="Return to Admin / Storefront"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Exit Editor</span>
          </button>
          
          <div className="h-4 w-px bg-stone-800" />

          <div className="flex items-center gap-2">
            <ManovaLogo variant="iconOnly" theme="dark" />
            <div className="hidden sm:block">
              <span className="text-xs font-bold tracking-wider uppercase text-amber-300 font-serif">
                MANOVA
              </span>
              <span className="text-[10px] text-stone-400 block -mt-0.5 font-mono">
                Shopify Theme Customizer
              </span>
            </div>
          </div>

          {/* Starter Theme Active Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-stone-800/80 rounded-full text-[11px] text-stone-300 border border-stone-700">
            <span className="text-stone-400">Theme:</span>
            <span className="font-semibold text-amber-300 capitalize">{theme.preset}</span>
          </div>
        </div>

        {/* Center: Device Viewport Toggle */}
        <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-0.5 shadow-inner">
          <button
            onClick={() => setDeviceViewport('desktop')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 text-xs font-medium transition-all cursor-pointer ${
              deviceViewport === 'desktop'
                ? 'bg-[#C5A059] text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-white'
            }`}
            title="Desktop View (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setDeviceViewport('tablet')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 text-xs font-medium transition-all cursor-pointer ${
              deviceViewport === 'tablet'
                ? 'bg-[#C5A059] text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-white'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDeviceViewport('mobile')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 text-xs font-medium transition-all cursor-pointer ${
              deviceViewport === 'mobile'
                ? 'bg-[#C5A059] text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-white'
            }`}
            title="Mobile View (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Save Draft, Fullscreen Preview, Publish */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Fullscreen Preview toggle */}
          <button
            onClick={() => setIsFullscreenPreview(!isFullscreenPreview)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
              isFullscreenPreview
                ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold'
                : 'bg-stone-900 border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
            title={isFullscreenPreview ? 'Exit Fullscreen' : 'Preview Storefront'}
          >
            {isFullscreenPreview ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isFullscreenPreview ? 'Edit Mode' : 'Preview'}</span>
          </button>

          {/* Save Draft Button */}
          <button
            onClick={handleSaveDraft}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline">Save Draft</span>
          </button>

          {/* Publish Primary Button */}
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-4 py-1.5 bg-[#C5A059] hover:bg-[#b59049] text-stone-950 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-md hover:shadow-amber-500/20 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isPublishing ? (
              <span>Publishing...</span>
            ) : (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-stone-950" />
                <span>Publish</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Floating Notifications / Toasts */}
      {draftToast && (
        <div className="fixed top-16 right-6 z-50 bg-stone-800 text-white border border-stone-600 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-bounce">
          <Check className="w-4 h-4 text-amber-400" />
          <span>{draftToast}</span>
        </div>
      )}

      {publishToast && (
        <div className="fixed top-16 right-6 z-50 bg-emerald-900 text-white border border-emerald-500 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-medium">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <div>
            <div className="font-bold text-white">Live Storefront Updated</div>
            <div className="text-emerald-200 text-[11px]">{publishToast}</div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3-PANEL WORKSPACE CONTAINER                                 */}
      {/* ============================================================ */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* ------------------------------------------------------------ */}
        {/* 1. LEFT PANEL: HOMEPAGE SECTIONS LIST & REORDERING          */}
        {/* ------------------------------------------------------------ */}
        {!isFullscreenPreview && (
          <aside className="w-72 lg:w-80 bg-[#0A192F] border-r border-stone-800 flex flex-col shrink-0 z-20 overflow-hidden shadow-xl">
            {/* Left Panel Tabs */}
            <div className="flex border-b border-stone-800 text-xs font-medium bg-stone-950/60">
              <button
                onClick={() => setLeftTab('sections')}
                className={`flex-1 py-3 px-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  leftTab === 'sections'
                    ? 'border-amber-400 text-amber-400 bg-stone-900/40 font-bold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Layout className="w-3.5 h-3.5" />
                <span>Sections ({theme.sections.length})</span>
              </button>
              <button
                onClick={() => {
                  setLeftTab('global');
                  setSelectedSectionId(null);
                }}
                className={`flex-1 py-3 px-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  leftTab === 'global'
                    ? 'border-amber-400 text-amber-400 bg-stone-900/40 font-bold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Global Styles</span>
              </button>
            </div>

            {/* Left Panel Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {leftTab === 'sections' ? (
                <>
                  {/* Starter Themes Quick Switcher */}
                  <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 font-mono">
                        Starter Themes
                      </span>
                      <span className="text-[10px] text-amber-400">3 Presets</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['minimal', 'fashion', 'modern'] as ThemePreset[]).map((preset) => (
                        <button
                          key={preset}
                          onClick={() => handleSelectPreset(preset)}
                          className={`py-2 px-1.5 text-[11px] font-medium rounded-lg uppercase tracking-wider transition-all cursor-pointer text-center ${
                            theme.preset === preset
                              ? 'bg-[#C5A059] text-stone-950 font-bold shadow'
                              : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                          }`}
                        >
                          {preset === 'minimal' ? 'Minimal' : preset === 'fashion' ? 'Fashion' : 'Modern'}
                        </button>
                      ))}
                    </div>
                    {theme.preset === 'minimal' && (
                      <p className="text-[10px] text-stone-400 mt-2 italic">
                        ✓ Exact match to reference: cream canvas, navy buttons &amp; serif elegance.
                      </p>
                    )}
                  </div>

                  {/* Section List Header */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-mono font-bold">
                      Homepage Sections
                    </span>
                    <span className="text-[10px] text-stone-500">Drag or reorder</span>
                  </div>

                  {/* Sections List */}
                  <div className="space-y-2">
                    {theme.sections.map((section, idx) => {
                      const isSelected = selectedSectionId === section.id;
                      return (
                        <div
                          key={section.id}
                          draggable
                          onDragStart={() => handleDragStart(idx)}
                          onDragOver={(e) => handleDragOver(e, idx)}
                          onDragEnd={handleDragEnd}
                          onClick={() => setSelectedSectionId(section.id)}
                          className={`group flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-950/40 border-amber-400/80 shadow-md ring-1 ring-amber-400/50'
                              : section.enabled
                              ? 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
                              : 'bg-stone-900/30 border-stone-800/40 opacity-50'
                          }`}
                        >
                          {/* Drag Handle & Section Name */}
                          <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-1">
                            <span className="text-stone-500 text-xs select-none">⋮⋮</span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className={`text-xs font-medium truncate ${
                                  isSelected ? 'text-amber-300 font-bold' : 'text-stone-200'
                                }`}>
                                  {section.name}
                                </span>
                              </div>
                              <span className="text-[10px] text-stone-500 font-mono block uppercase">
                                {section.type}
                              </span>
                            </div>
                          </div>

                          {/* Quick Controls: Move Up, Move Down, Visibility, Delete */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveSection(idx, 'up');
                              }}
                              disabled={idx === 0}
                              className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white rounded disabled:opacity-20 cursor-pointer"
                              title="Move Up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveSection(idx, 'down');
                              }}
                              disabled={idx === theme.sections.length - 1}
                              className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white rounded disabled:opacity-20 cursor-pointer"
                              title="Move Down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleToggleSectionVisibility(section.id, e)}
                              className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white rounded cursor-pointer"
                              title={section.enabled ? 'Hide Section' : 'Show Section'}
                            >
                              {section.enabled ? (
                                <Eye className="w-3.5 h-3.5 text-stone-300" />
                              ) : (
                                <EyeOff className="w-3.5 h-3.5 text-stone-600" />
                              )}
                            </button>
                            <button
                              onClick={(e) => handleDeleteSection(section.id, e)}
                              className="p-1 hover:bg-rose-900/50 text-stone-500 hover:text-rose-400 rounded cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Delete Section"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Section Button */}
                  <button
                    onClick={() => setShowAddSectionModal(true)}
                    className="w-full py-3 px-4 rounded-xl border border-dashed border-amber-500/50 hover:border-amber-400 bg-amber-950/20 hover:bg-amber-950/40 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Section</span>
                  </button>
                </>
              ) : (
                /* GLOBAL THEME SETTINGS TAB */
                <div className="space-y-5">
                  <div className="bg-stone-900 border border-stone-800 rounded-xl p-3">
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-2 font-mono">
                      Starter Theme Archetype
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['minimal', 'fashion', 'modern'] as ThemePreset[]).map((p) => (
                        <button
                          key={p}
                          onClick={() => handleSelectPreset(p)}
                          className={`py-2 px-1 text-[11px] font-medium rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                            theme.preset === p
                              ? 'bg-[#C5A059] text-stone-950 font-bold shadow'
                              : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brand Colors */}
                  <div className="space-y-3">
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-mono font-bold block">
                      Brand Color Palette
                    </span>

                    {/* Primary Button Color */}
                    <div>
                      <label className="block text-xs text-stone-300 mb-1">Primary Button / Accent</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={theme.primaryColor}
                          onChange={(e) => handleUpdateGlobalSetting('primaryColor', e.target.value)}
                          className="w-8 h-8 rounded border border-stone-700 bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          value={theme.primaryColor}
                          onChange={(e) => handleUpdateGlobalSetting('primaryColor', e.target.value)}
                          className="flex-1 px-3 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-xs font-mono text-stone-200"
                        />
                      </div>
                    </div>

                    {/* Canvas Background Color */}
                    <div>
                      <label className="block text-xs text-stone-300 mb-1">Canvas Background</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={theme.backgroundColor}
                          onChange={(e) => handleUpdateGlobalSetting('backgroundColor', e.target.value)}
                          className="w-8 h-8 rounded border border-stone-700 bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          value={theme.backgroundColor}
                          onChange={(e) => handleUpdateGlobalSetting('backgroundColor', e.target.value)}
                          className="flex-1 px-3 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-xs font-mono text-stone-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Typography Font Family */}
                  <div className="space-y-2">
                    <label className="block text-xs text-stone-300 font-medium">Typography Pairing</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['serif', 'sans', 'display'] as TypographyPreset[]).map((font) => (
                        <button
                          key={font}
                          onClick={() => handleUpdateGlobalSetting('fontFamily', font)}
                          className={`py-2 px-2 rounded-lg text-xs capitalize transition-all cursor-pointer ${
                            theme.fontFamily === font
                              ? 'bg-amber-400 text-stone-950 font-bold'
                              : 'bg-stone-900 text-stone-300 border border-stone-800'
                          }`}
                        >
                          {font === 'serif' ? 'Cormorant' : font === 'sans' ? 'Plus Jakarta' : 'Cinzel'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Button Corner Radius */}
                  <div className="space-y-2">
                    <label className="block text-xs text-stone-300 font-medium">Button Corner Style</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['pill', 'soft', 'sharp'] as ButtonStyle[]).map((bStyle) => (
                        <button
                          key={bStyle}
                          onClick={() => handleUpdateGlobalSetting('buttonStyle', bStyle)}
                          className={`py-2 px-2 rounded-lg text-xs capitalize transition-all cursor-pointer ${
                            theme.buttonStyle === bStyle
                              ? 'bg-amber-400 text-stone-950 font-bold'
                              : 'bg-stone-900 text-stone-300 border border-stone-800'
                          }`}
                        >
                          {bStyle === 'pill' ? 'Pill (Round)' : bStyle === 'soft' ? 'Soft (8px)' : 'Sharp (0px)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Announcement Bar */}
                  <div className="space-y-2 pt-2 border-t border-stone-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-300">Top Announcement Bar</span>
                      <input
                        type="checkbox"
                        checked={theme.showAnnouncement}
                        onChange={(e) => handleUpdateGlobalSetting('showAnnouncement', e.target.checked)}
                        className="w-4 h-4 accent-amber-400 cursor-pointer"
                      />
                    </div>
                    {theme.showAnnouncement && (
                      <textarea
                        rows={2}
                        value={theme.announcementText}
                        onChange={(e) => handleUpdateGlobalSetting('announcementText', e.target.value)}
                        className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 2. CENTER PANEL: LIVE STOREFRONT PREVIEW                    */}
        {/* ------------------------------------------------------------ */}
        <main className="flex-1 flex flex-col bg-stone-950 overflow-hidden relative">
          {/* Viewport Meta Bar */}
          <div className="h-9 bg-stone-900/90 border-b border-stone-800/80 px-4 flex items-center justify-between text-xs text-stone-400 shrink-0 select-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-stone-300">
                Live Storefront Preview • {deviceViewport === 'desktop' ? '100% Fluid Desktop' : deviceViewport === 'tablet' ? '768px iPad / Tablet' : '390px iPhone / Mobile'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="hidden sm:inline text-stone-500">
                Click any section in the preview to edit its settings
              </span>
            </div>
          </div>

          {/* Scrollable Stage */}
          <div className="flex-1 overflow-y-auto flex justify-center p-2 sm:p-4 bg-stone-950/90">
            <div 
              className={`transition-all duration-300 relative flex flex-col ${
                deviceViewport === 'desktop'
                  ? 'w-full shadow-lg'
                  : deviceViewport === 'tablet'
                  ? 'w-[768px] my-4 rounded-[28px] shadow-2xl border-[8px] border-stone-800 overflow-y-auto max-h-[88vh] bg-white'
                  : 'w-[390px] my-4 rounded-[42px] shadow-2xl border-[10px] border-stone-900 overflow-y-auto max-h-[88vh] bg-white'
              }`}
              style={{ backgroundColor: theme.backgroundColor || '#FAF8F5' }}
            >
              {/* Phone Speaker Notch (Mobile only) */}
              {deviceViewport === 'mobile' && (
                <div className="sticky top-0 z-40 bg-stone-900 w-32 h-4 mx-auto rounded-b-xl flex items-center justify-center">
                  <div className="w-10 h-1 bg-stone-700 rounded-full" />
                </div>
              )}

              {/* Announcement Bar */}
              {theme.showAnnouncement && (
                <div 
                  className="py-2 px-4 text-center text-[11px] sm:text-xs font-medium tracking-wide transition-colors"
                  style={{
                    backgroundColor: theme.primaryColor || '#0A192F',
                    color: '#FAF8F5'
                  }}
                >
                  {theme.announcementText}
                </div>
              )}

              {/* Storefront Minimal Header */}
              <div className="border-b border-stone-200/80 bg-white/95 backdrop-blur px-6 py-4 flex items-center justify-between shrink-0">
                <ManovaLogo variant="screenshotMatch" theme="light" />
                <div className="hidden sm:flex items-center gap-6 text-xs text-stone-700 font-medium tracking-widest uppercase">
                  <span>Home</span>
                  <span>Collections</span>
                  <span>Craftsmanship</span>
                  <span>Journal</span>
                  <span>Contact</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-800">
                  <span className="font-semibold text-amber-800">৳ BDT</span>
                  <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center">
                    🛒
                  </div>
                </div>
              </div>

              {/* Live Sections List */}
              <div className="flex-1 flex flex-col">
                {theme.sections
                  .filter((sec) => sec.enabled)
                  .map((section) => {
                    const isSelected = selectedSectionId === section.id;
                    return (
                      <div
                        key={section.id}
                        id={section.id}
                        onClick={() => setSelectedSectionId(section.id)}
                        className={`relative group transition-all cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-amber-400 ring-offset-2 z-10'
                            : 'hover:ring-1 hover:ring-amber-400/60'
                        }`}
                      >
                        {/* Hover & Active Badge */}
                        <div className={`absolute top-3 left-3 z-30 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all shadow-md ${
                          isSelected
                            ? 'bg-amber-400 text-stone-950 opacity-100'
                            : 'bg-stone-900/80 text-white opacity-0 group-hover:opacity-100 backdrop-blur'
                        }`}>
                          {isSelected ? `Editing: ${section.name}` : `Click to Edit: ${section.name}`}
                        </div>

                        {/* Render Section Component */}
                        {(() => {
                          switch (section.type) {
                            case 'hero':
                              return (
                                <HeroSection
                                  section={section}
                                  primaryColor={theme.primaryColor}
                                  backgroundColor={section.settings.backgroundColor || theme.backgroundColor}
                                  accentColor={theme.accentColor}
                                  buttonStyle={theme.buttonStyle}
                                  fontFamily={theme.fontFamily}
                                  onExploreClick={() => {}}
                                />
                              );
                            case 'signature':
                              return (
                                <SignaturePiecesSection
                                  section={section}
                                  products={products}
                                  primaryColor={theme.primaryColor}
                                  buttonStyle={theme.buttonStyle}
                                  fontFamily={theme.fontFamily}
                                  onSelectProduct={(p) => onSelectProduct?.(p)}
                                  onAddToCart={(p) => onAddToCart?.(p)}
                                  onShopAllClick={() => {}}
                                />
                              );
                            case 'featured':
                              return (
                                <FeaturedWatchesSection
                                  section={section}
                                  products={products}
                                  primaryColor={theme.primaryColor}
                                  buttonStyle={theme.buttonStyle}
                                  fontFamily={theme.fontFamily}
                                  onSelectProduct={(p) => onSelectProduct?.(p)}
                                  onAddToCart={(p) => onAddToCart?.(p)}
                                  onViewAllClick={() => {}}
                                />
                              );
                            case 'collections':
                              return (
                                <CollectionGrid
                                  products={products}
                                  primaryColor={theme.primaryColor}
                                  buttonStyle={theme.buttonStyle}
                                  fontFamily={theme.fontFamily}
                                  onSelectProduct={(p) => onSelectProduct?.(p)}
                                  onAddToCart={(p) => onAddToCart?.(p)}
                                />
                              );
                            case 'imageText':
                              return (
                                <ImageTextSection
                                  section={section}
                                  primaryColor={theme.primaryColor}
                                  buttonStyle={theme.buttonStyle}
                                  fontFamily={theme.fontFamily}
                                  onButtonClick={() => {}}
                                />
                              );
                            case 'craftsmanship':
                              return (
                                <CraftsmanshipSection
                                  section={section}
                                  fontFamily={theme.fontFamily}
                                  primaryColor={theme.primaryColor}
                                  buttonStyle={theme.buttonStyle}
                                  onExploreClick={() => {}}
                                />
                              );
                            case 'promoBanner':
                            case 'chronosBanner':
                              return (
                                <PromoBannerSection
                                  section={section}
                                  primaryColor={theme.primaryColor}
                                  buttonStyle={theme.buttonStyle}
                                  fontFamily={theme.fontFamily}
                                  onButtonClick={() => {}}
                                />
                              );
                            case 'testimonials':
                              return (
                                <TestimonialsSection
                                  section={section}
                                  fontFamily={theme.fontFamily}
                                />
                              );
                            case 'newsletter':
                              return (
                                <NewsletterSection
                                  section={section}
                                  fontFamily={theme.fontFamily}
                                  primaryColor={theme.primaryColor}
                                  buttonStyle={theme.buttonStyle}
                                />
                              );
                            case 'footer':
                              return (
                                <FooterSection
                                  fontFamily={theme.fontFamily}
                                  onNavigate={() => {}}
                                />
                              );
                            default:
                              return null;
                          }
                        })()}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </main>

        {/* ------------------------------------------------------------ */}
        {/* 3. RIGHT PANEL: SECTION SETTINGS (OR GLOBAL SETTINGS)        */}
        {/* ------------------------------------------------------------ */}
        {!isFullscreenPreview && (
          <aside className="w-80 lg:w-96 bg-[#0A192F] border-l border-stone-800 flex flex-col shrink-0 z-20 overflow-hidden shadow-xl">
            {selectedSection ? (
              /* SECTION SETTINGS FORM */
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Section Header */}
                <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white tracking-wide">
                        {selectedSection.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 font-bold">
                        {selectedSection.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-0.5">Customize section layout &amp; copy</p>
                  </div>

                  <button
                    onClick={() => setSelectedSectionId(null)}
                    className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                    title="Deselect section"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Form Fields */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {/* Section Display Name */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={selectedSection.name}
                      onChange={(e) => handleUpdateSectionName(selectedSection.id, e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* 1. HEADING & TEXT */}
                  <div className="space-y-3 pt-2 border-t border-stone-800">
                    <span className="text-[11px] uppercase tracking-wider text-amber-400 font-mono font-bold block">
                      Headings &amp; Text Content
                    </span>

                    {/* Headline */}
                    {selectedSection.settings.headline !== undefined && (
                      <div>
                        <label className="block text-xs text-stone-300 mb-1">Headline Text</label>
                        <input
                          type="text"
                          value={selectedSection.settings.headline || ''}
                          onChange={(e) =>
                            handleUpdateSectionSetting(selectedSection.id, 'headline', e.target.value)
                          }
                          className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    )}

                    {/* Subheadline */}
                    {selectedSection.settings.subheadline !== undefined && (
                      <div>
                        <label className="block text-xs text-stone-300 mb-1">Subheadline / Paragraph</label>
                        <textarea
                          rows={3}
                          value={selectedSection.settings.subheadline || ''}
                          onChange={(e) =>
                            handleUpdateSectionSetting(selectedSection.id, 'subheadline', e.target.value)
                          }
                          className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 leading-relaxed"
                        />
                      </div>
                    )}

                    {/* Badge / Eyebrow Text */}
                    {selectedSection.settings.badgeText !== undefined && (
                      <div>
                        <label className="block text-xs text-stone-300 mb-1">Eyebrow Badge Text</label>
                        <input
                          type="text"
                          value={selectedSection.settings.badgeText || ''}
                          onChange={(e) =>
                            handleUpdateSectionSetting(selectedSection.id, 'badgeText', e.target.value)
                          }
                          placeholder="e.g. THE CHRONOVA STANDARD"
                          className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    )}

                    {/* Text Alignment */}
                    {selectedSection.settings.alignment !== undefined && (
                      <div>
                        <label className="block text-xs text-stone-300 mb-1">Alignment</label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {(['left', 'center', 'right'] as const).map((align) => (
                            <button
                              key={align}
                              onClick={() => handleUpdateSectionSetting(selectedSection.id, 'alignment', align)}
                              className={`py-1.5 text-xs capitalize rounded-lg transition-colors cursor-pointer ${
                                selectedSection.settings.alignment === align
                                  ? 'bg-amber-400 text-stone-950 font-bold'
                                  : 'bg-stone-900 text-stone-300 border border-stone-800'
                              }`}
                            >
                              {align}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2. IMAGES & PHOTOGRAPHY */}
                  {selectedSection.settings.imageUrl !== undefined && (
                    <div className="space-y-3 pt-2 border-t border-stone-800">
                      <span className="text-[11px] uppercase tracking-wider text-amber-400 font-mono font-bold block">
                        Watch Photography &amp; Imagery
                      </span>

                      <div>
                        <label className="block text-xs text-stone-300 mb-1">Image URL</label>
                        <input
                          type="text"
                          value={selectedSection.settings.imageUrl || ''}
                          onChange={(e) =>
                            handleUpdateSectionSetting(selectedSection.id, 'imageUrl', e.target.value)
                          }
                          className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                        />
                      </div>

                      {/* Curated Luxury Photo Presets (1-Click change) */}
                      <div>
                        <span className="text-[11px] text-stone-400 block mb-2">
                          One-Click Luxury Watch Photos:
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {LUXURY_IMAGE_PRESETS.map((preset, pIdx) => (
                            <div
                              key={pIdx}
                              onClick={() =>
                                handleUpdateSectionSetting(selectedSection.id, 'imageUrl', preset.url)
                              }
                              className="group relative rounded-lg overflow-hidden border border-stone-700 hover:border-amber-400 cursor-pointer aspect-square"
                              title={preset.name}
                            >
                              <img
                                src={preset.url}
                                alt={preset.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              {selectedSection.settings.imageUrl === preset.url && (
                                <div className="absolute inset-0 bg-amber-400/40 flex items-center justify-center">
                                  <Check className="w-4 h-4 text-stone-950" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. BUTTONS & NAVIGATION */}
                  {(selectedSection.settings.buttonText !== undefined || selectedSection.settings.secondaryButtonText !== undefined) && (
                    <div className="space-y-3 pt-2 border-t border-stone-800">
                      <span className="text-[11px] uppercase tracking-wider text-amber-400 font-mono font-bold block">
                        Buttons &amp; Call to Action
                      </span>

                      {/* Primary Button */}
                      {selectedSection.settings.buttonText !== undefined && (
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs text-stone-300 mb-1">Primary Button Text</label>
                            <input
                              type="text"
                              value={selectedSection.settings.buttonText || ''}
                              onChange={(e) =>
                                handleUpdateSectionSetting(selectedSection.id, 'buttonText', e.target.value)
                              }
                              className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-stone-300 mb-1">Primary Button Link</label>
                            <input
                              type="text"
                              value={selectedSection.settings.buttonLink || '#collections'}
                              onChange={(e) =>
                                handleUpdateSectionSetting(selectedSection.id, 'buttonLink', e.target.value)
                              }
                              placeholder="#collections, #shop, /contact"
                              className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                            />
                          </div>
                        </div>
                      )}

                      {/* Secondary Button */}
                      {selectedSection.settings.secondaryButtonText !== undefined && (
                        <div className="space-y-2 pt-2 border-t border-stone-800/60">
                          <div>
                            <label className="block text-xs text-stone-300 mb-1">Secondary Button Text</label>
                            <input
                              type="text"
                              value={selectedSection.settings.secondaryButtonText || ''}
                              onChange={(e) =>
                                handleUpdateSectionSetting(selectedSection.id, 'secondaryButtonText', e.target.value)
                              }
                              className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-stone-300 mb-1">Secondary Button Link</label>
                            <input
                              type="text"
                              value={selectedSection.settings.secondaryButtonLink || '#craftsmanship'}
                              onChange={(e) =>
                                handleUpdateSectionSetting(selectedSection.id, 'secondaryButtonLink', e.target.value)
                              }
                              className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 4. SECTION SPECIFIC LAYOUT & COLORS */}
                  <div className="space-y-3 pt-2 border-t border-stone-800">
                    <span className="text-[11px] uppercase tracking-wider text-amber-400 font-mono font-bold block">
                      Section Appearance
                    </span>

                    {/* Image Orientation (for imageText) */}
                    {selectedSection.type === 'imageText' && (
                      <div>
                        <label className="block text-xs text-stone-300 mb-1">Layout Placement</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleUpdateSectionSetting(selectedSection.id, 'layout', 'imageLeft')}
                            className={`py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                              selectedSection.settings.layout === 'imageLeft'
                                ? 'bg-amber-400 text-stone-950 font-bold'
                                : 'bg-stone-900 text-stone-300 border border-stone-800'
                            }`}
                          >
                            Image on Left
                          </button>
                          <button
                            onClick={() => handleUpdateSectionSetting(selectedSection.id, 'layout', 'imageRight')}
                            className={`py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                              selectedSection.settings.layout === 'imageRight' || !selectedSection.settings.layout
                                ? 'bg-amber-400 text-stone-950 font-bold'
                                : 'bg-stone-900 text-stone-300 border border-stone-800'
                            }`}
                          >
                            Image on Right
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Section Background Color */}
                    <div>
                      <label className="block text-xs text-stone-300 mb-1">Section Background</label>
                      <div className="grid grid-cols-4 gap-1.5 mb-2">
                        {[
                          { label: 'Cream', color: '#FAF8F5' },
                          { label: 'White', color: '#FFFFFF' },
                          { label: 'Navy', color: '#0A192F' },
                          { label: 'Midnight', color: '#060F1D' },
                        ].map((swatch) => (
                          <button
                            key={swatch.color}
                            onClick={() =>
                              handleUpdateSectionSetting(selectedSection.id, 'backgroundColor', swatch.color)
                            }
                            className={`py-1 px-1 rounded text-[11px] border text-center transition-all cursor-pointer ${
                              selectedSection.settings.backgroundColor === swatch.color
                                ? 'border-amber-400 text-amber-300 font-bold'
                                : 'border-stone-700 text-stone-300'
                            }`}
                            style={{ backgroundColor: swatch.color === '#FFFFFF' || swatch.color === '#FAF8F5' ? '#1E293B' : swatch.color }}
                          >
                            {swatch.label}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={selectedSection.settings.backgroundColor || '#FAF8F5'}
                          onChange={(e) =>
                            handleUpdateSectionSetting(selectedSection.id, 'backgroundColor', e.target.value)
                          }
                          className="w-8 h-8 rounded border border-stone-700 bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          value={selectedSection.settings.backgroundColor || ''}
                          onChange={(e) =>
                            handleUpdateSectionSetting(selectedSection.id, 'backgroundColor', e.target.value)
                          }
                          placeholder="e.g. #FAF8F5"
                          className="flex-1 px-3 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-xs font-mono text-stone-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 5. DANGER ZONE / ACTIONS */}
                  <div className="pt-4 border-t border-stone-800 space-y-2">
                    <button
                      onClick={() => handleToggleSectionVisibility(selectedSection.id)}
                      className="w-full py-2 px-3 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded-lg text-xs flex items-center justify-center gap-2 border border-stone-800 transition-colors cursor-pointer"
                    >
                      {selectedSection.enabled ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{selectedSection.enabled ? 'Hide from Storefront' : 'Unhide on Storefront'}</span>
                    </button>

                    <button
                      onClick={() => handleDeleteSection(selectedSection.id)}
                      className="w-full py-2 px-3 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 rounded-lg text-xs flex items-center justify-center gap-2 border border-rose-900/50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                      <span>Delete Section</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* NO SECTION SELECTED: SHOW GLOBAL STYLES */
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                <div className="pb-3 border-b border-stone-800">
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Theme &amp; Typography Settings
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Configure global colors, font hierarchies, and starter presets
                  </p>
                </div>

                {/* 3 Starter Themes */}
                <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3.5 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-mono block">
                    Starter Theme Archetypes
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['minimal', 'fashion', 'modern'] as ThemePreset[]).map((preset) => (
                      <button
                        key={preset}
                        onClick={() => handleSelectPreset(preset)}
                        className={`py-2 px-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer text-center ${
                          theme.preset === preset
                            ? 'bg-[#C5A059] text-stone-950 shadow-md font-bold'
                            : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed pt-1">
                    {theme.preset === 'minimal'
                      ? 'Minimal: Warm sand canvas (#FAF8F5), midnight navy buttons (#0A192F), and Cormorant serif typography.'
                      : theme.preset === 'fashion'
                      ? 'Fashion: Obsidian contrast, sharp corners, and deep burgundy runway accents.'
                      : 'Modern: Titanium aerospace styling, crisp cool canvas, and electric sapphire details.'}
                  </p>
                </div>

                {/* Global Colors */}
                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-mono font-bold block">
                    Storefront Palette
                  </span>

                  <div>
                    <label className="block text-xs text-stone-300 mb-1">Primary Button Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.primaryColor}
                        onChange={(e) => handleUpdateGlobalSetting('primaryColor', e.target.value)}
                        className="w-8 h-8 rounded border border-stone-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.primaryColor}
                        onChange={(e) => handleUpdateGlobalSetting('primaryColor', e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-xs font-mono text-stone-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 mb-1">Storefront Background Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.backgroundColor}
                        onChange={(e) => handleUpdateGlobalSetting('backgroundColor', e.target.value)}
                        className="w-8 h-8 rounded border border-stone-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.backgroundColor}
                        onChange={(e) => handleUpdateGlobalSetting('backgroundColor', e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-xs font-mono text-stone-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 mb-1">Accent Gold / Bronze</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.accentColor}
                        onChange={(e) => handleUpdateGlobalSetting('accentColor', e.target.value)}
                        className="w-8 h-8 rounded border border-stone-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.accentColor}
                        onChange={(e) => handleUpdateGlobalSetting('accentColor', e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-xs font-mono text-stone-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Typography Hierarchy */}
                <div className="space-y-2 pt-2 border-t border-stone-800">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-mono font-bold block">
                    Typography Pairing
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['serif', 'sans', 'display'] as TypographyPreset[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => handleUpdateGlobalSetting('fontFamily', f)}
                        className={`py-2 px-2 rounded-lg text-xs capitalize transition-all cursor-pointer ${
                          theme.fontFamily === f
                            ? 'bg-[#C5A059] text-stone-950 font-bold shadow'
                            : 'bg-stone-900 text-stone-300 border border-stone-800'
                        }`}
                      >
                        {f === 'serif' ? 'Serif' : f === 'sans' ? 'Sans-Serif' : 'Display'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Button Style */}
                <div className="space-y-2 pt-2 border-t border-stone-800">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-mono font-bold block">
                    Button Corners
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['pill', 'soft', 'sharp'] as ButtonStyle[]).map((b) => (
                      <button
                        key={b}
                        onClick={() => handleUpdateGlobalSetting('buttonStyle', b)}
                        className={`py-2 px-2 rounded-lg text-xs capitalize transition-all cursor-pointer ${
                          theme.buttonStyle === b
                            ? 'bg-[#C5A059] text-stone-950 font-bold shadow'
                            : 'bg-stone-900 text-stone-300 border border-stone-800'
                        }`}
                      >
                        {b === 'pill' ? 'Pill' : b === 'soft' ? 'Soft' : 'Sharp'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* ============================================================ */}
      {/* MODAL: ADD HOMEPAGE SECTION                                  */}
      {/* ============================================================ */}
      {showAddSectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0A192F] border border-stone-700 text-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-amber-300">
                  Add Homepage Section
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Choose a section template to insert into your storefront layout
                </p>
              </div>
              <button
                onClick={() => setShowAddSectionModal(false)}
                className="p-1 text-stone-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {SECTION_TEMPLATES.map((tpl) => (
                <div
                  key={tpl.type}
                  onClick={() => handleAddSection(tpl)}
                  className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-amber-400/80 hover:bg-amber-950/20 transition-all cursor-pointer flex flex-col justify-between group text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-stone-200 group-hover:text-amber-300 transition-colors">
                        {tpl.name}
                      </span>
                      <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-stone-800 text-stone-400">
                        {tpl.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      {tpl.description}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Insert Section</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-800">
              <button
                onClick={() => setShowAddSectionModal(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-xs rounded-lg text-stone-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
