
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, totalPrice, updateQuantity, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    company: '',
    observations: ''
  });

  const handleSendWhatsApp = () => {
    if (!formData.name || !formData.whatsapp) {
      alert('Por favor, preencha seu nome e WhatsApp.');
      return;
    }

    const cartText = cart.map(item => `• ${item.name} (x${item.quantity}) - ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}`).join('\n');
    const totalText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice);
    
    const message = encodeURIComponent(`*Novo Orçamento Solicitação*\n\n` +
      `*Cliente:* ${formData.name}\n` +
      `*Empresa:* ${formData.company || 'N/A'}\n` +
      `*WhatsApp:* ${formData.whatsapp}\n\n` +
      `*Itens:*\n${cartText}\n\n` +
      `*Total Estimado:* ${totalText}\n\n` +
      `*Observações:* ${formData.observations || 'Nenhuma'}`);
    
    window.open(`https://wa.me/55${formData.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
        <span className="material-symbols-outlined text-8xl text-gray-200 mb-6">shopping_cart_off</span>
        <h1 className="text-3xl font-black text-text-main dark:text-white mb-4">Seu carrinho está vazio</h1>
        <p className="text-text-secondary mb-8 max-w-md">Adicione alguns produtos ao seu orçamento antes de finalizar o pedido.</p>
        <Link to="/catalog" className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/20">
          Explorar Produtos
        </Link>
      </div>
    );
  }

  return (
    <main className="layout-container flex h-full grow flex-col px-4 py-8 lg:px-20 max-w-[1440px] mx-auto w-full">
      <div className="flex flex-wrap justify-between gap-3 pb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl lg:text-5xl font-black leading-tight tracking-tight text-text-main dark:text-white">Revisão e Envio</h1>
          <p className="text-text-secondary text-base font-medium">Confira os itens selecionados e preencha seus dados para finalizar o pedido via WhatsApp.</p>
        </div>
        <Link to="/catalog" className="flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Voltar ao Catálogo
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold w-[45%]">Produto</th>
                    <th className="px-6 py-4 text-center text-sm font-bold w-[20%]">Qtd.</th>
                    <th className="px-6 py-4 text-right text-sm font-bold w-[20%]">Preço Unit.</th>
                    <th className="px-6 py-4 text-right text-sm font-bold w-[15%]">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {cart.map(item => (
                    <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-text-main dark:text-white">{item.name}</span>
                            <span className="text-xs text-text-secondary">{item.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden h-9">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 text-slate-400 hover:text-primary transition-colors font-black">-</button>
                          <span className="px-3 min-w-[40px] text-center text-sm font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 text-slate-400 hover:text-primary transition-colors font-black">+</button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-primary">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800">
              <span className="text-sm font-bold text-text-secondary">{cart.length} itens na lista</span>
              <div className="flex items-center gap-3">
                <span className="text-base font-medium text-text-secondary">Total Estimado:</span>
                <span className="text-3xl font-black text-text-main dark:text-white">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-[20px]">edit_note</span>
              <h3 className="text-lg font-bold">Observações do Pedido</h3>
            </div>
            <textarea 
              className="w-full resize-y rounded-xl text-text-main dark:text-white border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-primary focus:border-primary h-32 placeholder:text-slate-400 p-4 text-sm font-medium transition-all" 
              placeholder="Especifique cores, tamanhos especiais ou detalhes de entrega..."
              value={formData.observations}
              onChange={(e) => setFormData({...formData, observations: e.target.value})}
            ></textarea>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark p-6 shadow-xl shadow-primary/5">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <span className="material-symbols-outlined text-primary">person</span>
              <h2 className="text-xl font-bold">Seus Dados</h2>
            </div>
            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-text-main dark:text-gray-200">Nome Completo</span>
                <input 
                  className="rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary h-11 text-sm font-medium" 
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-text-main dark:text-gray-200">WhatsApp</span>
                <input 
                  className="rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary h-11 text-sm font-medium" 
                  placeholder="(00) 00000-0000"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-text-main dark:text-gray-200">Empresa <span className="text-slate-400 font-normal">(Opcional)</span></span>
                <input 
                  className="rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-primary h-11 text-sm font-medium" 
                  placeholder="Nome da empresa"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </label>
            </div>
            <button 
              onClick={handleSendWhatsApp}
              className="w-full mt-8 flex items-center justify-center gap-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold h-14 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span className="material-symbols-outlined">send</span>
              Enviar no WhatsApp
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-4 leading-relaxed uppercase tracking-wider font-bold">
              Ao clicar, você será redirecionado para o WhatsApp com o resumo do pedido.
            </p>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-transparent dark:border-slate-800">
            <span className="material-symbols-outlined text-slate-400">lock</span>
            <p className="text-[10px] text-slate-500 font-bold leading-tight">SEUS DADOS SÃO USADOS APENAS PARA GERAR O ORÇAMENTO E NÃO SÃO SALVOS EM NOSSOS SERVIDORES.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
