"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface Experience {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  video: string;
  poster: string;
  exclusives: string[];
}

const experiences: Experience[] = [
  {
    id: 0,
    title: "Travels",
    subtitle: "Viajes diseñados con precisión",
    description: "Itinerarios a medida y acceso privilegiado. Convertimos cada trayecto en una experiencia extraordinaria.",
    video: "/herosection/1v.mp4",
    poster: "/herosection/1.jpeg",
    exclusives: ["Itinerario a medida", "Transporte premium", "Hoteles exclusivos"],
  },
  {
    id: 1,
    title: "Lifestyle",
    subtitle: "Lujo en el día a día",
    description: "Acceso a bienestar, gastronomía y entretenimiento con curaduría impecable.",
    video: "/herosection/2v.mp4",
    poster: "/herosection/2.jpeg",
    exclusives: ["Reservas imposibles", "Eventos privados", "Wellness & spa"],
  },
  {
    id: 2,
    title: "Business",
    subtitle: "Estrategia y red",
    description: "Acompañamiento para oportunidades y expansión. Una red que abre puertas.",
    video: "/herosection/3v.mp4",
    poster: "/herosection/3.jpeg",
    exclusives: ["Networking", "Alianzas", "Gestión ejecutiva"],
  },
  {
    id: 3,
    title: "Capital",
    subtitle: "Visión de largo plazo",
    description: "Soporte en planificación y estructura para mover capital con confianza.",
    video: "/herosection/1v.mp4",
    poster: "/herosection/1.jpeg",
    exclusives: ["Estructura", "Riesgo", "Visión patrimonial"],
  },
];

export default function ExperienciasSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Sync scroll position with activeIndex on mobile
  useEffect(() => {
    if (isDesktop || !scrollRef.current) return;

    const handleScroll = () => {
      const container = scrollRef.current;
      if (!container) return;
      const scrollPosition = container.scrollLeft;
      const width = container.offsetWidth;
      const newIndex = Math.round(scrollPosition / width);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < experiences.length) {
        setActiveIndex(newIndex);
      }
    };

    const container = scrollRef.current;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isDesktop, activeIndex]);

  // Handle Video Auto-Play for Active Panel
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([key, video]) => {
      const idx = Number(key);
      if (!video) return;
      if (idx === activeIndex) {
        video.play().catch(() => { });
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  return (
    <section
      ref={scrollRef}
      className={`relative w-full h-[100svh] bg-black flex
        ${isDesktop
          ? "flex-row overflow-hidden"
          : "flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        }
      `}
    >
      {experiences.map((exp, idx) => {
        const isActive = activeIndex === idx;

        return (
          <div
            key={exp.id}
            onMouseEnter={() => isDesktop && setActiveIndex(idx)}
            onClick={() => !isDesktop && setActiveIndex(idx)}
            className={`relative flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] overflow-hidden cursor-pointer
              ${isDesktop
                ? (isActive ? "flex-[3.5] grayscale-0" : "flex-[0.8] grayscale-[0.8] hover:grayscale-0")
                : "w-full snap-center grayscale-0"
              }
              ${isDesktop ? "h-full border-r border-white/5 last:border-r-0" : "h-full"}
            `}
          >
            {/* Background Video/Image */}
            <div className="absolute inset-0 z-0">
              <video
                ref={(el) => { videoRefs.current[idx] = el; }}
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isActive ? "scale-105" : "scale-100"}`}
                poster={exp.poster}
              >
                <source src={exp.video} type="video/mp4" />
              </video>
              <div className={`absolute inset-0 z-10 transition-colors duration-700 ${isActive ? "bg-black/40" : "bg-black/70 hover:bg-black/50"}`} />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 h-full w-full p-8 lg:p-10 flex flex-col justify-end">

              {/* Inactive Label (Desktop Vertical) */}
              <div
                className={`hidden lg:flex absolute inset-0 items-center justify-center transition-opacity duration-500 pointer-events-none ${isActive ? "opacity-0" : "opacity-100 delay-200"}`}
              >
                <span className="text-white text-2xl tracking-[0.2em] font-light uppercase -rotate-90 whitespace-nowrap">
                  {exp.title}
                </span>
                <span className="absolute bottom-10 text-[#D4AF37] text-lg font-serif">{`0${idx + 1}`}</span>
              </div>

              {/* Active Content */}
              <div
                className={`transition-all duration-700 flex flex-col justify-end h-auto
                  ${isActive
                    ? "opacity-100 translate-y-0 delay-100"
                    : (isDesktop ? "opacity-0 translate-y-8 pointer-events-none absolute bottom-0 left-0 w-full p-10" : "opacity-0 translate-y-4 pointer-events-none")
                  }
                `}
              >
                <div className="max-w-xl animate-fade-in-up">
                  {/* Number & Line */}
                  <div className="flex items-center gap-4 mb-3 lg:mb-4">
                    <span className="text-[#D4AF37] font-serif text-lg lg:text-xl">{`0${idx + 1}`}</span>
                    <div className="w-12 h-[1px] bg-[#D4AF37]/60" />
                  </div>

                  {/* Main Titles */}
                  <h2 className="text-4xl lg:text-7xl font-thin text-white font-serif mb-2 tracking-tight">
                    {exp.title}<span className="text-[#D4AF37]">.</span>
                  </h2>
                  <p className="text-lg lg:text-xl text-white/90 font-light italic mb-6">
                    {exp.subtitle}
                  </p>

                  {/* Details (Responsive Visibility) */}
                  <p className="text-white/70 text-sm lg:text-base leading-relaxed mb-8 max-w-md line-clamp-3 sm:line-clamp-none">
                    {exp.description}
                  </p>

                  {/* Feature List (Compact) */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
                    {exp.exclusives.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span className="text-xs lg:text-sm text-white/80 tracking-wide">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div>
                    <Link
                      href="/contacto"
                      className="inline-flex items-center gap-3 group"
                    >
                      <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </span>
                      <span className="text-xs uppercase tracking-[0.2em] text-white group-hover:text-[#D4AF37] transition-colors">
                        Explorar
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Mobile Indication Progress */}
      {!isDesktop && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {experiences.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? "bg-[#D4AF37] w-6" : "bg-white/30"}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}