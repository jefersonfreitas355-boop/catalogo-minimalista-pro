import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    limit,
    startAt,
    endAt
} from "firebase/firestore";
import { db } from "../config";
import { Product } from "../../../types";

const COLLECTION_NAME = "products";

// Função para buscar todos os produtos
export async function getAllProductsFirestore() {
    console.log('🔍 Buscando todos os produtos do Firestore...');
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        console.log(`✅ ${products.length} produtos encontrados:`, products);
        return products;
    } catch (error) {
        console.error('❌ Erro ao buscar produtos:', error);
        throw error;
    }
}

// Função para buscar produtos por categoria
export async function getProductsByCategoryFirestore(category: string) {
    console.log(`🔍 Buscando produtos da categoria: "${category}"`);
    try {
        // Busca todos os produtos e filtra no cliente para evitar necessidade de índice
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const allProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        const products = allProducts
            .filter(p => p.category === category)
            .sort((a, b) => a.name.localeCompare(b.name));
        console.log(`✅ ${products.length} produtos encontrados na categoria "${category}":`, products);
        return products;
    } catch (error) {
        console.error(`❌ Erro ao buscar produtos da categoria "${category}":`, error);
        throw error;
    }
}

// Função para busca inteligente (autocomplete)
export async function searchProductsFirestore(searchTerm: string) {
    console.log(`🔍 Buscando produtos com termo: "${searchTerm}"`);
    try {
        // Busca todos os produtos e filtra no cliente para evitar necessidade de índice
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const allProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        const searchLower = searchTerm.toLowerCase();
        const products = allProducts
            .filter(p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.description?.toLowerCase().includes(searchLower) ||
                p.category.toLowerCase().includes(searchLower)
            )
            .slice(0, 20); // Limita a 20 resultados
        console.log(`✅ ${products.length} produtos encontrados para "${searchTerm}":`, products);
        return products;
    } catch (error) {
        console.error(`❌ Erro ao buscar produtos:`, error);
        throw error;
    }
}

// Função para buscar produto por ID
export async function getProductByIdFirestore(productId: string) {
    const docRef = doc(db, COLLECTION_NAME, productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Product;
    } else {
        return null;
    }
}

// Helper para limpar dados (remover undefined)
const cleanData = (data: any) => {
    const clean: any = {};
    Object.keys(data).forEach(key => {
        if (data[key] !== undefined) {
            clean[key] = data[key];
        }
    });
    return clean;
};

// Função para adicionar novo produto
export async function addProductFirestore(product: Omit<Product, 'id'>) {
    const cleanedProduct = cleanData(product);
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...cleanedProduct,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    return docRef.id;
}

// Função para atualizar produto existente
export async function updateProductFirestore(productId: string, updates: Partial<Product>) {
    const cleanedUpdates = cleanData(updates);
    const docRef = doc(db, COLLECTION_NAME, productId);
    await updateDoc(docRef, {
        ...cleanedUpdates,
        updatedAt: new Date()
    });
}

// Função para deletar produto
export async function deleteProductFirestore(productId: string) {
    const docRef = doc(db, COLLECTION_NAME, productId);
    await deleteDoc(docRef);
}
