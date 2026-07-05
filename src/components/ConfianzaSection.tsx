"use client";

import Image from "next/image";
import { getText, getValue, Locale } from "@/lib/i18n";

type Pillar = { title: string; text: string };

const fallbackPillars: Pillar[] = [
  { title: "A medida", text: "Cada detalle diseñado en torno a ti, nunca un paquete cerrado." },
  { title: "Acceso privado", text: "Reservas y lugares que no están al alcance del público." },
  { title: "Discreción", text: "Tu privacidad es la base de todo lo que hacemos." },
  { title: "Concierge 24/7", text: "Un interlocutor real, disponible a cualquier hora." },
];

const PILLAR_ICONS = [
  // A medida — sliders
  "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75",
  // Acceso privado — key
  "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z",
  // Discreción — shield
  "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  // Concierge 24/7 — clock
  "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
];

const ambientImages = [
  "/herosection/2.jpeg",
  "/herosection/5.jpeg",
  "/herosection/3.jpeg",
  "/herosection/6.jpeg",
  "/herosection/4.jpeg",
  "/herosection/7.jpeg",
];

type ConfianzaSectionProps = {
  locale?: Locale;
};

export default function ConfianzaSection({ locale }: ConfianzaSectionProps) {
  const pillars = getValue<Pillar[]>("home.confianza.pillars", fallbackPillars, locale);
  const countries = getValue<string[]>(
    "home.confianza.countries",
    ["Portugal", "España", "USA", "Venezuela"],
    locale
  );

  return (
    <section className="relative bg-neutral-950 text-white py-20 md:py-28 overflow-hidden">
      {/* Glows sutiles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-80 w-80 rounded-full bg-[#D4AF37]/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#D4AF37]/[0.04] blur-[120px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-[11px] font-light tracking-[0.35em] uppercase">
              {getText("home.confianza.eyebrow", "Por qué Endless", locale)}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight leading-[1.1]">
            {getText("home.confianza.titleLine1", "Discreción, acceso", locale)}
            <span className="block text-[#D4AF37]">
              {getText("home.confianza.titleLine2", "y todo a tu medida", locale)}
            </span>
          </h2>
          <p className="mt-5 text-white/60 text-base md:text-lg font-light leading-relaxed">
            {getText(
              "home.confianza.description",
              "No vendemos paquetes. Diseñamos cada experiencia contigo, con acceso privado y absoluta discreción.",
              locale
            )}
          </p>
        </div>

        {/* Pilares */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {pillars.map((pillar, i) => (
            <div key={pillar.title} className="group">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-[#D4AF37] transition-colors duration-300 group-hover:border-[#D4AF37]/50">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={PILLAR_ICONS[i % PILLAR_ICONS.length]}
                  />
                </svg>
              </span>
              <h3 className="mt-5 text-lg font-medium tracking-wide text-white">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{pillar.text}</p>
            </div>
          ))}
        </div>

        {/* Presencia */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/40 shrink-0">
              {getText("home.confianza.presenceLabel", "Operamos en", locale)}
            </span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {countries.map((country) => (
                <span
                  key={country}
                  className="text-sm md:text-base font-light tracking-wide text-white/80"
                >
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Franja de ambiente (destinos, sin texto) */}
        <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-3">
          {ambientImages.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover opacity-70 grayscale-[0.35] transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                priority={i < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
