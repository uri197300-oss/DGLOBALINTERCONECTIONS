import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Upload, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Check, 
  RotateCcw, 
  Sparkles, 
  AlertCircle,
  Camera,
  Layers
} from 'lucide-react';
import { Product } from '../types';

interface ImageEditModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveImage: (productId: string, newImageUrl: string) => void;
}

// Curated high quality presets for Aloe & Tech store
const PRESET_GALLERY = [
  {
    category: 'Sábila & Pulpa',
    items: [
      { name: 'Pulpa Frasco Cristal', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800' },
      { name: 'Sobres de Viaje', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800' },
      { name: 'Planta Aloe Fresca', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800' },
      { name: 'Jugo Verde Natural', url: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b7?auto=format&fit=crop&q=80&w=800' },
      { name: 'Gel Humectante Orgánico', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800' },
      { name: 'Crema Facial Dermocosmética', url: 'https://images.unsplash.com/photo-1608248597261-e4d0947c6b1e?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    category: 'Electrónicos & Gadgets',
    items: [
      { name: 'Audífonos Gamer Inalámbricos', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800' },
      { name: 'Earbuds Bluetooth', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800' },
      { name: 'Smartwatch Deportivo', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800' },
      { name: 'Teclado Mecánico RGB', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800' },
      { name: 'Bocina Bluetooth Portátil', url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800' }
    ]
  }
];

export const ImageEditModal: React.FC<ImageEditModalProps> = ({
  product,
  isOpen,
  onClose,
  onSaveImage,
}) => {
  if (!isOpen || !product) return null;

  const [imageUrl, setImageUrl] = useState<string>(product.image);
  const [selectedTab, setSelectedTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [urlInput, setUrlInput] = useState<string>(product.image);
  const [imageError, setImageError] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImageUrl(product.image);
    setUrlInput(product.image);
    setImageError(false);
  }, [product]);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setImageUrl(urlInput.trim());
    setImageError(false);
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, WEBP, GIF).');
      return;
    }

    // Limit file size to 8MB
    if (file.size > 8 * 1024 * 1024) {
      alert('El archivo es demasiado grande (máximo 8MB).');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setImageUrl(result);
        setUrlInput(result);
        setImageError(false);
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert('Error al leer el archivo de imagen.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSave = () => {
    if (!imageUrl) return;
    onSaveImage(product.id, imageUrl);
    onClose();
  };

  const handleResetToDefault = () => {
    setImageUrl(product.image);
    setUrlInput(product.image);
    setImageError(false);
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-yellow-500 text-slate-950 flex items-center justify-center font-bold">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white">Editar Fotografía de Producto</h3>
              <p className="text-[11px] text-slate-300">
                {product.title} • ID: <span className="font-mono text-yellow-400">{product.id}</span>
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

        {/* Content Body */}
        <div className="p-5 space-y-5">
          
          {/* Main Grid: Preview vs Editor Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
            
            {/* Live Image Preview Card */}
            <div className="sm:col-span-5 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Vista Previa de la Fotografía
              </span>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center group shadow-inner">
                {imageUrl && !imageError ? (
                  <img
                    src={imageUrl}
                    alt={product.title}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="p-4 text-center space-y-2 text-slate-400">
                    <AlertCircle className="w-8 h-8 mx-auto text-red-500" />
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {imageError ? 'No se pudo cargar la imagen' : 'Sin imagen seleccionada'}
                    </p>
                    <p className="text-[10px] text-slate-400">Verifica la URL o sube una foto en PNG/JPG.</p>
                  </div>
                )}

                {/* Badge Overlay */}
                <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                  HD Image
                </div>
              </div>

              {/* Reset image button */}
              {imageUrl !== product.image && (
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="w-full text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center gap-1 py-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restaurar foto original</span>
                </button>
              )}
            </div>

            {/* Right Editor Modes */}
            <div className="sm:col-span-7 space-y-3">
              
              {/* Tab navigation for method */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1 border border-slate-200 dark:border-slate-700 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedTab('upload')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
                    selectedTab === 'upload'
                      ? 'bg-white dark:bg-slate-900 text-yellow-600 dark:text-yellow-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir Archivo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTab('url')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
                    selectedTab === 'url'
                      ? 'bg-white dark:bg-slate-900 text-yellow-600 dark:text-yellow-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Enlace Web</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTab('presets')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
                    selectedTab === 'presets'
                      ? 'bg-white dark:bg-slate-900 text-yellow-600 dark:text-yellow-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Galería Stock</span>
                </button>
              </div>

              {/* Mode 1: Local File Upload */}
              {selectedTab === 'upload' && (
                <div className="space-y-3 text-xs">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                      dragActive
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-slate-300 dark:border-slate-700 hover:border-yellow-500/60 bg-slate-50 dark:bg-slate-800/40'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 mx-auto flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">
                      Arrastra y suelta tu imagen aquí
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      o haz clic para explorar tus archivos (JPG, PNG, WEBP max 8MB)
                    </p>
                  </div>

                  {isUploading && (
                    <div className="p-2 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-lg text-center font-bold animate-pulse">
                      Cargando imagen...
                    </div>
                  )}
                </div>
              )}

              {/* Mode 2: Direct Web URL Input */}
              {selectedTab === 'url' && (
                <form onSubmit={handleUrlSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                      Dirección URL de la Imagen:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://ejemplo.com/mi-imagen.jpg"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-2.5 rounded-xl text-xs flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Aplicar</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Puedes pegar enlaces directos de fotos alojadas en Unsplash, Mercado Libre, Imgur o tu servidor propio.
                  </p>
                </form>
              )}

              {/* Mode 3: Curated Gallery Presets */}
              {selectedTab === 'presets' && (
                <div className="space-y-3 text-xs max-h-56 overflow-y-auto pr-1">
                  {PRESET_GALLERY.map((group, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <span className="font-extrabold text-[10px] uppercase tracking-wider text-slate-400 block">
                        {group.category}
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {group.items.map((item, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setImageUrl(item.url);
                              setUrlInput(item.url);
                              setImageError(false);
                            }}
                            className={`cursor-pointer rounded-xl overflow-hidden border-2 relative aspect-square group shadow-sm transition-all ${
                              imageUrl === item.url
                                ? 'border-yellow-500 ring-2 ring-yellow-500/40'
                                : 'border-slate-200 dark:border-slate-700 hover:border-yellow-400'
                            }`}
                          >
                            <img
                              src={item.url}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-1 flex items-end">
                              <span className="text-[9px] text-white font-bold line-clamp-1 leading-tight">
                                {item.name}
                              </span>
                            </div>
                            {imageUrl === item.url && (
                              <div className="absolute top-1 right-1 bg-yellow-500 text-slate-950 rounded-full p-0.5 shadow">
                                <Check className="w-3 h-3 font-bold" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            <span>Los cambios se verán inmediatamente en la tienda</span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-black rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 uppercase tracking-wider shadow-md transition-all"
            >
              Guardar Imagen
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
