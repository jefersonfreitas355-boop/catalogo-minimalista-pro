
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import { Product } from '../types';
import { getAllProductsFirestore, getProductsByCategoryFirestore, searchProductsFirestore } from '../lib/firebase/services/products';

const Catalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');

  const query = searchParams.get('q') || '';
  const initialCat = searchParams.get('cat');

  useEffect(() => {
    if (initialCat) setSelectedCategories([initialCat]);
    else setSelectedCategories([]);
  }, [initialCat]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        let data: Product[] = [];

        if (query) {
          data = await searchProductsFirestore(query);
        } else if (initialCat) {
          data = await getProductsByCategoryFirestore(initialCat);
        } else {
          data = await getAllProductsFirestore();
        }

        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos do Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [query, initialCat]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Aplicar ordenação local nos resultados filtrados
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'relevance':
      default:
        return 0;
    }
  });

  const isFilteringByCategory = initialCat !== null;
  const isSearching = query !== '';
  const shouldHideSidebar = isFilteringByCategory || isSearching;

  return (
    <>
      <Navbar />
      <div className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8">
        {!shouldHideSidebar && (
          <Sidebar
            onCategoryChange={toggleCategory}
            selectedCategories={selectedCategories}
          />
        )}

        <main className="flex-1 flex flex-col">
          {shouldHideSidebar && (
            <div className="mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-text-main dark:text-white font-medium"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                Voltar ao Início
              </Link>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-text-main dark:text-white tracking-tight mb-2">
                {query ? `Busca: "${query}"` : initialCat ? initialCat : 'Catálogo Completo'}
              </h1>
              <p className="text-text-secondary font-medium">
                {loading ? 'Carregando produtos...' : (
                  <>Exibindo <span className="font-bold text-text-main dark:text-white">{sortedProducts.length}</span> produtos encontrados.</>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3 self-start md:self-auto bg-surface-light dark:bg-surface-dark p-2 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
              <span className="text-sm text-text-secondary pl-2">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select border-none bg-transparent py-1 pl-2 pr-8 text-sm font-bold text-text-main dark:text-white focus:ring-0 cursor-pointer"
              >
                <option value="name">Nome (A-Z)</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-text-secondary">Buscando itens de mercado...</p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
              <h2 className="text-xl font-bold text-text-main dark:text-white mb-2">Nenhum produto encontrado</h2>
              <p className="text-text-secondary">Tente ajustar seus filtros ou buscar por outro termo.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Catalog;
