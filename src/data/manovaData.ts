import { 
  Product, 
  Category, 
  IncompleteOrder, 
  Review, 
  Transaction, 
  AuditLog, 
  StoreSettings, 
  Discount, 
  Customer, 
  Order, 
  AltTextRecord 
} from '../types';

export const MANOVA_PRODUCTS: Product[] = [
  {
    id: 'prod-classic-elegance',
    title: 'Classic Elegance',
    subtitle: 'Stainless steel with sapphire crystal',
    description: 'A tribute to understated mechanical balance. Featuring an ultra-slim 40mm surgical steel case, brushed champagne dial, and double-domed sapphire glass treated with dual-sided anti-reflective coating.',
    price: 32500,
    compareAtPrice: 36000,
    category: 'classic',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85'
    ],
    inventory: 16,
    sku: 'MAN-CLE-001',
    isPublished: true,
    isSignature: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 42,
    variants: [
      { id: 'v1', name: 'Brushed Steel Link', type: 'strap', inStock: true, sku: 'MAN-CLE-001-STL' },
      { id: 'v2', name: 'Black Tuscan Calfskin', type: 'strap', inStock: true, sku: 'MAN-CLE-001-BLK' },
      { id: 'v3', name: 'Cognac Saddle Leather', type: 'strap', inStock: true, sku: 'MAN-CLE-001-COG' }
    ],
    specs: {
      movement: 'Calibre MAN-820 Automatic (48h Reserve)',
      caseDiameter: '40mm',
      waterResistance: '100m / 10 ATM',
      crystal: 'Double Domed Sapphire with AR Coating',
      strap: '316L Stainless Steel / Genuine Leather',
      powerReserve: '48 Hours',
      lugWidth: '20mm'
    }
  },
  {
    id: 'prod-heritage-gold',
    title: 'Heritage Gold',
    subtitle: '18K Rose Gold finish with champagne Roman dial',
    description: 'Dressed in radiant warmth. Heritage Gold showcases an iconic Roman numeral champagne dial encased in a master-polished 18K gold-finished bezel, catching the ambient light from every angle.',
    price: 45000,
    compareAtPrice: 49500,
    category: 'heritage',
    image: 'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=1000&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1000&q=85'
    ],
    inventory: 9,
    sku: 'MAN-HER-002',
    isPublished: true,
    isSignature: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 28,
    variants: [
      { id: 'v1', name: 'President Gold Bracelet', type: 'strap', inStock: true, sku: 'MAN-HER-002-GLD' },
      { id: 'v2', name: 'Burgundy Croc-Embossed Leather', type: 'strap', inStock: true, sku: 'MAN-HER-002-BRG' }
    ],
    specs: {
      movement: 'Swiss Mechanical Regulated Calibre MAN-901',
      caseDiameter: '39mm',
      waterResistance: '50m / 5 ATM',
      crystal: 'High-scratch proof Sapphire Dome',
      strap: '18K Rose Gold Plated / Italian Alligator Grain',
      powerReserve: '42 Hours',
      lugWidth: '19mm'
    }
  },
  {
    id: 'prod-modern-chrono',
    title: 'Modern Chrono',
    subtitle: 'Tri-compax mechanical chronograph with ceramic tachymeter',
    description: 'High-speed precision for the modern connoisseur. Features sub-second split timing, a high-polish obsidian ceramic tachymeter bezel, and luminous index markers readable under midnight conditions.',
    price: 38900,
    compareAtPrice: 42000,
    category: 'chronograph',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85'
    ],
    inventory: 14,
    sku: 'MAN-CHR-003',
    isPublished: true,
    isSignature: false,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 36,
    variants: [
      { id: 'v1', name: 'Oyster Brushed Steel', type: 'strap', inStock: true, sku: 'MAN-CHR-003-OYS' },
      { id: 'v2', name: 'Perforated Racing Calfskin', type: 'strap', inStock: true, sku: 'MAN-CHR-003-RAC' }
    ],
    specs: {
      movement: 'Calibre MAN-Chrono 28,800 vph',
      caseDiameter: '41mm',
      waterResistance: '150m / 15 ATM',
      crystal: 'Triple AR-Coated Sapphire',
      strap: 'Brushed Steel / Racing Leather',
      powerReserve: '55 Hours',
      lugWidth: '21mm'
    }
  },
  {
    id: 'prod-midnight-automatic',
    title: 'Midnight Automatic',
    subtitle: 'Deep navy sunburst with rose gold indices',
    description: 'The flagship timepiece of the MANOVA collection. Engineered with an open exhibition caseback displaying the 21-jewel rotor, complemented by an opulent rose gold case and midnight ocean sunray dial.',
    price: 48000,
    compareAtPrice: 54000,
    category: 'automatic',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=85'
    ],
    inventory: 11,
    sku: 'MAN-AUT-004',
    isPublished: true,
    isSignature: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 59,
    variants: [
      { id: 'v1', name: 'Midnight Navy Croc Leather', type: 'strap', inStock: true, sku: 'MAN-AUT-004-NAV' },
      { id: 'v2', name: 'Rose Gold Jubilee Bracelet', type: 'strap', inStock: true, sku: 'MAN-AUT-004-ROSE' }
    ],
    specs: {
      movement: 'In-House Regulated Calibre MAN-Auto 72',
      caseDiameter: '40.5mm',
      waterResistance: '100m / 10 ATM',
      crystal: 'Scratch-Proof Curvature Sapphire',
      strap: 'Hand-Stitched Full Grain Leather',
      powerReserve: '72 Hours',
      lugWidth: '20mm'
    }
  },
  {
    id: 'prod-executive-steel',
    title: 'Executive Steel',
    subtitle: 'Monochrome slate dial with micro-brushed finish',
    description: 'Architectural minimalism tailored for the boardroom. Crisp baton hour markers, seamless integrated lug architecture, and a whisper-quiet high-beat automatic engine.',
    price: 29500,
    compareAtPrice: 33000,
    category: 'classic',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85'
    ],
    inventory: 22,
    sku: 'MAN-EXE-005',
    isPublished: true,
    isSignature: false,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 19,
    variants: [
      { id: 'v1', name: 'Solid Link Steel', type: 'strap', inStock: true, sku: 'MAN-EXE-005-STL' },
      { id: 'v2', name: 'Charcoal Matte Leather', type: 'strap', inStock: true, sku: 'MAN-EXE-005-CHR' }
    ],
    specs: {
      movement: 'Calibre MAN-Beat 21,600 vph',
      caseDiameter: '39.5mm',
      waterResistance: '50m / 5 ATM',
      crystal: 'Flat Sapphire with Beveled Edge',
      strap: 'Surgical 316L Stainless Steel',
      powerReserve: '40 Hours',
      lugWidth: '20mm'
    }
  },
  {
    id: 'prod-royal-heritage',
    title: 'Royal Heritage',
    subtitle: 'Fluted 18K bezel with Roman indices and Jubilee bracelet',
    description: 'A monument of horological sovereignty. Featuring a signature fluted bezel reflecting facets of light, date magnification cyclops, and a five-piece Jubilee link bracelet with hidden crown clasp.',
    price: 52000,
    compareAtPrice: 58000,
    category: 'heritage',
    image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1000&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=1000&q=85'
    ],
    inventory: 3,
    sku: 'MAN-ROY-006',
    isPublished: true,
    isSignature: false,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 31,
    variants: [
      { id: 'v1', name: 'Fluted Jubilee Link', type: 'strap', inStock: true, sku: 'MAN-ROY-006-JUB' },
      { id: 'v2', name: 'Royal Navy Suede', type: 'strap', inStock: true, sku: 'MAN-ROY-006-NVY' }
    ],
    specs: {
      movement: 'Chronometer Certified Calibre MAN-Master',
      caseDiameter: '41mm',
      waterResistance: '100m / 10 ATM',
      crystal: 'Sapphire with 2.5x Cyclops Lens',
      strap: 'Five-Piece Jubilee 18K Dual-Tone',
      powerReserve: '65 Hours',
      lugWidth: '20mm'
    }
  },
  {
    id: 'prod-urban-classic',
    title: 'Urban Classic',
    subtitle: 'Matte ivory dial with Bauhaus numerals and tan saddle strap',
    description: 'Effortless everyday distinction. Clean geometric typography, ultra-thin 7.8mm profile, and vegetable-tanned full grain calf leather handcrafted to develop a personal patina over time.',
    price: 26500,
    compareAtPrice: 30000,
    category: 'classic',
    image: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&w=1000&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85'
    ],
    inventory: 19,
    sku: 'MAN-URB-007',
    isPublished: true,
    isSignature: false,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 24,
    variants: [
      { id: 'v1', name: 'Tan Saddle Leather', type: 'strap', inStock: true, sku: 'MAN-URB-007-TAN' },
      { id: 'v2', name: 'Espresso Brown Leather', type: 'strap', inStock: true, sku: 'MAN-URB-007-ESP' }
    ],
    specs: {
      movement: 'Ultra-Slim Precision Calibre MAN-32',
      caseDiameter: '38mm',
      waterResistance: '30m / 3 ATM',
      crystal: 'Scratch-Proof Mineral Hardlex Sapphire',
      strap: 'Vegetable Tanned Tan Leather',
      powerReserve: '38 Hours',
      lugWidth: '18mm'
    }
  },
  {
    id: 'prod-signature-blue',
    title: 'Signature Blue',
    subtitle: 'Ceramic maritime diver with 300m hydro-resistance',
    description: 'Built for aquatic depth and refined coastal living. Features an ultra-tough titanium case, unidirectional ceramic diving ring with Super-LumiNova BGW9 markings, and helium escape valve.',
    price: 39900,
    compareAtPrice: 44000,
    category: 'diver',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1000&q=85'
    ],
    inventory: 4,
    sku: 'MAN-DIV-008',
    isPublished: true,
    isSignature: false,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 47,
    variants: [
      { id: 'v1', name: 'Grade 5 Titanium Link', type: 'strap', inStock: true, sku: 'MAN-DIV-008-TI' },
      { id: 'v2', name: 'Deep Sea FKM Rubber', type: 'strap', inStock: true, sku: 'MAN-DIV-008-RUB' }
    ],
    specs: {
      movement: 'Automatic High-Shock Calibre MAN-300D',
      caseDiameter: '42mm',
      waterResistance: '300m / 30 ATM',
      crystal: '4mm Thick Flat Sapphire Crystal',
      strap: 'Titanium Link + Waterproof FKM Rubber',
      powerReserve: '50 Hours',
      lugWidth: '22mm'
    }
  },
  {
    id: 'prod-prestige-black',
    title: 'Prestige Black',
    subtitle: 'Diamond-like carbon (DLC) coating with skeleton rotor',
    description: 'Stealth luxury executed with diamond-like carbon toughness. Matte jet-black case, smoked sapphire dial allowing glimpses into the escapement, and ultra-durable Kevlar-stitched hybrid strap.',
    price: 41500,
    compareAtPrice: 46000,
    category: 'automatic',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85'
    ],
    inventory: 7,
    sku: 'MAN-BLK-009',
    isPublished: true,
    isSignature: false,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 22,
    variants: [
      { id: 'v1', name: 'DLC Black Mesh Link', type: 'strap', inStock: true, sku: 'MAN-BLK-009-MSH' },
      { id: 'v2', name: 'Kevlar Matte Black Strap', type: 'strap', inStock: true, sku: 'MAN-BLK-009-KVL' }
    ],
    specs: {
      movement: 'Calibre MAN-Stealth 28,800 vph',
      caseDiameter: '41mm',
      waterResistance: '100m / 10 ATM',
      crystal: 'Smoked Anti-Glare Sapphire',
      strap: 'DLC Coated Steel / Reinforced Kevlar',
      powerReserve: '45 Hours',
      lugWidth: '20mm'
    }
  },
  {
    id: 'prod-classic-silver',
    title: 'Classic Silver',
    subtitle: 'Sunray silver dial with blued feuille steel hands',
    description: 'Subtle grandeur for black-tie gatherings and refined celebrations. Thermally blued feuille hour and minute hands glide over a guilloché finished silver dial.',
    price: 35000,
    compareAtPrice: 38500,
    category: 'classic',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85'
    ],
    inventory: 12,
    sku: 'MAN-SLV-010',
    isPublished: true,
    isSignature: false,
    isFeatured: false,
    rating: 4.8,
    reviewCount: 16,
    variants: [
      { id: 'v1', name: 'Fine Milanese Mesh', type: 'strap', inStock: true, sku: 'MAN-SLV-010-MIL' },
      { id: 'v2', name: 'Navy Full Grain Calfskin', type: 'strap', inStock: true, sku: 'MAN-SLV-010-NVY' }
    ],
    specs: {
      movement: 'Regulated Calibre MAN-Feuille 4Hz',
      caseDiameter: '39mm',
      waterResistance: '50m / 5 ATM',
      crystal: 'Cambered Sapphire Crystal with AR',
      strap: 'Hand-Polished Stainless Steel Mesh',
      powerReserve: '42 Hours',
      lugWidth: '19mm'
    }
  },
  // --- Trending Brand Additions: OLEVS, Arabic Watch, SABR, POEDAGAR ---
  {
    id: 'prod-olevs-automatic-tourbillon',
    title: 'OLEVS Skeleton Automatic Chrono',
    subtitle: 'রোমান ডায়াল, ট্যুরবিলিয়ন উইন্ডো ও প্রিমিয়াম স্টেইনলেস স্টিল',
    description: 'আন্তর্জাতিকভাবে সমাদৃত ওলেভস (OLEVS) এর অন্যতম বেস্টসেলার মডেল। রোমান নিউমেরাল, সান-মুন ফেজ ডিসপ্লে, ডাবল-লকিং বাটারফ্লাই বাকল এবং সম্পূর্ণ ওয়াটারপ্রুফ গ্লাস। যেকোনো উৎসব ও বিশেষ দিনে পরার জন্য সেরা পছন্দ।',
    price: 4850,
    compareAtPrice: 6500,
    category: 'olevs',
    brand: 'OLEVS',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85'
    ],
    inventory: 28,
    sku: 'OLEVS-6618-GLD',
    isPublished: true,
    isSignature: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 88,
    variants: [
      { id: 'v1', name: 'Two-Tone Gold Steel', type: 'strap', inStock: true, sku: 'OLEVS-6618-TTG' },
      { id: 'v2', name: 'Obsidian Black Dial', type: 'dial', inStock: true, sku: 'OLEVS-6618-BLK' },
      { id: 'v3', name: 'Deep Emerald Green', type: 'dial', inStock: true, sku: 'OLEVS-6618-GRN' }
    ],
    specs: {
      movement: 'Original High-Precision Automatic Mechanical Movement',
      caseDiameter: '41mm',
      waterResistance: '30m Life Waterproof (3 ATM)',
      crystal: 'Coated High Hardness Mineral Glass',
      strap: 'Stainless Steel Solid Bracelet',
      powerReserve: '36 Hours',
      lugWidth: '20mm'
    }
  },
  {
    id: 'prod-arabic-dial-heritage',
    title: 'Al-Bayan Arabic Dial Emerald Watch',
    subtitle: 'আভিজাত্যময় অরিজিনাল অ্যারাবিক নিউমেরালস ও ডিপ এমারেল্ড সানবার্স্ট ডায়াল',
    description: 'মধ্যপ্রাচ্যের ঐতিহ্য এবং আধুনিক বিলাসিতার অনুপম সমন্বয়। ঘড়ির ডায়ালে খাঁটি আরবি সংখ্যা (١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ١٠ ١١ ١٢), ফ্লুটেড বেজেল, ডাবল-কোটেড স্যাফায়ার গ্লাস এবং সাইক্লোপস ডেট লেন্স।',
    price: 6800,
    compareAtPrice: 8500,
    category: 'arabic',
    brand: 'Arabic Watch',
    image: 'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=1000&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85'
    ],
    inventory: 15,
    sku: 'ARB-EMR-001',
    isPublished: true,
    isSignature: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 64,
    variants: [
      { id: 'v1', name: 'Emerald Green + Gold', type: 'dial', inStock: true, sku: 'ARB-EMR-001-GLD' },
      { id: 'v2', name: 'Ice Blue + Silver Steel', type: 'dial', inStock: true, sku: 'ARB-ICE-001-SLV' }
    ],
    specs: {
      movement: 'Japanese Miyota Quartz Precision Movement',
      caseDiameter: '40mm',
      waterResistance: '50m Waterproof (5 ATM)',
      crystal: 'Scratch-Resistant Sapphire Crystal Glass',
      strap: '316L Jubilee Stainless Steel Solid Link',
      powerReserve: '3-Year Battery Life',
      lugWidth: '20mm'
    }
  },
  {
    id: 'prod-sabr-timepiece-dhikr',
    title: 'SABR (صبر) Luxury Calligraphy Watch',
    subtitle: 'ধৈর্য ও আত্মশুদ্ধির প্রতীক — মিনিমালিস্ট গোল্ড আরবি ক্যালিগ্রাফি',
    description: '“সবর” (صبر) — পবিত্র কুরআনের ধৈর্য ও সাফল্যের চিরন্তন বার্তা ধারণ করে তৈরি বিশেষ কালেকশন। ম্যাট ব্ল্যাক ডায়ালের ওপর চকচকে সোনারুপালী আরবি ক্যালিগ্রাফি এবং প্রিমিয়াম খাঁটি চামড়ার স্ট্র্যাপ।',
    price: 5200,
    compareAtPrice: 6900,
    category: 'sabr',
    brand: 'SABR',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85'
    ],
    inventory: 22,
    sku: 'SABR-CLG-001',
    isPublished: true,
    isSignature: true,
    isFeatured: true,
    rating: 4.95,
    reviewCount: 92,
    variants: [
      { id: 'v1', name: 'Midnight Black Leather', type: 'strap', inStock: true, sku: 'SABR-CLG-001-BLK' },
      { id: 'v2', name: 'Royal Gold Mesh Bracelet', type: 'strap', inStock: true, sku: 'SABR-CLG-001-GLD' }
    ],
    specs: {
      movement: 'Precision Japanese Quartz Movement',
      caseDiameter: '39mm Ultra-Slim',
      waterResistance: '30m Waterproof (3 ATM)',
      crystal: 'Hardlex Anti-Scratch Mineral Crystal',
      strap: 'Handmade Italian Calfskin Leather',
      powerReserve: '3-Year Battery Reserve',
      lugWidth: '20mm'
    }
  },
  {
    id: 'prod-poedagar-waterproof-luxury',
    title: 'POEDAGAR Luminous Business Chrono',
    subtitle: 'নাইট লুমিনাস পয়েন্টার, ট্রিপল সাব-ডায়াল এবং মিলিটারি গ্রেড ওয়াটারপ্রুফ',
    description: 'পোয়েডাগার (POEDAGAR) এর অন্যতম জনপ্রিয় লাক্সারি স্পোর্টস ও বিজনেস ওয়াচ। রাতে জ্বলজ্বলে লুমিনাস ডায়াল, স্টপওয়াচ ক্রোনোগ্রাফ, ডেট ডিসপ্লে এবং নিখুঁত এর্গোনমিক ফিনিশ যা প্রতিটি যুবকের ব্যক্তিত্বকে অনন্য করে তোলে।',
    price: 3950,
    compareAtPrice: 5200,
    category: 'poedagar',
    brand: 'POEDAGAR',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=85',
    additionalImages: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85'
    ],
    inventory: 35,
    sku: 'PDG-836-SLV',
    isPublished: true,
    isSignature: true,
    isFeatured: true,
    rating: 4.85,
    reviewCount: 79,
    variants: [
      { id: 'v1', name: 'Silver Blue Chrono', type: 'dial', inStock: true, sku: 'PDG-836-BLU' },
      { id: 'v2', name: 'Full Matte Black', type: 'dial', inStock: true, sku: 'PDG-836-BLK' },
      { id: 'v3', name: 'Rose Gold Brown Strap', type: 'strap', inStock: true, sku: 'PDG-836-BRN' }
    ],
    specs: {
      movement: 'Multi-Function Japanese Chronograph Quartz',
      caseDiameter: '42mm',
      waterResistance: '30m Waterproof (3 ATM)',
      crystal: 'Mineral Strengthened Glass',
      strap: 'Stainless Steel Strap with Hidden Clasp',
      powerReserve: 'Long Life Quartz Cell',
      lugWidth: '22mm'
    }
  }
];

