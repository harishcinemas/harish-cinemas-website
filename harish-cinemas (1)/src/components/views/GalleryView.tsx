import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "../../data/gallery";
import AnimatedSection from "../core/AnimatedSection";
import SectionHeading from "../core/SectionHeading";
import GalleryCard from "../ui/GalleryCard";

export default function GalleryView() {
  const tabs = ["All", "Movie Stills", "Events", "Behind The Scenes", "Launch Functions"];
  const [activeTab, setActiveTab] = useState("All");
  const [index, setIndex] = useState<number | null>(null);

  const viewItems = activeTab === "All" ? gallery : gallery.filter(item => item.category === activeTab);

  const prev = () => setIndex(prev => (prev !== null && prev > 0 ? prev - 1 : viewItems.length - 1));
  const next = () => setIndex(prev => (prev !== null && prev < viewItems.length - 1 ? prev + 1 : 0));

  return (
    <div className="min-h-screen pb-24 px-6 max-w-7xl mx-auto pt-24 animate-fade-in relative z-10">
      <SectionHeading title="Production Still Archives" subtitle="High resolution verification logs showcasing on-set assets and ceremonial distributions." />

      <div className="flex flex-wrap gap-2.5 mb-12 border-b border-white/5 pb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setIndex(null);
            }}
            className={`px-4 py-2.5 text-[9px] font-extrabold uppercase tracking-widest rounded-xl border transition-all cursor-pointer ${
              activeTab === tab 
                ? "bg-white/15 text-white border-white/20 shadow-lg" 
                : "bg-white/[0.02] text-slate-400 border-white/5 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {viewItems.map((item, idx) => (
          <AnimatedSection key={item.id} delay={idx * 0.03}>
            <GalleryCard item={item} onOpen={() => setIndex(idx)} />
          </AnimatedSection>
        ))}
      </div>

      {index !== null && index < viewItems.length && (
        <div className="fixed inset-0 bg-[#050508]/95 backdrop-blur-xl z-50 flex items-center justify-between p-4 md:p-10 animate-fade-in">
          <button className="absolute top-6 right-6 text-white hover:text-indigo-400 transition-colors z-50 cursor-pointer" onClick={() => setIndex(null)}>
            <X size={32} />
          </button>
          
          <button 
            className="text-white hover:text-indigo-400 p-2 transition-colors cursor-pointer" 
            onClick={prev}
          >
            <ChevronLeft size={40} />
          </button>

          <div className="relative max-w-5xl w-full h-[70vh] flex flex-col justify-center items-center">
            <div className="relative w-full h-full flex justify-center items-center">
              <img 
                src={viewItems[index].imageUrl} 
                alt={viewItems[index].title} 
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl border border-white/10" 
              />
            </div>
            <div className="mt-4 text-center">
              <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400 block mb-1 font-extrabold">{viewItems[index].category}</span>
              <p className="text-white text-xs font-semibold">{viewItems[index].title}</p>
            </div>
          </div>

          <button 
            className="text-white hover:text-indigo-400 p-2 transition-colors cursor-pointer" 
            onClick={next}
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </div>
  );
}
