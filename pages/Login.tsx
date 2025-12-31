
import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[480px] bg-white dark:bg-[#1a2230] rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="px-8 pt-10 pb-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
            <span className="material-symbols-outlined text-4xl">inventory_2</span>
          </div>
          <h1 className="text-text-main dark:text-white tracking-tight text-3xl font-black leading-tight text-center">
            Acesse sua conta
          </h1>
          <p className="text-text-secondary dark:text-gray-400 text-sm font-bold pt-2 text-center">
            Bem-vindo de volta ao catálogo
          </p>
        </div>
        
        <div className="px-8 pb-10">
          <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col gap-1.5">
              <label className="text-text-main dark:text-gray-200 text-sm font-bold">E-mail ou Usuário</label>
              <input className="rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 px-4 focus:ring-primary text-sm" placeholder="ex: joao@empresa.com" />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-text-main dark:text-gray-200 text-sm font-bold">Senha</label>
                <button className="text-primary hover:underline text-xs font-bold">Esqueci minha senha</button>
              </div>
              <input type="password" className="rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 px-4 focus:ring-primary text-sm" placeholder="Digite sua senha" />
            </div>

            <button className="w-full h-12 mt-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95">
              <span>Entrar</span>
              <span className="material-symbols-outlined text-lg">login</span>
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-800"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold"><span className="bg-white dark:bg-[#1a2230] px-4 text-gray-400">Novo por aqui?</span></div>
          </div>

          <Link to="/signup" className="w-full h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-text-main dark:text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2">
            Criar conta
          </Link>
        </div>
      </div>
      <p className="mt-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2024 Catálogo Digital. Todos os direitos reservados.</p>
    </div>
  );
};

export default Login;
