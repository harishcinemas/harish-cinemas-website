import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import BackToTopButton from "./components/ui/BackToTopButton";
import ScrollProgressBar from "./components/ui/ScrollProgressBar";
import CustomCursor from "./components/ui/CustomCursor";
import SEO from "./components/ui/SEO";

// Import all distinct views
import HomeView from "./components/views/HomeView";
import AboutView from "./components/views/AboutView";
import ProductionsView from "./components/views/ProductionsView";
import ProductionDetailView from "./components/views/ProductionDetailView";
import UpcomingView from "./components/views/UpcomingView";
import GalleryView from "./components/views/GalleryView";
import VideosView from "./components/views/VideosView";
import NewsView from "./components/views/NewsView";
import NewsDetailView from "./components/views/NewsDetailView";
import ContactView from "./components/views/ContactView";
import CrewCreditsView from "./components/views/CrewCreditsView";

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash || "#/");
  const [isLoading, setIsLoading] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const [theme, setTheme] = useState<"modern" | "classic">(
    () => (localStorage.getItem("hc-theme") as "modern" | "classic") || "modern"
  );

  useEffect(() => {
    if (theme === "classic") {
      document.documentElement.setAttribute("data-theme", "classic-cinema");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("hc-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || "#/");
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    // Elegant 1-second premium cinema sequence that flashes and reveals
    const timer = setTimeout(() => {
      setIsFlashing(true);
      const exitTimer = setTimeout(() => {
        setIsLoading(false);
      }, 400); // brief flash duration
      return () => clearTimeout(exitTimer);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  // Simple stateful router parsing dynamic route parameters
  const renderView = () => {
    if (route === "#/" || route === "") {
      return <HomeView />;
    }
    if (route === "#/about") {
      return <AboutView />;
    }
    if (route === "#/productions") {
      return <ProductionsView />;
    }
    if (route.startsWith("#/productions/")) {
      const slug = route.substring("#/productions/".length);
      return <ProductionDetailView slug={slug} />;
    }
    if (route === "#/upcoming-projects") {
      return <UpcomingView />;
    }
    if (route === "#/gallery") {
      return <GalleryView />;
    }
    if (route === "#/videos") {
      return <VideosView />;
    }
    if (route === "#/news") {
      return <NewsView />;
    }
    if (route.startsWith("#/news/")) {
      const slug = route.substring("#/news/".length);
      return <NewsDetailView slug={slug} />;
    }
    if (route === "#/contact") {
      return <ContactView />;
    }
    if (route === "#/crew-credits") {
      return <CrewCreditsView />;
    }

    // Default Fallback
    return <HomeView />;
  };

  return (
    <div className="min-h-screen bg-[#030305] text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased overflow-x-hidden flex flex-col relative">
      {/* Cinematic Flash & Logo Intro Loader */}
      {isLoading && (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030305] transition-all duration-700 ease-out ${isFlashing ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"}`}>
          {/* Intense screen flash light slice */}
          <div className={`absolute inset-0 bg-white transition-opacity duration-300 pointer-events-none z-20 ${isFlashing ? "opacity-100" : "opacity-0"}`} />
          
          <div className="relative flex flex-col items-center z-10">
            {/* Pulsing Light Spot behind logo */}
            <div className="absolute top-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-600/30 blur-[60px] rounded-full scale-110 animate-pulse" />
            <img 
              src="/logo.svg" 
              alt="Harish Cinemas Logo Loader" 
              className="w-24 h-24 md:w-32 md:h-32 object-contain relative mx-auto mb-6 filter drop-shadow-[0_0_20px_rgba(129,140,248,0.5)] animate-flash-logo"
              referrerPolicy="no-referrer"
            />
            <h1 className="text-3xl md:text-4xl font-display font-light uppercase tracking-[0.4em] text-white">
              HARISH <span className="text-indigo-400 font-extrabold tracking-widest block sm:inline mt-1 sm:mt-0">CINEMAS</span>
            </h1>
            <p className="text-[10px] font-mono tracking-[0.5em] uppercase text-indigo-300/60 mt-4">
              STUDIO PORTAL
            </p>
          </div>
        </div>
      )}

      {/* Frosted Glass Ambient Glowing Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/25 rounded-full blur-[120px] opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] opacity-80"></div>
        <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[40%] left-[5%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] opacity-40"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <SEO route={route} />
        <CustomCursor />
        <ScrollProgressBar />
        <Header theme={theme} setTheme={setTheme} />
        <main className="flex-grow pt-[72px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={route}
              initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <WhatsAppButton />
        <BackToTopButton />
      </div>
    </div>
  );
}
