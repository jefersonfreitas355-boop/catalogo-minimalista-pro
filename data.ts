
import { Product } from './types';


export const CATEGORIES = [
    'Promoções',
    'Chocolates e Bombons',
    'Confeitaria e Ingredientes',
    'Balas e Guloseimas',
    'Pirulitos',
    'Chicletes e Pastilhas',
    'Doces e Amendoins',
    'Bebidas',
    'Salgadinhos e Biscoitos',
    'Produtos Diets'
];



export const PRODUCTS: Product[] = [
    {
        id: 'diet-1',
        name: 'Chocolate Diet 70% Cacau',
        category: 'Produtos Diets',
        description: 'Chocolate amargo 70% cacau sem adição de açúcares. Ideal para diabéticos.',
        price: 12.90,
        stock: 50,
        image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1000&auto=format&fit=crop',
        unit: '80g'
    },
    {
        id: 'diet-2',
        name: 'Biscoito Integral Diet',
        category: 'Produtos Diets',
        description: 'Biscoito integral crocante e nutritivo, zero açúcar.',
        price: 8.50,
        stock: 100,
        image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1000&auto=format&fit=crop',
        unit: '150g'
    },
    {
        id: 'diet-3',
        name: 'Geleia de Morango Diet',
        category: 'Produtos Diets',
        description: 'Geleia de morango feita com frutas selecionadas e zero açúcar.',
        price: 15.90,
        stock: 30,
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=1000&auto=format&fit=crop',
        unit: '250g'
    }
];

