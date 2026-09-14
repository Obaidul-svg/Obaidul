import React from 'react';
import { ManovaLogo } from '../ManovaLogo';
import { TypographyPreset, ActiveView } from '../../types';
import { ShieldCheck, Truck, RefreshCw, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

interface FooterSectionProps {
  fontFamily: TypographyPreset;
  onNavigate: (view: ActiveView) => void;
  onOpenPrompt?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onNavigate,
  onOpenPrompt,
}) => {
  return (
    <footer className="bg-[#081426] text-stone-300 font-sans-luxury border-t border-stone-800">
      {/* Value props bar */}
      <div className="border-b border-stone-800/80 py-10 bg-[#060F1D]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-300 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Insured Courier Across BD</h4>
              <p className="text-xs text-stone-400 mt-0.5">৳120 Dhaka (24h) • ৳200 Outside Dhaka</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">5-Year MANOVA Warranty</h4>
              <p className="text-xs text-stone-400 mt-0.5">Free lifetime servicing at Dhaka Atelier</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-300 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Cash on Delivery &amp; Inspection</h4>
              <p className="text-xs text-stone-400 mt-0.5">Inspect parcel before courier payment</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-300 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">bKash &amp; Nagad Instant Pay</h4>
              <p className="text-xs text-stone-400 mt-0.5">Automated SMS &amp; courier tracking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <ManovaLogo variant="screenshotMatch" theme="dark" showTagline={true} />
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm font-light leading-relaxed">
              MANOVA is Bangladesh's premier horological brand. We balance modern simplicity, precision engineering, and timeless style to create lasting mechanical confidence on the wrist.
            </p>

            <div className="space-y-1.5 pt-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Gulshan-2 Flagship Atelier: Level 5, Concord Baksh Tower, Dhaka-1212</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>VIP Concierge: +880 1711-892341 (Saturday – Thursday)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>concierge@manovawatches.com.bd</span>
              </div>
            </div>
          </div>

          {/* Timepieces Navigation */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white font-mono">Pages</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Shop All Watches
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collections')} className="hover:text-white transition-colors cursor-pointer">
                  Collections
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('craftsmanship')} className="hover:text-white transition-colors cursor-pointer">
                  Craftsmanship
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-white transition-colors cursor-pointer">
                  Horology Journal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Payment & Delivery in Bangladesh */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white font-mono">Bangladesh Delivery</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><span className="text-white">Inside Dhaka:</span> ৳80 (24–48h)</li>
              <li><span className="text-white">Outside Dhaka:</span> ৳130 (48–72h)</li>
              <li className="pt-2 text-white font-medium">Accepted Payments:</li>
              <li className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 bg-stone-800 rounded text-[10px] text-stone-200">Cash on Delivery</span>
                <span className="px-2 py-0.5 bg-pink-900/60 text-pink-300 rounded text-[10px] font-semibold">bKash</span>
                <span className="px-2 py-0.5 bg-orange-900/60 text-orange-300 rounded text-[10px] font-semibold">Nagad</span>
                <span className="px-2 py-0.5 bg-blue-900/60 text-blue-300 rounded text-[10px]">Visa / Master</span>
              </li>
            </ul>
          </div>

          {/* Merchant & Customizer Tools */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-amber-300 font-mono">Merchant &amp; Theme</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => onNavigate('customizer')}
                  className="hover:text-amber-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🎨 Theme Customizer</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('admin')}
                  className="hover:text-amber-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span>⚡ Merchant Admin Portal</span>
                </button>
              </li>
              {onOpenPrompt && (
                <li>
                  <button 
                    onClick={onOpenPrompt}
                    className="hover:text-amber-300 transition-colors text-left flex items-center gap-1.5 font-medium text-amber-200 cursor-pointer"
                  >
                    <span>📋 AI Studio Prompt</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 mt-10 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} MANOVA Horology Bangladesh. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="cursor-pointer hover:text-stone-300" onClick={() => onNavigate('contact')}>Gulshan Atelier</span>
            <span className="cursor-pointer hover:text-stone-300" onClick={() => onNavigate('shop')}>Curated Vault</span>
            <span className="cursor-pointer hover:text-stone-300">5-Year Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
