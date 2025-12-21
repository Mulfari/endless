"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const heroMedia = [
  { video: "/herosection/1v.mp4", poster: "/herosection/1.jpeg" },
  { video: "/herosection/2v.mp4", poster: "/herosection/2.jpeg" },
  { video: "/herosection/3v.mp4", poster: "/herosection/3.jpeg" },
] as const;

type HeroSectionProps = {
  onExplore?: () => void;
};

export default function HeroSection({ onExplore }: HeroSectionProps) {
  // Empezar con el segundo video (index 1) como primera impresión visual
  const [current, setCurrent] = useState(1);
  const [previous, setPrevious] = useState<number | null>(null);
  const [fadeInCurrent, setFadeInCurrent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [enableVideo, setEnableVideo] = useState(true);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const currentRef = useRef(1);

  // Cambiar vídeo cada 4.5s (intervalo estable)
  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      const cur = currentRef.current;
      const next = (cur + 1) % heroMedia.length;
      setPrevious(cur);
      setCurrent(next);
      // Hacemos que el nuevo video entre desde 0 -> 0.6 en el siguiente frame
      // para evitar el "doble exposure" (sombra) al cambiar.
      setFadeInCurrent(false);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    if (!enableVideo) return;
    // Activar el fade-in del current en el siguiente frame para que haya transición
    // incluso cuando el <video> se monta por primera vez.
    const raf = window.requestAnimationFrame(() => setFadeInCurrent(true));
    return () => window.cancelAnimationFrame(raf);
  }, [current, enableVideo]);

  // Desactivar videos si el usuario pide menos animación o tiene ahorro de datos
  useEffect(() => {
    try {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      const saveData =
        typeof navigator !== "undefined" &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (navigator as any).connection?.saveData === true;

      setEnableVideo(!(prefersReducedMotion || saveData));
    } catch {
      setEnableVideo(true);
    }
  }, []);

  // Trigger animaciones después de un breve delay
  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Reproducir sólo el vídeo actual y pausar el resto (solo si la pestaña está visible)
  useEffect(() => {
    if (!enableVideo) return;

    const playCurrentIfVisible = () => {
      Object.entries(videoRefs.current).forEach(([key, vid]) => {
        const idx = Number(key);
        if (!vid) return;
        if (idx === current) {
          if (document.visibilityState === "visible") {
            try {
              vid.currentTime = 0;
              void vid.play();
            } catch { }
          } else {
            vid.pause();
          }
        } else {
          vid.pause();
        }
      });
    };

    playCurrentIfVisible();

    // Pausar el anterior tras la transición para reducir CPU/batería
    if (previous !== null && previous !== current) {
      const t = window.setTimeout(() => {
        videoRefs.current[previous]?.pause();
      }, 3000);
      return () => window.clearTimeout(t);
    }

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        const vid = videoRefs.current[current];
        if (vid) {
          try { void vid.play(); } catch { }
        }
      } else {
        Object.values(videoRefs.current).forEach(v => v?.pause());
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [current, previous, enableVideo]);

  const indicesToRender = useMemo(() => {
    if (!enableVideo) return [];
    // Importante: renderizamos primero el anterior y al final el actual,
    // así el actual queda arriba en el stacking (mismo look que antes).
    return [previous, current].filter((v): v is number => v !== null);
  }, [current, previous, enableVideo]);

  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Vídeos superpuestos con transiciones cinematográficas */}
      <div className="absolute inset-0 w-full h-full">
        {indicesToRender.map((idx) => (
          <video
            key={idx}
            ref={(el) => { videoRefs.current[idx] = el; }}
            poster={heroMedia[idx].poster}
            muted
            playsInline
            preload={idx === current ? "auto" : "metadata"}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            style={{
              // Crossfade limpio:
              // - El anterior baja de 0.6 -> 0 (por transición)
              // - El actual sube de 0 -> 0.6 (en el siguiente frame)
              opacity:
                idx === current
                  ? (fadeInCurrent ? 0.6 : 0)
                  : 0,
              transition: "opacity 2.5s ease-in-out",
              willChange: "opacity",
            }}
          >
            <source src={heroMedia[idx].video} type="video/mp4" />
          </video>
        ))}
      </div>

      {/* Overlay Minimalista */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />

      {/* Contenido principal */}
      <div className={`relative z-30 flex flex-col items-center justify-center text-center px-4 w-full transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>

        {/* Título Principal Refinado */}
        <div className="flex flex-col items-center mb-12 md:mb-16 select-none px-4">
          <span className="text-white/80 text-[10px] md:text-base uppercase tracking-[0.3em] font-light mb-3 md:mb-4 animate-fade-in-delay text-center">
            Curating the
          </span>
          <h1 className="font-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-light tracking-tight leading-none animate-fade-in-delay-2 text-center">
            Extraordinary<span className="text-[#D4AF37]">.</span>
          </h1>
        </div>

        {/* CTA Minimalista - Glass Button */}
        <div className="animate-fade-in-delay-3">
          <Link
            href="#servicios"
            onClick={(e) => {
              // En móvil, el Home bloquea scroll hasta tocar este CTA
              if (onExplore) {
                e.preventDefault();
                onExplore();
                return;
              }

              // Fallback: scroll suave a Servicios
              e.preventDefault();
              const el = document.querySelector("#servicios");
              if (el) {
                const headerOffset = 80;
                const rectTop = (el as HTMLElement).getBoundingClientRect().top;
                const top = rectTop + window.scrollY - headerOffset;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            className="group relative inline-flex items-center justify-center px-12 py-4 overflow-hidden transition-all duration-500 ease-out"
          >
            {/* Border Gradient */}
            <div className="absolute inset-0 border border-white/20 group-hover:border-white/40 transition-colors duration-500" />

            {/* Background Hover */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 backdrop-blur-[2px]" />

            {/* Text */}
            <span className="relative z-10 text-xs font-bold uppercase tracking-[0.25em] text-white group-hover:text-[#D4AF37] transition-colors duration-500">
              Explore World
            </span>
          </Link>
        </div>

      </div>

      {/* Indicador de scroll minimalista - Mouse Icon */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 animate-fade-in-delay-3 opacity-60">
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes scroll-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-down {
          animation: scroll-down 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
        }
        .animate-fade-in-delay { animation: fade-in 1s ease-out 0.5s both; }
        .animate-fade-in-delay-2 { animation: fade-in 1s ease-out 1s both; }
        .animate-fade-in-delay-3 { animation: fade-in 1s ease-out 1.5s both; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
