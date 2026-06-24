import React, { useState } from "react";
import { videos } from "../../data/videos";
import AnimatedSection from "../core/AnimatedSection";
import SectionHeading from "../core/SectionHeading";
import VideoCard from "../ui/VideoCard";

export default function VideosView() {
  const tracks = ["All", "Trailers", "Teasers", "Songs", "Sneak Peeks", "Shorts", "Public Reviews", "BTS"];
  const [track, setTrack] = useState("All");

  const filtered = track === "All" ? videos : videos.filter(v => v.category === track);

  return (
    <div className="bg-black min-h-screen pb-24 px-6 max-w-7xl mx-auto pt-24 animate-fade-in">
      <SectionHeading title="Broadcasting Array" subtitle="Access high fidelity theatrical releases, promotional teasers, and interview modules directly." />

      <div className="flex flex-wrap gap-2 mb-12 border-b border-neutral-900 pb-6">
        {tracks.map((t) => (
          <button
            key={t}
            onClick={() => setTrack(t)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded border transition-all cursor-pointer ${track === t ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "bg-transparent text-neutral-400 border-neutral-800 hover:text-white"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((video, idx) => (
          <AnimatedSection key={video.id} delay={idx * 0.05}>
            <VideoCard video={video} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
