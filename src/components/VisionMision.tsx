import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, Target, Compass, Sliders, ChevronRight, Award, Shield, Sparkles, AlertCircle,
  Play, Pause, RotateCcw, Volume2, VolumeX, SkipForward, Type, Monitor, Cpu, ShieldCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Video Slide Data for Cinematic welcome animation
const VIDEO_SLIDES = [
  {
    title: 'KAPITAL // INCUBATOR',
    tagline: 'BIENVENIDO AL FUTURO DE LA VOLUMETRÍA CORPORAL',
    captions: 'Sintonizando el canal de acceso de la incubadora de moda urbana exclusiva...',
    accentColor: 'text-cyan-400',
    accentBorder: 'border-cyan-400/30',
    accentFill: 'bg-cyan-950/20',
    colorHex: '#22d3ee'
  },
  {
    title: 'ESCULPIMIENTO GEOMÉTRICO',
    tagline: 'MISIÓN: 500 COPIAS ÚNICAS SIN EXCESO',
    captions: 'En Kapital Cap modelamos siluetas anatómicas con absorción lumínica en entornos nocturnos...',
    accentColor: 'text-purple-400',
    accentBorder: 'border-purple-400/30',
    accentFill: 'bg-purple-950/20',
    colorHex: '#a855f7'
  },
  {
    title: 'HUELLA BIO-REGENERATIVA',
    tagline: 'VISIÓN: FABRICACIÓN DESCENTRALIZADA 2030',
    captions: 'Componentes biodegradables estructurados de forma tridimensional e impresos en hubs locales...',
    accentColor: 'text-lime-400',
    accentBorder: 'border-lime-400/30',
    accentFill: 'bg-lime-950/20',
    colorHex: '#84cc16'
  },
  {
    title: 'PROYECCIÓN INDIVIDUAL',
    tagline: 'DISEÑA TU BIENVENIDA EN EL CODIGO FUENTE',
    captions: 'Escribe tu nombre en la base del terminal para proyectarlo holográficamente en tiempo real...',
    accentColor: 'text-white',
    accentBorder: 'border-zinc-700',
    accentFill: 'bg-zinc-900/40',
    colorHex: '#ffffff'
  }
];