export const MANOVA_CATEGORIES: Category[] = [
  {
    id: 'cat-classic',
    name: 'Classic Watches',
    nameBn: 'ক্ল্যাসিক ওয়াচ',
    slug: 'classic-watches',
    description: 'Timeless dials, refined proportions, and minimalist dress profiles for every occasion.',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    productCount: 4,
    status: 'active',
    order: 1
  },
  {
    id: 'cat-automatic',
    name: 'Automatic Watches',
    nameBn: 'অটোমেটিক ওয়াচ',
    slug: 'automatic-watches',
    description: 'Self-winding mechanical movements showcasing open exhibition casebacks and high-beat escapements.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    productCount: 3,
    status: 'active',
    order: 2
  },
  {
    id: 'cat-chronograph',
    name: 'Chronograph',
    nameBn: 'ক্রোনোগ্রাফ',
    slug: 'chronograph',
    description: 'Split-second precision timers with ceramic tachymeter bezels and tri-compax layouts.',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    productCount: 2,
    status: 'active',
    order: 3
  },
  {
    id: 'cat-heritage',
    name: 'Heritage & Gold',
    nameBn: 'হেরিটেজ ও গোল্ড',
    slug: 'heritage-gold',
    description: '18K rose gold and fluted bezels honoring the grand traditions of horology.',
    image: 'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=600&q=80',
    productCount: 2,
    status: 'active',
    order: 4
  },
  {
    id: 'cat-diver',
    name: 'Diver & Pro',
    nameBn: 'ডাইভার ও প্রো',
    slug: 'diver-watches',
    description: 'High hydro-resistance, Grade 5 titanium cases, and luminous dials for aquatic depth.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    productCount: 1,
    status: 'active',
    order: 5
  },
  {
    id: 'cat-limited',
    name: 'Limited Edition',
    nameBn: 'সীমিত সংস্করণ',
    slug: 'limited-edition',
    description: 'Numbered atelier pieces produced in batches of fewer than 50 units worldwide.',
    image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=600&q=80',
    productCount: 2,
    status: 'active',
    order: 6
  },
  {
    id: 'cat-olevs',
    name: 'OLEVS Watches',
    nameBn: 'ওলেভস ওয়াচ',
    slug: 'olevs',
    description: 'জনপ্রিয় রোমান ডায়াল, ট্যুরবিলিয়ন ও অটোমেটিক লাক্সারি স্টেইনলেস স্টিল ওয়াচ।',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
    productCount: 1,
    status: 'active',
    order: 7
  },
  {
    id: 'cat-arabic',
    name: 'Arabic Dial Watches',
    nameBn: 'অ্যারাবিক ডায়াল ওয়াচ',
    slug: 'arabic',
    description: 'খাঁটি আরবি সংখ্যা ও মিডল-ইস্টার্ন রাজকীয় লুকের প্রিমিয়াম ওয়াচ।',
    image: 'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=600&q=80',
    productCount: 1,
    status: 'active',
    order: 8
  },
  {
    id: 'cat-sabr',
    name: 'SABR (صبر) Timepieces',
    nameBn: 'সবর (صبر) ওয়াচ',
    slug: 'sabr',
    description: 'ধৈর্য ও আত্মশুদ্ধির চিরন্তন আরবি ক্যালিগ্রাফি সম্বলিত এক্সক্লুসিভ কালেকশন।',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    productCount: 1,
    status: 'active',
    order: 9
  },
  {
    id: 'cat-poedagar',
    name: 'POEDAGAR Watches',
    nameBn: 'পোয়েডাগার ওয়াচ',
    slug: 'poedagar',
    description: 'লুমিনাস স্পোর্টস ও বিজনেস ক্রোনোগ্রাফ ওয়াটারপ্রুফ ঘড়ি।',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    productCount: 1,
    status: 'active',
    order: 10
  }
];

