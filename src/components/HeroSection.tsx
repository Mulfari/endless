"use client";

import { useEffect, useRef, useState } from "react";

const heroVideos = [
  "/herosection/1v.mp4",
  "/herosection/2v.mp4",
  "/herosection/3v.mp4",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  // Arreglo de refs que puede contener null inicialmente
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Cambiar vídeo cada 4.5s, reseteando tiempo y reproduciendo
  useEffect(() => {
    const id = window.setInterval(() => {
      const next = (current + 1) % heroVideos.length;
      const nextVid = videoRefs.current[next];
      if (nextVid) {
        nextVid.currentTime = 0;
        nextVid.play().catch(() => {});
      }
      setCurrent(next);
    }, 4500);
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
    if (first) first.play().catch(() => {});
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-black">
      {/* Vídeos superpuestos */}
      <div className="absolute inset-0 w-full h-full">
        {heroVideos.map((src, idx) => (
          <video
            key={idx}
            // Guardamos ref aunque sea null
            ref={el => { videoRefs.current[idx] = el; }}
            src={src}
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: idx === current ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
            }}
          />
        ))}
      </div>

      {/* Overlay y contenido */}
      <div className="absolute inset-0 bg-black/30 sm:bg-black/50 z-20 pointer-events-none" />
      <div className="relative z-30 flex flex-col items-center justify-center text-center px-6 w-full">
        <h1 className="font-serif text-5xl md:text-7xl font-light text-white mb-6">
          Experiencias de <span className="text-[#D4AF37]">Lujo Únicas</span>
        </h1>
        <p className="text-base md:text-xl text-white/80 font-light max-w-2xl mx-auto mb-8">
          Descubre destinos exclusivos y experiencias inolvidables diseñadas para quienes buscan lo extraordinario en cada viaje.
        </p>
        {/* Casilla elegante para preguntar destino */}
        <div className="mt-4 bg-white/90 rounded-full shadow-lg flex items-center px-6 py-3 max-w-md w-full mx-auto border border-[#D4AF37]">
          <svg className="w-6 h-6 text-[#D4AF37] mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-gray-800 font-serif text-lg md:text-xl font-medium">¿A dónde te gustaría ir?</span>
        </div>
      </div>
    </section>
  );
}
