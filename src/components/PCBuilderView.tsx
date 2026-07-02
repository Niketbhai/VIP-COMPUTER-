import React, { useState, useMemo } from 'react';
import { BuilderPart, Enquiry } from '../types';
import { BUILDER_PARTS } from '../data';
import { 
  Check, 
  Cpu, 
  Layers, 
  AlertTriangle, 
  Send, 
  Trash2, 
  DollarSign, 
  CpuIcon, 
  Sparkles, 
  CheckCircle,
  Laptop,
  Flame,
  Zap,
  Target,
  RefreshCw
} from 'lucide-react';

interface PCBuilderViewProps {
  addEnquiry: (enquiry: Enquiry) => void;
}

type PartCategory = 'CPU' | 'GPU' | 'Motherboard' | 'RAM' | 'Storage' | 'Power Supply' | 'Case' | 'Cooler';

// Pre-configured custom build recommendations
const RIG_PRESETS = [
  {
    id: 'supreme-ai-rig',
    name: 'Supreme AI & Deep Learning Rig',
    badge: 'AI & Multi-GPU',
    desc: 'Built for intense neural network modeling, professional 3D rendering, and flawless 4K gaming.',
    icon: Flame,
    colorClass: 'from-orange-500/20 to-amber-600/10 border-orange-500/30 text-orange-400 hover:border-orange-500/50',
    parts: {
      'CPU': 'cpu-1',
      'GPU': 'gpu-1',
      'Motherboard': 'mb-1',
      'RAM': 'ram-3',
      'Storage': 'st-1',
      'Power Supply': 'ps-1',
      'Case': 'cs-1',
      'Cooler': 'cl-1'
    }
  },
  {
    id: 'pro-gaming-rig',
    name: 'Ultimate Gaming & Streaming Rig',
    badge: 'Pro Gamer Choice',
    desc: 'Unbeatable compatibility pairing AMD Ryzen 3D V-Cache tech with NVIDIA RTX Super series graphics.',
    icon: Zap,
    colorClass: 'from-yellow-500/20 to-amber-600/10 border-yellow-500/30 text-yellow-400 hover:border-yellow-500/50',
    parts: {
      'CPU': 'cpu-2',
      'GPU': 'gpu-2',
      'Motherboard': 'mb-2',
      'RAM': 'ram-1',
      'Storage': 'st-1',
      'Power Supply': 'ps-2',
      'Case': 'cs-2',
      'Cooler': 'cl-2'
    }
  },
  {
    id: 'budget-power-rig',
    name: 'Budget Enthusiast Station',
    badge: 'Maximum Value',
    desc: 'Premium price-to-performance configuration ideal for 1440p high-refresh gaming and daily tasks.',
    icon: Target,
    colorClass: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30 text-emerald-400 hover:border-emerald-500/50',
    parts: {
      'CPU': 'cpu-4',
      'GPU': 'gpu-4',
      'Motherboard': 'mb-2',
      'RAM': 'ram-2',
      'Storage': 'st-2',
      'Power Supply': 'ps-3',
      'Case': 'cs-3',
      'Cooler': 'cl-3'
    }
  }
];

