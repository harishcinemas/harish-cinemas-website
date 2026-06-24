import React from "react";
import AnimatedSection from "../core/AnimatedSection";

export default function Timeline() {
  const checkpoints = [
    { year: "2024", title: "Corporate Genesis", desc: "Harish Cinemas established in Chennai under Producer A. Alagu Pandian, setting our creative blueprint for high-impact Tamil cinema." },
    { year: "2025", title: "Naruvee Theatrical Release", desc: "Premiered our landmark maiden suspense horror-thriller 'Naruvee', earning widespread critical praise and establishing our production presence." },
    { year: "2026", title: "Nalla Padam Slates", desc: "Stepped into active production and principal photography for our highly anticipated second movie, 'Nalla Padam'." }
  ];

  return (
    <div className="relative border-l border-white/10 pl-6 md:pl-10 space-y-12 max-w-3xl mx-auto">
      {checkpoints.map((pt, idx) => (
        <div key={idx} className="relative">
          <div className="absolute -left-[31px] md:-left-[45px] top-1.5 w-4 h-4 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-400 border-4 border-[#050508] shadow-lg shadow-indigo-500/50" />
          <AnimatedSection delay={idx * 0.1}>
            <span className="text-xs font-mono font-extrabold text-indigo-400 uppercase tracking-widest mb-1 block">{pt.year}</span>
            <h4 className="text-lg font-extrabold text-white mb-2 uppercase tracking-tight">{pt.title}</h4>
            <p className="text-xs text-slate-300/80 font-light leading-relaxed">{pt.desc}</p>
          </AnimatedSection>
        </div>
      ))}
    </div>
  );
}
