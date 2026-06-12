import React, { useState } from 'react';
import { Product } from '../types';
import { ShieldCheck, Truck, Sparkles, Check, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailProps {
  product: Product;
  onAddToBag: (product: Product) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetail({
  product,
  onAddToBag,
  allProducts,
  onSelectProduct,
}: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState<'main' | 'detail'>('main');
  const [isAdded, setIsAdded] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.3)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: 'scale(1)',
      transformOrigin: 'center'
    });
  };

  const currentImageUrl = activeImage === 'main' || !product.detailImageUrl 
    ? product.imageUrl 
    : product.detailImageUrl;

  const handleAddClick = () => {
    onAddToBag(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // Find other collections
  const collectionsList = allProducts.filter(p => p.id !== product.id);

  return (
    <div className="w-full">
      {/* Dynamic Product Selector Banner (Stealth Indicator) */}
      <div className="mb-8 border-b border-zinc-900 pb-3 flex justify-between items-center text-xs text-zinc-500 font-mono tracking-wider">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-cyan-400"></span>
          SHOWROOM ACTIVE CATALOG
        </span>
        <div className="flex items-center gap-3">
          {allProducts.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                onSelectProduct(p);
                setActiveImage('main');
              }}
              className={`hover:text-white transition-colors duration-300 ${
                p.id === product.id ? 'text-cyan-400 font-bold underline decoration-purple-500 underline-offset-4' : 'text-zinc-500'
              }`}
            >
              0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-12 items-start">
        {/* LEFT COLUMN: Gallery & Asymmetric Canvas */}
        <div className="w-full xl:w-7/12 flex flex-col gap-4">
          <div className="relative group overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[4/5] [clip-path:polygon(0_0,_100%_0,_100%_98%,_0_100%)] select-none">
            
            {/* Tag Overlay - Authenticity Identifier */}
            <div className="absolute top-6 left-6 z-10 bg-black/80 border border-zinc-800 px-3 py-1.5 text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
              STATUS: SECURED_DESPATCH
            </div>

            {/* Main Image with Zoom effect */}
            <div 
              className="w-full h-full overflow-hidden cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={currentImageUrl}
                alt={product.name}
                style={zoomStyle}
                className="w-full h-full object-cover transition-transform duration-200 ease-out"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* floating iridescent technical badge */}
            <div className="absolute bottom-10 right-0 bg-black/90 border border-zinc-800 px-5 py-4 backdrop-blur-md translate-x-2 group-hover:translate-x-0 transition-transform duration-500 flex flex-col gap-1 z-10 Sharp no-radius">
              <span className="font-mono text-[9px] text-cyan-400 tracking-[0.2em] mb-0.5">AUTH_ID</span>
              <span className="font-sans text-xs tracking-[0.2em] font-medium text-white uppercase">{product.tag}</span>
            </div>

            {/* Quick switcher buttons overlay */}
            {product.detailImageUrl && (
              <div className="absolute bottom-6 left-6 flex gap-2 z-10">
                <button
                  onClick={() => setActiveImage('main')}
                  className={`px-3 py-1 text-[9px] font-mono tracking-wider uppercase border transition-all duration-300 ${
                    activeImage === 'main' 
                      ? 'bg-white text-black border-white' 
                      : 'bg-black/80 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  PREVIEW S_01
                </button>
                <button
                  onClick={() => setActiveImage('detail')}
                  className={`px-3 py-1 text-[9px] font-mono tracking-wider uppercase border transition-all duration-300 ${
                    activeImage === 'detail' 
                      ? 'bg-white text-black border-white' 
                      : 'bg-black/80 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  MACRO DETAIL S_02
                </button>
              </div>
            )}
          </div>

          {/* Interactive Thumbnails Panel */}
          {product.detailImageUrl && (
            <div className="flex gap-4">
              <div 
                className={`flex-1 aspect-[16/10] bg-zinc-950 border overflow-hidden cursor-pointer relative transition-all duration-300 ${
                  activeImage === 'main' ? 'border-cyan-400' : 'border-zinc-900 opacity-60'
                }`}
                onClick={() => setActiveImage('main')}
              >
                <img src={product.imageUrl} className="w-full h-full object-cover" alt="View 1" referrerPolicy="no-referrer" />
                <span className="absolute bottom-2 left-2 bg-black/80 text-[8px] font-mono px-1 border border-zinc-800 text-zinc-400 tracking-widest">FRONT</span>
              </div>
              <div 
                className={`flex-1 aspect-[16/10] bg-zinc-950 border overflow-hidden cursor-pointer relative transition-all duration-300 ${
                  activeImage === 'detail' ? 'border-cyan-400' : 'border-zinc-900 opacity-60'
                }`}
                onClick={() => setActiveImage('detail')}
              >
                <img src={product.detailImageUrl} className="w-full h-full object-cover" alt="View 2" referrerPolicy="no-referrer" />
                <span className="absolute bottom-2 left-2 bg-black/80 text-[8px] font-mono px-1 border border-zinc-800 text-zinc-400 tracking-widest">MACRO TEXTURE</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Technical specs & Checkout buy controls */}
        <div className="w-full xl:w-5/12 flex flex-col justify-start">
          <div className="space-y-6">
            <h2 className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em]">
              Kapital // Technical Headwear
            </h2>
            
            <h1 className="font-sans text-3xl md:text-5xl font-extralight tracking-[0.12em] leading-none text-white uppercase">
              {product.name.split(' ').map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h1>

            <p className="font-sans text-xs tracking-[0.2em] text-zinc-400">
              {product.edition}
            </p>

            <div className="text-3xl font-sans font-thin tracking-wide text-white py-2 border-b border-zinc-900/40">
              ${product.price.toLocaleString('es-CO')}
            </div>

            <p className="text-sm text-zinc-400 font-light leading-relaxed tracking-wide">
              {product.description}
            </p>
          </div>

          {/* Technical Specs Bento Grid */}
          <div className="grid grid-cols-1 gap-4 mt-8 mb-8">
            <div className="border border-zinc-800 p-5 hover:border-zinc-700 transition-colors group duration-300">
              <span className="font-mono text-[9px] text-zinc-500 block mb-1">MATERIAL</span>
              <span className="font-sans text-xs tracking-wider text-white font-medium uppercase">{product.material}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-zinc-800 p-5 hover:border-zinc-700 transition-colors duration-300">
                <span className="font-mono text-[9px] text-zinc-500 block mb-1">CIERRE</span>
                <span className="font-sans text-xs tracking-wider text-white font-medium uppercase">{product.closure}</span>
              </div>
              <div className="border border-zinc-800 p-5 hover:border-zinc-700 transition-colors duration-300">
                <span className="font-mono text-[9px] text-zinc-500 block mb-1">DETALLES</span>
                <span className="font-sans text-xs tracking-wider text-white font-medium uppercase">{product.details}</span>
              </div>
            </div>
          </div>

          {/* Purchase Trigger Button */}
          <div className="space-y-4">
            <button
              onClick={handleAddClick}
              disabled={product.soldOut}
              className={`w-full py-5 border font-sans text-xs font-semibold tracking-[0.25em] uppercase hover:cursor-pointer transition-all duration-500 relative flex items-center justify-center gap-3 ${
                product.soldOut
                  ? 'border-zinc-900 text-zinc-600 cursor-not-allowed bg-transparent'
                  : isAdded
                    ? 'border-green-500 text-green-400 bg-green-500/10'
                    : 'border-white text-white bg-transparent hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]'
              }`}
            >
              {product.soldOut ? (
                'AGOTADO // DROP OUT'
              ) : isAdded ? (
                <>
                  <Check className="w-4 h-4 text-green-400 animate-bounce" />
                  S_01 REGISTRADO EN BOLSA
                </>
              ) : (
                'AÑADIR A LA BOLSA'
              )}
            </button>

            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 px-1">
              <span className="flex items-center gap-1.5 uppercase tracking-widest leading-none">
                <Truck className="w-3.5 h-3.5 text-zinc-400" />
                SHIPS INTERNATIONALLY
              </span>
              <span className="flex items-center gap-1.5 uppercase tracking-widest leading-none">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                SECURE_PAYMENT_V3
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* EDITORIAL BANNER SECTION (Direct Translation from mockup!) */}
      <section className="mt-24 pt-16 border-t border-zinc-900">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-5/12 order-2 lg:order-1 space-y-6">
            <h3 className="font-sans text-2xl md:text-3xl font-light tracking-[0.15em] uppercase text-white leading-tight">
              CRAFTSMANSHIP<br/>OF THE VOID
            </h3>
            
            <p className="text-zinc-500 leading-relaxed font-light text-sm tracking-wide">
              Cada unidad de la serie Cyber-Black ha sido sometida a un riguroso proceso de curaduría técnica. La estructura desestructurada desafía la geometría tradicional, mientras que el acabado mate absorbe la luz ambiente, creando una presencia imponente en entornos de baja luminosidad.
            </p>
            
            <div className="w-16 h-[1px] bg-cyan-400 animate-pulse"></div>
          </div>

          <div className="w-full lg:w-7/12 order-1 lg:order-2">
            <div className="relative group overflow-hidden border border-zinc-900 bg-zinc-950 aspect-[16/9] [clip-path:polygon(0_5%,_100%_0,_100%_100%,_0_95%)]">
              <img
                src={product.detailImageUrl || product.imageUrl}
                alt="Craftsmanship macro detail"
                className="w-full h-full object-cover grayscale brightness-40 group-hover:brightness-60 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none"></div>
              
              <div className="absolute top-6 right-6 font-mono text-[9px] text-zinc-500 tracking-wider">
                MACRO_SPECTROM_2024
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
