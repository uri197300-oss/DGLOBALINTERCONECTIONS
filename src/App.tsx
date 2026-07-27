import React, { useState, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  PromotionalBanners 
} from './components/PromotionalBanners';
import { 
  ProductSearchAndFilters 
} from './components/ProductSearchAndFilters';
import { 
  ProductCard 
} from './components/ProductCard';
import { 
  ProductDetailModal 
} from './components/ProductDetailModal';
import { 
  CheckoutModal 
} from './components/CheckoutModal';
import { 
  NotificationSystem 
} from './components/NotificationSystem';
import { 
  LiveChatSupport 
} from './components/LiveChatSupport';
import { 
  AdminDashboard 
} from './components/AdminDashboard';
import {
  ImageEditModal
} from './components/ImageEditModal';
import {
  AuthModal
} from './components/AuthModal';

import { 
  Product, 
  Order, 
  Review, 
  ActivityLog, 
  NotificationAlert, 
  CategoryType, 
  OrderItem, 
  OrderStatus,
  RegisteredUser,
  PromoCampaign
} from './types';

import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_REVIEWS, 
  INITIAL_ACTIVITY_LOGS, 
  INITIAL_NOTIFICATIONS, 
  ADMIN_EMAIL,
  INITIAL_REGISTERED_USERS
} from './data/initialData';

import { 
  ShoppingBag, 
  ShieldCheck, 
  Lock, 
  X, 
  ExternalLink, 
  Award, 
  Truck, 
  CheckCircle2, 
  Sparkles,
  MessageCircle,
  Bell,
  Trash2,
  ChevronRight
} from 'lucide-react';

