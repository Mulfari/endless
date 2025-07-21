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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
              <span className="text-[#D4AF37]">Endless</span> Travels
            </h2>
            <p className="text-white/70 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
              Redefiniendo el lujo a través de la innovación, exclusividad y atención personalizada incomparable.
            </p>
            
            <div className="text-[#D4AF37] italic text-sm md:text-base">
              &ldquo;Nada se improvisa. Todo se siente.&rdquo;
            </div>
          </div>
          
          {/* Middle column - Empty space (only on large screens) */}
          <div className="hidden lg:block lg:col-span-2">
          </div>
          
          {/* Right column - Contact & Newsletter */}
          <div className="md:col-span-1 lg:col-span-5">
            
            {/* Contact */}
            <div className="mb-8 md:mb-10">
              <h3 className="text-white font-semibold mb-3 md:mb-4 text-lg">Contacto</h3>
              <div className="space-y-2">
                <Link href="mailto:valenka@the8lifestyle.com" className="block text-white/70 hover:text-[#D4AF37] transition-colors duration-200 text-sm md:text-base">
                  valenka@the8lifestyle.com
                </Link>
                <Link href="tel:+351925720989" className="block text-white/70 hover:text-[#D4AF37] transition-colors duration-200 text-sm md:text-base">
                  +351 925 720 989
                </Link>
                <div className="text-white/60 text-xs md:text-sm mt-3">
                  Portugal / España / USA / Venezuela
                </div>
              </div>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold mb-3 md:mb-4 text-lg">Newsletter</h3>
              <p className="text-white/70 mb-4 text-xs md:text-sm">
                Recibe acceso exclusivo a nuevas experiencias.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-[#D4AF37] transition-all duration-300 text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D4AF37] text-black font-semibold rounded hover:bg-[#B8941F] transition-colors duration-300 text-sm"
                >
                  Suscribir
                </button>
              </form>
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
