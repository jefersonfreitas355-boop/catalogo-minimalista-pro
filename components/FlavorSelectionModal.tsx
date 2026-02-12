
import React, { useState, useEffect } from 'react';
import { Product, FlavorQuantity } from '../types';
import { useCart } from '../context/CartContext';

interface FlavorSelectionModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

const FlavorSelectionModal: React.FC<FlavorSelectionModalProps> = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();
    const [flavorQuantities, setFlavorQuantities] = useState<FlavorQuantity[]>([]);

    // Inicializar quantidades quando o modal abrir
    useEffect(() => {
        if (isOpen && product.flavors) {
            setFlavorQuantities(
                product.flavors.map(flavor => ({ flavor, quantity: 0 }))
            );
        }
    }, [isOpen, product.flavors]);

    const updateQuantity = (flavor: string, delta: number) => {
        setFlavorQuantities(prev =>
            prev.map(fq =>
                fq.flavor === flavor
                    ? { ...fq, quantity: Math.max(0, fq.quantity + delta) }
                    : fq
            )
        );
    };

    const handleConfirm = () => {
        // Adicionar ao carrinho apenas sabores com quantidade > 0
        flavorQuantities.forEach(({ flavor, quantity }) => {
            if (quantity > 0) {
                addToCart(product, quantity, flavor);
            }
        });
        onClose();
    };

    const totalItems = flavorQuantities.reduce((sum, fq) => sum + fq.quantity, 0);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-sm w-full max-h-[85vh] overflow-hidden animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-red-600 text-white p-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-bold mb-0.5">{product.name}</h2>
                            {product.unit && (
                                <p className="text-red-100 text-xs">{product.unit}</p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white/20 rounded-full p-1.5 transition-colors"
                            aria-label="Fechar"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 overflow-y-auto max-h-[50vh]">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-3">
                        Selecione os sabores:
                    </h3>
                    <div className="space-y-2">
                        {flavorQuantities.map(({ flavor, quantity }) => (
                            <div
                                key={flavor}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors"
                            >
                                <span className="font-semibold text-sm text-gray-800 dark:text-white">
                                    {flavor}
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(flavor, -1)}
                                        disabled={quantity === 0}
                                        className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        aria-label="Diminuir quantidade"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">remove</span>
                                    </button>
                                    <span className="w-7 text-center font-bold text-base text-gray-800 dark:text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(flavor, 1)}
                                        className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-white hover:bg-red-700 transition-all hover:scale-110"
                                        aria-label="Aumentar quantidade"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">add</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total de itens:</span>
                        <span className="text-xl font-bold text-primary">{totalItems}</span>
                    </div>
                    <button
                        onClick={handleConfirm}
                        disabled={totalItems === 0}
                        className="w-full py-2.5 bg-gradient-to-r from-primary to-red-600 text-white text-sm font-bold rounded-lg hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
                    >
                        {totalItems === 0 ? 'Selecione pelo menos um sabor' : `Adicionar ${totalItems} ${totalItems === 1 ? 'item' : 'itens'} ao carrinho`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlavorSelectionModal;
