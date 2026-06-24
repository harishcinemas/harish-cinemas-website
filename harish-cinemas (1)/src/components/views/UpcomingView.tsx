import React from "react";
import { movies } from "../../data/movies";
import AnimatedSection from "../core/AnimatedSection";
import SectionHeading from "../core/SectionHeading";
import MovieCard from "../ui/MovieCard";

export default function UpcomingView() {
  const track = movies.filter((m) => m.status !== "Released");

  return (
    <div className="min-h-screen pb-24 px-6 max-w-7xl mx-auto pt-24 animate-fade-in relative z-10">
      <SectionHeading 
        title="Future Horizon Slate" 
        subtitle="Comprehensive assessment of conceptual intellectual properties currently inside our pipeline architecture." 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {track.map((movie, idx) => (
          <AnimatedSection key={movie.slug} delay={idx * 0.05}>
            <MovieCard movie={movie} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
