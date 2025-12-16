"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface Experience {
  title: string;
  subtitle: string;
  description: string;
  video: string;
  location: string;
  price: string;
  season: string;
  duration: string;
  exclusives: string[];
}

const experiences: Experience[] = [
  {
    title: "Travels",
    subtitle: "Viajes diseñados con precisión",
    description: "Itinerarios a medida, logística impecable y acceso privilegiado. Convertimos cada trayecto en una experiencia fluida, privada y extraordinaria.",
    video: "/herosection/1v.mp4",
    location: "Travel",
    price: "€12,500",
    season: "Abril - Octubre",
    duration: "5-7 días",
    exclusives: ["Itinerario a medida", "Transporte premium", "Hoteles y villas exclusivas", "Concierge 24/7"],
  },
  {
    title: "Lifestyle",
    subtitle: "Lujo que se vive en el día a día",
    description: "Acceso a experiencias, bienestar, gastronomía y entretenimiento con curaduría impecable. Lo excepcional, sin esfuerzo.",
    video: "/herosection/2v.mp4",
    location: "Lifestyle",
    price: "€18,900",
    season: "Todo el año",
    duration: "7-10 días",
    exclusives: ["Reservas imposibles", "Eventos privados", "Wellness & spa premium", "Gastronomía de autor"],
  },
  {
    title: "Business",
    subtitle: "Estrategia, red y ejecución",
    description: "Acompañamiento para oportunidades, alianzas y expansión. Un enfoque discreto y orientado a resultados, con una red que abre puertas.",
    video: "/herosection/3v.mp4",
    location: "Business",
    price: "€15,200",
    season: "Diciembre - Marzo",
    duration: "6-8 días",
    exclusives: ["Networking estratégico", "Alianzas y partners", "Gestión ejecutiva", "Operaciones y soporte"],
  },
  {
    title: "Capital",
    subtitle: "Estructura y visión de largo plazo",
    description: "Soporte en la organización de vehículos, planificación y toma de decisiones con visión. Construimos claridad para mover capital con confianza.",
    video: "/herosection/1v.mp4",
    location: "Capital",
    price: "€22,000",
    season: "Octubre - Abril",
    duration: "5-8 días",
    exclusives: ["Planificación y estructura", "Estrategia de riesgo", "Visión patrimonial", "Soporte confidencial"],
  },
];

