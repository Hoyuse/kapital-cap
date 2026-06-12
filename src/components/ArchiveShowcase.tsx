import { useState, useEffect } from 'react';
import { Product } from '../types';
import { Sparkles, ShoppingBag, FolderArchive, ArrowUpRight, Search, ShieldX } from 'lucide-react';
import { ArchiveCardSkeleton } from './SkeletonLoader';

interface ArchiveShowcaseProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  setCurrentTab: (tab: string) => void;
}

export default function ArchiveShowcase({
  products,
  onSelectProduct,
  setCurrentTab,
}: ArchiveShowcaseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'ALL' | 'COLLECTIONS' | 'ARCHIVE' | 'LAB'>('ALL');
  const [isCatalogLoading, setIsCatalogLoading] = useState(true);

  // Trigger simulated loading on tab filter clicks to mimic catalog fetching
  useEffect(() => {
    setIsCatalogLoading(true);
    const timer = setTimeout(() => {
      setIsCatalogLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, [selectedCategoryFilter]);

  // Fast-shimmer on search entry to indicate database lookup
  useEffect(() => {
    setIsCatalogLoading(true);
    const timer = setTimeout(() => {
      setIsCatalogLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter drops
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.material.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategoryFilter === 'ALL' || product.category === selectedCategoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full space-y-10 animate-fade-in">
      
      {/* Search and Filters block */}
      <div className="border-b border-zinc-900 pb-6 space-y-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <span className="font-mono text-[9px] text-cyan-400 tracking-[0.3em] uppercase block mb-1">REGISTRO HISTÓRICO DE DROPS</span>
            <h2 className="font-sans text-3xl font-extralight tracking-widest text-white uppercase">KAPITAL // ARCHIVE</h2>
          </div>
          
          {/* Real-time search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="FILTRAR POR ID, MATERIAL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950 text-white border border-zinc-900 focus:border-cyan-400 outline-none p-3.5 pl-10 font-mono text-[10px] tracking-widest uppercase focus:ring-0"
            />
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-600 pointer-events-none" />
          </div>
        </div>

        {/* Categories togglers */}
        <div className="flex flex-wrap gap-2 pt-2">
          {['ALL', 'COLLECTIONS', 'ARCHIVE', 'LAB'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat as any)}
              className={`px-4 py-2 text-[9px] font-mono tracking-widest border transition-colors cursor-pointer ${
                selectedCategoryFilter === cat
                  ? 'border-white text-white bg-white/5'
                  : 'border-zinc-900 text-zinc-500 hover:text-white hover:border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid rendering catalog cards */}
      {isCatalogLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: Math.max(6, filteredProducts.length) }).map((_, idx) => (
            <ArchiveCardSkeleton key={`archive-shm-${idx}`} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-center space-y-3 bg-zinc-950/20 border border-zinc-900 border-dashed">
          <ShieldX className="w-8 h-8 text-zinc-700" />
          <div>
            <p className="font-sans text-xs tracking-widest text-zinc-400 uppercase font-medium">Búsqueda sin resultados</p>
            <p className="font-mono text-[9px] text-zinc-600 mt-1 uppercase">ERR: SYSTEM CATALOG MISMATCH</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            // Let's decide if some drops are soldOut/historic inside archive
            const isSoldOut = product.category === 'ARCHIVE';

            return (
              <div 
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  setCurrentTab('COLLECTIONS');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer flex flex-col justify-between p-4 border border-zinc-950 hover:border-zinc-800/80 transition-all duration-400 aspect-[3/4.2] hover:bg-zinc-950/20"
              >
                {/* Visual container */}
                <div className="relative aspect-[3/3.8] bg-zinc-950 border border-zinc-900 overflow-hidden mb-4 [clip-path:polygon(0_0,_100%_0,_100%_98%,_0_100%)]">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Iridescent banner tag sold out */}
                  {isSoldOut && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="font-sans text-xs font-semibold tracking-[0.35em] text-red-400 border border-red-400/30 px-4 py-2 bg-black/80">
                        HISTÓRICO // SOLD OUT
                      </span>
                    </div>
                  )}

                  {/* Auth Tag overlay */}
                  <div className="absolute top-4 left-4 bg-black/80 border border-zinc-800 px-2.5 py-1 text-[8px] font-mono text-zinc-500 tracking-wider">
                    {product.tag}
                  </div>
                </div>

                {/* Info and price label elements */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-1">
                    <h4 className="font-sans text-xs tracking-widest text-white font-medium uppercase group-hover:text-cyan-400 transition-colors">
                      {product.name}
                    </h4>
                    <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-cyan-400 transition-colors flex-none" />
                  </div>
                  
                  <div className="flex justify-between items-center font-mono text-[9px]">
                    <span className="text-zinc-500 uppercase">SYS_F_0{product.tag.slice(-2)} // {product.category}</span>
                    <span className="text-cyan-400">${product.price.toLocaleString('es-CO')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