export const MANOVA_INCOMPLETE_ORDERS: IncompleteOrder[] = [
  {
    id: 'inc-101',
    customerName: 'Shahriar Kabir',
    phone: '+880 1711-234567',
    email: 'shahriar.kabir@yahoo.com',
    district: 'Dhaka',
    cartValue: 48000,
    lastActivity: '12 mins ago',
    createdAt: '2026-09-13T17:40:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-midnight-automatic',
        title: 'Midnight Automatic',
        price: 48000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
        variant: 'Midnight Navy Croc Leather'
      }
    ]
  },
  {
    id: 'inc-102',
    customerName: 'Anika Tabassum',
    phone: '+880 1819-876543',
    email: 'anika.tabassum@gmail.com',
    district: 'Chattogram',
    cartValue: 32500,
    lastActivity: '45 mins ago',
    createdAt: '2026-09-13T17:05:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-classic-elegance',
        title: 'Classic Elegance',
        price: 32500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80',
        variant: 'Brushed Steel Link'
      }
    ]
  },
  {
    id: 'inc-103',
    customerName: 'Rashedul Huq',
    phone: '+880 1912-445566',
    email: 'rashed.huq@standardchartered.com',
    district: 'Dhaka (Banani)',
    cartValue: 83900,
    lastActivity: '1 hour ago',
    createdAt: '2026-09-13T16:50:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-heritage-gold',
        title: 'Heritage Gold',
        price: 45000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=400&q=80'
      },
      {
        productId: 'prod-modern-chrono',
        title: 'Modern Chrono',
        price: 38900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-104',
    customerName: 'Zayed Al Mansoor',
    phone: '+880 1678-112233',
    email: 'zayed.mansoor@gmail.com',
    district: 'Sylhet',
    cartValue: 39900,
    lastActivity: '2 hours ago',
    createdAt: '2026-09-13T15:30:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-signature-blue',
        title: 'Signature Blue',
        price: 39900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-105',
    customerName: 'Tasnim Ahmed',
    phone: '+880 1552-998877',
    email: 'tasnim.ahmed@dhakabank.com.bd',
    district: 'Dhaka',
    cartValue: 52000,
    lastActivity: '3 hours ago',
    createdAt: '2026-09-13T14:15:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-royal-heritage',
        title: 'Royal Heritage',
        price: 52000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-106',
    customerName: 'Mahmudur Rahman',
    phone: '+880 1722-334455',
    email: 'mahmud.r@gmail.com',
    district: 'Rajshahi',
    cartValue: 26500,
    lastActivity: '4 hours ago',
    createdAt: '2026-09-13T13:00:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-urban-classic',
        title: 'Urban Classic',
        price: 26500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-107',
    customerName: 'Fariha Siddiqua',
    phone: '+880 1817-556677',
    email: 'fariha.s@northsouth.edu',
    district: 'Dhaka (Uttara)',
    cartValue: 35000,
    lastActivity: '5 hours ago',
    createdAt: '2026-09-13T12:30:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-classic-silver',
        title: 'Classic Silver',
        price: 35000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-108',
    customerName: 'Khurram Jamil',
    phone: '+880 1915-667788',
    email: 'khurram.jamil@bengalgroup.com',
    district: 'Khulna',
    cartValue: 41500,
    lastActivity: '6 hours ago',
    createdAt: '2026-09-13T11:20:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-prestige-black',
        title: 'Prestige Black',
        price: 41500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-109',
    customerName: 'Sadia Afreen',
    phone: '+880 1675-889900',
    email: 'sadia.afreen@gmail.com',
    district: 'Dhaka',
    cartValue: 32500,
    lastActivity: '7 hours ago',
    createdAt: '2026-09-13T10:45:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-classic-elegance',
        title: 'Classic Elegance',
        price: 32500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-110',
    customerName: 'Naimul Islam',
    phone: '+880 1713-990011',
    email: 'naimul.islam@grameenphone.com',
    district: 'Dhaka (Baridhara)',
    cartValue: 45000,
    lastActivity: '8 hours ago',
    createdAt: '2026-09-13T09:10:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-heritage-gold',
        title: 'Heritage Gold',
        price: 45000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-111',
    customerName: 'Rumana Chowdhury',
    phone: '+880 1823-114477',
    email: 'rumana.chow@gmail.com',
    district: 'Sylhet',
    cartValue: 38900,
    lastActivity: '9 hours ago',
    createdAt: '2026-09-13T08:30:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-modern-chrono',
        title: 'Modern Chrono',
        price: 38900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-112',
    customerName: 'Imtiaz Ahmed',
    phone: '+880 1911-332211',
    email: 'imtiaz.a@outlook.com',
    district: 'Cumilla',
    cartValue: 48000,
    lastActivity: '11 hours ago',
    createdAt: '2026-09-13T06:15:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-midnight-automatic',
        title: 'Midnight Automatic',
        price: 48000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-113',
    customerName: 'Laila Arjumand',
    phone: '+880 1714-445588',
    email: 'laila.arju@yahoo.com',
    district: 'Dhaka',
    cartValue: 29500,
    lastActivity: '13 hours ago',
    createdAt: '2026-09-13T04:20:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-executive-steel',
        title: 'Executive Steel',
        price: 29500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-114',
    customerName: 'Tanveer Qureshi',
    phone: '+880 1671-558899',
    email: 'tanveer.q@gmail.com',
    district: 'Gazipur',
    cartValue: 52000,
    lastActivity: '15 hours ago',
    createdAt: '2026-09-13T02:10:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-royal-heritage',
        title: 'Royal Heritage',
        price: 52000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-115',
    customerName: 'Jannatul Ferdous',
    phone: '+880 1553-778899',
    email: 'jannat.ferdous@gmail.com',
    district: 'Mymensingh',
    cartValue: 26500,
    lastActivity: '18 hours ago',
    createdAt: '2026-09-12T23:45:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-urban-classic',
        title: 'Urban Classic',
        price: 26500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-116',
    customerName: 'Hasan Masud',
    phone: '+880 1818-990033',
    email: 'hasan.masud@transcombd.com',
    district: 'Dhaka',
    cartValue: 39900,
    lastActivity: '21 hours ago',
    createdAt: '2026-09-12T20:10:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-signature-blue',
        title: 'Signature Blue',
        price: 39900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-117',
    customerName: 'Sabrina Mostafa',
    phone: '+880 1916-224466',
    email: 'sabrina.m@gmail.com',
    district: 'Barishal',
    cartValue: 41500,
    lastActivity: '1 day ago',
    createdAt: '2026-09-12T17:30:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-prestige-black',
        title: 'Prestige Black',
        price: 41500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'inc-118',
    customerName: 'Wahidul Alam',
    phone: '+880 1715-778844',
    email: 'wahid.alam@citybank.com',
    district: 'Narayanganj',
    cartValue: 35000,
    lastActivity: '1 day ago',
    createdAt: '2026-09-12T15:00:00Z',
    converted: false,
    cartItems: [
      {
        productId: 'prod-classic-silver',
        title: 'Classic Silver',
        price: 35000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
];

export const MANOVA_ALT_TEXT_ITEMS: AltTextRecord[] = [
  {
    id: 'alt-1',
    productId: 'prod-classic-elegance',
    productTitle: 'Classic Elegance',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    currentAlt: 'MANOVA Classic Elegance ultra-slim surgical steel watch with sapphire crystal and brushed champagne dial',
    status: 'optimized',
    isPrimary: true
  },
  {
    id: 'alt-2',
    productId: 'prod-heritage-gold',
    productTitle: 'Heritage Gold',
    imageUrl: 'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=600&q=80',
    currentAlt: 'MANOVA Heritage Gold 18K rose gold luxury watch with Roman numeral dial and President bracelet',
    status: 'optimized',
    isPrimary: true
  },
  {
    id: 'alt-3',
    productId: 'prod-modern-chrono',
    productTitle: 'Modern Chrono',
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    currentAlt: 'MANOVA Modern Chrono high-precision mechanical chronograph with obsidian ceramic tachymeter bezel',
    status: 'optimized',
    isPrimary: true
  },
  {
    id: 'alt-4',
    productId: 'prod-midnight-automatic',
    productTitle: 'Midnight Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    currentAlt: 'MANOVA Midnight Automatic luxury watch with sunburst navy dial and open exhibition caseback',
    status: 'optimized',
    isPrimary: true
  },
  {
    id: 'alt-5',
    productId: 'prod-executive-steel',
    productTitle: 'Executive Steel',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
    currentAlt: 'MANOVA Executive Steel architectural dress watch with slate dial and 316L solid link bracelet',
    status: 'optimized',
    isPrimary: true
  },
  {
    id: 'alt-6',
    productId: 'prod-royal-heritage',
    productTitle: 'Royal Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=600&q=80',
    currentAlt: 'MANOVA Royal Heritage fluted bezel luxury watch with date cyclops and Jubilee bracelet',
    status: 'optimized',
    isPrimary: true
  },
  {
    id: 'alt-7',
    productId: 'prod-urban-classic',
    productTitle: 'Urban Classic',
    imageUrl: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&w=600&q=80',
    currentAlt: 'MANOVA Urban Classic minimal Bauhaus dial timepiece with vegetable-tanned tan leather strap',
    status: 'optimized',
    isPrimary: true
  },
  {
    id: 'alt-8',
    productId: 'prod-signature-blue',
    productTitle: 'Signature Blue',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    currentAlt: 'MANOVA Signature Blue 300m titanium maritime diving watch with ceramic bezel ring',
    status: 'optimized',
    isPrimary: true
  },
  {
    id: 'alt-9',
    productId: 'prod-prestige-black',
    productTitle: 'Prestige Black',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    currentAlt: 'MANOVA Prestige Black diamond-like carbon DLC matte sports watch with smoked sapphire dial',
    status: 'optimized',
    isPrimary: true
  },
  {
    id: 'alt-10',
    productId: 'prod-classic-silver',
    productTitle: 'Classic Silver',
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80',
    currentAlt: 'MANOVA Classic Silver sunray dial watch with blued steel feuille hands and Milanese mesh strap',
    status: 'optimized',
    isPrimary: true
  }
];

export const MANOVA_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-midnight-automatic',
    productTitle: 'Midnight Automatic',
    customerName: 'Dr. Faisal Ahmed',
    customerPhone: '+880 1711-239988',
    rating: 5,
    reviewText: 'Exceptional craftsmanship. The exhibition caseback allows viewing the movement rotor smoothly. Received within 24 hours in Gulshan with pristine presentation packaging.',
    date: '2026-09-11',
    status: 'Approved'
  },
  {
    id: 'rev-2',
    productId: 'prod-heritage-gold',
    productTitle: 'Heritage Gold',
    customerName: 'Tahsin Rahman',
    customerPhone: '+880 1819-445566',
    rating: 5,
    reviewText: 'The 18K rose gold finish is deep and warm. It rivals timepieces I purchased in Geneva for thrice the price. MANOVA is doing something truly historic in Bangladesh.',
    date: '2026-09-10',
    status: 'Approved'
  },
  {
    id: 'rev-3',
    productId: 'prod-modern-chrono',
    productTitle: 'Modern Chrono',
    customerName: 'Barrister Nabeel Chowdhury',
    customerPhone: '+880 1912-778899',
    rating: 5,
    reviewText: 'The ceramic bezel click and tachymeter legibility are spotless. Used bKash instant payment, received courier inspection before confirmation. Brilliant service.',
    date: '2026-09-09',
    status: 'Approved'
  },
  {
    id: 'rev-4',
    productId: 'prod-classic-elegance',
    productTitle: 'Classic Elegance',
    customerName: 'Samira Anam',
    customerPhone: '+880 1678-223344',
    rating: 5,
    reviewText: 'Understated luxury. The double-domed sapphire crystal gives it an antique glow. Extremely comfortable on the wrist throughout long meetings.',
    date: '2026-09-08',
    status: 'Approved'
  },
  {
    id: 'rev-5',
    productId: 'prod-signature-blue',
    productTitle: 'Signature Blue',
    customerName: 'Capt. Zakiul Islam',
    customerPhone: '+880 1723-665544',
    rating: 5,
    reviewText: 'Superb titanium finish and water resistance. I wear it swimming at the Club without a second thought. The Super-LumiNova markers stay bright all night.',
    date: '2026-09-06',
    status: 'Approved'
  },
  {
    id: 'rev-6',
    productId: 'prod-royal-heritage',
    productTitle: 'Royal Heritage',
    customerName: 'Adnan Siddique',
    customerPhone: '+880 1552-114422',
    rating: 5,
    reviewText: 'The fluted bezel captures banquet light like nothing else. Arrived with warranty certificate stamped by MANOVA Dhaka.',
    date: '2026-09-05',
    status: 'Approved'
  },
  {
    id: 'rev-7',
    productId: 'prod-executive-steel',
    productTitle: 'Executive Steel',
    customerName: 'Mirza Tanvir',
    customerPhone: '+880 1814-998811',
    rating: 4,
    reviewText: 'Sharp brushed lugs and clean dial. Strap resizing was easily done with the included tool. Highly recommended.',
    date: '2026-09-04',
    status: 'Approved'
  },
  {
    id: 'rev-8',
    productId: 'prod-urban-classic',
    productTitle: 'Urban Classic',
    customerName: 'Mehnaz Haque',
    customerPhone: '+880 1917-332255',
    rating: 4,
    reviewText: 'Minimalist and lightweight. Leather is stiff on day one but softened quickly into a lovely patina.',
    date: '2026-09-02',
    status: 'Approved'
  },
  {
    id: 'rev-9',
    productId: 'prod-prestige-black',
    productTitle: 'Prestige Black',
    customerName: 'Shahidul Alam',
    customerPhone: '+880 1675-441199',
    rating: 5,
    reviewText: 'Stealth black DLC is truly scratch resistant. Already bumped my desk corner twice and not a mark.',
    date: '2026-08-30',
    status: 'Pending'
  },
  {
    id: 'rev-10',
    productId: 'prod-classic-silver',
    productTitle: 'Classic Silver',
    customerName: 'Rezaul Karim',
    customerPhone: '+880 1718-552233',
    rating: 5,
    reviewText: 'The thermally blued hands provide beautiful contrast in sunlight. Exquisite dress watch.',
    date: '2026-08-28',
    status: 'Pending'
  }
];

