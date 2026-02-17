"use client";

import Link from "next/link";
import { useState } from "react";
import { getText, Locale } from "@/lib/i18n";

type FooterProps = {
  locale?: Locale;
};

export default function Footer({ locale }: FooterProps) {
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
                {getText("home.footer.brand", "ENDLESS.", locale).replace(".", "")}
                <span className="text-[#D4AF37] transition-colors duration-300 group-hover:text-yellow-400">.</span>
              </div>
              <div className="absolute -bottom-1 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full bg-white/30" />
            </Link>

            <div className="text-white/60 text-xs md:text-sm tracking-[0.18em] uppercase mb-6 md:mb-8">
              {getText("home.footer.tagline", "Travel · Lifestyle · Business · Capital", locale)}
            </div>

            <p className="text-white/70 leading-relaxed text-sm md:text-base">
              {getText(
                "home.footer.description",
                "Redefiniendo el lujo con innovación, exclusividad y atención personalizada.",
                locale
              )}
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
                    {getText("home.footer.newsletter.title", "Newsletter", locale)}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <p className="text-white/65 mb-5 text-sm leading-relaxed">
                  {getText(
                    "home.footer.newsletter.description",
                    "Recibe acceso exclusivo a lanzamientos y experiencias seleccionadas.",
                    locale
                  )}
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    {getText("home.footer.newsletter.emailLabel", "Email", locale)}
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    required
                    placeholder={getText("home.footer.newsletter.emailPlaceholder", "Tu email", locale)}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/15 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/60 transition-colors duration-200 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-full transition-colors duration-200 hover:bg-[#CDA233] text-sm"
                  >
                    {getText("home.footer.newsletter.submit", "Suscribirme", locale)}
                  </button>
                </form>

                <p className="mt-4 text-white/40 text-xs leading-relaxed">
                  {getText(
                    "home.footer.newsletter.disclaimer",
                    "No hacemos spam. Puedes darte de baja cuando quieras.",
                    locale
                  )}
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
              <span>
                {getText(
                  "home.footer.copyrightTemplate",
                  "© {year} Endless Group. Todos los derechos reservados.",
                  locale
                ).replace("{year}", String(new Date().getFullYear()))}
              </span>
              <div className="flex items-center gap-6">
                <Link href="/mantenimiento" className="hover:text-[#D4AF37] transition-colors duration-200">
                  {getText("home.footer.legalLinks.privacy", "Privacidad", locale)}
                </Link>
                <Link href="/mantenimiento" className="hover:text-[#D4AF37] transition-colors duration-200">
                  {getText("home.footer.legalLinks.terms", "Términos", locale)}
                </Link>
                <Link href="/mantenimiento" className="hover:text-[#D4AF37] transition-colors duration-200">
                  {getText("home.footer.legalLinks.cookies", "Cookies", locale)}
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
    </footer>
  );
}
