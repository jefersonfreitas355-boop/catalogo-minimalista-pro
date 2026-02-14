import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="mb-8 flex items-center gap-2 text-text-secondary dark:text-gray-400 hover:text-primary transition-colors font-bold"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Voltar ao Início
                </button>

                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl p-8 md:p-12 space-y-8 animate-fade-in">
                    <div className="border-b border-gray-100 dark:border-gray-700 pb-8">
                        <h1 className="text-3xl md:text-4xl font-black text-text-main dark:text-white mb-4">
                            Política de Privacidade e Proteção de Dados
                        </h1>
                        <p className="text-text-secondary dark:text-gray-400 font-medium">
                            Conformidade com a LGPD (Lei nº 13.709/2018)
                        </p>
                    </div>

                    <div className="space-y-8 text-text-main dark:text-gray-300 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined">verified_user</span>
                                1. Coleta de Dados
                            </h2>
                            <p className="mb-4">
                                Nossa aplicação funciona como um catálogo digital simplificado. Coletamos o mínimo de dados necessários apenas no momento do checkout para viabilizar seu pedido.
                            </p>
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                <p className="font-bold mb-2 text-sm uppercase tracking-wide text-text-secondary">Dados solicitados:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Nome Completo</li>
                                    <li>Endereço de Entrega (Rua, Número, Bairro, Cidade)</li>
                                    <li>Número de WhatsApp</li>
                                    <li>Observações do Pedido (opcional)</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined">target</span>
                                2. Finalidade dos Dados
                            </h2>
                            <p className="mb-4">
                                Os dados coletados têm uma única e exclusiva finalidade: <strong>processar e entregar seu pedido</strong>.
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong>Execução de Contrato:</strong> Seus dados são usados para identificar quem pediu e onde entregar.</li>
                                <li><strong>Comunicação:</strong> Seu número de WhatsApp é usado para enviar o resumo do pedido e facilitar a comunicação direta com o atendente.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined">security</span>
                                3. Armazenamento e Segurança
                            </h2>
                            <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
                                <p className="font-bold text-blue-800 dark:text-blue-300">
                                    Nós NÃO mantemos um banco de dados permanente com seus dados pessoais.
                                </p>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                                    <span><strong>Volatilidade:</strong> Seus dados são processados apenas no seu dispositivo (navegador) enquanto você usa o catálogo.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                                    <span><strong>Transmissão:</strong> Ao finalizar o pedido, os dados são formatados em uma mensagem e enviados diretamente para o WhatsApp do lojista. A partir desse momento, a segurança e armazenamento passam a ser regidos pelos termos de uso e privacidade do WhatsApp e do próprio lojista.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                                    <span><strong>Sem Rastreamento:</strong> Não utilizamos cookies invasivos de rastreamento ou venda de dados para terceiros.</span>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined">share</span>
                                4. Compartilhamento de Dados
                            </h2>
                            <p>
                                Seus dados não são compartilhados com agências de publicidade ou terceiros desconhecidos. O único compartilhamento ocorre <strong>ativamente por você</strong> ao enviar a mensagem do pedido para o nosso número comercial no WhatsApp.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined">gavel</span>
                                5. Seus Direitos (LGPD)
                            </h2>
                            <p className="mb-4">Como titular dos dados, você tem direito a:</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors">
                                    <h3 className="font-bold text-lg mb-2">Transparência</h3>
                                    <p className="text-sm text-text-secondary">Saber como seus dados são usados (esta política).</p>
                                </div>
                                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors">
                                    <h3 className="font-bold text-lg mb-2">Acesso e Correção</h3>
                                    <p className="text-sm text-text-secondary">Controle total sobre o que digita a cada novo pedido.</p>
                                </div>
                                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors">
                                    <h3 className="font-bold text-lg mb-2">Revogação</h3>
                                    <p className="text-sm text-text-secondary">Pode parar de usar o catálogo a qualquer momento sem burocracia.</p>
                                </div>
                            </div>
                        </section>

                        <section className="pt-8 border-t border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-text-main dark:text-white mb-2">
                                Contato
                            </h2>
                            <p className="text-sm text-text-secondary">
                                Para questões sobre esta política ou sobre seus dados no contexto de um pedido realizado, entre em contato diretamente pelo nosso WhatsApp de atendimento.
                            </p>
                        </section>
                    </div>
                </div>

                <p className="text-center text-xs text-text-secondary mt-8 opacity-60">
                    Última atualização: 14 de Fevereiro de 2026
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
