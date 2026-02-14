
import React from 'react';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[520px] bg-white dark:bg-[#1a2230] rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
        <div className="p-8 sm:p-12 flex flex-col">
          <div className="flex flex-col items-center mb-10">
            <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-3xl">dataset</span>
            </div>
            <h1 className="text-text-main dark:text-white tracking-tight text-3xl font-black text-center">Criar Nova Conta</h1>
            <p className="text-text-secondary dark:text-gray-400 text-sm font-bold mt-2 text-center max-w-xs">Junte-se ao catálogo minimalista para gerenciar seus produtos e vendas.</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold">Nome Completo</label>
              <input className="rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 px-4 focus:ring-primary" placeholder="Ex: Maria Silva" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold">E-mail</label>
              <input className="rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 px-4 focus:ring-primary" placeholder="exemplo@email.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold">Senha</label>
              <input type="password" className="rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 px-4 focus:ring-primary" placeholder="Crie uma senha forte" />
            </div>
            <button className="w-full h-14 mt-4 bg-primary hover:bg-primary-hover text-white font-black rounded-lg transition-all shadow-lg shadow-primary/20 active:scale-95">
              Cadastrar Agora
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-bold text-text-secondary">
              Já tem uma conta? <Link to="/login" className="text-primary hover:underline ml-1">Entrar agora</Link>
            </p>
            <div className="mt-6 flex justify-center gap-6 text-[10px] font-black uppercase text-gray-400">
              <button className="hover:text-primary transition-colors">Termos</button>
              <button className="hover:text-primary transition-colors">Privacidade</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
