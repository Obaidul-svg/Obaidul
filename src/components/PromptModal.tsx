import React, { useState } from 'react';
import { Copy, Check, X, Sparkles, Terminal, FileText } from 'lucide-react';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BUILDER_READY_PROMPT = `# System & Implementation Blueprint: Shopify-Style Luxury E-Commerce & Theme Customizer (CHRONOVA Bangladesh)

Build a production-ready, Shopify-style luxury e-commerce web application with a live theme customizer, complete storefront pages, and merchant administration portal. Follow modern TypeScript, React, Tailwind CSS, and Firebase specifications.

## 1. Brand & Visual Philosophy (CHRONOVA — Luxury Watch Atelier Bangladesh)
- Aesthetic: Quiet luxury, haute horlogerie, editorial minimalism with generous negative space (65–75ch readability, 1.25+ scale).
- Target Market & Currency: Bangladesh (৳ BDT).
- Color Palette: Warm champagne/sand canvas (#F7F3EC), deep royal midnight navy (#0A192F), brushed gold accents (#C5A059), and surgical steel tones.
- Typography: High-contrast pairing of Cormorant Garamond / Playfair Display (Headings) with Plus Jakarta Sans (Body & UI labels).
- Exact Hero Replica: 
  - Headline: "Designed to Endure"
  - Subhead: "Inspired by modern simplicity and crafted with unmatched detail. Our timepieces balance innovation and tradition to create a lasting impression."
  - Primary CTA: "View Collections" (dark navy button)
  - Visual: High-definition rose-gold timepiece with deep navy dial and subtle mirror reflection.
- Signature Pieces Grid:
  - Heading: "Explore Our Signature Pieces"
  - Subhead: "From early mornings to late nights, our watches move with you: symbols of confidence, precision, and individuality."
  - 3 Framed Cards: Classic Elegance (৳ 42,500), Heritage Gold (৳ 48,000), Royal Chrono (৳ 54,000).
  - CTA: "Shop All Watches"

---

## 2. Core Functional Modules

### A. Customer Storefront
- Dynamic Announcement Bar: Customizable message with toggleable visibility.
- Navigation Header: Brand logo emblem (monogram "M" with centered timepiece dial), navigation links (Home, Collection, Craftsmanship, Journal, Contact), instant live search trigger, user account drawer, and sliding Cart Drawer with live badge count.
- Filterable Collections: Instant category filtering (All, Automatic, Chronograph, Heritage, Diver, Limited), price range slider, and sort by price/popularity.
- Product Quick View & Detailed Modal: High-resolution zoom gallery, technical specifications (Calibre, Case Diameter, Water Resistance, Crystal, Strap), real-time inventory counter, and "Add to Bag".
- Cart Drawer: Slide-over drawer with item quantity adjustments, free shipping progress bar, promo code applicator, and checkout button.
- Shopify-Style Checkout: Customer contact, shipping address, coupon verification, order breakdown, and instant order placement recording to database.

### B. Shopify-Style Live Theme Customizer
- Split Visual Customizer: Interactive sidebar with live viewport frame (Desktop, Tablet 768px, Mobile 375px).
- 3 Preset Starter Themes:
  1. Fashion (MANOVA Signature): Warm champagne, midnight navy, gold highlights, serif headings.
  2. Minimal: Clean alabaster white, stark charcoal typography, sharp architectural borders.
  3. Modern: Slate gray, brushed titanium, electric teal accents (#2A7B9B), geometric sans typography.
- Section Hierarchy & Live Reordering:
  - Drag / Up-Down reordering of homepage sections (Hero, Signature Grid, Craftsmanship Story, Collections, Chronos Watermark Banner, Testimonials, Newsletter).
  - Show/hide visibility toggle per section.
  - Live in-place content editor: edit headlines, body copy, CTA labels, button links, background colors, and imagery on the fly.
- Global Theme Controls: Color pickers (primary, background, accent), typography selector, button border radius (sharp, rounded, pill).
- Cloud Persistence: Instant "Save Theme" button writing to Firestore and localStorage.

### C. Merchant Admin Dashboard
- Products Management: Catalog table, quick stock editor, category selector, add new watch modal, and signature showcase toggle.
- Orders Management: Order stream with real-time status badges (Paid, Unfulfilled, Fulfilled), customer details, item breakdown, and fulfillment actions.
- Customer Directory: Lifetime spend, total orders, VIP tier badges (Silver, Gold, Platinum).
- Inventory Tracker: Stock monitoring with low-stock warnings (< 5 units) and quick restock counters.
- Discounts & Coupons: Create promotional codes (percentage or fixed amount), usage limits, minimum order values, and active toggles.

### D. Cloud Storage & Authentication (Firebase)
- Firebase Auth: Google Sign-In and guest account switching.
- Firestore Persistence: Collections for \`store_settings\`, \`products\`, \`orders\`, \`customers\`, and \`discounts\`.
- Security Rules: ABAC-compliant firestore.rules ensuring customer privacy and authenticated merchant write privileges.
- Mobile Responsiveness: 100% responsive grid layouts, touch-friendly 44px+ touch targets, and collapsible navigation for mobile viewports.
`;

export const PromptModal: React.FC<PromptModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(BUILDER_READY_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([BUILDER_READY_PROMPT], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'google-ai-studio-shopify-prompt.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white text-stone-900 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-amber-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-stone-900">
                Builder-Ready AI Studio Prompt
              </h2>
              <p className="text-xs text-stone-500">
                Ready to paste directly into Google AI Studio to build or replicate this app
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-prompt-top-btn"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#0A192F] hover:bg-[#132845] rounded-lg transition-colors shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied to Clipboard!' : 'Copy Prompt'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Prompt Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-stone-900 text-stone-100 font-mono text-xs leading-relaxed selection:bg-amber-400 selection:text-black">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-stone-400 font-sans text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Terminal className="w-4 h-4" /> Markdown Ready • Optimized for Gemini 2.5/Flash/Pro
            </span>
            <span>Character count: {BUILDER_READY_PROMPT.length}</span>
          </div>

          <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-stone-200 overflow-x-auto">
            {BUILDER_READY_PROMPT}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-3.5 border-t border-stone-200 bg-stone-50 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-stone-400" />
            <span>Includes 100% UI fidelity, theme customizer schema, and mobile-first responsiveness.</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="text-stone-600 hover:text-stone-900 underline font-medium cursor-pointer"
            >
              Download .md File
            </button>
            <button
              id="copy-prompt-bottom-btn"
              onClick={handleCopy}
              className="px-4 py-2 font-medium text-white bg-[#0A192F] hover:bg-[#142640] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
