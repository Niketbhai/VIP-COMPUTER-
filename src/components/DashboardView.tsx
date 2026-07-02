import React, { useState, useMemo } from 'react';
import { Product, Enquiry } from '../types';
import { CATEGORIES, BRANDS } from '../data';
import { 
  BarChart, 
  PlusCircle, 
  Trash2, 
  AlertTriangle, 
  User, 
  Activity, 
  DollarSign, 
  Cpu, 
  Check, 
  MessageSquare, 
  RefreshCw, 
  Sparkles,
  Inbox
} from 'lucide-react';

interface DashboardViewProps {
  products: Product[];
  enquiries: Enquiry[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resolveEnquiry: (id: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  enquiries,
  addProduct,
  deleteProduct,
  resolveEnquiry,
}) => {
  // Menu tab
  const [activeTab, setActiveTab] = useState<'metrics' | 'add-product' | 'enquiries'>('metrics');

  // Add Product Form State
  const [prodName, setProdName] = useState('');
  const [prodBrand, setProdBrand] = useState(BRANDS[0]);
  const [prodCategory, setProdCategory] = useState(CATEGORIES[0]);
  const [prodSpecs, setProdSpecs] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodOriginalPrice, setProdOriginalPrice] = useState('');
  const [prodImg, setProdImg] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuB__5zjNlU0hBY6SJ3npg6IATSwKtMptb_FCeiXmtuk4d_7inezz56ql7gtfgfsxJok-R5nj_3YDbtcORyYYkZE_sXv9WDItecaWl3u49HSj7Nw7pyF-05lB0zhmC5EirzEiiCPKvF66hYdifwKAyUDS7tTNUN1Mbngh68RIAQoqurAzwzFmrpNjOi_5YW0S9yQgKcpPxVKNeeU2XFWaLktW1_Bp12FlzRw2LVv68p6C9zDo8ETOOmpZZ4_r_GPb5PVInijNlrSFm0');
  const [prodNew, setProdNew] = useState(true);
  const [prodHot, setProdHot] = useState(false);
  const [productSuccess, setProductSuccess] = useState(false);

  // Active Enquiry Reader
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(null);
  const [adminReplyText, setAdminReplyText] = useState('');
  const [repliedEnquiryId, setRepliedEnquiryId] = useState<string | null>(null);

  // Stats computation
  const stats = useMemo(() => {
    const totalEnquiries = enquiries.length;
    const urgentCount = enquiries.filter(e => e.status === 'Urgent' || e.status === 'High Priority').length;
    const totalValueInCatalog = products.reduce((acc, p) => acc + p.price, 0);
    const averageValue = products.length > 0 ? Math.round(totalValueInCatalog / products.length) : 0;

    return {
      totalEnquiries,
      urgentCount,
      totalValueInCatalog,
      averageValue,
    };
  }, [products, enquiries]);

  // Selected enquiry details
  const activeEnquiry = useMemo(() => {
    return enquiries.find(e => e.id === selectedEnquiryId) || null;
  }, [enquiries, selectedEnquiryId]);

