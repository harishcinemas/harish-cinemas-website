import React, { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-[100]">
      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-75 shadow-[0_0_8px_rgba(99,102,241,0.5)]" style={{ width: `${progress}%` }} />
    </div>
  );
}
