import React from "react";
import { ArrowRight, Quote, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { movies } from "../../data/movies";
import { videos } from "../../data/videos";
import { news } from "../../data/news";
import AnimatedSection from "../core/AnimatedSection";
import SectionHeading from "../core/SectionHeading";
import MovieCard from "../ui/MovieCard";
import VideoCard from "../ui/VideoCard";
import NewsCard from "../ui/NewsCard";
import CTASection from "../ui/CTASection";

function CinematicSpotlights() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Left Searchlight Beam */}
      <motion.div
        initial={{ rotate: -35, opacity: 0.15 }}
        animate={{
          rotate: [-45, -15, -45],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: 0, originY: 1 }}
        className="absolute bottom-0 left-0 w-[45vw] h-[110vh] bg-gradient-to-tr from-indigo-600/0 via-indigo-500/10 to-indigo-400/25 blur-[70px]"
      />

      {/* Right Searchlight Beam */}
      <motion.div
        initial={{ rotate: 35, opacity: 0.18 }}
        animate={{
          rotate: [45, 15, 45],
          opacity: [0.18, 0.45, 0.18],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: 1, originY: 1 }}
        className="absolute bottom-0 right-0 w-[45vw] h-[110vh] bg-gradient-to-tl from-purple-600/0 via-purple-500/10 to-indigo-500/25 blur-[70px]"
      />

      {/* Accent spotlight core glow to mimic lens flare source */}
      <div className="absolute bottom-0 left-4 w-4 h-4 bg-indigo-400/30 rounded-full blur-[8px]" />
      <div className="absolute bottom-0 right-4 w-4 h-4 bg-purple-400/30 rounded-full blur-[8px]" />
    </div>
  );
}

