// Cliente Supabase configurado
// NÃO CONECTADO - Apenas preparação para futura integração

import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// IMPORTANTE: Estas variáveis devem ser configuradas no arquivo .env.local
// SUPABASE_URL=sua_url_do_supabase
// SUPABASE_ANON_KEY=sua_chave_anonima

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Cliente Supabase tipado
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Função para buscar todos os produtos
export async function getAllProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }

    return data;
}

// Função para buscar produtos por categoria
export async function getProductsByCategory(category: string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('name', { ascending: true });

    if (error) {
        console.error('Erro ao buscar produtos por categoria:', error);
        return [];
    }

    return data;
}

// Função para buscar produtos com filtro de texto (busca inteligente)
export async function searchProducts(query: string) {
    if (!query || query.trim() === '') {
        return getAllProducts();
    }

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
        .order('name', { ascending: true });

    if (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }

    return data;
}

// Função para buscar um produto por ID
export async function getProductById(id: string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Erro ao buscar produto:', error);
        return null;
    }

    return data;
}

// Função para obter sugestões de autocomplete
export async function getProductSuggestions(query: string, limit: number = 5) {
    if (!query || query.trim() === '') {
        return [];
    }

    const { data, error } = await supabase
        .from('products')
        .select('id, name, category, unit, price')
        .or(`name.ilike.%${query}%,category.ilike.%${query}%`)
        .order('name', { ascending: true })
        .limit(limit);

    if (error) {
        console.error('Erro ao buscar sugestões:', error);
        return [];
    }

    return data;
}
