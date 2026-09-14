import React, { useState, useEffect } from 'react';
import { 
  ActiveView, 
  ThemeSettings, 
  Product, 
  Order, 
  Customer, 
  Discount, 
  CartItem,
  DeliveryZone
} from './types';
import { 
  DEFAULT_THEME, 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_CUSTOMERS, 
  INITIAL_DISCOUNTS 
} from './data/mockData';
import { 
  auth, 
  db, 
  signInWithGoogle, 
  logOut, 
  onAuthStateChanged,
  doc,
  setDoc,
  testFirestoreConnection
} from './services/firebase';
import { User } from 'firebase/auth';

// Storefront Core Components
import { Navbar } from './components/storefront/Navbar';
import { HeroSection } from './components/storefront/HeroSection';
import { SignaturePiecesSection } from './components/storefront/SignaturePiecesSection';
import { CraftsmanshipSection } from './components/storefront/CraftsmanshipSection';
import { FeaturedWatchesSection } from './components/storefront/FeaturedWatchesSection';
import { CollectionGrid } from './components/storefront/CollectionGrid';
import { ChronosWatermarkBanner } from './components/storefront/ChronosWatermarkBanner';
import { TestimonialsSection } from './components/storefront/TestimonialsSection';
import { NewsletterSection } from './components/storefront/NewsletterSection';
import { FooterSection } from './components/storefront/FooterSection';
import { ImageTextSection } from './components/storefront/ImageTextSection';
import { PromoBannerSection } from './components/storefront/PromoBannerSection';
import { CartDrawer } from './components/storefront/CartDrawer';
import { CheckoutModal } from './components/storefront/CheckoutModal';
import { ProductDetailModal } from './components/storefront/ProductDetailModal';
import { SearchModal } from './components/storefront/SearchModal';
import { PromptModal } from './components/PromptModal';

// Dedicated Standalone Pages
import { ShopPage } from './components/pages/ShopPage';
import { CollectionsPage } from './components/pages/CollectionsPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrderSuccessPage } from './components/pages/OrderSuccessPage';
import { ContactPage } from './components/pages/ContactPage';
import { CraftsmanshipPage } from './components/pages/CraftsmanshipPage';
import { JournalPage } from './components/pages/JournalPage';

// Shopify Customizer & Admin
import { ThemeCustomizer } from './components/customizer/ThemeCustomizer';
import { MerchantAdmin } from './components/admin/MerchantAdmin';
import { AdminLogin } from './components/admin/AdminLogin';
import { 
  ADMIN_EMAIL, 
  getAdminAuthState, 
  setAdminLoginSession, 
  clearAdminLoginSession 
} from './services/adminAuth';

