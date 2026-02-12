
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
        id: 'chocolate-1',
        name: 'Barra Garoto',
        category: 'Chocolates e Bombons',
        description: 'Delicioso chocolate Garoto em barra. Escolha seu sabor favorito!',
        price: 8.99,
        stock: 100,
        image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1000&auto=format&fit=crop',
        unit: '80g',
        flavors: ['Crocante', 'Ao Leite', 'Branco']
    },
    {
        id: 'chocolate-2',
        name: 'Chocolate Lacta',
        category: 'Chocolates e Bombons',
        description: 'Chocolate Lacta cremoso e saboroso. Vários sabores disponíveis!',
        price: 12.50,
        stock: 80,
        image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000&auto=format&fit=crop',
        unit: '100g',
        flavors: ['Ao Leite', 'Branco', 'Meio Amargo', 'Oreo']
    },
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

