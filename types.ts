
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  stock?: number;
  isBestSeller?: boolean;
  variants?: any[]; // Shopify variants
  handle?: string;
  images?: string[];
}

export interface CartItem extends Product {
  internalId: string;
  quantity: number;
  frontText?: string;
  backText?: string;
  isDoubleSided?: boolean;
  isGiftBox?: boolean;
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    GA_INITIALIZED?: boolean;
  }
}

export interface DesignConcept {
  conceptName: string;
  description: string;
  visualStyle: string;
}
