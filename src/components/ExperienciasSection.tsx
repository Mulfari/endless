"use client";

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
    title: "Santorini",
    subtitle: "Cielo Mediterráneo",
    description: "Villas privadas talladas en acantilados volcánicos. Donde el tiempo se detiene entre el azul infinito del Egeo y la arquitectura que abraza el horizonte.",
    video: "/herosection/1v.mp4",
    location: "Islas Cícladas, Grecia",
    price: "€12,500",
    season: "Abril - Octubre",
    duration: "5-7 días",
    exclusives: ["Villa privada con piscina infinita", "Chef personal", "Yacht privado", "Cenas en viñedos exclusivos"],
  },
  {
    title: "Maldivas",
    subtitle: "Océano Infinito", 
    description: "Santuarios flotantes sobre cristales líquidos. Un mundo donde la privacidad es absoluta y cada momento está diseñado para la contemplación y el deleite.",
    video: "/herosection/2v.mp4",
    location: "Atolón Norte, Océano Índico",
    price: "€18,900",
    season: "Todo el año",
    duration: "7-10 días",
    exclusives: ["Villa sobre el agua", "Mayordomo 24/7", "Spa submarino", "Avión privado incluido"],
  },
  {
    title: "Aspen",
    subtitle: "Cumbres Eternas",
    description: "Refugios alpinos donde el lujo se viste de nieve. Experiencias que combinan la adrenalina de las cumbres con la sofisticación de los valles.",
    video: "/herosection/3v.mp4",
    location: "Colorado Rockies, USA",
    price: "€15,200",
    season: "Diciembre - Marzo",
    duration: "6-8 días",
    exclusives: ["Chalet privado", "Heliesquí exclusivo", "Chef Michelin", "Spa de montaña"],
  },
  {
    title: "Dubai",
    subtitle: "Oasis Dorado",
    description: "Donde el desierto se encuentra con la modernidad. Experiencias que redefinen el concepto de lujo en el corazón de Oriente Medio.",
    video: "/herosection/1v.mp4",
    location: "Emiratos Árabes Unidos",
    price: "€22,000",
    season: "Octubre - Abril",
    duration: "5-8 días",
    exclusives: ["Suite presidencial Burj Al Arab", "Helicopter tour", "Desert safari premium", "Shopping personal"],
  },
  {
    title: "Kioto",
    subtitle: "Alma Imperial",
    description: "Templos milenarios y tradiciones ancestrales. Un viaje espiritual donde cada jardín zen cuenta la historia de una civilización única.",
    video: "/herosection/2v.mp4",
    location: "Kansai, Japón",
    price: "€16,800",
    season: "Marzo - Mayo, Sept - Nov",
    duration: "8-10 días",
    exclusives: ["Ryokan tradicional", "Ceremonia del té privada", "Geisha experience", "Templos exclusivos"],
  },
  {
    title: "Patagonia",
    subtitle: "Fin del Mundo",
    description: "Glaciares eternos y pampas infinitas. La última frontera donde la naturaleza salvaje muestra su rostro más imponente y puro.",
    video: "/herosection/3v.mp4",
    location: "Argentina - Chile",
    price: "€19,500",
    season: "Noviembre - Marzo",
    duration: "10-14 días",
    exclusives: ["Lodge eco-luxury", "Trekking glaciar privado", "Avistamiento fauna", "Cabalgatas premium"],
  },
];