export const MANOVA_TRANSACTIONS: Transaction[] = [
  {
    id: 'trx-1001',
    orderId: 'MAN-10001',
    customerName: 'Tariq Rahman',
    amount: 46080,
    paymentMethod: 'bkash',
    status: 'Paid',
    date: '2026-09-10 14:20',
    type: 'order_payment'
  },
  {
    id: 'trx-1002',
    orderId: 'MAN-10002',
    customerName: 'Samira Chowdhury',
    amount: 32630,
    paymentMethod: 'cod',
    status: 'Pending',
    date: '2026-09-12 09:15',
    type: 'cod_remittance'
  },
  {
    id: 'trx-1003',
    orderId: 'MAN-10003',
    customerName: 'Kazi Mahbub',
    amount: 35090,
    paymentMethod: 'nagad',
    status: 'Paid',
    date: '2026-09-12 16:40',
    type: 'order_payment'
  },
  {
    id: 'trx-1004',
    orderId: 'MAN-10004',
    customerName: 'Farhan Ishraq',
    amount: 45080,
    paymentMethod: 'cod',
    status: 'Pending',
    date: '2026-09-13 11:05',
    type: 'cod_remittance'
  },
  {
    id: 'trx-1005',
    orderId: 'MAN-10005',
    customerName: 'Tanvir Hassan',
    amount: 38030,
    paymentMethod: 'card',
    status: 'Paid',
    date: '2026-09-13 13:30',
    type: 'order_payment'
  },
  {
    id: 'trx-1006',
    orderId: 'MAN-10007',
    customerName: 'Dr. Faisal Ahmed',
    amount: 52080,
    paymentMethod: 'bkash',
    status: 'Paid',
    date: '2026-09-13 15:45',
    type: 'order_payment'
  },
  {
    id: 'trx-1007',
    orderId: 'MAN-10008',
    customerName: 'Sadia Jahan',
    amount: 29580,
    paymentMethod: 'nagad',
    status: 'Paid',
    date: '2026-09-13 16:10',
    type: 'order_payment'
  },
  {
    id: 'trx-1008',
    orderId: 'MAN-10009',
    customerName: 'Zubair Hossain',
    amount: 41630,
    paymentMethod: 'cod',
    status: 'Pending',
    date: '2026-09-13 17:00',
    type: 'cod_remittance'
  }
];

