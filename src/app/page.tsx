"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const heroVideos = [
    "/herosection/1v.mp4",
    "/herosection/2v.mp4",
    "/herosection/3v.mp4",
  ];
  const [current, setCurrent] = useState(0); // Siempre 0 para SSR

  useEffect(() => {
    // Solo en cliente, cambia a un índice aleatorio al montar
    const randomIdx = Math.floor(Math.random() * heroVideos.length);
    setCurrent(randomIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo una vez al montar
  const [fade, setFade] = useState(false);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const interval = setInterval(() => {
      setPrev(current);
      setFade(true);
      timeout = setTimeout(() => {
        setCurrent((prevIdx) => (prevIdx + 1) % heroVideos.length); // Avanza secuencialmente
        setFade(false);
        setPrev(null);
      }, 2000);
    }, 2500); // 4s total - 2s de fade = 2s de video visible antes del fade
    return () => {
      clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [current, heroVideos.length]);
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
      <section className="relative w-full min-h-screen flex items-center justify-center bg-black">
        {/* Videos de fondo */}
        {prev !== null && prev !== current && heroVideos[prev] !== heroVideos[current] && (
          <video
            key={`prev-${prev}-${heroVideos[prev]}`}
            src={heroVideos[prev]}
            autoPlay
            loop
            muted
            playsInline
            className={`object-cover object-center absolute inset-0 w-full h-full z-0 transition-opacity duration-2000 ${fade ? 'opacity-0' : 'opacity-100'}`}
            style={{transitionProperty: 'opacity'}}
          />
        )}
        <video
          key={`current-${current}-${heroVideos[current]}`}
          src={heroVideos[current]}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover object-center absolute inset-0 w-full h-full z-0 opacity-100"
        />
        {/* Overlay premium SIEMPRE visible y fijo */}
        <div className="absolute inset-0 bg-black/80 z-20 pointer-events-none" />
        {/* Contenido centrado premium */}
        <div className="relative z-30 flex flex-col items-center justify-center text-center px-6 w-full">
          <h1 className="font-serif text-5xl md:text-7xl font-light text-white mb-6 text-center">
            Experiencias de <span className="text-[#D4AF37]">Lujo Únicas</span>
          </h1>
          <p className="text-base md:text-xl text-white/80 font-light max-w-2xl mx-auto mb-8 text-center">
            Descubre destinos exclusivos y experiencias inolvidables diseñadas para quienes buscan lo extraordinario en cada viaje.
          </p>
        </div>
      </section>
      {/* Indicador de desplazamiento */}
      <div className="flex flex-col items-center justify-center mt-[-2.5rem] mb-12 z-30 relative">
        <span className="text-white/80 font-serif text-lg md:text-xl mb-2 drop-shadow-lg animate-fade-in">Desplaza hacia abajo para ver más</span>
        <svg className="w-7 h-7 text-[#D4AF37] animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Experiencias de Destino - Sección lujosa */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#fffbe8] via-white to-[#f5f5f5]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col items-center">
            <h2 className="font-serif text-4xl md:text-6xl font-light text-gray-900 mb-3 tracking-tight text-center">
              Experiencias que <span className="text-[#D4AF37] font-semibold">Trascienden</span> el Viaje
            </h2>
            <div className="w-16 h-1 bg-[#D4AF37] rounded-full mb-6"></div>
            <p className="text-lg md:text-2xl text-gray-600 max-w-3xl text-center font-light">
              Descubre una selección exclusiva de destinos donde el lujo se vive en cada detalle. Creamos momentos únicos para quienes buscan algo más que viajar: buscan sentir, conectar y recordar para siempre.
            </p>
          </div>
          <div className="flex flex-col gap-24">
          {/* Santorini */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/herosection/1.jpeg" alt="Santorini, Grecia" width={500} height={300} />
            </div>
            <div className="md:w-1/2 w-full flex flex-col items-start">
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">Santorini: El Encanto del Mediterráneo</h3>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 font-light">Sumérgete en la magia de Santorini, donde el azul del Egeo se funde con el blanco de sus villas. Vive atardeceres dorados, privacidad absoluta y una atmósfera diseñada para el deleite de los sentidos.</p>
            </div>
          </div>
          {/* Maldivas */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2 w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/herosection/2.jpeg" alt="Maldivas" width={500} height={300} />
            </div>
            <div className="md:w-1/2 w-full flex flex-col items-start">
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">Maldivas: Paraíso Sobre el Agua</h3>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 font-light">Despierta rodeado de aguas turquesa en una villa flotante. Disfruta de experiencias exclusivas, spa frente al mar y noches estrelladas en la intimidad de un paraíso natural incomparable.</p>
            </div>
          </div>
          {/* Aspen */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/herosection/3.jpeg" alt="Aspen, Colorado" width={500} height={300} />
            </div>
            <div className="md:w-1/2 w-full flex flex-col items-start">
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">Aspen: Lujo Entre Montañas</h3>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 font-light">Vive la sofisticación invernal en Aspen: cabañas exclusivas, paisajes nevados y momentos après-ski únicos. Un refugio de elegancia y confort en el corazón de las montañas.</p>
            </div>
          </div>
          </div>
          <div className="mt-20 flex flex-col items-center justify-center gap-6">
            <span className="font-serif text-2xl md:text-3xl text-[#D4AF37] text-center">¿Listo para vivir tu próxima experiencia extraordinaria?</span>
            <button className="px-10 py-4 rounded-full bg-[#D4AF37] text-white font-semibold uppercase tracking-wide shadow-lg hover:bg-[#bfa14a] transition-colors text-lg" onClick={() => window.location.href = '/contacto'}>
              Contáctanos
            </button>
          </div>
        </div>
      </section>

      {/* Galería de experiencias exclusivas moderna y elegante */}
      <section className="py-24 px-6 bg-gradient-to-b from-white via-[#f8f6ef] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 flex flex-col items-center">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-900 mb-2 tracking-tight text-center">
              Momentos que definen el lujo
            </h2>
            <div className="w-12 h-1 bg-[#D4AF37] rounded-full mb-2"></div>
            <p className="text-base md:text-lg text-gray-500 max-w-2xl text-center font-light">
              Una selección visual de experiencias exclusivas, aventura y sofisticación en cada destino.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-6 md:grid-rows-3 gap-6">
            <div className="relative row-span-2 md:row-span-3 md:col-span-1 rounded-3xl overflow-hidden shadow-2xl group">
              <Image src="/herosection/4.jpeg" alt="Jet Privado" width={400} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
            </div>
            <div className="relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden shadow-2xl group">
              <Image src="/herosection/5.jpeg" alt="Experiencia Selva" width={400} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-50 group-hover:opacity-60 transition-opacity duration-500" />
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <Image src="/herosection/6.jpeg" alt="Aventura Desierto" width={400} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-40 group-hover:opacity-50 transition-opacity duration-500" />
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <Image src="/herosection/7.jpeg" alt="Villa sobre el agua" width={400} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-40 group-hover:opacity-50 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-xl font-medium mb-4">Endless Group</h3>
              <p className="text-gray-400 leading-relaxed">
                Experiencias de lujo únicas para quienes buscan lo extraordinario en cada viaje.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Travel</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Lifestyle</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Business</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Capital</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Compañía</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
                <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacidad</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Términos</Link></li>
              </ul>
            </div>
            {/* Sección de contacto premium alineada y elegante */}
            <div className="flex flex-col gap-4 items-start justify-center text-left w-full">
              <div className="flex items-center gap-3 w-full">
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="text-stone-300 text-sm">valenka@the8lifestyle.com</span>
              </div>
              <div className="flex items-center gap-3 w-full">
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10a9 9 0 0118 0c0 4.418-3.582 8-8 8s-8-3.582-8-8z" /><circle cx="12" cy="10" r="3" /></svg>
                <span className="text-stone-300 text-sm">Portugal / España / USA / Venezuela</span>
              </div>
              <div className="flex flex-col items-start gap-1 w-full">
                <div className="flex items-center gap-3 w-full">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-1.3L17 13M7 13l1.5-6h7l1.5 6" /></svg>
                  <span className="text-stone-300 text-sm">+351 925 720 989</span>
                </div>
                <span className="font-serif text-base md:text-lg text-[#D4AF37] text-right italic tracking-wide mt-1 w-full">Nada se improvisa. Todo se siente.</span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Endless Group. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

