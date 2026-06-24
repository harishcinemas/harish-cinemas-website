// src/components/ui/MovieCard.tsx
import React from "react";
import { Movie } from "@/src/types";

export default function MovieCard({ movie }: { movie: Movie }) {
  const badgeColors: Record<string, string> = {
    "Released": "bg-emerald-500/25 text-emerald-300 border-emerald-400/20",
    "Post Production": "bg-amber-500/25 text-amber-300 border-amber-400/20",
    "Production": "bg-indigo-500/25 text-indigo-300 border-indigo-400/20",
    "Pre Production": "bg-purple-500/25 text-purple-300 border-purple-400/20",
    "Development": "bg-slate-500/25 text-slate-300 border-slate-400/20"
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 group flex flex-col h-full hover-card-glow shadow-2xl shadow-black/30 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.025] hover:border-indigo-500/40" id={`movie-card-${movie.slug}`}>
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/30 to-black/40 transition-opacity duration-300 group-hover:opacity-85" />
        <span className={`absolute top-4 right-4 text-[9.5px] font-bold uppercase tracking-widest px-3 w-fit py-1.5 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-400/30 ${badgeColors[movie.status] || "bg-white/10 text-white border-white/10"}`}>
          {movie.status}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow relative">
        <div className="text-[10px] text-indigo-400 font-extrabold tracking-widest uppercase mb-1.5 font-mono">
          {movie.genre.join(" / ")} • {movie.releaseYear}
        </div>
        <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300 line-clamp-1 uppercase tracking-wider">
          {movie.title}
        </h3>
        <p className="text-xs text-slate-300/80 font-light line-clamp-3 mb-6 flex-grow leading-relaxed transition-colors duration-300 group-hover:text-slate-100">
          {movie.synopsis}
        </p>
        <a 
          href={`#/productions/${movie.slug}`} 
          className="w-full text-center text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white py-3.5 rounded-2xl transition-all duration-300 shadow-md group-hover:shadow-indigo-500/20 hover-primary-glow shimmer-sweep"
        >
          Explore Production Details
        </a>
      </div>
    </div>
  );
}
