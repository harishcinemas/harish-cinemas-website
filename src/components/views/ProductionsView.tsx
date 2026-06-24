import React, { useState } from "react";
import { movies } from "../../data/movies";
import AnimatedSection from "../core/AnimatedSection";
import SectionHeading from "../core/SectionHeading";
import MovieCard from "../ui/MovieCard";
import { Search, Film, X } from "lucide-react";

export default function ProductionsView() {
  const categories = ["All", "Released", "Post Production", "Production", "Pre Production", "Development"];
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = movies.filter((movie) => {
    const matchesCategory = filter === "All" || movie.status === filter;
    
    const lowercaseQuery = searchQuery.toLowerCase().trim();
    if (!lowercaseQuery) return matchesCategory;

    const matchesSearch = 
      movie.title.toLowerCase().includes(lowercaseQuery) ||
      movie.tagline.toLowerCase().includes(lowercaseQuery) ||
      movie.synopsis.toLowerCase().includes(lowercaseQuery) ||
      movie.genre.some(g => g.toLowerCase().includes(lowercaseQuery)) ||
      movie.cast.some(c => c.toLowerCase().includes(lowercaseQuery)) ||
      movie.crew.some(cr => cr.name.toLowerCase().includes(lowercaseQuery));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-24 px-6 max-w-7xl mx-auto pt-24 animate-fade-in relative z-10 font-sans">
      <SectionHeading title="Complete Studio Catalog" subtitle="Explore the portfolio array of Harish Cinemas independent features." />

      {/* Control Pane with Tab filters and Real-time Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-white/5">
        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2.5 text-[9px] font-extrabold uppercase tracking-widest rounded-xl border transition-all duration-200 cursor-pointer ${
                filter === cat 
                  ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/20" 
                  : "bg-white/[0.02] text-slate-400 border-white/5 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Real-time Search Box Block */}
        <div className="relative w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={14} className="text-slate-400" />
          </div>
          <input 
            type="text"
            placeholder="Search titles, cast, crew..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 hover:bg-white/[0.08] focus:bg-[#09090c] text-white placeholder-slate-400 text-xs py-3 pl-11 pr-10 rounded-2xl border border-white/5 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 outline-none transition-all duration-300"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Live Result Feedback Counter */}
      {searchQuery && (
        <p className="text-[10px] font-mono tracking-widest text-[#f1f5f9]/70 uppercase mb-8 flex items-center gap-2">
          <Film size={12} className="text-indigo-400 animate-pulse" />
          <span>Showing {filteredMovies.length} of {movies.length} matches for "{searchQuery}"</span>
        </p>
      )}

      {/* Movie Grid Layout */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMovies.map((movie, idx) => (
            <AnimatedSection key={movie.slug} delay={idx * 0.05}>
              <MovieCard movie={movie} />
            </AnimatedSection>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5 p-8 max-w-lg mx-auto">
          <span className="inline-block p-4 bg-indigo-500/10 text-indigo-300 rounded-full mb-4">
            <Search size={24} />
          </span>
          <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">No Production Matches Found</h4>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            We couldn't locate any film portfolios checking "{searchQuery}" in our registry entries.
          </p>
        </div>
      )}
    </div>
  );
}
