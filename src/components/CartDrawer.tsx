import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShieldAlert, Award, Copy, Check, ExternalLink, Phone } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [nequiCopied, setNequiCopied] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.product ? item.product.price : (item.customDesign?.price || 0);
    return acc + itemPrice * item.quantity;
  }, 0);

  const shipping = subtotal > 600000 ? 0 : 60000;
  const total = subtotal + shipping;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Por favor complete todos los datos de correspondencia de envío.');
      return;
    }
    
    // Immediate calculation of tracking block
    const generatedTrk = `KPTL-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`;
    setTrackingNumber(generatedTrk);

    const itemsText = cartItems.map(item => {
      const name = nameOfItem(item);
      const qty = item.quantity;
      const price = priceOfItem(item);
      return `- ${name} (${qty}x) // $${(price * qty).toLocaleString('es-CO')} COP`;
    }).join('\n');

    const totalCheckout = total.toLocaleString('es-CO');

    const rawMessage = `¡Hola Dayan Elles! 👋 Acabo de realizar mi orden en Kapital Cap:

🛒 CÓDIGO DE ORDEN: ${generatedTrk}
👤 CLIENTE: ${customerInfo.name}
📞 CELULAR: ${customerInfo.phone}
📍 DIRECCIÓN: ${customerInfo.address}

📦 PRODUCTOS ADQUIRIDOS:
${itemsText}

💰 VALOR TOTAL TRANSFERIDO: $${totalCheckout} COP

*Ya realicé la transferencia al Nequi +57 3206440915 a nombre de Dayan Elles.* Quedo atento(a) al despacho de mis productos. ¡Muchas gracias! 🚀`;

    const whatsappUrl = `https://wa.me/573206440915?text=${encodeURIComponent(rawMessage)}`;
    
    // Open in interactive tab safely
    window.open(whatsappUrl, '_blank');

    setOrderCompleted(true);
    setIsCheckingOut(false);
    onClearCart();
  };

  const handleCopyNequi = () => {
    navigator.clipboard.writeText('3206440915');
    setNequiCopied(true);
    setTimeout(() => setNequiCopied(false), 2000);
  };

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nameOfItem = (item: CartItem) => {
    if (item.product) return item.product.name;
    if (item.customDesign) {
      return `CUSTOM ${item.customDesign.baseType} [${item.customDesign.customText || 'STEALTH'}]`;
    }
    return 'UNNAMED PRODUCT';
  };

  const descOfItem = (item: CartItem) => {
    if (item.product) return item.product.edition;
    if (item.customDesign) {
      return `${item.customDesign.material.replaceAll('_', ' ')} // LED: ${item.customDesign.ledColor}`;
    }
    return '';
  };

  const imageOfItem = (item: CartItem) => {
    if (item.product) return item.product.imageUrl;
    // fallback representation for custom design
    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxiT0rcLDzN-krhoLBtJBstF7YaUZ4rlpMD2rnHOhfCpyuhbQA3Dmfpdt5DSFNWHGZ_jT2oWsM9WtiM5PvWhulTllKksQfn9aZ5P6bM7q_sno8UxrhNU9VG66KHAVrOi9xzr62mxx1v1wLcNri2UPM4dP-vV3xC_CF07BWr1WCsLNpFiTB05t_Cws1E-DFmeg2whSIKGNa39paylDhggCof6-CTB_W0eik952f_DtH5eL1crhp4aEnRNuT_LgA2QSB91sJdaTDFdY';
  };

  const priceOfItem = (item: CartItem) => {
    if (item.product) return item.product.price;
    if (item.customDesign) return item.customDesign.price;
    return 0;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500" 
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-lg bg-black/95 border-l border-zinc-900 h-full flex flex-col z-10 Sharp no-radius">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-zinc-950/45">
          <div>
            <h3 className="font-sans text-sm font-medium tracking-[0.2em] text-white">MI BOLSA DE COMPRA</h3>
            <p className="font-mono text-[9px] text-zinc-500 tracking-wider">SECURE CHECKOUT CONSOLE</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orderCompleted ? (
            /* Order Completion Success View */
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 px-4 py-8 animate-fade-in">
              <div className="w-16 h-16 border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center relative">
                <span className="absolute inset-0 border border-emerald-400/20 scale-125 animate-ping"></span>
                <Award className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <h4 className="font-sans text-md font-medium tracking-[0.2em] text-white uppercase">DROP ADQUIRIDO</h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Tu orden ha sido encriptada y enviada a producción. La exclusividad de Kapital Cap ya viaja hacia ti.
                </p>
              </div>

              <div className="w-full bg-zinc-950 border border-zinc-900 p-4 space-y-3">
                <p className="font-mono text-[8px] text-zinc-500 tracking-widest uppercase">CÓDIGO DE SEGUIMIENTO C_BLOCK</p>
                <div className="flex items-center justify-between bg-black px-3 py-2 border border-zinc-900">
                  <code className="font-mono text-xs text-cyan-400 tracking-wider font-bold">{trackingNumber}</code>
                  <button 
                    onClick={handleCopyTracking}
                    className="p-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setOrderCompleted(false);
                  onClose();
                }}
                className="w-full py-4 border border-zinc-800 text-[10px] font-sans tracking-[0.25em] text-white bg-transparent hover:bg-white hover:text-black transition-all"
              >
                VOLVER AL SHOWROOM
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty state */
            <div className="h-96 flex flex-col items-center justify-center text-center text-zinc-500 space-y-4">
              <ShoppingBagIcon className="w-12 h-12 stroke-[1] text-zinc-600" />
              <div>
                <p className="font-sans text-xs tracking-widest uppercase">Bolsa vacía</p>
                <p className="font-mono text-[9px] text-zinc-600 mt-1">NO RECS IN ACTIVE CACHE</p>
              </div>
              <button 
                onClick={onClose}
                className="mt-4 px-5 py-2.5 border border-zinc-800 text-[9px] font-mono tracking-widest hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              >
                EXPLORAR DROPS
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout payment form view */
            <form onSubmit={handleCheckoutSubmit} className="space-y-5 animate-fade-in pr-1">
              <div className="border-b border-zinc-900 pb-3">
                <span className="font-mono text-[9px] text-zinc-500 tracking-[0.15em] uppercase">PAGO EXCLUSIVO VÍA NEQUI COLOMBIA</span>
              </div>

              {/* High impact Nequi credential box */}
              <div className="p-5 border border-purple-500/30 bg-purple-950/10 [clip-path:polygon(0_0,_100%_0,_100%_96%,_0_100%)] space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                    <span className="font-mono text-[9px] text-purple-400 tracking-widest font-bold uppercase">SOPORTE DE TRANSFERENCIA</span>
                  </div>
                  <span className="font-mono text-[8px] text-zinc-650">NEQ_ID // ACTIVE</span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-center border-b border-zinc-900/60 pb-2">
                    <div>
                      <span className="font-mono text-[8px] text-zinc-500 tracking-wider block uppercase">TITULAR DE LA CUENTA</span>
                      <span className="font-sans text-xs text-white uppercase font-semibold">DAYAN ELLES</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-b border-zinc-900/60 pb-2">
                    <div>
                      <span className="font-mono text-[8px] text-zinc-500 tracking-wider block uppercase">NÚMERO NEQUI</span>
                      <span className="font-mono text-sm text-cyan-400 font-bold tracking-wider">+57 320 6440915</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyNequi}
                      className="px-2.5 py-1.5 border border-zinc-800 text-[8.5px] font-mono text-zinc-300 hover:text-white hover:border-zinc-700 bg-black/60 transition-colors cursor-pointer flex items-center gap-1.5 active:scale-95"
                    >
                      {nequiCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          COPIADO
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          COPIAR NÚMERO
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-mono text-[8px] text-zinc-500 tracking-wider block uppercase">VALOR EXACTO CORRESPONDIENTE</span>
                      <span className="font-sans text-sm text-emerald-400 font-bold">${total.toLocaleString('es-CO')} COP</span>
                    </div>
                  </div>
                </div>

                <p className="font-sans text-[9px] text-zinc-550 leading-relaxed italic">
                  *Por favor realiza la transferencia en tu aplicación Nequi antes de enviar el pedido. Al pulsar el botón inferior serás redirigido con tu orden de compra en mano para validar el envío.*
                </p>
              </div>

              {/* Delivery correspondence Fields */}
              <div className="space-y-3 pt-2">
                <span className="font-mono text-[9px] text-zinc-500 tracking-[0.15em] uppercase block mb-1">REQUISITOS DE DESPACHO</span>

                <div>
                  <label className="font-mono text-[8px] text-zinc-500 block mb-1 uppercase">NOMBRE COMPLETO DEL DESTINATARIO</label>
                  <input
                    required
                    type="text"
                    placeholder="E.g. DAYAN ELLES"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full bg-zinc-950 text-white border border-zinc-900 focus:border-cyan-400 outline-none text-xs font-sans p-3 focus:ring-0 placeholder:text-zinc-750"
                  />
                </div>

                <div>
                  <label className="font-mono text-[8px] text-zinc-500 block mb-1 uppercase">TELÉFONO DE CONTACTO</label>
                  <input
                    required
                    type="tel"
                    placeholder="E.g. +57 320 6440915"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full bg-zinc-950 text-white border border-zinc-900 focus:border-cyan-400 outline-none text-xs font-sans p-3 focus:ring-0 placeholder:text-zinc-750"
                  />
                </div>

                <div>
                  <label className="font-mono text-[8px] text-zinc-500 block mb-1 uppercase">DIRECCIÓN DE CORRESPONDENCIA COMPLETA</label>
                  <input
                    required
                    type="text"
                    placeholder="Calle 10 # 5 - 12, Ciudad, Departamento"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="w-full bg-zinc-950 text-white border border-zinc-900 focus:border-cyan-400 outline-none text-xs font-sans p-3 focus:ring-0 placeholder:text-zinc-750"
                  />
                </div>
              </div>

              {/* Total display itemizer */}
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 space-y-1 mt-1">
                <div className="flex justify-between font-mono text-[9px] text-zinc-500">
                  <span>SUBTOTAL</span>
                  <span>${subtotal.toLocaleString('es-CO')}</span>
                </div>
                <div className="flex justify-between font-mono text-[9px] text-zinc-500">
                  <span>DHL EXPRESS DE LÍNEA</span>
                  <span>{shipping === 0 ? 'GRATUITO' : `$${shipping.toLocaleString('es-CO')}`}</span>
                </div>
                <div className="h-px bg-zinc-900/60 my-1.5"></div>
                <div className="flex justify-between text-[11px] text-white uppercase font-sans tracking-widest font-bold">
                  <span>TOTAL FACTURADO</span>
                  <span className="text-cyan-400 font-bold">${total.toLocaleString('es-CO')} COP</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="w-1/3 py-4 border border-zinc-900 text-[9px] font-mono tracking-widest text-zinc-500 hover:text-white hover:border-zinc-800 transition-colors"
                >
                  ATRÁS
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-4 bg-white hover:bg-cyan-400 text-black font-sans text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                >
                  <span>FINALIZAR EN WHATSAPP</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2]" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-550 justify-center">
                <ShieldAlert className="w-3.5 h-3.5 text-purple-400/80" />
                COMUNICACIÓN ENCRIPTADA DIRECTA A +57 320 6440915
              </div>
            </form>
          ) : (
            /* Items list view */
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-4 border border-zinc-900 hover:border-zinc-800 transition-colors bg-zinc-950/40 relative"
                >
                  <div className="w-16 h-20 bg-zinc-900 flex-none overflow-hidden border border-zinc-800">
                    <img 
                      src={imageOfItem(item)} 
                      alt={nameOfItem(item)} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-sans text-xs tracking-wider text-white font-medium uppercase line-clamp-1">
                        {nameOfItem(item)}
                      </h4>
                      <p className="font-sans text-[9px] text-zinc-500 tracking-widest uppercase mt-0.5">
                        {descOfItem(item)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity switcher */}
                      <div className="flex items-center border border-zinc-900 bg-black">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-zinc-400 hover:text-white"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2 text-[10px] font-mono text-white">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <span className="font-mono text-[10px] text-zinc-300">
                        ${(priceOfItem(item) * item.quantity).toLocaleString('es-CO')}
                      </span>
                    </div>
                  </div>

                  {/* Remove buttons */}
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Billing Breakdown */}
        {!orderCompleted && !isCheckingOut && cartItems.length > 0 && (
          <div className="p-6 border-t border-zinc-900 bg-zinc-950/80 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono text-[10px] text-zinc-400">
                <span>SUBTOTAL DE DROPS</span>
                <span>${subtotal.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-zinc-400">
                <span>ENVÍO DHL EXPRESS</span>
                <span>{shipping === 0 ? 'GRATUITO' : `$${shipping.toLocaleString('es-CO')}`}</span>
              </div>
              <div className="h-px bg-zinc-900 my-2"></div>
              <div className="flex justify-between text-xs text-white uppercase font-sans tracking-widest font-semibold">
                <span>TOTAL DE COMPRA</span>
                <span className="text-cyan-400 font-bold">${total.toLocaleString('es-CO')}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-5 bg-transparent border border-white text-white font-sans text-xs font-semibold tracking-[0.25em] uppercase hover:bg-white hover:text-black hover:shadow-lg transition-all duration-300"
            >
              PROCEDER AL PAGO SECURE_V3
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple fallback ShoppingBag icon
function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  );
}