export const PCBuilderView: React.FC<PCBuilderViewProps> = ({ addEnquiry }) => {
  // Map categories to user-selected part
  const [selections, setSelections] = useState<Record<PartCategory, BuilderPart | null>>({
    'CPU': null,
    'GPU': null,
    'Motherboard': null,
    'RAM': null,
    'Storage': null,
    'Power Supply': null,
    'Case': null,
    'Cooler': null,
  });

  // Current category the user is viewing/picking in the selector shelf
  const [activeSelectCategory, setActiveSelectCategory] = useState<PartCategory>('CPU');

  // Contact Info form
  const [builderPhone, setBuilderPhone] = useState('');
  const [buildSubmitted, setBuildSubmitted] = useState(false);

  const categoriesList: PartCategory[] = [
    'CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'Power Supply', 'Case', 'Cooler'
  ];

  const handleAutoComplete = () => {
    const newSelections = { ...selections };
    
    // Intelligently infer processor socket standard (Intel vs AMD)
    let platform: 'intel' | 'amd' | null = null;
    if (newSelections['CPU']) {
      platform = newSelections['CPU'].name.toLowerCase().includes('intel') ? 'intel' : 'amd';
    } else if (newSelections['Motherboard']) {
      platform = newSelections['Motherboard'].name.toLowerCase().includes('z790') || newSelections['Motherboard'].name.toLowerCase().includes('lga1700') ? 'intel' : 'amd';
    }

    // 1. Fill CPU if empty
    if (!newSelections['CPU']) {
      const targetId = platform === 'amd' ? 'cpu-2' : 'cpu-3'; // AMD Ryzen 7 7800X3D or Intel Core i7-13700K
      newSelections['CPU'] = BUILDER_PARTS.find(p => p.id === targetId) || null;
      if (newSelections['CPU']) {
        platform = newSelections['CPU'].name.toLowerCase().includes('intel') ? 'intel' : 'amd';
      }
    }

    // 2. Fill Motherboard if empty (Socket-aware)
    if (!newSelections['Motherboard']) {
      const targetId = platform === 'amd' ? 'mb-2' : 'mb-3'; // B650 for AMD or Z790 for Intel
      newSelections['Motherboard'] = BUILDER_PARTS.find(p => p.id === targetId) || null;
    }

    // 3. Fill GPU if empty
    if (!newSelections['GPU']) {
      newSelections['GPU'] = BUILDER_PARTS.find(p => p.id === 'gpu-3') || null; // RTX 4070 Ti Super
    }

    // 4. Fill RAM if empty
    if (!newSelections['RAM']) {
      newSelections['RAM'] = BUILDER_PARTS.find(p => p.id === 'ram-1') || null; // G.Skill 32GB DDR5
    }

    // 5. Fill Storage if empty
    if (!newSelections['Storage']) {
      newSelections['Storage'] = BUILDER_PARTS.find(p => p.id === 'st-1') || null; // Samsung 990 Pro 2TB
    }

    // 6. Fill Case if empty
    if (!newSelections['Case']) {
      newSelections['Case'] = BUILDER_PARTS.find(p => p.id === 'cs-2') || null; // NZXT H9 Flow
    }

    // 7. Fill Cooler if empty
    if (!newSelections['Cooler']) {
      newSelections['Cooler'] = BUILDER_PARTS.find(p => p.id === 'cl-2') || null; // Deepcool LT720
    }

    // 8. Fill PSU if empty (Wattage safe)
    if (!newSelections['Power Supply']) {
      const isExtremeGpu = newSelections['GPU']?.name.includes('4090');
      newSelections['Power Supply'] = BUILDER_PARTS.find(p => p.id === (isExtremeGpu ? 'ps-1' : 'ps-2')) || null;
    }

    setSelections(newSelections);
  };

  // Pick a component
  const handleSelectPart = (category: PartCategory, part: BuilderPart) => {
    setSelections({
      ...selections,
      [category]: part,
    });
  };

  // Remove component
  const handleRemovePart = (category: PartCategory) => {
    setSelections({
      ...selections,
      [category]: null,
    });
  };

  // Load predefined template/preset in 1-click
  const handleApplyPreset = (preset: typeof RIG_PRESETS[0]) => {
    const updated = { ...selections };
    Object.entries(preset.parts).forEach(([cat, partId]) => {
      const foundPart = BUILDER_PARTS.find(p => p.id === partId);
      if (foundPart) {
        updated[cat as PartCategory] = foundPart;
      }
    });
    setSelections(updated);
  };

  // Clear all selections
  const handleClearSelections = () => {
    setSelections({
      'CPU': null,
      'GPU': null,
      'Motherboard': null,
      'RAM': null,
      'Storage': null,
      'Power Supply': null,
      'Case': null,
      'Cooler': null,
    });
  };

  // Available options for active category
  const partsCabinet = useMemo(() => {
    return BUILDER_PARTS.filter(p => p.category === activeSelectCategory);
  }, [activeSelectCategory]);

  // Compute metrics
  const totalCost = useMemo(() => {
    return (Object.values(selections) as (BuilderPart | null)[]).reduce((acc, part) => {
      return acc + (part ? part.price : 0);
    }, 0);
  }, [selections]);

  // Count mounted items
  const mountedCount = useMemo(() => {
    return Object.values(selections).filter(Boolean).length;
  }, [selections]);

  const estimatedPowerUsage = useMemo(() => {
    let power = 50; // Motherboard and idle load
    if (selections['CPU']) {
      const name = selections['CPU'].name;
      if (name.includes('i9')) power += 250;
      else if (name.includes('Ryzen 7')) power += 120;
      else if (name.includes('i7')) power += 180;
      else power += 95;
    }
    if (selections['GPU']) {
      const name = selections['GPU'].name;
      if (name.includes('4090')) power += 450;
      else if (name.includes('4080')) power += 320;
      else if (name.includes('4070')) power += 250;
      else power += 200;
    }
    if (selections['RAM']) power += 15;
    if (selections['Storage']) power += 10;
    if (selections['Cooler']) power += 40;
    return power;
  }, [selections]);

  // Compatibility Engine rules
  const diagnostics = useMemo(() => {
    const warnings: string[] = [];
    const cpu = selections['CPU'];
    const mb = selections['Motherboard'];
    const psu = selections['Power Supply'];

    // 1. Socket Check
    if (cpu && mb) {
      const isIntelCpu = cpu.name.toLowerCase().includes('intel');
      const isAmdCpu = cpu.name.toLowerCase().includes('amd');
      const isIntelMb = mb.name.toLowerCase().includes('z790') || mb.name.toLowerCase().includes('lga1700');
      const isAmdMb = mb.name.toLowerCase().includes('b650') || mb.name.toLowerCase().includes('am5');

      if (isIntelCpu && isAmdMb) {
        warnings.push('SOCKET CONFLICT: Intel Processor selected is not compatible with AMD AM5 Socket motherboards.');
      } else if (isAmdCpu && isIntelMb) {
        warnings.push('SOCKET CONFLICT: AMD Ryzen Processor is not compatible with Intel LGA1700 Socket motherboards.');
      }
    }

    // 2. Power Load Check
    if (psu) {
      let psuWattage = 650;
      if (psu.name.includes('1000W')) psuWattage = 1000;
      else if (psu.name.includes('850W')) psuWattage = 850;

      if (estimatedPowerUsage > psuWattage * 0.9) {
        warnings.push(`POWER CAPACITY WARNING: Selected ${psuWattage}W Power Supply is too small for estimated peak loads (${estimatedPowerUsage}W). Recommend upgrading to at least 1000W.`);
      }
    }

    // 3. Dual-channel RAM advice
    if (selections['RAM'] && selections['RAM'].name.includes('16GB') && selections['GPU'] && selections['GPU'].name.includes('4090')) {
      warnings.push('PERFORMANCE BOTTLENECK: 16GB RAM is highly bottlenecked with an RTX 4090 GPU. We recommend 32GB or 64GB DDR5 Dual Channel.');
    }

    return warnings;
  }, [selections, estimatedPowerUsage]);

  // Submit compiled build proposal
  const handleSubmitBuild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!builderPhone.trim()) return;

    // Compile parts list
    const partsListText = (Object.entries(selections) as [PartCategory, BuilderPart | null][])
      .map(([cat, part]) => {
        return `${cat}: ${part ? `${part.brand} ${part.name} (₹${part.price.toLocaleString('en-IN')})` : 'Not Selected'}`;
      })
      .join('\n');

    const proposalMsg = `
PROPOSED CUSTOM BUILD SUMMARY:
=========================================
${partsListText}
=========================================
Estimated Peak Wattage: ${estimatedPowerUsage}W
Subtotal Value: ₹${totalCost.toLocaleString('en-IN')}
Diagnostics Warnings: ${diagnostics.length > 0 ? diagnostics.join(', ') : 'None - Fully Verified Compatibility'}
    `;

    const newEnquiry: Enquiry = {
      id: `enq-${Math.floor(Math.random() * 10000)}`,
      name: 'Customer',
      phone: builderPhone,
      type: 'Build',
      subject: 'Custom PC Rig Builder',
      message: proposalMsg.trim(),
      status: diagnostics.length > 0 ? 'Urgent' : 'High Priority',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    addEnquiry(newEnquiry);
    setBuildSubmitted(true);
    
    // Clear selections & forms
    setSelections({
      'CPU': null,
      'GPU': null,
      'Motherboard': null,
      'RAM': null,
      'Storage': null,
      'Power Supply': null,
      'Case': null,
      'Cooler': null,
    });
    setBuilderPhone('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in animate-duration-500" id="pc-builder-view-wrapper">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-mono uppercase">
          <Sparkles className="w-3.5 h-3.5" /> VIP Compatibility Diagnostics Engine
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">Assemble Your Dream Rig</h1>
        <p className="text-slate-400 text-sm">
          Select custom core chips, graphics accelerators, memory, and cooling. Choose a 1-click preset below or configure parts step-by-step. Our engine verifies compatibility on the fly.
        </p>
      </div>

      {/* 1-Click Recommendations Showcase - MAKES IT EASY */}
      <div className="mb-10 text-left">
        <h3 className="text-xs font-mono font-semibold text-yellow-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400" /> Super-Easy 1-Click Configurations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RIG_PRESETS.map((preset) => {
            const Icon = preset.icon;
            return (
              <div 
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`bg-slate-900/40 hover:bg-slate-900 border rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.01] active:scale-95 flex flex-col justify-between text-left relative overflow-hidden group border-slate-800`}
              >
                {/* Visual Highlight Background */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl opacity-[0.03] rounded-bl-full pointer-events-none group-hover:opacity-[0.08] transition-opacity`} />
                
                <div className="space-y-2.5 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded-full font-semibold uppercase">
                      {preset.badge}
                    </span>
                    <Icon className="w-4 h-4 text-yellow-400 opacity-60" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">{preset.name}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{preset.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-850/60 mt-4 flex items-center justify-between text-xs relative z-10">
                  <span className="text-slate-500 font-mono">Instant Pre-load</span>
                  <span className="text-yellow-400 font-bold hover:underline flex items-center gap-1 text-[11px]">
                    Mount Build Preset →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Hand: Category Slots and Picker Shelf */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Slots List */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-3.5 text-left relative">
            <div className="flex items-center justify-between border-b border-slate-850 pb-4 mb-4">
              <h3 className="font-semibold text-white text-base flex items-center gap-2">
                <Layers className="w-4.5 h-4.5 text-yellow-400" /> Component Mounting Board
              </h3>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[11px] sm:text-xs bg-slate-950 text-slate-400 px-2.5 py-1 rounded-full border border-slate-850 font-mono">
                  {mountedCount}/8 Mounted
                </span>
                {mountedCount < 8 && (
                  <button 
                    onClick={handleAutoComplete}
                    className="text-[11px] sm:text-xs text-yellow-400 hover:text-yellow-300 flex items-center gap-1 px-3 py-1 bg-yellow-950/40 border border-yellow-500/20 hover:border-yellow-500/40 rounded-lg transition-all font-semibold shadow-sm cursor-pointer"
                    title="Intelligently auto-select remaining parts for your build"
                  >
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Auto-Fill
                  </button>
                )}
                {mountedCount > 0 && (
                  <button 
                    onClick={handleClearSelections}
                    className="text-[11px] sm:text-xs text-red-400 hover:text-red-300 flex items-center gap-1 px-2.5 py-1 bg-slate-950 border border-red-500/10 hover:border-red-500/30 rounded-lg transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>
            </div>
            
            {categoriesList.map((cat) => {
              const selectedPart = selections[cat];
              const isSelectedCabinet = activeSelectCategory === cat;

              return (
                <div 
                  key={cat}
                  id={`slot-${cat}`}
                  onClick={() => setActiveSelectCategory(cat)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    selectedPart 
                      ? 'bg-slate-900/90 border-slate-700/60 shadow-md ring-1 ring-emerald-500/5' 
                      : isSelectedCabinet
                        ? 'bg-slate-850 border-yellow-500/40 shadow-inner'
                        : 'bg-slate-950/40 border-slate-850 hover:bg-slate-900/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                      selectedPart 
                        ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-sm' 
                        : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}>
                      {cat.substring(0, 3).toUpperCase()}
                    </div>
                    
                    <div className="space-y-0.5 text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-500 font-mono uppercase font-semibold">{cat} Selection</span>
                        {selectedPart && <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-mono font-semibold">Mounted</span>}
                      </div>
                      {selectedPart ? (
                        <div>
                          <h4 className="font-semibold text-white text-sm">{selectedPart.name}</h4>
                          <p className="text-xs text-slate-400 line-clamp-1">{selectedPart.specs}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 italic">No component selected. Click to mount.</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    {selectedPart ? (
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm font-bold text-white">₹{selectedPart.price.toLocaleString('en-IN')}</span>
                        <button
                          id={`btn-remove-${cat}`}
                          onClick={(e) => { e.stopPropagation(); handleRemovePart(cat); }}
                          className="p-2 text-slate-500 hover:text-red-400 bg-slate-950 border border-slate-850 rounded-lg transition-colors"
                          title="Remove part"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        id={`btn-mount-${cat}`}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                          isSelectedCabinet
                            ? 'bg-yellow-500 text-slate-950 border-yellow-400 shadow-md'
                            : 'bg-slate-950 text-slate-300 border-slate-850 hover:bg-slate-900'
                        }`}
                      >
                        Mount Component
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Inline Selection Cabinet Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <div>
                <h4 className="font-semibold text-white text-base">Select Hardware: <span className="text-yellow-400 font-mono">{activeSelectCategory}</span> Cabinet</h4>
                <p className="text-xs text-slate-500">Choose custom components optimized for heavy thermal compute.</p>
              </div>
              <span className="text-xs bg-slate-950 text-slate-400 border border-slate-800 px-3 py-1 rounded-lg font-mono">
                {partsCabinet.length} Options Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[340px] overflow-y-auto pr-2 animate-fade-in" id="builder-parts-grid">
              {partsCabinet.map((part) => {
                const isSelected = selections[activeSelectCategory]?.id === part.id;
                return (
                  <div
                    key={part.id}
                    id={`cabinet-part-${part.id}`}
                    onClick={() => handleSelectPart(activeSelectCategory, part)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                      isSelected 
                        ? 'bg-slate-950 border-yellow-500/50 ring-1 ring-yellow-500/20 shadow-md' 
                        : 'bg-slate-950/60 border-slate-850 hover:bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1 text-left">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>{part.brand}</span>
                        {isSelected && <span className="text-emerald-400 font-semibold flex items-center gap-0.5"><Check className="w-3 h-3" /> Selected</span>}
                      </div>
                      <h5 className="font-semibold text-white text-xs leading-snug line-clamp-1">{part.name}</h5>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{part.specs}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                      <span className="font-mono text-xs font-bold text-white">₹{part.price.toLocaleString('en-IN')}</span>
                      <button
                        id={`btn-pick-${part.id}`}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border uppercase transition-colors ${
                          isSelected
                            ? 'bg-slate-800 text-emerald-400 border-slate-700'
                            : 'bg-yellow-500 text-slate-950 border-yellow-400 hover:bg-yellow-400'
                        }`}
                      >
                        {isSelected ? 'Mounted' : 'Mount Part'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Hand: Summary, Sockets Diagnostics, and Submission form */}
        <aside className="lg:col-span-4 space-y-6 text-left lg:sticky lg:top-28">
          
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-6">
            <h3 className="font-semibold text-white text-base pb-3 border-b border-slate-850 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-yellow-400" /> Live Build Invoice
            </h3>

            {/* Selected Parts mini-list */}
            <div className="space-y-3.5 text-xs max-h-[180px] overflow-y-auto pr-1">
              {(Object.entries(selections) as [PartCategory, BuilderPart | null][]).map(([cat, part]) => (
                <div key={cat} className="flex justify-between items-start gap-3">
                  <span className="text-slate-500 font-mono uppercase tracking-wider text-[10px] w-20 shrink-0">{cat}</span>
                  <span className="text-slate-300 font-medium truncate flex-1 text-right">{part ? part.name : 'Not selected'}</span>
                  <span className="text-white font-mono font-semibold shrink-0 text-right w-16">
                    {part ? `₹${part.price.toLocaleString('en-IN')}` : '—'}
                  </span>
                </div>
              ))}
            </div>

            {/* Dynamic Wattage diagnostic readout */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-900 space-y-1 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Calculated Energy Load</span>
                <span className="font-mono text-yellow-400 font-bold">{estimatedPowerUsage} Watts</span>
              </div>
              <div className="w-full bg-slate-850 rounded-full h-1 mt-2 overflow-hidden">
                <div 
                  className={`h-1 rounded-full transition-all duration-500 ${
                    estimatedPowerUsage > 750 ? 'bg-orange-500' : 'bg-yellow-400'
                  }`}
                  style={{ width: `${Math.min((estimatedPowerUsage / 1000) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Sockets Diagnostics Panel */}
            {diagnostics.length > 0 && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs uppercase font-mono">
                  <AlertTriangle className="w-4 h-4 shrink-0" /> Compatibility Alert
                </div>
                <div className="space-y-1.5">
                  {diagnostics.map((warn, i) => (
                    <p key={i} className="text-[10px] text-amber-300 leading-normal font-mono">
                      • {warn}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Price Calculations footer */}
            <div className="pt-4 border-t border-slate-850 space-y-2.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Components Subtotal</span>
                <span className="font-mono font-semibold">₹{totalCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Assembly & Burn-in Fee</span>
                <span className="font-mono text-emerald-400 font-semibold">{totalCost > 150000 ? 'FREE (Premium)' : '₹2,500'}</span>
              </div>
              
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-850">
                <span className="text-sm font-semibold text-white">Estimated Total</span>
                <span className="text-xl font-extrabold text-yellow-400 font-mono">
                  ₹{(totalCost + (totalCost > 150000 ? 0 : 2500)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

          </div>

          {/* Final Submission Card */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            {buildSubmitted ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center space-y-2.5">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-semibold text-white text-sm">Build Proposal Registered</h4>
                <p className="text-xs text-slate-400">
                  We have mapped your chosen parts list and diagnostics code. Our senior system architects will contact you shortly to review.
                </p>
                <button
                  onClick={() => setBuildSubmitted(false)}
                  className="text-xs text-yellow-400 underline hover:text-yellow-300"
                >
                  Configure another system
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitBuild} className="space-y-3">
                <h4 className="text-white font-semibold text-sm">Submit Build Proposal</h4>
                <p className="text-[11px] text-slate-500">Register this exact configuration to our Noida engineering team.</p>
                
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Mobile *"
                  value={builderPhone}
                  onChange={(e) => setBuilderPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-500"
                />

                <button
                  type="submit"
                  id="submit-build-enquiry-btn"
                  disabled={totalCost === 0}
                  className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Rig to Noida Engineers
                </button>
              </form>
            )}
          </div>

        </aside>

      </div>

    </div>
  );
};
