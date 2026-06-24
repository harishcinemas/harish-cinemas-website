import React, { useState } from "react";
import { 
  Users, 
  Film, 
  Camera, 
  Music, 
  Scissors, 
  Layers, 
  Sparkles, 
  User, 
  Clapperboard, 
  Volume2, 
  Tv, 
  Award 
} from "lucide-react";
import AnimatedSection from "../core/AnimatedSection";
import SectionHeading from "../core/SectionHeading";

export default function CrewCreditsView() {
  const [activeTab, setActiveTab] = useState<"nalla-padam" | "naruvee">("nalla-padam");
  const [selectedDept, setSelectedDept] = useState<string>("all");

  const npcDepartments = [
    {
      id: "all",
      name: "All Departments"
    },
    {
      id: "cast",
      name: "Lead Billing Cast",
      icon: Users
    },
    {
      id: "direction",
      name: "Direction & Writing",
      icon: Clapperboard
    },
    {
      id: "camera-art",
      name: "Camera & Artistry",
      icon: Camera
    },
    {
      id: "audio-music",
      name: "Music & Audio",
      icon: Music
    },
    {
      id: "post-prod",
      name: "Post-Production",
      icon: Scissors
    },
    {
      id: "action-dance",
      name: "Stunts & Dance",
      icon: Layers
    }
  ];

  return (
    <div className="space-y-16 pb-24 animate-fade-in pt-12 relative z-10 text-left">
      {/* Immersive Subpage Banner */}
      <section className="relative h-[38vh] flex items-center justify-center overflow-hidden rounded-[36px] mx-auto max-w-[95%] border border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#050508]/85 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1920&q=80" 
          alt="Atmospheric movie theater audience" 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover scale-105" 
        />
        <div className="relative z-20 text-center px-6">
          <AnimatedSection variant="fadeUp">
            <span className="text-[10px] font-mono tracking-[0.4em] text-indigo-400 font-extrabold uppercase bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 mb-3 inline-block">
              Harish Cinemas Registry
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-wider uppercase text-white mb-2">
              Crew & Credits
            </h1>
            <p className="text-xs font-mono text-slate-350 uppercase tracking-[0.25em] max-w-2xl mx-auto">
              Dynamic Billing Directory & Interactive Production Registers
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Film Selection Selector */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-xl font-display font-black text-white uppercase tracking-wider">
              Project Ledger Select
            </h2>
            <p className="text-xs text-slate-400 font-light mt-1">
              Select an active production title to explore official crew and actor registries registered under Chennai office rules.
            </p>
          </div>
          <div className="flex bg-white/[0.02] border border-white/10 p-1.5 rounded-2xl select-none gap-2">
            <button
              onClick={() => { setActiveTab("nalla-padam"); setSelectedDept("all"); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs uppercase tracking-wider font-extrabold transition-all duration-300 cursor-pointer ${
                activeTab === "nalla-padam" 
                  ? "bg-indigo-600/90 text-white shadow-lg shadow-indigo-600/20" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles size={13} />
              <span>Nalla Padam (2026)</span>
            </button>
            <button
              onClick={() => { setActiveTab("naruvee"); setSelectedDept("all"); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs uppercase tracking-wider font-extrabold transition-all duration-300 cursor-pointer ${
                activeTab === "naruvee" 
                  ? "bg-indigo-600/90 text-white shadow-lg shadow-indigo-600/20" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Film size={13} />
              <span>Naruvee (2025)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Dynamic Ledger */}
      <section className="max-w-7xl mx-auto px-6">
        {activeTab === "nalla-padam" ? (
          <div className="space-y-12">
            {/* Department switcher for Nalla Padam */}
            <div className="flex flex-wrap gap-2.5">
              {npcDepartments.map((dept) => {
                const Icon = dept.icon;
                const isActive = selectedDept === dept.id;
                return (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDept(dept.id)}
                    className={`flex items-center space-x-2 px-4.5 py-3 rounded-xl border text-[10px] font-extrabold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-500/25 scale-[1.02]"
                        : "bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {Icon && <Icon size={12} />}
                    <span>{dept.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Grid Layout */}
            <div className="space-y-12 animate-fade-in">
              {/* Cast Members Group */}
              {(selectedDept === "all" || selectedDept === "cast") && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 border-b border-white/5 pb-3">
                    <Users className="text-indigo-400" size={18} />
                    <h3 className="text-sm font-mono tracking-widest uppercase font-extrabold text-indigo-400">
                      I. Lead Billing Cast Ensembles (நடிகர்கள்)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.04] transition-all relative overflow-hidden group">
                      <span className="absolute top-4 right-4 text-[9px] font-mono text-zinc-500">CARD 01</span>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-[#f1f5f9] uppercase mb-1">Dr. A. Harish</h4>
                      <p className="text-base font-bold text-white mb-2">Dr.A.ஹரிஷ்</p>
                      <span className="text-[9px] font-mono bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Lead Role</span>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.04] transition-all relative overflow-hidden group">
                      <span className="absolute top-4 right-4 text-[9px] font-mono text-zinc-500">CARD 02</span>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-[#f1f5f9] uppercase mb-1">Dhanalakshmi</h4>
                      <p className="text-base font-bold text-white mb-2">தனலட்சுமி</p>
                      <span className="text-[9px] font-mono bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Lead Role</span>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.04] transition-all relative overflow-hidden group">
                      <span className="absolute top-4 right-4 text-[9px] font-mono text-zinc-500">CARD 03</span>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-[#f1f5f9] uppercase mb-1">Mottai Rajendran</h4>
                      <p className="text-base font-bold text-white mb-2">மொட்டை ராஜேந்திரன்</p>
                      <span className="text-[9px] font-mono bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Star Artist</span>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.04] transition-all relative overflow-hidden group">
                      <span className="absolute top-4 right-4 text-[9px] font-mono text-zinc-500">CARD 04</span>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-[#f1f5f9] uppercase mb-1">Kalki Raja</h4>
                      <p className="text-base font-bold text-white mb-2">கல்கி ராஜா</p>
                      <span className="text-[9px] font-mono bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Co-Lead</span>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.04] transition-all relative overflow-hidden group">
                      <span className="absolute top-4 right-4 text-[9px] font-mono text-zinc-500">CARD 05</span>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-[#f1f5f9] uppercase mb-1">Rama</h4>
                      <p className="text-base font-bold text-white mb-2">ரமா</p>
                      <span className="text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Character Artist</span>
                    </div>

                    {/* Card 6 */}
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.04] transition-all relative overflow-hidden group">
                      <span className="absolute top-4 right-4 text-[9px] font-mono text-zinc-500">CARD 06</span>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-[#f1f5f9] uppercase mb-1">Priyadarshini</h4>
                      <p className="text-base font-bold text-white mb-2">பிரியதர்ஷினி</p>
                      <span className="text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Character Artist</span>
                    </div>

                    {/* Card 7 - Introduction */}
                    <div className="bg-gradient-to-br from-indigo-950/10 to-indigo-900/10 border border-indigo-500/20 p-6 rounded-2xl hover:bg-white/[0.04] transition-all relative overflow-hidden group">
                      <span className="absolute top-4 right-4 text-[9px] font-mono text-indigo-400 font-extrabold">CARD 07 • அறிமுகம்</span>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-indigo-300 uppercase mb-1">Paramakudi</h4>
                      <p className="text-base font-bold text-white mb-2">பரமகுடி</p>
                      <span className="text-[9px] font-mono bg-indigo-500/25 border border-indigo-505/30 text-indigo-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-black">Debut Introduction</span>
                    </div>

                    {/* Card 8 - Introduction */}
                    <div className="bg-gradient-to-br from-indigo-950/10 to-indigo-900/10 border border-indigo-500/20 p-6 rounded-2xl hover:bg-white/[0.03] transition-all relative overflow-hidden group">
                      <span className="absolute top-4 right-4 text-[9px] font-mono text-indigo-400 font-extrabold">CARD 08 • அறிமுகம்</span>
                      <h4 className="text-xs font-mono font-bold tracking-widest text-indigo-300 uppercase mb-2">New Ensembles</h4>
                      <div className="space-y-1 h-20 text-[11px] font-mono text-slate-300">
                        <p>• Krithika</p>
                        <p>• Manibala</p>
                        <p>• Vincent</p>
                        <p>• Velladurai</p>
                      </div>
                      <span className="text-[8px] font-mono bg-indigo-500/20 text-indigo-200 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Debut Artists</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Direction & Writing Group Choice */}
              {(selectedDept === "all" || selectedDept === "direction") && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 border-b border-white/5 pb-3">
                    <Clapperboard className="text-indigo-400" size={18} />
                    <h3 className="text-sm font-mono tracking-widest uppercase font-extrabold text-indigo-400">
                      II. Direction, Writership & Executive Producers (இயக்கம்)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white/[0.02] border border-[#d4af37]/15 p-6 rounded-2xl shadow-[inset_0_0_15px_rgba(212,175,55,0.03)]">
                      <span className="text-[9px] font-mono tracking-widest text-[#d4af37] font-bold block mb-1">PRODUCER • தயாரிப்பாளர்</span>
                      <h4 className="text-lg font-black text-white">A. ALAGU PANDIAN</h4>
                      <h5 className="text-xs text-amber-300 font-mono font-semibold mt-1">A. அழகு பாண்டியன்</h5>
                    </div>

                    <div className="bg-white/[0.02] border border-indigo-500/15 p-6 rounded-2xl shadow-[inset_0_0_15px_rgba(129,140,248,0.03)]">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">WRITTEN & DIRECTION • கதை, திரைக்கதை, இயக்கம்</span>
                      <h4 className="text-lg font-black text-white">Praburam .C</h4>
                      <h5 className="text-xs text-indigo-300 font-mono font-semibold mt-1">பிரபுராம் .C</h5>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">ASSOCIATE DIRECTOR</span>
                      <h4 className="text-base font-bold text-white">Santhosi Meena</h4>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl lg:col-span-2">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-2">CO-DIRECTORS TEAM</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs font-bold text-white">Sandeep Elumalai</p>
                          <span className="text-[8px] text-zinc-500 font-mono uppercase block">Co-Director</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Vishal</p>
                          <span className="text-[8px] text-zinc-500 font-mono uppercase block">Co-Director</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Thenral Kumar</p>
                          <span className="text-[8px] text-zinc-500 font-mono uppercase block">Co-Director</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Gorky Marai Mani</p>
                          <span className="text-[8px] text-zinc-500 font-mono uppercase block">Co-Director</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">ASSISTANT DIRECTOR</span>
                      <h4 className="text-base font-bold text-white">Velladurai</h4>
                    </div>
                  </div>
                </div>
              )}

              {/* Camera & Art Category */}
              {(selectedDept === "all" || selectedDept === "camera-art") && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 border-b border-white/5 pb-3">
                    <Camera className="text-indigo-400" size={18} />
                    <h3 className="text-sm font-mono tracking-widest uppercase font-extrabold text-indigo-400">
                      III. Camera, Artistry & Visual Craft (ஒளிப்பதிவு & கலை)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">CINEMATOGRAPHY • ஒளிப்பதிவு</span>
                      <h4 className="text-lg font-bold text-white">Iniyan J. Harris</h4>
                      <h5 className="text-xs text-indigo-300 font-mono mt-0.5">இனியன் ஜே ஹாரிஸ்</h5>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">ART DIRECTOR • கலை இயக்குனர்</span>
                      <h4 className="text-lg font-bold text-white">K.Sakthivel</h4>
                      <h5 className="text-xs text-indigo-300 font-mono mt-0.5">K. சக்திவேல்</h5>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">PRODUCTION DESIGNER • தயாரிப்பு வடிவமைப்பு</span>
                      <h4 className="text-lg font-bold text-white">Ananda Kumar</h4>
                      <h5 className="text-xs text-indigo-300 font-mono mt-0.5">ஆனந்தகுமார்</h5>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">STILLS PHOTOGRAPHER • புகைப்படம்</span>
                      <h4 className="text-base font-bold text-white">Sakthi Priyan</h4>
                      <h5 className="text-xs text-indigo-300 font-mono mt-0.5">சக்தி பிரியன்</h5>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">COSTUME DIRECTORS</span>
                      <h4 className="text-base font-bold text-white">Aakriti, Santhosi Meena</h4>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">MAKEUP MASTER</span>
                      <h4 className="text-base font-bold text-white">Durai</h4>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl lg:col-span-3">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-3.5">ASSISTANT CAMERAMEN NETWORK</span>
                      <div className="flex flex-wrap gap-2">
                        {["Ravi", "Umapathi", "Velumani", "Suresh", "Anbu"].map((name, idx) => (
                          <span key={idx} className="bg-white/5 border border-white/5 font-mono text-xs text-zinc-350 py-1.5 px-3.5 rounded-xl font-bold">
                            • {name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl lg:col-span-3">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-3.5">SET ASSISTANCE ASSISTANTS</span>
                      <div className="flex flex-wrap gap-2">
                        {["D.Rakesh", "Vimal", "Mani", "Pushpa Raj"].map((name, idx) => (
                          <span key={idx} className="bg-white/5 border border-white/5 font-mono text-xs text-zinc-350 py-1.5 px-3.5 rounded-xl font-bold">
                            • {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Music & Audio Category */}
              {(selectedDept === "all" || selectedDept === "audio-music") && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 border-b border-white/5 pb-3">
                    <Music className="text-indigo-400" size={18} />
                    <h3 className="text-sm font-mono tracking-widest uppercase font-extrabold text-indigo-400">
                      IV. Music Score, Lyrics & Audiography (இசை & ஒலிப்பதிவு)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white/[0.02] border border-indigo-500/10 p-6 rounded-2xl shadow-[inset_0_0_20px_rgba(129,140,248,0.05)] lg:col-span-2">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">MUSIC DIRECTOR & BGS SCORE COMPOSER</span>
                      <h4 className="text-xl font-black text-white">Sagishna Xavier</h4>
                      <h5 className="text-xs text-indigo-300 font-bold font-mono mt-1">சகிஷ்ணா சேவியர்</h5>
                      <p className="text-[10px] text-zinc-500 font-mono mt-1.5 leading-relaxed">
                        Background score composed, produced, and arranged extensively by Sagishna Xavier.
                      </p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">LYRICS • பாடலாசிரியர்</span>
                      <h4 className="text-base font-bold text-white">Pottuvil Asmin</h4>
                      <h5 className="text-xs text-indigo-300 font-semibold font-mono mt-1">பொத்துவில் அஸ்மின்</h5>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl lg:col-span-3">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-3">SINGING VOCALS</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {["Velmurugan", "Gayathry Rajiv", "Arul Pragasam", "Punya Selva", "Sashank S", "MC Chetan"].map((name, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/5 p-3.5 rounded-xl text-center">
                            <p className="text-xs font-bold text-white">{name}</p>
                            <span className="text-[8px] font-mono text-zinc-500 uppercase mt-1 block">Singer Panel</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl lg:col-span-3">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1.5">DIRECTOR OF AUDIOGRAPHY</span>
                      <h4 className="text-base font-bold text-white">Dr.S. Suresh Subramanyaa B.Sc., D.F Tech</h4>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">SOUND EFX DIVISION</span>
                      <h4 className="text-base font-bold text-white">Randy</h4>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">SOUND ASSISTANT WRITER</span>
                      <h4 className="text-base font-bold text-white">Anand</h4>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">SONGS MIXING & mastered stems</span>
                      <h4 className="text-base font-bold text-white">Kibi</h4>
                    </div>
                  </div>
                </div>
              )}

              {/* Post Production Category */}
              {(selectedDept === "all" || selectedDept === "post-prod") && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 border-b border-white/5 pb-3">
                    <Scissors className="text-indigo-400" size={18} />
                    <h3 className="text-sm font-mono tracking-widest uppercase font-extrabold text-indigo-400">
                      V. Post-Production Lab, VFX & Grading (தொழில்நுட்பம்)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white/[0.02] border border-[#d4af37]/15 p-6 rounded-2xl shadow-[inset_0_0_20px_rgba(212,175,55,0.05)] lg:col-span-3">
                      <span className="text-[9px] font-mono tracking-widest text-[#d4af37] font-bold block mb-1">POST PRODUCTION MOUNT LAB</span>
                      <h4 className="text-lg font-black text-white">Royal Studios, Chennai</h4>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">DI GRADING ARTIST</span>
                      <h4 className="text-base font-bold text-white">Raj.M</h4>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">DI CONFORMIST</span>
                      <h4 className="text-base font-bold text-white">Mathesh</h4>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">VFX ARTIST DIRECTORS</span>
                      <h4 className="text-base font-bold text-white">Karthik Seyyon</h4>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl lg:col-span-3">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">STUDIO OFFICE ASST</span>
                      <h4 className="text-sm font-bold text-white">Thirumpoondi Jayaseelan</h4>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl lg:col-span-3">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">CREATIVE POSTER GRAPHICS DESIGNS</span>
                      <h4 className="text-sm font-bold text-white">Raju</h4>
                    </div>
                  </div>
                </div>
              )}

              {/* Stunts & Dance Category */}
              {(selectedDept === "all" || selectedDept === "action-dance") && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 border-b border-white/5 pb-3">
                    <Layers className="text-indigo-400" size={18} />
                    <h3 className="text-sm font-mono tracking-widest uppercase font-extrabold text-indigo-400">
                      VI. Action Stunts & Dance Choreography (சண்டை & நடனம்)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/[0.02] border border-indigo-500/10 p-6 rounded-2xl shadow-[inset_0_0_15px_rgba(129,140,248,0.03)]">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-1">ACTION CHOREOGRAPHER • சண்டை பயிற்சி</span>
                      <h4 className="text-base font-bold text-white">Power Pandi</h4>
                      <h5 className="text-xs text-indigo-300 font-semibold font-mono mt-1">பவர் பாண்டி</h5>
                    </div>

                    <div className="bg-white/[0.02] border border-[#d4af37]/10 p-6 rounded-2xl shadow-[inset_0_0_15px_rgba(212,175,55,0.03)]">
                      <span className="text-[9px] font-mono tracking-widest text-[#d4af37] font-bold block mb-1">DANCE CHOREOGRAPHER • நடனம்</span>
                      <h4 className="text-base font-bold text-white">Sasi Kumar</h4>
                      <h5 className="text-xs text-amber-300 font-semibold font-mono mt-1">சசிகுமார்</h5>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl md:col-span-2">
                      <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-bold block mb-3">DANCE ASSISTANTS CREW</span>
                      <div className="flex flex-wrap gap-2">
                        {["Prince", "Balaji", "Victor", "Priya"].map((name, idx) => (
                          <span key={idx} className="bg-white/5 border border-white/5 font-mono text-xs text-zinc-320 py-1.5 px-3.5 rounded-xl font-bold">
                            • {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* NARUVEE CREW LEDGER (CELEBRATED PROJECT) */
          <div className="space-y-12 animate-fade-in">
            {/* Main Billing Block style */}
            <div className="border border-white/10 p-8 rounded-3xl bg-white/[0.01] space-y-8">
              <div className="text-center space-y-1">
                <span className="text-[9px] font-mono tracking-[0.45em] text-[#d4af37] font-bold uppercase">
                  Harish Cinemas Presidium
                </span>
                <h3 className="text-2xl font-display font-medium text-white uppercase tracking-wider">
                  Naruvee Billing Registry
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl text-left">
                  <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Director & Screenplay</span>
                  <h4 className="text-sm font-bold text-white">Subarak Mubarak</h4>
                </div>

                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl text-left">
                  <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Producer</span>
                  <h4 className="text-sm font-bold text-white">A. Alagu Pandian</h4>
                </div>

                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl text-left">
                  <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Director of Music</span>
                  <h4 className="text-sm font-bold text-white">Ashwath</h4>
                </div>

                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl text-left">
                  <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Cinematographer</span>
                  <h4 className="text-sm font-bold text-white">Anand Rajendran</h4>
                </div>

                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl text-left">
                  <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Film Editor</span>
                  <h4 className="text-sm font-bold text-white">Subarak Mubarak</h4>
                </div>

                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl text-left">
                  <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Stunts Choreographer</span>
                  <h4 className="text-sm font-bold text-white">Jesudas Manoharan</h4>
                </div>
              </div>

              {/* Cast Billings for Naruvee */}
              <div className="border-t border-white/5 pt-8 space-y-4">
                <h4 className="text-[10px] uppercase font-mono tracking-[0.2em] text-indigo-400 font-extrabold text-left">
                  PROMINENT THEATRICAL CAST CARDS
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {["DR. A. Harish Pandian", "Vinchu Rachel Sam", "Chatherin Varuna", "Padine Kumar", "VJ Pappu"].map((actor, idx) => (
                    <div key={idx} className="flex items-center space-x-2 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/20 px-4 py-2.5 rounded-xl transition-all font-mono text-xs text-white">
                      <User size={12} className="text-indigo-400" />
                      <span className="font-bold">{actor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Cinematic Studio Certification Notice */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="rounded-[28px] bg-[#0c0c14] border border-indigo-500/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
          <div className="space-y-1">
            <h4 className="text-sm font-display font-black text-white uppercase tracking-wider">
              OFFICIAL GOVERNMENT & CHAMBER SEAL CERTIFICATIONS
            </h4>
            <p className="text-xs text-slate-400 max-w-xl font-light">
              All listed production credits have been submitted, validated, and notarized under South Indian Film Chamber rules for Chennai operations.
            </p>
          </div>
          <Award className="text-indigo-400/80 animate-pulse flex-shrink-0" size={32} />
        </div>
      </section>
    </div>
  );
}
