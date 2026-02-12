
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
  flavors?: string[]; // Sabores disponíveis (ex: ["Crocante", "Ao Leite", "Branco"])
}

export interface CartItem extends Product {
  quantity: number;
  flavor?: string; // Sabor selecionado para este item do carrinho
}

export interface FlavorQuantity {
  flavor: string;
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
