"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Service {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  featured?: boolean;
}

const services: Service[] = [
  {
    id: 1,
    src: "/herosection/1.jpeg",
    title: "CHEF PRIVADO",
    subtitle: "Gastronomía de élite en tu mesa",
    description: "Chefs con estrellas Michelin crean experiencias culinarias únicas adaptadas a tus gustos. Desde cenas íntimas hasta banquetes espectaculares, cada plato cuenta una historia de pasión y perfección.",
    features: ["Chef Michelin", "Menús personalizados", "Ingredientes premium", "Servicio 24/7"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003.002-2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    featured: true
  },
  {
    id: 2,
    src: "/herosection/2.jpeg",
    title: "TRANSPORTE",
    subtitle: "Viaja con el máximo confort",
    description: "Jets privados, yates de lujo, helicópteros y vehículos premium. Cada traslado se convierte en parte de la experiencia, diseñado para tu comodidad y privacidad absoluta.",
    features: ["Jet privado", "Yacht exclusivo", "Helicóptero", "Limousines premium"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    )
  },
  {
    id: 3,
    src: "/herosection/3.jpeg",
    title: "CONCIERGE PERSONAL",
    subtitle: "Tu asistente de lujo 24/7",
    description: "Un equipo dedicado que anticipa tus necesidades. Desde reservas imposibles hasta experiencias únicas, nuestro concierge hace realidad lo que otros consideran imposible.",
    features: ["Disponible 24/7", "Reservas exclusivas", "Gestión completa", "Atención personalizada"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    )
  },
  {
    id: 4,
    src: "/herosection/4.jpeg",
    title: "SPA & WELLNESS",
    subtitle: "Bienestar en estado puro",
    description: "Terapistas especializados traen el spa más exclusivo a tu ubicación. Tratamientos personalizados que revitalizan cuerpo y mente en la privacidad de tu espacio.",
    features: ["Terapistas certificados", "Tratamientos personalizados", "Productos premium", "Sesiones privadas"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    featured: true
  },
  {
    id: 5,
    src: "/herosection/5.jpeg",
    title: "SEGURIDAD PRIVADA",
    subtitle: "Protección discreta y profesional",
    description: "Equipos de seguridad altamente entrenados garantizan tu tranquilidad. Protección discreta que pasa desapercibida mientras asegura tu bienestar en todo momento.",
    features: ["Personal entrenado", "Discreción total", "Cobertura completa", "Protocolos premium"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    )
  }
];

export default function ServiciosSection() {
  const [currentService, setCurrentService] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        setScrollY(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance services
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const nextService = () => {
    setCurrentService((prev) => (prev + 1) % services.length);
  };

  const prevService = () => {
    setCurrentService((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      
      {/* Background principal con parallax */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{ transform: `translateY(${scrollY}px)` }}
          >
            <Image
          src={services[currentService].src}
          alt={services[currentService].title}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Content principal */}
      <div className="relative z-10 min-h-screen flex">
        
        {/* Left column - Service information */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 min-h-[700px]">
          
          {/* Header */}
          <div className="mb-12">
            <div className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-light mb-4">
              Endless Travels — Servicios Exclusivos
            </div>
            <div className="w-16 h-[1px] bg-[#D4AF37] mb-8"></div>
          </div>

          {/* Main service */}
          <div className="mb-12">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-light text-white leading-tight tracking-wide mb-3">
                {services[currentService].title}
              </h1>
              <p className="text-xl text-[#D4AF37]/80 font-light">
                {services[currentService].subtitle}
              </p>
            </div>
            
            <div className="mb-8">
              <p className="text-lg font-light leading-relaxed text-white/90 max-w-lg">
                {services[currentService].description}
              </p>
            </div>

            {/* Features list */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {services[currentService].features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                  <span className="text-white/80 text-sm font-light">{feature}</span>
          </div>
        ))}
      </div>


          </div>

          {/* Service navigation */}
          <div className="flex items-center gap-8 mb-8">
            <button 
              onClick={prevService}
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex-1">
              <div className="flex gap-2 mb-2">
                {services.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === currentService ? 'bg-[#D4AF37] flex-1' : 'bg-white/20 w-8'
                    }`}
                  />
                ))}
              </div>

            </div>
            
            <button 
              onClick={nextService}
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right column - Atención Personalizada */}
        <div className="hidden lg:flex w-1/2 flex-col justify-center p-8 min-h-[700px]">
          
          {/* Imagen elegante centrada */}
          <div className="flex justify-center items-center h-full">
            <div className="relative max-w-xl w-full">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <img 
                  src="/herosection/1.jpeg" 
                  alt="Endless Experience" 
                  className="w-full h-full object-cover"
                />
                
                {/* Border dorado sutil */}
                <div className="absolute inset-0 rounded-2xl border border-[#D4AF37]/10"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile navigation */}
      <div className="lg:hidden fixed bottom-24 left-8 right-8 z-50">
        <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="grid grid-cols-5 gap-2 mb-4">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setCurrentService(index)}
                className={`py-2 px-3 rounded-lg transition-all duration-300 text-center ${
                  index === currentService 
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30' 
                    : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80'
                }`}
              >
                <div className="text-xs font-light tracking-wide">
                  {service.title.split(' ')[0]}
                </div>
              </button>
            ))}
          </div>
          <div className="text-center text-white/50 text-xs font-light">
            Servicios Exclusivos
          </div>
        </div>
      </div>


    </section>
  );
}
