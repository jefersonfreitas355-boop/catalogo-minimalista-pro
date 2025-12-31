
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-[#f0f2f4] dark:border-gray-800 px-4 md:px-10 py-3 shadow-sm">
      <div className="max-w-[1440px] mx-auto flex items-center justify-center whitespace-nowrap">
        <Link to="/" className="flex items-center gap-3 text-text-main dark:text-white">
          <div className="size-8 text-primary">
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Catálogo Minimalista</h2>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
