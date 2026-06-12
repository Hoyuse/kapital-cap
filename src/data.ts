import { Product } from './types';

export const products: Product[] = [
  {
    id: 'cyber-black',
    name: 'SNAPBACK CYBER-BLACK',
    edition: 'EDICIÓN LIMITADA 001/500',
    price: 340000,
    description: 'Textura mate premium, bordado tonal de alta densidad y silueta arquitectónica. Diseñada para el futuro del streetwear urbano con absorción lumínica en entornos oscuros.',
    material: 'CUERO SINTÉTICO PREMIUM',
    closure: 'SNAPBACK AJUSTABLE',
    details: 'BORDADO 3D TONAL',
    imageUrl: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=600&h=800',
    detailImageUrl: 'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?auto=format&fit=crop&q=80&w=600&h=800',
    tag: 'LIMITED_EDITION_24',
    category: 'COLLECTIONS',
    specs: [
      { label: 'MATERIAL', value: 'CUERO SINTÉTICO PREMIUM' },
      { label: 'CIERRE', value: 'SNAPBACK AJUSTABLE' },
      { label: 'DETALLES', value: 'BORDADO 3D TONAL' }
    ]
  },
  {
    id: 'trucker-neon',
    name: 'TRUCKER CAP NEÓN',
    edition: 'EDICIÓN LIMITADA 124/300',
    price: 260000,
    description: 'Malla de poliéster ultra-ventilada de alta resistencia con visera de fibra óptica LED recargable por USB-C. Logotipo flúor bordado con hilo reflectante de alta visibilidad.',
    material: 'MESH REFORZADO & ALGODÓN',
    closure: 'SNAPBACK DE RESINA FUSIONADA',
    details: 'SISTEMA INTEGRADO DE ILUMINACIÓN LED',
    imageUrl: 'https://images.unsplash.com/photo-1534215754734-18e55d13ce35?auto=format&fit=crop&q=80&w=600&h=800',
    detailImageUrl: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=600&h=800',
    tag: 'NEON_GLOW_24',
    category: 'ARCHIVE',
    specs: [
      { label: 'MATERIAL', value: 'MESH REFORZADO & ALGODÓN' },
      { label: 'CIERRE', value: 'SNAPBACK COMPRESOR' },
      { label: 'DETALLES', value: 'SISTEMA LUMINOSO RECARGABLE' }
    ]
  },
  {
    id: 'dad-desestructurada',
    name: 'DAD HAT DESESTRUCTURADA',
    edition: 'EDICIÓN LIMITADA 089/400',
    price: 220000,
    description: 'Sarga de algodón de alto gramaje con lavado ácido intenso. Construcción fluida sin soportes rígidos para un ajuste de caída orgánica muy cómodo y desenfadado.',
    material: '100% COTTON CHINO TWILL',
    closure: 'HEBILLA METÁLICA DESGASTADA',
    details: 'BORDADO BLANCO DESGASTADO',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600&h=800',
    detailImageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600&h=800',
    tag: 'WASHED_LAB_24',
    category: 'LAB',
    specs: [
      { label: 'MATERIAL', value: '100% SARGA CON LAVADO ÁCIDO' },
      { label: 'CIERRE', value: 'SLAP ADJUSTER METÁLICO' },
      { label: 'DETALLES', value: 'BORDADO DE ALTO IMPACTO' }
    ]
  },
  {
    id: 'suede-prestige',
    name: 'PREMIUM SUEDE SHADOW',
    edition: 'EDICIÓN LIMITADA 044/150',
    price: 360000,
    description: 'Gorra fabricada enteramente con cuero de gamuza premium tacto suave, con un broche metálico grabado Kapital en la ala para una firma minimalista impecable.',
    material: 'GAMUZA REGENERADA EN FRÍO',
    closure: 'AJUSTE DE GAMUZA CON HEBILLA ZINC',
    details: 'LOGOTIPO MONOGRAMA DE ACERO GRABADO',
    imageUrl: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=600&h=800',
    detailImageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600&h=800',
    tag: 'SUEDE_SHADOW_24',
    category: 'COLLECTIONS',
    specs: [
      { label: 'MATERIAL', value: 'GAMUZA PREMIUM TRATADA' },
      { label: 'CIERRE', value: 'HEBILLA METÁLICA BRUÑIDA' },
      { label: 'DETALLES', value: 'ETIQUETA EN BRIM METÁLICA' }
    ]
  },
  {
    id: 'wool-signature',
    name: 'WOOL RIBBON SIGNATURE',
    edition: 'EDICIÓN LIMITADA 003/100',
    price: 380000,
    description: 'Lana de cachemira extra-fina con visera de cuero genuino texturizado. Logotipo de cinta de alta densidad en el lateral, una silueta puramente escultórica.',
    material: '80% CACHEMIRA, 20% CUERO DE BECERRO',
    closure: 'SISTEMA MAGNÉTICO INTEGRADO FIDLOCK',
    details: 'INSIGNIA REFORZADA DE ACERO CNC',
    imageUrl: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=600&h=800',
    detailImageUrl: 'https://images.unsplash.com/photo-1534215754734-18e55d13ce35?auto=format&fit=crop&q=80&w=600&h=800',
    tag: 'WOOL_SIGNATURE_24',
    category: 'COLLECTIONS',
    specs: [
      { label: 'MATERIAL', value: 'CACHEMIRA FUSIONADA & CUERO' },
      { label: 'CIERRE', value: 'BROCHE DE PRESIÓN FIDLOCK' },
      { label: 'DETALLES', value: 'INSIGNIA DE MICRO METAL' }
    ]
  },
  {
    id: 'exo-skeleton-panel',
    name: 'EXO-SKELETON CARBON',
    edition: 'EDICIÓN LIMITADA 015/200',
    price: 420000,
    description: 'Armadura exterior rígida fabricada mediante laminado de fibra de carbono aeroespacial y nylon balístico. Ofrece estabilidad estructural insuperable con un broche lateral de desenganche rápido.',
    material: 'FIBRA DE CARBONO & NYLON BALÍSTICO',
    closure: 'SISTEMA MAGNÉTICO INTEGRADO FIDLOCK',
    details: 'PLACAS COMPOSITAS REFLEX',
    imageUrl: 'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?auto=format&fit=crop&q=80&w=600&h=800',
    detailImageUrl: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=600&h=800',
    tag: 'EXO_CARBON_24',
    category: 'COLLECTIONS',
    specs: [
      { label: 'MATERIAL', value: 'PLANCHAS CARBON TRATADO 3K' },
      { label: 'CIERRE', value: 'SNAP DE DESENGANCHE MECÁNICO' },
      { label: 'DETALLES', value: 'BORDADOS ULTRA-DENSOS DE NYLON' }
    ]
  },
  {
    id: 'minimal-tactical',
    name: 'TACTICAL MOLLE RUNNER',
    edition: 'EDICIÓN LIMITADA 074/250',
    price: 290000,
    description: 'Silueta minimalista de running con 5 paneles construida sobre tejido ripstop impermeable de alta tracción y laterales cortados con láser con el esquema MOLLE estándar militar.',
    material: 'TEJIDO RIPSTOP IMPERMEABLE REFORZADO',
    closure: 'SISTEMA DE AJUSTE ELÁSTICO DRAWSTEALTH',
    details: 'CORREAS MOLLE LATERALES',
    imageUrl: 'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?auto=format&fit=crop&q=80&w=600&h=800',
    detailImageUrl: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=600&h=800',
    tag: 'TACT_MOLLE_24',
    category: 'ARCHIVE',
    specs: [
      { label: 'MATERIAL', value: 'RIPSTOP DE ALTA GENTILEZA' },
      { label: 'CIERRE', value: 'CORDÓN ELÁSTICO REGULADOR DE FLUJO' },
      { label: 'DETALLES', value: 'SISTEMA DE MÓDULOS DE ANCLAJE' }
    ]
  }
];

export const editorialSlides = [
  {
    title: 'CRAFTSMANSHIP OF THE VOID',
    quote: 'La ausencia de luz no es vacío; es la concentración máxima del detalle estructural.',
    text: 'Cada unidad de la serie Cyber-Black ha sido sometida a un riguroso proceso de curaduría técnica. La estructura desestructurada desafía la geometría tradicional, mientras que el acabado mate absorbe la luz ambiente, creando una presencia imponente en entornos de baja luminosidad.',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=600&h=800'
  },
  {
    title: 'THE HYPERSTITCH NARRATIVE',
    quote: 'Cada puntada es una coordenada matemática en el plano de la moda urbana.',
    text: 'Utilizamos agujas de punta diamante de alta frecuencia para asegurar que el bordado tonal de alta densidad mantenga su relieve tridimensional indeformable bajo tensiones mecánicas. El relieve 3D de 1.8mm captura sombras mínimas generando una silueta impecable.',
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=600&h=800'
  }
];
