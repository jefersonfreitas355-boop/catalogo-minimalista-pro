
import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';
import FlavorSelectionModal from './FlavorSelectionModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isFlavorModalOpen, setIsFlavorModalOpen] = useState(false);
  const formattedPrice = formatCurrency(product.price);
  const formattedOldPrice = product.oldPrice ? formatCurrency(product.oldPrice) : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Se o produto tem sabores, abrir modal
    if (product.flavors && product.flavors.length > 0) {
      setIsFlavorModalOpen(true);
    } else {
      // Caso contrário, adicionar direto ao carrinho
      addToCart(product);
    }
  };



  return (
    <article
      onClick={() => {
        if (!product.outOfStock) {
          window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(product.name)}`, '_blank')
        }
      }}
      className={`flex flex-col justify-between bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary hover:shadow-md transition-all duration-300 group min-h-[180px] cursor-pointer relative overflow-hidden ${product.outOfStock ? 'opacity-75 grayscale' : ''}`}
    >
      {product.outOfStock && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-red-600/90 text-white text-center py-2 font-black text-xl uppercase tracking-widest z-10 shadow-lg rotate-0 backdrop-blur-sm border-y-2 border-white/20">
          Esgotado
        </div>
      )}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">{product.category}</span>
          <h3 className="text-xl font-bold text-text-main dark:text-white leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.unit && (
            <span className="text-sm text-text-secondary font-medium">{product.unit}</span>
          )}
          {product.description && (
            <div className="mt-3 py-1.5 px-3 bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-lg">
              <p className="text-[13px] text-primary dark:text-blue-400 font-bold leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex flex-col gap-1">
          {formattedOldPrice && (
            <div className="text-xs text-text-secondary line-through">{formattedOldPrice}</div>
          )}
          <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-black text-2xl shadow-lg shadow-red-500/30 animate-pulse-subtle border border-red-400/20">
            {formattedPrice}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!!product.outOfStock}
          className={`flex items-center justify-center size-12 rounded-full shadow-md transition-all duration-300 ${product.outOfStock
            ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed text-gray-400'
            : 'bg-primary text-white hover:bg-red-700 hover:scale-110 hover:shadow-lg hover:shadow-red-500/30 active:scale-95'
            }`}
          aria-label="Adicionar ao carrinho"
        >
          <span className="material-symbols-outlined text-[24px]">add_shopping_cart</span>
        </button>
      </div>

      {/* Modal de Seleção de Sabores */}
      <FlavorSelectionModal
        product={product}
        isOpen={isFlavorModalOpen}
        onClose={() => setIsFlavorModalOpen(false)}
      />
    </article>
  );
};

export default React.memo(ProductCard);
