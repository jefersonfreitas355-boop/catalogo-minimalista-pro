
import React from 'react';
import { CATEGORIES } from '../data';

interface SidebarProps {
  onCategoryChange: (category: string) => void;
  selectedCategories: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ onCategoryChange, selectedCategories }) => {
  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 flex flex-col gap-6">
      <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-text-main dark:text-white">Filtros</h2>
          <button className="text-xs font-medium text-primary hover:underline">Limpar tudo</button>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-[20px]">category</span>
            <h3 className="text-sm font-bold">Categorias</h3>
          </div>
          <div className="flex flex-col gap-2.5">
            {CATEGORIES.map(cat => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => onCategoryChange(cat)}
                  className="rounded border-gray-300 text-primary focus:ring-primary/20 w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-text-secondary group-hover:text-primary transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
