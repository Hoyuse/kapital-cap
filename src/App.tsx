import { useState, useEffect } from 'react';
import { products } from './data';
import { Product, CartItem, CustomCap } from './types';
import TopNavBar from './components/TopNavBar';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import LabStudio from './components/LabStudio';
import EditorialShowcase from './components/EditorialShowcase';
import ArchiveShowcase from './components/ArchiveShowcase';
import VisionMision from './components/VisionMision';
import NewsletterForm from './components/NewsletterForm';
import { DropCardSkeleton } from './components/SkeletonLoader';
import { Sparkles, MessageCircle, ArrowUpRight, Check } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('COLLECTIONS');
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isDropsLoading, setIsDropsLoading] = useState<boolean>(true);

  // Simulate drop calibration with beautiful shimmering screens
  useEffect(() => {
    setIsDropsLoading(true);
    const timer = setTimeout(() => {
      setIsDropsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, [currentTab, selectedProduct]);

  // Load cart from localStorage upon mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kptl_cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Could not load cart from localStorage", e);
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('kptl_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error("Could not save cart to localStorage", e);
    }
  };

  const handleAddToBag = (product: Product) => {
    const existing = cart.find(item => item.product?.id === product.id);
    if (existing) {
      const updated = cart.map(item => 
        item.product?.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      saveCart(updated);
    } else {
      saveCart([...cart, { id: `prod-${product.id}`, product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const handleAddCustomCap = (customCap: CustomCap) => {
    // Generate unique ID based on custom selections
    const customId = `custom-${customCap.baseType}-${customCap.material}-${customCap.logoStyle}-${Date.now()}`;
    saveCart([...cart, { id: customId, customDesign: customCap, quantity: 1 }]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    const updated = cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = cart.filter(item => item.id !== id);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Find other drops that are different from the currently selected hero product
  const otherDrops = products.filter(p => p.id !== selectedProduct.id && p.id !== 'wool-signature');

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#e5e2e1] flex flex-col justify-between selection:bg-cyan-400 selection:text-black antialiased">
      
      {/* Decorative cybernetic light beam overlay on top edge */}
      <div className="fixed top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 via-purple-500 to-transparent opacity-60 z-55 pointer-events-none" />

      {/* Persistent global header nav */}
      <TopNavBar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Canvas Space */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 md:px-12 pt-28 pb-20 space-y-24">
        
        {/* Dynamic Route Switching */}
        {currentTab === 'COLLECTIONS' && (
          <div className="space-y-24">
            
            {/* HERO SELECTOR DETAIL BLOCK */}
            <ProductDetail 
              product={selectedProduct} 
              onAddToBag={handleAddToBag} 
              allProducts={products}
              onSelectProduct={setSelectedProduct}
            />

            {/* OTROS DROPS - SECONDARY ROW DIRECT TRANSLATION OF THE MOCKUP */}
            <section className="space-y-12">
              <div className="flex justify-between items-end border-b border-zinc-900 pb-4">
                <div>
                  <h2 className="font-sans text-xl md:text-2xl font-light tracking-[0.16em] uppercase text-white">
                    OTROS DROPS
                  </h2>
                  <div className="h-[1px] w-16 bg-cyan-400 mt-2"></div>
                </div>
                <button 
                  onClick={() => {
                    setCurrentTab('ARCHIVE');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-sans text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  VER TODO
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid with remaining items, subscription box, and large branding panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Dynamic Item Card 1: Neon Trucker */}
                {isDropsLoading ? (
                  <DropCardSkeleton />
                ) : products.find(p => p.id === 'trucker-neon') && (
                  <div 
                    onClick={() => {
                      const p = products.find(p => p.id === 'trucker-neon')!;
                      setSelectedProduct(p);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer flex flex-col justify-between animate-fade-in"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-zinc-950 border border-transparent group-hover:border-zinc-800 transition-all duration-300 [clip-path:polygon(0_0,_100%_0,_100%_98%,_0_100%)]">
                      <img 
                        src="https://lh3.googleusercontent.com/aida/AP1WRLuAcJy8OK_TcZtS_O5wHzcPBnuJh0tg57rHM3s4F4by3K3oZelDEKz7OGbYfwcp52SeUTC0JoPJ6BBrAnP5WM9yiSsVG4XdZjZ4whUFolKYBOzYwbRTjdcYAQ3dJdpKIFKj-C1TVnTtNHJFMJoj7C5vI5Pk8tj2SmhyAGeAYJOyBwK3T8m0-dnpVzFq-VMAFdFKECOor3DV3a8prnyLFLZfEkr6VELIGf7qIuXpYSSixSWvq9PDzYQ-KWw" 
                        alt="Trucker Cap Neon" 
                        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-sans text-[10px] font-semibold tracking-[0.18rem] uppercase text-white group-hover:text-cyan-400 transition-colors">
                        TRUCKER CAP NEÓN
                      </h4>
                      <p className="font-mono text-[9px] text-zinc-500 tracking-wider mt-1">
                        ${(products.find(p => p.id === 'trucker-neon')?.price || 260000).toLocaleString('es-CO')} // ARCHIVE
                      </p>
                    </div>
                  </div>
                )}

                {/* Dynamic Item Card 2: Dad Hat Desestructurada */}
                {isDropsLoading ? (
                  <DropCardSkeleton />
                ) : products.find(p => p.id === 'dad-desestructurada') && (
                  <div 
                    onClick={() => {
                      const p = products.find(p => p.id === 'dad-desestructurada')!;
                      setSelectedProduct(p);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer flex flex-col justify-between animate-fade-in"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-zinc-950 border border-transparent group-hover:border-zinc-800 transition-all duration-300 [clip-path:polygon(0_0,_100%_0,_100%_98%,_0_100%)]">
                      <img 
                        src="https://lh3.googleusercontent.com/aida/AP1WRLsxq9i8mlaS7H3mfaxIAqjpXMlW24C1GL-lTbNcfRjMKzC92w0apmxdBA5bY2-SPyxC2F_fa0RKB8pNrpn-jGSX7NWcrgbOOGWhkTmu-Pd9Ph5hcaUZaRCQhAPRSZn9Y4wytHqnzULvrWc5NM6JBt_JWRl8oRuPxJkpbW62ihQjdMAOAwhprYtonUfkh6j5iDXAi--tT9-_JsZJ0zXUiP9Y4azSWNhWHZKgR5wHzV-ea_keIuyi60Uavw" 
                        alt="Dad Hat Desestructurada" 
                        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-sans text-[10px] font-semibold tracking-[0.18rem] uppercase text-white group-hover:text-cyan-400 transition-colors">
                        DAD HAT DESESTRUCTURADA
                      </h4>
                      <p className="font-mono text-[9px] text-zinc-500 tracking-wider mt-1">
                        ${(products.find(p => p.id === 'dad-desestructurada')?.price || 220000).toLocaleString('es-CO')} // LAB
                      </p>
                    </div>
                  </div>
                )}

                {/* Dynamic Subscription Form Block */}
                <NewsletterForm />

                {/* Large aesthetic watermark background branding block */}
                <div className="hidden lg:flex aspect-[3/4] bg-zinc-950 border border-zinc-900 justify-center items-center relative overflow-hidden select-none [clip-path:polygon(0_0,_100%_0,_100%_98%,_0_100%)]">
                  <div className="absolute inset-0 grid-bg opacity-20"></div>
                  <span className="font-sans text-5xl font-extralight tracking-[0.25em] text-zinc-900 select-none animate-pulse">
                    KPTL
                  </span>
                  <div className="absolute bottom-4 right-4 font-mono text-[8px] text-zinc-800 tracking-widest uppercase">
                    SHOWROOM EDITION v1.0
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {currentTab === 'ARCHIVE' && (
          <ArchiveShowcase 
            products={products} 
            onSelectProduct={setSelectedProduct} 
            setCurrentTab={setCurrentTab} 
          />
        )}

        {currentTab === 'EDITORIAL' && (
          <EditorialShowcase />
        )}

        {currentTab === 'VISION_MISION' && (
          <VisionMision />
        )}

        {currentTab === 'LAB' && (
          <LabStudio onAddCustomCap={handleAddCustomCap} />
        )}

      </main>

      {/* Fixed Sidebar Shopping Bag overlay drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Global Brand Footer component */}
      <footer className="w-full bg-black border-t border-zinc-950 px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div>
          <div className="font-sans text-md md:text-lg font-extralight tracking-[0.25em] text-white">
            KAPITAL // CAP
          </div>
          <p className="font-mono text-[9px] text-zinc-700 tracking-wider mt-1 select-none">
            AVANT-GARDE STREETWEAR INCUBATOR
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-5">
          <div className="flex gap-8 lg:gap-10 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Términos de Exclusividad:\nTodo el calzado y prendas Kapital se construyen bajo demanda o disponibilidad estrictamente limitada a 500 copias.'); }} className="hover:text-cyan-400 transition-colors">TERMS</a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Política de Encriptación:\nSu privacidad de transacciones y datos de diseño modular se almacenan puramente en almacenamiento en la red local sandbox cache y no se venden a terceros.'); }} className="hover:text-cyan-400 transition-colors">PRIVACY</a>
            <a href="#shipping" onClick={(e) => { e.preventDefault(); alert('Estatutos de Envío:\nDespachamos de inmediato a nivel internacional vía DHL express en un empaque rígido sellado al vacío contra agua.'); }} className="hover:text-cyan-400 transition-colors">SHIPPING</a>
            <a 
              href="https://wa.me/573206440915" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-cyan-400 text-zinc-400 transition-colors flex items-center gap-1 hover:underline"
              onClick={(e) => {
                alert('Canal de Soporte VIP:\nSoporte Directo WhatsApp: +57 320 6440915\nTitular: Dayan Elles\n\nAbriendo chat de soporte...');
              }}
            >
              CONTACTO (WSP: +57 320 6440915)
            </a>
          </div>

          <div className="font-mono text-[8px] text-zinc-600 opacity-70 space-y-2">
            <p>
              <a href="https://kapital-cap.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Kapital Cap</a> by <a href="https://github.com/Hoyuse/kapital-cap" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Dina Elles</a> is marked <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">CC0 1.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" className="inline" style={{maxWidth: '1em', maxHeight: '1em', marginLeft: '0.2em'}} /><img src="https://mirrors.creativecommons.org/presskit/icons/zero.svg" alt="" className="inline" style={{maxWidth: '1em', maxHeight: '1em', marginLeft: '0.2em'}} />
            </p>
            <p>© {new Date().getFullYear()} KAPITAL // CAP. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
