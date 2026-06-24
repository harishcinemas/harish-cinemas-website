import React, { useState } from "react";
import { Play, X, Tv, Volume2, Compass, Film, Radio } from "lucide-react";
import { VideoItem } from "@/src/types";

export default function VideoCard({ video }: { video: VideoItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [ambientGlow, setAmbientGlow] = useState(true);

  return (
    <>
      <div 
        className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 group cursor-pointer hover-card-glow shadow-xl shadow-black/20 hover:scale-[1.025] transition-all duration-500 ease-out" 
        onClick={() => setIsOpen(true)}
        id={`video-card-${video.id}`}
      >
        <div className="relative h-52 w-full overflow-hidden">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" 
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/55 flex items-center justify-center group-hover:bg-black/35 transition-colors duration-500">
            <div className="p-4 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white rounded-full shadow-lg shadow-indigo-500/40 transform group-hover:scale-115 group-hover:rotate-6 transition-all duration-300">
              <Play size={20} fill="currentColor" />
            </div>
          </div>
          <span className="absolute bottom-3 right-3 text-[9px] uppercase font-bold tracking-widest bg-[#030305]/95 text-indigo-300 border border-indigo-400/20 px-2.5 py-1.5 rounded-full font-mono shadow-md">
            {video.category}
          </span>
        </div>
        <div className="p-5">
          <span className="text-[9px] font-mono font-extrabold text-indigo-400 tracking-widest uppercase mb-1 block">
            CINEMA BROADCAST ARRAY
          </span>
          <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-100 line-clamp-2 group-hover:text-indigo-400 transition-colors leading-relaxed">{video.title}</h4>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-[#020204]/98 z-50 flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in backdrop-blur-2xl overflow-y-auto">
          {/* Subtle vignette layer on ambient background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)] pointer-events-none opacity-90" />

          {/* Top Branding / Action Bar */}
          <div className="relative z-10 w-full max-w-4xl flex items-center justify-between mb-4 border-b border-white/5 pb-4 font-mono">
            <div className="flex items-center space-x-3">
              <Film className="text-indigo-400 animate-spin-slow" size={16} />
              <div className="text-left">
                <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase block">
                  HARISH CINEMAS THEATER • MOUNT EMBED
                </span>
                <span className="text-xs font-semibold text-white tracking-wide uppercase line-clamp-1 max-w-[280px] sm:max-w-md block">
                  NOW PLAYING: {video.title}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Responsive Ambient Glow Toggle */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setAmbientGlow(!ambientGlow);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-[9px] font-bold tracking-widest uppercase transition-all duration-300 ${
                  ambientGlow 
                    ? "bg-indigo-500/20 border-indigo-400/30 text-indigo-300 shadow-[0_0_10px_rgba(129,140,248,0.25)]" 
                    : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                }`}
                title="Toggle theater ambient back-lighting"
              >
                <Radio size={10} className={ambientGlow ? "animate-pulse" : ""} />
                <span className="hidden sm:inline">Ambient Glow</span>
              </button>

              <button 
                className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/5" 
                onClick={() => setIsOpen(false)}
                title="Exit Cinema Screen"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Video Container Frame */}
          <div className="relative w-full max-w-4xl aspect-video z-10 my-auto">
            {/* Real Ambient Wall Projection Glow behind player container */}
            {ambientGlow && (
              <div className="absolute inset-2 bg-gradient-to-tr from-indigo-600/30 to-purple-600/35 rounded-3xl blur-[80px] pointer-events-none transition-all duration-500 animate-pulse" />
            )}

            <div className="w-full h-full bg-black rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative z-10 animate-scale-up">
              <iframe 
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`} 
                title={video.title} 
                className="w-full h-full border-0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
              />
            </div>
          </div>

          {/* Bottom Technical Status Bar */}
          <div className="relative z-10 w-full max-w-4xl mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-y-2 items-center justify-between text-[9px] text-slate-400 uppercase tracking-widest font-mono">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Tv size={10} className="text-zinc-500" />
                <span>Format: 1080P DIGITAL</span>
              </span>
              <span className="flex items-center space-x-1">
                <Volume2 size={10} className="text-zinc-500" />
                <span>Audio: ATMOS 5.1</span>
              </span>
            </div>
            
            <span className="flex items-center space-x-1 text-indigo-400 font-extrabold">
              <Compass size={10} className="animate-spin-slow" />
              <span>THEATRICAL PRESENTATION OVERLAY</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
