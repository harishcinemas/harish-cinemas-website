import React from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white/[0.02] backdrop-blur-xl border-t border-white/10 text-[#f1f5f9] pt-16 pb-8 px-6 mt-20 relative z-10 shadow-2xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <img 
              src="/logo.svg" 
              alt="Harish Cinemas Logo" 
              className="w-8 h-8 object-contain filter drop-shadow-[0_1px_4px_rgba(212,175,55,0.15)]"
              referrerPolicy="no-referrer"
            />
            <h3 className="text-lg font-display font-black tracking-[0.25em] text-white">
              HARISH <span className="text-indigo-400 font-semibold">CINEMAS</span>
            </h3>
          </div>
          <p className="text-slate-400 max-w-sm italic font-light text-[11px]">"Stories That Inspire. Cinema That Matters."</p>
          <div className="grid grid-cols-2 gap-3 pt-6 max-w-md" id="footer-social-network-grid">
            {/* Instagram Node */}
            <a 
              href="https://www.instagram.com/harish_cinemas/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-3 p-3 bg-white/[0.03] backdrop-blur-sm border border-white/5 hover:border-pink-500/40 hover:bg-pink-500/5 hover:shadow-[0_0_15px_rgba(236,72,153,0.15)] rounded-2xl transition-all duration-500 group/insta hover:-translate-y-1" 
              aria-label="Instagram page"
            >
              <div className="p-2.5 bg-white/5 group-hover/insta:bg-pink-500/20 rounded-xl text-slate-400 group-hover/insta:text-pink-400 transition-all duration-300">
                <Instagram size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-[8px] font-mono font-bold tracking-widest text-slate-500 uppercase group-hover/insta:text-pink-400/80 transition-colors">Instagram</span>
                <span className="block text-[10px] font-semibold text-white/95 truncate">@harish_cinemas</span>
              </div>
            </a>

            {/* YouTube Node */}
            <a 
              href="https://www.youtube.com/@HARISHCINEMAS" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-3 p-3 bg-white/[0.03] backdrop-blur-sm border border-white/5 hover:border-red-500/40 hover:bg-red-500/5 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] rounded-2xl transition-all duration-500 group/yt hover:-translate-y-1" 
              aria-label="Youtube Channel"
            >
              <div className="p-2.5 bg-white/5 group-hover/yt:bg-red-500/20 rounded-xl text-slate-400 group-hover/yt:text-red-400 transition-all duration-300">
                <Youtube size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-[8px] font-mono font-bold tracking-widest text-slate-500 uppercase group-hover/yt:text-red-400/80 transition-colors">YouTube</span>
                <span className="block text-[10px] font-semibold text-white/95 truncate">HARISH CINEMAS</span>
              </div>
            </a>

            {/* Facebook Node */}
            <a 
              href="https://www.facebook.com/profile.php?id=61590852898474" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-3 p-3 bg-white/[0.03] backdrop-blur-sm border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/5 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] rounded-2xl transition-all duration-500 group/fb hover:-translate-y-1" 
              aria-label="Facebook page"
            >
              <div className="p-2.5 bg-white/5 group-hover/fb:bg-blue-500/20 rounded-xl text-slate-400 group-hover/fb:text-blue-400 transition-all duration-300">
                <Facebook size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-[8px] font-mono font-bold tracking-widest text-slate-500 uppercase group-hover/fb:text-blue-400/80 transition-colors">Facebook</span>
                <span className="block text-[10px] font-semibold text-white/95 truncate">harish_cinemas</span>
              </div>
            </a>

            {/* X / Twitter Node */}
            <a 
              href="https://x.com/harish_cinemas" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-3 p-3 bg-white/[0.03] backdrop-blur-sm border border-white/5 hover:border-indigo-400/40 hover:bg-indigo-500/5 hover:shadow-[0_0_15px_rgba(129,140,248,0.15)] rounded-2xl transition-all duration-500 group/x hover:-translate-y-1" 
              aria-label="X profile"
            >
              <div className="p-2.5 bg-white/5 group-hover/x:bg-[#000]/60 rounded-xl text-slate-400 group-hover/x:text-white transition-all duration-300 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-[8px] font-mono font-bold tracking-widest text-slate-500 uppercase group-hover/x:text-indigo-300 transition-colors">X Network</span>
                <span className="block text-[10px] font-semibold text-white/95 truncate">@harish_cinemas</span>
              </div>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#f1f5f9] mb-4">Quick Navigation</h4>
          <ul className="space-y-3 text-xs text-slate-400">
            <li><a href="#/about" className="hover:text-white transition-colors">About Story</a></li>
            <li><a href="#/productions" className="hover:text-white transition-colors">Our Slate</a></li>
            <li><a href="#/upcoming-projects" className="hover:text-white transition-colors">Upcoming Projects</a></li>
            <li><a href="#/gallery" className="hover:text-white transition-colors">Media Assets</a></li>
            <li><a href="#/crew-credits" className="hover:text-indigo-400 transition-colors font-semibold">Crew & Credits</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#f1f5f9] mb-4">Contact Nexus</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            <a 
              href="https://www.google.com/maps?vet=10CAAQoqAOahcKEwj43PO0jZOVAxUAAAAAHQAAAAAQEw..i&pvq=Cg0vZy8xMXo5MzFmank0IhQKDmhhcmlzaCBjaW5lbWFzEAIYAw&lqi=Cg5oYXJpc2ggY2luZW1hc5IBEGNvcnBvcmF0ZV9vZmZpY2U&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3a52675ce8191cf1:0x7d13a185a0aebd24"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 hover:underline transition-all duration-300 block"
            >
              New No: 14, Old No: 10A, Parameshwari Nagar, 3rd Street, Adyar, Chennai – 600020
            </a>
          </p>
          <p className="text-xs text-slate-400 mb-1">Phone: +91 98410 20247</p>
          <p className="text-xs text-slate-400">Email: contact@harishcinemas.com</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 text-center text-[10px] text-slate-500">
        © {new Date().getFullYear()} Harish Cinemas. All Rights Reserved. Crafted for cinematic purity inside Aether spaces.
      </div>
    </footer>
  );
}