export default function ExperienciasSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const hasSnapped = useRef(false);

  // Smooth scroll personalizado con mejor easing
  const smoothScrollTo = (targetPosition: number, duration: number = 1200) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    // Easing function (ease-in-out-cubic)
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  // Detectar scroll con animaciones mejoradas
  useEffect(() => {
    const handleSnapScroll = (e: WheelEvent) => {
      if (isTransitioning) return; // Evitar múltiples transiciones

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const experienciasTop = sectionRef.current?.offsetTop || viewportHeight;
      
      // Snap desde HeroSection hacia ExperienciasSection (hacia abajo)
      if (scrollY < viewportHeight && e.deltaY > 0 && !hasSnapped.current) {
        e.preventDefault();
        hasSnapped.current = true;
        setIsTransitioning(true);
        
        // Scroll mejorado a esta sección
        if (sectionRef.current) {
          const targetPosition = sectionRef.current.offsetTop;
          smoothScrollTo(targetPosition, 1000);
          
          // Efectos adicionales
          setTimeout(() => {
            setIsTransitioning(false);
            hasSnapped.current = false;
          }, 1200);
        }
      }
      
      // Snap desde ExperienciasSection hacia HeroSection (hacia arriba)
      // SOLO cuando esté en el límite superior de ExperienciasSection
      if (scrollY >= experienciasTop && scrollY <= experienciasTop + 50 && e.deltaY < 0 && !hasSnapped.current) {
        e.preventDefault();
        hasSnapped.current = true;
        setIsTransitioning(true);
        
        // Scroll mejorado al hero
        smoothScrollTo(0, 1000);
        
        // Efectos adicionales
        setTimeout(() => {
          setIsTransitioning(false);
          hasSnapped.current = false;
        }, 1200);
      }
      
      // Reset en posiciones neutrales (lejos de las zonas de snap)
      if ((scrollY < viewportHeight * 0.2 || scrollY > experienciasTop + viewportHeight * 0.5) && !isTransitioning) {
        hasSnapped.current = false;
      }
    };

    window.addEventListener('wheel', handleSnapScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleSnapScroll);
  }, [isTransitioning]);

  // Controlar reproducción de videos
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === activeIndex) {
          video.currentTime = 0;
          video.play().catch(() => {});
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
      <div className={`absolute top-20 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-1000 z-40 ${
        isTransitioning ? 'opacity-100 shadow-lg shadow-[#D4AF37]/50' : 'opacity-0'
      }`} />
      
      {/* Transition overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-50 animate-pulse" />
      )}

      {/* Background decoration con efectos mejorados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/10 to-orange-600/5 rounded-full blur-3xl transition-all duration-1000 ${
          isTransitioning ? 'animate-pulse scale-105' : 'animate-pulse'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-600/5 rounded-full blur-3xl transition-all duration-1000 delay-500 ${
          isTransitioning ? 'animate-pulse scale-105' : 'animate-pulse delay-1000'
        }`} />
        </div>

      {/* Video Backgrounds con transiciones mejoradas */}
      <div className="absolute inset-0 overflow-hidden">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-[4000ms] ease-out ${
              idx === activeIndex ? 'opacity-100' : 'opacity-0'
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
            <div className={`absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent transition-all duration-[4000ms] ${
              isTransitioning ? 'from-black/95 via-black/60 to-black/20' : ''
            }`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
          </div>
        ))}
      </div>

      {/* Overlay gradiente lateral derecho mejorado */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/70 via-black/30 to-transparent pointer-events-none z-10 animate-fade-in-slow"></div>

      {/* Línea decorativa dorada vertical */}
      <div className="absolute right-8 top-[30%] bottom-[30%] w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent z-20 animate-fade-in-delay"></div>

      {/* Lista de Destinos - Con animaciones mejoradas */}
      <div className="absolute right-16 top-[50%] transform -translate-y-1/2 z-30">
        <div className="space-y-4">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              onMouseEnter={() => !isTransitioning && setActiveIndex(idx)}
              className={`text-right transition-all duration-700 cursor-pointer animate-slide-in-right ${
                idx === activeIndex 
                  ? 'text-[#D4AF37] transform scale-105' 
                  : 'text-white hover:text-gray-200'
              }`}
              style={{ 
                animationDelay: `${idx * 150}ms`,
                filter: idx === activeIndex ? 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))' : 'none'
              }}
            >
              <span className={`uppercase tracking-[0.2em] transition-all duration-700 ${
                idx === activeIndex 
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
          
          {/* Opción de destino personalizado */}
          <div className="text-right animate-slide-in-right" style={{ animationDelay: `${experiences.length * 150}ms` }}>
            <div className="cursor-pointer transition-all duration-500 hover:text-[#D4AF37] group">
              <p className="text-white/80 text-sm font-light mb-1 group-hover:text-[#D4AF37]/80 transition-all duration-300">
                ¿Otro destino?
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

      {/* Content con animaciones de entrada - ajustado para no hacer scroll */}
      <div className={`relative h-full flex items-center px-6 md:px-12 lg:px-16 z-20 transition-all duration-1000 overflow-hidden ${
        isTransitioning ? 'translate-y-2 opacity-90' : 'translate-y-0 opacity-100'
      }`}>
        <div className="max-w-4xl w-full">
          
          {/* Location Badge - reducido */}
          <div className="inline-flex items-center gap-3 mb-6 animate-fade-in">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-yellow-500 animate-pulse" />
            <span className="text-[#D4AF37] text-sm font-light tracking-[0.3em] uppercase">
              {experiences[activeIndex].location}
            </span>
            <div className="w-24 h-[1px] bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
                  </div>

          {/* Title con efecto de entrada - reducido */}
          <h1 className="font-serif text-6xl md:text-8xl font-thin text-white mb-3 leading-none tracking-tight animate-slide-up">
            {experiences[activeIndex].title}
          </h1>
          
          <p className="text-amber-300 text-xl md:text-2xl font-light mb-6 italic animate-fade-in-delay">
            {experiences[activeIndex].subtitle}
          </p>

          {/* Description - reducido */}
          <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-8 animate-fade-in-delay-2">
            {experiences[activeIndex].description}
          </p>

          {/* Exclusives - más compacto */}
          <div className="mb-8 animate-fade-in-delay-3 w-full overflow-hidden">
            <p className="text-[#D4AF37] text-xs font-medium mb-3 tracking-wider uppercase">
              Experiencias Exclusivas
            </p>
            <div className="grid grid-cols-2 gap-2">
              {experiences[activeIndex].exclusives.map((exclusive, i) => (
                <div key={i} className="flex items-center gap-3 animate-slide-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="text-white/80 text-sm font-light">{exclusive}</span>
                </div>
              ))}
                </div>
              </div>

          {/* Action Buttons mejorados - más compactos */}
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-delay-4 w-full overflow-hidden">
            <button className="group px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-black font-medium rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/40 hover:from-yellow-500 hover:to-[#D4AF37] origin-center">
              <span className="group-hover:tracking-wider transition-all duration-300 text-sm">
                Reservar Experiencia
              </span>
            </button>
            <button className="group px-8 py-3 border border-white/30 text-white backdrop-blur-md bg-white/10 rounded-full transition-all duration-500 hover:bg-white/25 hover:scale-105 hover:border-white/50 origin-center">
              <span className="group-hover:tracking-wider transition-all duration-300 text-sm">
                Ver Detalles
              </span>
            </button>
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