export default function App() {
  // Navigation & View State
  const [activeView, setActiveView] = useState<ActiveView>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (
        pathname === '/admin/theme-editor' || 
        pathname.startsWith('/admin/theme-editor') ||
        pathname === '/theme-editor' ||
        pathname === '/customizer' ||
        hash === '#admin/theme-editor' ||
        hash === '#/admin/theme-editor' ||
        hash === '#theme-editor' ||
        hash === '#customizer'
      ) {
        return 'customizer';
      }
      if (pathname === '/admin' || pathname.startsWith('/admin') || hash === '#admin' || hash === '#/admin') {
        return 'admin';
      }
      if (pathname === '/shop' || hash === '#shop') {
        return 'shop';
      }
      if (pathname === '/collections' || hash === '#collections') {
        return 'collections';
      }
      if (pathname === '/cart' || hash === '#cart') {
        return 'cart';
      }
      if (pathname === '/checkout' || hash === '#checkout') {
        return 'checkout';
      }
      if (pathname === '/contact' || hash === '#contact') {
        return 'contact';
      }
    }
    return 'home';
  });
  const [initialShopCategory, setInitialShopCategory] = useState<string>('all');

  // Theme State
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(() => {
    const local = localStorage.getItem('chronova_theme_settings');
    if (local) {
      try { return JSON.parse(local); } catch (e) { /* ignore */ }
    }
    return DEFAULT_THEME;
  });

  // E-Commerce Core Entities
  const [products, setProducts] = useState<Product[]>(() => {
    const local = localStorage.getItem('chronova_products');
    if (local) {
      try { return JSON.parse(local); } catch (e) { /* ignore */ }
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const local = localStorage.getItem('chronova_orders');
    if (local) {
      try { return JSON.parse(local); } catch (e) { /* ignore */ }
    }
    return INITIAL_ORDERS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const local = localStorage.getItem('chronova_customers');
    if (local) {
      try { return JSON.parse(local); } catch (e) { /* ignore */ }
    }
    return INITIAL_CUSTOMERS;
  });

  const [discounts, setDiscounts] = useState<Discount[]>(() => {
    const local = localStorage.getItem('chronova_discounts');
    if (local) {
      try { return JSON.parse(local); } catch (e) { /* ignore */ }
    }
    return INITIAL_DISCOUNTS;
  });

  // Cart & Shopping State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const local = localStorage.getItem('chronova_cart');
    if (local) {
      try { return JSON.parse(local); } catch (e) { /* ignore */ }
    }
    return [];
  });
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const local = localStorage.getItem('chronova_wishlist');
    if (local) {
      try { return JSON.parse(local); } catch (e) { /* ignore */ }
    }
    return ['prod-1', 'prod-2']; // 2 defaults for instant polish
  });

  // Checkout context & Recent Order
  const [checkoutZone, setCheckoutZone] = useState<DeliveryZone>('inside_dhaka');
  const [checkoutDiscountCode, setCheckoutDiscountCode] = useState<string | undefined>(undefined);
  const [checkoutDiscountAmount, setCheckoutDiscountAmount] = useState<number>(0);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Modals & Active Selected Product
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Auth User
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Merchant Admin Fixed Auth State
  const [adminAuth, setAdminAuth] = useState(() => getAdminAuthState());

  const handleAdminLoginSuccess = (email: string) => {
    setAdminLoginSession(email);
    setAdminAuth({
      isAuthenticated: true,
      email,
      lastLogin: new Date().toISOString(),
    });
  };

  const handleAdminLogOut = () => {
    clearAdminLoginSession();
    setAdminAuth({
      isAuthenticated: false,
      email: null,
      lastLogin: null,
    });
    navigateTo('home');
  };

  // Listen to Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    testFirestoreConnection().catch(console.warn);
    return () => unsubscribe();
  }, []);

  // Save Cart to local
  useEffect(() => {
    localStorage.setItem('chronova_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save Wishlist to local
  useEffect(() => {
    localStorage.setItem('chronova_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Sync Theme locally
  const handleUpdateTheme = (newTheme: ThemeSettings) => {
    setThemeSettings(newTheme);
    localStorage.setItem('chronova_theme_settings', JSON.stringify(newTheme));
  };

  // Sync to Cloud Firestore
  const handleSaveThemeToCloud = async () => {
    try {
      await setDoc(doc(db, 'themeSettings', 'activeTheme'), {
        ...themeSettings,
        updatedAt: new Date().toISOString(),
      });
      localStorage.setItem('chronova_theme_settings', JSON.stringify(themeSettings));
    } catch (error) {
      console.warn('Saved locally (Firestore write notice):', error);
    }
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Cart Operations
  const handleAddToCart = (product: Product, quantity = 1, variant?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedVariant === variant);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedVariant === variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVariant: variant }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product, quantity = 1, variant?: string) => {
    handleAddToCart(product, quantity, variant);
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Order Placement
  const handleOrderCompleted = async (newOrder: Order) => {
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('chronova_orders', JSON.stringify(updatedOrders));

    // Update inventory for items purchased
    const updatedProducts = products.map((p) => {
      const orderedItem = newOrder.items.find((item) => item.productId === p.id);
      if (orderedItem) {
        return {
          ...p,
          inventory: Math.max(0, p.inventory - orderedItem.quantity),
        };
      }
      return p;
    });
    setProducts(updatedProducts);
    localStorage.setItem('chronova_products', JSON.stringify(updatedProducts));

    // Clear cart and route to order success page
    setCartItems([]);
    setLatestOrder(newOrder);
    setIsCheckoutOpen(false);
    setActiveView('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Persist to Cloud Firestore if connected
    try {
      await setDoc(doc(db, 'orders', newOrder.id), newOrder);
    } catch (err) {
      console.warn('Order saved locally (Firestore notice):', err);
    }
  };

  // Merchant Admin Operations
  const handleUpdateProduct = (updated: Product) => {
    const next = products.map((p) => (p.id === updated.id ? updated : p));
    setProducts(next);
    localStorage.setItem('chronova_products', JSON.stringify(next));
  };

  const handleAddProduct = (newProd: Product) => {
    const next = [newProd, ...products];
    setProducts(next);
    localStorage.setItem('chronova_products', JSON.stringify(next));
  };

  const handleDeleteProduct = (productId: string) => {
    const next = products.filter((p) => p.id !== productId);
    setProducts(next);
    localStorage.setItem('chronova_products', JSON.stringify(next));
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    const next = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(next);
    localStorage.setItem('chronova_orders', JSON.stringify(next));
  };

  const handleAddDiscount = (newDiscount: Discount) => {
    const next = [newDiscount, ...discounts];
    setDiscounts(next);
    localStorage.setItem('chronova_discounts', JSON.stringify(next));
  };

  const handleToggleDiscount = (discountId: string) => {
    const next = discounts.map((d) =>
      d.id === discountId ? { ...d, isActive: !d.isActive } : d
    );
    setDiscounts(next);
    localStorage.setItem('chronova_discounts', JSON.stringify(next));
  };

  // Sync browser URL with view
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (
        pathname === '/admin/theme-editor' || 
        pathname.startsWith('/admin/theme-editor') || 
        pathname === '/theme-editor' || 
        pathname === '/customizer' ||
        hash === '#admin/theme-editor' || 
        hash === '#/admin/theme-editor' || 
        hash === '#theme-editor' || 
        hash === '#customizer'
      ) {
        setActiveView('customizer');
      } else if (pathname === '/admin' || pathname.startsWith('/admin') || hash === '#admin' || hash === '#/admin') {
        setActiveView('admin');
      } else {
        const viewName = pathname.replace('/', '') as ActiveView;
        if (viewName && ['home', 'shop', 'collections', 'product-detail', 'cart', 'checkout', 'contact', 'craftsmanship', 'journal', 'customizer', 'admin'].includes(viewName)) {
          setActiveView(viewName);
        } else {
          setActiveView('home');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation Helper
  const navigateTo = (view: ActiveView) => {
    setActiveView(view);
    if (typeof window !== 'undefined') {
      const targetPath = 
        view === 'customizer' ? '/admin/theme-editor' : 
        view === 'admin' ? '/admin' : 
        view === 'home' ? '/' : `/${view}`;
      if (window.location.pathname !== targetPath) {
        try {
          window.history.pushState({ view }, '', targetPath);
        } catch (e) {
          // ignore if history pushState is not allowed in iframe sandbox
        }
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to customizer view
  if (activeView === 'customizer') {
    if (!adminAuth.isAuthenticated) {
      return (
        <AdminLogin
          onSuccess={handleAdminLoginSuccess}
          onExit={() => navigateTo('home')}
        />
      );
    }

    return (
      <ThemeCustomizer
        currentTheme={themeSettings}
        onUpdateTheme={handleUpdateTheme}
        onSaveToCloud={handleSaveThemeToCloud}
        onExit={() => navigateTo('admin')}
        products={products}
        onOpenPrompt={() => setIsPromptOpen(true)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          navigateTo('product-detail');
        }}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />
    );
  }

  // Switch to merchant admin view
  if (activeView === 'admin') {
    if (!adminAuth.isAuthenticated) {
      return (
        <AdminLogin
          onSuccess={handleAdminLoginSuccess}
          onExit={() => navigateTo('home')}
        />
      );
    }

    return (
      <MerchantAdmin
        products={products}
        orders={orders}
        customers={customers}
        discounts={discounts}
        currentTheme={themeSettings}
        adminEmail={adminAuth.email || ADMIN_EMAIL}
        onLogOut={handleAdminLogOut}
        onUpdateTheme={handleUpdateTheme}
        onUpdateProduct={handleUpdateProduct}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onAddDiscount={handleAddDiscount}
        onToggleDiscount={handleToggleDiscount}
        onExit={() => navigateTo('home')}
        onOpenThemeEditor={() => navigateTo('customizer')}
      />
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col font-sans-luxury text-stone-900 transition-colors duration-300 antialiased"
      style={{ backgroundColor: themeSettings.backgroundColor || '#FAF8F5' }}
    >
      {/* Storefront Navigation Bar */}
      <Navbar
        activeView={activeView}
        onNavigate={navigateTo}
        cartItems={cartItems}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => {
          navigateTo('shop');
        }}
        themeSettings={themeSettings}
        currentUser={currentUser}
        onSignIn={signInWithGoogle}
        onSignOut={logOut}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* VIEW: Shop / All Watches Page */}
        {activeView === 'shop' && (
          <ShopPage
            products={products}
            primaryColor={themeSettings.primaryColor}
            buttonStyle={themeSettings.buttonStyle}
            fontFamily={themeSettings.fontFamily}
            initialCategory={initialShopCategory}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              navigateTo('product-detail');
            }}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onBuyNow={(p) => handleBuyNow(p, 1)}
          />
        )}

        {/* VIEW: Collections Page */}
        {activeView === 'collections' && (
          <CollectionsPage
            primaryColor={themeSettings.primaryColor}
            buttonStyle={themeSettings.buttonStyle}
            fontFamily={themeSettings.fontFamily}
            onSelectCategory={(catId) => {
              setInitialShopCategory(catId);
              navigateTo('shop');
            }}
          />
        )}

        {/* VIEW: Product Details Page */}
        {activeView === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            primaryColor={themeSettings.primaryColor}
            buttonStyle={themeSettings.buttonStyle}
            fontFamily={themeSettings.fontFamily}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onBackToShop={() => navigateTo('shop')}
          />
        )}

        {/* VIEW: Cart Page */}
        {activeView === 'cart' && (
          <CartPage
            cartItems={cartItems}
            primaryColor={themeSettings.primaryColor}
            buttonStyle={themeSettings.buttonStyle}
            fontFamily={themeSettings.fontFamily}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onProceedToCheckout={(zone, promoCode, discountAmt) => {
              setCheckoutZone(zone);
              setCheckoutDiscountCode(promoCode);
              setCheckoutDiscountAmount(discountAmt || 0);
              navigateTo('checkout');
            }}
            onContinueShopping={() => navigateTo('shop')}
          />
        )}

        {/* VIEW: Bangladesh Checkout Page */}
        {activeView === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            initialDeliveryZone={checkoutZone}
            initialDiscountCode={checkoutDiscountCode}
            initialDiscountAmount={checkoutDiscountAmount}
            primaryColor={themeSettings.primaryColor}
            buttonStyle={themeSettings.buttonStyle}
            fontFamily={themeSettings.fontFamily}
            onPlaceOrder={handleOrderCompleted}
            onBackToCart={() => navigateTo('cart')}
          />
        )}

        {/* VIEW: Order Success Page */}
        {activeView === 'order-success' && latestOrder && (
          <OrderSuccessPage
            order={latestOrder}
            primaryColor={themeSettings.primaryColor}
            buttonStyle={themeSettings.buttonStyle}
            fontFamily={themeSettings.fontFamily}
            onContinueShopping={() => navigateTo('shop')}
          />
        )}

        {/* VIEW: Contact Page */}
        {activeView === 'contact' && (
          <ContactPage
            primaryColor={themeSettings.primaryColor}
            buttonStyle={themeSettings.buttonStyle}
            fontFamily={themeSettings.fontFamily}
          />
        )}

        {/* VIEW: Craftsmanship Page */}
        {activeView === 'craftsmanship' && (
          <CraftsmanshipPage
            primaryColor={themeSettings.primaryColor}
            buttonStyle={themeSettings.buttonStyle}
            fontFamily={themeSettings.fontFamily}
            onExploreWatches={() => navigateTo('shop')}
          />
        )}

        {/* VIEW: Journal Page */}
        {activeView === 'journal' && (
          <JournalPage
            primaryColor={themeSettings.primaryColor}
            buttonStyle={themeSettings.buttonStyle}
            fontFamily={themeSettings.fontFamily}
            onExploreWatches={() => navigateTo('shop')}
          />
        )}

        {/* VIEW: Home / Storefront Page */}
        {(activeView === 'home' || activeView === 'storefront') && (
          <>
            {themeSettings.sections
              .filter((sec) => sec.enabled)
              .map((section) => {
                switch (section.type) {
                  case 'hero':
                    return (
                      <HeroSection
                        key={section.id}
                        section={section}
                        primaryColor={themeSettings.primaryColor}
                        backgroundColor={themeSettings.backgroundColor}
                        accentColor={themeSettings.accentColor}
                        buttonStyle={themeSettings.buttonStyle}
                        fontFamily={themeSettings.fontFamily}
                        onExploreClick={() => navigateTo('collections')}
                      />
                    );
                  case 'signature':
                    return (
                      <SignaturePiecesSection
                        key={section.id}
                        section={section}
                        products={products}
                        primaryColor={themeSettings.primaryColor}
                        buttonStyle={themeSettings.buttonStyle}
                        fontFamily={themeSettings.fontFamily}
                        wishlistIds={wishlistIds}
                        onToggleWishlist={handleToggleWishlist}
                        onSelectProduct={(p) => {
                          setSelectedProduct(p);
                          navigateTo('product-detail');
                        }}
                        onAddToCart={(p) => handleAddToCart(p, 1)}
                        onShopAllClick={() => navigateTo('shop')}
                      />
                    );
                  case 'craftsmanship':
                    return (
                      <CraftsmanshipSection
                        key={section.id}
                        section={section}
                        fontFamily={themeSettings.fontFamily}
                        primaryColor={themeSettings.primaryColor}
                        buttonStyle={themeSettings.buttonStyle}
                        onExploreClick={() => navigateTo('craftsmanship')}
                      />
                    );
                  case 'featured':
                    return (
                      <FeaturedWatchesSection
                        key={section.id}
                        section={section}
                        products={products}
                        primaryColor={themeSettings.primaryColor}
                        buttonStyle={themeSettings.buttonStyle}
                        fontFamily={themeSettings.fontFamily}
                        wishlistIds={wishlistIds}
                        onToggleWishlist={handleToggleWishlist}
                        onSelectProduct={(p) => {
                          setSelectedProduct(p);
                          navigateTo('product-detail');
                        }}
                        onAddToCart={(p) => handleAddToCart(p, 1)}
                        onViewAllClick={() => navigateTo('shop')}
                      />
                    );
                  case 'collections':
                    return (
                      <CollectionGrid
                        key={section.id}
                        products={products}
                        primaryColor={themeSettings.primaryColor}
                        buttonStyle={themeSettings.buttonStyle}
                        fontFamily={themeSettings.fontFamily}
                        onSelectProduct={(p) => {
                          setSelectedProduct(p);
                          navigateTo('product-detail');
                        }}
                        onAddToCart={(p) => handleAddToCart(p, 1)}
                      />
                    );
                  case 'chronosBanner':
                    return (
                      <ChronosWatermarkBanner
                        key={section.id}
                        section={section}
                        fontFamily={themeSettings.fontFamily}
                        onExploreClick={() => navigateTo('craftsmanship')}
                      />
                    );
                  case 'testimonials':
                    return (
                      <TestimonialsSection
                        key={section.id}
                        section={section}
                        fontFamily={themeSettings.fontFamily}
                      />
                    );
                  case 'promoBanner':
                    return (
                      <PromoBannerSection
                        key={section.id}
                        section={section}
                        primaryColor={themeSettings.primaryColor}
                        buttonStyle={themeSettings.buttonStyle}
                        fontFamily={themeSettings.fontFamily}
                        onButtonClick={() => navigateTo('shop')}
                      />
                    );
                  case 'imageText':
                    return (
                      <ImageTextSection
                        key={section.id}
                        section={section}
                        primaryColor={themeSettings.primaryColor}
                        buttonStyle={themeSettings.buttonStyle}
                        fontFamily={themeSettings.fontFamily}
                        onButtonClick={() => navigateTo('craftsmanship')}
                      />
                    );
                  case 'newsletter':
                    return (
                      <NewsletterSection
                        key={section.id}
                        section={section}
                        fontFamily={themeSettings.fontFamily}
                        primaryColor={themeSettings.primaryColor}
                        buttonStyle={themeSettings.buttonStyle}
                      />
                    );
                  case 'footer':
                    return (
                      <FooterSection
                        key={section.id}
                        fontFamily={themeSettings.fontFamily}
                        onNavigate={navigateTo}
                        onOpenPrompt={() => setIsPromptOpen(true)}
                      />
                    );
                  default:
                    return null;
                }
              })}
          </>
        )}
      </main>

      {/* Global Luxury Storefront Footer */}
      <FooterSection
        fontFamily={themeSettings.fontFamily}
        onNavigate={navigateTo}
        onOpenPrompt={() => setIsPromptOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          navigateTo('cart');
        }}
        availableDiscounts={discounts}
        appliedDiscount={appliedDiscount}
        onApplyDiscount={setAppliedDiscount}
      />

      {/* Quick Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        appliedDiscount={appliedDiscount}
        onOrderCompleted={handleOrderCompleted}
        onClearCart={() => setCartItems([])}
      />

      {/* Product Detail Quick-View Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, qty) => {
          handleAddToCart(p, qty);
          setQuickViewProduct(null);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsSearchOpen(false);
          navigateTo('product-detail');
        }}
      />

      {/* Copy Prompt Modal for Google AI Studio */}
      <PromptModal
        isOpen={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
      />
    </div>
  );
}
