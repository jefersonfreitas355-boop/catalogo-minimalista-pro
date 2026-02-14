
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { totalItems, openCart } = useCart();
  return (
    <header className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-[#f0f2f4] dark:border-gray-800 px-4 md:px-10 py-3 shadow-sm">
      <div className="max-w-[1440px] mx-auto flex items-center justify-center whitespace-nowrap">
        <Link to="/" className="flex items-center gap-3 text-text-main dark:text-white">
          <div className="size-8 text-primary">
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Catálogo Auxiliar: <span className="text-primary">Ufa Penha</span></h2>
        </Link>
        <button
          id="cart-toggle-btn"
          onClick={openCart}
          className="relative ml-auto p-2 text-text-main dark:text-white hover:text-primary transition-colors"
          aria-label="Abrir carrinho"
        >
          <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-600 rounded-full border-2 border-surface-light dark:border-surface-dark">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
