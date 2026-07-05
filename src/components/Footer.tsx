"use client";

import Link from "next/link";
import { getText, Locale } from "@/lib/i18n";
import { whatsappLink } from "@/lib/whatsapp";

type FooterProps = {
  locale?: Locale;
};

const EMAIL = "valenka@the8lifestyle.com";

export default function Footer({ locale }: FooterProps) {
  return (
    <footer className="bg-black text-white">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
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

            <p className="text-white/70 leading-relaxed text-sm md:text-base max-w-md">
              {getText(
                "home.footer.description",
                "Redefiniendo el lujo con innovación, exclusividad y atención personalizada.",
                locale
              )}
            </p>
          </div>

          {/* Middle spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Right column - Contacto real */}
          <div className="md:col-span-1 lg:col-span-5">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6">
              <div className="flex items-center gap-4 mb-5">
                <h3 className="text-xs tracking-[0.25em] uppercase text-white/70">
                  {getText("home.footer.contact.title", "Contacto", locale)}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              <div className="space-y-3">
                {/* WhatsApp */}
                <a
                  href={whatsappLink("general", locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-white/75 hover:text-white transition-colors duration-200 text-sm"
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:text-[#25D366] transition-colors duration-200">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                    </svg>
                  </span>
                  <span>{getText("home.footer.contact.whatsapp", "WhatsApp", locale)}</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-center gap-3 text-white/75 hover:text-white transition-colors duration-200 text-sm"
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:text-[#D4AF37] transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 17.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615A2.25 2.25 0 0 1 2.25 6.993V6.75" />
                    </svg>
                  </span>
                  <span className="truncate">{EMAIL}</span>
                </a>

                {/* Ubicaciones */}
                <div className="flex items-center gap-3 text-white/60 text-xs md:text-sm pt-2">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/60">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </span>
                  <span>
                    {getText(
                      "home.footer.contact.locations",
                      "Portugal · España · USA · Venezuela",
                      locale
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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
