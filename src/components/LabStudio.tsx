import React, { useState } from 'react';
import { CustomCap } from '../types';
import { Sparkles, ShoppingBag, ShieldCheck, Cpu, RefreshCw, PenTool } from 'lucide-react';

interface LabStudioProps {
  onAddCustomCap: (cap: CustomCap) => void;
}

export default function LabStudio({ onAddCustomCap }: LabStudioProps) {
  const [baseType, setBaseType] = useState<'SNAPBACK' | 'DAD_HAT' | 'TRUCKER'>('SNAPBACK');
  const [material, setMaterial] = useState<'CYBER_LEATHER' | 'SLATE_SUEDE' | 'WASHED_DENIM' | 'TECH_WOOL'>('CYBER_LEATHER');
  const [logoStyle, setLogoStyle] = useState<'EMBROIDERY_3D' | 'LASER_ENGRAVING' | 'METAL_RIBBON' | 'NEON_LED'>('EMBROIDERY_3D');
  const [customText, setCustomText] = useState('KAPITAL');
  const [ledColor, setLedColor] = useState<'CYAN' | 'VIOLET' | 'NEON' | 'WHITE' | 'STEALTH'>('CYAN');
  const [isAdded, setIsAdded] = useState(false);

  // Price calculation based on specs
  const calculatePrice = () => {
    let base = 300000;
    if (material === 'SLATE_SUEDE') base += 40000;
    if (material === 'TECH_WOOL') base += 60000;
    if (logoStyle === 'NEON_LED') base += 80000;
    if (logoStyle === 'METAL_RIBBON') base += 60000;
    return base;
  };

  const currentPrice = calculatePrice();

  const handleAddCustom = () => {
    const custom: CustomCap = {
      baseType,
      material,
      logoStyle,
      customText: customText.toUpperCase() || 'STEALTH',
      ledColor,
      price: currentPrice
    };
    onAddCustomCap(custom);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleRandomize = () => {
    const bases: ('SNAPBACK' | 'DAD_HAT' | 'TRUCKER')[] = ['SNAPBACK', 'DAD_HAT', 'TRUCKER'];
    const mats: ('CYBER_LEATHER' | 'SLATE_SUEDE' | 'WASHED_DENIM' | 'TECH_WOOL')[] = ['CYBER_LEATHER', 'SLATE_SUEDE', 'WASHED_DENIM', 'TECH_WOOL'];
    const logos: ('EMBROIDERY_3D' | 'LASER_ENGRAVING' | 'METAL_RIBBON' | 'NEON_LED')[] = ['EMBROIDERY_3D', 'LASER_ENGRAVING', 'METAL_RIBBON', 'NEON_LED'];
    const leds: ('CYAN' | 'VIOLET' | 'NEON' | 'WHITE' | 'STEALTH')[] = ['CYAN', 'VIOLET', 'NEON', 'WHITE', 'STEALTH'];
    const randomWords = ['RAW', 'VOID', 'CYBER', 'KAPITAL', 'LAB_24', 'STEALTH', 'NULL', 'SHADOW'];

    setBaseType(bases[Math.floor(Math.random() * bases.length)]);
    setMaterial(mats[Math.floor(Math.random() * mats.length)]);
    setLogoStyle(logos[Math.floor(Math.random() * logos.length)]);
    setLedColor(leds[Math.floor(Math.random() * leds.length)]);
    setCustomText(randomWords[Math.floor(Math.random() * randomWords.length)]);
  };

  // Mat specific aesthetics helper
  const getMaterialColorClass = () => {
    switch (material) {
      case 'CYBER_LEATHER': return 'bg-zinc-900 border-zinc-800 shadow-[inset_0_2px_15px_rgba(255,255,255,0.05)]';
      case 'SLATE_SUEDE': return 'bg-zinc-800 border-zinc-700 shadow-inner';
      case 'WASHED_DENIM': return 'bg-zinc-700/80 border-zinc-600 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]';
      case 'TECH_WOOL': return 'bg-zinc-950/90 border-zinc-850';
    }
  };

  const getLedGlowFilter = () => {
    if (logoStyle !== 'NEON_LED' && ledColor === 'STEALTH') return '';
    switch (ledColor) {
      case 'CYAN': return 'text-cyan-400 drop-shadow-[0_0_10px_#00f5ff]';
      case 'VIOLET': return 'text-purple-400 drop-shadow-[0_0_10px_#bc13fe]';
      case 'NEON': return 'text-lime-400 drop-shadow-[0_0_10px_#a3e635]';
      case 'WHITE': return 'text-white drop-shadow-[0_0_8px_#ffffff]';
      case 'STEALTH': return 'text-zinc-700';
    }
  };

  const getLedBrimGlow = () => {
    if (logoStyle !== 'NEON_LED') return 'border-zinc-800';
    switch (ledColor) {
      case 'CYAN': return 'border-cyan-400 shadow-[0_4px_15px_-2px_#00f5ff]';
      case 'VIOLET': return 'border-purple-400 shadow-[0_4px_15px_-2px_#bc13fe]';
      case 'NEON': return 'border-lime-400 shadow-[0_4px_15px_-2px_#a3e635]';
      case 'WHITE': return 'border-white shadow-[0_4px_10px_rgba(255,255,255,0.5)]';
      case 'STEALTH': return 'border-zinc-900';
    }
  };

  return (
    <div className="w-full space-y-12">
      {/* Page Title Header */}
      <div className="border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <span className="font-mono text-[9px] text-cyan-400 tracking-[0.3em] uppercase block mb-1">LABORATORIO GENERATIVO S_04</span>
          <h2 className="font-sans text-3xl font-extralight tracking-widest text-white uppercase">KAPITAL // LAB STUDIO</h2>
        </div>
        <p className="font-sans text-xs text-zinc-500 font-light max-w-sm">
          Simula especificaciones técnicas, parametriza los materiales y personaliza la identidad de tu prenda exclusiva en tiempo real.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* LEFT COMPONENT: Giant Real-time Interactive Visualizer */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative aspect-[4/4] bg-black border border-zinc-900/60 flex items-center justify-center p-8 overflow-hidden [clip-path:polygon(0_0,_100%_0,_100%_98%,_0_100%)] select-none">
            
            {/* Tech grid mesh in base */}
            <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none"></div>

            {/* Glowing tech coordinates background indicator */}
            <div className="absolute top-4 left-4 font-mono text-[8px] text-zinc-700 tracking-widest uppercase">
              MODULE_ID: KPTL-L-24 // SYS_OK
            </div>
            <div className="absolute top-4 right-4 font-mono text-[8px] text-cyan-400/50 tracking-widest uppercase">
              LATENCY: 0.12ms
            </div>

            {/* Simulated 3D Vector Cap rendering */}
            <div className="relative w-72 h-72 flex flex-col items-center justify-center transition-all duration-500">
              {/* Back part for Trucker mesh */}
              {baseType === 'TRUCKER' && (
                <div className="absolute top-10 w-44 h-24 bg-zinc-800/20 border border-dashed border-zinc-700/80 rounded-t-full [mask-image:radial-gradient(ellipse_at_center,_black_70%,_transparent_100%)]"></div>
              )}

              {/* Cap Crown Dome */}
              <div className={`w-44 h-36 rounded-t-full border border-b-0 relative transition-colors duration-500 flex flex-col items-center justify-end pb-8 ${getMaterialColorClass()}`}>
                
                {/* Panel lines */}
                <div className="absolute inset-x-0 top-0 bottom-0 flex justify-center pointer-events-none">
                  <div className="w-[1px] h-full bg-black/40"></div>
                  <div className="absolute left-8 right-8 top-12 h-px bg-black/15"></div>
                </div>

                {/* Top metal button (eyelets) */}
                <div className="absolute -top-1.5 w-4 h-2 rounded-full bg-zinc-700 border border-zinc-600"></div>

                {/* Ventilation Eyelets holes */}
                <div className="absolute top-10 left-12 w-1.5 h-1.5 rounded-full bg-black/60 border border-zinc-800"></div>
                <div className="absolute top-10 right-12 w-1.5 h-1.5 rounded-full bg-black/60 border border-zinc-800"></div>

                {/* Dynamic Logo element depending on styled specs */}
                <div className="z-10 mt-2 text-center flex flex-col items-center justify-center relative min-h-[40px]">
                  {logoStyle === 'EMBROIDERY_3D' && (
                    <span className="font-sans text-sm tracking-[0.18em] text-white font-extrabold border bg-black/40 border-zinc-800 px-3 py-1 shadow-md select-none transform scale-95 uppercase">
                      {customText || 'KAPITAL'}
                    </span>
                  )}
                  {logoStyle === 'LASER_ENGRAVING' && (
                    <span className="font-mono text-[9px] tracking-widest text-[#00f5ff] bg-black/90 border border-[#00f5ff]/35 px-4 py-1.5 uppercase select-none font-bold">
                      {customText || 'STEALTH'}
                    </span>
                  )}
                  {logoStyle === 'METAL_RIBBON' && (
                    <div className="flex flex-col items-center">
                      {/* Ribbon metal logo symbol */}
                      <div className="w-6 h-6 border-2 border-zinc-400 rotate-45 flex items-center justify-center bg-zinc-950 font-mono text-[9px] text-zinc-400 font-extrabold shadow-lg">
                        K
                      </div>
                      <span className="font-mono text-[7px] text-zinc-500 tracking-wider uppercase mt-1">RIBBON CNC</span>
                    </div>
                  )}
                  {logoStyle === 'NEON_LED' && (
                    <span className={`font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 ${getLedGlowFilter()}`}>
                      {customText || 'NEON'}
                    </span>
                  )}
                </div>
              </div>

              {/* Cap Brim (Visor) */}
              <div className={`w-52 h-14 bg-zinc-900 rounded-b-3xl border-t border-zinc-800 relative -mt-0.5 transition-all duration-500 ${getMaterialColorClass()} ${getLedBrimGlow()}`}>
                {/* Stitch lines on visor */}
                <div className="absolute inset-x-4 top-2 bottom-4 border-b border-black/30 rounded-b-2xl pointer-events-none"></div>
                <div className="absolute inset-x-8 top-4 bottom-6 border-b border-black/25 rounded-b-xl pointer-events-none"></div>
                
                {/* Visor Fiber-optic led line edge */}
                {logoStyle === 'NEON_LED' && (
                  <div className={`absolute bottom-0 left-2 right-2 h-1 rounded-full transition-colors duration-300 ${
                    ledColor === 'CYAN' ? 'bg-[#00f5ff] shadow-[0_0_12px_#00f5ff]' :
                    ledColor === 'VIOLET' ? 'bg-[#bc13fe] shadow-[0_0_12px_#bc13fe]' :
                    ledColor === 'NEON' ? 'bg-lime-400 shadow-[0_0_12px_#a3e635]' :
                    ledColor === 'WHITE' ? 'bg-white shadow-[0_0_8px_#ffffff]' :
                    'bg-zinc-800'
                  }`} />
                )}
              </div>
            </div>

            {/* Spec readout label at base of sandbox */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-zinc-950/90 border border-zinc-900 px-3 py-2 text-[9px] font-mono text-zinc-400 tracking-wider">
              <span>PRE_FMT: {baseType} // {material}</span>
              <span className="text-cyan-400">${currentPrice.toLocaleString('es-CO')}</span>
            </div>
          </div>

          {/* Randomizer Control */}
          <button
            onClick={handleRandomize}
            className="w-full py-3.5 border border-zinc-800 focus:outline-none hover:border-zinc-600 text-zinc-400 hover:text-white font-mono text-[9px] tracking-[0.2em] uppercase flex items-center justify-center gap-1.5 cursor-pointer bg-transparent transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
            GENERAR COMBINACIÓN ALEATORIA
          </button>
        </div>

        {/* RIGHT COLUMN: Parametric customization controller options */}
        <div className="w-full lg:w-1/2 space-y-6">
          {/* Option group 1: Base Cap Silhouette */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-zinc-500 tracking-[0.12em] block uppercase">1. SILUETA BASE</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'SNAPBACK', label: 'SNAPBACK 6P' },
                { id: 'DAD_HAT', label: 'DAD HAT DU' },
                { id: 'TRUCKER', label: 'TRUCKER MESH' },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBaseType(b.id as any)}
                  className={`py-3 text-[10px] font-mono tracking-widest border font-medium cursor-pointer transition-all ${
                    baseType === b.id 
                      ? 'border-cyan-400 text-white bg-cyan-400/5' 
                      : 'border-zinc-900 text-zinc-500 hover:border-zinc-800 hover:text-white'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Option group 2: Premium Textures */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-zinc-500 tracking-[0.12em] block uppercase">2. TEXTURA & COMBINACIÓN</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'CYBER_LEATHER', label: 'CUERO CYBER', desc: 'Mate absoluto' },
                { id: 'SLATE_SUEDE', label: 'GAMUZA GRIS', desc: 'Pelo corto suave' },
                { id: 'WASHED_DENIM', label: 'DENIM ÁCIDO', desc: 'Funde orgánico' },
                { id: 'TECH_WOOL', label: 'WOOL CACHEMIRA', desc: 'Estructura térmica' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMaterial(m.id as any)}
                  className={`p-3 text-left border cursor-pointer transition-all ${
                    material === m.id 
                      ? 'border-cyan-400 bg-cyan-400/5 text-white' 
                      : 'border-zinc-900 text-zinc-500 hover:border-zinc-800'
                  }`}
                >
                  <p className="text-[10px] font-mono tracking-wider font-semibold uppercase">{m.label}</p>
                  <p className="text-[8px] font-mono opacity-50 mt-0.5 uppercase">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Option group 3: Custom Text Field */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-zinc-500 tracking-[0.12em] block uppercase">3. LOGO TEXTURIZADO (MÁX. 12 CARACTERES)</span>
            <div className="relative">
              <input
                type="text"
                maxLength={12}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="E.g. VOID"
                className="w-full bg-zinc-950 text-white border border-zinc-900 focus:border-cyan-400 outline-none p-3.5 pr-10 font-mono text-xs tracking-widest uppercase focus:ring-0"
              />
              <PenTool className="absolute right-3.5 top-3.5 w-4 h-4 text-zinc-600 pointer-events-none" />
            </div>
          </div>

          {/* Option group 4: Logo styling / processing */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-zinc-500 tracking-[0.12em] block uppercase">4. LOGO STYLE TREATMENT</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'EMBROIDERY_3D', label: 'BORDADO ALTA DENSIDAD' },
                { id: 'LASER_ENGRAVING', label: 'GRABADO LÁSER CNC' },
                { id: 'METAL_RIBBON', label: 'CINTA METÁLICA ZINC' },
                { id: 'NEON_LED', label: 'FUTURIST NEON LED' },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLogoStyle(l.id as any)}
                  className={`py-3 px-2 text-[9px] font-mono tracking-wider border cursor-pointer transition-all text-center uppercase font-semibold ${
                    logoStyle === l.id 
                      ? 'border-cyan-400 bg-cyan-400/5 text-white' 
                      : 'border-zinc-900 text-zinc-500 hover:border-zinc-800 hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Option group 5: fiber optics color glow */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-zinc-500 tracking-[0.12em] block uppercase">5. FIBER OPTIC G_LINE GLOW COLOR</span>
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { id: 'CYAN', bg: 'bg-[#00f5ff]', text: 'HOLO' },
                { id: 'VIOLET', bg: 'bg-[#bc13fe]', text: 'AMETHYST' },
                { id: 'NEON', bg: 'bg-lime-400', text: 'LIME' },
                { id: 'WHITE', bg: 'bg-white', text: 'PURE' },
                { id: 'STEALTH', bg: 'bg-zinc-800', text: 'OFF' },
              ].map((c) => (
                <button
                  key={c.id}
                  title={c.text}
                  onClick={() => setLedColor(c.id as any)}
                  className={`py-3.5 border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    ledColor === c.id 
                      ? 'border-white bg-white/5 text-white' 
                      : 'border-zinc-900 text-zinc-500 hover:border-zinc-800'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${c.bg}`}></span>
                  <span className="font-mono text-[7px] tracking-tight">{c.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action trigger button */}
          <div className="pt-4 border-t border-zinc-900">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-[10px] text-zinc-500">VALORACIÓN ESTIMIDA (LAB COST)</span>
              <span className="font-sans text-xl font-light text-white">${currentPrice.toLocaleString('es-CO')}</span>
            </div>

            <button
              onClick={handleAddCustom}
              className={`w-full py-5 border font-sans text-xs font-semibold tracking-[0.25em] uppercase hover:cursor-pointer transition-all duration-500 relative flex items-center justify-center gap-3 ${
                isAdded
                  ? 'border-green-500 text-green-400 bg-green-500/10 shadow-[0_0_15px_-3px_rgba(34,197,94,0.3)]'
                  : 'border-white text-white bg-transparent hover:bg-white hover:text-black hover:shadow-lg'
              }`}
            >
              {isAdded ? (
                <>
                  <RefreshCw className="w-4 h-4 text-green-400 animate-spin" />
                  ORDEN PERSONALIZADA REGISTRADA
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                  AÑADIR DISEÑO A LA BOLSA
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
