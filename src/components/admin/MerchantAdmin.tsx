import React, { useState } from 'react';
import { Product, Order, Customer, Discount, ThemeSettings, OrderStatus, IncompleteOrder } from '../../types';
import { MANOVA_INCOMPLETE_ORDERS } from '../../data/manovaData';
import { AdminSidebar, AdminTab } from './modules/AdminSidebar';
import { DashboardView } from './modules/DashboardView';
import { HomepageView } from './modules/HomepageView';
import { OrdersView } from './modules/OrdersView';
import { ProductsView } from './modules/ProductsView';
import { AltTextManagerView } from './modules/AltTextManagerView';
import { CategoryView } from './modules/CategoryView';
import { InventoryView } from './modules/InventoryView';
import { CouponsView } from './modules/CouponsView';
import { CustomersView } from './modules/CustomersView';
import { ReviewsView } from './modules/ReviewsView';
import { OrderControlView } from './modules/OrderControlView';
import { AuditLogView } from './modules/AuditLogView';
import { FinanceView } from './modules/FinanceView';
import { SettingsView } from './modules/SettingsView';
import { 
  Menu, 
  ExternalLink, 
  Sparkles, 
  Globe, 
  Bell, 
  Search, 
  CheckCircle2, 
  ArrowLeft,
  X,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { ManovaLogo } from '../ManovaLogo';

interface MerchantAdminProps {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  discounts: Discount[];
  currentTheme?: ThemeSettings;
  adminEmail?: string;
  onLogOut?: () => void;
  onUpdateTheme?: (theme: ThemeSettings) => void;
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onAddDiscount: (discount: Discount) => void;
  onToggleDiscount: (discountId: string) => void;
  onExit: () => void;
  onOpenThemeEditor?: () => void;
}

export const MerchantAdmin: React.FC<MerchantAdminProps> = ({
  products,
  orders,
  customers,
  discounts,
  currentTheme,
  adminEmail = 'Obaidullah1168@gmail.com',
  onLogOut,
  onUpdateTheme,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onAddDiscount,
  onToggleDiscount,
  onExit,
  onOpenThemeEditor,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [lang, setLang] = useState<'bn' | 'en'>('en');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [incompleteOrders, setIncompleteOrders] = useState<IncompleteOrder[]>(MANOVA_INCOMPLETE_ORDERS);

  const isBn = lang === 'bn';

  // Badge counts
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  const incompleteOrdersCount = incompleteOrders.length;
  const productsCount = products.length;

  // Handle conversion of incomplete order to confirmed order
  const handleConvertIncompleteOrder = (inc: IncompleteOrder) => {
    const newOrd: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `MNV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: inc.customerName,
      customerEmail: inc.email,
      phone: inc.phone,
      shippingAddress: {
        district: inc.district || 'Dhaka',
        area: 'Gulshan / Banani',
        fullAddress: 'Confirmed over phone consultation',
      },
      items: inc.cartItems,
      subtotal: inc.cartValue,
      deliveryFee: 120,
      discountAmount: 0,
      total: inc.cartValue + 120,
      paymentMethod: 'cod',
      paymentStatus: 'COD Pending',
      status: 'Pending',
      createdAt: new Date().toISOString(),
      deliveryZone: 'inside_dhaka',
    };

    // Update status in orders array
    orders.unshift(newOrd);
    setIncompleteOrders(prev => prev.filter(i => i.id !== inc.id));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-stone-900 flex flex-col antialiased font-sans">
      {/* Top Merchant Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200/80 px-4 py-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer" onClick={onExit}>
            <ManovaLogo size="sm" isDark={false} />
            <span className="hidden sm:inline-block text-[11px] font-mono font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              MERCHANT ATELIER
            </span>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Atelier live status indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-stone-50 rounded-full border border-stone-200 text-xs text-stone-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">Gulshan-2 Atelier: Live • Dispatch Active</span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            title="Toggle Bangla / English"
          >
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
          </button>

          {/* Direct link to Theme Customizer */}
          {onOpenThemeEditor && (
            <button
              onClick={onOpenThemeEditor}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{isBn ? 'থিম এডিটর' : 'Theme Customizer'}</span>
            </button>
          )}

          {/* View Storefront */}
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <span>{isBn ? 'স্টোরফ্রন্ট' : 'Storefront'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Logged in Admin Pill & Sign Out */}
          <div className="flex items-center gap-1 pl-2 border-l border-stone-200">
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="max-w-[140px] truncate" title={adminEmail}>{adminEmail}</span>
            </div>
            {onLogOut && (
              <button
                onClick={onLogOut}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                title="অ্যাডমিন থেকে লগআউট করুন"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden md:inline">{isBn ? 'লগআউট' : 'Logout'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar and Active View Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block shrink-0">
          <AdminSidebar
            activeTab={activeTab}
            onSelectTab={(tab) => {
              if (tab === 'theme-editor' && onOpenThemeEditor) {
                onOpenThemeEditor();
              } else {
                setActiveTab(tab);
              }
            }}
            pendingOrdersCount={pendingOrdersCount}
            incompleteOrdersCount={incompleteOrdersCount}
            productsCount={productsCount}
            onOpenThemeEditor={onOpenThemeEditor}
            onExit={onExit}
            onLogOut={onLogOut}
            lang={lang}
            onToggleLang={() => setLang(lang === 'en' ? 'bn' : 'en')}
          />
        </aside>

        {/* Mobile Drawer Sidebar */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
              onClick={() => setMobileSidebarOpen(false)} 
            />
            <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10">
              <div className="p-3 border-b border-stone-200 flex items-center justify-between">
                <ManovaLogo size="sm" isDark={false} />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <AdminSidebar
                  activeTab={activeTab}
                  onSelectTab={(tab) => {
                    setMobileSidebarOpen(false);
                    if (tab === 'theme-editor' && onOpenThemeEditor) {
                      onOpenThemeEditor();
                    } else {
                      setActiveTab(tab);
                    }
                  }}
                  pendingOrdersCount={pendingOrdersCount}
                  incompleteOrdersCount={incompleteOrdersCount}
                  productsCount={productsCount}
                  onOpenThemeEditor={onOpenThemeEditor}
                  onExit={onExit}
                  onLogOut={onLogOut}
                  lang={lang}
                  onToggleLang={() => setLang(lang === 'en' ? 'bn' : 'en')}
                />
              </div>
            </div>
          </div>
        )}

        {/* Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Route views based on activeTab */}
          {activeTab === 'dashboard' && (
            <DashboardView
              products={products}
              orders={orders}
              onSelectTab={setActiveTab}
              onOpenAddProduct={() => setActiveTab('products')}
              onOpenThemeEditor={onOpenThemeEditor}
              lang={lang}
            />
          )}

          {activeTab === 'homepage' && currentTheme && onUpdateTheme && (
            <HomepageView
              currentTheme={currentTheme}
              onUpdateTheme={onUpdateTheme}
              onOpenThemeEditor={onOpenThemeEditor}
              lang={lang}
            />
          )}

          {(activeTab === 'orders' || activeTab.startsWith('orders-')) && (
            <OrdersView
              orders={orders}
              incompleteOrders={incompleteOrders}
              activeSubtab={
                activeTab === 'orders-pending' ? 'pending' :
                activeTab === 'orders-shipped' ? 'shipped' :
                activeTab === 'orders-delivered' ? 'delivered' :
                activeTab === 'orders-payment-status' ? 'payment-status' :
                activeTab === 'orders-incomplete' ? 'incomplete' : 'all'
              }
              onUpdateOrderStatus={onUpdateOrderStatus}
              onConvertIncompleteOrder={handleConvertIncompleteOrder}
              lang={lang}
            />
          )}

          {activeTab === 'products' && (
            <ProductsView
              products={products}
              onAddProduct={onAddProduct}
              onUpdateProduct={onUpdateProduct}
              onDeleteProduct={onDeleteProduct}
              lang={lang}
            />
          )}

          {activeTab === 'alt-text' && (
            <AltTextManagerView lang={lang} />
          )}

          {activeTab === 'category' && (
            <CategoryView lang={lang} />
          )}

          {activeTab === 'inventory' && (
            <InventoryView
              products={products}
              onUpdateProduct={onUpdateProduct}
              lang={lang}
            />
          )}

          {activeTab === 'coupons' && (
            <CouponsView
              discounts={discounts}
              onAddDiscount={onAddDiscount}
              onToggleDiscount={onToggleDiscount}
              lang={lang}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersView lang={lang} />
          )}

          {activeTab === 'reviews' && (
            <ReviewsView lang={lang} />
          )}

          {activeTab === 'order-control' && (
            <OrderControlView lang={lang} />
          )}

          {activeTab === 'audit-log' && (
            <AuditLogView lang={lang} />
          )}

          {activeTab === 'finance' && (
            <FinanceView
              totalRevenue={orders.reduce((sum, ord) => sum + (ord.status !== 'Cancelled' ? ord.total : 0), 0)}
              lang={lang}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView lang={lang} />
          )}
        </main>
      </div>
    </div>
  );
};
