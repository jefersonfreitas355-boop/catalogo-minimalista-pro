
import PrivacyPolicy from './pages/PrivacyPolicy';
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Admin from './pages/Admin';
import { CartProvider } from './context/CartContext';
import CartSidebar from './components/CartSidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark selection:bg-primary/10 selection:text-primary">

      <div className="flex-1 flex flex-col relative">
        {children}
      </div>

      <CartSidebar />

      {!isAdminPage && (
        <footer className="w-full py-10 mt-auto border-t border-[#f0f2f4] dark:border-gray-800">
          <div className="max-w-[1440px] mx-auto px-6 flex flex-col items-center text-center gap-6">
            <div className="space-y-2">
              <p className="text-text-secondary dark:text-gray-500 text-sm font-bold uppercase tracking-widest">
                © 2026 Artmindsgrafhics | Catálogo Auxiliar
              </p>
              <div className="flex items-center justify-center gap-4 text-xs font-medium text-text-secondary dark:text-gray-500">
                <p>Este site é uma ferramenta de apoio ao cliente.</p>
                <span>•</span>
                <Link to="/privacy" className="hover:text-primary transition-colors underline decoration-dotted">
                  Política de Privacidade (LGPD)
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {!location.pathname.endsWith('/') && location.pathname !== '/catalogo-minimalista-pro-master/' && (
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-text-secondary dark:text-gray-500 hover:text-primary text-sm font-bold transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                  Voltar ao Topo
                </button>
              )}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
};

export default App;
