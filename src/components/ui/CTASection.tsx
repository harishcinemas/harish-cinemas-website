import React from "react";
import AnimatedSection from "../core/AnimatedSection";

export default function CTASection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[36px] p-8 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-[40px] pointer-events-none" />
            
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 uppercase">Let's Create Historic Cinema</h2>
            <p className="text-slate-300 text-sm md:text-base font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              We are consistently processing distribution assets, modern visual scripts, and co-production frameworks. Reach our operational management teams directly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="#/contact" 
                className="px-8 py-4 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-xl shadow-indigo-500/20 text-[10px] font-extrabold uppercase tracking-widest rounded-2xl hover:scale-[1.03] transition-all w-full sm:w-auto text-center"
              >
                Connect via Operations Desk
              </a>
              <a 
                href="#/productions" 
                className="px-8 py-4 bg-white/5 text-white border border-white/10 text-[10px] font-extrabold uppercase tracking-widest rounded-2xl hover:bg-white hover:text-[#050508] transition-all w-full sm:w-auto text-center"
              >
                Analyze Current Slate
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
