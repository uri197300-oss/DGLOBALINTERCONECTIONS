import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Check, 
  Award, 
  Truck, 
  Heart, 
  Bell, 
  TrendingDown,
  MessageSquare,
  Camera
} from 'lucide-react';
import { Product, Review } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onOpenCheckoutWithItem: (product: Product) => void;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  onEditImage?: (product: Product) => void;
  isAdmin?: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenCheckoutWithItem,
  reviews,
  onAddReview,
  onEditImage,
  isAdmin,
}) => {
  if (!product) return null;

  const [newRating, setNewRating] = useState(5);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [commentTitle, setCommentTitle] = useState('');
  const [commentText, setCommentText] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const productReviews = reviews.filter((r) => r.productId === product.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !commentText) return;

    onAddReview({
      productId: product.id,
      userName,
      userEmail: userEmail || 'cliente@mundosabila.com',
      rating: newRating,
      title: commentTitle || 'Opinión de Producto',
      comment: commentText,
      verifiedBuyer: true,
      ratingBreakdown: {
        eficiencia: newRating,
        calidad: newRating,
        empaque: 5,
      },
    });

    setCommentTitle('');
    setCommentText('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
              Ficha Técnica Oficial
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">ID: {product.id}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Image & Badges Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  {product.isKosher && (
                    <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 font-extrabold text-xs px-2.5 py-1 rounded shadow">
                      <Award className="w-3.5 h-3.5" /> Certificación Kosher KA
                    </span>
                  )}
                  {product.isAloineFree && (
                    <span className="inline-flex items-center gap-1 bg-emerald-600 text-white font-extrabold text-xs px-2.5 py-1 rounded shadow">
                      <Check className="w-3.5 h-3.5" /> Garantizado Sin Aloína
                    </span>
                  )}
                </div>

                {(isAdmin || onEditImage) && onEditImage && (
                  <button
                    onClick={() => onEditImage(product)}
                    className="absolute bottom-3 right-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-black px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 z-20 transition-transform transform hover:scale-105"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Cambiar Imagen</span>
                  </button>
                )}
              </div>

              {/* Price Drop History Graph Box */}
              {product.priceDropHistory && (
                <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-semibold">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <TrendingDown className="w-4 h-4" />
                      Historial de Bajada de Precio
                    </span>
                    <span className="text-amber-500 font-bold">¡Precio Actual Más Bajo!</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-200 dark:border-slate-700">
                    {product.priceDropHistory.map((h, idx) => (
                      <div key={idx} className="text-center">
                        <span className="block text-slate-400">{h.date.slice(5)}</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">${h.price} MXN</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Information & Buy Column */}
            <div className="md:col-span-7 space-y-5">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {product.rating} / 5.0
                  </span>
                  <span className="text-xs text-slate-500">({product.reviewsCount} opiniones verificadas)</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {product.title}
                </h2>
              </div>

              {/* Price & Guarantee */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">
                      ${product.price}.00 <span className="text-sm font-normal text-slate-500">MXN</span>
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        ${product.originalPrice}.00
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                    Envío gratis disponible con Mercado Pago
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Compra Segura Mercado Pago</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* 6 Basic Benefits */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Beneficios Principales
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={product.mercadoLibreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all text-center"
                >
                  <span>Comprar en Mercado Libre</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => {
                    onAddToCart(product);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar al Carrito</span>
                </button>
              </div>

            </div>

          </div>

          {/* Technical Specifications Table */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              Especificaciones Técnicas
            </h3>
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden text-xs">
              {Object.entries(product.specifications).map(([key, value], idx) => (
                <div
                  key={key}
                  className={`flex justify-between p-3 ${
                    idx % 2 === 0 ? 'bg-white/50 dark:bg-slate-900/50' : ''
                  }`}
                >
                  <span className="font-semibold text-slate-600 dark:text-slate-400">{key}</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                Opiniones de Compradores Verificados
              </h3>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {showReviewForm ? 'Cancelar' : '+ Escribir Opinión'}
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Tu Nombre"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                  />
                  <input
                    type="email"
                    placeholder="Tu Correo Electrónico"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Valoración:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Título breve (ej. Excelente sabor y alivio)"
                  value={commentTitle}
                  onChange={(e) => setCommentTitle(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                />

                <textarea
                  placeholder="Escribe tu comentario detallado..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                />

                <button
                  type="submit"
                  className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Publicar Valoración
                </button>
              </form>
            )}

            {/* List of Reviews */}
            <div className="space-y-3">
              {productReviews.length === 0 ? (
                <p className="text-xs text-slate-400 italic">Sé el primero en dejar una valoración para este producto.</p>
              ) : (
                productReviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{rev.userName}</span>
                        {rev.verifiedBuyer && (
                          <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded font-semibold">
                            Comprador Verificado
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 text-[10px]">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      ))}
                      <span className="font-bold text-slate-800 dark:text-slate-200 ml-1">{rev.title}</span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
