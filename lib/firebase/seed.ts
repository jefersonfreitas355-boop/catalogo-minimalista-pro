import { db } from "./config";
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { PRODUCTS } from "../../data";

const COLLECTION_NAME = "products";

/**
 * Script para popular o Firestore com os produtos atuais do data.ts
 * ATENÇÃO: Use com cuidado para não duplicar dados.
 */
export async function seedProductsToFirestore() {
    try {
        const productsCollection = collection(db, COLLECTION_NAME);

        console.log("Iniciando seed de produtos...");

        // Opcional: Limpar coleção antes (Cuidado!)
        // const snapshot = await getDocs(productsCollection);
        // snapshot.docs.forEach(async (document) => {
        //   await deleteDoc(doc(db, COLLECTION_NAME, document.id));
        // });

        for (const product of PRODUCTS) {
            // Removemos o ID manual para deixar o Firestore gerar um UUID/ID automático
            const { id, ...productData } = product;

            const docRef = await addDoc(productsCollection, {
                ...productData,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            console.log(`Documento inserido com ID: ${docRef.id} - ${productData.name}`);
        }

        console.log("Seed concluído com sucesso!");
    } catch (e) {
        console.error("Erro ao realizar seed:", e);
    }
}