export default function HomeView() {
  const featuredMovie = movies.find(m => m.isFeatured) || movies[0];
  const upcomingMovies = movies.filter(m => m.status !== "Released").slice(0, 3);

  // Stateful interactive Testimonial Carousel
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const testimonials = [
    {
      quote: "Harish Cinemas is rewriting the rulebook of South Indian independent cinema. Naruvee proves that raw narrative intent beats big-budget excess every single time.",
      author: "The Hindu Cinema",
      role: "Chief Press Editorial Review"
    },
    {
      quote: "DR. A. Harish and producer Alagu Pandian are spearheading a quiet renaissance in Tamil storytelling. A masterclass in sincere casting and authentic regional worldbuilding.",
      author: "Vikatan Journal Reviews",
      role: "Principal Critic"
    },
    {
      quote: "A breath of fresh, uncompromising creative air. The level of cinematic discipline, acoustic precision, and script-first dedication in Nalla Padam is outstanding.",
      author: "Behindwoods Industry Forum",
      role: "Colleague Spotlights Desk"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // FAQ interactive state
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const faqItems = [
    {
      question: "What is the artistic philosophy behind Harish Cinemas?",
      answer: "We adhere strictly to 'Stories That Inspire. Cinema That Matters.' Our focus is purely script-first independent Tamil storytelling, prioritizing raw human connections, authentic regional truths, and emotional sincerity over standardized box-office formulas."
    },
    {
      question: "Can independent screenwriters submit drama or thriller scripts?",
      answer: "Yes! We actively support collaborative Tamil scripting. Script outlines and narrative structures can be submitted for review under strict creative guidelines via our corporate Contact Desk at Adyar, Chennai."
    },
    {
      question: "Where are the premium post-production operations executed?",
      answer: "To ensure atmospheric depth, all critical technical operations including DI color grading, Atmos sound mix, pre-mixed stems, and Dolby Atmos mastering are executed in collaboration with leading technical houses like Royal Studios, Chennai."
    },
    {
      question: "What makes 'Nalla Padam' a landmark release for the banner?",
      answer: "'Nalla Padam' represents our flagship rustic drama. Centering a magnificent cast of seasoned character actors and introducing fresh local face ensembles from Paramakudi, it represents our most high-impact cinematic ledger to date."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-32 pb-24 animate-fade-in relative z-10">
      {/* Hero Banner Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden rounded-[36px] mx-auto max-w-[95%] border border-white/5 mt-4 shadow-3xl">
        <div className="absolute inset-0 bg-[#030305]/75 z-10 backdrop-blur-xs" />
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1920&q=80"
          alt="Harish Cinemas Cinematic Canvas"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover scale-102"
        />
        <CinematicSpotlights />
        <div className="relative z-20 text-center max-w-4xl px-6 flex flex-col items-center">
          <AnimatedSection variant="scaleIn">
            <img 
              src="/logo.svg" 
              alt="Harish Cinemas Crest" 
              className="w-24 h-24 md:w-32 md:h-32 object-contain mx-auto mb-6 filter drop-shadow-[0_4px_24px_rgba(129,140,248,0.4)] animate-pulse"
              style={{ animationDuration: "4s" }}
              referrerPolicy="no-referrer"
            />
            <h1 className="text-5xl md:text-8xl font-display font-black tracking-widest text-white mb-4">
              HARISH <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-extrabold">CINEMAS</span>
            </h1>
            <p className="text-xs md:text-sm font-mono tracking-[0.35em] uppercase text-slate-300/95 mb-10">
              Stories That Inspire. Cinema That Matters.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <a 
                href="#/productions" 
                className="px-8 py-4 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-xl shadow-indigo-500/20 text-xs font-bold uppercase tracking-widest rounded-2xl hover-primary-glow shimmer-sweep w-full sm:w-auto"
              >
                View Productions
              </a>
              <a 
                href="#/contact" 
                className="px-8 py-4 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-white hover:text-[#030305] hover-primary-glow transition-all duration-300 w-full sm:w-auto"
              >
                Contact Us
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Overview */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection variant="slideRight">
            <span className="text-xs font-mono tracking-widest uppercase text-indigo-400 font-extrabold block mb-2">Our Manifesto</span>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">Crafting Lasting Legacies Across Screens</h2>
            <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed mb-6">
              Based proudly in Chennai, Harish Cinemas coordinates premium, highly analytical artistic execution workflows that empower visionary writers and directors.
            </p>
            <a href="#/about" className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#f1f5f9] hover:text-indigo-300 uppercase transition-colors group">
              <span>Read Studio Profile</span>
              <ArrowRight size={14} className="text-indigo-400 group-hover:translate-x-1 duration-200" />
            </a>
          </AnimatedSection>
          <AnimatedSection variant="slideLeft" className="relative h-[400px] bg-white/5 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80" 
              alt="Camera lens focus" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
              loading="lazy"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Production Showcase */}
      {featuredMovie && (
        <section className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Featured Production" subtitle="Our flagbearer cinematic property capturing global creative attention." />
          <AnimatedSection className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[36px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-2xl">
            <div className="relative h-[300px] lg:h-auto lg:col-span-7">
              <img 
                src={featuredMovie.bannerUrl} 
                alt={featuredMovie.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#050508]/85 via-transparent to-transparent" />
            </div>
            <div className="p-8 md:p-12 lg:col-span-5 flex flex-col justify-center">
              <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-2 block font-mono">Now Streaming / Critically Acclaimed</span>
              <h3 className="text-xl md:text-3xl font-extrabold text-white mb-4 uppercase tracking-tight">{featuredMovie.title}</h3>
              <p className="text-xs md:text-sm text-slate-300/80 font-light leading-relaxed mb-8">{featuredMovie.synopsis}</p>
              <a href={`#/productions/${featuredMovie.slug}`} className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-xl shadow-indigo-500/20 font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:scale-[1.03] transition-all self-start">
                Explore Crew & Media Brief
              </a>
            </div>
          </AnimatedSection>
        </section>
      )}

      {/* Upcoming Slate Project Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <SectionHeading title="Upcoming Masterpieces" subtitle="Sneak preview into our dynamic long-range narrative project cycles." />
          <a href="#/upcoming-projects" className="text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-white flex items-center space-x-2 transition-colors mt-4 sm:mt-0 font-mono group">
            <span>View Full Slate</span>
            <ArrowRight size={14} className="text-indigo-400 group-hover:translate-x-1 duration-200" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingMovies.map((movie, idx) => (
            <AnimatedSection key={movie.slug} delay={idx * 0.1}>
              <MovieCard movie={movie} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Latest Videos Carousel Block */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <SectionHeading title="Teasers & Extras" subtitle="Instant rendering of exclusive high fidelity audiovisual elements." />
          <a href="#/videos" className="text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-white flex items-center space-x-2 transition-colors mt-4 sm:mt-0 font-mono group">
            <span>Explore All Videos</span>
            <ArrowRight size={14} className="text-indigo-400 group-hover:translate-x-1 duration-200" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.slice(0, 4).map((video, idx) => (
            <AnimatedSection key={video.id} delay={idx * 0.1}>
              <VideoCard video={video} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Studio News Block */}
      <section className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Media Center Updates" subtitle="Official press distribution materials detailing asset architectures." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.slice(0, 2).map((item, idx) => (
            <AnimatedSection key={item.slug} delay={idx * 0.1}>
              <NewsCard item={item} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Testimonials Editorial Carousel */}
      <section className="max-w-5xl mx-auto px-6" id="testimonials">
        <SectionHeading title="Press & Industry Acclaim" subtitle="Critical reviews, press mentions, and words from respected colleagues." />
        <AnimatedSection variant="fadeUp" className="relative mt-8">
          <div className="bg-gradient-to-b from-slate-900/40 to-slate-950/40 border border-white/5 rounded-[32px] p-8 md:p-14 relative overflow-hidden backdrop-blur-md">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Testimonial Quote Icon */}
            <div className="mb-6 flex justify-between items-center">
              <div className="bg-indigo-500/10 p-3.5 rounded-2xl border border-indigo-500/20 text-indigo-400">
                <Quote size={24} className="transform rotate-180" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold">
                PRESS BRIEFING • ITEM {currentTestimonial + 1}/{testimonials.length}
              </span>
            </div>

            {/* Carousel Item with State Linkage */}
            <div className="min-h-[160px] md:min-h-[120px] flex flex-col justify-center animate-fade-in transition-all duration-300">
              <p className="text-lg md:text-2xl font-light text-slate-100 leading-relaxed italic mb-8">
                &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <div>
                  <h4 className="font-display font-bold text-white text-base tracking-wide">
                    {testimonials[currentTestimonial].author}
                  </h4>
                  <p className="text-xs text-indigo-400 font-mono mt-0.5">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>

                {/* Handlers Indicator Navigation */}
                <div className="flex items-center space-x-3 select-none">
                  <button
                    onClick={prevTestimonial}
                    id="prev-testimonial-btn"
                    className="p-3 bg-white/[0.02] hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer active:scale-95"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    id="next-testimonial-btn"
                    className="p-3 bg-white/[0.02] hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer active:scale-95"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bullet Indicators */}
          <div className="flex justify-center space-x-2.5 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentTestimonial === idx ? "w-8 bg-indigo-500" : "w-2 bg-white/15 hover:bg-white/30"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Structured FAQ Section */}
      <section className="max-w-4xl mx-auto px-6" id="faq-section">
        <SectionHeading title="Frequently Asked Questions" subtitle="Official press desk responses regarding submissions, artistic directives, and workspace systems." />
        <AnimatedSection variant="fadeUp" className="mt-12 space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white/[0.01] border border-white/5 rounded-2xl hover:border-white/10 transition-colors duration-350 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                  id={`faq-toggle-${idx}`}
                >
                  <span className="text-sm md:text-base font-bold text-slate-100 pr-4">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-400" : ""}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[250px] opacity-100 border-t border-white/5" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="p-6 text-xs md:text-sm text-slate-350 leading-relaxed font-light">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </AnimatedSection>
      </section>

      {/* Dynamic Action Trigger Component */}
      <CTASection />
    </div>
  );
}
