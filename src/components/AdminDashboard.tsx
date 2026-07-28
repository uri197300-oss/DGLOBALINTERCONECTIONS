import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Sliders, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  Lock, 
  Users, 
  Search, 
  RefreshCw, 
  Award, 
  ExternalLink,
  Shield,
  Clock,
  DollarSign,
  Camera,
  Upload
} from 'lucide-react';
import { ImageEditModal } from './ImageEditModal';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { Product, Order, ActivityLog, OrderStatus, CategoryType, RegisteredUser, PromoCampaign } from '../types';
import { ADMIN_EMAIL } from '../data/initialData';
import { 
  Send, 
  Mail, 
  Megaphone, 
  Gift, 
  Sparkles, 
  CheckCircle2, 
  KeyRound 
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  logs: ActivityLog[];
  registeredUsers?: RegisteredUser[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;
  onSendPromoBroadcast?: (title: string, subject: string, message: string, couponCode?: string) => void;
  onResetProducts?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  products,
  orders,
  logs,
  registeredUsers = [],
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onSendPromoBroadcast,
  onResetProducts,
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'analytics' | 'logs' | 'users' | 'promotions'>('inventory');

  // Broadcast campaign state
  const [promoTitle, setPromoTitle] = useState('Oferta Especial de Sábila');
  const [promoSubject, setPromoSubject] = useState('🌿 ¡15% de Descuento en Pulpa Orgánica 750g!');
  const [promoMessage, setPromoMessage] = useState('Estimado cliente registrado, aprovecha esta oferta especial para tu salud digestiva. Usa el código SABILA15 al comprar.');
  const [promoCoupon, setPromoCoupon] = useState('SABILA15');
  const [broadcastSentSuccess, setBroadcastSentSuccess] = useState(false);

  // Inventory Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Quick Image Edit Modal State
  const [imageModalProduct, setImageModalProduct] = useState<Product | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(150);
  const [originalPrice, setOriginalPrice] = useState(180);
  const [category, setCategory] = useState<CategoryType>('aloe_organica');
  const [stock, setStock] = useState(50);
  const [image, setImage] = useState('');
  const [mercadoLibreUrl, setMercadoLibreUrl] = useState('https://listado.mercadolibre.com.mx/_CustId_685476429');
  const [isKosher, setIsKosher] = useState(true);
  const [isAloineFree, setIsAloineFree] = useState(true);
  const [description, setDescription] = useState('');
  const [benefitsStr, setBenefitsStr] = useState('');
  const [badgesStr, setBadgesStr] = useState('');
  const [featured, setFeatured] = useState(false);
  const [isSpecialOffer, setIsSpecialOffer] = useState(false);

  const handleSaveProductImage = (productId: string, newImageUrl: string) => {
    const targetProd = products.find((p) => p.id === productId);
    if (targetProd) {
      onUpdateProduct({
        ...targetProd,
        image: newImageUrl,
      });
    }
  };

  const handleFileUploadInForm = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target?.result as string;
      if (res) setImage(res);
    };
    reader.readAsDataURL(file);
  };

  // Search in Orders & Logs
  const [orderSearch, setOrderSearch] = useState('');
  const [logSearch, setLogSearch] = useState('');

  if (!isOpen) return null;

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setTitle('');
    setPrice(150);
    setOriginalPrice(180);
    setCategory('aloe_organica');
    setStock(50);
    setImage('https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800');
    setMercadoLibreUrl('https://listado.mercadolibre.com.mx/_CustId_685476429');
    setIsKosher(true);
    setIsAloineFree(true);
    setDescription('Descripción oficial de producto para Mercado Libre...');
    setBenefitsStr('Sin Aloína, Garantía Mercado Libre, 100% Natural');
    setBadgesStr('Nuevo');
    setFeatured(true);
    setIsSpecialOffer(false);
    setShowProductModal(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setTitle(prod.title);
    setPrice(prod.price);
    setOriginalPrice(prod.originalPrice || prod.price);
    setCategory(prod.category);
    setStock(prod.stock);
    setImage(prod.image);
    setMercadoLibreUrl(prod.mercadoLibreUrl);
    setIsKosher(prod.isKosher);
    setIsAloineFree(prod.isAloineFree);
    setDescription(prod.description || '');
    setBenefitsStr((prod.benefits || []).join(', '));
    setBadgesStr((prod.badges || []).join(', '));
    setFeatured(!!prod.featured);
    setIsSpecialOffer(!!prod.isSpecialOffer);
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const benefitsArray = benefitsStr
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);

    const badgesArray = badgesStr
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        title,
        price,
        originalPrice,
        category,
        stock,
        image,
        mercadoLibreUrl,
        isKosher,
        isAloineFree,
        description,
        benefits: benefitsArray.length > 0 ? benefitsArray : editingProduct.benefits,
        badges: badgesArray.length > 0 ? badgesArray : editingProduct.badges,
        featured,
        isSpecialOffer,
      });
    } else {
      onAddProduct({
        title,
        price,
        originalPrice,
        rating: 5.0,
        reviewsCount: 1,
        category,
        image: image || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
        mercadoLibreUrl: mercadoLibreUrl || 'https://listado.mercadolibre.com.mx/_CustId_685476429',
        stock,
        benefits: benefitsArray.length > 0 ? benefitsArray : ['Sin Aloína', 'Garantía Mercado Libre', '100% Natural'],
        isKosher,
        isAloineFree,
        featured,
        isSpecialOffer,
        badges: badgesArray.length > 0 ? badgesArray : ['Nuevo'],
        description,
        specifications: { 'Garantía': 'Mercado Libre 30 días' },
      });
    }
    setShowProductModal(false);
  };

  // Monthly Sales Chart Mock Data
  const monthlyData = [
    { month: 'Ene', ventas: 34000, pedidos: 180 },
    { month: 'Feb', ventas: 42000, pedidos: 210 },
    { month: 'Mar', ventas: 39000, pedidos: 195 },
    { month: 'Abr', ventas: 51000, pedidos: 260 },
    { month: 'May', ventas: 64000, pedidos: 320 },
    { month: 'Jun', ventas: 58000, pedidos: 290 },
    { month: 'Jul', ventas: 72000, pedidos: 380 },
  ];

  const topProductsData = [
    { name: 'Pulpa 750g', cantidad: 320 },
    { name: 'Sobres Viaje', cantidad: 280 },
    { name: 'Jugo 1 Litro', cantidad: 210 },
    { name: 'Gel Facial', cantidad: 140 },
    { name: 'Audífonos Gamer', cantidad: 95 },
  ];

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.details.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.userEmail.toLowerCase().includes(logSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4 max-h-[95vh] flex flex-col">
        
        {/* Admin Dashboard Banner Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg">Panel de Control Administrador Global</h2>
                <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                  URI Admin
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Usuario activo: <strong className="text-amber-300">{ADMIN_EMAIL}</strong> • Permisos Globales de Configuración y Auditoría
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Controls */}
        <div className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 p-2 overflow-x-auto flex gap-2">
          
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              activeTab === 'inventory'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Gestión de Inventario ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              activeTab === 'orders'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pedidos en Tiempo Real ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              activeTab === 'analytics'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Estadísticas de Ventas</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              activeTab === 'logs'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Logs de Auditoría ({logs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('promotions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              activeTab === 'promotions'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Megaphone className="w-4 h-4 text-amber-500" />
            <span>Enviar Promociones ({registeredUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              activeTab === 'users'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Seguridad & Permisos</span>
          </button>

        </div>

        {/* Tab Content Display */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: INVENTORY MANAGEMENT */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Catálogo Completo de Productos
                  </h3>
                  <p className="text-xs text-slate-500">
                    Administra precios, stock disponible y enlaces de redirección a Mercado Libre
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {onResetProducts && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('¿Deseas restablecer el catálogo de productos a la configuración de fábrica?')) {
                          onResetProducts();
                        }
                      }}
                      className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs px-3 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
                      title="Restablecer a productos iniciales"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Restablecer</span>
                    </button>
                  )}
                  <button
                    onClick={handleOpenAddModal}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Nuevo Producto</span>
                  </button>
                </div>
              </div>

              {/* Products Grid Table */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase text-[11px]">
                      <th className="p-3">Producto</th>
                      <th className="p-3">Categoría</th>
                      <th className="p-3">Precio</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Badges</th>
                      <th className="p-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/40">
                        <td className="p-3 flex items-center gap-2.5">
                          <div 
                            onClick={() => setImageModalProduct(prod)}
                            className="relative w-11 h-11 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 cursor-pointer group shadow-sm flex-shrink-0"
                            title="Haz clic para cambiar foto de producto"
                          >
                            <img src={prod.image} alt={prod.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <Camera className="w-4 h-4 text-yellow-400" />
                            </div>
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block max-w-[240px] truncate">
                              {prod.title}
                            </span>
                            <a
                              href={prod.mercadoLibreUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-amber-600 hover:underline flex items-center gap-0.5"
                            >
                              <span>Link Mercado Libre</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </td>

                        <td className="p-3 text-slate-600 dark:text-slate-300 font-semibold uppercase">
                          {prod.category}
                        </td>

                        <td className="p-3 font-extrabold text-emerald-600 dark:text-emerald-400">
                          ${prod.price}.00 MXN
                        </td>

                        <td className="p-3 font-bold text-slate-800 dark:text-slate-200">
                          {prod.stock} unidades
                        </td>

                        <td className="p-3">
                          <div className="flex gap-1">
                            {prod.isKosher && (
                              <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded">Kosher</span>
                            )}
                            {prod.isAloineFree && (
                              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded">Sin Aloína</span>
                            )}
                          </div>
                        </td>

                        <td className="p-3 flex items-center gap-1.5">
                          <button
                            onClick={() => setImageModalProduct(prod)}
                            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-yellow-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            title="Cambiar Foto de Producto"
                          >
                            <Camera className="w-4 h-4 text-yellow-500" />
                          </button>

                          <button
                            onClick={() => handleOpenEditModal(prod)}
                            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-slate-200 dark:hover:bg-slate-700"
                            title="Editar Datos"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onDeleteProduct(prod.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: REAL-TIME ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Procesamiento de Pedidos en Tiempo Real
                  </h3>
                  <p className="text-xs text-slate-500">
                    Supervisa transacciones Mercado Pago, actualiza estado de envío y guías Mercado Envíos
                  </p>
                </div>

                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Buscar por cliente o folio..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-8 pr-3 text-xs text-slate-900 dark:text-white"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div className="space-y-3">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                      <div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{ord.id}</span>
                        <span className="text-slate-400 text-[11px] ml-2">• {ord.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-600 dark:text-slate-400">Estado:</span>
                        <select
                          value={ord.status}
                          onChange={(e: any) => onUpdateOrderStatus(ord.id, e.target.value)}
                          className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-bold rounded-lg px-2 py-1 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="en_preparacion">En Preparación</option>
                          <option value="enviado">Enviado (Mercado Envíos)</option>
                          <option value="entregado">Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
                      <div>
                        <p><strong>Cliente:</strong> {ord.customerName} ({ord.customerEmail})</p>
                        <p><strong>Dirección:</strong> {ord.shippingAddress.street}, {ord.shippingAddress.city}, {ord.shippingAddress.state} CP {ord.shippingAddress.zipCode}</p>
                        <p className="text-emerald-600 dark:text-emerald-400 font-bold">
                          Guía Mercado Envíos: {ord.trackingNumber}
                        </p>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                        <p className="font-bold text-slate-900 dark:text-white">Artículos Comprados:</p>
                        {ord.items.map((it, i) => (
                          <div key={i} className="flex justify-between text-[11px]">
                            <span>{it.quantity}x {it.title}</span>
                            <span className="font-semibold">${it.price * it.quantity}.00</span>
                          </div>
                        ))}
                        <div className="pt-1 border-t border-slate-200 dark:border-slate-700 font-extrabold text-emerald-600 flex justify-between">
                          <span>Total Pago Protegido:</span>
                          <span>${ord.total}.00 MXN</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SALES ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Estadísticas de Ventas Mensuales
                </h3>
                <p className="text-xs text-slate-500">Métricas acumuladas del servicio Mundo Sábila & Mercado Libre</p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                  <span className="text-xs text-slate-500">Ventas Totales Mensuales</span>
                  <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">$72,000.00 MXN</p>
                  <span className="text-[10px] text-emerald-600 font-bold">+24% vs mes anterior</span>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800">
                  <span className="text-xs text-slate-500">Pedidos Procesados</span>
                  <p className="text-2xl font-black text-amber-700 dark:text-amber-300">380 Pedidos</p>
                  <span className="text-[10px] text-amber-600 font-bold">100% Entregados con Mercado Envíos</span>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800">
                  <span className="text-xs text-slate-500">Ratio Conversión Mercado Pago</span>
                  <p className="text-2xl font-black text-blue-700 dark:text-blue-300">98.4%</p>
                  <span className="text-[10px] text-blue-600 font-bold">Sin contratiempos</span>
                </div>
              </div>

              {/* Monthly Sales Line Chart */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-xs uppercase text-slate-600 dark:text-slate-300">
                  Evolución de Ingresos Mensuales ($ MXN)
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                      <YAxis stroke="#888888" fontSize={12} />
                      <Tooltip />
                      <Line type="monotone" dataKey="ventas" stroke="#059669" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Products Bar Chart */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-xs uppercase text-slate-600 dark:text-slate-300">
                  Productos Más Vendidos (Unidades)
                </h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topProductsData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                      <YAxis stroke="#888888" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="cantidad" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DETAILED AUDIT LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Logs Detallados de Actividad & Auditoría
                  </h3>
                  <p className="text-xs text-slate-500">
                    Registro inalterable de cada operación realizada garantizando la máxima transparencia y trazabilidad
                  </p>
                </div>

                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Buscar en logs..."
                    value={logSearch}
                    onChange={(e) => setLogSearch(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-8 pr-3 text-xs text-slate-900 dark:text-white"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase text-[11px]">
                      <th className="p-3">Fecha y Hora</th>
                      <th className="p-3">Usuario Admin</th>
                      <th className="p-3">Acción</th>
                      <th className="p-3">Dirección IP</th>
                      <th className="p-3">Detalle Operativo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {filteredLogs.map((lg) => (
                      <tr key={lg.id} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/40 font-mono text-[11px]">
                        <td className="p-3 text-slate-500 whitespace-nowrap">{lg.timestamp}</td>
                        <td className="p-3 font-bold text-amber-600 dark:text-amber-400">{lg.userEmail}</td>
                        <td className="p-3">
                          <span className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded font-extrabold text-slate-900 dark:text-white">
                            {lg.action}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500">{lg.ipAddress}</td>
                        <td className="p-3 text-slate-700 dark:text-slate-300 max-w-xs truncate">{lg.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: PROMOTIONS & REGISTERED CUSTOMERS BROADCAST */}
          {activeTab === 'promotions' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-amber-500" />
                    <span>Envío de Promociones e Información a Clientes Registrados</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Transmite boletines de Sábila, avisos de descuentos y cupones promocionales a {registeredUsers.filter(u => u.receivePromotions).length} usuarios suscritos.
                  </p>
                </div>
              </div>

              {/* Broadcast Send Card */}
              <div className="p-5 bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-slate-900/10 rounded-2xl border border-amber-400/40 space-y-4">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Crear Nueva Campaña Promocional Masiva</span>
                </div>

                {broadcastSentSuccess && (
                  <div className="p-3 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>¡Promoción e información enviadas con éxito a todos los usuarios suscritos!</span>
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (onSendPromoBroadcast) {
                      onSendPromoBroadcast(promoTitle, promoSubject, promoMessage, promoCoupon);
                    }
                    setBroadcastSentSuccess(true);
                    setTimeout(() => setBroadcastSentSuccess(false), 4000);
                  }}
                  className="space-y-3 text-xs"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                        Título de la Campaña:
                      </label>
                      <input
                        type="text"
                        value={promoTitle}
                        onChange={(e) => setPromoTitle(e.target.value)}
                        required
                        className="w-full bg-white dark:bg-slate-800 border rounded-xl p-2.5 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                        Asunto del Correo / Mensaje:
                      </label>
                      <input
                        type="text"
                        value={promoSubject}
                        onChange={(e) => setPromoSubject(e.target.value)}
                        required
                        className="w-full bg-white dark:bg-slate-800 border rounded-xl p-2.5 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                        Contenido del Mensaje Informativo o Promoción:
                      </label>
                      <textarea
                        value={promoMessage}
                        onChange={(e) => setPromoMessage(e.target.value)}
                        rows={3}
                        required
                        className="w-full bg-white dark:bg-slate-800 border rounded-xl p-2.5 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                        Código de Cupón (Opcional):
                      </label>
                      <input
                        type="text"
                        value={promoCoupon}
                        onChange={(e) => setPromoCoupon(e.target.value)}
                        placeholder="Ej. SABILA15"
                        className="w-full bg-white dark:bg-slate-800 border rounded-xl p-2.5 font-bold uppercase text-amber-600 dark:text-amber-400"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">Los clientes recibirán este cupón para sus promociones exclusivas.</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 uppercase tracking-wider text-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmitir Promoción a Clientes Registrados</span>
                  </button>
                </form>
              </div>

              {/* Registered Users Table */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Lista de Usuarios Registrados ({registeredUsers.length})
                </h4>

                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto text-xs">
                  <table className="w-full text-left border-collapse min-w-[650px]">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase text-[11px]">
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Correo Electrónico</th>
                        <th className="p-3">Teléfono</th>
                        <th className="p-3">Suscrito Ofertas</th>
                        <th className="p-3">Fecha Registro</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {registeredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/40">
                          <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span className="w-6 h-6 rounded-full bg-amber-400/30 text-amber-600 text-[10px] font-black flex items-center justify-center">
                              {u.name.charAt(0)}
                            </span>
                            <span>{u.name}</span>
                            {u.role === 'admin' && (
                              <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded">ADMIN</span>
                            )}
                          </td>
                          <td className="p-3 text-slate-600 dark:text-slate-300 font-mono">{u.email}</td>
                          <td className="p-3 text-slate-500">{u.phone || 'N/A'}</td>
                          <td className="p-3">
                            {u.receivePromotions ? (
                              <span className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full text-[10px]">
                                Sí (Suscrito)
                              </span>
                            ) : (
                              <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full text-[10px]">
                                No
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-slate-500">{u.registeredAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY & USER PERMISSIONS */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Configuración de Permisos y Cifrado de Datos
                </h3>
                <p className="text-xs text-slate-500">Control estricto para el Administrador Principal (URIEL DONAJI LOPEZ RAZO)</p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/40 p-5 rounded-2xl border border-amber-300 dark:border-amber-800 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Credencial Administrador Asignada: {ADMIN_EMAIL}
                  </h4>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Esta cuenta posee control total sobre el catálogo de productos, modificación de precios, gestión de Mercado Libre, procesamiento de pagos con Mercado Pago y auditoría de seguridad.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold pt-1">
                  <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border text-center">Gestión Inventario: OK</div>
                  <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border text-center">Procesar Pedidos: OK</div>
                  <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border text-center">Estadísticas: OK</div>
                  <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border text-center">Logs Auditoría: OK</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Add / Edit Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {editingProduct ? 'Editar Producto del Catálogo' : 'Agregar Nuevo Producto'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Título del Artículo:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-slate-100 dark:bg-slate-800 border rounded-xl p-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Precio Actual ($ MXN):</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    className="w-full bg-slate-100 dark:bg-slate-800 border rounded-xl p-2.5 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Precio Anterior ($ MXN):</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full bg-slate-100 dark:bg-slate-800 border rounded-xl p-2.5 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Categoría:</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 border rounded-xl p-2.5 text-slate-900 dark:text-white"
                  >
                    <option value="aloe_organica">Pulpa Orgánica 750g</option>
                    <option value="jugos_bebidas">Jugos 1 Litro</option>
                    <option value="sobres_viaje">Sobres de Viaje</option>
                    <option value="belleza_cuidado">Belleza & Cuidado</option>
                    <option value="electronicos">Electrónicos & Gamer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Stock Disponible:</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    required
                    className="w-full bg-slate-100 dark:bg-slate-800 border rounded-xl p-2.5 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Imagen del Producto (URL o Archivo):</label>
                <div className="flex items-center gap-2">
                  {image && (
                    <img src={image} alt="Preview" className="w-10 h-10 rounded-lg object-cover border" />
                  )}
                  <input
                    type="text"
                    value={image}
                    placeholder="https://images.unsplash.com/..."
                    onChange={(e) => setImage(e.target.value)}
                    className="flex-1 bg-slate-100 dark:bg-slate-800 border rounded-xl p-2.5 text-slate-900 dark:text-white"
                  />
                  <label className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold p-2.5 rounded-xl cursor-pointer flex items-center justify-center shrink-0" title="Subir imagen desde equipo">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUploadInForm(file);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Descripción Completa del Producto:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Escribe la descripción detallada del producto..."
                  className="w-full bg-slate-100 dark:bg-slate-800 border rounded-xl p-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Beneficios (separados por comas):</label>
                <input
                  type="text"
                  value={benefitsStr}
                  onChange={(e) => setBenefitsStr(e.target.value)}
                  placeholder="Ej. Sin Aloína, 100% Orgánico, Envío Rápido"
                  className="w-full bg-slate-100 dark:bg-slate-800 border rounded-xl p-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Etiquetas/Badges (separados por comas):</label>
                <input
                  type="text"
                  value={badgesStr}
                  onChange={(e) => setBadgesStr(e.target.value)}
                  placeholder="Ej. Más Vendido, Nuevo, Oferta Especial"
                  className="w-full bg-slate-100 dark:bg-slate-800 border rounded-xl p-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">URL Enlace Mercado Libre:</label>
                <input
                  type="text"
                  value={mercadoLibreUrl}
                  onChange={(e) => setMercadoLibreUrl(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border rounded-xl p-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isKosher}
                    onChange={(e) => setIsKosher(e.target.checked)}
                  />
                  <span>Certificación Kosher</span>
                </label>

                <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAloineFree}
                    onChange={(e) => setIsAloineFree(e.target.checked)}
                  />
                  <span>Sin Aloína</span>
                </label>

                <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                  <span>Destacado en Tienda</span>
                </label>

                <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSpecialOffer}
                    onChange={(e) => setIsSpecialOffer(e.target.checked)}
                  />
                  <span>Oferta Especial</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold px-4 py-2 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Standalone Quick Image Edit Modal */}
      <ImageEditModal
        product={imageModalProduct}
        isOpen={!!imageModalProduct}
        onClose={() => setImageModalProduct(null)}
        onSaveImage={handleSaveProductImage}
      />

    </div>
  );
};
