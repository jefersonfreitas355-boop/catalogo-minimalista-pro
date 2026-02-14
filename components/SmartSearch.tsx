// Componente de busca inteligente com autocomplete
// Preparado para integração futura com Supabase

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirebaseSearch, getLocalProducts } from '../utils/imports';

interface SearchSuggestion {
    id: string;
    name: string;
    category: string;
    unit?: string;
    price: number;
}

interface SmartSearchProps {
    placeholder?: string;
    className?: string;
}

const SmartSearch: React.FC<SmartSearchProps> = ({
    placeholder = "O que você está procurando hoje?",
    className = ""
}) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const navigate = useNavigate();
    const searchRef = useRef<HTMLDivElement>(null);

    // Memoized search function to avoid recreation on every render
    const fetchSuggestions = useCallback(async (searchQuery: string) => {
        if (!searchQuery || searchQuery.trim() === '') {
            setSuggestions([]);
            return;
        }

        try {
            // Try Firebase search first
            const firebaseSearch = await getFirebaseSearch();
            if (firebaseSearch) {
                const data = await firebaseSearch(searchQuery);

                if (data && data.length > 0) {
                    setSuggestions(data.map(p => ({
                        id: p.id,
                        name: p.name,
                        category: p.category,
                        unit: p.unit,
                        price: p.price
                    })));
                    return;
                }
            }
        } catch (firebaseError) {
            console.warn("Falha ao buscar sugestões do Firebase, usando dados locais:", firebaseError);
        }

        // Fallback: Local data
        const products = await getLocalProducts();
        if (products) {
            const filtered = products
                .filter(p =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(0, 5)
                .map(p => ({
                    id: p.id,
                    name: p.name,
                    category: p.category,
                    unit: p.unit,
                    price: p.price
                }));

            setSuggestions(filtered);
        }
    }, []);

    // Debounce para evitar muitas requisições
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSuggestions(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, fetchSuggestions]);

    // Fechar sugestões ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = useCallback(() => {
        if (query.trim()) {
            navigate(`/catalog?q=${encodeURIComponent(query)}`);
            setShowSuggestions(false);
            setQuery('');
        }
    }, [query, navigate]);

    const handleSelectSuggestion = useCallback((suggestion: SearchSuggestion) => {
        setQuery(suggestion.name);
        setShowSuggestions(false);
        navigate(`/catalog?q=${encodeURIComponent(suggestion.name)}`);
        setQuery('');
    }, [navigate]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                handleSelectSuggestion(suggestions[selectedIndex]);
            } else {
                handleSearch();
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setSelectedIndex(-1);
        }
    }, [selectedIndex, suggestions, handleSelectSuggestion, handleSearch]);

    return (
        <div ref={searchRef} className={`relative ${className}`}>
            <div className="flex items-center w-full h-16 md:h-20 rounded-full bg-white dark:bg-[#1c2433] shadow-2xl shadow-primary/5 border border-transparent focus-within:border-primary/50 focus-within:ring-8 focus-within:ring-primary/5 transition-all duration-300 overflow-hidden">
                <div className="pl-6 pr-3 text-text-secondary dark:text-gray-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl group-focus-within:text-primary transition-colors">search</span>
                </div>
                <input
                    className="w-full h-full bg-transparent border-none focus:ring-0 text-lg text-text-main dark:text-white placeholder:text-[#9aa2b1] dark:placeholder:text-gray-500 font-medium px-2"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowSuggestions(true);
                        setSelectedIndex(-1);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(true)}
                />
                <button
                    onClick={handleSearch}
                    className="mr-3 p-3 bg-primary hover:bg-primary-hover rounded-full text-white transition-all transform active:scale-90 flex items-center justify-center shadow-lg shadow-primary/20"
                >
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>

            {/* Sugestões de autocomplete */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1c2433] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 animate-fade-in">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={suggestion.id}
                            onClick={() => handleSelectSuggestion(suggestion)}
                            className={`w-full px-6 py-3 flex items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0 ${index === selectedIndex ? 'bg-primary/5' : ''
                                }`}
                        >
                            <span className="text-sm font-medium text-text-main dark:text-white">
                                {suggestion.name}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SmartSearch;
