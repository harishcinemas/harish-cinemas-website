import React, { useState } from "react";
import { news } from "../../data/news";
import AnimatedSection from "../core/AnimatedSection";
import SectionHeading from "../core/SectionHeading";
import NewsCard from "../ui/NewsCard";
import { Search, Radio, X, FileText } from "lucide-react";

export default function NewsView() {
  const categories = ["All", "Production", "Releases"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = news.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    
    const lowercaseQuery = searchQuery.toLowerCase().trim();
    if (!lowercaseQuery) return matchesCategory;

    const matchesSearch = 
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.summary.toLowerCase().includes(lowercaseQuery) ||
      item.content.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-24 px-6 max-w-7xl mx-auto pt-24 animate-fade-in relative z-10 font-sans">
      <SectionHeading title="Corporate Press Room" subtitle="Read official communications tracking project validations, news and technical awards." />

      {/* Control Panel: Categories + Search Input */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-white/5">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4.5 py-2.5 text-[9px] font-extrabold uppercase tracking-widest rounded-xl border transition-all duration-300 cursor-pointer ${
                activeCategory === cat 
                  ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/20" 
                  : "bg-white/[0.02] text-slate-400 border-white/5 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Real-time Bullet Filter Input */}
        <div className="relative w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={14} className="text-slate-400" />
          </div>
          <input 
            type="text"
            placeholder="Search press briefs, summaries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 hover:bg-white/[0.08] focus:bg-[#09090c] text-white placeholder-slate-400 text-xs py-3 pl-11 pr-10 rounded-2xl border border-white/5 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 outline-none transition-all duration-300"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-white transition-colors animate-fade-in"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Match Count Indicator */}
      {searchQuery && (
        <p className="text-[10px] font-mono tracking-widest text-[#f1f5f9]/70 uppercase mb-8 flex items-center gap-2">
          <Radio size={12} className="text-indigo-400 animate-pulse" />
          <span>Showing {filteredNews.length} of {news.length} releases matching "{searchQuery}"</span>
        </p>
      )}

      {/* News Cards Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredNews.map((item, idx) => (
            <AnimatedSection key={item.slug} delay={idx * 0.05}>
              <NewsCard item={item} />
            </AnimatedSection>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5 p-8 max-w-md mx-auto">
          <span className="inline-block p-4 bg-indigo-500/10 text-indigo-300 rounded-full mb-4">
            <FileText size={24} />
          </span>
          <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">No Press Releases Found</h4>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            We couldn't locate any announcements checking "{searchQuery}" in our corporate archives.
          </p>
        </div>
      )}
    </div>
  );
}
