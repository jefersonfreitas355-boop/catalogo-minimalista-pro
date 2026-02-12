import React, { useState } from 'react';

const HowToUse: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-primary p-4 rounded-r-lg shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-md group cursor-pointer"
            >
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform duration-300">help_outline</span>
                    <div className="text-left flex-1">
                        <h3 className="font-bold text-primary text-base uppercase tracking-wide leading-tight">
                            Como usar<br />o catálogo?
                        </h3>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                            Clique aqui para ver o passo a passo
                        </p>
                    </div>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
                </div>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-[#1c2433] rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative animate-scale-up max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <h2 className="text-2xl md:text-3xl font-black text-text-main dark:text-white mb-6 text-center">
                            Como funciona?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Passo 1 */}
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-1">
                                    <span className="material-symbols-outlined text-primary text-4xl">search</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-lg md:text-xl text-text-main dark:text-white mb-2">1. Pesquise Rápido</h3>
                                    <p className="text-sm md:text-base text-text-secondary dark:text-gray-400 leading-relaxed font-medium">
                                        Use a barra de busca para encontrar o produto que você precisa em segundos.
                                    </p>
                                </div>
                            </div>

                            {/* Passo 2 */}
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-1">
                                    <span className="material-symbols-outlined text-primary text-4xl">category</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-lg md:text-xl text-text-main dark:text-white mb-2">2. Navegue por Categorias</h3>
                                    <p className="text-sm md:text-base text-text-secondary dark:text-gray-400 leading-relaxed font-medium">
                                        Ou explore as categorias para ver todos os itens disponíveis organizados.
                                    </p>
                                </div>
                            </div>

                            {/* Passo 3 */}
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-1">
                                    <span className="material-symbols-outlined text-primary text-4xl">add_shopping_cart</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-lg md:text-xl text-text-main dark:text-white mb-2">3. Adicione ao Carrinho</h3>
                                    <p className="text-sm md:text-base text-text-secondary dark:text-gray-400 leading-relaxed font-medium">
                                        Clique no ícone <span className="text-primary font-bold">+</span> no cartão do produto para adicioná-lo ao carrinho.
                                    </p>
                                </div>
                            </div>

                            {/* Passo 4 */}
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-1">
                                    <span className="material-symbols-outlined text-primary text-4xl">shopping_cart</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-lg md:text-xl text-text-main dark:text-white mb-2">4. Acesse o Carrinho</h3>
                                    <p className="text-sm md:text-base text-text-secondary dark:text-gray-400 leading-relaxed font-medium">
                                        Clique no ícone do carrinho <span className="text-primary font-bold">🛒</span> no topo da página para revisar seus itens.
                                    </p>
                                </div>
                            </div>

                            {/* Passo 5 */}
                            <div className="flex flex-col items-center text-center gap-3 md:col-span-2">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mb-1">
                                    <span className="material-symbols-outlined text-green-600 text-4xl">send</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-lg md:text-xl text-text-main dark:text-white mb-2">5. Finalize no WhatsApp</h3>
                                    <p className="text-sm md:text-base text-text-secondary dark:text-gray-400 leading-relaxed font-medium max-w-md mx-auto">
                                        Preencha seus dados de entrega e envie o pedido direto para nosso atendente via WhatsApp. Simples e rápido!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Dica Extra */}
                        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl shrink-0">lightbulb</span>
                                <div>
                                    <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">💡 Dica</h4>
                                    <p className="text-sm text-blue-800 dark:text-blue-200">
                                        O carrinho fica sempre visível no topo da página. Você pode adicionar produtos de qualquer categoria e finalizar quando quiser!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Botão de Fechar */}
                        <div className="mt-6">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">check_circle</span>
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
