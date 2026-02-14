import React, { useState, useEffect, useMemo } from 'react';
import { PaymentMethod, PaymentMode, CheckoutPayment, PaymentData } from '../types';
import { formatCurrency } from '../utils/formatters';

interface PaymentSelectorProps {
    totalAmount: number;
    onPaymentChange: (payment: CheckoutPayment | null) => void;
}

const PaymentSelector: React.FC<PaymentSelectorProps> = ({ totalAmount, onPaymentChange }) => {
    const [mode, setMode] = useState<PaymentMode>('total');
    const [method1, setMethod1] = useState<PaymentMethod>('pix');
    const [amount1, setAmount1] = useState<string>('');
    const [changeFor1, setChangeFor1] = useState<string>('');
    const [method2, setMethod2] = useState<PaymentMethod>('pix');
    const [changeFor2, setChangeFor2] = useState<string>('');

    // Calcular saldo restante para pagamento misto
    const remainingAmount = useMemo(() => {
        if (mode === 'split' && amount1) {
            const value = parseFloat(amount1.replace(',', '.'));
            if (!isNaN(value) && value > 0 && value <= totalAmount) {
                return totalAmount - value;
            }
        }
        return 0;
    }, [mode, amount1, totalAmount]);

    // Validar se o pagamento está completo e correto
    const isValid = useMemo(() => {
        if (mode === 'total') {
            // Para pagamento total com dinheiro, precisa informar o troco
            if (method1 === 'dinheiro') {
                const changeValue = parseFloat(changeFor1.replace(',', '.'));
                return !isNaN(changeValue) && changeValue > totalAmount;
            }
            return true;
        } else {
            // Para pagamento misto
            const value1 = parseFloat(amount1.replace(',', '.'));

            // Validar valor 1
            if (isNaN(value1) || value1 <= 0 || value1 >= totalAmount) {
                return false;
            }

            // Se método 1 for dinheiro, validar troco
            if (method1 === 'dinheiro') {
                const changeValue1 = parseFloat(changeFor1.replace(',', '.'));
                if (isNaN(changeValue1) || changeValue1 <= value1) {
                    return false;
                }
            }

            // Se método 2 for dinheiro, validar troco
            if (method2 === 'dinheiro') {
                const changeValue2 = parseFloat(changeFor2.replace(',', '.'));
                if (isNaN(changeValue2) || changeValue2 <= remainingAmount) {
                    return false;
                }
            }

            return true;
        }
    }, [mode, method1, method2, amount1, changeFor1, changeFor2, totalAmount, remainingAmount]);

    // Atualizar dados de pagamento quando houver mudanças
    useEffect(() => {
        if (!isValid) {
            onPaymentChange(null);
            return;
        }

        const payment: CheckoutPayment = {
            mode,
            total: totalAmount,
        };

        if (mode === 'total') {
            payment.payment1 = {
                method: method1,
                amount: totalAmount,
                changeFor: method1 === 'dinheiro' ? parseFloat(changeFor1.replace(',', '.')) : undefined,
            };
        } else {
            const value1 = parseFloat(amount1.replace(',', '.'));
            payment.payment1 = {
                method: method1,
                amount: value1,
                changeFor: method1 === 'dinheiro' ? parseFloat(changeFor1.replace(',', '.')) : undefined,
            };
            payment.payment2 = {
                method: method2,
                amount: remainingAmount,
                changeFor: method2 === 'dinheiro' ? parseFloat(changeFor2.replace(',', '.')) : undefined,
            };
        }

        onPaymentChange(payment);
    }, [mode, method1, method2, amount1, changeFor1, changeFor2, remainingAmount, totalAmount, isValid, onPaymentChange]);

    const paymentMethods: { value: PaymentMethod; label: string; icon: string }[] = [
        { value: 'pix', label: 'Pix', icon: 'qr_code_2' },
        { value: 'dinheiro', label: 'Dinheiro', icon: 'payments' },
        { value: 'credito', label: 'Crédito', icon: 'credit_card' },
        { value: 'debito', label: 'Débito', icon: 'credit_card' },
    ];

    const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        // Permitir apenas números, vírgula e ponto
        value = value.replace(/[^\d,\.]/g, '');
        // Substituir ponto por vírgula
        value = value.replace('.', ',');
        // Permitir apenas uma vírgula
        const parts = value.split(',');
        if (parts.length > 2) {
            value = parts[0] + ',' + parts.slice(1).join('');
        }
        setAmount1(value);
    };

    const handleChangeForChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/[^\d,\.]/g, '');
        value = value.replace('.', ',');
        const parts = value.split(',');
        if (parts.length > 2) {
            value = parts[0] + ',' + parts.slice(1).join('');
        }
        setter(value);
    };

    return (
        <div className="space-y-6">
            {/* Título da Seção */}
            <div className="flex items-center gap-2 pb-2 border-b-2 border-primary/20">
                <span className="material-symbols-outlined text-primary text-2xl">payments</span>
                <h3 className="text-lg font-black text-text-main dark:text-white">Forma de Pagamento</h3>
            </div>

            {/* Seleção de Modo */}
            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => setMode('total')}
                    className={`p-4 rounded-xl border-2 transition-all font-bold text-sm ${mode === 'total'
                            ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/20'
                            : 'border-gray-200 dark:border-gray-700 text-text-secondary hover:border-primary/50'
                        }`}
                >
                    <span className="material-symbols-outlined text-2xl mb-1">check_circle</span>
                    <div>Pagamento Total</div>
                </button>
                <button
                    type="button"
                    onClick={() => setMode('split')}
                    className={`p-4 rounded-xl border-2 transition-all font-bold text-sm ${mode === 'split'
                            ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/20'
                            : 'border-gray-200 dark:border-gray-700 text-text-secondary hover:border-primary/50'
                        }`}
                >
                    <span className="material-symbols-outlined text-2xl mb-1">call_split</span>
                    <div>Dividir Pagamento</div>
                </button>
            </div>

            {/* Pagamento Total */}
            {mode === 'total' && (
                <div className="space-y-4">
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 border border-primary/20">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-bold text-text-secondary">Valor Total:</span>
                            <span className="text-2xl font-black text-primary">{formatCurrency(totalAmount)}</span>
                        </div>
                        <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                            Selecione o método de pagamento:
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {paymentMethods.map((pm) => (
                                <button
                                    key={pm.value}
                                    type="button"
                                    onClick={() => setMethod1(pm.value)}
                                    className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 justify-center font-bold text-sm ${method1 === pm.value
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                            : 'border-gray-200 dark:border-gray-700 text-text-secondary hover:border-green-300'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">{pm.icon}</span>
                                    {pm.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Campo de Troco para Dinheiro */}
                    {method1 === 'dinheiro' && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                            <label className="block text-sm font-bold text-yellow-900 dark:text-yellow-200 mb-2">
                                💵 Troco para quanto?
                            </label>
                            <input
                                type="text"
                                value={changeFor1}
                                onChange={handleChangeForChange(setChangeFor1)}
                                placeholder="Ex: 50,00"
                                className="w-full px-4 py-2.5 rounded-lg border border-yellow-300 dark:border-yellow-700 bg-white dark:bg-gray-800 text-text-main dark:text-white focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all outline-none"
                            />
                            {changeFor1 && parseFloat(changeFor1.replace(',', '.')) > totalAmount && (
                                <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2 font-medium">
                                    Troco: {formatCurrency(parseFloat(changeFor1.replace(',', '.')) - totalAmount)}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Pagamento Misto */}
            {mode === 'split' && (
                <div className="space-y-4">
                    {/* Primeiro Pagamento */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">looks_one</span>
                            <h4 className="font-bold text-blue-900 dark:text-blue-200">Primeiro Pagamento</h4>
                        </div>

                        <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                            Valor do primeiro pagamento:
                        </label>
                        <input
                            type="text"
                            value={amount1}
                            onChange={handleAmount1Change}
                            placeholder="Ex: 50,00"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none mb-3"
                        />

                        <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                            Método de pagamento:
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {paymentMethods.map((pm) => (
                                <button
                                    key={pm.value}
                                    type="button"
                                    onClick={() => setMethod1(pm.value)}
                                    className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 justify-center font-bold text-sm ${method1 === pm.value
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                            : 'border-gray-200 dark:border-gray-700 text-text-secondary hover:border-green-300'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">{pm.icon}</span>
                                    {pm.label}
                                </button>
                            ))}
                        </div>

                        {/* Campo de Troco para Primeiro Pagamento */}
                        {method1 === 'dinheiro' && amount1 && parseFloat(amount1.replace(',', '.')) > 0 && (
                            <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 p-3 rounded-lg">
                                <label className="block text-sm font-bold text-yellow-900 dark:text-yellow-200 mb-2">
                                    💵 Troco para quanto?
                                </label>
                                <input
                                    type="text"
                                    value={changeFor1}
                                    onChange={handleChangeForChange(setChangeFor1)}
                                    placeholder="Ex: 100,00"
                                    className="w-full px-4 py-2.5 rounded-lg border border-yellow-300 dark:border-yellow-700 bg-white dark:bg-gray-800 text-text-main dark:text-white focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all outline-none"
                                />
                            </div>
                        )}
                    </div>

                    {/* Saldo Restante */}
                    {remainingAmount > 0 && (
                        <>
                            <div className="flex items-center justify-center">
                                <div className="bg-gradient-to-r from-primary/20 via-primary to-primary/20 h-0.5 flex-1" />
                                <div className="px-4 py-2 bg-primary text-white rounded-full font-black text-sm shadow-lg">
                                    Saldo: {formatCurrency(remainingAmount)}
                                </div>
                                <div className="bg-gradient-to-r from-primary to-primary/20 h-0.5 flex-1" />
                            </div>

                            {/* Segundo Pagamento */}
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-green-600 dark:text-green-400">looks_two</span>
                                    <h4 className="font-bold text-green-900 dark:text-green-200">Segundo Pagamento</h4>
                                </div>

                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-3 border border-green-300 dark:border-green-700">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-text-secondary">Valor restante:</span>
                                        <span className="text-xl font-black text-green-600 dark:text-green-400">
                                            {formatCurrency(remainingAmount)}
                                        </span>
                                    </div>
                                </div>

                                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                                    Método de pagamento:
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {paymentMethods.map((pm) => (
                                        <button
                                            key={pm.value}
                                            type="button"
                                            onClick={() => setMethod2(pm.value)}
                                            className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 justify-center font-bold text-sm ${method2 === pm.value
                                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                                    : 'border-gray-200 dark:border-gray-700 text-text-secondary hover:border-green-300'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">{pm.icon}</span>
                                            {pm.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Campo de Troco para Segundo Pagamento */}
                                {method2 === 'dinheiro' && (
                                    <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 p-3 rounded-lg">
                                        <label className="block text-sm font-bold text-yellow-900 dark:text-yellow-200 mb-2">
                                            💵 Troco para quanto?
                                        </label>
                                        <input
                                            type="text"
                                            value={changeFor2}
                                            onChange={handleChangeForChange(setChangeFor2)}
                                            placeholder="Ex: 50,00"
                                            className="w-full px-4 py-2.5 rounded-lg border border-yellow-300 dark:border-yellow-700 bg-white dark:bg-gray-800 text-text-main dark:text-white focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all outline-none"
                                        />
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* Validação de Erro */}
                    {amount1 && parseFloat(amount1.replace(',', '.')) >= totalAmount && (
                        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-red-600 dark:text-red-400">error</span>
                                <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                                    O valor do primeiro pagamento deve ser menor que o total ({formatCurrency(totalAmount)})
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PaymentSelector;