export const MANOVA_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-1',
    date: '2026-09-13 18:40',
    admin: 'Main Admin (Super)',
    action: 'Order status changed',
    target: 'Order #MAN-10005',
    previousValue: 'Pending',
    newValue: 'Confirmed',
    category: 'order'
  },
  {
    id: 'aud-2',
    date: '2026-09-13 18:25',
    admin: 'Main Admin (Super)',
    action: 'Inventory adjusted',
    target: 'MAN-ROY-006 (Royal Heritage)',
    previousValue: '4 units',
    newValue: '3 units',
    category: 'inventory'
  },
  {
    id: 'aud-3',
    date: '2026-09-13 17:50',
    admin: 'Main Admin (Super)',
    action: 'Theme published',
    target: 'MANOVA Minimal Theme',
    previousValue: 'Draft',
    newValue: 'Live Storefront',
    category: 'theme'
  },
  {
    id: 'aud-4',
    date: '2026-09-13 17:15',
    admin: 'Store Manager',
    action: 'Review approved',
    target: 'Review from Barrister Nabeel',
    previousValue: 'Pending',
    newValue: 'Approved',
    category: 'review'
  },
  {
    id: 'aud-5',
    date: '2026-09-13 16:30',
    admin: 'Store Manager',
    action: 'Coupon created',
    target: 'MANOVA10 (10% OFF)',
    previousValue: '—',
    newValue: 'Active (Min ৳0)',
    category: 'coupon'
  },
  {
    id: 'aud-6',
    date: '2026-09-13 15:45',
    admin: 'Main Admin (Super)',
    action: 'Product updated',
    target: 'Midnight Automatic (MAN-AUT-004)',
    previousValue: 'Price: ৳46,000',
    newValue: 'Price: ৳48,000',
    category: 'product'
  },
  {
    id: 'aud-7',
    date: '2026-09-13 14:10',
    admin: 'Main Admin (Super)',
    action: 'Shipping fee updated',
    target: 'Store Settings',
    previousValue: 'Inside Dhaka: ৳80',
    newValue: 'Inside Dhaka: ৳120',
    category: 'settings'
  },
  {
    id: 'aud-8',
    date: '2026-09-13 13:00',
    admin: 'Store Manager',
    action: 'Order shipped',
    target: 'Order #MAN-10003',
    previousValue: 'Processing',
    newValue: 'Shipped (SteadFast: SF-99214)',
    category: 'order'
  }
];

