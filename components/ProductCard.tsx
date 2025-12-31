
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price);
  const formattedOldPrice = product.oldPrice ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.oldPrice) : null;



  return (
    <article className="flex flex-col justify-between bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary hover:shadow-md transition-all duration-300 group min-h-[180px]">
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
      </div>
    </article>
  );
};

export default ProductCard;