export default function ExperienciasSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  // Controlar reproducción de videos
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === activeIndex) {
          video.currentTime = 0;
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-black overflow-hidden transition-all duration-1000 pt-20"
    >
      {/* Línea dorada ultra-fina durante transiciones */}
      <div className={`absolute top-20 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-1000 z-40 ${isTransitioning ? 'opacity-100 shadow-lg shadow-[#D4AF37]/50' : 'opacity-0'
        }`} />

      {/* Transition overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-50 animate-pulse" />
      )}

      {/* Background decoration con efectos mejorados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/10 to-orange-600/5 rounded-full blur-3xl transition-all duration-1000 ${isTransitioning ? 'animate-pulse scale-105' : 'animate-pulse'
          }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-600/5 rounded-full blur-3xl transition-all duration-1000 delay-500 ${isTransitioning ? 'animate-pulse scale-105' : 'animate-pulse delay-1000'
          }`} />
      </div>

      {/* Video Backgrounds con transiciones mejoradas */}
      <div className="absolute inset-0 overflow-hidden">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-[4000ms] ease-out ${idx === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <video
              ref={el => { videoRefs.current[idx] = el; }}
              src={exp.video}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlays mejorados */}
            <div className={`absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent transition-all duration-[4000ms] ${isTransitioning ? 'from-black/95 via-black/60 to-black/20' : ''
              }`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
          </div>
        ))}
      </div>

      {/* Overlay gradiente lateral derecho mejorado */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/70 via-black/30 to-transparent pointer-events-none z-10 animate-fade-in-slow"></div>

      {/* Línea decorativa dorada vertical */}
      <div className="hidden lg:block absolute right-8 top-[30%] bottom-[30%] w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent z-20 animate-fade-in-delay"></div>

      {/* Lista de Destinos - Con animaciones mejoradas */}
      <div className="hidden lg:block absolute right-16 top-[50%] transform -translate-y-1/2 z-30">
        <div className="space-y-5">
          {/* Encabezado del menú */}
          <div className="text-right animate-slide-in-right" style={{ animationDelay: `0ms` }}>
            <span className="block font-serif text-3xl md:text-4xl font-thin tracking-tight text-white">
              Endless<span className="text-[#D4AF37]">.</span>
            </span>
            <div className="mt-4 w-10 h-[1px] bg-gradient-to-l from-[#D4AF37]/50 to-transparent ml-auto" />
          </div>

          {experiences.map((exp, idx) => (
            <div
              key={idx}
              onMouseEnter={() => !isTransitioning && setActiveIndex(idx)}
              onClick={() => !isTransitioning && setActiveIndex(idx)}
              className={`text-right transition-all duration-700 cursor-pointer animate-slide-in-right ${idx === activeIndex
                ? 'text-[#D4AF37] transform scale-105'
                : 'text-white hover:text-gray-200'
                }`}
              style={{
                animationDelay: `${idx * 150}ms`,
                filter: idx === activeIndex ? 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))' : 'none'
              }}
            >
              <span className={`uppercase tracking-[0.2em] transition-all duration-700 ${idx === activeIndex
                ? 'font-medium'
                : 'font-light'
                } text-lg`}>
                {exp.title}
              </span>

              {/* Partícula dorada para el activo */}
              {idx === activeIndex && (
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse shadow-lg shadow-[#D4AF37]/60"></div>
              )}
            </div>
          ))}

          {/* Separador sutil */}
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/30 ml-auto my-6 animate-fade-in-delay"></div>

          {/* Opción personalizada */}
          <div className="text-right animate-slide-in-right" style={{ animationDelay: `${experiences.length * 150}ms` }}>
            <div className="cursor-pointer transition-all duration-500 hover:text-[#D4AF37] group">
              <p className="text-white/80 text-sm font-light mb-1 group-hover:text-[#D4AF37]/80 transition-all duration-300">
                ¿Algo más?
              </p>
              <p className="text-white text-lg font-light tracking-[0.2em] uppercase group-hover:text-[#D4AF37] transition-all duration-300">
                Servicio Personalizado
              </p>
              <p className="text-white/60 text-xs font-light mt-2 group-hover:text-white/80 transition-all duration-300">
                Contáctanos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selector móvil (evita solapamientos) */}
      <div className="lg:hidden absolute bottom-6 left-0 right-0 z-40 px-4">
        <div className="mx-auto max-w-[520px]">
          <div className="flex gap-2 overflow-x-auto rounded-full border border-white/10 bg-black/45 backdrop-blur-md p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {experiences.map((exp, idx) => (
              <button
                key={exp.title}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition-colors ${
                  idx === activeIndex
                    ? 'bg-[#D4AF37] text-black'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {exp.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content con animaciones de entrada - ajustado para no hacer scroll */}
      <div className={`relative h-full flex items-center px-6 md:px-12 lg:px-16 z-20 transition-all duration-1000 overflow-hidden pb-28 sm:pb-32 lg:pb-0 ${isTransitioning ? 'translate-y-2 opacity-90' : 'translate-y-0 opacity-100'
        }`}>
        <div className="max-w-4xl w-full text-center lg:text-left">

          {/* Badge - sin redundancia */}
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-6 animate-fade-in">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-yellow-500 animate-pulse" />
            <span className="text-[#D4AF37] text-sm font-light tracking-[0.3em] uppercase">
              Servicios
            </span>
            <div className="w-24 h-[1px] bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
          </div>

          {/* Title con efecto de entrada - reducido */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-thin text-white mb-3 leading-none tracking-tight animate-slide-up">
            {experiences[activeIndex].title}
          </h1>

          <p className="text-amber-300 text-lg sm:text-xl md:text-2xl font-light mb-5 md:mb-6 italic animate-fade-in-delay">
            {experiences[activeIndex].subtitle}
          </p>

          {/* Description - reducido */}
          <p className="text-white/90 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto lg:mx-0 mb-7 md:mb-8 animate-fade-in-delay-2">
            {experiences[activeIndex].description}
          </p>

          {/* Exclusives - más compacto */}
          <div className="mb-8 animate-fade-in-delay-3 w-full overflow-hidden">
            <p className="text-[#D4AF37] text-xs font-medium mb-3 tracking-wider uppercase">
              Experiencias Exclusivas
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {experiences[activeIndex].exclusives.map((exclusive, i) => (
                <div key={i} className="flex items-center gap-3 animate-slide-in justify-center lg:justify-start" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="text-white/80 text-sm font-light">{exclusive}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA único - mejor posicionado (alineado con el contenido) */}
          <div className="flex justify-center lg:justify-start animate-fade-in-delay-4 w-full overflow-hidden pt-4 md:pt-6 pl-0 lg:pl-6">
            <Link
              href="/mantenimiento"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#D4AF37] text-black font-semibold rounded-full transition-[box-shadow,background-color,filter] duration-200 ease-out hover:bg-[#CDA233] hover:shadow-[0_14px_30px_rgba(0,0,0,0.28),0_0_0_1px_rgba(212,175,55,0.35),inset_0_1px_0_rgba(255,255,255,0.22)] hover:brightness-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span className="text-sm uppercase tracking-[0.2em]">
                Iniciar conversación
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-delay { animation: fade-in 0.8s ease-out 0.2s both; }
        .animate-fade-in-delay-2 { animation: fade-in 0.8s ease-out 0.4s both; }
        .animate-fade-in-delay-3 { animation: fade-in 0.8s ease-out 0.6s both; }
        .animate-fade-in-delay-4 { animation: fade-in 0.8s ease-out 0.8s both; }
        .animate-fade-in-delay-5 { animation: fade-in 0.8s ease-out 1.0s both; }
        .animate-slide-up { animation: slide-up 1.0s ease-out; }
        .animate-slide-in { animation: slide-in 0.6s ease-out both; }
        .animate-fade-in-slow { animation: fade-in 1.2s ease-out; }
        .animate-slide-in-right { animation: slide-in 0.8s ease-out both; }
      `}</style>
    </section>
  );
}
