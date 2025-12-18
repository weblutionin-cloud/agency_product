export interface Product {
  id: string;
  name: string;
  nameHindi?: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  description?: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
