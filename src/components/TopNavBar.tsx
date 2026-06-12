import { ShoppingBag, User, Cpu, FileText, Sparkles, Layers, Compass } from 'lucide-react';

interface TopNavBarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function TopNavBar({
  currentTab,
  setCurrentTab,
  cartCount,
  onOpenCart,
}: TopNavBarProps) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-zinc-900 flex justify-between items-center px-6 md:px-12 py-5 transition-all duration-300">
      <div 
        onClick={() => setCurrentTab('COLLECTIONS')}
        id="nav-logo"
        className="font-sans text-lg md:text-xl font-extralight tracking-[0.25em] text-white cursor-pointer hover:text-cyan-400 transition-colors duration-300 select-none flex items-center gap-2"
      >
        <span>KAPITAL // CAP</span>
      </div>

      <div className="hidden md:flex items-center gap-8 lg:gap-12">
        <button
          onClick={() => setCurrentTab('COLLECTIONS')}
          className={`font-sans text-xs tracking-[0.2em] font-medium transition-all duration-300 pb-1 cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'COLLECTIONS' 
              ? 'text-white border-b border-cyan-400' 
              : 'text-zinc-500 hover:text-white'
          }`}
        >
          <Layers className="w-3 h-3" />
          COLLECTIONS
        </button>
        <button
          onClick={() => setCurrentTab('ARCHIVE')}
          className={`font-sans text-xs tracking-[0.2em] font-medium transition-all duration-300 pb-1 cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'ARCHIVE' 
              ? 'text-white border-b border-cyan-400' 
              : 'text-zinc-500 hover:text-white'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          ARCHIVE
        </button>
        <button
          onClick={() => setCurrentTab('VISION_MISION')}
          className={`font-sans text-xs tracking-[0.2em] font-medium transition-all duration-300 pb-1 cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'VISION_MISION' 
              ? 'text-white border-b border-cyan-400' 
              : 'text-zinc-500 hover:text-white'
          }`}
        >
          <Compass className="w-3 h-3 text-cyan-400" />
          VISIÓN & MISIÓN
        </button>
        <button
          onClick={() => setCurrentTab('EDITORIAL')}
          className={`font-sans text-xs tracking-[0.2em] font-medium transition-all duration-300 pb-1 cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'EDITORIAL' 
              ? 'text-white border-b border-cyan-400' 
              : 'text-zinc-500 hover:text-white'
          }`}
        >
          <FileText className="w-3 h-3" />
          EDITORIAL
        </button>
        <button
          onClick={() => setCurrentTab('LAB')}
          className={`font-sans text-xs tracking-[0.2em] font-medium transition-all duration-300 pb-1 cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'LAB' 
              ? 'text-white border-b border-cyan-400' 
              : 'text-zinc-500 hover:text-white'
          }`}
        >
          <Cpu className="w-3 h-3 text-violet-400" />
          LAB STUDIO
        </button>
      </div>

      <div className="flex items-center gap-4 md:gap-7">
        <button 
          onClick={onOpenCart}
          className="relative p-2 text-zinc-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer flex items-center"
        >
          <ShoppingBag className="w-5 h-5 stroke-[1.2]" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-[9px] font-mono leading-none w-4 h-4 rounded-none flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
        <button 
          onClick={() => alert(`Bienvenido a Kapital Cap VIP.\nE-commerce showroom con persistencia reactiva en tiempo real.\nNo requiere inicio de sesión.`)}
          className="p-2 text-zinc-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer flex items-center"
        >
          <User className="w-5 h-5 stroke-[1.2]" />
        </button>
      </div>
    </nav>
  );
}
