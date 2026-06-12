import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      // Save simulation or log
      console.log(`Subscribed email: ${email}`);
      const savedEmails = JSON.parse(localStorage.getItem('kptl_subscriptions') || '[]');
      savedEmails.push({ email, subscribedAt: new Date().toISOString() });
      localStorage.setItem('kptl_subscriptions', JSON.stringify(savedEmails));
      setEmail('');
    }, 1200);
  };

  return (
    <div className="flex flex-col justify-end p-6 border border-zinc-900 aspect-[3/4] hover:bg-zinc-950/40 transition-colors duration-500 relative select-none">
      
      {/* Background Grid Pattern layer */}
      <div className="absolute inset-0 bg-radial-gradient from-cyan-400/5 via-transparent to-transparent opacity-60 pointer-events-none"></div>

      <div className="relative z-10 space-y-4">
        <span className="font-sans text-[10px] font-semibold text-zinc-400 tracking-[0.25em] block uppercase">
          MANTENTE INFORMADO
        </span>
        
        <p className="text-zinc-500 font-light text-xs leading-relaxed tracking-wide">
          Regístrate para recibir notificaciones encriptadas sobre los próximos drops exclusivos y colecciones colaborativas.
        </p>

        {status === 'success' ? (
          <div className="space-y-4 animate-fade-in py-4">
            <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-[10px] font-bold tracking-widest uppercase">
              <Check className="w-4 h-4 text-emerald-400 animate-pulse" />
              REGISTRO_COMPLETADO
            </div>
            <p className="font-sans text-[10px] text-zinc-500 font-light tracking-wide leading-relaxed">
              Tu terminal de información ha sido suscrita éxitosamente en la red Kapital VIP.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="font-mono text-[9px] text-cyan-400 tracking-wider hover:underline"
            >
              VOLVER A EMPEZAR
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="relative border-b border-zinc-800 focus-within:border-cyan-400 transition-colors py-1">
              <input
                required
                type="email"
                placeholder="EMAIL_ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none py-1.5 font-mono text-[10px] tracking-wider text-white placeholder-zinc-700"
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="font-mono text-[9px] text-cyan-400 text-left flex items-center gap-2 hover:translate-x-2 transition-transform hover:text-white cursor-pointer hover:font-bold disabled:opacity-50"
            >
              {status === 'submitting' ? 'SINC_LOGGING...' : 'JOIN_LIST'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
