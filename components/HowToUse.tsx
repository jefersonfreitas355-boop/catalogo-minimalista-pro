import React, { useState } from 'react';

const HowToUse: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="mt-4 px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-full transition-all duration-300 flex items-center gap-2 text-sm"
            >
                <span className="material-symbols-outlined text-[18px]">help</span>
                Como usar o catálogo?
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-[#1c2433] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative animate-scale-up max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <h2 className="text-2xl font-black text-text-main dark:text-white mb-6 text-center">
                            Como funciona?
                        </h2>

                        <div className="space-y-8">
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-1">
                                    <span className="material-symbols-outlined text-primary text-3xl">search</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-xl text-text-main dark:text-white mb-2">1. Pesquise Rápido</h3>
                                    <p className="text-base text-text-secondary dark:text-gray-400 max-w-[280px] mx-auto leading-relaxed font-medium">
                                        Use a barra de busca para encontrar o produto que você precisa em segundos.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-1">
                                    <span className="material-symbols-outlined text-primary text-3xl">category</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-xl text-text-main dark:text-white mb-2">2. Navegue</h3>
                                    <p className="text-base text-text-secondary dark:text-gray-400 max-w-[280px] mx-auto leading-relaxed font-medium">
                                        Ou explore as categorias abaixo para ver todos os itens disponíveis.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-1">
                                    <span className="material-symbols-outlined text-primary text-3xl">add_shopping_cart</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-xl text-text-main dark:text-white mb-2">3. Adicione ao Carrinho</h3>
                                    <p className="text-base text-text-secondary dark:text-gray-400 max-w-[280px] mx-auto leading-relaxed font-medium">
                                        Clique no ícone de "Adicionar" no cartão do produto para colocá-lo no seu carrinho.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-1">
                                    <span className="material-symbols-outlined text-primary text-3xl">shopping_cart</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-xl text-text-main dark:text-white mb-2">4. Finalize no WhatsApp</h3>
                                    <p className="text-base text-text-secondary dark:text-gray-400 max-w-[280px] mx-auto leading-relaxed font-medium">
                                        Clique no carrinho, revise seu pedido e envie direto para nosso atendente.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-8">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    document.getElementById('cart-toggle-btn')?.click();
                                }}
                                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">shopping_cart</span>
                                Ver Meu Carrinho
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main dark:text-white font-bold rounded-xl transition-colors"
                            >
                                Entendi!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HowToUse;
