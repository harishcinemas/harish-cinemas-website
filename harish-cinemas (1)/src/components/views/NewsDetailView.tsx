import React from "react";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { news } from "../../data/news";
import AnimatedSection from "../core/AnimatedSection";

interface NewsDetailViewProps {
  slug: string;
}

export default function NewsDetailView({ slug }: NewsDetailViewProps) {
  const item = news.find((n) => n.slug === slug);

  if (!item) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center px-6 pt-24 animate-fade-in text-center relative z-10">
        <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-4">Article Not Found</h2>
        <p className="text-sm text-slate-400 mb-8 font-light">The requested press bulletin does not exist in our logs.</p>
        <a href="#/news" className="px-6 py-3 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:scale-105 transition-all">
          Return to Press Room
        </a>
      </div>
    );
  }

  return (
    <div className="pb-24 animate-fade-in relative z-10">
      {/* Substantial Banner for Press Articles */}
      <div className="relative h-[50vh] flex items-end overflow-hidden rounded-[36px] mx-auto max-w-[95%] border border-white/5 shadow-2xl">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent z-10" />
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="relative z-20 max-w-4xl mx-auto px-6 w-full pb-8">
          <a href="#/news" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#f1f5f9] mb-4 hover:text-indigo-300 transition-colors group">
            <ArrowLeft size={14} className="text-indigo-400 group-hover:-translate-x-1 duration-200" /> <span>Return to Press Room</span>
          </a>
          <h1 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">{item.title}</h1>
        </div>
      </div>

      {/* Meta Logs and Core Article Text Grid */}
      <div className="max-w-4xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 flex lg:flex-col gap-4 text-[10px] font-mono text-slate-400 border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 h-fit">
          <div className="flex items-center space-x-2">
            <Calendar size={12} className="text-indigo-400" />
            <span>{item.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User size={12} className="text-indigo-400" />
            <span>PR Desk Officer</span>
          </div>
          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-xl text-indigo-400 w-fit uppercase text-[9px] font-extrabold shadow-sm">
            {item.category}
          </span>
        </div>

        <div className="lg:col-span-9">
          <AnimatedSection>
            <p className="text-white text-sm md:text-base font-semibold leading-relaxed mb-6 italic border-l-4 border-indigo-500 pl-4 bg-white/5 backdrop-blur-md py-4 rounded-r-3xl shadow-lg">
              {item.summary}
            </p>
            <div className="text-slate-300 text-xs md:text-sm font-light leading-relaxed whitespace-pre-line space-y-4">
              {item.content}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
