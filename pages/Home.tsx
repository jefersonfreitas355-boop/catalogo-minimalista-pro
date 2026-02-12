import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data';
import SmartSearch from '../components/SmartSearch';
import HowToUse from '../components/HowToUse';

// Memoized category button to prevent unnecessary re-renders
const CategoryButton = React.memo<{ category: string }>(({ category }) => {
  const isPromotion = category === 'Promoções';

  return (
    <Link
      to={`/catalog?cat=${category}`}
      className={`group flex h-12 md:h-11 items-center justify-center rounded-full px-5 md:px-6 transition-all duration-300 shadow-sm md:shadow-none ${isPromotion
          ? 'bg-gradient-to-r from-red-600 to-red-500 border border-white/30 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:scale-105 hover:shadow-[0_0_20px_rgba(239,68,68,0.7)]'
          : 'bg-white dark:bg-[#1c2433] border border-[#f0f2f4] dark:border-white/5 hover:border-primary hover:bg-primary/5 dark:hover:bg-white/5'
        }`}
    >
      <span
        className={`text-sm md:text-sm font-bold whitespace-nowrap ${isPromotion
            ? 'text-white'
            : 'text-text-main dark:text-white group-hover:text-primary'
          }`}
      >
        {category}
      </span>
    </Link>
  );
});

CategoryButton.displayName = 'CategoryButton';

const Home: React.FC = () => {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 w-full max-w-[960px] mx-auto py-16 md:py-28">
      <div className="w-full text-center mb-10 space-y-3 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-main dark:text-white leading-tight">
          Catálogo Auxiliar: <span className="text-primary">Ufa Penha</span>
        </h1>
        <p className="text-text-secondary dark:text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Uma ferramenta independente e minimalista para facilitar sua consulta. Encontre o que precisa no estoque sem distrações.
        </p>
        <HowToUse />
      </div>

      <div className="w-full max-w-2xl mb-12">
        <SmartSearch placeholder="Digite o nome do produto que você procura..." />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 w-full animate-fade-in-up px-2">
        {CATEGORIES.map(cat => (
          <CategoryButton key={cat} category={cat} />
        ))}
      </div>
    </main>
  );
};

export default Home;
