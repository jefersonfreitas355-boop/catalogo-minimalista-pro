
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, flavor?: string) => void;
  removeFromCart: (productId: string, flavor?: string) => void;
  updateQuantity: (productId: string, quantity: number, flavor?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}



const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = useCallback((product: Product, quantity = 1, flavor?: string) => {
    setCart(prev => {
      // Encontrar item existente considerando produto E sabor
      const existing = prev.find(item =>
        item.id === product.id && item.flavor === flavor
      );

      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.flavor === flavor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Adicionar novo item com sabor
      return [...prev, { ...product, quantity, flavor }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string, flavor?: string) => {
    setCart(prev => prev.filter(item =>
      !(item.id === productId && item.flavor === flavor)
    ));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, flavor?: string) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item =>
        !(item.id === productId && item.flavor === flavor)
      ));
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === productId && item.flavor === flavor ? { ...item, quantity } : item
    ));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const totalItems = useMemo(() =>
    cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(() =>
    cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    [cart]
  );

  const contextValue = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    openCart,
    closeCart
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isCartOpen, openCart, closeCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
