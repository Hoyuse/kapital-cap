export interface Product {
  id: string;
  name: string;
  edition: string;
  price: number;
  description: string;
  material: string;
  closure: string;
  details: string;
  imageUrl: string;
  detailImageUrl?: string;
  tag: string;
  category: 'COLLECTIONS' | 'ARCHIVE' | 'LAB' | 'EDITORIAL';
  specs?: { label: string; value: string }[];
  soldOut?: boolean;
}

export interface CustomCap {
  baseType: 'SNAPBACK' | 'DAD_HAT' | 'TRUCKER';
  material: 'CYBER_LEATHER' | 'SLATE_SUEDE' | 'WASHED_DENIM' | 'TECH_WOOL';
  logoStyle: 'EMBROIDERY_3D' | 'LASER_ENGRAVING' | 'METAL_RIBBON' | 'NEON_LED';
  customText: string;
  ledColor: 'CYAN' | 'VIOLET' | 'NEON' | 'WHITE' | 'STEALTH';
  price: number;
}

export interface CartItem {
  id: string; // Dynamic ID, especially for custom designs
  product?: Product;
  customDesign?: CustomCap;
  quantity: number;
}
