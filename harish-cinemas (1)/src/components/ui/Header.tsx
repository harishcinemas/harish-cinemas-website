import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, Film, ChevronDown } from "lucide-react";

interface HeaderProps {
  theme: "modern" | "classic";
  setTheme: (t: "modern" | "classic") => void;
}

export default function Header({ theme, setTheme }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(() => window.location.hash || "#/");
  const [activeDropdown, setActiveDropdown] = useState<"productions" | "gallery" | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || "#/");
      setIsMobileOpen(false);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Lock body scroll when mobile menu is active to prevent responsive layout sliding or white gaps
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Helper to check if link is active
  const isLinkActive = (href: string) => {
    if (href === "#/") {
      return currentRoute === "#/" || currentRoute === "";
    }
    return currentRoute.startsWith(href);
  };

  return (
    <header className={`fixed top-0 left-0 w-full transition-all duration-500 ${
      isMobileOpen 
        ? "h-screen bg-[#050508] z-[100] py-4" 
        : isScrolled 
          ? "bg-[#050508]/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-xl z-50" 
          : "bg-gradient-to-b from-black/60 to-transparent py-5 z-50"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#/" className="flex items-center gap-3 group" id="brand-logo-link">
          <img 
            src="/logo.svg" 
            alt="Harish Cinemas Interlocking Logo" 
            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.2)]"
            referrerPolicy="no-referrer"
          />
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-display font-black tracking-[0.25em] text-white uppercase transition-all duration-300 group-hover:tracking-[0.3em] font-extrabold select-none">
              HARISH <span className="text-indigo-400 font-semibold">CINEMAS</span>
            </span>
            
            {/* Spinning decorative film reel icon emphasizing cinematic theme */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-4.5 h-4.5 text-indigo-400/95 animate-spin-slow flex-shrink-0 filter drop-shadow-[0_0_8px_rgba(129,140,248,0.55)]" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
              strokeLinecap="round"
              id="header-rotating-film-reel"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="12" r="0.8" fill="currentColor" />
              <line x1="12" y1="2" x2="12" y2="9" />
              <line x1="12" y1="15" x2="12" y2="22" />
              <line x1="2" y1="12" x2="9" y2="12" />
              <line x1="15" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="4.93" x2="9.88" y2="9.88" />
              <line x1="14.12" y1="14.12" x2="19.07" y2="19.07" />
              <line x1="19.07" y1="4.93" x2="14.12" y2="9.88" />
              <line x1="9.88" y1="14.12" x2="4.93" y2="19.07" />
            </svg>
          </div>
        </a>

        {/* Desktop Main Menus - Responsive Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center space-x-1">
            {/* Home Link */}
            <a
              href="#/"
              className={`text-[11px] uppercase tracking-widest font-bold transition-all duration-200 px-3.5 py-1.5 rounded-xl ${
                isLinkActive("#/") 
                  ? "bg-white/10 text-white border border-white/10 shadow-lg" 
                  : "text-slate-300 opacity-80 hover:opacity-100 hover:text-white"
              }`}
            >
              Home
            </a>

            {/* About Link */}
            <a
              href="#/about"
              className={`text-[11px] uppercase tracking-widest font-bold transition-all duration-200 px-3.5 py-1.5 rounded-xl ${
                isLinkActive("#/about") 
                  ? "bg-white/10 text-white border border-white/10 shadow-lg" 
                  : "text-slate-300 opacity-80 hover:opacity-100 hover:text-white"
              }`}
            >
              About
            </a>

            {/* Productions Menu Dropdown */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown("productions")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 text-[11px] uppercase tracking-widest font-bold transition-all duration-200 px-3.5 py-1.5 rounded-xl cursor-pointer ${
                  isLinkActive("#/productions") || isLinkActive("#/upcoming-projects") || isLinkActive("#/crew-credits")
                    ? "bg-white/10 text-white border border-white/10"
                    : "text-slate-300 opacity-80 hover:opacity-100 hover:text-white"
                }`}
                aria-haspopup="true"
                aria-expanded={activeDropdown === "productions"}
              >
                <span>Productions</span>
                <ChevronDown size={11} className={`transition-transform duration-300 ${activeDropdown === "productions" ? "transform rotate-180" : ""}`} />
              </button>

              <div 
                className={`absolute top-full left-0 mt-1 w-64 bg-[#09090e]/98 backdrop-blur-3xl border border-white/10 p-2 rounded-2xl shadow-2xl transition-all duration-300 ease-out z-50 flex flex-col gap-1 ${
                  activeDropdown === "productions" 
                    ? "opacity-100 translate-y-0 pointer-events-auto" 
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <a 
                  href="#/productions" 
                  className={`flex flex-col text-[10px] uppercase tracking-wider font-bold py-2 px-3 rounded-xl transition-all ${
                    isLinkActive("#/productions") && !isLinkActive("#/upcoming-projects")
                      ? "bg-indigo-600/90 text-white shadow-md shadow-indigo-600/20" 
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setActiveDropdown(null)}
                >
                  <span>Ongoing Catalog</span>
                  <span className="text-[7.5px] uppercase tracking-normal font-normal text-slate-400 mt-1 regular-case leading-relaxed">Completed & Active Theater Releases</span>
                </a>
                <a 
                  href="#/upcoming-projects" 
                  className={`flex flex-col text-[10px] uppercase tracking-wider font-bold py-2 px-3 rounded-xl transition-all ${
                    isLinkActive("#/upcoming-projects") 
                      ? "bg-indigo-600/90 text-white shadow-md shadow-indigo-600/20" 
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setActiveDropdown(null)}
                >
                  <span>Upcoming / Future</span>
                  <span className="text-[7.5px] uppercase tracking-normal font-normal text-slate-400 mt-1 regular-case leading-relaxed">Planned Cinema Projects & First Looks</span>
                </a>
                <a 
                  href="#/crew-credits" 
                  className={`flex flex-col text-[10px] uppercase tracking-wider font-bold py-2 px-3 rounded-xl transition-all ${
                    isLinkActive("#/crew-credits") 
                      ? "bg-indigo-600/90 text-white shadow-md shadow-indigo-600/20" 
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setActiveDropdown(null)}
                >
                  <span>Crew & Credits</span>
                  <span className="text-[7.5px] uppercase tracking-normal font-normal text-slate-400 mt-1 regular-case leading-relaxed">Theatrical Billing Registers</span>
                </a>
              </div>
            </div>

            {/* Gallery Menu Dropdown */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown("gallery")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 text-[11px] uppercase tracking-widest font-bold transition-all duration-200 px-3.5 py-1.5 rounded-xl cursor-pointer ${
                  isLinkActive("#/gallery") || isLinkActive("#/videos")
                    ? "bg-white/10 text-white border border-white/10"
                    : "text-slate-300 opacity-80 hover:opacity-100 hover:text-white"
                }`}
                aria-haspopup="true"
                aria-expanded={activeDropdown === "gallery"}
              >
                <span>Gallery</span>
                <ChevronDown size={11} className={`transition-transform duration-300 ${activeDropdown === "gallery" ? "transform rotate-180" : ""}`} />
              </button>

              <div 
                className={`absolute top-full left-0 mt-1 w-56 bg-[#09090e]/98 backdrop-blur-3xl border border-white/10 p-2 rounded-2xl shadow-2xl transition-all duration-300 ease-out z-50 flex flex-col gap-1 ${
                  activeDropdown === "gallery" 
                    ? "opacity-100 translate-y-0 pointer-events-auto" 
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <a 
                  href="#/gallery" 
                  className={`flex flex-col text-[10px] uppercase tracking-wider font-bold py-2 px-3 rounded-xl transition-all ${
                    isLinkActive("#/gallery") 
                      ? "bg-indigo-600/90 text-white shadow-md shadow-indigo-600/20" 
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setActiveDropdown(null)}
                >
                  <span>Images</span>
                  <span className="text-[7.5px] uppercase tracking-normal font-normal text-slate-400 mt-1 regular-case leading-relaxed">Exclusive High-Def Production Stills</span>
                </a>
                <a 
                  href="#/videos" 
                  className={`flex flex-col text-[10px] uppercase tracking-wider font-bold py-2 px-3 rounded-xl transition-all ${
                    isLinkActive("#/videos") 
                      ? "bg-indigo-600/90 text-white shadow-md shadow-indigo-600/20" 
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setActiveDropdown(null)}
                >
                  <span>Videos</span>
                  <span className="text-[7.5px] uppercase tracking-normal font-normal text-slate-400 mt-1 regular-case leading-relaxed">Promos, Teasers & Official Streams</span>
                </a>
              </div>
            </div>

            {/* News Link */}
            <a
              href="#/news"
              className={`text-[11px] uppercase tracking-widest font-bold transition-all duration-200 px-3.5 py-1.5 rounded-xl ${
                isLinkActive("#/news") 
                  ? "bg-white/10 text-white border border-white/10 shadow-lg" 
                  : "text-slate-300 opacity-80 hover:opacity-100 hover:text-white"
              }`}
            >
              News
            </a>

            {/* Contact Link */}
            <a
              href="#/contact"
              className={`text-[11px] uppercase tracking-widest font-bold transition-all duration-200 px-3.5 py-1.5 rounded-xl ${
                isLinkActive("#/contact") 
                  ? "bg-white/10 text-white border border-white/10 shadow-lg" 
                  : "text-slate-300 opacity-80 hover:opacity-100 hover:text-white"
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Cinematic Theme Palette Toggle */}
          <div className="flex items-center bg-black/40 border border-white/10 p-1 rounded-xl shadow-inner select-none gap-0.5">
            <button 
              onClick={() => setTheme("modern")} 
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[9px] uppercase tracking-widest font-bold transition-all cursor-pointer ${theme === "modern" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10" : "text-slate-400 hover:text-white opacity-70 hover:opacity-100"}`}
              title="Modern Digital (Indigo Theme)"
            >
              <Sparkles size={10} />
              <span>Modern</span>
            </button>
            <button 
              onClick={() => setTheme("classic")} 
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[9px] uppercase tracking-widest font-bold transition-all cursor-pointer ${theme === "classic" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10" : "text-slate-400 hover:text-white opacity-70 hover:opacity-100"}`}
              title="Classic Cinema (Gold & Sepia)"
            >
              <Film size={10} />
              <span>Classic</span>
            </button>
          </div>
        </div>

        {/* Hamburger Toggle Buttons for Mobile Devices */}
        <button className="lg:hidden text-white hover:text-indigo-400 transition-colors cursor-pointer p-2 z-50 rounded-xl hover:bg-white/5" onClick={() => setIsMobileOpen(!isMobileOpen)} aria-label="Toggle navigation">
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar/Menu Drawer */}
      {isMobileOpen && (
        <div className="absolute left-0 right-0 bottom-0 top-[76px] bg-[#050508] z-50 flex flex-col p-6 space-y-6 lg:hidden animate-fade-in border-t border-white/10 overflow-y-auto">
          <div className="flex flex-col space-y-1.5">
            {/* Home */}
            <a
              href="#/"
              className={`text-sm uppercase tracking-wider py-3 px-4 rounded-xl transition-all ${
                isLinkActive("#/") ? "bg-white/10 text-white border border-white/10 font-extrabold" : "text-slate-300 opacity-70 hover:opacity-100"
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              Home
            </a>

            {/* About */}
            <a
              href="#/about"
              className={`text-sm uppercase tracking-wider py-3 px-4 rounded-xl transition-all ${
                isLinkActive("#/about") ? "bg-white/10 text-white border border-white/10 font-extrabold" : "text-slate-300 opacity-70 hover:opacity-100"
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              About
            </a>

            {/* Collapsed Productions Sub-Menu */}
            <div className="flex flex-col py-1.5 border-y border-white/5 my-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-indigo-400/90 px-4 font-black mb-2 block">Productions</span>
              <div className="flex flex-col pl-3 space-y-1">
                <a
                  href="#/productions"
                  className={`text-xs uppercase tracking-widest py-2.5 px-4 rounded-xl transition-all flex items-center justify-between ${
                    isLinkActive("#/productions") && !isLinkActive("#/upcoming-projects") 
                      ? "bg-indigo-600/30 text-white border border-indigo-500/20 font-bold" 
                      : "text-slate-300 opacity-75 hover:opacity-100"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span>Ongoing Catalog</span>
                </a>
                <a
                  href="#/upcoming-projects"
                  className={`text-xs uppercase tracking-widest py-2.5 px-4 rounded-xl transition-all flex items-center justify-between ${
                    isLinkActive("#/upcoming-projects") 
                      ? "bg-indigo-600/30 text-white border border-indigo-500/20 font-bold" 
                      : "text-slate-300 opacity-75 hover:opacity-100"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span>Upcoming / Future</span>
                </a>
                <a
                  href="#/crew-credits"
                  className={`text-xs uppercase tracking-widest py-2.5 px-4 rounded-xl transition-all flex items-center justify-between ${
                    isLinkActive("#/crew-credits") 
                      ? "bg-indigo-600/30 text-white border border-indigo-500/20 font-bold" 
                      : "text-slate-300 opacity-75 hover:opacity-100"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span>Crew & Credits</span>
                </a>
              </div>
            </div>

            {/* Collapsed Gallery Sub-Menu */}
            <div className="flex flex-col py-1.5 border-b border-white/5 mb-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-indigo-400/90 px-4 font-black mb-2 block">Gallery</span>
              <div className="flex flex-col pl-3 space-y-1">
                <a
                  href="#/gallery"
                  className={`text-xs uppercase tracking-widest py-2.5 px-4 rounded-xl transition-all flex items-center justify-between ${
                    isLinkActive("#/gallery") 
                      ? "bg-indigo-600/30 text-white border border-indigo-500/20 font-bold" 
                      : "text-slate-300 opacity-75 hover:opacity-100"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span>Images</span>
                </a>
                <a
                  href="#/videos"
                  className={`text-xs uppercase tracking-widest py-2.5 px-4 rounded-xl transition-all flex items-center justify-between ${
                    isLinkActive("#/videos") 
                      ? "bg-indigo-600/30 text-white border border-indigo-500/20 font-bold" 
                      : "text-slate-300 opacity-75 hover:opacity-100"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span>Videos</span>
                </a>
              </div>
            </div>

            {/* News */}
            <a
              href="#/news"
              className={`text-sm uppercase tracking-wider py-3 px-4 rounded-xl transition-all ${
                isLinkActive("#/news") ? "bg-white/10 text-white border border-white/10 font-extrabold" : "text-slate-300 opacity-70 hover:opacity-100"
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              News
            </a>

            {/* Contact */}
            <a
              href="#/contact"
              className={`text-sm uppercase tracking-wider py-3 px-4 rounded-xl transition-all ${
                isLinkActive("#/contact") ? "bg-white/10 text-white border border-white/10 font-extrabold" : "text-slate-300 opacity-70 hover:opacity-100"
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              Contact
            </a>
          </div>

          {/* Mobile Theme Switcher Component */}
          <div className="flex flex-col gap-2.5 pt-4 border-t border-white/10 mt-auto pb-6">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold px-1">Cinematic Theme Color</span>
            <div className="flex items-center gap-1.5 bg-black/40 border border-white/15 p-1 rounded-xl w-full">
              <button 
                onClick={() => { setTheme("modern"); setIsMobileOpen(false); }} 
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] uppercase tracking-widest font-extrabold transition-all cursor-pointer ${theme === "modern" ? "bg-indigo-600 text-white font-black" : "text-slate-400 hover:text-white"}`}
              >
                <Sparkles size={11} />
                <span>Modern Digital</span>
              </button>
              <button 
                onClick={() => { setTheme("classic"); setIsMobileOpen(false); }} 
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] uppercase tracking-widest font-extrabold transition-all cursor-pointer ${theme === "classic" ? "bg-indigo-600 text-white font-black" : "text-slate-400 hover:text-white"}`}
              >
                <Film size={11} />
                <span>Classic Cinema</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
