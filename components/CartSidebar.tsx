import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';
import { formatCurrency } from '../utils/formatters';

const CartSidebar: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, closeCart } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    if (!isCartOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
                onClick={closeCart}
            />

            {/* Sidebar */}
            <div className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-surface-light dark:bg-surface-dark shadow-2xl transform transition-transform duration-300 flex flex-col h-full">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">shopping_cart</span>
                        <h2 className="text-xl font-bold text-text-main dark:text-white">Seu Carrinho</h2>
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-text-secondary"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60">
                            <span className="material-symbols-outlined text-6xl mb-4">remove_shopping_cart</span>
                            <p className="text-lg font-medium">Seu carrinho está vazio</p>
                            <button
                                onClick={closeCart}
                                className="mt-4 text-primary font-bold hover:underline"
                            >
                                Continuar comprando
                            </button>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <div key={`${item.id}-${item.flavor || 'default'}-${index}`} className="flex gap-4 p-3 bg-white dark:bg-[#1c2433] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm relative group">

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-text-main dark:text-white line-clamp-1">{item.name}</h3>
                                        {item.flavor && (
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                                Sabor: <span className="font-semibold text-primary">{item.flavor}</span>
                                            </p>
                                        )}
                                        <p className="text-primary font-bold text-sm mt-1">
                                            {formatCurrency(item.price)}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.flavor)}
                                                className="w-6 h-6 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors text-text-secondary"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">remove</span>
                                            </button>
                                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.flavor)}
                                                className="w-6 h-6 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors text-primary"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">add</span>
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.flavor)}
                                            className="text-gray-400 hover:text-red-500 transition-colors ml-auto p-1"
                                            title="Remover item"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-surface-light dark:bg-surface-dark">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-text-secondary font-medium">Subtotal</span>
                            <span className="text-xl font-black text-text-main dark:text-white">
                                {formatCurrency(totalPrice)}
                            </span>
                        </div>

                        {/* Aviso de Frete - Preview */}
                        <div className="mb-6 relative overflow-hidden rounded-xl p-[2px] shadow-lg shadow-red-500/20 group">
                            {/* Animated Border Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-spin-slow opacity-70 blur-sm" />

                            {/* Glass Content */}
                            <div className="relative bg-gradient-to-br from-red-600 to-red-700 rounded-[10px] p-4 flex items-start gap-4 border border-white/10 backdrop-blur-md">
                                <div className="p-2 bg-white/20 rounded-full shrink-0 flex items-center justify-center shadow-inner">
                                    <span className="material-symbols-outlined text-white text-[20px] animate-pulse">local_shipping</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-black text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
                                        Politica de Entrega
                                        <span className="flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                        </span>
                                    </h4>
                                    <p className="text-white/90 text-xs font-medium leading-relaxed">
                                        O valor do frete não está incluso e será calculado <strong className="text-white border-b border-white/40">após o envio do pedido</strong> no WhatsApp.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsCheckoutOpen(true)}
                            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[24px]">send</span>
                            <span>Finalizar Pedido</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Checkout Modal */}
            {isCheckoutOpen && (
                <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
            )}
        </>
    );
};

export default CartSidebar;
