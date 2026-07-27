import React from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Award, 
  Check, 
  RotateCcw,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { CategoryType } from '../types';

interface ProductSearchAndFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (cat: CategoryType) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  onlyKosher: boolean;
  setOnlyKosher: (val: boolean) => void;
  onlyAloineFree: boolean;
  setOnlyAloineFree: (val: boolean) => void;
  sortBy: 'relevancia' | 'precio_asc' | 'precio_desc' | 'popularidad';
  setSortBy: (sort: 'relevancia' | 'precio_asc' | 'precio_desc' | 'popularidad') => void;
  onResetFilters: () => void;
  totalProductsCount: number;
}

export const ProductSearchAndFilters: React.FC<ProductSearchAndFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  onlyKosher,
  setOnlyKosher,
  onlyAloineFree,
  setOnlyAloineFree,
  sortBy,
  setSortBy,
  onResetFilters,
  totalProductsCount,
}) => {
  const categories: { id: CategoryType; label: string; icon: string }[] = [
    { id: 'todos', label: 'Todos', icon: '🛒' },
    { id: 'aloe_organica', label: 'Pulpa Orgánica 750g', icon: '🌱' },
    { id: 'jugos_bebidas', label: 'Jugos 1 Litro', icon: '🥤' },
    { id: 'sobres_viaje', label: 'Sobres de Viaje', icon: '✈️' },
    { id: 'belleza_cuidado', label: 'Belleza & Cuidado', icon: '✨' },
    { id: 'electronicos', label: 'Electrónicos & Gamer', icon: '🎧' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm mb-6 space-y-4 transition-colors">
      
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100 dark:border-slate-800">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Filter Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        
        {/* Checkbox Toggles: Kosher & Sin Aloína */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 select-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <input
              type="checkbox"
              checked={onlyKosher}
              onChange={(e) => setOnlyKosher(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
            />
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Certificado Kosher
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 select-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <input
              type="checkbox"
              checked={onlyAloineFree}
              onChange={(e) => setOnlyAloineFree(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
            />
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
              <Check className="w-3.5 h-3.5" />
              Garantizado Sin Aloína
            </span>
          </label>
        </div>

        {/* Price Filter Slider & Sorting */}
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Price Range */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
            <span>Precio Max:</span>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 sm:w-32 accent-emerald-600 cursor-pointer"
            />
            <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              ${maxPrice} MXN
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="relevancia">Relevancia</option>
              <option value="popularidad">Mayor Popularidad / Rating</option>
              <option value="precio_asc">Precio: Menor a Mayor</option>
              <option value="precio_desc">Precio: Mayor a Menor</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(searchQuery || selectedCategory !== 'todos' || maxPrice < 500 || onlyKosher || onlyAloineFree) && (
            <button
              onClick={onResetFilters}
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Restablecer filtros"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
        <span>Mostrando <strong className="text-slate-900 dark:text-white font-bold">{totalProductsCount}</strong> artículos encontrados</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-medium">⚡ Envíos garantizados por Mercado Envíos</span>
      </div>
    </div>
  );
};
