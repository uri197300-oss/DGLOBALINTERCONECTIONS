import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound, 
  Send, 
  Gift, 
  LogOut, 
  Sliders 
} from 'lucide-react';
import { RegisteredUser } from '../types';
import { ADMIN_EMAIL } from '../data/initialData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: RegisteredUser | null;
  onLoginUser: (user: RegisteredUser) => void;
  onRegisterUser: (user: Omit<RegisteredUser, 'id' | 'registeredAt'>) => RegisteredUser;
  onLoginAdminWithPassword: (password: string) => boolean;
  onLogout: () => void;
  onOpenAdminPanel: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginUser,
  onRegisterUser,
  onLoginAdminWithPassword,
  onLogout,
  onOpenAdminPanel
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [receivePromotions, setReceivePromotions] = useState(true);

  // Error & Status Messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const isEmailAdmin = email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email) {
      setErrorMessage('Por favor ingresa tu correo electrónico.');
      return;
    }

    // Check if user is attempting Admin login
    if (isEmailAdmin) {
      if (!password) {
        setErrorMessage('Ingresa tu contraseña de acceso.');
        return;
      }

      const isValid = onLoginAdminWithPassword(password);
      if (isValid) {
        setSuccessMessage('¡Acceso concedido! Administrador autenticado correctamente.');
        setTimeout(() => {
          onClose();
          onOpenAdminPanel();
        }, 600);
      } else {
        setErrorMessage('Contraseña de administrador incorrecta.');
      }
      return;
    }

    // Normal Customer Login
    const existingUser: RegisteredUser = {
      id: `user-${Date.now()}`,
      name: name || email.split('@')[0],
      email: email.trim(),
      phone,
      role: 'customer',
      receivePromotions,
      registeredAt: new Date().toLocaleString('es-MX')
    };

    onLoginUser(existingUser);
    setSuccessMessage(`¡Bienvenido de nuevo, ${existingUser.name}!`);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !name) {
      setErrorMessage('Por favor completa tu nombre y correo electrónico.');
      return;
    }

    const newUser = onRegisterUser({
      name,
      email: email.trim(),
      phone,
      role: isEmailAdmin ? 'admin' : 'customer',
      receivePromotions
    });

    setSuccessMessage(`¡Registro completado! Te hemos suscrito para recibir boletines y promociones especiales.`);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base">
                {currentUser ? 'Perfil de Usuario Registrado' : 'Inicio de Sesión & Registro'}
              </h2>
              <p className="text-[11px] text-amber-300">
                {currentUser ? 'Promociones & Preferencias' : 'Recibe ofertas exclusivas e información de Sábila'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If user is ALREADY logged in */}
        {currentUser ? (
          <div className="p-6 space-y-5 text-slate-900 dark:text-white text-xs">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-0.5 rounded-full">
                  {currentUser.role === 'admin' ? '⚡ ADMINISTRADOR PRINCIPAL' : '✨ CLIENTE REGISTRADO'}
                </span>
                <span className="text-[10px] text-slate-500">
                  Suscrito a Promociones: {currentUser.receivePromotions ? 'SÍ' : 'NO'}
                </span>
              </div>

              <h3 className="font-black text-base text-slate-900 dark:text-white">
                {currentUser.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-500" />
                <span>{currentUser.email}</span>
              </p>
              {currentUser.phone && (
                <p className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{currentUser.phone}</span>
                </p>
              )}
            </div>

            {/* Coupons & Promo Perks */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-300">
                <Gift className="w-4 h-4 text-amber-500" />
                <span>Tus Cupones de Descuento Exclusivos:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-300 dark:border-amber-700 text-center">
                  <span className="block font-black text-amber-600 dark:text-amber-400 text-xs">SABILA10</span>
                  <span className="text-[9px] text-slate-500">10% OFF en Pulpa 750g</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-300 dark:border-amber-700 text-center">
                  <span className="block font-black text-amber-600 dark:text-amber-400 text-xs">MUNDOSABILA2026</span>
                  <span className="text-[9px] text-slate-500">Envío Gratis Mercado Pago</span>
                </div>
              </div>
            </div>

            {/* Admin shortcut if admin */}
            {currentUser.role === 'admin' && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAdminPanel();
                }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-xs uppercase tracking-wider"
              >
                <Sliders className="w-4 h-4" />
                <span>ABRIR PANEL ADMINISTRADOR GLOBAL</span>
              </button>
            )}

            {/* Logout Button */}
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-red-600 dark:text-red-400 font-bold py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        ) : (
          /* LOGIN OR REGISTER TABS */
          <div className="p-6 space-y-4">
            
            {/* Tabs selector */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-bold">
              <button
                onClick={() => {
                  setActiveTab('login');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  activeTab === 'login'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => {
                  setActiveTab('register');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  activeTab === 'register'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Registrarse (Ofertas)
              </button>
            </div>

            {/* Error & Success Alerts */}
            {errorMessage && (
              <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-2xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-2xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* FORM: INICIAR SESIÓN */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Correo Electrónico:
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      required
                      className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl py-2.5 pl-9 pr-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* Password input */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Contraseña:
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required={isEmailAdmin}
                      className={`w-full bg-slate-100 dark:bg-slate-800 border rounded-2xl py-2.5 pl-9 pr-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                        isEmailAdmin ? 'border-amber-400 focus:ring-amber-500 font-extrabold' : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500'
                      }`}
                    />
                    <Lock className={`w-4 h-4 absolute left-3 top-3 ${isEmailAdmin ? 'text-amber-500' : 'text-slate-400'}`} />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full font-extrabold py-3 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                    isEmailAdmin
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 uppercase tracking-wider shadow-amber-500/20'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>{isEmailAdmin ? 'Ingresar como Administrador' : 'Iniciar Sesión'}</span>
                </button>
              </form>
            )}

            {/* FORM: REGISTRARSE */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nombre Completo:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. María López"
                      required
                      className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl py-2.5 pl-9 pr-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Correo Electrónico:
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu-correo@ejemplo.com"
                      required
                      className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl py-2.5 pl-9 pr-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Teléfono / WhatsApp (Opcional):
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="2211790522"
                      className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl py-2.5 pl-9 pr-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* Promotions Subscription Checkbox */}
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl space-y-1">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={receivePromotions}
                      onChange={(e) => setReceivePromotions(e.target.checked)}
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                      Deseo recibir información, boletines sobre beneficios del Aloe Vera y promociones con descuentos exclusivos por correo electrónico y WhatsApp.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Crear Cuenta & Recibir Promociones</span>
                </button>
              </form>
            )}

            <div className="pt-2 text-center text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                Tus datos están protegidos con cifrado de extremo a extremo.
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
