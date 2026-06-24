import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import AnimatedSection from "../core/AnimatedSection";
import SectionHeading from "../core/SectionHeading";
import ContactForm from "../ui/ContactForm";

export default function ContactView() {
  const details = [
    { 
      icon: <MapPin className="text-indigo-400" size={20} />, 
      text: "New No: 14, Old No: 10A, Parameshwari Nagar, 3rd Street, Adyar, Chennai – 600020",
      link: "https://www.google.com/maps?vet=10CAAQoqAOahcKEwj43PO0jZOVAxUAAAAAHQAAAAAQEw..i&pvq=Cg0vZy8xMXo5MzFmank0IhQKDmhhcmlzaCBjaW5lbWFzEAIYAw&lqi=Cg5oYXJpc2ggY2luZW1hc5IBEGNvcnBvcmF0ZV9vZmZpY2U&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3a52675ce8191cf1:0x7d13a185a0aebd24"
    },
    { 
      icon: <Phone className="text-indigo-400" size={20} />, 
      text: "+91 98410 20247",
      link: "https://wa.me/919841020247?text=Hello%20Harish%20Cinemas%2C%20I%20would%20like%20to%20know%20more%20about%20your%20productions."
    },
    { 
      icon: <Mail className="text-indigo-400" size={20} />, 
      text: "harishcinemas1977@gmail.com",
      link: "mailto:harishcinemas1977@gmail.com"
    },
    { 
      icon: <Globe className="text-indigo-400" size={20} />, 
      text: "Operational Base: Chennai, Tamil Nadu, India",
      link: null
    }
  ];

  return (
    <div className="min-h-screen pb-24 px-6 max-w-7xl mx-auto pt-24 animate-fade-in relative z-10">
      <SectionHeading 
        title="Operational Nexus Desk" 
        subtitle="Initialize direct communications regarding theatrical licensing, co-production slates, and asset tracking." 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Infrastructure Details Sidebar */}
        <div className="lg:col-span-5 space-y-8">
          <AnimatedSection variant="slideRight" className="space-y-6">
            <h3 className="text-lg font-black text-white uppercase tracking-tight">Corporate Hub Terminals</h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Our central production workspace handles standard asset tracking, media distributions, and scheduling matrices.
            </p>
            <div className="space-y-4">
              {details.map((item, i) => {
                const OuterComponent = item.link ? "a" : "div";
                const extraProps = item.link 
                  ? { 
                      href: item.link, 
                      target: "_blank", 
                      rel: "noopener noreferrer", 
                      className: "flex items-start space-x-4 bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 hover:border-indigo-500/30 backdrop-blur-md shadow-md hover-primary-glow transition-all cursor-pointer w-full text-left block" 
                    } 
                  : { 
                      className: "flex items-start space-x-4 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-md shadow-md w-full" 
                    };
                
                return (
                  <OuterComponent key={i} {...extraProps}>
                    <div className="mt-1 flex-shrink-0">{item.icon}</div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light flex-grow">{item.text}</p>
                  </OuterComponent>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Fully Integrated Iframe Map Endpoint */}
          <AnimatedSection variant="fadeUp" className="w-full h-64 rounded-3xl overflow-hidden border border-white/10 shadow-xl">
            <iframe
              src="https://maps.google.com/maps?q=Harish%20Cinemas,%20Parameshwari%20Nagar,%20Adyar,%20Chennai&t=&z=16&ie=UTF8&iwloc=&output=embed"
              title="Harish Cinemas location on Google Maps"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </AnimatedSection>
        </div>

        {/* Dynamic Client Form Element Wrapper */}
        <div className="lg:col-span-7 font-sans">
          <AnimatedSection variant="slideLeft">
            <ContactForm />
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
