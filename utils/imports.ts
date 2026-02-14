/**
 * Lazy-loaded imports for services
 * Import these once and reuse to avoid dynamic imports in render cycles
 */

let searchProductsFirestore: ((query: string) => Promise<any[]>) | null = null;
let productsData: any[] | null = null;

/**
 * Get the Firebase search function (lazy-loaded)
 */
export const getFirebaseSearch = async () => {
    if (!searchProductsFirestore) {
        try {
            const module = await import('../lib/firebase/services/products');
            searchProductsFirestore = module.searchProductsFirestore;
        } catch (error) {
            console.warn('Firebase search not available:', error);
        }
    }
    return searchProductsFirestore;
};

/**
 * Get local products data (lazy-loaded)
 */
export const getLocalProducts = async () => {
    if (!productsData) {
        const module = await import('../data');
        productsData = module.PRODUCTS;
    }
    return productsData;
};
