import React, { useState } from 'react';
import { Menu, X, Cpu, LayoutDashboard, Shield, Phone, ShoppingBag, Layers, Lock, Unlock } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  currentView: 'home' | 'catalog' | 'builder' | 'dashboard';
  setView: (view: 'home' | 'catalog' | 'builder' | 'dashboard') => void;
  setSelectedProductId: (id: string | null) => void;
  enquiriesCount: number;
  isAdmin: boolean;
  onOpenLoginModal: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setView,
  setSelectedProductId,
  enquiriesCount,
  isAdmin,
  onOpenLoginModal,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simple navigation items for general users
  const navItems = [
    { label: 'Home', view: 'home' as const, icon: Shield },
    { label: 'Products Shop', view: 'catalog' as const, icon: ShoppingBag },
  ];

  const handleNavClick = (view: 'home' | 'catalog' | 'builder' | 'dashboard') => {
    setView(view);
    setSelectedProductId(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 text-white backdrop-blur-md border-b border-b-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="cursor-pointer group hover:scale-[1.02] transition-all duration-300"
            id="app-logo-container"
          >
            <Logo size="md" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  id={`nav-btn-${item.view}`}
                  onClick={() => handleNavClick(item.view)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'bg-slate-800 text-yellow-400 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-yellow-400 animate-pulse' : 'text-slate-400'}`} />
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-yellow-400 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Render Dashboard optionally when Logged In */}
          </nav>

          {/* Action / Help Section */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end pr-4 text-right">
              <span className="text-xs text-slate-400 font-mono">Expert Assistance</span>
              <a href="tel:123456789" className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> 123456789
              </a>
            </div>

            {/* Admin Toggle Login/Logout Action Button */}
            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  id="btn-admin-console"
                  onClick={() => handleNavClick('dashboard')}
                  className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 rounded-xl text-xs font-semibold text-slate-950 flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/15"
                  title="View Admin Dashboard"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Console
                  {enquiriesCount > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-1 ring-slate-950 animate-bounce">
                      {enquiriesCount}
                    </span>
                  )}
                </button>
                <button
                  id="btn-admin-logout"
                  onClick={onLogout}
                  className="px-3 py-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 border border-slate-700 hover:border-red-500/20 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-all"
                  title="Log out from Admin Panel"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {isAdmin && enquiriesCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {enquiriesCount}
              </span>
            )}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 py-4 px-4 space-y-2 animate-fade-in text-left">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                id={`mobile-nav-${item.view}`}
                onClick={() => handleNavClick(item.view)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-yellow-400'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-slate-400" />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}

          {isAdmin && (
            <button
              id="mobile-nav-dashboard"
              onClick={() => handleNavClick('dashboard')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-slate-850 text-yellow-400'
                  : 'text-emerald-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-5 h-5 text-emerald-400" />
                <span>Admin Panel</span>
              </div>
              {enquiriesCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {enquiriesCount}
                </span>
              )}
            </button>
          )}

          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between px-4">
              <span className="text-xs text-slate-400 font-mono">Support</span>
              <span className="text-xs font-semibold text-yellow-400 flex items-center gap-1 font-mono">
                <Phone className="w-3.5 h-3.5" /> 123456789
              </span>
            </div>

            {isAdmin && (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-red-400 border border-slate-700 hover:bg-slate-750"
              >
                <Unlock className="w-4 h-4" /> Logout Administrator
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
