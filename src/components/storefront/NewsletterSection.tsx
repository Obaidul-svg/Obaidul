import React, { useState } from 'react';
import { ThemeSection, TypographyPreset, ButtonStyle } from '../../types';
import { Mail, CheckCircle2 } from 'lucide-react';

interface NewsletterSectionProps {
  section: ThemeSection;
  fontFamily: TypographyPreset;
  primaryColor: string;
  buttonStyle: ButtonStyle;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  section,
  fontFamily,
  primaryColor,
  buttonStyle,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const {
    headline = 'Join The CHRONOVA Circle',
    subheadline = 'Receive private invitations to limited-edition allocations and a ৳ 2,000 acquisition credit on your inaugural timepiece.',
    buttonText = 'Claim Invitation'
  } = section.settings;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <section className="py-20 bg-[#F4EFEA] text-stone-900 border-b border-stone-200/60">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-amber-800">
          Private Collector Privileges
        </span>

        <h2 className={`${fontClass} text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900 mt-2 mb-4`}>
          {headline}
        </h2>

        <p className="text-stone-600 text-sm sm:text-base font-sans-luxury max-w-xl mx-auto mb-8 font-light">
          {subheadline}
        </p>

        {subscribed ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-xl inline-flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-left text-xs sm:text-sm">
              <p className="font-semibold">Welcome to the Private Circle.</p>
              <p className="text-emerald-700">Your exclusive ৳ 2,000 inaugural privilege code is: <span className="font-mono font-bold">DHAKA2000</span></p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <div className="relative w-full">
              <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your confidential email..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-stone-300 rounded-full text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className={`${buttonRadiusClass} w-full sm:w-auto whitespace-nowrap px-8 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white shadow-md hover:shadow-lg transition-all cursor-pointer`}
              style={{ backgroundColor: primaryColor || '#0A192F' }}
            >
              {buttonText}
            </button>
          </form>
        )}

        <p className="text-[11px] text-stone-400 mt-4 font-sans-luxury">
          We honor your discretion. No unsolicited communications.
        </p>
      </div>
    </section>
  );
};
