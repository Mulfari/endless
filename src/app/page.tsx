"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ExperienciasSection from "../components/ExperienciasSection";
import GaleriaSection from "../components/GaleriaSection";
import Footer from "../components/Footer";

export default function Home() {
  const [isAtTop, setIsAtTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className={`fixed top-0 w-full transition-colors duration-300 z-50 ${isAtTop ? 'bg-transparent border-b border-white/30' : 'bg-white/95 border-b border-gray-100 backdrop-blur-sm'}`}>
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className={`font-serif text-2xl font-semibold transition-colors duration-300 ${isAtTop ? 'text-white' : 'text-gray-900'}`}>Endless Group</div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`transition-colors duration-300 ${isAtTop ? 'text-white hover:text-[#D4AF37]' : 'text-gray-700 hover:text-gray-900'}`}>Inicio</Link>
              <Link href="/destinos" className={`transition-colors duration-300 ${isAtTop ? 'text-white hover:text-[#D4AF37]' : 'text-gray-700 hover:text-gray-900'}`}>Destinos</Link>
              <Link href="/sobre" className={`transition-colors duration-300 ${isAtTop ? 'text-white hover:text-[#D4AF37]' : 'text-gray-700 hover:text-gray-900'}`}>Sobre Nosotros</Link>
              <Link href="/contacto" className={`transition-colors duration-300 ${isAtTop ? 'text-white hover:text-[#D4AF37]' : 'text-gray-700 hover:text-gray-900'}`}>Contacto</Link>
            </div>
            <div className="flex items-center">
              <button className={`transition-colors duration-300 p-2 rounded-full ${isAtTop ? 'text-white hover:text-[#D4AF37]' : 'text-gray-700 hover:text-[#D4AF37]'}`}
                aria-label="Login / Usuario">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                  <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="2" />
                  <path d="M6 18c0-2.5 3-4 6-4s6 1.5 6 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section pantalla completa con carrusel de videos de fondo */}
      <HeroSection />
      {/* Indicador de desplazamiento */}
      <div className="flex flex-col items-center justify-center mt-[-2.5rem] mb-12 z-30 relative">
        <span className="text-white/80 font-serif text-lg md:text-xl mb-2 drop-shadow-lg animate-fade-in">Desplaza hacia abajo para ver más</span>
        <svg className="w-7 h-7 text-[#D4AF37] animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Experiencias de Destino - Sección lujosa */}
      <ExperienciasSection />

      {/* Galería de experiencias exclusivas moderna y elegante */}
      <GaleriaSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

