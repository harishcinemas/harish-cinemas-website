import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 p-3 bg-white/10 backdrop-blur-md text-white border border-white/15 rounded-full hover:bg-white hover:text-[#050508] hover:border-white transition-all duration-300 z-50 shadow-2xl cursor-pointer"
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
