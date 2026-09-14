import React, { useState } from 'react';
import { ManovaLogo } from '../ManovaLogo';
import { ActiveView, CartItem, ThemeSettings } from '../../types';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  Heart,
  Sliders, 
  LayoutDashboard, 
  Sparkles,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { User } from 'firebase/auth';

interface NavbarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  cartItems: CartItem[];
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist?: () => void;
  themeSettings: ThemeSettings;
  currentUser?: User | null;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  cartItems,
  wishlistCount = 0,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  themeSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: 'Home', view: 'home' as ActiveView },
    { label: 'All Watches', view: 'shop' as ActiveView },
    { label: 'Collections', view: 'collections' as ActiveView },
    { label: 'Craftsmanship', view: 'craftsmanship' as ActiveView },
    { label: 'Journal', view: 'journal' as ActiveView },
    { label: 'Contact', view: 'contact' as ActiveView },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Bangladesh Delivery & Warranty Bar */}
      {themeSettings.showAnnouncement && (
        <div 
          className="text-white text-[11px] font-medium py-1.5 px-4 text-center tracking-wider sm:tracking-widest uppercase transition-colors"
          style={{ backgroundColor: themeSettings.primaryColor || '#0A192F' }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-amber-300 shrink-0 animate-pulse" />
            <span className="truncate">{themeSettings.announcementText}</span>
          </div>
        </div>
      )}

      {/* Quick Mode Bar for Merchant Admin & Customizer */}
      <div className="bg-[#081426] text-stone-300 px-4 sm:px-8 py-1.5 text-[11px] flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
          <span className="text-[9.5px] uppercase font-bold tracking-wider text-amber-400 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-800/60 shrink-0">
            Dhaka Atelier
          </span>
          <button
            onClick={() => onNavigate('home')}
            className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
              activeView === 'home' || activeView === 'storefront' ? 'bg-white text-stone-900 font-semibold' : 'text-stone-300 hover:text-white'
            }`}
          >
            Storefront
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
              activeView === 'shop' ? 'bg-white text-stone-900 font-semibold' : 'text-stone-300 hover:text-white'
            }`}
          >
            All Watches
          </button>
          <button
            onClick={() => onNavigate('customizer')}
            className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeView === 'customizer' ? 'bg-amber-400 text-stone-950 font-bold' : 'text-stone-300 hover:text-white'
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span>Theme Customizer</span>
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeView === 'admin' ? 'bg-white text-stone-900 font-semibold' : 'text-stone-300 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Merchant Admin</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-stone-400">
          <div className="flex items-center gap-1 text-[11px]">
            <Phone className="w-3 h-3 text-amber-400" />
            <span>+880 1711-892341 (Gulshan Concierge)</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Official 5-Yr Warranty</span>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar matching reference image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div onClick={() => onNavigate('home')} className="cursor-pointer">
          <ManovaLogo variant="screenshotMatch" />
        </div>

        {/* Center: Editorial Links */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((link) => {
            const isActive = activeView === link.view || (link.view === 'home' && activeView === 'storefront');
            return (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-sm tracking-wider uppercase font-sans-luxury transition-colors cursor-pointer relative py-1 ${
                  isActive ? 'text-stone-950 font-semibold' : 'text-stone-600 hover:text-stone-950 font-light'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-stone-900" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions (Search, Wishlist, Cart, Mobile Menu) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            id="nav-search-btn"
            onClick={onOpenSearch}
            className="p-2 text-stone-700 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-100 cursor-pointer"
            aria-label="Search Timepieces"
            title="Search Watches"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => {
              if (onOpenWishlist) onOpenWishlist();
              else onNavigate('shop');
            }}
            className="relative p-2 text-stone-700 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-100 cursor-pointer"
            aria-label="Saved Watches"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag */}
          <button
            id="nav-cart-btn"
            onClick={onOpenCart}
            className="relative p-2 text-stone-700 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-100 cursor-pointer"
            aria-label="Shopping Cart"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#0A192F] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-950 cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-stone-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.view);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="block w-full text-left py-2.5 text-base font-medium text-stone-800 hover:text-amber-800 border-b border-stone-100"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => { onNavigate('customizer'); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-4 bg-amber-50 text-amber-900 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer"
            >
              <span>Theme Customizer</span>
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-4 bg-stone-100 text-stone-900 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer"
            >
              <span>Merchant Admin Portal</span>
              <LayoutDashboard className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
