import { ThemeSettings } from '../types';
import { 
  MANOVA_PRODUCTS, 
  MANOVA_ORDERS, 
  MANOVA_CUSTOMERS, 
  MANOVA_COUPONS,
  MANOVA_CATEGORIES,
  MANOVA_INCOMPLETE_ORDERS,
  MANOVA_ALT_TEXT_ITEMS,
  MANOVA_REVIEWS,
  MANOVA_TRANSACTIONS,
  MANOVA_AUDIT_LOGS,
  MANOVA_STORE_SETTINGS
} from './manovaData';

export const INITIAL_PRODUCTS = MANOVA_PRODUCTS;

export const THEME_PRESETS: Record<string, ThemeSettings> = {
  minimal: {
    preset: 'minimal',
    primaryColor: '#0A192F',
    backgroundColor: '#FAF8F5',
    accentColor: '#C5A059',
    textColor: '#1A1A1A',
    fontFamily: 'serif',
    buttonStyle: 'pill',
    showAnnouncement: true,
    announcementText: 'Complimentary Insured Courier across Bangladesh • 24h Inside Dhaka • 5-Year MANOVA Warranty',
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        name: 'Hero',
        enabled: true,
        settings: {
          headline: 'Designed to Endure',
          subheadline: 'Inspired by modern simplicity and crafted with unmatched detail. Our timepieces balance innovation and tradition to create a lasting impression.',
          buttonText: 'View Collections',
          buttonLink: '#collections',
          secondaryButtonText: 'Explore Craftsmanship',
          secondaryButtonLink: '#craftsmanship',
          imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
          alignment: 'left',
          badgeText: 'MANOVA Atelier • Bangladesh Series 01'
        }
      },
      {
        id: 'sec-signature',
        type: 'signature',
        name: 'Featured Products',
        enabled: true,
        settings: {
          headline: 'Signature Pieces',
          subheadline: 'Selected from our definitive collection, these watches define craftsmanship and elegance for the modern wrist.',
          buttonText: 'Discover More'
        }
      },
      {
        id: 'sec-collections',
        type: 'collections',
        name: 'Collection Grid',
        enabled: true,
        settings: {
          headline: 'Explore Collections',
          subheadline: 'Curated horological series designed for distinguished occasions and everyday balance.'
        }
      },
      {
        id: 'sec-image-text',
        type: 'imageText',
        name: 'Image + Text',
        enabled: true,
        settings: {
          headline: 'Engineered with Precision & Passion',
          subheadline: 'Every MANOVA timepiece is hand-assembled with surgical-grade 316L stainless steel, anti-reflective double sapphire crystal, and high-beat calibres engineered for lasting precision.',
          buttonText: 'Read Our Story',
          buttonLink: '#craftsmanship',
          imageUrl: 'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=1200&q=85',
          layout: 'imageLeft'
        }
      },
      {
        id: 'sec-craftsmanship',
        type: 'craftsmanship',
        name: 'Craftsmanship',
        enabled: true,
        settings: {
          headline: 'The Art of Watchmaking',
          subheadline: 'Every MANOVA timepiece undergoes 240 hours of rigorous acoustic calibration, hydro-pressure testing, and hand-finishing before leaving our atelier.',
          badgeText: 'THE MANOVA STANDARD'
        }
      },
      {
        id: 'sec-promo',
        type: 'promoBanner',
        name: 'Promo Banner',
        enabled: true,
        settings: {
          headline: 'Complimentary Insured Courier & ৳ 2,000 Privilege Voucher',
          subheadline: 'Enter code MANOVA2000 at checkout on any order over ৳ 30,000. Includes insured expedited courier delivery across Bangladesh.',
          buttonText: 'Claim Offer',
          buttonLink: '#shop'
        }
      },
      {
        id: 'sec-chronos',
        type: 'chronosBanner',
        name: 'MANOVA Watermark Banner',
        enabled: true,
        settings: {
          headline: 'MANOVA MANOVA'
        }
      },
      {
        id: 'sec-testimonials',
        type: 'testimonials',
        name: 'Testimonials',
        enabled: true,
        settings: {
          headline: 'Words of Distinction',
          subheadline: 'What distinguished Bangladeshi collectors say about MANOVA timepieces.'
        }
      },
      {
        id: 'sec-newsletter',
        type: 'newsletter',
        name: 'Newsletter',
        enabled: true,
        settings: {
          headline: 'Join The MANOVA Circle',
          subheadline: 'Be the first to receive atelier dispatches, private salon invitations, and limited edition allocations.',
          buttonText: 'Join Circle'
        }
      },
      {
        id: 'sec-footer',
        type: 'footer',
        name: 'Footer',
        enabled: true,
        settings: {
          headline: 'MANOVA Atelier Horology',
          subheadline: 'Plot 21, Road 71, Gulshan-2, Dhaka-1212'
        }
      }
    ]
  },
  fashion: {
    preset: 'fashion',
    primaryColor: '#1C1917',
    backgroundColor: '#FFFFFF',
    accentColor: '#991B1B',
    textColor: '#0C0A09',
    fontFamily: 'serif',
    buttonStyle: 'sharp',
    showAnnouncement: true,
    announcementText: 'New Dhaka Autumn Atelier Edition • VIP In-Store Appointments in Gulshan-2',
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        name: 'Hero',
        enabled: true,
        settings: {
          headline: 'Haute Horlogerie for the Modern Connoisseur',
          subheadline: 'Bold architectural silhouettes paired with ancestral calibres. The definitive statement on the contemporary wrist.',
          buttonText: 'Explore Autumn Haute Line',
          buttonLink: '#shop',
          imageUrl: 'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=1200&q=85',
          badgeText: 'PARIS • DHAKA COUTURE'
        }
      },
      {
        id: 'sec-signature',
        type: 'signature',
        name: 'Featured Products',
        enabled: true,
        settings: {
          headline: 'The Haute Selection',
          subheadline: 'Curated limited releases crafted for high-society gala evenings and executive occasions.',
          buttonText: 'View All Runway Models'
        }
      },
      {
        id: 'sec-collections',
        type: 'collections',
        name: 'Collection Grid',
        enabled: true,
        settings: {
          headline: 'Seasonal Lookbook',
          subheadline: 'Explore our avant-garde leather pairings and ceramic bezels.'
        }
      },
      {
        id: 'sec-image-text',
        type: 'imageText',
        name: 'Image + Text',
        enabled: true,
        settings: {
          headline: 'Architectural Silhouettes, Pure Metallurgy',
          subheadline: 'Every bevel is mirrored by hand. Every link is calibrated to drape effortlessly across the wrist.',
          buttonText: 'Read The Atelier Editorial',
          imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85',
          layout: 'imageLeft'
        }
      },
      {
        id: 'sec-craftsmanship',
        type: 'craftsmanship',
        name: 'Craftsmanship',
        enabled: true,
        settings: {
          headline: 'Haute Finissage',
          subheadline: 'Côtes de Genève striping, perlage on the baseplate, and mirror-polished screws.'
        }
      },
      {
        id: 'sec-promo',
        type: 'promoBanner',
        name: 'Promo Banner',
        enabled: true,
        settings: {
          headline: 'Seasonal Runway Privilege',
          subheadline: 'Complimentary custom monogramming on all leather straps this month.'
        }
      },
      {
        id: 'sec-newsletter',
        type: 'newsletter',
        name: 'Newsletter',
        enabled: true,
        settings: {
          headline: 'Maison MANOVA Private Access',
          subheadline: 'Invitations to seasonal gala viewings at our Gulshan-2 private lounge.',
          buttonText: 'Request Invitation'
        }
      },
      {
        id: 'sec-footer',
        type: 'footer',
        name: 'Footer',
        enabled: true,
        settings: {
          headline: 'Maison MANOVA',
          subheadline: 'Gulshan-2, Dhaka • Geneva'
        }
      }
    ]
  },
  modern: {
    preset: 'modern',
    primaryColor: '#0F172A',
    backgroundColor: '#F8FAFC',
    accentColor: '#2563EB',
    textColor: '#020617',
    fontFamily: 'sans',
    buttonStyle: 'soft',
    showAnnouncement: true,
    announcementText: 'Precision Engineering Redefined • Ceramic & Grade 5 Titanium Series Available Now',
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        name: 'Hero',
        enabled: true,
        settings: {
          headline: 'Instruments of Pure Accuracy',
          subheadline: 'Aerospace-grade titanium, 300m hydro-seals, and anti-magnetic silicon escapements.',
          buttonText: 'Explore Tool Watches',
          buttonLink: '#shop',
          imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=85',
          badgeText: 'TECHNICAL SERIES 2026'
        }
      },
      {
        id: 'sec-signature',
        type: 'signature',
        name: 'Featured Products',
        enabled: true,
        settings: {
          headline: 'High-Performance Lineup',
          subheadline: 'Engineered for diving, aeronautics, and split-second chronograph measurement.',
          buttonText: 'All Technical Watches'
        }
      },
      {
        id: 'sec-collections',
        type: 'collections',
        name: 'Collection Grid',
        enabled: true,
        settings: {
          headline: 'Technical Disciplines',
          subheadline: 'Diving, Aviation, and Racing Calibres.'
        }
      },
      {
        id: 'sec-image-text',
        type: 'imageText',
        name: 'Image + Text',
        enabled: true,
        settings: {
          headline: 'Ultra-Light Titanium. 300M Depth.',
          subheadline: 'Tested in oceanic conditions and thermal variations from -20°C to +60°C.',
          buttonText: 'Engineering Spec Sheet',
          imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
          layout: 'imageRight'
        }
      },
      {
        id: 'sec-craftsmanship',
        type: 'craftsmanship',
        name: 'Craftsmanship',
        enabled: true,
        settings: {
          headline: 'Acoustic & Vibration Testing',
          subheadline: 'Calibrated to +2/-2 seconds per day with digital strobe lasers.'
        }
      },
      {
        id: 'sec-newsletter',
        type: 'newsletter',
        name: 'Newsletter',
        enabled: true,
        settings: {
          headline: 'Join Pro Horology Community',
          subheadline: 'Early telemetry access, calibre updates, and invitations to Dhaka collector summits.',
          buttonText: 'Register'
        }
      },
      {
        id: 'sec-footer',
        type: 'footer',
        name: 'Footer',
        enabled: true,
        settings: {
          headline: 'MANOVA Bangladesh Lab',
          subheadline: 'Gulshan-2, Dhaka'
        }
      }
    ]
  }
};

export const DEFAULT_THEME: ThemeSettings = THEME_PRESETS.minimal;

export const INITIAL_ORDERS = MANOVA_ORDERS;
export const INITIAL_CUSTOMERS = MANOVA_CUSTOMERS;
export const INITIAL_DISCOUNTS = MANOVA_COUPONS;

export {
  MANOVA_CATEGORIES,
  MANOVA_INCOMPLETE_ORDERS,
  MANOVA_ALT_TEXT_ITEMS,
  MANOVA_REVIEWS,
  MANOVA_TRANSACTIONS,
  MANOVA_AUDIT_LOGS,
  MANOVA_STORE_SETTINGS
};

export const BANGLADESH_DISTRICTS = [
  'Dhaka',
  'Chattogram',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
  'Cumilla',
  'Gazipur',
  'Narayanganj',
  'Bogura',
  'Cox’s Bazar',
  'Feni',
  'Noakhali',
  'Jessore',
  'Pabna',
  'Dinajpur',
  'Tangail',
  'Kushtia'
];
