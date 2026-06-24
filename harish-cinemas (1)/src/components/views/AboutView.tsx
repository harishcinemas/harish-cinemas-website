import React from "react";
import { Shield, Eye, Target } from "lucide-react";
import { motion } from "motion/react";
import { team } from "../../data/team";
import { TeamMember } from "../../types";
import AnimatedSection from "../core/AnimatedSection";
import SectionHeading from "../core/SectionHeading";
import Timeline from "../ui/Timeline";

function TeamMemberImage({ member }: { member: TeamMember }) {
  const [imgSrc, setImgSrc] = React.useState<string>(member.imageUrl);

  React.useEffect(() => {
    setImgSrc(member.imageUrl);
  }, [member.imageUrl]);

  const handleError = () => {
    const seed = member.name.replace(/\s+/g, "").toLowerCase();
    setImgSrc(`https://picsum.photos/seed/${seed}/600/800`);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950/20">
      <motion.img 
        src={imgSrc} 
        alt={member.name} 
        onError={handleError}
        referrerPolicy="no-referrer"
        initial={{ opacity: 0, scale: 1.12, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        whileHover={{ scale: 1.05 }}
        transition={{ 
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0 w-full h-full object-cover" 
        loading="lazy"
      />
    </div>
  );
}

export default function AboutView() {
  const values = [
    { icon: <Eye className="text-indigo-400" size={24} />, title: "Absolute Vision", desc: "We prioritize complete artistic control to defend the original core integrity designed by screenwriters." },
    { icon: <Target className="text-indigo-400" size={24} />, title: "Cultural Integration", desc: "Exporting foundational Tamil storytelling matrices into premium international screening pipelines." },
    { icon: <Shield className="text-indigo-400" size={24} />, title: "Structural Integrity", desc: "Ensuring highly transparent fiscal asset distributions across physical production frameworks." }
  ];

  return (
    <div className="space-y-32 pb-24 animate-fade-in pt-12 relative z-10">
      {/* Subpage Banner Header */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden rounded-[36px] mx-auto max-w-[95%] border border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-[#050508]/80 z-10 backdrop-blur-sm" />
        <motion.img 
          src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1920&q=80" 
          alt="Panoramic vintage cinema array" 
          referrerPolicy="no-referrer"
          initial={{ opacity: 0, scale: 1.1, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="relative z-20 text-center px-6">
          <AnimatedSection variant="fadeUp">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-white mb-2">The Studio Identity</h1>
            <p className="text-xs font-mono text-indigo-300 uppercase tracking-widest">Our DNA • Milestones • Governance</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Corporate Corporate Narrative */}
      <section className="max-w-5xl mx-auto px-6 text-center space-y-6">
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase mb-4">Disrupting Standard Distribution Landscapes</h2>
          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed max-w-3xl mx-auto">
            Harish Cinemas operates out of Adyar, Chennai, as an architectural content hub. We bridge creative scripting methods with modern acoustic configurations to produce cinema structures that live across generations. Our operations run on transparency, technical rigor, and deep respect for global viewers.
          </p>
        </AnimatedSection>
      </section>

      {/* Structural Value Sets */}
      <section className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Our Operational Foundation" centered />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.1} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 space-y-4 shadow-xl">
              <div className="mb-4">{v.icon}</div>
              <h3 className="text-base font-extrabold text-white uppercase tracking-tight">{v.title}</h3>
              <p className="text-xs text-slate-300/80 font-light leading-relaxed">{v.desc}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Historic Implementation Track */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white/[0.02] backdrop-blur-md border-y border-white/10 rounded-[44px]">
        <SectionHeading title="Evolution Matrix" centered />
        <Timeline />
      </section>

      {/* Management Layer Profile Display */}
      <section className="max-w-7xl mx-auto px-6">
        <SectionHeading title="The Architectural Mindset" subtitle="Meet the core creative directors organizing Harish Cinemas slate schedules." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {team.map((member, idx) => (
            <AnimatedSection key={member.name} variant={idx % 2 === 0 ? "slideRight" : "slideLeft"} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden flex flex-col sm:flex-row shadow-xl">
              <div className="relative h-64 sm:h-auto sm:w-2/5 min-h-[250px] bg-slate-950/40">
                <TeamMemberImage member={member} />
              </div>
              <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider mb-1 block font-extrabold">{member.role}</span>
                <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-tight">{member.name}</h4>
                <p className="text-xs text-slate-300/85 font-light leading-relaxed">{member.bio}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
