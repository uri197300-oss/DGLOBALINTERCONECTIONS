import React from 'react';
import { 
  ShoppingBag, 
  Search, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Bell, 
  MessageCircle, 
  User, 
  Lock,
  Tag,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { ADMIN_EMAIL } from '../data/initialData';
import { RegisteredUser } from '../types';
import { LoraudLogo } from './LoraudLogo';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  onOpenChat: () => void;
  unreadNotifications: number;
  onOpenNotifications: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: any) => void;
  onSelectCategory: (cat: string) => void;
  currentUser: RegisteredUser | null;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  isAdmin,
  setIsAdmin,
  cartCount,
  onOpenCart,
  onOpenAdmin,
  onOpenChat,
  unreadNotifications,
  onOpenNotifications,
  searchQuery,
  setSearchQuery,
  onSelectCategory,
  currentUser,
  onOpenAuthModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Top Banner: Mercado Pago Protection & Admin Status */}
      <div className="bg-slate-950 dark:bg-slate-950 text-white text-xs py-1.5 px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              Mercado Pago
            </span>
            <span className="text-slate-300 text-[11px]">Compra Segura & Envíos con Guía Oficial Mercado Envíos</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/522211790522"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold text-[11px] transition-colors"
            >
              <span>📱 WhatsApp: 2211790522</span>
            </a>

            <div className="hidden sm:flex items-center gap-1 text-slate-300 text-[11px]">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>SSL 256-Bit</span>
            </div>

            {/* User Account badge */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-semibold text-slate-200">
                  {currentUser ? currentUser.email : 'Bienvenido a Flor de Aloe'}
                </span>
                <span className="text-[9px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  {isAdmin ? 'Administrador Activo' : currentUser ? 'Cliente Registrado' : 'Tienda Oficial'}
                </span>
              </div>
              <button
                onClick={onOpenAuthModal}
                className="w-7 h-7 rounded-full bg-slate-800 border-2 border-amber-400/80 flex items-center justify-center text-amber-400 font-extrabold text-xs shadow hover:scale-105 transition-transform"
                title={currentUser ? `Usuario: ${currentUser.name}` : "Iniciar Sesión / Registrarse"}
              >
                {currentUser ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectCategory('todos')}>
            <LoraudLogo size="md" />
          </div>

          {/* Search Input Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Buscar pulpa, jugo, sobres viaje, kosher, audífonos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full py-2 pl-10 pr-4 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          </div>

          {/* Navigation Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Toggle for Mobile */}
            <button
              onClick={() => {
                const searchEl = document.getElementById('mobile-search-input');
                if (searchEl) searchEl.focus();
              }}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications Button */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Notificaciones"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Live Chat AI Support Button */}
            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 font-medium text-xs sm:text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Soporte IA</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Login & Profile Button */}
            <button
              onClick={onOpenAuthModal}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                currentUser
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20'
              }`}
              title={currentUser ? `Cuenta: ${currentUser.email}` : "Iniciar Sesión o Registrarse"}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">
                {currentUser ? currentUser.name.split(' ')[0] : 'Iniciar Sesión'}
              </span>
            </button>

            {/* Admin Button - Hidden unless logged in as Admin */}
            {isAdmin && (
              <button
                onClick={onOpenAdmin}
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all bg-slate-900 text-amber-400 border border-amber-400/50 hover:bg-slate-800 shadow-md animate-fadeIn"
              >
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Panel Admin</span>
              </button>
            )}

            {/* Shopping Cart Drawer Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-md shadow-emerald-600/20 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Carrito</span>
              {cartCount > 0 && (
                <span className="bg-white text-emerald-700 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Input */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <input
              id="mobile-search-input"
              type="text"
              placeholder="Buscar pulpa, jugo, sobres viaje..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Quick Category Bar */}
      <div className="bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200/60 dark:border-slate-800 text-xs py-2 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-4 whitespace-nowrap">
          <button 
            onClick={() => onSelectCategory('todos')}
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-medium flex items-center gap-1"
          >
            <span>Todos los artículos</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <button 
            onClick={() => onSelectCategory('aloe_organica')}
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-medium flex items-center gap-1"
          >
            <span className="text-emerald-500">🌿</span> Pulpa Orgánica 750g
          </button>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <button 
            onClick={() => onSelectCategory('sobres_viaje')}
            className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800"
          >
            <Tag className="w-3 h-3 text-amber-500" />
            <span>Sobres de Viaje (Oferta $150 MXN)</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <button 
            onClick={() => onSelectCategory('jugos_bebidas')}
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-medium"
          >
            Jugo 1 Litro (Sin Aloína)
          </button>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <button 
            onClick={() => onSelectCategory('belleza_cuidado')}
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-medium"
          >
            Belleza & Cuidado
          </button>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <button 
            onClick={() => onSelectCategory('electronicos')}
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-medium"
          >
            🎧 Electrónicos & Gamer
          </button>
        </div>
      </div>
    </header>
  );
};
