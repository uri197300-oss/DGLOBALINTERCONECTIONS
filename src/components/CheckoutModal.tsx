import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  Receipt, 
  Building2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Order, OrderItem, PaymentMethodType } from '../types';

interface CheckoutModalProps {
  items: OrderItem[];
  onClose: () => void;
  onSuccessOrder: (order: Order) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  items,
  onClose,
  onSuccessOrder,
  onClearCart,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('mercado_pago');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('2211790522');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const trackingCode = `MLMX-${Math.floor(1000000000 + Math.random() * 9000000000)}`;

      const newOrder: Order = {
        id: orderId,
        customerName,
        customerEmail,
        date: new Date().toLocaleString('es-MX'),
        total: totalAmount,
        status: 'en_preparacion',
        items,
        paymentMethod,
        trackingNumber: trackingCode,
        shippingAddress: {
          street,
          city,
          state,
          zipCode,
          phone,
        },
        encryptedSignature: `SHA256:${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      };

      setCreatedOrder(newOrder);
      onSuccessOrder(newOrder);
      onClearCart();
      setIsProcessing(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-emerald-700 dark:bg-emerald-950 text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-300" />
            <div>
              <h2 className="font-extrabold text-base leading-tight">Procesamiento de Compra Segura</h2>
              <p className="text-[11px] text-emerald-100">Mercado Pago & Cifrado SSL de Extremo a Extremo</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          
          {createdOrder ? (
            /* Order Receipt View */
            <div className="space-y-6 text-center animate-fadeIn py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">¡Pago Procesado Exitosamente!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Hemos enviado la confirmación encriptada a <strong className="text-slate-800 dark:text-slate-200">{createdOrder.customerEmail}</strong>
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500">Folio de Pedido:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{createdOrder.id}</span>
                </div>

                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500">Número de Guía Mercado Envíos:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{createdOrder.trackingNumber}</span>
                </div>

                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500">Método de Pago:</span>
                  <span className="font-semibold text-slate-900 dark:text-white uppercase">{createdOrder.paymentMethod.replace('_', ' ')}</span>
                </div>

                <div className="flex justify-between pt-1 font-bold text-sm">
                  <span className="text-slate-700 dark:text-slate-300">Monto Total Cifrado:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">${createdOrder.total}.00 MXN</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-300 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4 text-blue-500" />
                <span>Sello Hash: {createdOrder.encryptedSignature.slice(0, 28)}...</span>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg"
              >
                Volver a la Tienda Virtual
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleProcessPayment} className="space-y-6">
              
              {/* Order Summary Box */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Resumen de tu Pedido ({items.length} productos)
                </h3>
                <div className="max-h-28 overflow-y-auto space-y-1.5 text-xs">
                  {items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-slate-700 dark:text-slate-300">
                      <span className="truncate max-w-[280px]">{it.quantity}x {it.title}</span>
                      <span className="font-semibold">${it.price * it.quantity}.00 MXN</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-extrabold text-sm text-slate-900 dark:text-white">
                  <span>Total a Pagar:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">${totalAmount}.00 MXN</span>
                </div>
              </div>

              {/* Multiple Payment Methods Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase mb-2">
                  Selecciona Método de Pago Seguro
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mercado_pago')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'mercado_pago'
                        ? 'bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-700 dark:text-blue-300 shadow-sm ring-2 ring-blue-500'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                    <span>Mercado Pago</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('tarjeta')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'tarjeta'
                        ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-emerald-500" />
                    <span>Tarjetas</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'paypal'
                        ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-500 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Receipt className="w-5 h-5 text-indigo-500" />
                    <span>PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transferencia_spei')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'transferencia_spei'
                        ? 'bg-amber-50 dark:bg-amber-950 border-amber-500 text-amber-800 dark:text-amber-300 ring-2 ring-amber-500'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-amber-500" />
                    <span>SPEI / OXXO</span>
                  </button>

                </div>
              </div>

              {/* Shipping Information Form */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Datos de Envío (Mercado Envíos)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nombre Completo"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />

                  <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Calle, Número y Colonia"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Estado"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Código Postal"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Cifrando Datos y Procesando Transacción...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pagar ${totalAmount}.00 MXN con Protección Mercado Pago</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
