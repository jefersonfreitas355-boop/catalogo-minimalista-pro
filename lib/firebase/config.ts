// Configuração inicial do Firebase
// NÃO IMPLEMENTADO - Apenas preparação

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Estas configurações devem ser obtidas no Console do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDMDDat8U1Es_CqeD_b-_jCtVYLiMU4WT4",
    authDomain: "catalogo-minimalista.firebaseapp.com",
    projectId: "catalogo-minimalista",
    storageBucket: "catalogo-minimalista.firebasestorage.app",
    messagingSenderId: "1060302445202",
    appId: "1:1060302445202:web:0570293cc5344db45b244b"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços
export const db = getFirestore(app);
export const auth = getAuth(app);
