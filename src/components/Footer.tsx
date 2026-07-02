import React from 'react';
import { Cpu, ShieldCheck, Truck, RefreshCw, Clock, MapPin, Mail, PhoneCall } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  setView: (view: 'home' | 'catalog' | 'builder' | 'dashboard') => void;
  isAdmin: boolean;
  onOpenLoginModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setView, isAdmin, onOpenLoginModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Value Props Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-900">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-900 rounded-xl text-yellow-400 border border-slate-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm text-left">3 Years Warranty</h4>
              <p className="text-xs text-slate-500 mt-1 text-left">Full post-build protection & original brand guarantees.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-900 rounded-xl text-yellow-400 border border-slate-800">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm text-left">Safe Insured Delivery</h4>
              <p className="text-xs text-slate-500 mt-1 text-left">Custom double-crate wooden packaging with global tracking.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-900 rounded-xl text-yellow-400 border border-slate-800">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm text-left">Lifetime Tech Support</h4>
              <p className="text-xs text-slate-500 mt-1 text-left">Reach our hardware engineers 24/7 for fine-tuning.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-900 rounded-xl text-yellow-400 border border-slate-800">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm text-left">Quick Repair Handover</h4>
              <p className="text-xs text-slate-500 mt-1 text-left">Express diagnostic checks & component level soldering.</p>
            </div>
          </div>
        </div>
 
        {/* Dynamic Column Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12">
          {/* Brand Info */}
          <div className="text-left">
            <div className="mb-5">
              <Logo size="sm" />
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Empowering architects, hardcore gamers, and deep learning engineers with custom liquid-cooled systems that run cooler and faster.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-slate-900 text-slate-400 px-2.5 py-1 rounded border border-slate-800 font-mono">
                REG: VIP-CO-827-IND
              </span>
            </div>
          </div>
 
          {/* Quick Links */}
          <div className="text-left">
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Solutions</h5>
            <ul className="space-y-3.5 text-sm">
              <li>
                <button onClick={() => setView('catalog')} className="hover:text-yellow-400 transition-colors text-left cursor-pointer">
                  Browse Hardware Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setView('builder')} className="hover:text-yellow-400 transition-colors text-left cursor-pointer">
                  Interactive Custom PC Builder
                </button>
              </li>
              <li>
                <button onClick={() => setView('home')} className="hover:text-yellow-400 transition-colors text-left cursor-pointer">
                  CCTV Security Integration
                </button>
              </li>
            </ul>
          </div>
 
          {/* Contact Details */}
          <div className="text-left">
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">VIP Headquarters</h5>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <span>Sector 62, VIP Tech Plaza, Block C, Noida, Uttar Pradesh, 201301</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <a href="mailto:sales@vipcomputer.com" className="hover:text-yellow-400">sales@vipcomputer.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-yellow-400 shrink-0" />
                <a href="tel:123456789" className="hover:text-yellow-400">123456789</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} . All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Certifications</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