export default function App() {
  // Application Global States
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Hidden by default; only unlocked upon logging in as admin
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(INITIAL_REGISTERED_USERS);
  const [currentUser, setCurrentUser] = useState<RegisteredUser | null>(null);

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [logs, setLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);
  const [notifications, setNotifications] = useState<NotificationAlert[]>(INITIAL_NOTIFICATIONS);

  // Cart State
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals & Panels State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingImageProduct, setEditingImageProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Auth Handlers
  const handleLoginAdminWithPassword = (password: string): boolean => {
    if (password === 'Donaji18') {
      setIsAdmin(true);
      setCurrentUser(INITIAL_REGISTERED_USERS[0]);
      addActivityLog('AUTENTICACION_ADMIN_EXITO', `Administrador autenticado con éxito`, 'security');
      return true;
    } else {
      addActivityLog('AUTENTICACION_ADMIN_FALLIDA', `Intento fallido de acceso administrador con contraseña incorrecta`, 'security');
      return false;
    }
  };

  const handleLoginUser = (user: RegisteredUser) => {
    setCurrentUser(user);
    if (user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      setIsAdmin(true);
    }
    addActivityLog('INICIO_SESION_USUARIO', `Usuario ${user.name} (${user.email}) ha iniciado sesión`, 'system');
  };

  const handleRegisterUser = (userData: Omit<RegisteredUser, 'id' | 'registeredAt'>): RegisteredUser => {
    const newUser: RegisteredUser = {
      ...userData,
      id: `user-${Date.now()}`,
      registeredAt: new Date().toLocaleString('es-MX')
    };
    setRegisteredUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    if (newUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      setIsAdmin(true);
    }
    addActivityLog('REGISTRO_NUEVO_USUARIO', `Nuevo usuario registrado: ${newUser.name} (${newUser.email}). Suscrito a promociones: ${newUser.receivePromotions ? 'SÍ' : 'NO'}`, 'system');
    return newUser;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    setIsAdminOpen(false);
    addActivityLog('CIERRE_SESION', 'Sesión de usuario o administrador cerrada correctamente', 'security');
  };

  const handleSendPromoBroadcast = (title: string, subject: string, message: string, couponCode?: string) => {
    const newNotif: NotificationAlert = {
      id: `notif-${Date.now()}`,
      type: 'exclusive_promo',
      title: subject,
      message: `${message} ${couponCode ? `¡Usa el cupón ${couponCode}!` : ''}`,
      timestamp: 'Ahora mismo',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    addActivityLog('TRANSMISION_PROMOCIONAL', `Campaña '${title}' enviada a ${registeredUsers.filter(u=>u.receivePromotions).length} usuarios suscritos`, 'system');
  };

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('todos');
  const [maxPrice, setMaxPrice] = useState(500);
  const [onlyKosher, setOnlyKosher] = useState(false);
  const [onlyAloineFree, setOnlyAloineFree] = useState(false);
  const [sortBy, setSortBy] = useState<'relevancia' | 'precio_asc' | 'precio_desc' | 'popularidad'>('relevancia');

  // Dark mode effect on html class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Log action helper
  const addActivityLog = (action: string, details: string, category: 'inventory' | 'order' | 'system' | 'security' = 'system') => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('es-MX'),
      userEmail: ADMIN_EMAIL,
      action,
      ipAddress: '189.203.45.12 (SSL 256-Bit)',
      details,
      category,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((it) => it.productId !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((it) => (it.productId === productId ? { ...it, quantity } : it))
      );
    }
  };

  // Product Admin Actions
  const handleAddProduct = (newProd: Omit<Product, 'id'>) => {
    const created: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [created, ...prev]);
    addActivityLog('PRODUCTO_CREADO', `Creación de producto ${created.title} a $${created.price} MXN`, 'inventory');
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
    addActivityLog('PRODUCTO_ACTUALIZADO', `Modificación en ${updatedProd.title} (Precio $${updatedProd.price} MXN)`, 'inventory');
  };

  const handleDeleteProduct = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    addActivityLog('PRODUCTO_ELIMINADO', `Eliminado del catálogo ID: ${productId} (${prod?.title})`, 'inventory');
  };

  // Order Handlers
  const handleSuccessOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    addActivityLog('PEDIDO_CREADO', `Nuevo pedido #${newOrder.id} por $${newOrder.total} MXN mediante ${newOrder.paymentMethod}`, 'order');
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    addActivityLog('ESTADO_PEDIDO', `Pedido #${orderId} actualizado a estado "${status.toUpperCase()}"`, 'order');
  };

  // Notification Test Alert Trigger
  const handleTriggerTestAlert = () => {
    const newNotif: NotificationAlert = {
      id: `notif-${Date.now()}`,
      type: 'price_drop',
      title: '¡Alerta de Bajada de Precio Exclusiva!',
      message: 'La Pulpa de Aloe Vera Orgánica 750g acaba de bajar de precio. ¡Compra con protección Mercado Pago!',
      timestamp: 'Justo ahora',
      read: false,
      productId: 'prod-1',
      discountPercentage: 15,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Review Handler
  const handleAddReview = (newReview: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const review: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 1,
    };
    setReviews((prev) => [review, ...prev]);
  };

  // Filter & Search Logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.benefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'todos' || p.category === selectedCategory;
    const matchesPrice = p.price <= maxPrice;
    const matchesKosher = !onlyKosher || p.isKosher;
    const matchesAloine = !onlyAloineFree || p.isAloineFree;

    return matchesSearch && matchesCategory && matchesPrice && matchesKosher && matchesAloine;
  }).sort((a, b) => {
    if (sortBy === 'precio_asc') return a.price - b.price;
    if (sortBy === 'precio_desc') return b.price - a.price;
    if (sortBy === 'popularidad') return b.rating - a.rating;
    return 0;
  });

  const cartTotal = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col justify-between">
      
      {/* Header / Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => (isAdmin ? setIsAdminOpen(true) : setIsAuthModalOpen(true))}
        onOpenChat={() => setIsChatOpen(true)}
        unreadNotifications={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat as any)}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        
        {/* Promotional Hero Banner Carousel */}
        <PromotionalBanners onSelectCategory={(cat) => setSelectedCategory(cat as any)} />

        {/* Search & Filter Controls */}
        <ProductSearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          onlyKosher={onlyKosher}
          setOnlyKosher={setOnlyKosher}
          onlyAloineFree={onlyAloineFree}
          setOnlyAloineFree={setOnlyAloineFree}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onResetFilters={() => {
            setSearchQuery('');
            setSelectedCategory('todos');
            setMaxPrice(500);
            setOnlyKosher(false);
            setOnlyAloineFree(false);
            setSortBy('relevancia');
          }}
          totalProductsCount={filteredProducts.length}
        />

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p)}
              onEditImage={(p) => setEditingImageProduct(p)}
              onSubscribePriceDrop={(p) => {
                const newNotif: NotificationAlert = {
                  id: `notif-${Date.now()}`,
                  type: 'price_drop',
                  title: `Alerta Activada para ${p.title}`,
                  message: `Te notificaremos de inmediato cuando ${p.title} presente una bajada de precio o descuento especial.`,
                  timestamp: 'Hace un momento',
                  read: false,
                  productId: p.id,
                };
                setNotifications((prev) => [newNotif, ...prev]);
                setIsNotificationsOpen(true);
              }}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 my-6 p-6">
            <span className="text-4xl">🔍</span>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-3">No se encontraron artículos</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Prueba cambiando la palabra clave de búsqueda o restableciendo los filtros de precio o certificación Kosher.
            </p>
          </div>
        )}

      </main>

      {/* Shopping Cart Drawer Side Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full flex flex-col justify-between shadow-2xl border-l border-slate-200 dark:border-slate-800">
            
            <div className="p-4 bg-emerald-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-200" />
                <h3 className="font-extrabold text-sm">Tu Carrito de Mercado Pago</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full text-emerald-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-3">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-400">Tu carrito está vacío</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block max-w-[180px] truncate">{item.title}</span>
                        <span className="text-emerald-600 font-extrabold">${item.price}.00 MXN</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateCartQuantity(item.productId, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 font-bold flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="font-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateCartQuantity(item.productId, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex justify-between text-sm font-black">
                  <span>Total Pedido:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">${cartTotal}.00 MXN</span>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-sm shadow-lg"
                >
                  Procesar Pago Seguro con Mercado Pago
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Modal Components */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onOpenCheckoutWithItem={(prod) => {
            handleAddToCart(prod);
            setIsCheckoutOpen(true);
          }}
          reviews={reviews}
          onAddReview={handleAddReview}
          onEditImage={(p) => setEditingImageProduct(p)}
          isAdmin={true}
        />
      )}

      {/* Global Image Edit Modal */}
      <ImageEditModal
        product={editingImageProduct}
        isOpen={!!editingImageProduct}
        onClose={() => setEditingImageProduct(null)}
        onSaveImage={(productId, newImageUrl) => {
          const target = products.find((p) => p.id === productId);
          if (target) {
            handleUpdateProduct({
              ...target,
              image: newImageUrl,
            });
            if (selectedProduct?.id === productId) {
              setSelectedProduct({
                ...selectedProduct,
                image: newImageUrl,
              });
            }
          }
        }}
      />

      {isCheckoutOpen && (
        <CheckoutModal
          items={cartItems}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccessOrder={handleSuccessOrder}
          onClearCart={() => setCartItems([])}
        />
      )}

      {isAdminOpen && (
        <AdminDashboard
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          products={products}
          orders={orders}
          logs={logs}
          registeredUsers={registeredUsers}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onSendPromoBroadcast={handleSendPromoBroadcast}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginUser={handleLoginUser}
        onRegisterUser={handleRegisterUser}
        onLoginAdminWithPassword={handleLoginAdminWithPassword}
        onLogout={handleLogout}
        onOpenAdminPanel={() => setIsAdminOpen(true)}
      />

      <NotificationSystem
        notifications={notifications}
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAllRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
        onTriggerTestAlert={handleTriggerTestAlert}
        onSelectProductById={(id) => {
          const found = products.find((p) => p.id === id);
          if (found) setSelectedProduct(found);
          setIsNotificationsOpen(false);
        }}
      />

      <LiveChatSupport
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-950 text-white border-t border-slate-800 pt-8 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌱</span>
              <span className="font-extrabold text-base">Mundo Sábila & Electrónicos</span>
              <span className="bg-yellow-500/20 text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-500/30">
                ML STORE
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Propiedad de URIEL DONAJI LOPEZ RAZO. Tienda virtual oficial especializada en productos de Aloe Vera 100% orgánicos sin aloína ni azúcar añadida, certificación Kosher Pareve y artículos electrónicos gamer.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-yellow-400 text-[11px]">Garantía de Pago y Redirección</h4>
            <p className="text-slate-400 text-[11px]">
              Todas las órdenes se redireccionan directamente a Mercado Libre o se procesan mediante la pasarela segura de Mercado Pago con cifrado SSL de 256 bits.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Compra Protegida Garantizada</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-yellow-400 text-[11px]">Atención & WhatsApp Directo</h4>
            <a
              href="https://wa.me/522211790522"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-colors shadow-md my-1"
            >
              <span>📱 Contactar WhatsApp: 2211790522</span>
            </a>
            <p className="text-slate-400 text-[11px]">
              Envíos diarios a toda la República Mexicana con número de guía oficial Mercado Envíos.
            </p>
          </div>
        </div>

        {/* Bottom protection bar */}
        <div className="bg-slate-900 border-t border-slate-800 px-6 py-2.5 flex flex-wrap items-center justify-between text-[10px] text-slate-400 gap-2">
          <span>© 2026 MUNDO SÁBILA & ELECTRÓNICOS • ML STORE ID: 685476429</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-yellow-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> MERCADO PAGO
            </span>
            <span className="text-slate-400">PAYPAL READY</span>
            <span className="text-emerald-400 font-bold">SSL 256-BIT ENCRYPTED</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