export default function VisionMision() {
  const [activeSegment, setActiveSegment] = useState<'METRICS' | 'PILLARS' | 'MANI'>('METRICS');
  const [hoveredCard, setHoveredCard] = useState<'MISIÓN' | 'VISIÓN' | null>(null);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  // Simulated Video Player States
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const [filterType, setFilterType] = useState<'DEFAULT' | 'CYBER' | 'DECAY' | 'MONO'>('CYBER');
  const [resolution, setResolution] = useState<'PROXY' | 'SD' | 'HD' | '4K'>('4K');
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [customText, setCustomText] = useState<string>('');
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const humOscillatorRef = useRef<OscillatorNode | null>(null);
  const humGainNodeRef = useRef<GainNode | null>(null);

  // Sound Synth Generator using safe Web Audio Context API API
  const playSynthChime = (freq: number, oscType: 'sine' | 'triangle' | 'sawtooth' = 'sine', duration: number = 0.25) => {
    if (isMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = oscType;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio Context access blocked by browser context rules', e);
    }
  };

  // Toggle & Manage Ambient background space hum node
  useEffect(() => {
    if (isMuted) {
      if (humOscillatorRef.current) {
        try {
          humOscillatorRef.current.stop();
        } catch (_) {}
        humOscillatorRef.current = null;
      }
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          audioContextRef.current = ctx;

          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(55, ctx.currentTime); // Low 55Hz cinematic floor bass hum

          gainNode.gain.setValueAtTime(0.012, ctx.currentTime); // Soft atmospheric volume

          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          osc.start();
          humOscillatorRef.current = osc;
          humGainNodeRef.current = gainNode;
        }
      } catch (e) {
        console.warn('Could not activate sustained space atmosphere hum', e);
      }
    }

    return () => {
      if (humOscillatorRef.current) {
        try {
          humOscillatorRef.current.stop();
        } catch (_) {}
      }
    };
  }, [isMuted]);

  // Video timeline progression simulation
  useEffect(() => {
    let intervalId: any;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setProgress((prev) => {
          const step = 0.65 * speed;
          if (prev + step >= 100) {
            // cycle to next slides
            setCurrentSlide((prevSlide) => (prevSlide + 1) % VIDEO_SLIDES.length);
            playSynthChime(330, 'triangle', 0.15);
            return 0;
          }
          return prev + step;
        });
      }, 40);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, speed]);

  const handleSkipNext = () => {
    setCurrentSlide((prev) => (prev + 1) % VIDEO_SLIDES.length);
    setProgress(0);
    playSynthChime(440, 'sine', 0.1);
  };

  const handleResetVideo = () => {
    setProgress(0);
    setCurrentSlide(0);
    playSynthChime(220, 'sine', 0.35);
  };

  // Canvas render loop for visual scopes and orbital tracking
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number }> = [];

    const initializeParticles = (w: number, h: number) => {
      particles = [];
      const particleCount = resolution === '4K' ? 60 : resolution === 'HD' ? 40 : 20;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 2 + 0.6,
          alpha: Math.random() * 0.5 + 0.15
        });
      }
    };

    let width = canvas.width = canvas.offsetWidth || 850;
    let height = canvas.height = canvas.offsetHeight || 380;
    initializeParticles(width, height);

    // Responsive Canvas container size listener
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width || 850;
        height = canvas.height = entry.contentRect.height || 380;
        initializeParticles(width, height);
      }
    });

    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    let angle = 0;
    const renderLoop = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep dark background
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, width, height);

      // Cyber Matrix Grid Lanes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const stepSize = resolution === '4K' ? 25 : 45;
      for (let x = 0; x < width; x += stepSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += stepSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Read current slide hex color configs
      const slideInfo = VIDEO_SLIDES[currentSlide];
      const rgbBase = slideInfo.colorHex === '#22d3ee' ? '34, 211, 238' :
                      slideInfo.colorHex === '#a855f7' ? '168, 85, 247' :
                      slideInfo.colorHex === '#84cc16' ? '132, 204, 22' : '255, 255, 255';

      if (isPlaying) {
        angle += 0.006 * speed;
      }

      const cx = width / 2;
      const cy = height / 2;
      const radiusBase = Math.min(width, height) * 0.33;

      // Draw horizontal target lines intersecting at center point
      ctx.save();
      ctx.strokeStyle = `rgba(${rgbBase}, 0.04)`;
      ctx.beginPath();
      ctx.moveTo(cx - radiusBase * 1.6, cy);
      ctx.lineTo(cx + radiusBase * 1.6, cy);
      ctx.moveTo(cx, cy - radiusBase * 1.6);
      ctx.lineTo(cx, cy + radiusBase * 1.6);
      ctx.stroke();

      // Outer radar scanning compass ring
      ctx.strokeStyle = `rgba(${rgbBase}, 0.1)`;
      ctx.beginPath();
      ctx.arc(cx, cy, radiusBase, 0, Math.PI * 2);
      ctx.stroke();

      // Inner HUD ring
      ctx.strokeStyle = `rgba(${rgbBase}, 0.06)`;
      ctx.beginPath();
      ctx.arc(cx, cy, radiusBase * 0.45, 0, Math.PI * 2);
      ctx.stroke();

      // Sweeping radar wedge lines
      ctx.strokeStyle = `rgba(${rgbBase}, 0.18)`;
      ctx.beginPath();
      ctx.arc(cx, cy, radiusBase * 0.75, angle, angle + 1.25);
      ctx.stroke();

      // External framing coordinates brackets
      ctx.strokeStyle = `rgba(${rgbBase}, 0.35)`;
      ctx.beginPath();
      ctx.arc(cx, cy, radiusBase * 1.1, Math.PI - 0.3, Math.PI + 0.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, radiusBase * 1.1, -0.3, 0.3);
      ctx.stroke();

      ctx.restore();

      // Particles render cloud layer
      ctx.save();
      particles.forEach((p) => {
        if (isPlaying) {
          p.x += p.vx * speed;
          p.y += p.vy * speed;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.fillStyle = `rgba(${rgbBase}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Shimmer effects
        if (filterType === 'CYBER' && Math.random() > 0.985) {
          ctx.shadowColor = slideInfo.colorHex;
          ctx.shadowBlur = 10;
          ctx.fillStyle = `rgba(${rgbBase}, 0.95)`;
          ctx.fillRect(p.x - 1, p.y - 1, 3, 3);
          ctx.shadowBlur = 0;
        }
      });
      ctx.restore();

      // Video scanning scanlines effect overlay
      if (filterType === 'CYBER' || filterType === 'DECAY' || filterType === 'MONO') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.012)';
        const scanOffset = filterType === 'DECAY' ? 3 : 5;
        for (let i = 0; i < height; i += scanOffset) {
          ctx.fillRect(0, i, width, 1.5);
        }
      }

      // Draw camera framing scopes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      const marginO = 15;
      const cornerLen = 10;
      // Top-Left corner focus scope
      ctx.beginPath(); ctx.moveTo(marginO, marginO + cornerLen); ctx.lineTo(marginO, marginO); ctx.lineTo(marginO + cornerLen, marginO); ctx.stroke();
      // Top-Right cornerfocus scope
      ctx.beginPath(); ctx.moveTo(width - marginO, marginO + cornerLen); ctx.lineTo(width - marginO, marginO); ctx.lineTo(width - marginO - cornerLen, marginO); ctx.stroke();
      // Bottom-Left focus scope
      ctx.beginPath(); ctx.moveTo(marginO, height - marginO - cornerLen); ctx.lineTo(marginO, height - marginO); ctx.lineTo(marginO + cornerLen, height - marginO); ctx.stroke();
      // Bottom-Right focus scope
      ctx.beginPath(); ctx.moveTo(width - marginO, height - marginO - cornerLen); ctx.lineTo(width - marginO, height - marginO); ctx.lineTo(width - marginO - cornerLen, height - marginO); ctx.stroke();

      // UI Text Stats
      ctx.font = '8px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillText('STATUS: PRODUCING_FEED_ONLINE', marginO + 5, marginO + 20);
      ctx.fillText(`FILTER: ${filterType}`, marginO + 5, marginO + 32);
      ctx.fillText(`RES_DECODER: ${resolution}`, width - marginO - 120, marginO + 20);
      ctx.fillText(`FPS: ${(isPlaying ? 59.8 + Math.random() * 0.4 : 0).toFixed(1)} FPS`, width - marginO - 120, marginO + 32);

      // Blinking record marker red dot
      if (isPlaying) {
        if (Math.floor(Date.now() / 450) % 2 === 0) {
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(marginO + 195, marginO + 17, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = '#ef4444';
        ctx.fillText('• REC PLAYBACK', marginO + 203, marginO + 20);
      } else {
        ctx.fillStyle = '#e4e4e7';
        ctx.fillText('▎▎ PAUSED_FEED', marginO + 203, marginO + 20);
      }

      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [currentSlide, isPlaying, speed, filterType, resolution]);

  const getTimecode = (value: number) => {
    const totalFrames = 18 * 60; // 18 seconds simulated projection track length
    const frameIndex = Math.floor((value / 100) * totalFrames);
    const sec = Math.floor(frameIndex / 60);
    const rem = frameIndex % 60;
    return `00:00:${sec.toString().padStart(2, '0')}.${rem.toString().padStart(2, '0')}`;
  };

  const corePillars = [
    {
      id: '01',
      title: 'ARQUITECTURA DE CONTORNO',
      subtitle: 'GEOMETRY DEFINITION',
      desc: 'Formulamos líneas rígidas y estructuras anatómicas que resisten las distorsiones del uso diario.',
      color: 'text-cyan-400'
    },
    {
      id: '02',
      title: 'PRODUCCIÓN BAJO DEMANDA',
      subtitle: 'ZERO EXCESS STANDARD',
      desc: 'Fabricación limitada a 500 unidades para evitar la sobreproducción textil y mitigar residuos.',
      color: 'text-purple-400'
    },
    {
      id: '03',
      title: 'MATERIALIDAD ESTRUCTURADA',
      subtitle: 'RAW SUBSTANCE',
      desc: 'Selección meticulosa de lanas de cachemira, gamuzas finas y cueros con absorción lumínica para entornos nocturnos.',
      color: 'text-lime-400'
    },
    {
      id: '04',
      title: 'INTEGRACIÓN TECNOLÓGICA',
      subtitle: 'CYBER ORGANIC GLOW',
      desc: 'Sistemas de iluminación micro-LED recargables por USB-C cosidos a mano en paneles de fibra óptica.',
      color: 'text-white'
    }
  ];

  return (
    <div className="w-full space-y-16 animate-fade-in text-zinc-300">
      
      {/* Page Title Header */}
      <div className="border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <span className="font-mono text-[9px] text-cyan-400 tracking-[0.3em] uppercase block mb-1">
            ESTATUTOS DE PROPÓSITO // DECO_V.024
          </span>
          <h2 className="font-sans text-3xl font-extralight tracking-widest text-white uppercase">
            VISIÓN & MISIÓN
          </h2>
        </div>
        <p className="font-sans text-xs text-zinc-500 font-light max-w-sm">
          Los manifiestos y la dirección existencial de Kapital Cap, cruzando diseño textil, geometría urbana y preservación ecológica de recursos.
        </p>
      </div>

      {/* TYPOGRAPHY WELCOME CINEMATIC VIDEO SCREEN */}
      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <h3 className="font-mono text-[9.5px] uppercase tracking-[0.2em] font-semibold text-white">
              CINE_HOLOGRAPHIC // PROYECCIÓN BIENVENIDA
            </h3>
          </div>
          <div className="font-mono text-[8px] text-zinc-550 uppercase tracking-widest">
            SOURCE: PROD_TRAILER_DECO.MKV
          </div>
        </div>

        {/* Cinematic Welcome Video Viewport Container */}
        <div className="relative border border-zinc-900 bg-black overflow-hidden [clip-path:polygon(0_0,_100%_0,_100%_98%,_0_100%)] group">
          
          {/* Main Visual Render Layer */}
          <div className="relative h-[250px] sm:h-[350px] md:h-[400px] w-full flex items-center justify-center">
            
            {/* Real HTML5 Canvas running custom high-precision math orbits */}
            <canvas 
              ref={canvasRef} 
              className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-700 ${
                filterType === 'DECAY' ? 'sepia hue-rotate-15 contrast-125 saturate-50' :
                filterType === 'MONO' ? 'grayscale contrast-150 brightness-75' :
                filterType === 'CYBER' ? 'hue-rotate-180 brightness-110 saturate-150' : ''
              }`}
            />

            {/* Glowing noise filters */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none z-1" />

            {/* Simulated glitch overlay */}
            <div className="absolute inset-0 bg-zinc-950/20 mix-blend-overlay pointer-events-none opacity-40 select-none z-1" />

            {/* QR Code Modal Overlay */}
            <AnimatePresence>
              {showQRCode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center z-30"
                >
                  {/* Modal backdrop */}
                  <div 
                    className="absolute inset-0 bg-black/70 cursor-pointer"
                    onClick={() => {
                      setShowQRCode(false);
                      playSynthChime(330, 'sine', 0.15);
                    }}
                  />
                  
                  {/* QR Content Card */}
                  <div className="relative bg-black border-2 border-purple-400 p-6 md:p-8 space-y-4 max-w-sm mx-auto shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                    <div className="flex items-center justify-between">
                      <h3 className="font-mono text-[12px] text-purple-400 uppercase tracking-widest">
                        CÓDIGO QR // PRESENTACIÓN
                      </h3>
                      <button
                        onClick={() => {
                          setShowQRCode(false);
                          playSynthChime(330, 'sine', 0.15);
                        }}
                        className="text-zinc-500 hover:text-white text-lg font-bold cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    {/* QR Code Image - Using external API */}
                    <div className="flex justify-center p-4 bg-white">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://www.youtube.com/watch?v=example-kapital-vision-mision"
                        alt="Código QR - Video Visión y Misión"
                        className="w-64 h-64"
                      />
                    </div>

                    {/* Info Text */}
                    <div className="space-y-2">
                      <p className="font-mono text-[9px] text-zinc-400 tracking-wider uppercase">
                        Escanea para ver la presentación completa de Visión & Misión
                      </p>
                      <p className="font-sans text-[10px] text-zinc-500">
                        URL: https://www.youtube.com/watch?v=example-kapital-vision-mision
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => {
                          setShowQRCode(false);
                          playSynthChime(330, 'sine', 0.15);
                        }}
                        className="flex-1 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 py-2 font-mono text-[8px] uppercase tracking-widest cursor-pointer transition-colors"
                      >
                        Cerrar
                      </button>
                      <button
                        onClick={() => {
                          const link = "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://www.youtube.com/watch?v=example-kapital-vision-mision";
                          const a = document.createElement('a');
                          a.href = link;
                          a.download = 'kapital-vision-mision-qr.png';
                          a.click();
                          playSynthChime(660, 'sine', 0.1);
                        }}
                        className="flex-1 border border-purple-400 text-purple-400 hover:bg-purple-950/40 py-2 font-mono text-[8px] uppercase tracking-widest cursor-pointer transition-colors"
                      >
                        Descargar
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cinematic Words and Letters Display Box */}
            <div className="relative z-10 text-center px-6 max-w-4xl space-y-4 select-none pointer-events-none">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide + (customText ? '_custom' : '_core')}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  {/* Dynamic interactive letter projection override */}
                  {customText ? (
                    <div className="space-y-3">
                      <div className="inline-flex border border-[#00f5ff]/40 bg-[#00f5ff]/5 px-3 py-1 font-mono text-[7px] text-[#00f5ff] tracking-[0.3em] uppercase leading-none rounded-none">
                        SEÑAL EXTERIOR INYECTADA
                      </div>
                      <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.25em] uppercase leading-none drop-shadow-[0_0_15px_rgba(0,245,255,0.4)]">
                        {customText}
                      </h2>
                      <p className="font-mono text-[9px] text-zinc-400 tracking-[0.16em] max-w-lg mx-auto uppercase">
                        Sintonizando letras del visitante en la volumetría de Kapital // Cap
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className={`inline-flex border ${VIDEO_SLIDES[currentSlide].accentBorder} ${VIDEO_SLIDES[currentSlide].accentFill} px-2.5 py-0.5 font-mono text-[7px] ${VIDEO_SLIDES[currentSlide].accentColor} tracking-[0.22em] uppercase rounded-none`}>
                        {VIDEO_SLIDES[currentSlide].tagline}
                      </div>

                      {/* Monumental display letters */}
                      <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-extralight text-white tracking-[0.18em] uppercase leading-none">
                        {VIDEO_SLIDES[currentSlide].title.split(' // ').map((part, index) => (
                          <span key={index} className={index === 1 ? 'font-black opacity-90' : ''}>
                            {part}{index === 0 && ' // '}
                          </span>
                        ))}
                      </h2>

                      {/* captions subtext */}
                      <p className="font-sans text-xs sm:text-sm text-zinc-300 font-light tracking-wide max-w-xl mx-auto leading-relaxed">
                        {VIDEO_SLIDES[currentSlide].captions}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Bottom-right audio/interactive indicator prompting first use of atmospheric sound */}
            {isMuted && (
              <div className="absolute bottom-4 right-4 z-20">
                <button
                  onClick={() => {
                    setIsMuted(false);
                    playSynthChime(660, 'sine', 0.45);
                  }}
                  className="flex items-center gap-2 bg-cyan-950/80 border border-cyan-400/40 text-cyan-400 hover:bg-cyan-905 py-1.5 px-3 font-mono text-[8.5px] tracking-widest uppercase cursor-pointer transition-all duration-300 animate-pulse hover:scale-105"
                >
                  <Volume2 className="w-3 h-3 text-cyan-400" />
                  Activar Audio Atmosférico
                </button>
              </div>
            )}

            {/* QR Code Button */}
            {!showQRCode && (
              <div className="absolute bottom-4 left-4 z-20">
                <button
                  onClick={() => {
                    setShowQRCode(true);
                    playSynthChime(550, 'sine', 0.2);
                  }}
                  className="flex items-center gap-2 bg-purple-950/80 border border-purple-400/40 text-purple-400 hover:bg-purple-905 py-1.5 px-3 font-mono text-[8.5px] tracking-widest uppercase cursor-pointer transition-all duration-300 hover:scale-105"
                  title="Ver código QR del video"
                >
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  Código QR
                </button>
              </div>
            )}

          </div>

          {/* Video Player Timeline scrub track progress bar */}
          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = (clickX / rect.width) * 100;
              setProgress(percentage);
              playSynthChime(220 + percentage * 3, 'sine', 0.1);
            }}
            className="w-full h-1.5 bg-zinc-950 border-y border-zinc-900 cursor-pointer relative z-10 group"
          >
            <div 
              className={`h-full bg-gradient-to-r from-transparent to-${VIDEO_SLIDES[currentSlide].colorHex || 'cyan-400'} transition-all duration-75 relative`}
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, transparent 0%, ${VIDEO_SLIDES[currentSlide].colorHex || '#22d3ee'} 100%)`
              }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md scale-0 group-hover:scale-100 transition-transform" />
            </div>
          </div>

          {/* Interactive Player Console Dashboard Panel */}
          <div className="bg-zinc-950 px-5 py-4 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 z-10 select-none">
            
            {/* Core Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  playSynthChime(isPlaying ? 280 : 440, 'sine', 0.1);
                }}
                className={`w-8 h-8 rounded-none border flex items-center justify-center cursor-pointer transition-colors ${
                  isPlaying 
                    ? 'border-white bg-white/5 text-white' 
                    : 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>

              <button
                onClick={handleSkipNext}
                className="w-8 h-8 rounded-none border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 flex items-center justify-center cursor-pointer"
                title="Skip Segment"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleResetVideo}
                className="w-8 h-8 rounded-none border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 flex items-center justify-center cursor-pointer"
                title="Reset/Re-render Trailer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="h-4 w-[1px] bg-zinc-900" />

              {/* Sound Node Toggle */}
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (isMuted) {
                    setTimeout(() => playSynthChime(560, 'sine', 0.25), 50);
                  }
                }}
                className={`w-8 h-8 rounded-none border flex items-center justify-center cursor-pointer transition-colors ${
                  !isMuted 
                    ? 'border-cyan-400 bg-cyan-950/20 text-cyan-400' 
                    : 'border-zinc-800 text-zinc-650 hover:text-zinc-450'
                }`}
                title={isMuted ? 'Unmute space sound' : 'Mute sound'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              <span className="font-mono text-[9px] text-zinc-500 tracking-wider">
                {getTimecode(progress)}
              </span>
            </div>

            {/* Video Parameters Controllers: Filter / Resolution / Speed */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center">
              
              {/* SPEED MATRIX SELECTOR */}
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[8px] text-zinc-500 uppercase">VEL:</span>
                {[0.5, 1, 2].map((sp) => (
                  <button
                    key={sp}
                    onClick={() => {
                      setSpeed(sp);
                      playSynthChime(300 + sp * 80, 'sine', 0.08);
                    }}
                    className={`font-mono text-[8px] px-1.5 py-0.5 border cursor-pointer ${
                      speed === sp 
                        ? 'border-white text-white' 
                        : 'border-transparent text-zinc-500 hover:text-white'
                    }`}
                  >
                    {sp}x
                  </button>
                ))}
              </div>

              <div className="h-4 w-[1px] bg-zinc-900 hidden sm:block" />

              {/* COLOR RESOLUTION CORRECTION */}
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[8px] text-zinc-500 uppercase">CONTR:</span>
                {[
                  { id: 'DEFAULT', label: 'NORMAL' },
                  { id: 'CYBER', label: 'INFRARROJO' },
                  { id: 'DECAY', label: 'CCTV' },
                  { id: 'MONO', label: 'NOIR' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setFilterType(item.id as any);
                      playSynthChime(190, 'triangle', 0.1);
                    }}
                    className={`font-mono text-[8px] px-1.5 py-0.5 border cursor-pointer ${
                      filterType === item.id 
                        ? 'border-cyan-400 text-cyan-400 bg-cyan-950/10' 
                        : 'border-transparent text-zinc-500 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="h-4 w-[1px] bg-zinc-900 hidden sm:block" />

              {/* SIMULATED RESOLUTION SELECTOR */}
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[8px] text-zinc-500 uppercase">CAL:</span>
                {['PROXY', 'HD', '4K'].map((res) => (
                  <button
                    key={res}
                    onClick={() => {
                      setResolution(res as any);
                      playSynthChime(400, 'sine', 0.05);
                    }}
                    className={`font-mono text-[8px] px-1.5 py-0.5 border cursor-pointer ${
                      resolution === res 
                        ? 'border-white text-white' 
                        : 'border-transparent text-zinc-550 hover:text-white'
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>

            </div>

          </div>

          {/* Interactive Letter Customization Console section */}
          <div className="bg-[#0b0c0f] border-t border-zinc-900 px-5 py-4 space-y-3 z-10 selection:bg-cyan-400 selection:text-black">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              
              <div className="flex items-center gap-2 flex-none select-none">
                <Type className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                  INYECTAR LETRAS BIENVENIDA:
                </span>
              </div>

              {/* Interactive custom character form */}
              <div className="relative w-full flex items-center">
                <input 
                  type="text" 
                  value={customText}
                  onChange={(e) => {
                    setCustomText(e.target.value);
                    if (e.target.value) {
                      setCurrentSlide(3); // snapshot play area to slide 3 for customize welcome text display
                      playSynthChime(150 + e.target.value.length * 15, 'sine', 0.05);
                    }
                  }}
                  placeholder="ESCRIBE TU NOMBRE, MARCA O MENSAJE PARA COMPROBAR LA TRANSMISIÓN..."
                  maxLength={36}
                  className="w-full bg-black border border-zinc-850 px-3 py-1.5 font-mono text-[9px] text-white tracking-[0.18em] uppercase focus:border-cyan-400 focus:outline-none placeholder-zinc-700 transition-colors"
                />
                
                {customText && (
                  <button 
                    onClick={() => { setCustomText(''); playSynthChime(180, 'sine', 0.15); }}
                    className="absolute right-3 font-mono text-[8px] text-zinc-500 hover:text-white bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 uppercase cursor-pointer"
                  >
                    BORRAR
                  </button>
                )}
              </div>

            </div>

            {/* Mini informational feedback logs */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[7px] text-zinc-650 tracking-wider select-none leading-none">
              <span className="flex items-center gap-1">
                <Cpu className="w-2.5 h-2.5 text-cyan-400 stroke-[1.5]" />
                CPU_HOLO_BUFFER: CALIBRADO
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-400 stroke-[1.5]" />
                SSL_ENCRYPT7: PROTOCOLO ACTIVO
              </span>
              <span className="flex items-center gap-1">
                © SISTEMA DE PROYECCIÓN INTERACTIVA TRIDIMENSIONAL v0.24a
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* Main Mission & Vision Bento Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* MISIÓN CARD */}
        <div 
          onMouseEnter={() => setHoveredCard('MISIÓN')}
          onMouseLeave={() => setHoveredCard(null)}
          className={`relative border p-8 md:p-10 transition-all duration-500 cursor-default bg-zinc-950/40 select-none [clip-path:polygon(0_0,_100%_0,_100%_97%,_0_100%)] ${
            hoveredCard === 'MISIÓN' 
              ? 'border-cyan-400 shadow-[0_0_20px_-5px_rgba(34,211,238,0.2)]' 
              : 'border-zinc-900 hover:border-zinc-800'
          }`}
        >
          {/* Decorative indicator lines */}
          <div className="absolute top-4 right-4 font-mono text-[8px] text-zinc-700 tracking-widest uppercase">
            KPTL-M_01 // SECURE_BLOCK
          </div>
          <div className="absolute top-10 right-4 flex items-center gap-1.5 text-zinc-600 font-mono text-[7px] tracking-widest">
            <span className={`w-1.5 h-1.5 rounded-full ${hoveredCard === 'MISIÓN' ? 'bg-cyan-400 animate-pulse' : 'bg-zinc-700'}`}></span>
            STATUS: ACTIVE_READ
          </div>

          <div className="space-y-6">
            <div className="w-12 h-12 border border-zinc-850 bg-zinc-950 flex items-center justify-center">
              <Target className="w-5 h-5 text-cyan-400 stroke-[1.2]" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[9px] text-zinc-500 tracking-[0.25em] block uppercase">PROPÓSITO CENTRAL</span>
              <h3 className="font-sans text-xl md:text-2xl font-light tracking-wide text-white uppercase">
                NUESTRA MISIÓN
              </h3>
            </div>

            <p className="font-sans text-sm font-light text-zinc-400 leading-relaxed tracking-wide">
              Diseñar, calibrar y consolidar prendas de vestir exclusivas bajo un formato de micro-producción ultra-limitada. En <strong className="text-white font-medium">Kapital Cap</strong> no producimos masivamente; esculpimos siluetas geométricas sofisticadas que fusionan materiales de alta resistencia con iluminación reactiva LED. 
            </p>

            <p className="font-sans text-zinc-500 text-xs font-light leading-relaxed">
              Buscamos empoderar la expresión urbana individual proveyendo prendas icónicas, seguras y de calidad inalterable, manteniendo simultáneamente una huella ecológica libre de excesos.
            </p>

            <div className="pt-4 border-t border-zinc-900/60 flex justify-between items-center text-[9px] font-mono text-zinc-600">
              <span>MÓDULOS ACTIVOS: 500 / DROP LIMITE</span>
              <span>VER_024</span>
            </div>
          </div>
        </div>

        {/* VISIÓN CARD */}
        <div 
          onMouseEnter={() => setHoveredCard('VISIÓN')}
          onMouseLeave={() => setHoveredCard(null)}
          className={`relative border p-8 md:p-10 transition-all duration-500 cursor-default bg-zinc-950/40 select-none [clip-path:polygon(0_0,_100%_0,_100%_97%,_0_100%)] ${
            hoveredCard === 'VISIÓN' 
              ? 'border-purple-400 shadow-[0_0_20px_-5px_rgba(168,85,247,0.2)]' 
              : 'border-zinc-900 hover:border-zinc-800'
          }`}
        >
          {/* Decorative indicator lines */}
          <div className="absolute top-4 right-4 font-mono text-[8px] text-zinc-700 tracking-widest uppercase">
            KPTL-V_02 // SYSTEM_FUTURE
          </div>
          <div className="absolute top-10 right-4 flex items-center gap-1.5 text-zinc-600 font-mono text-[7px] tracking-widest">
            <span className={`w-1.5 h-1.5 rounded-full ${hoveredCard === 'VISIÓN' ? 'bg-purple-400 animate-pulse' : 'bg-zinc-700'}`}></span>
            PROJECTION: CALIBRATED
          </div>

          <div className="space-y-6">
            <div className="w-12 h-12 border border-zinc-850 bg-zinc-950 flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-400 stroke-[1.2]" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[9px] text-zinc-500 tracking-[0.25em] block uppercase">PROYECCIÓN ESTRATÉGICA</span>
              <h3 className="font-sans text-xl md:text-2xl font-light tracking-wide text-white uppercase">
                NUESTRA VISIÓN
              </h3>
            </div>

            <p className="font-sans text-sm font-light text-zinc-400 leading-relaxed tracking-wide">
              Establecer un precedentere global de moda urbana donde la sofisticación del diseño cyber-organic coexista sin fisuras con la sustentabilidad absoluta. Proyectamos un futuro de manufactura regenerativa sin inventario estancado.
            </p>

            <p className="font-sans text-zinc-500 text-xs font-light leading-relaxed">
              Para el año 2030, aspiramos a descentralizar nuestra cadena de ensamble local en hubs distribuidos, imprimiendo componentes biodegradables en 3D y guiando la personalización digital interactiva en tiempo real.
            </p>

            <div className="pt-4 border-t border-zinc-900/60 flex justify-between items-center text-[9px] font-mono text-zinc-600">
              <span>ESTE VALOR SE MIDE EN IMPACTO NETO C_0</span>
              <span>ESTADIO_v3</span>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Tabs console for details */}
      <div className="bg-zinc-950/20 border border-zinc-900 p-6 md:p-8 space-y-8 select-none [clip-path:polygon(0_0,_100%_0,_100%_98%,_0_100%)]">
        
        {/* Terminal Header with humble metadata labels */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-5">
          <div>
            <span className="font-mono text-[9px] text-zinc-500 block uppercase">TERMINAL DE ANÁLISIS DE FILOSOFÍA</span>
            <span className="font-sans text-sm text-white font-medium uppercase tracking-[0.15em]">DATOS PARAMETRIZADOS</span>
          </div>

          {/* Selector Tabs */}
          <div className="flex gap-2">
            {[
              { id: 'METRICS', label: 'MÉTRICAS DE COMPROMISO' },
              { id: 'PILLARS', label: 'PILARES OPERATIVOS' },
              { id: 'MANI', label: 'DECLARATORIA' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSegment(tab.id as any)}
                className={`px-3 py-1.5 font-mono text-[8.5px] font-semibold tracking-wider border cursor-pointer transition-colors ${
                  activeSegment === tab.id
                    ? 'border-white text-white bg-white/5'
                    : 'border-zinc-900 text-zinc-500 hover:text-white hover:border-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Conditional rendering of parameters */}
        {activeSegment === 'METRICS' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in text-center md:text-left">
            
            {/* Metric Unit 1 */}
            <div className="p-4 border border-zinc-900/40 bg-black/30 space-y-2">
              <span className="font-mono text-[8px] text-zinc-600 tracking-wider block">M_1 // EFFICIENCY</span>
              <p className="font-sans text-3xl font-extralight text-cyan-400">0.0%</p>
              <p className="font-sans text-[10px] text-zinc-400 font-medium uppercase tracking-[0.05em]">SOPORTE DE RESIDUO TEXTIL</p>
              <p className="text-[9.5px] text-zinc-500 font-light font-sans max-w-xs mx-auto md:mx-0">
                Alineamos los insumos comprados exactamente al recuento de órdenes registradas en bolsa.
              </p>
            </div>

            {/* Metric Unit 2 */}
            <div className="p-4 border border-zinc-900/40 bg-black/30 space-y-2">
              <span className="font-mono text-[8px] text-zinc-600 tracking-wider block">M_2 // LIMIT DROP CAPACITY</span>
              <p className="font-sans text-3xl font-extralight text-purple-400">500</p>
              <p className="font-sans text-[10px] text-zinc-400 font-medium uppercase tracking-[0.05em]">COPIAS INDIVIDUALES MÁXIMO</p>
              <p className="text-[9.5px] text-zinc-500 font-light font-sans max-w-xs mx-auto md:mx-0">
                Preservamos la escasez auténtica. Todo diseño se sella una vez que alcanza su límite histórico de producción.
              </p>
            </div>

            {/* Metric Unit 3 */}
            <div className="p-4 border border-zinc-900/40 bg-black/30 space-y-2">
              <span className="font-mono text-[8px] text-zinc-600 tracking-wider block">M_3 // ENCRYPTED AUTH</span>
              <p className="font-sans text-3xl font-extralight text-white">AES_256</p>
              <p className="font-sans text-[10px] text-zinc-400 font-medium uppercase tracking-[0.05em]">ORDEN REFORZADA SECURE</p>
              <p className="text-[9.5px] text-zinc-500 font-light font-sans max-w-xs mx-auto md:mx-0">
                Cada orden genera su código de tracking al instante de ser enviada del laboratorio, protegiendo todo diseño personalizado.
              </p>
            </div>

          </div>
        )}

        {activeSegment === 'PILLARS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            {corePillars.map((p) => (
              <div 
                key={p.id} 
                className="p-5 border border-zinc-900 hover:border-zinc-800 transition-colors bg-zinc-950/30 space-y-3"
              >
                <div className="flex justify-between items-baseline">
                  <span className={`font-mono text-[9px] font-bold ${p.color}`}>{p.subtitle}</span>
                  <span className="font-mono text-[8px] text-zinc-750 font-bold">{p.id}</span>
                </div>
                <h4 className="font-sans text-[10px] text-white font-semibold tracking-wider uppercase leading-snug">
                  {p.title}
                </h4>
                <p className="font-sans text-[10px] text-zinc-500 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeSegment === 'MANI' && (
          <div className="animate-fade-in space-y-4 max-w-3xl leading-relaxed text-zinc-400 font-sans text-xs">
            <h4 className="font-sans text-sm text-white font-medium uppercase tracking-wider mb-2">INTEGRIDAD SOBRE ESCALA</h4>
            <p>
              La industria contemporánea de la indumentaria ha deformado el valor del vestuario convirtiéndolo en desecho continuo y masificación sin propósito. Nosotros fundamos nuestras bases en un <strong className="text-white font-medium">manifiesto minimalista</strong> que descarta la acumulación insensata de inventario.
            </p>
            <p className="border-l-2 border-cyan-400/40 pl-4 py-1 italic text-zinc-500">
              "No vestimos cuerpos; definimos la volumetría de la presencia digital en un mundo de exceso visual."
            </p>
            <p>
              Diseñamos para quienes entienden el silencio como el lujo definitivo y la geometría estricta como el único lenguaje atemporal. Toda compra realizada en Kapital Cap es una contribución directa a un ecosistema de diseño reflexivo y balanceado.
            </p>
          </div>
        )}

      </div>
      
      {/* Decorative prompt/alert banner bottom */}
      <div className="p-4 border border-zinc-900 bg-zinc-950/50 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left justify-between select-none">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-cyan-400 stroke-[1.3] flex-none" />
          <p className="font-mono text-[9px] tracking-wide text-zinc-500 uppercase">
            CERTIFICACIÓN: TODA NUESTRA CADENA DE EMBALAJE UTILIZA CARTÓN REUTILIZABLE 100% LIBRE DE PLÁSTICOS.
          </p>
        </div>
        <span className="font-mono text-[8px] text-zinc-700 tracking-widest uppercase flex-none">ENVÍO DHL CON RESPALDO NET_C</span>
      </div>

    </div>
  );
}
