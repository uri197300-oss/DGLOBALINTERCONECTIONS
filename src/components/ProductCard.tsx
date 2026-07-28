import React from 'react';
import { 
  Star, 
  ExternalLink, 
  ShoppingBag, 
  Award, 
  Check, 
  ShieldCheck, 
  Eye, 
  Bell, 
  TrendingDown,
  Camera
} from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onSubscribePriceDrop: (product: Product) => void;
  onEditImage?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onSubscribePriceDrop,
  onEditImage
}) => {
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 overflow-hidden shadow-sm hover:shadow-xl hover:border-yellow-500/50 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Media Container */}
      <div className="relative h-36 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isKosher && (
            <span className="inline-flex items-center gap-1 bg-yellow-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded shadow uppercase">
              <Award className="w-2.5 h-2.5" /> KOSHER
            </span>
          )}
          {product.isAloineFree && (
            <span className="inline-flex items-center gap-1 bg-emerald-600 text-white font-bold text-[9px] px-1.5 py-0.5 rounded shadow uppercase">
              <Check className="w-2.5 h-2.5" /> SIN ALOÍNA
            </span>
          )}
        </div>

        {discountPercent > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white font-black text-[9px] px-1.5 py-0.5 rounded shadow uppercase tracking-wider">
            {discountPercent}% OFF
          </div>
        )}

        {/* Quick Actions on Hover */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
          {onEditImage && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditImage(product);
              }}
              className="bg-yellow-500 text-slate-950 text-[11px] font-bold px-2.5 py-1.5 rounded-lg shadow-lg flex items-center gap-1 hover:bg-yellow-400 transition-colors"
              title="Cambiar imagen de producto"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Foto</span>
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1 hover:bg-yellow-500 hover:text-slate-950 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ficha Técnica</span>
          </button>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="mt-2.5 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Rating & Mercado Pago Badge */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
            <div className="flex items-center gap-1 font-semibold text-yellow-500">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500 font-mono text-[10px]">({product.reviewsCount})</span>
            </div>

            <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5 uppercase tracking-tight">
              <ShieldCheck className="w-3 h-3" /> Mercado Pago
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-snug cursor-pointer group-hover:text-yellow-500 transition-colors line-clamp-1"
          >
            {product.title}
          </h3>

          {/* Benefits Bullet Summary */}
          <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
            {product.benefits[0] || '100% Aloe Vera Natural Orgánico'}
          </p>
        </div>

        {/* Pricing & Call to Actions */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-[11px] text-slate-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onSubscribePriceDrop(product)}
              className="p-1 rounded text-slate-400 hover:text-yellow-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Recibir alerta de bajada de precio"
            >
              <Bell className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Direct Mercado Libre Redirect Button */}
          <div>
            <a
              href={product.mercadoLibreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black py-2 px-3 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-yellow-500/20 transition-all hover:scale-[1.02]"
            >
              <span>Comprar en Mercado Libre</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
