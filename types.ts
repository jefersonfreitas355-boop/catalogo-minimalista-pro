
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  oldPrice?: number;
  stock: number;
  image: string;
  status?: string;
  specs?: Record<string, string>;
  unit?: string; // Quantidade/peso do produto (ex: "1kg", "500g", "1L")
  outOfStock?: boolean;
  originalCategory?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Filters {
  search: string;
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  onlyInStock: boolean;
}
