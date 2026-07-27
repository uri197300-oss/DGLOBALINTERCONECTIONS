import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Tag, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Flame,
  Award,
  HeartHandshake
} from 'lucide-react';

import bannerPulpaImg from '../assets/images/banner_pulpa_aloe_1785081969530.jpg';
import bannerJugoImg from '../assets/images/banner_jugo_aloe_1785081987333.jpg';
import bannerEnviosImg from '../assets/images/banner_envios_rep_1785082003795.jpg';
import bannerCertificImg from '../assets/images/banner_certifica_1785082026634.jpg';

interface PromotionalBannersProps {
  onSelectCategory: (category: string) => void;
}

export const PromotionalBanners: React.FC<PromotionalBannersProps> = ({ onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      id: 0,
      badge: 'PROMO DESTACADA • 100% ORGANICA',
      title: 'PULPA DE ALOE VERA NATURAL 750G',
      price: '$155 MXN',
      subtitle: 'Es la carnita de la sábila 100% natural, comestible y untable. Sin aloína ni azúcar añadida.',
      image: bannerPulpaImg,
      category: 'aloe_organica',
      buttonText: 'VER PULPA 750G',
      mercadoLibreUrl: 'https://listado.mercadolibre.com.mx/_CustId_685476429?item_id=MLM5555376688',
      highlights: ['750 gr', 'Sin Aloína', 'Comestible y Untable', 'Certificado Kosher']
    },
    {
      id: 1,
      badge: 'OFERTA ESPECIAL • CONSUMO DIARIO',
      title: 'JUGO 100% NATURAL DE ALOE VERA 1 LT',
      price: '$145 MXN',
      subtitle: 'Nuestro mejor aliado diario para la salud digestiva. Sin azúcar añadida, sin gluten y sin sodio.',
      image: bannerJugoImg,
      category: 'jugos_bebidas',
      buttonText: 'VER JUGO 1 LITRO',
      mercadoLibreUrl: 'https://listado.mercadolibre.com.mx/_CustId_685476429?item_id=MLM5555376688',
      highlights: ['1 Litro', 'Sin Azúcar', 'Sin Gluten', 'Complejo B, A y C']
    },
    {
      id: 2,
      badge: 'LOGÍSTICA NACIONAL • COBERURA TOTAL',
      title: 'ENVÍOS A TODA LA REPÚBLICA MEXICANA',
      price: 'MERCADO ENVÍOS',
      subtitle: 'Despacho directo desde nuestro centro de distribución. Guía de rastreo y compra garantizada.',
      image: bannerEnviosImg,
      category: 'todos',
      buttonText: 'VER CATÁLOGO COMPLETO',
      mercadoLibreUrl: 'https://listado.mercadolibre.com.mx/_CustId_685476429',
      highlights: ['Almacén Flor de Aloe', 'Empaque Seguro', 'Garantía Mercado Pago', 'Rastreo 24/7']
    },
    {
      id: 3,
      badge: 'Garantía de Calidad y Nutrición',
      title: 'CERTIFICACIÓN KOSHER PAREVE & CERTIMEX',
      price: '100% PURA',
      subtitle: 'Nutrición directa que viene de la tierra. Elimina la acidez, gastritis y reflujo de forma natural.',
      image: bannerCertificImg,
      category: 'aloe_organica',
      buttonText: 'CONOCER BENEFICIOS',
      mercadoLibreUrl: 'https://listado.mercadolibre.com.mx/_CustId_685476429',
      highlights: ['Sello KA Kosher', 'Sin Aloína', 'Rico en Calcio y Zinc', 'Ecológico']
    }
  ];

  const current = slides[currentSlide];

  return (
    <div className="space-y-6 mb-8">
      {/* Main Hero Slider Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-400 via-yellow-500 to-emerald-500 text-slate-950 rounded-3xl shadow-2xl border border-yellow-300/40">
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 md:p-10 items-center min-h-[380px]">
          <div className="md:col-span-7 space-y-4 animate-fadeIn">
            <span className="bg-slate-950 text-amber-400 text-[11px] font-black px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 uppercase tracking-wider shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>{current.badge}</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 leading-none tracking-tight drop-shadow-sm">
              {current.title}
            </h1>

            <p className="text-slate-900 font-semibold max-w-lg text-sm sm:text-base leading-relaxed">
              {current.subtitle}
            </p>

            {/* Highlights Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {current.highlights.map((h, i) => (
                <span key={i} className="bg-slate-950/90 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-amber-400" />
                  <span>{h}</span>
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href={current.mercadoLibreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-amber-400 font-black px-6 py-3 rounded-2xl text-xs shadow-2xl uppercase tracking-wider transition-all transform hover:-translate-y-0.5"
              >
                <span>COMPRAR CON GARANTÍA</span>
                <ExternalLink className="w-4 h-4 text-amber-400" />
              </a>

              <button
                onClick={() => onSelectCategory(current.category)}
                className="inline-flex items-center gap-1.5 bg-white/60 hover:bg-white/80 text-slate-950 font-extrabold px-5 py-3 rounded-2xl text-xs transition-all border border-slate-900/20 shadow-sm"
              >
                <span>{current.buttonText}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Banner Featured Image Display */}
          <div className="md:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm aspect-16/10 sm:aspect-16/9 rounded-2xl overflow-hidden border-4 border-white/80 shadow-2xl bg-slate-950 group">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-slate-950 text-amber-400 font-black px-3 py-1 rounded-xl shadow-lg text-xs uppercase tracking-widest border border-amber-400/30">
                {current.price}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Light Glows */}
        <div className="absolute right-[-40px] top-[-40px] w-72 h-72 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Carousel Dots & Controls */}
        <div className="absolute bottom-4 right-6 flex items-center gap-2 z-10">
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="p-1.5 rounded-full bg-slate-950/60 hover:bg-slate-950 text-amber-400 transition-colors shadow-md"
            title="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex gap-1.5 px-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  currentSlide === idx ? 'w-8 bg-slate-950' : 'w-2.5 bg-slate-950/40'
                }`}
                title={`Banner ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="p-1.5 rounded-full bg-slate-950/60 hover:bg-slate-950 text-amber-400 transition-colors shadow-md"
            title="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Grid of Promotional Image Cards (Publicidad Oficial) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Pulpa 750g */}
        <div 
          onClick={() => onSelectCategory('aloe_organica')}
          className="group relative bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div className="aspect-16/10 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 mb-3 relative">
            <img 
              src={bannerPulpaImg} 
              alt="Pulpa de Aloe Vera 750g" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 left-2 bg-emerald-600 text-white font-black text-[10px] px-2 py-0.5 rounded-lg shadow uppercase">
              $155 MXN
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">100% PULPA NATURAL</span>
            <h3 className="font-black text-slate-900 dark:text-white text-sm leading-tight group-hover:text-emerald-600 transition-colors">
              Pulpa Orgánica 750g (Carnita de Sábila)
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Comestible y untable para ensaladas, frutas y licuados. Certificado Kosher.
            </p>
          </div>
        </div>

        {/* Card 2: Jugo 1Lt */}
        <div 
          onClick={() => onSelectCategory('jugos_bebidas')}
          className="group relative bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div className="aspect-16/10 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 mb-3 relative">
            <img 
              src={bannerJugoImg} 
              alt="Jugo de Sábila 1 Litro" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-lg shadow uppercase">
              $145 MXN
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">1 LITRO DE JUGO</span>
            <h3 className="font-black text-slate-900 dark:text-white text-sm leading-tight group-hover:text-emerald-600 transition-colors">
              Jugo de Sábila 100% Sabor Natural
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Sin azúcar añadida, sin gluten y sin sodio. Aliado diario para la colitis y gastritis.
            </p>
          </div>
        </div>

        {/* Card 3: Envíos */}
        <div 
          onClick={() => onSelectCategory('todos')}
          className="group relative bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div className="aspect-16/10 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 mb-3 relative">
            <img 
              src={bannerEnviosImg} 
              alt="Envíos a toda la república" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 left-2 bg-slate-900 text-amber-400 font-black text-[10px] px-2 py-0.5 rounded-lg shadow uppercase">
              MERCADO ENVÍOS
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">DISTRIBUCIÓN DIRECTA</span>
            <h3 className="font-black text-slate-900 dark:text-white text-sm leading-tight group-hover:text-blue-600 transition-colors">
              Envíos a Toda la República Mexicana
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Empaque hermético y entrega rápida garantizada con la protección de Mercado Pago.
            </p>
          </div>
        </div>

        {/* Card 4: Certificaciones */}
        <div 
          onClick={() => onSelectCategory('aloe_organica')}
          className="group relative bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div className="aspect-16/10 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 mb-3 relative">
            <img 
              src={bannerCertificImg} 
              alt="Certificaciones Kosher y Certimex" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 left-2 bg-purple-700 text-white font-black text-[10px] px-2 py-0.5 rounded-lg shadow uppercase">
              KOSHER PAREVE
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">CALIDAD CERTIFICADA</span>
            <h3 className="font-black text-slate-900 dark:text-white text-sm leading-tight group-hover:text-purple-600 transition-colors">
              Certificación Kosher KA & Certimex
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Garantía de ingredientes 100% naturales, libres de aloína y elaborados con procesos ecológicos.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

