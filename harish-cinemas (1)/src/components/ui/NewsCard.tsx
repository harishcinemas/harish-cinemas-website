import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { NewsItem } from "@/src/types";

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden flex flex-col h-full group hover-card-glow transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.025] hover:border-indigo-500/40 shadow-xl shadow-black/10" id={`news-card-${item.slug}`}>
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center space-x-2 text-[10px] text-slate-300/80 mb-3 font-mono">
          <Calendar size={12} className="text-indigo-400" />
          <span>{item.date}</span>
          <span className="px-2.5 py-0.5 bg-indigo-500/20 border border-indigo-500/20 rounded-full text-indigo-300 uppercase text-[8px] tracking-wider font-bold transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-400/30">{item.category}</span>
        </div>
        <h3 className="text-base font-extrabold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300 line-clamp-2 uppercase tracking-tight">{item.title}</h3>
        <p className="text-xs text-slate-300/80 font-light line-clamp-3 mb-6 leading-relaxed flex-grow transition-colors duration-300 group-hover:text-slate-100">{item.summary}</p>
        <a 
          href={`#/news/${item.slug}`} 
          className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#f1f5f9] hover:text-indigo-300 transition-colors group-hover:translate-x-1.5 duration-300"
        >
          <span>Read Full Brief</span>
          <ArrowRight size={12} className="text-indigo-400" />
        </a>
      </div>
    </div>
  );
}
