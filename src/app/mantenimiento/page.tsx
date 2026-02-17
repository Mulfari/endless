"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getText, Locale, resolveLocale } from "@/lib/i18n";

export default function MantenimientoPage() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    setLocale(resolveLocale());
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="absolute top-6 right-6 z-30">
        <LanguageSwitcher locale={locale} onChange={setLocale} />
      </div>
      <div className="w-full max-w-xl text-center">
        <div className="inline-flex items-center justify-center mb-8">
          <div className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em]">
            {getText("mantenimientoPage.brand", "ENDLESS.", locale).replace(".", "")}
            <span className="text-[#D4AF37]">.</span>
          </div>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl font-light tracking-tight">
          {getText("mantenimientoPage.title", "Bajo mantenimiento", locale)}
        </h1>
        <p className="mt-4 text-white/70 text-sm md:text-base leading-relaxed">
          {getText(
            "mantenimientoPage.description",
            "Esta sección aún no está disponible. Estamos afinando detalles para ofrecerte una experiencia impecable.",
            locale
          )}
        </p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white/90 hover:text-white hover:border-white/40 transition-colors duration-200 text-xs font-bold uppercase tracking-[0.22em]"
          >
            {getText("mantenimientoPage.backToHome", "Volver al inicio", locale)}
          </Link>
        </div>
      </div>
    </main>
  );
}