export const MANOVA_STORE_SETTINGS: StoreSettings = {
  storeName: 'MANOVA',
  tagline: 'TIME. STYLE. CONFIDENCE.',
  phone: '+880 1711-892341',
  email: 'concierge@manovawatches.com.bd',
  address: 'Level 5, Concord Baksh Tower, Plot 11A, Road 71, Gulshan-2, Dhaka 1212',
  currency: '৳ BDT',
  shippingInsideDhaka: 120,
  shippingOutsideDhaka: 200,
  freeShippingThreshold: 50000,
  enableCod: true,
  enableBkash: true,
  enableNagad: true,
  enableCard: true,
  bkashMerchantNumber: '01711892341',
  nagadMerchantNumber: '01711892341',
  facebookUrl: 'https://facebook.com/manovawatches',
  instagramUrl: 'https://instagram.com/manovawatches'
};

export const MANOVA_COUPONS: Discount[] = [
  {
    id: 'disc-1',
    code: 'MANOVA10',
    type: 'percentage',
    value: 10,
    isActive: true,
    usageCount: 84,
    minSpend: 0,
    description: '10% privilege discount on any MANOVA timepiece'
  },
  {
    id: 'disc-2',
    code: 'MANOVA2000',
    type: 'fixed',
    value: 2000,
    isActive: true,
    usageCount: 112,
    minSpend: 30000,
    description: '৳ 2,000 credit on orders exceeding ৳ 30,000'
  },
  {
    id: 'disc-3',
    code: 'EIDVIP',
    type: 'percentage',
    value: 15,
    isActive: true,
    usageCount: 45,
    minSpend: 40000,
    description: '15% VIP festive privilege across full vault'
  },
  {
    id: 'disc-4',
    code: 'DHAKA500',
    type: 'fixed',
    value: 500,
    isActive: true,
    usageCount: 63,
    minSpend: 25000,
    description: '৳ 500 Dhaka launch privilege credit'
  }
];

