"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

interface Testimonio {
  id: number;
  nombre: string;
  ubicacion: string;
  texto: string;
  experiencia: string;
  rating: number;
  imagen: string;
  cargo?: string;
  destacado?: boolean;
}

const testimonios: Testimonio[] = [
  {
    id: 1,
    nombre: "Isabella Montenegro",
    ubicacion: "Milano, Italia",
    cargo: "CEO, Fashion House",
    texto: "Cada detalle fue perfectamente orquestado. Una experiencia que redefinió mi concepto de lujo.",
    experiencia: "Santorini",
    rating: 5,
    imagen: "/herosection/1.jpeg",
    destacado: true
  },
  {
    id: 2,
    nombre: "James Richardson",
    ubicacion: "London, Reino Unido", 
    cargo: "Investment Director",
    texto: "El nivel de exclusividad es incomparable. Maldivas se convirtió en nuestro refugio privado perfecto.",
    experiencia: "Maldivas",
    rating: 5,
    imagen: "/herosection/2.jpeg"
  },
  {
    id: 3,
    nombre: "Sophia Chen",
    ubicacion: "Hong Kong",
    cargo: "Art Collector",
    texto: "Acceso exclusivo a templos privados. Una inmersión cultural que tocó mi alma profundamente.",
    experiencia: "Kioto",
    rating: 5,
    imagen: "/herosection/3.jpeg"
  },
  {
    id: 4,
    nombre: "Alexandre Dubois",
    ubicacion: "Paris, Francia",
    cargo: "Luxury Brand Director", 
    texto: "Heliesquí privado y chalet exclusivo. Memorias que atesoraré para siempre en las cumbres.",
    experiencia: "Aspen",
    rating: 5,
    imagen: "/herosection/4.jpeg"
  },
  {
    id: 5,
    nombre: "Amara Okafor",
    ubicacion: "Lagos, Nigeria",
    cargo: "Tech Entrepreneur",
    texto: "Safaris únicos y lodge exclusivo. África me mostró su rostro más auténtico y salvaje.",
    experiencia: "Safari Premium",
    rating: 5,
    imagen: "/herosection/5.jpeg"
  },
  {
    id: 6,
    nombre: "David Kim",
    ubicacion: "Seoul, Korea",
    cargo: "Film Producer",
    texto: "Cada experiencia fue como una película perfecta. Momentos únicos capturados para la eternidad.",
    experiencia: "Bali Exclusive",
    rating: 5,
    imagen: "/herosection/6.jpeg"
  }
];

