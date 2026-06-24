import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center mx-auto" : "text-left"}`}>
      <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4 uppercase">
        {title}
        <span className={`block mt-3 h-[3px] w-14 bg-gradient-to-r from-indigo-500 to-purple-400 rounded ${centered ? 'mx-auto' : ''}`}></span>
      </h2>
      {subtitle && <p className="text-slate-300 text-sm md:text-base max-w-2xl font-light mt-4 leading-relaxed">{subtitle}</p>}
    </div>
  );
}
