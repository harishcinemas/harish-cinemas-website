import React, { useState } from "react";
import { ArrowLeft, User, Video, FileText, Sparkles, TrendingUp, Mail, Check, AlertCircle, Play, EyeOff, Loader2, X, Tv, Volume2, Radio, Compass, Film, Camera, Music, Scissors, Layers, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { movies } from "../../data/movies";
import { videos } from "../../data/videos";
import VideoCard from "../ui/VideoCard";
import AnimatedSection from "../core/AnimatedSection";

// Selected fan comment streams for each production
const reviewsForMovie: Record<string, string[]> = {
  "naruvee": [
    "Subarak Mubarak has created an atmospheric gem! This is South Indian horror at its peak.",
    "Harish Pandian is so impressive with his intense screen presence. The suspense is unmatched.",
    "The dripping green jungle theme in twilight looks so spooky and high budget!",
    "Naruvee is not just a standard horror film, the underlying social message is so deep and thoughtful.",
    "Excellent stunt choreography and background music! The theatre experience was spine-chilling."
  ],
  "nalla-padam": [
    "So excited for Harish Cinemas' next venture! Nalla Padam sounds extremely refreshing.",
    "Having Nassar and Aravind Swamy in the cast is a massive coup! Two absolute legends of cinema.",
    "Independent cinema done right with high sincerity and clean family values. Full support.",
    "Can't wait to see the landscapes of Tamil Nadu captured by the elite crew. Release it soon!",
    "A socio-drama that focuses on relationships. Harish cinemas is proving to write great stories."
  ]
};

interface ProductionDetailViewProps {
  slug: string;
}

const loadingLogs = [
  "Accessing cinematic telemetry registers...",
  "Aggregating global audience reaction vectors...",
  "Consulting the Gemini AI intelligence mainframe...",
  "Analyzing tone nuances and semantic tags...",
  "Synthesizing public emotional engagement scores...",
  "Completing final report rendering..."
];

export default function ProductionDetailView({ slug }: ProductionDetailViewProps) {
  const movie = movies.find((m) => m.slug === slug);

  // Interaction State Nodes
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [ambientGlow, setAmbientGlow] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [loadingLogIndex, setLoadingLogIndex] = useState(0);
  const [creditsCategory, setCreditsCategory] = useState("cast");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Dynamic interval to rotate premium loading messages beautifully
  React.useEffect(() => {
    if (!isAnalyzing) {
      setLoadingLogIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingLogIndex((prev) => (prev + 1) % loadingLogs.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // Newsletter subscription states
  const [newsEmail, setNewsEmail] = useState("");
  const [newsStatus, setNewsStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsFeedback, setNewsFeedback] = useState("");
  const [newsTouched, setNewsTouched] = useState(false);
  const isNewsEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsEmail.trim());

  if (!movie) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center px-6 pt-24 animate-fade-in text-center relative z-10">
        <h2 className="text-2xl font-display font-black tracking-widest text-white uppercase mb-4">Production Not Found</h2>
        <p className="text-sm text-slate-400 mb-8 font-light">The requested movie portfolio does not exist inside our active registers.</p>
        <a href="#/productions" className="px-6 py-3 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:scale-105 transition-all">
          Return to Catalog
        </a>
      </div>
    );
  }

  // Trigger Backend AI Sentiment Analysis
  const triggerSentimentScan = async () => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    try {
      const response = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comments: reviewsForMovie[movie.slug] || [],
          movieTitle: movie.title
        })
      });
      const data = await response.json();
      if (data.error && !data.sentiment) {
        setAnalysisError(data.error);
      } else {
        setAnalysisResult(data);
      }
    } catch (err) {
      setAnalysisError("The tracking portal timed out. Connection with audience telemetry lost.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Subscribe Handler
  const handleNewsletterJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsTouched(true);
    
    if (!newsEmail || !isNewsEmailValid) {
      setNewsStatus("error");
      setNewsFeedback("Please supply a valid communication gateway email (e.g., name@domain.com).");
      return;
    }
    setNewsStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsEmail })
      });
      const data = await response.json();
      if (data.success) {
        setNewsStatus("success");
        setNewsFeedback(data.message);
        setNewsEmail("");
        setNewsTouched(false);
      } else {
        setNewsStatus("error");
        setNewsFeedback(data.message || "Entry transmission failed.");
      }
    } catch {
      setNewsStatus("error");
      setNewsFeedback("Connection broken. Unresolved subscription gate status.");
    }
  };

  return (
    <div className="pb-24 space-y-20 animate-fade-in relative z-10 font-sans">
      
      {/* Immersive Cinema Lightbox Modal */}
      {isTheaterMode && (
        <div 
          className="fixed inset-0 bg-[#020204]/98 z-50 flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in backdrop-blur-2xl overflow-y-auto"
          id="cinema-lightbox-portal"
        >
          {/* Subtle vignette layer on ambient background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)] pointer-events-none opacity-90" />

          {/* Top Branding / Action Bar */}
          <div className="relative z-10 w-full max-w-4xl flex items-center justify-between mb-4 border-b border-white/5 pb-4 font-mono">
            <div className="flex items-center space-x-3">
              <Film className="text-indigo-400 animate-spin-slow" size={16} />
              <div className="text-left">
                <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase block">
                  HARISH CINEMAS THEATER SCREEN • OFFICIAL HIGH-FI EMBED
                </span>
                <span className="text-xs font-semibold text-white tracking-wide uppercase line-clamp-1 block">
                  PREMIERING PORTFOLIO TRAILER: {movie.title}
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
                className="p-2 text-slate-400 hover:text-white transition-all cursor-pointer rounded-lg hover:bg-white/5" 
                onClick={() => setIsTheaterMode(false)}
                title="Exit Theater"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Video Container Frame */}
          <div className="relative w-full max-w-4xl aspect-video z-10 my-auto">
            {/* Real Ambient Wall Projection Glow behind player container */}
            {ambientGlow && (
              <div className="absolute inset-2 bg-gradient-to-tr from-indigo-600/25 to-purple-600/30 rounded-3xl blur-[80px] pointer-events-none transition-all duration-500 animate-pulse" />
            )}

            <div className="w-full h-full bg-black rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.9)] relative z-10 animate-scale-up">
              <iframe 
                src={`${movie.trailerYamlUrl}?autoplay=1&rel=0&modestbranding=1`} 
                title={`${movie.title} Trailer Cinema Broadcast`} 
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
                <span>FORMAT: 1080P KDM DIGITAL PRESS RAW</span>
              </span>
              <span className="hidden sm:inline text-zinc-600">•</span>
              <span className="flex items-center space-x-1">
                <Volume2 size={10} className="text-zinc-500" />
                <span>AUDIO: DOLBY ATMOS CAPABLE</span>
              </span>
            </div>
            
            <span className="text-indigo-400 font-extrabold flex items-center space-x-1">
              <Compass size={10} className="animate-spin-slow" />
              <span>THEATED LIVE BROADCAST CAPTURE</span>
            </span>
          </div>
        </div>
      )}

      {/* Immersive Image Gallery Lightbox Modal */}
      {activeImageIndex !== null && movie.galleryImages && (
        <div 
          className="fixed inset-0 bg-[#020204]/98 z-50 flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in backdrop-blur-2xl"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Subtle background vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)] pointer-events-none opacity-90" />

          {/* Close button top right */}
          <button 
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-4 right-4 z-50 p-2.5 text-slate-400 hover:text-white transition-all cursor-pointer rounded-full bg-white/5 hover:bg-white/10"
            title="Close Lightbox"
          >
            <X size={20} />
          </button>

          {/* Navigation Controls */}
          {movie.galleryImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => 
                    prev !== null 
                      ? (prev - 1 + movie.galleryImages!.length) % movie.galleryImages!.length 
                      : 0
                  );
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/5 hover:bg-white/10 hover:text-indigo-400 text-white rounded-full transition-all border border-white/5 hover:border-indigo-500/20"
                title="Previous Poster"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => 
                    prev !== null 
                      ? (prev + 1) % movie.galleryImages!.length 
                      : 0
                  );
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/5 hover:bg-white/10 hover:text-indigo-400 text-white rounded-full transition-all border border-white/5 hover:border-indigo-500/20"
                title="Next Poster"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image Container */}
          <div 
            className="relative w-full max-w-2xl max-h-[80vh] flex flex-col items-center justify-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {ambientGlow && (
              <div className="absolute inset-4 bg-indigo-500/10 rounded-3xl blur-[120px] pointer-events-none transition-all duration-500 animate-pulse" />
            )}

            <motion.div 
              className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-full"
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={movie.galleryImages[activeImageIndex]} 
                alt={`${movie.title} Fullscreen Poster ${activeImageIndex + 1}`} 
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain" 
              />
            </motion.div>

            {/* Bottom metadata panel */}
            <div className="text-center mt-4 space-y-1 select-none">
              <span className="text-[10px] font-mono tracking-widest text-[#a5b4fc] font-bold uppercase">
                Poster {activeImageIndex + 1} of {movie.galleryImages.length}
              </span>
              <p className="text-xs text-slate-300 tracking-wide uppercase font-semibold">
                {activeImageIndex === 0 && "Official Teaser Theme Poster"}
                {activeImageIndex === 1 && "Main Ensemble Cast Poster"}
                {activeImageIndex === 2 && "The Dramatic Ridge Ascent Poster"}
                {activeImageIndex === 3 && "Romantic Melodic Poster: Harish & Vinchu Rachel"}
                {activeImageIndex === 4 && "Official Widescreen Cinema Poster"}
                {activeImageIndex === 5 && "Digital Glitch Thriller Poster"}
                {activeImageIndex === 6 && "Forest Chase Intense Suspense Poster"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Massive Movie Detail Hero Banner */}
      <section className="relative h-[65vh] flex items-end overflow-hidden rounded-[36px] mx-auto max-w-[95%] border border-white/5 shadow-2xl">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#030305] via-[#030305]/45 to-transparent z-10" />
        <img 
          src={movie.bannerUrl} 
          alt={movie.title} 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-[1.01]" 
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pb-12">
          <a href="#/productions" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#f1f5f9] mb-6 hover:text-indigo-300 transition-colors group">
            <ArrowLeft size={14} className="text-indigo-400 group-hover:-translate-x-1 duration-200" /> <span>Return to Catalog Matrix</span>
          </a>
          <div className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-2 font-extrabold">
            {movie.genre.join(" / ")} • {movie.releaseYear}
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-wider max-w-3xl">{movie.title}</h1>
          <p className="text-xs md:text-sm italic text-slate-300 font-light max-w-2xl mt-4">"{movie.tagline}"</p>
        </div>
      </section>

      {/* Main Structural Breakdown Layout Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Core Synopsis, Embed, Subscription and AI Analyzer Widget */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Synopsis */}
          <AnimatedSection>
            <h2 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest mb-4 flex items-center space-x-2">
              <FileText size={14} /> <span>Narrative & Creative Objective</span>
            </h2>
            <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed whitespace-pre-line leading-relaxed">{movie.synopsis}</p>
          </AnimatedSection>

          {/* Key Production Notes */}
          {movie.productionNotes && (
            <AnimatedSection className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white tracking-wider">Production & Technical Notes</h3>
              <ul className="space-y-3 list-disc list-inside text-xs text-slate-300/80 font-light leading-relaxed">
                {movie.productionNotes.map((note, i) => <li key={i}>{note}</li>)}
              </ul>
            </AnimatedSection>
          )}

          {/* Cinema Trailer Preview Module */}
          {movie.trailerYamlUrl && (
            <AnimatedSection className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center space-x-2">
                  <Video size={14} /> <span>Official Media Embed Link</span>
                </h3>
              </div>

              {/* Enhanced Theatrical Player Preview Block */}
              <div 
                className="group relative w-full aspect-video rounded-3xl overflow-hidden bg-black/90 shadow-2xl border border-white/5 cursor-pointer hover:border-indigo-500/30 hover:scale-[1.01] transition-all duration-500 hover-card-glow"
                onClick={() => setIsTheaterMode(true)}
                id="cinema-trailer-launch-panel"
              >
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/35 transition-colors duration-500 z-10" />
                <img 
                  src={movie.bannerUrl} 
                  alt={movie.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                
                {/* Visual interface hints inside the frame */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 space-y-4">
                  <div className="p-5 sm:p-6 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl shadow-indigo-500/40 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Play size={28} fill="currentColor" className="ml-1" />
                  </div>
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-[#f1f5f9] font-bold rounded-full uppercase group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all">
                      LAUNCH CINEMA LIGHTBOX THEATER
                    </span>
                    <span className="block text-[10px] text-zinc-400 mt-2 font-mono group-hover:text-slate-200 transition-colors">
                      DURATION: OFFICIAL FEATURE LENGTH EXCERPT
                    </span>
                  </div>
                </div>

                <div className="absolute top-4 left-4 z-20 bg-indigo-500/10 border border-indigo-400/20 px-3.5 py-1.5 rounded-full text-[9px] font-mono tracking-widest text-indigo-300 font-extrabold uppercase backdrop-blur-sm">
                  1080P WIDESCREEN
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* AI Trailer Sentiment Analysis Module */}
          <AnimatedSection className="bg-white/5 border border-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-extrabold text-indigo-400 uppercase tracking-[0.25em] flex items-center space-x-2">
                  <Sparkles size={12} className="animate-spin" style={{ animationDuration: "3s" }} />
                  <span>AI Audience Telemetry Workspace</span>
                </div>
                <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">AI Trailer Sentiment Analysis</h3>
              </div>
              <TrendingUp className="text-indigo-400/80 hidden sm:block" size={24} />
            </div>

            <p className="text-xs text-slate-300/80 font-light leading-relaxed">
              Scan recent public feedback logs, reviews, and trailer metrics to evaluate emotional engagement metrics using advanced language learning pipelines.
            </p>

            {/* Trigger Button or Display Result */}
            {!analysisResult && !isAnalyzing && (
              <button 
                onClick={triggerSentimentScan}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center space-x-2 hover-primary-glow shadow-lg transition-all cursor-pointer"
              >
                <Sparkles size={14} />
                <span>Initialize AI Trailer Sentiment Analysis</span>
              </button>
            )}

            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4 font-mono">
                <Loader2 size={32} className="animate-spin text-indigo-400" />
                <p className="text-xs text-indigo-300 tracking-widest uppercase animate-pulse transition-all duration-300 text-center max-w-xs leading-relaxed">
                  {loadingLogs[loadingLogIndex]}
                </p>
              </div>
            )}

            {analysisError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start space-x-3 text-xs text-red-200">
                <AlertCircle className="flex-shrink-0 text-red-400 mt-0.5" size={16} />
                <p>{analysisError}</p>
              </div>
            )}

            {analysisResult && (
              <div className="space-y-6 pt-4 border-t border-white/5 animate-fade-in font-sans">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Gauge score indicator */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/5 relative">
                    <div className="relative flex items-center justify-center">
                      {/* Circular border track */}
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="6" fill="transparent" />
                        <circle 
                          cx="48" 
                          cy="48" 
                          r="40" 
                          stroke="rgb(129, 140, 248)" 
                          strokeWidth="6" 
                          fill="transparent" 
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 - (251.2 * analysisResult.score) / 100}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <span className="absolute text-2xl font-black text-white">{analysisResult.score}%</span>
                    </div>
                    <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase mt-4">Hype Metric</span>
                  </div>

                  {/* Verbal Summary Grade details */}
                  <div className="md:col-span-8 space-y-3">
                    <div className="inline-block px-3.5 py-1 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold rounded-full uppercase tracking-widest">
                      Grade: {analysisResult.sentiment}
                    </div>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {analysisResult.summary}
                    </p>
                    <div className="text-[11px] font-mono text-zinc-400 flex flex-wrap gap-2 pt-1">
                      <span className="text-indigo-400 font-bold">{analysisResult.breakdown}</span>
                    </div>
                  </div>
                </div>

                {analysisResult.notice && (
                  <div className="bg-white/5 rounded-xl px-4 py-2 text-[10px] text-zinc-400 tracking-wide flex items-center gap-2 border border-white/5 italic">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
                    <span>{analysisResult.notice}</span>
                  </div>
                )}

                <button 
                  onClick={() => setAnalysisResult(null)}
                  className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest border-b border-indigo-400/30 pb-0.5"
                >
                  Reset Analytics Board
                </button>
              </div>
            )}
          </AnimatedSection>

          {/* Newsletter Subscription and Private Sneak Peek System */}
          <AnimatedSection className="bg-gradient-to-br from-indigo-950/20 to-purple-950/10 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl relative overflow-hidden">
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-600/10 blur-[50px] rounded-full pointer-events-none" />
            <div className="flex items-center space-x-3">
              <Mail className="text-indigo-400" size={20} />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Join Exclusive Pre-Release Registry</h3>
            </div>
            
            <p className="text-xs text-slate-300/80 font-light leading-relaxed">
              Unlock early critical reviews, exclusive theatrical asset drafts, and dynamic release notes regarding Naruvee and our upcoming masterpieces.
            </p>

            <form onSubmit={handleNewsletterJoin} className="flex flex-col gap-2 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <input 
                    type="email" 
                    value={newsEmail}
                    onChange={(e) => {
                      setNewsEmail(e.target.value);
                      if (!newsTouched) setNewsTouched(true);
                    }}
                    onBlur={() => setNewsTouched(true)}
                    placeholder="Enter email for private VIP clearance..." 
                    disabled={newsStatus === "loading"}
                    className={`w-full px-5 py-3.5 bg-black/40 border rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all font-light ${
                      !newsTouched 
                        ? "border-white/5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20" 
                        : isNewsEmailValid 
                          ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-100 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/10" 
                          : "border-rose-500/40 bg-rose-950/20 text-rose-100 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/10"
                    }`}
                  />
                  {newsTouched && (
                    <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold ${
                      isNewsEmailValid ? "text-emerald-400" : "text-rose-400"
                    }`}>
                      {isNewsEmailValid ? "✓" : "⚠"}
                    </span>
                  )}
                </div>
                <button 
                  type="submit"
                  disabled={newsStatus === "loading"}
                  className="px-6 py-3.5 bg-[#f1f5f9] text-[#030305] text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-indigo-400 hover:text-white hover-primary-glow transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
                >
                  {newsStatus === "loading" && <Loader2 size={12} className="animate-spin" />}
                  <span>Get Exclusive VIP Access</span>
                </button>
              </div>
              {newsTouched && !isNewsEmailValid && (
                <p className="text-[10px] text-rose-400 font-mono animate-fade-in pl-1">
                  ⚠ Please specify a valid email address (e.g. name@domain.com).
                </p>
              )}
            </form>

            {newsStatus === "success" && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-xs text-emerald-300 flex items-center space-x-2 animate-fade-in">
                <Check size={16} className="text-emerald-400 flex-shrink-0" />
                <span>{newsFeedback}</span>
              </div>
            )}

            {newsStatus === "error" && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-xs text-red-300 flex items-center space-x-2 animate-fade-in">
                <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                <span>{newsFeedback}</span>
              </div>
            )}
          </AnimatedSection>

        </div>

        {/* Crew & Cast Roster Breakdown Right Alignment Panel */}
        <div className="lg:col-span-4 space-y-8 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/5 h-fit shadow-2xl">
          <AnimatedSection className="space-y-6">
            <div>
              <h3 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest mb-4 flex items-center space-x-2">
                <User size={14} /> <span>Key Creative Directors</span>
              </h3>
              <div className="space-y-3 text-xs">
                {movie.crew.map((c, idx) => (
                  <div key={idx} className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400 font-light">{c.role}</span>
                    <span className="text-white font-bold">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest mb-4">Principal Billing Cast</h3>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-white/5 text-slate-300 text-xs rounded-xl border border-white/5 font-medium font-mono">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Interactive Official Poster / Still Gallery Section */}
      {movie.galleryImages && (
        <section className="max-w-[95%] mx-auto px-6 border-t border-white/5 pt-16">
          <AnimatedSection className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 text-left">
                <span className="inline-block text-[9px] font-mono tracking-widest text-[#818cf8] font-extrabold uppercase bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
                  OFFICIAL PRODUCTION GALLERY & ARTWORKS
                </span>
                <h2 className="text-2xl font-display font-black text-white uppercase tracking-wider">
                  Landmark Posters & Cinema Key-Art
                </h2>
                <p className="text-xs text-slate-400 max-w-2xl font-light">
                  Explore the visually stunning official promotional media, thematic posters, and promotional stills for {movie.title}.
                </p>
              </div>
              <div className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-widest bg-white/[0.02] border border-white/5 py-1.5 px-3.5 rounded-full">
                {movie.galleryImages.length} REGISTERED ASSETS
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {movie.galleryImages.map((imgUrl, idx) => (
                <motion.div
                  key={idx}
                  className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 cursor-pointer shadow-lg hover-card-glow hover:scale-[1.02] transition-all duration-350"
                  onClick={() => setActiveImageIndex(idx)}
                  whileHover={{ y: -4 }}
                >
                  {/* Image element */}
                  <img
                    src={imgUrl}
                    alt={`${movie.title} Official Poster ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 text-left">
                    <div className="space-y-1">
                      <span className="text-[8px] font-mono font-black text-indigo-400 tracking-widest uppercase block">
                        HARISH CINEMAS • POSTER {idx + 1}
                      </span>
                      <p className="text-[10px] font-bold text-white uppercase tracking-wider line-clamp-1">
                        {idx === 0 && "Official Teaser Theme"}
                        {idx === 1 && "Main Ensemble Cast"}
                        {idx === 2 && "The Dramatic Ridge Ascent"}
                        {idx === 3 && "Romantic Melodic Poster"}
                        {idx === 4 && "Official Widescreen Poster"}
                        {idx === 5 && "Digital Glitch Thriller"}
                        {idx === 6 && "Forest Chase Suspense Theme"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </section>
      )}

      {/* COMPREHENSIVE THEATRICAL CREDITS ROLL (For Nalla Padam / General movies) */}
      {movie.slug === "nalla-padam" && (
        <section className="max-w-7xl mx-auto px-6 mt-16 border-t border-white/5 pt-16" id="theatrical-credits-directory">
          <AnimatedSection className="space-y-10">
            <div className="text-center md:text-left space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-extrabold uppercase bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
                OFFICIAL INDEPENDENT THEATRICAL REGISTER
              </span>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-wider">
                Comprehensive Billing Block & Credits Roll
              </h2>
              <p className="text-xs text-slate-400 max-w-2xl font-light">
                Securely cataloged credit registrations indexing all cast groups, department heads, technical assistances, and audio engineers.
              </p>
            </div>

            {/* Department Navigation Tabs Grid */}
            <div className="flex flex-wrap gap-2.5 border-b border-white/5 pb-6">
              {[
                { id: "cast", label: "Billing Cast Cards", icon: Users },
                { id: "direction", label: "Direction & Script", icon: Film },
                { id: "tech", label: "Camera & Art Crew", icon: Camera },
                { id: "audio", label: "Music & Audio", icon: Music },
                { id: "post", label: "Post-Production", icon: Scissors },
                { id: "action", label: "Action & Dance", icon: Layers }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = creditsCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setCreditsCategory(tab.id)}
                    className={`flex items-center space-x-2 px-4.5 py-2.5 rounded-2xl border text-[9px] font-extrabold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-indigo-600/90 border-indigo-400 text-white shadow-xl shadow-indigo-500/25 scale-[1.02]"
                        : "bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={12} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Credits Group Display */}
            <div className="min-h-[250px] animate-fade-in">
              {creditsCategory === "cast" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Cast Card 1 */}
                  <div className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-indigo-500/30 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group hover-card-glow text-left">
                    <span className="absolute top-4 right-4 text-[9px] font-mono text-indigo-400 font-black">CARD 01</span>
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <User size={18} />
                    </div>
                    <h4 className="text-xs font-mono font-bold tracking-widest text-[#f1f5f9] uppercase mb-1">Dr. A. Harish</h4>
                    <p className="text-sm font-semibold text-white">Dr.A.ஹரிஷ்</p>
                    <span className="inline-block mt-3 px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-mono tracking-widest text-indigo-300 rounded-full font-bold uppercase">
                      Lead Billing Cast
                    </span>
                  </div>

                  {/* Cast Card 2 */}
                  <div className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-indigo-500/30 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group hover-card-glow text-left">
                    <span className="absolute top-4 right-4 text-[9px] font-mono text-indigo-400 font-black">CARD 02</span>
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <User size={18} />
                    </div>
                    <h4 className="text-xs font-mono font-bold tracking-widest text-[#f1f5f9] uppercase mb-1">Dhanalakshmi</h4>
                    <p className="text-sm font-semibold text-white">தனலட்சுமி</p>
                    <span className="inline-block mt-3 px-2.5 py-0.5 bg-purple-500/10 border border-purple-500/20 text-[9px] font-mono tracking-widest text-purple-300 rounded-full font-bold uppercase">
                      Principal Star
                    </span>
                  </div>

                  {/* Cast Card 3 */}
                  <div className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-indigo-500/30 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group hover-card-glow text-left">
                    <span className="absolute top-4 right-4 text-[9px] font-mono text-indigo-400 font-black">CARD 03</span>
                    <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <User size={18} />
                    </div>
                    <h4 className="text-xs font-mono font-bold tracking-widest text-[#f1f5f9] uppercase mb-1">Mottai Rajendran</h4>
                    <p className="text-sm font-semibold text-white">மொட்டை ராஜேந்திரன்</p>
                    <span className="inline-block mt-3 px-2.5 py-0.5 bg-red-500/10 border border-red-500/20 text-[9px] font-mono tracking-widest text-red-300 rounded-full font-bold uppercase">
                      Veteran Star
                    </span>
                  </div>

                  {/* Cast Card 4 */}
                  <div className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-indigo-500/30 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group hover-card-glow text-left">
                    <span className="absolute top-4 right-4 text-[9px] font-mono text-indigo-400 font-black">CARD 04</span>
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <User size={18} />
                    </div>
                    <h4 className="text-xs font-mono font-bold tracking-widest text-[#f1f5f9] uppercase mb-1">Kalki Raja</h4>
                    <p className="text-sm font-semibold text-white">கல்கி ராஜா</p>
                    <span className="inline-block mt-3 px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono tracking-widest text-amber-300 rounded-full font-bold uppercase">
                      Theatrical Artist
                    </span>
                  </div>

                  {/* Cast Card 5 */}
                  <div className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-indigo-500/30 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group hover-card-glow text-left">
                    <span className="absolute top-4 right-4 text-[9px] font-mono text-indigo-400 font-black">CARD 05</span>
                    <div className="w-10 h-10 rounded-2xl bg-[#06b6d4]/10 text-[#22d3ee] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <User size={18} />
                    </div>
                    <h4 className="text-xs font-mono font-bold tracking-widest text-[#f1f5f9] uppercase mb-1">Rama</h4>
                    <p className="text-sm font-semibold text-white">ரமா</p>
                    <span className="inline-block mt-3 px-2.5 py-0.5 bg-[#06b6d4]/10 border border-[#06b6d4]/20 text-[9px] font-mono tracking-widest text-[#22d3ee] rounded-full font-bold uppercase">
                      Theatrical Character Artist
                    </span>
                  </div>

                  {/* Cast Card 6 */}
                  <div className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-indigo-500/30 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group hover-card-glow text-left">
                    <span className="absolute top-4 right-4 text-[9px] font-mono text-indigo-400 font-black">CARD 06</span>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <User size={18} />
                    </div>
                    <h4 className="text-xs font-mono font-bold tracking-widest text-[#f1f5f9] uppercase mb-1">Priyadarshini</h4>
                    <p className="text-sm font-semibold text-white">பிரியதர்ஷினி</p>
                    <span className="inline-block mt-3 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono tracking-widest text-emerald-300 rounded-full font-bold uppercase">
                      Co-Star Billing
                    </span>
                  </div>

                  {/* Cast Card 7 */}
                  <div className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-indigo-500/30 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group hover-card-glow text-left">
                    <span className="absolute top-4 right-4 text-[9px] font-mono text-indigo-400 font-black">CARD 07</span>
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Sparkles size={18} className="animate-spin-slow" />
                    </div>
                    <h4 className="text-[10px] font-mono font-extrabold tracking-widest text-indigo-300 uppercase mb-1">INTRODUCING • அறிமுகம்</h4>
                    <p className="text-sm font-bold text-white">Paramakudi - பரமகுடி</p>
                    <span className="inline-block mt-3 px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-400/20 text-[9px] font-mono tracking-widest text-indigo-300 rounded-full font-bold uppercase">
                      Official Debut Artist
                    </span>
                  </div>

                  {/* Cast Card 8 */}
                  <div className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-indigo-500/30 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden group hover-card-glow text-left">
                    <span className="absolute top-4 right-4 text-[9px] font-mono text-indigo-400 font-black">CARD 08</span>
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Sparkles size={18} className="animate-pulse" />
                    </div>
                    <h4 className="text-[10px] font-mono font-extrabold tracking-widest text-indigo-300 uppercase mb-1">INTRODUCING • அறிமுகம்</h4>
                    <div className="space-y-1 mt-1 text-[11px] text-white/90 font-mono">
                      <p className="font-bold">• Krithika</p>
                      <p className="font-bold">• Manibala</p>
                      <p className="font-bold">• Vincent</p>
                      <p className="font-bold">• Velladurai</p>
                    </div>
                    <span className="inline-block mt-3 px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-400/20 text-[8px] font-mono tracking-widest text-indigo-300 rounded-full font-bold uppercase">
                      New Face Cast Ensembles
                    </span>
                  </div>
                </div>
              )}

              {/* Department: Direction & Script */}
              {creditsCategory === "direction" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">PRODUCER • தயாரிப்பாளர்</span>
                    <h4 className="text-xl font-bold text-white">A. ALAGU PANDIAN</h4>
                    <h5 className="text-xs text-indigo-300 font-semibold font-mono tracking-wide mt-1">A. அழகு பாண்டியன்</h5>
                  </div>

                  <div className="bg-white/[0.02] border border-indigo-500/10 p-6 rounded-2xl shadow-[inset_0_0_20px_rgba(129,140,248,0.05)]">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">WRITTEN & DIRECTION • கதை திரைக்கதை இயக்கம்</span>
                    <h4 className="text-xl font-bold text-white">Praburam .C</h4>
                    <h5 className="text-xs text-indigo-300 font-semibold font-mono tracking-wide mt-1">பிரபுராம் .C</h5>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">ASSOCIATE DIRECTOR</span>
                    <h4 className="text-base font-bold text-white">Santhosi Meena</h4>
                    <h5 className="text-[10px] text-slate-400 font-mono tracking-wider mt-1">CREATIVE DIVISION HO</h5>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl lg:col-span-2">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">CO-DIRECTOR TEAM</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                      <div>
                        <p className="text-xs font-bold text-[#f1f5f9]">Sandeep Elumalai</p>
                        <span className="text-[8px] text-zinc-500 font-mono block">CO-DIR NODE A</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#f1f5f9]">Vishal</p>
                        <span className="text-[8px] text-zinc-500 font-mono block">CO-DIR NODE B</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#f1f5f9]">Thenral Kumar</p>
                        <span className="text-[8px] text-zinc-500 font-mono block">CO-DIR NODE C</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#f1f5f9]">Gorky Marai Mani</p>
                        <span className="text-[8px] text-zinc-500 font-mono block">CO-DIR NODE D</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">ASSISTANT DIRECTOR</span>
                    <h4 className="text-base font-bold text-white">Velladurai</h4>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl lg:col-span-3">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">CREATIVE PUBLICITY DESIGNS</span>
                    <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                      <span>Raju</span>
                      <span className="text-xs text-zinc-500 font-mono font-light">(Theatrical Key-Art & Publicity Editor)</span>
                    </h4>
                  </div>
                </div>
              )}

              {/* Department: Camera & Art Crew */}
              {creditsCategory === "tech" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">CINEMATOGRAPHY • ஒளிப்பதிவு</span>
                    <h4 className="text-lg font-bold text-white">Iniyan J. Harris</h4>
                    <h5 className="text-xs text-indigo-300 font-semibold font-mono mt-1">இனியன் ஜே ஹாரிஸ்</h5>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">ART DIRECTOR • கலை இயக்குனர்</span>
                    <h4 className="text-lg font-bold text-white">K.Sakthivel</h4>
                    <h5 className="text-xs text-indigo-300 font-semibold font-mono mt-1">K. சக்திவேல்</h5>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">PRODUCTION DESIGNER • தயாரிப்பு வடிவமைப்பு</span>
                    <h4 className="text-lg font-bold text-white">Ananda Kumar</h4>
                    <h5 className="text-xs text-indigo-300 font-semibold font-mono mt-1">ஆனந்தகுமார்</h5>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">STILLS PHOTOGRAPHER • புகைப்படங்கள்</span>
                    <h4 className="text-lg font-bold text-white">Sakthi Priyan</h4>
                    <h5 className="text-xs text-indigo-300 font-semibold font-mono mt-1">சக்தி பிரியன்</h5>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">COSTUME DESIGNERS</span>
                    <h4 className="text-sm font-bold text-white">Aakriti, Santhosi Meena</h4>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">MAKEUP SPECIALIST</span>
                    <h4 className="text-sm font-bold text-white">Durai</h4>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl lg:col-span-3">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-3">ASSISTANT CAMERAMEN DESK</span>
                    <div className="flex flex-wrap gap-2.5">
                      {["Ravi", "Umapathi", "Velumani", "Suresh", "Anbu"].map((name, idx) => (
                        <span key={idx} className="px-3.5 py-1.5 bg-white/5 border border-white/5 font-mono text-xs text-slate-200 rounded-xl font-bold">
                          • {name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl lg:col-span-3">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-3">SET ASSISTANTS SQUAD</span>
                    <div className="flex flex-wrap gap-2.5">
                      {["D.Rakesh", "Vimal", "Mani", "Pushpa Raj"].map((name, idx) => (
                        <span key={idx} className="px-3.5 py-1.5 bg-white/10 border border-white/5 font-mono text-xs text-slate-350 rounded-xl font-semibold">
                          • {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Department: Music & Audio */}
              {creditsCategory === "audio" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                  <div className="bg-white/[0.02] border border-indigo-500/10 p-6 rounded-2xl shadow-[inset_0_0_20px_rgba(129,140,248,0.05)] lg:col-span-2">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-1">MUSIC DIRECTOR & COMPOSER • இசை</span>
                    <h4 className="text-2xl font-black text-white">Sagishna Xavier</h4>
                    <h5 className="text-xs text-indigo-300 font-bold font-mono mt-1">சகிஷ்ணா சேவியர்</h5>
                    <p className="text-[10px] text-slate-500 mt-2 font-mono leading-relaxed">
                      Background score composed, produced, and arranged dynamically by Sagishna Xavier.
                    </p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">LYRICIST • பாடலாசிரியர்</span>
                    <h4 className="text-lg font-bold text-white">Pottuvil Asmin</h4>
                    <h5 className="text-xs text-indigo-300 font-semibold font-mono mt-1">பொத்துவில் அஸ்மின்</h5>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl lg:col-span-3">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-3">VOCALIST ENSEMBLE</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {["Velmurugan", "Gayathry Rajiv", "Arul Pragasam", "Punya Selva", "Sashank S", "MC Chetan"].map((name, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-xl text-center">
                          <p className="text-xs font-bold text-white line-clamp-1">{name}</p>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase mt-0.5 block">Vocal Partner</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl lg:col-span-3">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-3">DIRECTOR OF AUDIOGRAPHY</span>
                    <h4 className="text-base font-bold text-white">Dr.S. Suresh Subramanyaa B.Sc., D.F Tech</h4>
                    <span className="text-[10px] font-mono text-slate-500 uppercase mt-1 block">Head of Film Audio Capture Records</span>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">SOUND EFX DIVISION</span>
                    <h4 className="text-base font-bold text-white">Randy</h4>
                    <span className="text-[9px] font-mono text-slate-500 block uppercase mt-1">Sound FX Designer</span>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">SOUND ASSISTANT</span>
                    <h4 className="text-base font-bold text-white">Anand</h4>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-1">SCORE SERVICES & MIXING</span>
                    <h4 className="text-base font-bold text-white">Kibi</h4>
                    <p className="text-[10px] text-zinc-500 font-mono mt-1 leading-relaxed uppercase">
                      Songs mixed & mastered • Pre-mixed stems engineer
                    </p>
                  </div>
                </div>
              )}

              {/* Department: Post Production & VFX */}
              {creditsCategory === "post" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                  <div className="bg-white/[0.02] border border-indigo-500/10 p-6 rounded-2xl shadow-[inset_0_0_20px_rgba(129,140,248,0.05)] lg:col-span-3">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">POST-PRODUCTION WORKSPACE HUB</span>
                    <h4 className="text-xl font-black text-white">Royal Studios, Chennai</h4>
                    <p className="text-xs text-indigo-300 mt-1 font-mono tracking-wider">
                      HIGH-FIDELITY ATMOS & DCP DISTRIBUTION MASTERING
                    </p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">DI GRADING ARTIST</span>
                    <h4 className="text-base font-bold text-white">Raj.M</h4>
                    <span className="text-[9px] font-mono text-slate-500 block uppercase mt-1">Color Grading HO</span>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">DI CONFORMIST ARTIST</span>
                    <h4 className="text-base font-bold text-white">Mathesh</h4>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">VFX RIGGING SUPERVISOR</span>
                    <h4 className="text-base font-bold text-white">Karthik Seyyon</h4>
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase mt-1">Visual Effects Editor</span>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl lg:col-span-3">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">STUDIO OFFICE ASST</span>
                    <h4 className="text-sm font-bold text-white">Thirumpoondi Jayaseelan</h4>
                  </div>
                </div>
              )}

              {/* Department: Action & Dance */}
              {creditsCategory === "action" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="bg-white/[0.02] border border-indigo-500/10 p-6 rounded-2xl shadow-[inset_0_0_20px_rgba(129,140,248,0.05)]">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">STUNT CHOREOGRAPHER • சண்டை பயிற்சி</span>
                    <h4 className="text-lg font-bold text-white">Power Pandi</h4>
                    <h5 className="text-xs text-indigo-300 font-semibold font-mono mt-1">பவர் பாண்டி</h5>
                    <span className="inline-block mt-3 px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-mono tracking-widest text-indigo-300 rounded-full font-bold uppercase">
                      Action Stunt Supervisor
                    </span>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-2">DANCE CHOREOGRAPHER • நடனம்</span>
                    <h4 className="text-lg font-bold text-white">Sasi Kumar</h4>
                    <h5 className="text-xs text-indigo-300 font-semibold font-mono mt-1">சசிகுமார்</h5>
                    <span className="inline-block mt-3 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono tracking-widest text-emerald-300 rounded-full font-bold uppercase">
                      Choreography Division Head
                    </span>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl md:col-span-2">
                    <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-3">DANCE CHOREOGRAPHY ASSISTANTS</span>
                    <div className="flex flex-wrap gap-2.5">
                      {["Prince", "Balaji", "Victor", "Priya"].map((name, idx) => (
                        <span key={idx} className="px-4 py-2 bg-white/5 border border-white/5 font-mono text-xs text-slate-200 rounded-xl font-bold">
                          • {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        </section>
      )}

      {/* Special Features & Related Media Assets Subsection */}
      {videos.filter((v) => v.title.toLowerCase().includes(movie.title.toLowerCase())).length > 0 && (
        <section className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-16 mt-12 pb-12">
          <AnimatedSection>
            <h2 className="text-2xl font-display font-black text-white uppercase tracking-wider mb-2">Special Features & Video Gallery</h2>
            <p className="text-xs text-slate-400 mb-8 font-light">Explore official tracks, thrilling sneak peeks, special promotional shorts, and public responses for this film.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos
                .filter((v) => v.title.toLowerCase().includes(movie.title.toLowerCase()))
                .map((video, idx) => (
                  <AnimatedSection key={video.id} delay={idx * 0.05}>
                    <VideoCard video={video} />
                  </AnimatedSection>
                ))}
            </div>
          </AnimatedSection>
        </section>
      )}
    </div>
  );
}
