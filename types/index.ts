export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  discount: number;
  discountedPrice: number;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  images: string[];
  colors?: string[];
  sizes?: string[];
  stock: number;
  features?: string[];
  specifications?: {
    [key: string]: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}