import { editorialSlides } from '../data';
import { Quote, MoveRight, Eye } from 'lucide-react';

export default function EditorialShowcase() {
  return (
    <div className="w-full space-y-16">
      {/* Title block */}
      <div className="border-b border-zinc-900 pb-6">
        <span className="font-mono text-[9px] text-cyan-400 tracking-[0.3em] uppercase block mb-1">EDITORIAL JOURNAL // SERIES:024</span>
        <h2 className="font-sans text-3xl font-extralight tracking-widest text-white uppercase">ACHROMATIC FUTURISM NARRATIVE</h2>
      </div>

      <div className="space-y-24">
        {editorialSlides.map((slide, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
          >
            {/* Visual display screen */}
            <div className="w-full lg:w-1/2 relative group overflow-hidden border border-zinc-900 aspect-[4/3] [clip-path:polygon(0_0,_100%_0,_100%_98%,_0_100%)]">
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover grayscale brightness-40 group-hover:brightness-60 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none"></div>
              
              <div className="absolute top-6 left-6 bg-black/80 px-3 py-1 text-[8px] font-mono tracking-widest text-zinc-500 uppercase border border-zinc-900">
                SCENE // 0{index + 1}
              </div>
            </div>

            {/* Spec / Copy narrative */}
            <div className="w-full lg:w-1/2 space-y-6">
              <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest block font-bold">CHAPTER_0{index + 1}</span>
              <h3 className="font-sans text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-white leading-tight">
                {slide.title}
              </h3>

              <div className="relative pl-6 border-l border-zinc-800 space-y-2">
                <Quote className="absolute -top-1 -left-2 w-4 h-4 text-zinc-700 pointer-events-none stroke-1" />
                <p className="font-serif italic text-zinc-300 text-sm tracking-wide leading-relaxed pl-2 font-light">
                  "{slide.quote}"
                </p>
              </div>

              <p className="text-zinc-500 font-light text-sm tracking-wide leading-relaxed">
                {slide.text}
              </p>

              {/* Decorative detail line */}
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-900">
                <span className="font-mono text-[8px] text-zinc-600 tracking-wider">SEC_0{index + 1}_SPEC.TXT</span>
                <span className="flex-1 h-px bg-zinc-900/60"></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manifesto Block */}
      <div className="p-8 md:p-12 border border-zinc-900 bg-zinc-950/25 relative overflow-hidden flex flex-col items-center justify-center text-center space-y-6">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
        
        <span className="font-mono text-[9px] text-zinc-500 tracking-[0.3em] uppercase block">KAPITAL MANIFIESTO</span>
        <h4 className="font-sans text-lg md:text-xl font-extralight tracking-[0.25em] text-white uppercase max-w-2xl leading-relaxed">
          CONSTRUIR CONTORNOS PARA LA INTERSECCIÓN DE LA ARQUITECTURA URBANA Y EL SILENCIO DIGITAL.
        </h4>
        <p className="text-zinc-500 text-xs font-light max-w-lg leading-relaxed tracking-wide">
          Rechazamos la redundancia visual. Buscamos el peso de la geometría desnuda. Fabricamos exclusivamente bajo demanda limitada para asegurar un balance de residuo cero y máxima relevancia artesanal.
        </p>
        
        <div className="flex gap-4 font-mono text-[8px] text-zinc-600 tracking-widest uppercase">
          <span>MATERIALITY</span>
          <span>•</span>
          <span>SILENCE</span>
          <span>•</span>
          <span>VOID</span>
        </div>
      </div>
    </div>
  );
}