export const MANOVA_ORDERS: Order[] = [
  {
    id: 'ord-10001',
    orderNumber: 'MAN-10001',
    customerEmail: 'rahman.tariq@gmail.com',
    customerName: 'Tariq Rahman',
    phone: '+880 1711-892341',
    items: [
      {
        productId: 'prod-midnight-automatic',
        title: 'Midnight Automatic',
        price: 48000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
        variant: 'Midnight Navy Croc Leather'
      }
    ],
    subtotal: 48000,
    deliveryFee: 120,
    deliveryZone: 'inside_dhaka',
    discountAmount: 2040,
    discountCode: 'MANOVA2000',
    total: 46080,
    paymentMethod: 'bkash',
    paymentStatus: 'Paid',
    trxId: 'BK9A872615X',
    status: 'Delivered',
    courierName: 'Paperfly Express',
    trackingNumber: 'PF-9821734',
    shippedAt: '2026-09-10T15:00:00Z',
    createdAt: '2026-09-10T14:20:00Z',
    shippingAddress: {
      fullName: 'Tariq Rahman',
      phone: '+880 1711-892341',
      email: 'rahman.tariq@gmail.com',
      district: 'Dhaka',
      area: 'Gulshan-2',
      fullAddress: 'Road 71, House 14, Apt 4B, Gulshan-2, Dhaka 1212',
      orderNotes: 'Delivered to concierge reception'
    }
  },
  {
    id: 'ord-10002',
    orderNumber: 'MAN-10002',
    customerEmail: 'samira.chowdhury@outlook.com',
    customerName: 'Samira Chowdhury',
    phone: '+880 1819-445829',
    items: [
      {
        productId: 'prod-classic-elegance',
        title: 'Classic Elegance',
        price: 32500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85',
        variant: 'Brushed Steel Link'
      }
    ],
    subtotal: 32500,
    deliveryFee: 200,
    deliveryZone: 'outside_dhaka',
    discountAmount: 0,
    total: 32700,
    paymentMethod: 'cod',
    paymentStatus: 'COD Pending',
    status: 'Processing',
    createdAt: '2026-09-12T09:15:00Z',
    shippingAddress: {
      fullName: 'Samira Chowdhury',
      phone: '+880 1819-445829',
      email: 'samira.chowdhury@outlook.com',
      district: 'Chattogram',
      area: 'Nasirabad GEC',
      fullAddress: 'Holding 88, CDA Avenue, Nasirabad, Chattogram 4000',
      orderNotes: 'Deliver between 11 AM - 4 PM'
    }
  },
  {
    id: 'ord-10003',
    orderNumber: 'MAN-10003',
    customerEmail: 'mahbub.kazi@northsouth.edu',
    customerName: 'Kazi Mahbub',
    phone: '+880 1912-334992',
    items: [
      {
        productId: 'prod-modern-chrono',
        title: 'Modern Chrono',
        price: 38900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=85',
        variant: 'Oyster Brushed Steel'
      }
    ],
    subtotal: 38900,
    deliveryFee: 120,
    deliveryZone: 'inside_dhaka',
    discountAmount: 3890,
    discountCode: 'MANOVA10',
    total: 35130,
    paymentMethod: 'nagad',
    paymentStatus: 'Paid',
    trxId: 'NG77192033',
    status: 'Shipped',
    courierName: 'SteadFast Courier',
    trackingNumber: 'SF-9921477',
    shippedAt: '2026-09-13T10:00:00Z',
    createdAt: '2026-09-12T16:40:00Z',
    shippingAddress: {
      fullName: 'Kazi Mahbub',
      phone: '+880 1912-334992',
      email: 'mahbub.kazi@northsouth.edu',
      district: 'Dhaka',
      area: 'Uttara Sector 4',
      fullAddress: 'House 22, Road 9, Sector 4, Uttara, Dhaka 1230',
      orderNotes: 'Handover only to recipient with OTP'
    }
  },
  {
    id: 'ord-10004',
    orderNumber: 'MAN-10004',
    customerEmail: 'farhan.ishraq@gmail.com',
    customerName: 'Farhan Ishraq',
    phone: '+880 1722-654321',
    items: [
      {
        productId: 'prod-heritage-gold',
        title: 'Heritage Gold',
        price: 45000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=1000&q=85',
        variant: 'President Gold Bracelet'
      }
    ],
    subtotal: 45000,
    deliveryFee: 120,
    deliveryZone: 'inside_dhaka',
    discountAmount: 0,
    total: 45120,
    paymentMethod: 'cod',
    paymentStatus: 'COD Pending',
    status: 'Pending',
    createdAt: '2026-09-13T11:05:00Z',
    shippingAddress: {
      fullName: 'Farhan Ishraq',
      phone: '+880 1722-654321',
      email: 'farhan.ishraq@gmail.com',
      district: 'Dhaka',
      area: 'Dhanmondi 27',
      fullAddress: 'House 56, Road 27 (Old 16), Dhanmondi R/A, Dhaka 1209',
      orderNotes: 'Call 30 mins before arrival'
    }
  },
  {
    id: 'ord-10005',
    orderNumber: 'MAN-10005',
    customerEmail: 'tanvir.hassan@apexfootwear.com',
    customerName: 'Tanvir Hassan',
    phone: '+880 1678-998877',
    items: [
      {
        productId: 'prod-signature-blue',
        title: 'Signature Blue',
        price: 39900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
        variant: 'Grade 5 Titanium Link'
      }
    ],
    subtotal: 39900,
    deliveryFee: 200,
    deliveryZone: 'outside_dhaka',
    discountAmount: 2000,
    discountCode: 'MANOVA2000',
    total: 38100,
    paymentMethod: 'card',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    createdAt: '2026-09-13T13:30:00Z',
    shippingAddress: {
      fullName: 'Tanvir Hassan',
      phone: '+880 1678-998877',
      email: 'tanvir.hassan@apexfootwear.com',
      district: 'Sylhet',
      area: 'Zindabazar',
      fullAddress: 'Tower Plaza, 4th Floor, Zindabazar, Sylhet 3100',
      orderNotes: 'Armored box with gift packaging'
    }
  },
  {
    id: 'ord-10006',
    orderNumber: 'MAN-10006',
    customerEmail: 'nusrat.jahan@brac.net',
    customerName: 'Nusrat Jahan',
    phone: '+880 1552-334455',
    items: [
      {
        productId: 'prod-urban-classic',
        title: 'Urban Classic',
        price: 26500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&w=1000&q=85',
        variant: 'Tan Saddle Leather'
      }
    ],
    subtotal: 26500,
    deliveryFee: 120,
    deliveryZone: 'inside_dhaka',
    discountAmount: 0,
    total: 26620,
    paymentMethod: 'cod',
    paymentStatus: 'Failed',
    status: 'Cancelled',
    createdAt: '2026-09-11T18:10:00Z',
    shippingAddress: {
      fullName: 'Nusrat Jahan',
      phone: '+880 1552-334455',
      email: 'nusrat.jahan@brac.net',
      district: 'Dhaka',
      area: 'Banani Block C',
      fullAddress: 'Road 11, House 34, Banani, Dhaka 1213',
      orderNotes: 'Customer requested cancellation due to duplicate order'
    }
  },
  {
    id: 'ord-10007',
    orderNumber: 'MAN-10007',
    customerEmail: 'faisal.ahmed@squaregroup.com',
    customerName: 'Dr. Faisal Ahmed',
    phone: '+880 1711-239988',
    items: [
      {
        productId: 'prod-royal-heritage',
        title: 'Royal Heritage',
        price: 52000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1000&q=85',
        variant: 'Fluted Jubilee Link'
      }
    ],
    subtotal: 52000,
    deliveryFee: 120,
    deliveryZone: 'inside_dhaka',
    discountAmount: 0,
    total: 52120,
    paymentMethod: 'bkash',
    paymentStatus: 'Paid',
    trxId: 'BK9Q110294X',
    status: 'Delivered',
    courierName: 'eCourier Express',
    trackingNumber: 'EC-449102',
    shippedAt: '2026-09-11T11:00:00Z',
    createdAt: '2026-09-11T10:00:00Z',
    shippingAddress: {
      fullName: 'Dr. Faisal Ahmed',
      phone: '+880 1711-239988',
      email: 'faisal.ahmed@squaregroup.com',
      district: 'Dhaka',
      area: 'Gulshan-1',
      fullAddress: 'Avenue 4, House 12, Gulshan-1, Dhaka 1212',
      orderNotes: 'Priority high-value delivery'
    }
  },
  {
    id: 'ord-10008',
    orderNumber: 'MAN-10008',
    customerEmail: 'sadia.jahan@gmail.com',
    customerName: 'Sadia Jahan',
    phone: '+880 1819-332211',
    items: [
      {
        productId: 'prod-executive-steel',
        title: 'Executive Steel',
        price: 29500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
        variant: 'Solid Link Steel'
      }
    ],
    subtotal: 29500,
    deliveryFee: 120,
    deliveryZone: 'inside_dhaka',
    discountAmount: 0,
    total: 29620,
    paymentMethod: 'nagad',
    paymentStatus: 'Paid',
    trxId: 'NG55441100',
    status: 'Processing',
    createdAt: '2026-09-13T16:10:00Z',
    shippingAddress: {
      fullName: 'Sadia Jahan',
      phone: '+880 1819-332211',
      email: 'sadia.jahan@gmail.com',
      district: 'Dhaka',
      area: 'Mirpur DOHS',
      fullAddress: 'Road 4, House 220, Mirpur DOHS, Dhaka 1216'
    }
  },
  {
    id: 'ord-10009',
    orderNumber: 'MAN-10009',
    customerEmail: 'zubair.hossain@gmail.com',
    customerName: 'Zubair Hossain',
    phone: '+880 1913-445588',
    items: [
      {
        productId: 'prod-prestige-black',
        title: 'Prestige Black',
        price: 41500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85'
      }
    ],
    subtotal: 41500,
    deliveryFee: 200,
    deliveryZone: 'outside_dhaka',
    discountAmount: 0,
    total: 41700,
    paymentMethod: 'cod',
    paymentStatus: 'COD Pending',
    status: 'Pending',
    createdAt: '2026-09-13T17:00:00Z',
    shippingAddress: {
      fullName: 'Zubair Hossain',
      phone: '+880 1913-445588',
      email: 'zubair.hossain@gmail.com',
      district: 'Bogura',
      area: 'Jaleshwaritola',
      fullAddress: 'Plot 15, Sherpur Road, Bogura 5800'
    }
  },
  {
    id: 'ord-10010',
    orderNumber: 'MAN-10010',
    customerEmail: 'nabeel.chowdhury@supremecourt.gov.bd',
    customerName: 'Barrister Nabeel Chowdhury',
    phone: '+880 1712-887766',
    items: [
      {
        productId: 'prod-modern-chrono',
        title: 'Modern Chrono',
        price: 38900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=85'
      }
    ],
    subtotal: 38900,
    deliveryFee: 120,
    deliveryZone: 'inside_dhaka',
    discountAmount: 3890,
    discountCode: 'MANOVA10',
    total: 35130,
    paymentMethod: 'bkash',
    paymentStatus: 'Paid',
    trxId: 'BK33991188',
    status: 'Confirmed',
    createdAt: '2026-09-13T14:40:00Z',
    shippingAddress: {
      fullName: 'Barrister Nabeel Chowdhury',
      phone: '+880 1712-887766',
      email: 'nabeel.chowdhury@supremecourt.gov.bd',
      district: 'Dhaka',
      area: 'Baridhara DOHS',
      fullAddress: 'Road 2, House 15, Baridhara DOHS, Dhaka 1206'
    }
  }
];

