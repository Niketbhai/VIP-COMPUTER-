import React, { useEffect, useRef } from 'react';
import { Product } from '../types';
import { gsap } from 'gsap';
import { 
  Laptop, 
  Cpu, 
  Eye, 
  Printer, 
  Network, 
  Settings, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Wrench, 
  ShieldAlert, 
  Server,
  Star
} from 'lucide-react';

interface HomeViewProps {
  products: Product[];
  setView: (view: 'home' | 'catalog' | 'builder' | 'dashboard') => void;
  setSelectedProductId: (id: string | null) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  setView,
  setSelectedProductId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scoped GSAP context to avoid selecting elements outside this view
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.gsap-hero-badge', {
        opacity: 0,
        y: -30,
        duration: 0.8,
      })
      .from('.gsap-hero-title', {
        opacity: 0,
        y: 40,
        duration: 1.0,
      }, '-=0.5')
      .from('.gsap-hero-desc', {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, '-=0.6')
      .from('.gsap-hero-cta', {
        opacity: 0,
        scale: 0.95,
        y: 20,
        stagger: 0.12,
        duration: 0.6,
      }, '-=0.5')
      .from('.gsap-hero-stat', {
        opacity: 0,
        y: 15,
        stagger: 0.08,
        duration: 0.5,
      }, '-=0.4')
      .from('.gsap-hero-image', {
        opacity: 0,
        scale: 0.95,
        x: 40,
        duration: 1.1,
      }, '-=1.2')
      .from('.gsap-partner-item', {
        opacity: 0,
        y: 15,
        stagger: 0.05,
        duration: 0.5,
      }, '-=0.8');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Grab a few high-quality featured products
  const featuredProducts = products.filter(p => p.isHot || p.isNew || p.price > 120000).slice(0, 4);

  const categories = [
    { name: 'Premium Laptops', icon: Laptop, count: '12+ Models', desc: 'ASUS ROG, Alienware, MacBook Pro' },
    { name: 'Custom Desktops', icon: Cpu, count: '8+ Specs', desc: 'Liquid-cooled extreme rigs' },
    { name: 'CCTV Systems', icon: Eye, count: 'Enterprise', desc: 'Secure live monitoring feeds' },
    { name: 'Computer Repairs', icon: Wrench, count: 'Express', desc: 'IC level repair & cleaning' },
    { name: 'Laser Printers', icon: Printer, count: 'Bulk Stock', desc: 'Office & graphic setups' },
    { name: 'Enterprise Network', icon: Network, count: 'Managed', desc: 'Fiber optics & routing hubs' },
  ];

  const valueProps = [
    { title: '100% Genuine Components', desc: 'Sourced directly from authorized distributors with matching serial tags.' },
    { title: 'Expert Clean Wiring', desc: 'Our builders tie, wrap, and route every single custom sleeve with mathematical precision.' },
    { title: 'Rigorous 24hr Burn-In', desc: 'Every rig undergoes standard MemTest86, FurMark, and Cinebench thermal tests.' },
  ];

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setView('catalog');
  };

  return (
    <div className="space-y-20 pb-20 overflow-hidden" id="home-view-wrapper" ref={containerRef}>
      
      {/* Hero Showcase Section */}
      <section className="relative overflow-hidden bg-slate-950 py-16 lg:py-24 border-b border-slate-900">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              <div className="gsap-hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-mono tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Next Generation Extreme Computing
              </div>
              
              <h1 className="gsap-hero-title font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
                Uncompromising <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                  Custom Rigs
                </span> & Repairs
              </h1>
              
              <p className="gsap-hero-desc text-slate-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                VIP Computer delivers ultimate performance for creative professionals, gamers, and corporate networks. From liquid-cooled workstation behemoths to rapid board-level diagnostics, we engineering your success.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  id="hero-btn-catalog"
                  onClick={() => setView('catalog')}
                  className="gsap-hero-cta w-full sm:w-auto px-8 py-4 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-semibold text-base shadow-lg shadow-yellow-500/10 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Explore Catalog
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  id="hero-btn-builder"
                  onClick={() => setView('builder')}
                  className="gsap-hero-cta w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-base border border-slate-800 transition-all duration-300 cursor-pointer"
                >
                  Build PC Online
                </button>
              </div>

              {/* Simple Stats Banner */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-900 max-w-md mx-auto lg:mx-0 text-left">
                <div className="gsap-hero-stat">
                  <p className="text-2xl font-bold text-white">4.9/5</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Google Rating</p>
                </div>
                <div className="gsap-hero-stat">
                  <p className="text-2xl font-bold text-white">2.4k+</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Builds Shipped</p>
                </div>
                <div className="gsap-hero-stat">
                  <p className="text-2xl font-bold text-white">3hr</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Repair Turnaround</p>
                </div>
              </div>

            </div>

            {/* Right Showcase Image */}
            <div className="lg:col-span-6 relative flex justify-center gsap-hero-image">
              <div className="relative w-full max-w-md lg:max-w-none group">
                {/* Visual Ambient Glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl blur opacity-30 group-hover:opacity-45 transition-all duration-500"></div>
                <div className="relative bg-slate-950 rounded-2xl p-2 border border-slate-800/60 overflow-hidden shadow-2xl">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB__5zjNlU0hBY6SJ3npg6IATSwKtMptb_FCeiXmtuk4d_7inezz56ql7gtfgfsxJok-R5nj_3YDbtcORyYYkZE_sXv9WDItecaWl3u49HSj7Nw7pyF-05lB0zhmC5EirzEiiCPKvF66hYdifwKAyUDS7tTNUN1Mbngh68RIAQoqurAzwzFmrpNjOi_5YW0S9yQgKcpPxVKNeeU2XFWaLktW1_Bp12FlzRw2LVv68p6C9zDo8ETOOmpZZ4_r_GPb5PVInijNlrSFm0" 
                    alt="VIP Custom Liquid-Cooled Computer System" 
                    className="w-full h-[400px] object-cover rounded-xl group-hover:scale-[1.01] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-800 text-left">
                    <span className="text-[10px] bg-yellow-500/20 text-yellow-400 font-mono px-2 py-0.5 rounded uppercase font-semibold">Flagship Workstation</span>
                    <h3 className="text-white font-semibold text-lg mt-1.5">VIP Liquid Master Pro</h3>
                    <p className="text-xs text-slate-400 mt-1">Dual Loop Custom Tubing • AMD Threadripper • Quad RTX 4090</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Partnerships Rotating Carousel Section */}
      <section className="bg-slate-950/40 border-y border-slate-900 py-10 overflow-hidden relative" id="partnerships-marquee-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-left md:text-center">
          <p className="text-[10px] font-mono text-yellow-400 uppercase tracking-widest font-semibold">Official Hardware Integration Partners</p>
        </div>
        
        {/* Infinite Scroll Container */}
        <div className="relative flex items-center overflow-hidden w-full select-none">
          {/* Left & Right gradient masks for premium fade edge effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
          
          {/* Ticker Row */}
          <div className="animate-marquee flex gap-8 md:gap-16 items-center">
            {/* First Set */}
            {[
              { name: 'NVIDIA', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg', size: 'h-6 md:h-7' },
              { name: 'Intel Core', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel_Core_logo_%282020%29.svg', size: 'h-7 md:h-8' },
              { name: 'AMD', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg', size: 'h-5 md:h-6' },
              { name: 'ASUS ROG', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Asus_ROG_Logo.svg', size: 'h-8 md:h-10' },
              { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', size: 'h-6 md:h-7', invert: true },
            ].map((partner, i) => (
              <div key={`p1-${i}`} className="gsap-partner-item flex items-center justify-center bg-slate-900/40 border border-slate-800/60 px-6 py-3.5 rounded-2xl opacity-50 hover:opacity-100 hover:bg-slate-900/80 hover:border-yellow-500/30 transition-all duration-300 shrink-0 shadow-md group">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className={`${partner.size} w-auto object-contain transition-all duration-300 ${
                    partner.invert ? 'filter brightness-0 invert' : 'filter brightness-0 invert group-hover:filter-none'
                  }`} 
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
            
            {/* Second Set (Duplicate for seamless loop) */}
            {[
              { name: 'NVIDIA', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg', size: 'h-6 md:h-7' },
              { name: 'Intel Core', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel_Core_logo_%282020%29.svg', size: 'h-7 md:h-8' },
              { name: 'AMD', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg', size: 'h-5 md:h-6' },
              { name: 'ASUS ROG', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Asus_ROG_Logo.svg', size: 'h-8 md:h-10' },
              { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', size: 'h-6 md:h-7', invert: true },
            ].map((partner, i) => (
              <div key={`p2-${i}`} className="gsap-partner-item flex items-center justify-center bg-slate-900/40 border border-slate-800/60 px-6 py-3.5 rounded-2xl opacity-50 hover:opacity-100 hover:bg-slate-900/80 hover:border-yellow-500/30 transition-all duration-300 shrink-0 shadow-md group">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className={`${partner.size} w-auto object-contain transition-all duration-300 ${
                    partner.invert ? 'filter brightness-0 invert' : 'filter brightness-0 invert group-hover:filter-none'
                  }`} 
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-display font-bold text-3xl text-white">Shop by Business Sector</h2>
          <p className="text-slate-400">Discover custom-tailored enterprise equipment and rapid repair support plans built to prevent expensive downtime.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx}
                id={`cat-card-${idx}`}
                onClick={() => setView('catalog')}
                className="group p-6 bg-slate-900/60 rounded-2xl border border-slate-800 hover:border-yellow-500/30 hover:bg-slate-900 cursor-pointer transition-all duration-300 flex items-start gap-4 hover:shadow-lg hover:shadow-yellow-500/5"
              >
                <div className="p-3.5 bg-slate-850 rounded-xl text-slate-400 group-hover:text-yellow-400 group-hover:bg-slate-800 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-base group-hover:text-yellow-400 transition-colors">{cat.name}</h3>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">{cat.count}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Hardware Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-900 pb-6 mb-12">
          <div>
            <h2 className="font-display font-bold text-3xl text-white">Featured Hardware Collections</h2>
            <p className="text-slate-400 text-sm mt-1">High-end specifications selected by our leading systems architects.</p>
          </div>
          <button 
            id="btn-view-all"
            onClick={() => setView('catalog')} 
            className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 font-medium text-sm transition-colors"
          >
            View Entire Catalog <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <div 
              key={p.id}
              id={`featured-card-${p.id}`}
              onClick={() => handleProductClick(p.id)}
              className="group flex flex-col h-full bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300 cursor-pointer shadow-md"
            >
              {/* Product Image Panel */}
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden flex items-center justify-center p-4">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Tags */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {p.isNew && (
                    <span className="text-[9px] font-semibold bg-yellow-500 text-slate-950 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                      NEW ARRIVAL
                    </span>
                  )}
                  {p.isHot && (
                    <span className="text-[9px] font-semibold bg-orange-500 text-white px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                      HOT SELLER
                    </span>
                  )}
                </div>

                {/* Quick Spec Overlay */}
                <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                  <div className="space-y-2">
                    <p className="text-xs text-yellow-400 font-mono uppercase tracking-wider font-semibold">Core Specifications</p>
                    <p className="text-xs text-white line-clamp-3 font-medium px-2">{p.specs}</p>
                    <span className="inline-block mt-3 text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">View Specifications</span>
                  </div>
                </div>
              </div>

              {/* Details Bottom Panel */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase">
                    <span>{p.brand}</span>
                    <span className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3 h-3 fill-amber-500" /> 4.9
                    </span>
                  </div>
                  <h3 className="font-semibold text-white text-base group-hover:text-yellow-400 transition-colors line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{p.category} • {p.specs.split('/')[0]}</p>
                </div>

                <div className="flex items-end justify-between pt-2 border-t border-slate-900/60">
                  <div className="text-left">
                    <p className="text-xs text-slate-500 font-mono">Best VIP Price</p>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white">₹{p.price.toLocaleString('en-IN')}</span>
                      {p.originalPrice && (
                        <span className="text-xs text-slate-500 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-yellow-400 group-hover:translate-x-1 transition-transform font-medium">Buy Details →</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Expert Services Section */}
      <section className="bg-slate-900/30 border-y border-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <h2 className="font-display font-bold text-3xl text-white">Certified Computer Repairs & CCTV Integration</h2>
              <p className="text-slate-400 leading-relaxed">
                We are more than a storefront. Our Noida-based workshop houses state-of-the-art diagnostic oscillators, premium BGA rework stations, and fully qualified server network technicians.
              </p>
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-yellow-400 shrink-0" />
                  <span>Express motherboard component replacement (within 24 hours)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-yellow-400 shrink-0" />
                  <span>CCTV deployment with real-time remote surveillance servers</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-yellow-400 shrink-0" />
                  <span>High-speed fiber optical network routing audits</span>
                </li>
              </ul>
              <button 
                id="btn-services-enquiry"
                onClick={() => setView('builder')}
                className="inline-flex items-center gap-2 text-sm font-semibold bg-slate-800 text-white px-5 py-3 rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                Request Custom Technical Support
              </button>
            </div>

            {/* Right Features Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4 text-left">
                <div className="p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl w-12 h-12 flex items-center justify-center">
                  <Wrench className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-white text-base">Board Level Micro-Repair</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We resolve short circuits, burnt MOSFETs, power controller failures, and damaged laptop hinges with professional soldering tools.
                </p>
              </div>

              <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4 text-left">
                <div className="p-3 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-xl w-12 h-12 flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-white text-base">Commercial CCTV Monitoring</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Protect your workspace with high-definition digital cameras linked with centralized multi-terabyte network storage (NVR) logs.
                </p>
              </div>

              <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4 text-left">
                <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl w-12 h-12 flex items-center justify-center">
                  <Server className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-white text-base">Server & Fiber Configuration</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Deploy secure localized NAS servers, firewalls, load balancers, and managed Gigabit switches for zero-bottleneck team collaboration.
                </p>
              </div>

              <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4 text-left">
                <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl w-12 h-12 flex items-center justify-center">
                  <Settings className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-white text-base">Expert PC Upgrades</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Breathe new life into aging desktops and laptops. Safe migration of operating systems, thermal paste cleaning, and RAM boosts.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust & Craftsmanship Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-amber-950/40 p-10 lg:p-16 rounded-3xl border border-slate-800 relative overflow-hidden">
          {/* Subtle decoration lines */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient from-yellow-500/10 to-transparent blur-3xl pointer-events-none"></div>
          
          <div className="max-w-2xl text-left space-y-6 relative z-10">
            <h2 className="font-display font-bold text-3xl text-white">Crafted to Ultimate Standards</h2>
            <p className="text-slate-400 leading-relaxed text-base">
              At VIP Computer, every custom gaming PC and desktop workstation is assembled by a dedicated senior engineer. No messy wires, no lazy component selection, and zero compromises on thermal headroom.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm text-slate-300">
              {valueProps.map((prop, i) => (
                <div key={i} className="space-y-1">
                  <h5 className="font-semibold text-white flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-yellow-400 shrink-0" />
                    {prop.title}
                  </h5>
                  <p className="text-xs text-slate-500 pl-6">{prop.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