export default function TestimoniosSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const isReducedMotion = useMemo(() => {
    try {
      return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    } catch {
      return false;
    }
  }, []);

  const scrollToIndex = useCallback((idx: number, behavior: ScrollBehavior = "smooth") => {
    const el = carouselRef.current;
    if (!el) return;
    const width = el.clientWidth || 0;
    el.scrollTo({ left: idx * width, behavior });
  }, []);

  // Mobile carousel: sincronizar índice con el scroll (snap)
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const width = el.clientWidth || 1;
        const idx = Math.round(el.scrollLeft / width);
        if (idx !== activeMobileIndex && idx >= 0 && idx < testimonios.length) {
          setActiveMobileIndex(idx);
        }
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [activeMobileIndex]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 md:py-24 overflow-hidden">
      
      {/* Background decorativo sutil */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#D4AF37]/3 to-amber-500/2 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/3 to-purple-600/2 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header minimalista */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-1 h-1 rounded-full bg-[#D4AF37]"></div>
            <span className="text-gray-600 text-sm font-light tracking-[0.2em] uppercase">
              Testimonios
            </span>
            <div className="w-1 h-1 rounded-full bg-[#D4AF37]"></div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extralight text-gray-900 tracking-tight mb-4">
            Experiencias
            <span className="block text-[#D4AF37] font-light">Extraordinarias</span>
          </h2>
          
          <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Descubre por qué nuestros viajeros eligen Endless Travels para sus momentos más especiales
          </p>
        </div>

        {/* Mobile: carrusel (1 visible) */}
        <div className="md:hidden">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonios.map((t) => (
              <div key={t.id} className="snap-center shrink-0 w-full">
                <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white">
                  {/* Imagen de fondo (cinemático) */}
                  <div className="absolute inset-0">
                    <Image
                      src={t.imagen}
                      alt={t.experiencia}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={false}
                    />
                    {/* Overlays sutiles */}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
                  </div>

                  {/* Contenido */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="bg-[#D4AF37]/90 text-black text-[11px] font-medium px-3 py-1 rounded-full tracking-wide">
                        {t.experiencia}
                      </span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3.5 h-3.5 ${i < t.rating ? "text-[#D4AF37]" : "text-white/25"}`}
                          >
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>

                    <blockquote className="text-white text-xl font-light leading-relaxed italic [display:-webkit-box] [-webkit-line-clamp:4] [-webkit-box-orient:vertical] overflow-hidden">
                      &ldquo;{t.texto}&rdquo;
                    </blockquote>

                    <div className="mt-5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/10">
                        <span className="text-white text-sm font-light">
                          {t.nombre.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-white font-medium text-sm truncate">{t.nombre}</h4>
                        <p className="text-white/75 text-xs truncate">{t.cargo ?? t.ubicacion}</p>
                        <p className="text-white/55 text-[11px] truncate">{t.ubicacion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-5 flex items-center justify-between gap-3">
            {/* Flechas */}
            <div className="flex-1 flex items-center justify-center gap-2">
              {testimonios.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Ir a testimonio de ${t.nombre}`}
                  onClick={() => scrollToIndex(idx, isReducedMotion ? "auto" : "smooth")}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeMobileIndex ? "w-6 bg-[#D4AF37]" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid asimétrico de testimonios */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
          
          {/* Testimonio destacado - más grande */}
          <div 
            className={`lg:col-span-2 lg:row-span-2 group cursor-pointer transform transition-all duration-700 hover:scale-[1.02] ${
              hoveredCard === testimonios[0].id ? 'z-20' : 'z-10'
            }`}
            onMouseEnter={() => setHoveredCard(testimonios[0].id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative h-[500px] bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
              
              {/* Imagen de fondo */}
              <div className="absolute inset-0">
                <Image
                  src={testimonios[0].imagen}
                  alt={testimonios[0].experiencia}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              {/* Contenido */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform transition-all duration-500 group-hover:translate-y-[-8px]">
                  
                  {/* Badge del destino */}
                  <div className="inline-block mb-4">
                    <span className="bg-[#D4AF37]/90 text-black text-xs font-medium px-3 py-1 rounded-full tracking-wide">
                      {testimonios[0].experiencia}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 text-[#D4AF37]">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    ))}
                  </div>

                  {/* Texto */}
                  <blockquote className="text-white text-xl font-light leading-relaxed mb-6 italic">
                    &ldquo;{testimonios[0].texto}&rdquo;
                  </blockquote>

                  {/* Cliente info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white text-lg font-light">
                        {testimonios[0].nombre.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{testimonios[0].nombre}</h4>
                      <p className="text-white/80 text-sm">{testimonios[0].cargo}</p>
                      <p className="text-white/60 text-xs">{testimonios[0].ubicacion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonios regulares */}
          {testimonios.slice(1).map((testimonio, index) => (
            <div
              key={testimonio.id}
              className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                hoveredCard === testimonio.id ? 'z-20' : 'z-10'
              } ${index === 1 ? 'lg:row-span-1' : ''}`}
              onMouseEnter={() => setHoveredCard(testimonio.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-[280px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-50">
                
                {/* Imagen de fondo más sutil */}
                <div className="absolute inset-0">
                  <Image
                    src={testimonio.imagen}
                    alt={testimonio.experiencia}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover opacity-20 transition-all duration-500 group-hover:opacity-30"
                  />
                </div>

                {/* Contenido */}
                <div className="relative h-full p-6 flex flex-col">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#D4AF37] text-xs font-medium tracking-wide uppercase">
                      {testimonio.experiencia}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 text-[#D4AF37]">
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Texto */}
                  <blockquote className="text-gray-800 text-base font-light leading-relaxed mb-4 flex-1 italic">
                    &ldquo;{testimonio.texto}&rdquo;
                  </blockquote>

                  {/* Cliente info */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-amber-500/10 flex items-center justify-center">
                      <span className="text-[#D4AF37] text-sm font-medium">
                        {testimonio.nombre.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-medium text-sm">{testimonio.nombre}</h4>
                      <p className="text-gray-600 text-xs">{testimonio.cargo}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats minimalistas */}
        <div className="mt-24 pt-16 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-12 max-w-3xl mx-auto text-center">
            <div className="group">
              <div className="text-4xl font-extralight text-[#D4AF37] mb-2 transition-all duration-300 group-hover:scale-110">15</div>
              <p className="text-gray-600 font-light text-sm tracking-wide">Años de Excelencia</p>
            </div>
            <div className="group">
              <div className="text-4xl font-extralight text-[#D4AF37] mb-2 transition-all duration-300 group-hover:scale-110">50+</div>
              <p className="text-gray-600 font-light text-sm tracking-wide">Destinos Exclusivos</p>
            </div>
            <div className="group">
              <div className="text-4xl font-extralight text-[#D4AF37] mb-2 transition-all duration-300 group-hover:scale-110">500+</div>
              <p className="text-gray-600 font-light text-sm tracking-wide">Experiencias Únicas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 