export const MANOVA_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Tariq Rahman',
    email: 'rahman.tariq@gmail.com',
    phone: '+880 1711-892341',
    district: 'Dhaka (Gulshan-2)',
    ordersCount: 3,
    totalSpent: 128500,
    joinedDate: '2025-11-10',
    vipTier: 'Platinum',
    status: 'active',
    lastOrderDate: '2026-09-10',
    address: 'Road 71, House 14, Gulshan-2, Dhaka'
  },
  {
    id: 'cust-2',
    name: 'Samira Chowdhury',
    email: 'samira.chowdhury@outlook.com',
    phone: '+880 1819-445829',
    district: 'Chattogram (CDA)',
    ordersCount: 2,
    totalSpent: 77500,
    joinedDate: '2026-01-18',
    vipTier: 'Gold',
    status: 'active',
    lastOrderDate: '2026-09-12',
    address: 'CDA Avenue, Nasirabad, Chattogram'
  },
  {
    id: 'cust-3',
    name: 'Kazi Mahbub',
    email: 'mahbub.kazi@northsouth.edu',
    phone: '+880 1912-334992',
    district: 'Dhaka (Uttara)',
    ordersCount: 1,
    totalSpent: 35130,
    joinedDate: '2026-03-02',
    vipTier: 'Silver',
    status: 'active',
    lastOrderDate: '2026-09-12',
    address: 'House 22, Road 9, Sector 4, Uttara, Dhaka'
  },
  {
    id: 'cust-4',
    name: 'Dr. Faisal Ahmed',
    email: 'faisal.ahmed@squaregroup.com',
    phone: '+880 1711-239988',
    district: 'Dhaka (Gulshan-1)',
    ordersCount: 2,
    totalSpent: 104200,
    joinedDate: '2025-12-05',
    vipTier: 'Platinum',
    status: 'active',
    lastOrderDate: '2026-09-11',
    address: 'Avenue 4, House 12, Gulshan-1, Dhaka'
  },
  {
    id: 'cust-5',
    name: 'Tanvir Hassan',
    email: 'tanvir.hassan@apexfootwear.com',
    phone: '+880 1678-998877',
    district: 'Sylhet (Zindabazar)',
    ordersCount: 1,
    totalSpent: 38100,
    joinedDate: '2026-04-12',
    vipTier: 'Silver',
    status: 'active',
    lastOrderDate: '2026-09-13',
    address: 'Tower Plaza, Zindabazar, Sylhet'
  },
  {
    id: 'cust-6',
    name: 'Barrister Nabeel Chowdhury',
    email: 'nabeel.chowdhury@supremecourt.gov.bd',
    phone: '+880 1712-887766',
    district: 'Dhaka (Baridhara)',
    ordersCount: 2,
    totalSpent: 86400,
    joinedDate: '2026-02-14',
    vipTier: 'Gold',
    status: 'active',
    lastOrderDate: '2026-09-13',
    address: 'Baridhara DOHS, Dhaka'
  },
  {
    id: 'cust-7',
    name: 'Farhan Ishraq',
    email: 'farhan.ishraq@gmail.com',
    phone: '+880 1722-654321',
    district: 'Dhaka (Dhanmondi)',
    ordersCount: 1,
    totalSpent: 45120,
    joinedDate: '2026-05-20',
    vipTier: 'Silver',
    status: 'active',
    lastOrderDate: '2026-09-13',
    address: 'Road 27, Dhanmondi, Dhaka'
  },
  {
    id: 'cust-8',
    name: 'Nusrat Jahan',
    email: 'nusrat.jahan@brac.net',
    phone: '+880 1552-334455',
    district: 'Dhaka (Banani)',
    ordersCount: 1,
    totalSpent: 0,
    joinedDate: '2026-06-01',
    vipTier: 'Silver',
    status: 'active',
    lastOrderDate: '2026-09-11',
    address: 'Road 11, Banani, Dhaka'
  }
];