  // Add Product form handler
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodPrice.trim()) return;

    const parsedPrice = Number(prodPrice);
    const parsedOriginal = prodOriginalPrice ? Number(prodOriginalPrice) : undefined;

    const newProd: Product = {
      id: `prod-${Math.floor(Math.random() * 10000)}`,
      name: prodName,
      brand: prodBrand,
      category: prodCategory,
      specs: prodSpecs || 'i5 Core Chipset / Standard Compute specs',
      price: parsedPrice,
      originalPrice: parsedOriginal,
      image: prodImg,
      inStock: true,
      isNew: prodNew,
      isHot: prodHot,
      processor: prodSpecs.split('/')[0] || 'Dual Core',
      memory: prodSpecs.split('/')[1] || '16GB RAM',
      storage: prodSpecs.split('/')[2] || '512GB SSD',
      display: '15.6" Full HD Anti-glare panel',
      warranty: '1 Year Brand Warranty',
      description: `Premium addition to our ${prodCategory} collection. Configured with ${prodSpecs} to deliver uncompromising speed and stability.`,
      keyFeatures: [
        'Advanced performance cooling structure',
        'Certified high durability standards',
        'Ready for heavy multi-tasking workloads',
      ]
    };

    addProduct(newProd);
    setProductSuccess(true);

    // Reset Form fields
    setProdName('');
    setProdSpecs('');
    setProdPrice('');
    setProdOriginalPrice('');
  };

  // Reply submit simulation
  const handleReplySubmit = (enquiryId: string) => {
    if (!adminReplyText.trim()) return;
    setRepliedEnquiryId(enquiryId);
    setAdminReplyText('');
    setTimeout(() => {
      resolveEnquiry(enquiryId);
      setRepliedEnquiryId(null);
      setSelectedEnquiryId(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-left" id="dashboard-view-wrapper">
      
      {/* Admin Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-900 pb-6 mb-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs text-red-400 font-mono font-bold uppercase tracking-wider">Secure Executive Shell</span>
          </div>
          <h1 className="font-display font-bold text-3xl text-white mt-1">VIP Computer Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Authorized manager workspace. View analytics, register catalog inventory, and dispatch support desks.</p>
        </div>

        {/* Admin Avatar headshot from screenshot */}
        <div className="flex items-center gap-3 bg-slate-900/60 p-2.5 pr-4 rounded-xl border border-slate-800 self-start md:self-auto">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB_KtXmzhQs1SQRYcGCQ2hI29NDmiBzC5vRmrP7SVSwgonCj05cTkFOPQ6uNRwM2zg_hwBlwHPlS-c12smxhr2rWzqHz5KfNqzPLOEQQW0DVCt_Gk0p_m8YwMrjYG926U_bj1p5z0oDl9j2LBgaQAM2QMezhFczLcIyoWIrQSamjYDUKnramGwsQbN89ioLD7HADUcVAycnCuikiAaNoa4auWEKxA9SR7brPqFCStNeHWSF6BoZ2k0I6CcuIEmFJEpwUGVbu7zR1M" 
            alt="Admin User Avatar" 
            className="w-10 h-10 rounded-lg object-cover ring-2 ring-yellow-500/20"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="font-semibold text-white text-xs">Vipin Chaudhary</h4>
            <p className="text-[10px] text-slate-500 font-mono">Senior Systems Director</p>
          </div>
        </div>
      </div>

      {/* Navigation Inside Dashboard */}
      <div className="flex border-b border-slate-850 mb-8 gap-6">
        <button
          id="dash-tab-metrics"
          onClick={() => setActiveTab('metrics')}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider relative transition-colors ${
            activeTab === 'metrics' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Executive Analytics
        </button>
        <button
          id="dash-tab-add"
          onClick={() => { setActiveTab('add-product'); setProductSuccess(false); }}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider relative transition-colors ${
            activeTab === 'add-product' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Register Catalog Item (+)
        </button>
        <button
          id="dash-tab-enquiries"
          onClick={() => setActiveTab('enquiries')}
          className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider relative transition-colors flex items-center gap-1.5 ${
            activeTab === 'enquiries' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Sales & Repair Inbox 
          {stats.urgentCount > 0 && (
            <span className="bg-red-500 text-white font-sans text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
              {stats.urgentCount}
            </span>
          )}
        </button>
      </div>

      {/* METRICS & VISUAL CHARTS TAB */}
      {activeTab === 'metrics' && (
        <div className="space-y-8 animate-fade-in" id="dashboard-metrics-container">
          
          {/* Stats KPI Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Catalog Stock Size</span>
                <p className="text-2xl font-bold text-white">{products.length} Products</p>
              </div>
              <div className="p-3 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-xl">
                <Cpu className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Active Tech Queries</span>
                <p className="text-2xl font-bold text-white">{stats.totalEnquiries} Records</p>
              </div>
              <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl">
                <Inbox className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Urgent Dispatches</span>
                <p className="text-2xl font-bold text-red-400">{stats.urgentCount} Alerts</p>
              </div>
              <div className="p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl">
                <AlertTriangle className="w-5 h-5 animate-bounce" />
              </div>
            </div>

            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Avg Hardware Value</span>
                <p className="text-2xl font-bold text-white">₹{stats.averageValue.toLocaleString('en-IN')}</p>
              </div>
              <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>

          </div>

          {/* Graphical Analytics Charts (High-end custom vector styled bars) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Chart 1: Revenue contribution by category */}
            <div className="lg:col-span-6 bg-slate-900/30 border border-slate-850 p-6 rounded-2xl space-y-6">
              <div>
                <h3 className="font-semibold text-white text-sm uppercase font-mono tracking-wider">Category Revenue Share</h3>
                <p className="text-xs text-slate-500 mt-0.5">Live percentage split based on catalog product totals.</p>
              </div>

              <div className="space-y-4 pt-2">
                {CATEGORIES.map((cat, i) => {
                  const catProducts = products.filter(p => p.category === cat);
                  const catSum = catProducts.reduce((acc, p) => acc + p.price, 0);
                  const sharePct = stats.totalValueInCatalog > 0 
                    ? Math.round((catSum / stats.totalValueInCatalog) * 100) 
                    : 0;

                  return (
                    <div key={cat} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">{cat}</span>
                        <span className="font-mono text-slate-400">₹{catSum.toLocaleString('en-IN')} ({sharePct}%)</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-900">
                        <div 
                          className={`h-2 rounded-full transition-all duration-700 ${
                            i === 0 ? 'bg-yellow-400' : i === 1 ? 'bg-amber-400' : i === 2 ? 'bg-orange-400' : 'bg-slate-700'
                          }`}
                          style={{ width: `${sharePct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart 2: Projected Monthly Sales Volume with high fidelity custom styled bar height */}
            <div className="lg:col-span-6 bg-slate-900/30 border border-slate-850 p-6 rounded-2xl space-y-6">
              <div>
                <h3 className="font-semibold text-white text-sm uppercase font-mono tracking-wider">Projected Volume (Noida Node)</h3>
                <p className="text-xs text-slate-500 mt-0.5">Estimated quarterly order count. Benchmarked against 2024.</p>
              </div>

              <div className="flex justify-between items-end h-[180px] pt-4 px-2 font-mono text-[10px]">
                {[
                  { month: 'Jul', val: 145, pct: '58%' },
                  { month: 'Aug', val: 198, pct: '79%' },
                  { month: 'Sep', val: 162, pct: '64%' },
                  { month: 'Oct', val: 241, pct: '96%' },
                  { month: 'Nov', val: 110, pct: '44%' },
                  { month: 'Dec', val: 180, pct: '72%' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer flex-1">
                    <span className="text-[9px] text-yellow-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.val}
                    </span>
                    <div className="w-7 sm:w-8 bg-slate-950 rounded-t-lg overflow-hidden border border-slate-850 h-[120px] flex items-end">
                      <div 
                        className="w-full bg-gradient-to-t from-amber-600 via-yellow-500 to-yellow-400 rounded-t-md group-hover:brightness-110 transition-all duration-500"
                        style={{ height: item.pct }}
                      />
                    </div>
                    <span className="text-slate-500 uppercase font-semibold">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick List: Registered Products with simple delete mechanism */}
          <div className="bg-slate-900/30 border border-slate-850 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase font-mono tracking-wider">Catalog Inventory Quick Manager</h3>
            <p className="text-xs text-slate-500">Live listings in the store catalog. Revoke out-of-stock items or manage duplicates.</p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse text-slate-400">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 font-mono">
                    <th className="py-3 px-2">Brand/Category</th>
                    <th className="py-3 px-2">Name</th>
                    <th className="py-3 px-2">Specifications snippet</th>
                    <th className="py-3 px-2">Best Price</th>
                    <th className="py-3 px-2 text-right">Inventory Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-slate-900/50 hover:bg-slate-900/30 transition-colors">
                      <td className="py-3 px-2">
                        <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-400 mr-2 uppercase">
                          {p.brand.substring(0,6)}
                        </span>
                        {p.category}
                      </td>
                      <td className="py-3 px-2 font-semibold text-white truncate max-w-[140px]">{p.name}</td>
                      <td className="py-3 px-2 text-slate-500 truncate max-w-[180px]" title={p.specs}>{p.specs}</td>
                      <td className="py-3 px-2 font-mono font-bold text-yellow-400">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-2 text-right">
                        <button
                          id={`delete-prod-${p.id}`}
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded border border-transparent hover:border-red-500/20 transition-all"
                          title="Revoke item from store"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* REGISTER PRODUCT TAB */}
      {activeTab === 'add-product' && (
        <div className="bg-slate-900/30 border border-slate-850 rounded-2xl p-6 sm:p-10 max-w-2xl mx-auto space-y-6 animate-fade-in" id="add-product-form-box">
          <div className="border-b border-slate-850 pb-4">
            <h3 className="font-semibold text-white text-lg">Add New Hardware Item</h3>
            <p className="text-xs text-slate-500 mt-1">Populate this form to list an active laptop, component or CCTV device to the live store grid.</p>
          </div>

          {productSuccess && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center space-y-2.5">
              <Check className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-semibold text-white text-sm">Product Catalog Entry Created!</h4>
              <p className="text-xs text-slate-400">
                The device has been compiled and safely synchronized with our client-side store index.
              </p>
              <button 
                onClick={() => setProductSuccess(false)}
                className="text-xs text-yellow-400 underline hover:text-yellow-300 font-semibold"
              >
                Add another product
              </button>
            </div>
          )}

          {!productSuccess && (
            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 uppercase font-mono text-[10px]">Product Model Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ASUS VivoBook S15 OLED"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-slate-400 uppercase font-mono text-[10px]">Brand Partner *</label>
                  <select
                    value={prodBrand}
                    onChange={(e) => setProdBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-yellow-500 cursor-pointer"
                  >
                    {BRANDS.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 uppercase font-mono text-[10px]">Store Category *</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-yellow-500 cursor-pointer"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-slate-400 uppercase font-mono text-[10px]">Hardware Specs Tag *</label>
                  <input
                    type="text"
                    required
                    placeholder="i5 13th Gen / 16GB / 512GB SSD"
                    value={prodSpecs}
                    onChange={(e) => setProdSpecs(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 uppercase font-mono text-[10px]">Best VIP Price (INR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 54999"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-yellow-500 font-mono"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-slate-400 uppercase font-mono text-[10px]">Original Price (INR) (Optional)</label>
                  <input
                    type="number"
                    placeholder="e.g. 68000"
                    value={prodOriginalPrice}
                    onChange={(e) => setProdOriginalPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-yellow-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 uppercase font-mono text-[10px]">Stock Photo Hotlink URL</label>
                <input
                  type="url"
                  placeholder="Paste high-res image link..."
                  value={prodImg}
                  onChange={(e) => setProdImg(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-yellow-500 font-mono"
                />
              </div>

              <div className="flex gap-6 pt-2 border-t border-slate-850">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={prodNew}
                    onChange={(e) => setProdNew(e.target.checked)}
                    className="rounded border-slate-800 bg-slate-950 text-yellow-500 focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Mark as New Arrival</span>
                </label>
                
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={prodHot}
                    onChange={(e) => setProdHot(e.target.checked)}
                    className="rounded border-slate-800 bg-slate-950 text-yellow-500 focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Mark as Hot Seller (Recommended)</span>
                </label>
              </div>

              <button
                type="submit"
                id="btn-register-item-submit"
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-xl mt-4 transition-all shadow-md uppercase tracking-wide flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" /> Add to Catalog Index
              </button>

            </form>
          )}
        </div>
      )}

      {/* SALES & SUPPORT INBOX TABS */}
      {activeTab === 'enquiries' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in" id="dashboard-enquiries-box">
          
          {/* Left: enquiries summary list */}
          <div className="lg:col-span-5 bg-slate-900/30 border border-slate-850 rounded-2xl p-5 space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase font-mono tracking-wider">Incoming Request Logs</h3>
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2" id="admin-enquiry-list">
              {enquiries.length > 0 ? (
                enquiries.map((enq) => {
                  const isSelected = selectedEnquiryId === enq.id;
                  return (
                    <div
                      key={enq.id}
                      id={`enq-item-${enq.id}`}
                      onClick={() => setSelectedEnquiryId(enq.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 text-left ${
                        isSelected 
                          ? 'bg-slate-900 border-yellow-500/50 ring-1 ring-yellow-500/20' 
                          : 'bg-slate-950/60 border-slate-850 hover:bg-slate-900/40'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-mono">{enq.date}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                          enq.status === 'Urgent' 
                            ? 'bg-red-500/10 text-red-400 border border-red-500/15' 
                            : enq.status === 'High Priority'
                              ? 'bg-orange-500/10 text-orange-400 border border-orange-500/15'
                              : enq.status === 'Bulk Order'
                                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/15'
                                : 'bg-slate-800 text-slate-400'
                        }`}>
                          {enq.status}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <h4 className="font-bold text-white text-xs">{enq.name}</h4>
                        <p className="text-[11px] text-slate-400 truncate">{enq.subject}</p>
                      </div>

                      <p className="text-[10px] text-slate-500 line-clamp-1 italic">
                        "{enq.message.substring(0, 60)}..."
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-slate-500 text-xs">
                  All desks cleared. No incoming customer enquiries.
                </div>
              )}
            </div>
          </div>

          {/* Right: Detailed Reader Desk */}
          <div className="lg:col-span-7 bg-slate-900/30 border border-slate-850 rounded-2xl p-6 min-h-[420px] flex flex-col justify-between">
            {activeEnquiry ? (
              <div className="space-y-6 text-xs flex-1 flex flex-col justify-between">
                
                {/* Header detail */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-850">
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono">ENQUIRY REFERENCE: {activeEnquiry.id.toUpperCase()}</span>
                      <h4 className="font-semibold text-white text-base mt-0.5">{activeEnquiry.subject}</h4>
                    </div>
                    <span className="text-xs bg-slate-950 text-slate-400 border border-slate-800 px-3 py-1 rounded-lg">
                      Category: {activeEnquiry.type}
                    </span>
                  </div>

                  {/* Customer Information Block */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-950 p-3.5 rounded-xl border border-slate-900">
                    <div>
                      <span className="text-slate-500 font-mono text-[9px] uppercase">Client Full Name</span>
                      <p className="text-white font-medium text-xs mt-0.5 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-500" /> {activeEnquiry.name}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-mono text-[9px] uppercase">Contact / Callback Phone</span>
                      <p className="text-yellow-400 font-bold text-xs mt-0.5">{activeEnquiry.phone || 'Not Supplied'}</p>
                    </div>
                  </div>

                  {/* Text message box */}
                  <div className="space-y-1.5">
                    <span className="text-slate-500 font-mono text-[9px] uppercase">Message Content / Compiled Build Specification</span>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-slate-300 leading-relaxed whitespace-pre-wrap max-h-[220px] overflow-y-auto">
                      {activeEnquiry.message}
                    </div>
                  </div>
                </div>

                {/* Reply Desk */}
                <div className="space-y-3 pt-4 border-t border-slate-850">
                  <span className="text-slate-500 font-mono text-[9px] uppercase">Noida Staff Response Terminal</span>
                  {repliedEnquiryId === activeEnquiry.id ? (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center gap-2 font-mono text-xs">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Compiling quote & dispatching response email...
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <textarea
                        rows={2}
                        placeholder="Type official quote details, pricing margins, or component availability..."
                        value={adminReplyText}
                        onChange={(e) => setAdminReplyText(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-yellow-500 resize-none"
                      />
                      <div className="flex gap-3">
                        <button
                          type="button"
                          id="btn-reply-enquiry"
                          onClick={() => handleReplySubmit(activeEnquiry.id)}
                          disabled={!adminReplyText.trim()}
                          className="flex-1 py-2 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl transition-all uppercase text-[11px]"
                        >
                          Send Official Reply Quote
                        </button>
                        <button
                          type="button"
                          id="btn-resolve-enquiry"
                          onClick={() => resolveEnquiry(activeEnquiry.id)}
                          className="px-4 py-2 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors uppercase text-[11px]"
                        >
                          Resolve & Archive Ticket
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              // Empty Reader placeholder
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 flex-1">
                <div className="w-12 h-12 bg-slate-950 text-slate-600 rounded-xl border border-slate-900 flex items-center justify-center">
                  <Inbox className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Select Enquiry to Read</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">Click on any customer request from the left panel logs to view specifications or draft callback quotes.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
