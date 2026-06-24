import React from "react";
import { GalleryItem } from "@/src/types";

export default function GalleryCard({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  return (
    <div 
      className="relative overflow-hidden rounded-3xl group cursor-pointer aspect-[4/3] bg-white/5 border border-white/10 hover:border-white/20 hover:scale-[1.01] transition-all duration-300 shadow-lg" 
      onClick={onOpen}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
      <div className="absolute bottom-0 left-0 w-full p-5 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-400 mb-1 block font-mono">{item.category}</span>
        <h4 className="text-white text-xs uppercase font-extrabold tracking-tight line-clamp-1">{item.title}</h4>
      </div>
    </div>
  );
}
