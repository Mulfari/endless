"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ExperienciasSection from "../components/ExperienciasSection";
import ServiciosSection from "../components/GaleriaSection";
import TestimoniosSection from "../components/TestimoniosSection";
import Footer from "../components/Footer";

export default function Home() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      // Header transparente en HeroSection Y ExperienciasSection
      const isInHeroOrExperiencias = scrollY < viewportHeight * 2;
      setIsAtTop(isInHeroOrExperiencias);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Trigger animación de carga
    setTimeout(() => setIsLoaded(true), 300);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation Premium */}
      <header className={`fixed top-0 w-full transition-all duration-700 z-[100] ${
        isAtTop 
          ? 'bg-black/20 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/10' 
          : 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl shadow-black/5'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5">
          <div className={`flex items-center justify-between transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            
            {/* Logo premium */}
            <div className="relative group">
              <div className={`font-serif text-2xl md:text-3xl font-light transition-all duration-500 tracking-wide ${
                isAtTop ? 'text-white group-hover:text-[#D4AF37]' : 'text-gray-900 group-hover:text-[#D4AF37]'
              }`}>
                Endless Group
              </div>
              {/* Línea decorativa bajo el logo */}
              <div className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-500 bg-gradient-to-r ${
                isAtTop 
                  ? 'from-[#D4AF37]/0 group-hover:from-[#D4AF37]/60 to-transparent' 
                  : 'from-[#D4AF37]/0 group-hover:from-[#D4AF37]/60 to-transparent'
              } w-0 group-hover:w-full`} />
            </div>
            
            {/* Navegación premium */}
            <div className="hidden md:flex items-center space-x-10">
              {[
                { name: 'Inicio', href: '/' },
                { name: 'Destinos', href: '/destinos' },
                { name: 'Sobre Nosotros', href: '/sobre' },
                { name: 'Contacto', href: '/contacto' }
              ].map((item, idx) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className={`group relative font-light tracking-wide transition-all duration-500 ${
                    isAtTop 
                      ? 'text-white/90 hover:text-[#D4AF37]' 
                      : 'text-gray-700 hover:text-[#D4AF37]'
                  }`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {item.name}
                  
                  {/* Efecto hover dorado */}
                  <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/50 transition-all duration-300 group-hover:w-full" />
                  
                  {/* Efecto de brillo sutil */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 to-transparent rounded-lg blur-sm" />
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Botón de usuario rediseñado */}
            <div className="flex items-center gap-4">
              {/* Botón de consulta premium */}
              <button className={`hidden sm:block px-6 py-2 rounded-full border transition-all duration-500 font-light tracking-wide text-sm ${
                isAtTop 
                  ? 'border-[#D4AF37]/40 text-white/90 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/20' 
                  : 'border-[#D4AF37]/40 text-gray-700 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/20'
              }`}>
                Consulta Gratis
              </button>
              
              {/* Icono de usuario premium */}
              <button className={`group relative p-3 rounded-full transition-all duration-500 ${
                isAtTop 
                  ? 'text-white/80 hover:text-[#D4AF37] hover:bg-white/10' 
                  : 'text-gray-700 hover:text-[#D4AF37] hover:bg-gray-100'
              }`}
                aria-label="Perfil de Usuario">
                
                {/* Efecto de glow en hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 blur-sm" />
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="relative w-6 h-6 transition-transform duration-300 group-hover:scale-110">
                  <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6 18c0-2.5 3-4 6-4s6 1.5 6 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
        
        {/* Barra de progreso sutil para scroll */}
        <div className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/50 transition-all duration-300 ${
          isAtTop ? 'w-0' : 'w-full'
        }`} />
      </header>

      <main className="relative">
        <HeroSection />
        <ExperienciasSection />
        <ServiciosSection />
        <TestimoniosSection />
        <Footer />
      </main>
    </div>
  );
}

