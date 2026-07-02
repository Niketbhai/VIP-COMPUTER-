import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { DetailView } from './components/DetailView';
import { PCBuilderView } from './components/PCBuilderView';
import { DashboardView } from './components/DashboardView';
import { Footer } from './components/Footer';
import { INITIAL_PRODUCTS, INITIAL_ENQUIRIES } from './data';
import { Product, Enquiry } from './types';
import { ShieldAlert, X, Lock } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<'home' | 'catalog' | 'builder' | 'dashboard'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  // Data State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  
  // Authentication State
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Add Product to Catalog
  const addProduct = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
  };

  // Delete Product from Catalog
  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Add Enquiry/Lead
  const addEnquiry = (newEnquiry: Enquiry) => {
    setEnquiries([newEnquiry, ...enquiries]);
    console.log('Registered Enquiry:', newEnquiry);
  };

  // Resolve/Remove Enquiry
  const resolveEnquiry = (id: string) => {
    setEnquiries(enquiries.filter(e => e.id !== id));
  };

  // Handle Admin Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password.trim() === 'admin') {
      setIsAdmin(true);
      setIsLoginModalOpen(false);
      setLoginError('');
      setUsername('');
      setPassword('');
      setView('dashboard');
    } else {
      setLoginError('Invalid Administrator Username or Access Key.');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    if (currentView === 'dashboard') {
      setView('home');
    }
  };

  // Find selected product detail object
  const selectedProduct = products.find((p) => p.id === selectedProductId);

  // Render proper stage view
  const renderViewContent = () => {
    if (currentView === 'home') {
      return (
        <HomeView
          products={products}
          setView={setView}
          setSelectedProductId={setSelectedProductId}
        />
      );
    }

    if (currentView === 'catalog') {
      if (selectedProductId && selectedProduct) {
        return (
          <DetailView
            product={selectedProduct}
            onBack={() => setSelectedProductId(null)}
            addEnquiry={addEnquiry}
          />
        );
      }
      return (
        <CatalogView
          products={products}
          setSelectedProductId={setSelectedProductId}
          selectedProductId={selectedProductId}
        />
      );
    }

    if (currentView === 'builder') {
      return <PCBuilderView addEnquiry={addEnquiry} />;
    }

    if (currentView === 'dashboard') {
      if (!isAdmin) {
        return (
          <div className="max-w-md mx-auto my-20 p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-4">
            <Lock className="w-12 h-12 text-yellow-500 mx-auto" />
            <h2 className="text-xl font-bold text-white">Administrator Access Required</h2>
            <p className="text-sm text-slate-400">Please sign in to view administrative inquiries and catalog management console.</p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-xl transition-all"
            >
              Sign In Now
            </button>
          </div>
        );
      }
      return (
        <DashboardView
          products={products}
          enquiries={enquiries}
          addProduct={addProduct}
          deleteProduct={deleteProduct}
          resolveEnquiry={resolveEnquiry}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col justify-between selection:bg-yellow-500/30 selection:text-yellow-400">
      
      {/* Top sticky navigation header */}
      <Header
        currentView={currentView}
        setView={setView}
        setSelectedProductId={setSelectedProductId}
        enquiriesCount={enquiries.length}
        isAdmin={isAdmin}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container Stage */}
      <main className="flex-1 bg-slate-950">
        {renderViewContent()}
      </main>

      {/* Structured Footer */}
      <Footer
        setView={setView}
        isAdmin={isAdmin}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Minimal Admin Access Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-sm w-full relative space-y-4">
            <button
              onClick={() => {
                setIsLoginModalOpen(false);
                setLoginError('');
              }}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center mx-auto border border-yellow-500/20">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Console Access Login</h3>
              <p className="text-xs text-slate-500">Sign in with standard admin access parameters.</p>
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-xs text-red-400">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block text-left">Username</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block text-left">Access Key / Password</label>
                <input
                  type="password"
                  required
                  placeholder="e.g. admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-500 font-mono"
                />
              </div>

              <button
                type="submit"
                id="btn-admin-login-submit"
                className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider"
              >
                Authenticate & Boot
              </button>
            </form>
            <div className="text-center pt-2">
              <p className="text-[10px] text-slate-600 font-mono">Demo Credentials: admin / admin</p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
