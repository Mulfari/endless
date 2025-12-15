"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    // TODO: Integrar con API de suscripción
  };

  return (
    <footer className="bg-black text-white">
      
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
        
        {/* Two column layout for mobile, three for desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Left column - Brand */}
          <div className="md:col-span-1 lg:col-span-5">
            <Link href="/" className="group relative inline-block mb-4 md:mb-6">
              <div className="text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white transition-all duration-300 group-hover:tracking-[-0.01em] group-hover:scale-[1.02]">
                ENDLESS<span className="text-[#D4AF37] transition-colors duration-300 group-hover:text-yellow-400">.</span>
              </div>
              <div className="absolute -bottom-1 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full bg-white/30" />
            </Link>

            <div className="text-white/60 text-xs md:text-sm tracking-[0.18em] uppercase mb-6 md:mb-8">
              Travel · Lifestyle · Business · Capital
            </div>

            <p className="text-white/70 leading-relaxed text-sm md:text-base">
              Redefiniendo el lujo con innovación, exclusividad y atención personalizada.
            </p>
          </div>
          
          {/* Middle column - Empty space (only on large screens) */}
          <div className="hidden lg:block lg:col-span-2">
          </div>
          
          {/* Right column - Contact & Newsletter */}
          <div className="md:col-span-1 lg:col-span-5">

            <div className="grid gap-6">
               {/*
                Contacto (oculto por ahora)

                <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6">
                  <div className="flex items-center gap-4 mb-5">
                    <h3 className="text-xs tracking-[0.25em] uppercase text-white/70">
                      Contacto
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="mailto:valenka@the8lifestyle.com"
                      className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-200 text-sm"
                    >
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:text-[#D4AF37] transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 17.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615A2.25 2.25 0 0 1 2.25 6.993V6.75" />
                        </svg>
                      </span>
                      <span className="truncate">valenka@the8lifestyle.com</span>
                    </Link>

                    <Link
                      href="tel:+351925720989"
                      className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-200 text-sm"
                    >
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:text-[#D4AF37] transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 0 0 2.25-2.25v-1.372a1.125 1.125 0 0 0-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                      </span>
                      <span>+351 925 720 989</span>
                    </Link>

                    <div className="flex items-center gap-3 text-white/60 text-xs md:text-sm pt-2">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/60">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                      </span>
                      <span>Portugal · España · USA · Venezuela</span>
                    </div>
                  </div>
                </div>
              */}

              {/* Newsletter */}
              <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-xs tracking-[0.25em] uppercase text-white/70">
                    Newsletter
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <p className="text-white/65 mb-5 text-sm leading-relaxed">
                  Recibe acceso exclusivo a lanzamientos y experiencias seleccionadas.
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    required
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/15 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/60 transition-colors duration-200 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-full transition-colors duration-200 hover:bg-[#CDA233] text-sm"
                  >
                    Suscribirme
                  </button>
                </form>

                <p className="mt-4 text-white/40 text-xs leading-relaxed">
                  No hacemos spam. Puedes darte de baja cuando quieras.
                </p>
              </div>
            </div>
            
          </div>
          
        </div>
        
      </div>
      
      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright & Legal */}
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-white/60">
              <span>© {new Date().getFullYear()} Endless Group. Todos los derechos reservados.</span>
              <div className="flex items-center gap-6">
                <Link href="#" className="hover:text-[#D4AF37] transition-colors duration-200">Privacidad</Link>
                <Link href="#" className="hover:text-[#D4AF37] transition-colors duration-200">Términos</Link>
                <Link href="#" className="hover:text-[#D4AF37] transition-colors duration-200">Cookies</Link>
              </div>
            </div>
            
            {/* Social media modern */}
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm mr-2">Síguenos:</span>
              
              <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all duration-300 group">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Link>
              
              <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all duration-300 group">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              
              <Link href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all duration-300 group">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              
            </div>
            
          </div>
        </div>
      </div>
      
    </footer>
  );
}
