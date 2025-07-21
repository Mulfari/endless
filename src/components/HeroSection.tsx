"use client";

import { useEffect, useRef, useState } from "react";

const heroVideos = [
  "/herosection/1v.mp4",
  "/herosection/2v.mp4",
  "/herosection/3v.mp4",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  // Arreglo de refs que puede contener null inicialmente
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Cambiar vídeo cada 6s con transiciones más lentas
  useEffect(() => {
    const id = window.setInterval(() => {
      const next = (current + 1) % heroVideos.length;
      const nextVid = videoRefs.current[next];
      if (nextVid) {
        nextVid.currentTime = 0;
        nextVid.play().catch(() => {});
      }
      setCurrent(next);
    }, 6000);
    return () => clearInterval(id);
  }, [current]);

  // Al montar, pausamos todos y pre-cargamos, luego arrancamos el primero
  useEffect(() => {
    videoRefs.current.forEach((vid) => {
      if (vid) {
        vid.pause();
        vid.preload = "auto";
      }
    });
    const first = videoRefs.current[0];
    if (first) {
      first.play().catch(() => {});
      // Trigger animaciones después de un breve delay
      setTimeout(() => setIsLoaded(true), 500);
    }
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Vídeos superpuestos con transiciones cinematográficas */}
      <div className="absolute inset-0 w-full h-full">
        {heroVideos.map((src, idx) => (
          <video
            key={idx}
            ref={el => { videoRefs.current[idx] = el; }}
            src={src}
            muted
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: idx === current ? 1 : 0,
              transition: "opacity 4s ease-in-out",
            }}
          />
        ))}
      </div>

      {/* Gradientes overlay mejorados */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10" />

      {/* Elementos decorativos dorados */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#D4AF37]/5 to-transparent rounded-full blur-3xl animate-pulse z-10" />
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-l from-[#D4AF37]/5 to-transparent rounded-full blur-3xl animate-pulse z-10" style={{ animationDelay: "2s" }} />

      {/* Contenido principal con animaciones elegantes */}
      <div className={`relative z-30 flex flex-col items-center justify-center text-center px-6 w-full pt-20 transition-all duration-1500 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        
        {/* Título principal - diseño moderno y elegante */}
        <div className="mb-16 animate-slide-up">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-[0.15em] uppercase">
              Endless Travels
            </h1>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="w-12 h-[1px] bg-[#D4AF37]/60"></div>
              <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-light">
                Luxury Experiences
              </span>
              <div className="w-12 h-[1px] bg-[#D4AF37]/60"></div>
            </div>
          </div>
        </div>

        {/* Descripción elegante */}
        <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto mb-16 leading-relaxed text-center animate-fade-in-delay">
          Experiencias de lujo únicas para quienes buscan lo extraordinario en cada viaje
        </p>

        {/* Barra de búsqueda rediseñada premium */}
        <div className="group relative animate-fade-in-delay-2">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
          <div className="relative bg-black/40 backdrop-blur-xl rounded-full border border-[#D4AF37]/30 px-8 py-4 max-w-lg w-full mx-auto flex items-center gap-4 hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-lg hover:shadow-[#D4AF37]/20">
            <div className="w-6 h-6 text-[#D4AF37] flex-shrink-0">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-white/90 font-light text-lg md:text-xl flex-1 text-left">
              ¿A dónde te gustaría ir?
            </span>
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Indicador de scroll reposicionado */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 animate-fade-in-delay-3">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/50 text-xs font-light tracking-wider uppercase">
            Scrollea para continuar
          </span>
          <div className="animate-bounce">
            <svg className="w-4 h-4 text-[#D4AF37]/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-slow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
          50% { text-shadow: 0 0 30px rgba(212, 175, 55, 0.5), 0 0 40px rgba(212, 175, 55, 0.3); }
        }
        .animate-slide-up { animation: slide-up 1.2s ease-out; }
        .animate-fade-in-slow { animation: fade-in-slow 1.5s ease-out; }
        .animate-fade-in-delay { animation: fade-in-delay 1s ease-out 0.5s both; }
        .animate-fade-in-delay-2 { animation: fade-in-delay 1s ease-out 1s both; }
        .animate-glow { animation: glow 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
