import React from 'react';
import { 
  X, 
  Bell, 
  Tag, 
  TrendingDown, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { NotificationAlert } from '../types';

interface NotificationSystemProps {
  notifications: NotificationAlert[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllRead: () => void;
  onTriggerTestAlert: () => void;
  onSelectProductById: (productId: string) => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAllRead,
  onTriggerTestAlert,
  onSelectProductById
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden my-auto max-h-[85vh]">
        
        {/* Drawer Header */}
        <div className="p-4 bg-emerald-700 text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-300 animate-bounce" />
            <div>
              <h3 className="font-bold text-sm">Notificaciones Push en Tiempo Real</h3>
              <p className="text-[10px] text-emerald-100">Alertas de Bajadas de Precio y Promos Exclusivas</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={onTriggerTestAlert}
            className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simular Alerta de Precio</span>
          </button>

          <button
            onClick={onMarkAllRead}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium"
          >
            Marcar leídas
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {notifications.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <Bell className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-400">No hay notificaciones recientes</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  if (notif.productId) onSelectProductById(notif.productId);
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  !notif.read
                    ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-80'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500 text-slate-950 shrink-0 mt-0.5">
                    {notif.type === 'price_drop' ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <Tag className="w-4 h-4" />
                    )}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                      {notif.message}
                    </p>

                    {notif.discountPercentage && (
                      <span className="inline-block bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full mt-1">
                        ¡-{notif.discountPercentage}% de Descuento!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 text-center border-t border-slate-200 dark:border-slate-700">
          Notificaciones activadas mediante Web Push Protocol SSL
        </div>

      </div>
    </div>
  );
};
