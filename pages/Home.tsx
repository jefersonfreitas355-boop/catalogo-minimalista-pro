import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data';
import SmartSearch from '../components/SmartSearch';
import HowToUse from '../components/HowToUse';
import Navbar from '../components/Navbar';

// Memoized category button to prevent unnecessary re-renders
const CategoryButton = React.memo<{ category: string }>(({ category }) => {
  const isPromotion = category === 'Promoções';

  return (
    <Link
      to={`/catalog?cat=${category}`}
      className={`group relative flex h-12 md:h-11 items-center justify-center rounded-full px-5 md:px-6 transition-all duration-300 shadow-sm md:shadow-none overflow-hidden ${isPromotion
        ? 'bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-[length:200%_100%] animate-gradient border border-white/30 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.8)]'
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
    <>
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 w-full max-w-[960px] mx-auto py-16 md:py-28">
        <div className="w-full text-center mb-10 space-y-3 flex flex-col items-center">
          <p className="text-text-secondary dark:text-gray-400 text-lg md:text-xl font-semibold max-w-2xl mx-auto leading-loose">
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
    </>
  );
};

export default Home;
