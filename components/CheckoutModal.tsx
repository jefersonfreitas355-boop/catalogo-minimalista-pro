import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';

interface CheckoutModalProps {
    onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
    const { cart, totalPrice, clearCart, closeCart } = useCart();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        reference: '',
        shippingAcknowledged: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, shippingAcknowledged: e.target.checked }));
    };

    const isValid =
        formData.name.trim() !== '' &&
        formData.address.trim() !== '' &&
        formData.shippingAcknowledged;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;

        // Gerar mensagem do WhatsApp
        const itemsList = cart.map(item =>
            `${item.quantity}x ${item.name} ... ${formatCurrency(item.price * item.quantity)}`
        ).join('\n');

        const total = formatCurrency(totalPrice);

        const message = `*NOVO PEDIDO - Catálogo Minimalista*

*Cliente:* ${formData.name}
*Endereço:* ${formData.address}
*Ponto de Ref.:* ${formData.reference || 'N/A'}

*Resumo do Pedido:*
${itemsList}

*SUBTOTAL:* ${total}
*FRETE:* A definir (por conta do cliente)

_Aguardo a confirmação e o valor do frete para prosseguir._`;

        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = '5521984122795'; // Substitua pelo número real se tiver, ou deixe genérico
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        // Opcional: Limpar carrinho após envio (ou perguntar ao usuário)
        // clearCart(); 
        // closeCart();
        // onClose();
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-[#1c2433] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-surface-light dark:bg-surface-dark">
                    <h2 className="text-lg font-bold text-text-main dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-600">send</span>
                        Finalizar Pedido
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-text-secondary"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">

                    {/* Shipping Warning Banner */}
                    <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded-r-lg shadow-sm">
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-orange-600 dark:text-orange-500 text-3xl">local_shipping</span>
                            <div>
                                <h3 className="font-bold text-orange-800 dark:text-orange-200 text-sm uppercase tracking-wide mb-1">
                                    Atenção ao Frete
                                </h3>
                                <p className="text-sm text-orange-900/80 dark:text-orange-200/80 leading-relaxed">
                                    O valor do frete <span className="font-black underline">NÃO</span> está incluso no total. Ele será calculado e informado pelo atendente após o recebimento do pedido.
                                </p>
                            </div>
                        </div>
                    </div>

                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-text-main dark:text-white mb-1.5">
                                Nome Completo <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ex: João da Silva"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text-main dark:text-white mb-1.5">
                                Endereço de Entrega <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Rua, Número, Bairro, Cidade..."
                                rows={3}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text-main dark:text-white mb-1.5">
                                Ponto de Referência
                            </label>
                            <input
                                type="text"
                                name="reference"
                                value={formData.reference}
                                onChange={handleChange}
                                placeholder="Ex: Ao lado da padaria..."
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            />
                        </div>

                        {/* Mandatory Checkbox */}
                        <div className="pt-2">
                            <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.shippingAcknowledged
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                }`}>
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.shippingAcknowledged}
                                        onChange={handleCheckboxChange}
                                        className="peer sr-only"
                                    />
                                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${formData.shippingAcknowledged
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'border-gray-400 bg-white dark:bg-gray-800'
                                        }`}>
                                        {formData.shippingAcknowledged && <span className="material-symbols-outlined text-[18px]">check</span>}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className={`text-sm font-bold leading-tight ${formData.shippingAcknowledged ? 'text-green-800 dark:text-green-400' : 'text-text-main dark:text-white'}`}>
                                        Estou ciente de que o frete será cobrado à parte.
                                    </p>
                                    <p className="text-xs text-text-secondary mt-1">
                                        Concordo em aguardar o cálculo do valor final.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-surface-light dark:bg-surface-dark">
                    <button
                        type="submit"
                        form="checkout-form"
                        disabled={!isValid}
                        className={`w-full py-3.5 rounded-xl font-black text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${isValid
                            ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-600/20 hover:scale-[1.02] active:scale-[0.98]'
                            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <span>Enviar Pedido</span>
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
