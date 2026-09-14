import React, { useState } from 'react';
import { ButtonStyle, TypographyPreset } from '../../types';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  primaryColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: TypographyPreset;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  primaryColor,
  buttonStyle,
  fontFamily,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'consultation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-stone-900 pb-24">
      {/* Header Banner */}
      <div className="bg-[#FAF7F2] border-b border-stone-200/80 py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-stone-500 mb-2 block">
            CHRONOVA CONCIERGE &amp; ATELIER
          </span>
          <h1 className={`${fontClass} text-4xl sm:text-5xl font-normal text-stone-900 mb-4`}>
            Atelier Consultation &amp; Inquiries
          </h1>
          <p className="text-stone-600 text-base font-sans-luxury max-w-xl mx-auto font-light leading-relaxed">
            Whether booking a private viewing at our Gulshan atelier or requesting bespoke caseback engraving, our concierge is at your service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Atelier Info Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-6">
              <h2 className={`${fontClass} text-2xl font-normal text-stone-900 border-b border-stone-100 pb-4`}>
                Gulshan-2 Flagship Maison
              </h2>

              <div className="space-y-4 text-xs text-stone-600">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 text-sm mb-0.5 font-medium">Dhaka Flagship Atelier</strong>
                    <p>Level 4, Plot 21, Road 71, Gulshan-2, Dhaka-1212, Bangladesh</p>
                    <p className="text-stone-400 mt-0.5">Private valet parking available</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 text-sm mb-0.5 font-medium">Direct Concierge Hotline</strong>
                    <p className="font-mono text-stone-800">+880 1711-892341 / +880 2-9883401</p>
                    <p className="text-stone-400 mt-0.5">Available on WhatsApp &amp; Signal</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 text-sm mb-0.5 font-medium">Confidential Inquiries</strong>
                    <p className="font-mono text-stone-800">concierge@chronovawatches.com.bd</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 text-sm mb-0.5 font-medium">Atelier Visiting Hours</strong>
                    <p>Saturday – Thursday: 10:30 AM – 8:30 PM</p>
                    <p className="text-amber-800 font-medium">Friday: Reserved for Private VIP Allocations</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200/80 rounded-xl text-xs text-stone-600 space-y-1">
                <div className="flex items-center gap-1.5 text-stone-900 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Complimentary Servicing &amp; Fitting</span>
                </div>
                <p className="font-light">
                  Complimentary strap resizing, ultrasonic case cleansing, and amplitude diagnostics are provided to all CHRONOVA patrons at our Dhaka salon.
                </p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200/90 shadow-sm text-left">
              <h2 className={`${fontClass} text-2xl font-normal text-stone-900 mb-2`}>
                Schedule a Consultation
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-light mb-6">
                Fill out your details below and our Chief Horologist will reach out within 4 business hours.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900">Inquiry Received</h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto font-light">
                    Thank you, {formData.name}. Our Gulshan concierge has received your request and will contact you at {formData.phone || formData.email}.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-semibold uppercase tracking-wider text-stone-900 underline cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Mahbub Al-Hassan"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Mobile Contact *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+880 17XXXXXXXX"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="mahbub@example.com"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Inquiry Nature
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
                      >
                        <option value="consultation">Private Atelier Consultation (Gulshan-2)</option>
                        <option value="corporate">Corporate &amp; Executive Gifting</option>
                        <option value="bespoke">Bespoke Engraving &amp; Personalization</option>
                        <option value="warranty">Warranty &amp; Calibre Servicing</option>
                        <option value="allocation">Limited Edition Waitlist Allocation</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Your Message / Specific Calibre of Interest
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please share which timepiece or service you are inquiring about..."
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`${buttonRadiusClass} w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer`}
                    style={{ backgroundColor: primaryColor || '#0A192F' }}
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Message to Atelier</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
