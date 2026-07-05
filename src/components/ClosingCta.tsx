"use client";

import { getText, Locale } from "@/lib/i18n";
import { whatsappLink } from "@/lib/whatsapp";

type ClosingCtaProps = {
  locale?: Locale;
};

/** Cierre de la home: un solo llamado, directo a WhatsApp. */
export default function ClosingCta({ locale }: ClosingCtaProps) {
  return (
    <section className="relative bg-black text-white py-24 md:py-32 overflow-hidden">
      {/* Ambiente */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/[0.07] blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <span className="text-[#D4AF37] text-[11px] font-light tracking-[0.35em] uppercase">
          {getText("home.closingCta.eyebrow", "Empecemos", locale)}
        </span>
        <h2 className="mt-5 font-serif text-4xl md:text-6xl font-light tracking-tight leading-[1.05]">
          {getText("home.closingCta.title", "¿Listo para lo extraordinario?", locale)}
        </h2>
        <p className="mt-5 text-white/60 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto">
          {getText(
            "home.closingCta.description",
            "Cuéntanos qué tienes en mente. Un concierge te responde por WhatsApp.",
            locale
          )}
        </p>

        <div className="mt-10">
          <a
            href={whatsappLink("general", locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-9 py-4 text-black font-bold uppercase tracking-[0.18em] text-xs transition-all duration-300 hover:bg-[#cda233] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:-translate-y-[1px]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
            </svg>
            {getText("home.closingCta.button", "Hablar por WhatsApp", locale)}
          </a>
        </div>
      </div>
    </section>
  );
}
