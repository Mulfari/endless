"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const node = sectionRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black py-14 md:py-18 overflow-hidden"
    >
      {/* Línea dorada decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div
          className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-[#D4AF37] text-[11px] md:text-xs font-light tracking-[0.35em] uppercase">
                Endless Group
              </span>
              <div className="w-10 h-[1px] bg-gradient-to-r from-[#D4AF37]/60 to-transparent" />
            </div>

            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-tight leading-tight">
              Lujo hecho a medida.
            </h2>

            <p className="mt-3 text-white/60 text-sm md:text-base font-light leading-relaxed">
              Experiencias exclusivas diseñadas con precisión, discreción y detalle.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {["Exclusividad", "Personalización", "Atención 24/7"].map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/80 text-xs md:text-sm font-light backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Línea dorada decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
    </section>
  );
}

