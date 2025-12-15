"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import { usePathname } from "next/navigation";
import HeroSection from "../components/HeroSection";
// import IntroSection from "../components/IntroSection";
import ExperienciasSection from "../components/ExperienciasSection";
import TestimoniosSection from "../components/TestimoniosSection";
import Footer from "../components/Footer";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const serviciosRef = useRef<HTMLDivElement>(null);
  const isSnappingRef = useRef(false);
  const snapTargetRef = useRef<number | null>(null);
  const unlockRafRef = useRef<number | null>(null);
  const heroRatioRef = useRef(0);
  const serviciosRatioRef = useRef(0);

  const [isAtTop, setIsAtTop] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  // const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);
  const [mobileGateOpen, setMobileGateOpen] = useState(true);
  const [mobileGateReveal, setMobileGateReveal] = useState(true);
  const [mobileGateTransitioning, setMobileGateTransitioning] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    // UX móvil: Hero como "gate". Hasta que el usuario toque "Explore World",
    // NO renderizamos el resto de la página (no hay scroll posible).
    setMobileGateOpen(!isMobile);
    setMobileGateReveal(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    // UX móvil: bloquear scroll del body cuando:
    // - el menú hamburguesa está abierto, o
    // - el gate está cerrado (para evitar "scroll bounce" en el Hero)
    const lockForGate = isMobile && !mobileGateOpen && !mobileMenuOpen;
    const shouldLock = mobileMenuOpen || lockForGate;
    if (!shouldLock) return;

    const prevOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevOverscroll = document.documentElement.style.getPropertyValue("overscroll-behavior-y");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.setProperty("overscroll-behavior-y", "none");

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const onTouchMove = (e: TouchEvent) => {
      // Bloquear gesto de scroll cuando el gate está cerrado
      if (lockForGate) e.preventDefault();
    };
    if (lockForGate) window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      if (prevOverscroll) {
        document.documentElement.style.setProperty("overscroll-behavior-y", prevOverscroll);
      } else {
        document.documentElement.style.removeProperty("overscroll-behavior-y");
      }
      window.removeEventListener("keydown", onKeyDown);
      if (lockForGate) window.removeEventListener("touchmove", onTouchMove);
    };
  }, [mobileMenuOpen, isMobile, mobileGateOpen]);

  const openGateAndGoTo = (hash: "#servicios" | "#testimonios") => {
    setMobileGateTransitioning(true);
    setMobileGateOpen(true);
    setMobileGateReveal(false);

    requestAnimationFrame(() => {
      // Activar transición de entrada del contenido
      setMobileGateReveal(true);

      const el = document.querySelector(hash);
      if (el) {
        const headerOffset = 80;
        const rectTop = (el as HTMLElement).getBoundingClientRect().top;
        const top = rectTop + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }

      // Fade-out de overlay de transición
      window.setTimeout(() => setMobileGateTransitioning(false), 450);
    });
  };

  useEffect(() => {
    const INTRO_KEY = "endless:introSeen:v1";

    // Forzar scroll al top al cargar/recargar la página
    window.scrollTo(0, 0);
    
    // También asegurarse de que el body esté en el top
    if (typeof window !== 'undefined') {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Header transparente solo en el tope absoluto (o casi)
      const isTop = scrollY < 10;
      setIsAtTop(isTop);

      // Detectar sección activa
      const sections = ['servicios', 'testimonios'];
      const headerOffset = 150;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= headerOffset) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
      
      // Si estamos en el top, no hay sección activa
      if (scrollY < 100) {
        setActiveSection('');
      }

      // Calcular progreso de scroll
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = windowHeight > 0 ? (scrollY / windowHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Llamar una vez para inicializar

    // Observador para saber qué tanto se ven Hero/Servicios (evita snaps erráticos)
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === heroRef.current) heroRatioRef.current = entry.intersectionRatio;
          if (entry.target === serviciosRef.current) serviciosRatioRef.current = entry.intersectionRatio;
        }
      },
      { threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] }
    );

    if (heroRef.current) io.observe(heroRef.current);
    if (serviciosRef.current) io.observe(serviciosRef.current);

    // Efecto de desplazamiento (snap suave) entre Hero <-> Servicios (solo wheel/desktop)
    const snapTo = (top: number) => {
      if (isSnappingRef.current) return;
      isSnappingRef.current = true;
      snapTargetRef.current = top;

      // Scroll animado propio (más suave/consistente que behavior:"smooth")
      const startY = window.scrollY;
      const targetY = top;
      const distance = targetY - startY;
      const durationMs = 1200; // más lento / suave
      const start = performance.now();

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const tick = (now: number) => {
        const target = snapTargetRef.current;
        if (target == null) {
          isSnappingRef.current = false;
          unlockRafRef.current = null;
          return;
        }

        const elapsed = now - start;
        const t = Math.min(elapsed / durationMs, 1);
        const eased = easeInOutCubic(t);
        const nextY = startY + distance * eased;

        window.scrollTo(0, nextY);

        const done = t >= 1 || Math.abs(window.scrollY - targetY) < 2;
        if (done) {
          window.scrollTo(0, targetY);
          isSnappingRef.current = false;
          snapTargetRef.current = null;
          unlockRafRef.current = null;
          return;
        }

        unlockRafRef.current = window.requestAnimationFrame(tick);
      };

      unlockRafRef.current = window.requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (isSnappingRef.current) return;
      if (!heroRef.current || !serviciosRef.current) return;
      if (mobileMenuOpen) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (typeof window.matchMedia === "function" && !window.matchMedia("(pointer: fine)").matches) return;

      // Evitar capturar trackpads suaves (umbral) y permitir scroll normal fuera de la zona
      if (Math.abs(e.deltaY) < 28) return;

      const serviciosRect = serviciosRef.current.getBoundingClientRect();
      const heroRect = heroRef.current.getBoundingClientRect();

      const serviciosTop = serviciosRect.top + window.scrollY;
      const heroTop = heroRect.top + window.scrollY;

      // Bajando desde Hero: si Hero domina la pantalla y Servicios está "debajo", snap a Servicios
      const heroDominant = heroRatioRef.current >= 0.55;
      const serviciosBelowFold = serviciosRect.top > 80;
      if (heroDominant && serviciosBelowFold && e.deltaY > 0) {
        e.preventDefault();
        snapTo(serviciosTop);
        return;
      }

      // Subiendo desde el inicio de Servicios: si estamos cerca del borde superior de Servicios, snap a Hero
      const serviciosDominant = serviciosRatioRef.current >= 0.55;
      const nearServiciosTop = Math.abs(serviciosRect.top) <= 90;
      if (serviciosDominant && nearServiciosTop && e.deltaY < 0) {
        e.preventDefault();
        snapTo(heroTop);
        return;
      }
    };

    // Necesitamos preventDefault, por eso passive: false
    window.addEventListener("wheel", onWheel, { passive: false });

    // Trigger animaciones de carga (Intro) solo la primera vez
    let introTimeout: number | undefined;
    let markSeenTimeout: number | undefined;

    let hasSeenIntro = false;
    try {
      hasSeenIntro = localStorage.getItem(INTRO_KEY) === "1";
    } catch {
      hasSeenIntro = false;
    }

    if (hasSeenIntro) {
      setIsLoaded(true);
      try {
        document.documentElement.dataset.introSeen = "1";
      } catch {
        // ignore
      }
    } else {
      introTimeout = window.setTimeout(() => {
        setIsLoaded(true);
        try {
          localStorage.setItem(INTRO_KEY, "1");
        } catch {
          // ignore
        }
        // Evitar cortar el fade-out: marcamos el dataset un poco después
        markSeenTimeout = window.setTimeout(() => {
          try {
            document.documentElement.dataset.introSeen = "1";
          } catch {
            // ignore
          }
        }, 1200);
      }, 2200);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener("wheel", onWheel);
      io.disconnect();
      if (unlockRafRef.current != null) window.cancelAnimationFrame(unlockRafRef.current);
      if (introTimeout) window.clearTimeout(introTimeout);
      if (markSeenTimeout) window.clearTimeout(markSeenTimeout);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation Premium */}
      <header className={`fixed top-0 w-full transition-all duration-500 ease-out z-[100] ${!isLoaded ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
        } ${isAtTop
          ? 'bg-transparent py-6'
          : 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 py-4 shadow-lg shadow-black/5'
        }`}>
        <nav className="max-w-[1400px] mx-auto px-8 md:px-16 flex items-center justify-between">

          {/* Logo premium */}
          <div className="flex-shrink-0">
            <Link href="/" className="group relative inline-block" onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}>
              <div className={`text-2xl md:text-3xl font-extrabold tracking-[-0.02em] transition-all duration-300 ${
                isAtTop ? 'text-white' : 'text-black'
              } group-hover:tracking-[-0.01em] group-hover:scale-[1.02]`}>
                ENDLESS<span className="text-[#D4AF37] transition-colors duration-300 group-hover:text-yellow-400">.</span>
              </div>
              {/* Subtle underline on hover */}
              <div className={`absolute -bottom-1 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full ${
                isAtTop ? 'bg-white/50' : 'bg-[#D4AF37]/50'
              }`} />
            </Link>
          </div>

          {/* Right side - Navigation & CTA */}
          <div className="flex items-center gap-6 md:gap-10">

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {[
                { name: 'Servicios', href: '#servicios', scroll: true, id: 'servicios' },
                { name: 'Testimonios', href: '#testimonios', scroll: true, id: 'testimonios' },
                { name: 'Nuestra Visión', href: '/nuestra-vision', scroll: false, id: '' }
              ].map((item) => {
                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (item.scroll) {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      const headerOffset = 80;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }
                };

                const isActive = item.id && activeSection === item.id;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleClick}
                    className={`relative text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 group ${
                      isAtTop
                        ? 'text-white/70 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                    {/* Animated underline */}
                    <span className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-300 ${
                      isActive 
                        ? 'w-full' 
                        : 'w-0 group-hover:w-full'
                    } ${isAtTop ? 'bg-white' : 'bg-[#D4AF37]'}`} />
                  </Link>
                );
              })}
            </div>

            {/* Subtle divider */}
            <div className={`hidden lg:block w-[1px] h-6 transition-colors duration-300 ${isAtTop ? 'bg-white/20' : 'bg-gray-300'}`} />

            {/* CTA Button & Mobile Toggle */}
            <div className="flex items-center gap-4 md:gap-6">

              {/* CTA Button - Contáctanos */}
              <Link
                href="/contacto"
                className={`hidden md:inline-flex items-center justify-center px-7 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group/cta overflow-hidden ${
                  isAtTop
                    ? 'border border-white/40 text-white hover:border-white/60 backdrop-blur-sm bg-white/5'
                    : 'border border-gray-900 text-gray-900 hover:border-[#D4AF37]'
                }`}
              >
                <span className={`absolute inset-0 transition-all duration-300 ${
                  isAtTop
                    ? 'bg-white translate-y-full group-hover/cta:translate-y-0'
                    : 'bg-[#D4AF37] translate-y-full group-hover/cta:translate-y-0'
                }`} />
                <span className={`relative z-10 transition-colors duration-300 ${
                  isAtTop
                    ? 'group-hover/cta:text-black'
                    : 'group-hover/cta:text-white'
                }`}>
                  Contáctanos
                </span>
              </Link>

              {/* Login Icon (Future Implementation) */}
              <button
                className={`hidden md:flex items-center justify-center p-2 transition-all duration-300 group rounded-full ${isAtTop ? 'text-white/90 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-[#D4AF37] hover:bg-gray-100'
                  }`}
                aria-label="Iniciar Sesión"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden relative z-[110] p-2 transition-colors duration-300 ${mobileMenuOpen
                  ? 'text-black'
                  : isAtTop ? 'text-white hover:text-[#D4AF37]' : 'text-black hover:text-[#D4AF37]'
                  }`}
                aria-label="Menú"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-end gap-1.5">
                  <span className={`block h-[2px] bg-current transition-all duration-500 ease-out ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
                  <span className={`block h-[2px] bg-current transition-all duration-500 ease-out ${mobileMenuOpen ? 'w-6 opacity-0' : 'w-5 group-hover:w-6'}`} />
                  <span className={`block h-[2px] bg-current transition-all duration-500 ease-out ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-3 group-hover:w-6'}`} />
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* Barra de progreso sutil para scroll */}
        <div 
          className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-yellow-400 to-[#D4AF37] transition-all duration-300 ${
            isAtTop ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* Mobile Navigation Drawer (fuera del header para evitar bugs por transform/stacking) */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-[220] transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[82vw] max-w-[360px] bg-white/95 backdrop-blur-xl border-l border-black/10 shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full px-6 pt-6 pb-8">
            {/* Drawer header */}
            <div className="flex items-center justify-between">
              <div className="select-none">
                <div className="text-xl font-extrabold tracking-[-0.02em] text-black">
                  ENDLESS<span className="text-[#D4AF37]">.</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 text-gray-800 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

            {/* Mobile Nav Links */}
            <div className="mt-6 flex flex-col">
              {[
                { name: 'Servicios', href: '#servicios', scroll: true },
                { name: 'Testimonios', href: '#testimonios', scroll: true },
                { name: 'Nuestra Visión', href: '/nuestra-vision', scroll: false }
              ].map((item, idx) => {
                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (item.scroll) {
                    e.preventDefault();
                    // En móvil, si el gate está cerrado y el usuario intenta navegar,
                    // abrimos el gate primero.
                    if (isMobile && !mobileGateOpen) {
                      openGateAndGoTo(item.href as "#servicios" | "#testimonios");
                      setMobileMenuOpen(false);
                      return;
                    }
                    const element = document.querySelector(item.href);
                    if (element) {
                      const headerOffset = 80;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }
                  setMobileMenuOpen(false);
                };

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleClick}
                    className={`py-4 text-sm uppercase tracking-[0.24em] font-semibold text-gray-900 transition-all duration-500 transform border-b border-black/5 ${
                      mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                    } hover:text-black`}
                    style={{ transitionDelay: `${60 + idx * 80}ms` }}
                  >
                    <span className="inline-flex items-center justify-between w-full">
                      <span>{item.name}</span>
                      <span className="text-gray-300">—</span>
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Mobile Actions */}
            <div
              className={`mt-6 flex flex-col gap-3 transition-all duration-500 delay-200 ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <Link
                href="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-full bg-[#D4AF37] text-black text-center text-xs font-bold uppercase tracking-[0.22em] transition-colors duration-200 hover:bg-[#CDA233]"
              >
                Contáctanos
              </Link>

              <button
                type="button"
                className="flex items-center justify-center gap-3 text-gray-700 hover:text-black transition-colors duration-200 py-3 rounded-full border border-black/10 bg-black/[0.02] hover:bg-black/[0.04]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs font-medium uppercase tracking-widest">Iniciar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Animation Overlay */}
      <div className={`intro-overlay fixed inset-0 z-[200] bg-black flex items-center justify-center transition-opacity duration-1000 ease-in-out pointer-events-none ${isLoaded ? 'opacity-0' : 'opacity-100'
        }`}>
        <div className={`transition-all duration-1000 ease-out transform ${isLoaded ? '-translate-y-12 opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'
          }`}>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter">
            ENDLESS<span className="text-[#D4AF37]">.</span>
          </h1>
        </div>
      </div>

      <main className="relative">
        <div ref={heroRef} id="hero" className="scroll-mt-24">
          {(!isMobile || !mobileGateOpen) && (
            <HeroSection
              onExplore={() => {
                openGateAndGoTo("#servicios");
              }}
            />
          )}
        </div>
        {(!isMobile || mobileGateOpen) && (
          <div
            className={`transition-all duration-500 ease-out ${
              isMobile
                ? mobileGateReveal
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
                : ""
            }`}
          >
            <div id="servicios">
              <div ref={serviciosRef} className="scroll-mt-24">
                <ExperienciasSection />
              </div>
            </div>
            <div id="testimonios">
              <TestimoniosSection />
            </div>
          </div>
        )}
        {/*
          Sección intermedia (oculta por ahora):
          Endless Group / "Lujo hecho a medida..."
        */}
        {/* <IntroSection /> */}
        {(!isMobile || mobileGateOpen) && (
          <div
            className={`transition-all duration-500 ease-out ${
              isMobile
                ? mobileGateReveal
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
                : ""
            }`}
          >
            <Footer />
          </div>
        )}
      </main>

      {/* Overlay de transición al abrir el gate (móvil) */}
      {isMobile && mobileGateTransitioning && (
        <div className="fixed inset-0 z-[210] bg-black transition-opacity duration-300 opacity-100 pointer-events-none" />
      )}
    </div >
  );
}

