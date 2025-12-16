"use client";

import Link from "next/link";

export default function MantenimientoPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl text-center">
        <div className="inline-flex items-center justify-center mb-8">
          <div className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em]">
            ENDLESS<span className="text-[#D4AF37]">.</span>
          </div>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl font-light tracking-tight">
          Bajo mantenimiento
        </h1>
        <p className="mt-4 text-white/70 text-sm md:text-base leading-relaxed">
          Esta sección aún no está disponible. Estamos afinando detalles para ofrecerte una experiencia impecable.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white/90 hover:text-white hover:border-white/40 transition-colors duration-200 text-xs font-bold uppercase tracking-[0.22em]"
          >
            Volver al inicio
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#D4AF37] text-black hover:bg-[#CDA233] transition-colors duration-200 text-xs font-bold uppercase tracking-[0.22em]"
          >
            Contáctanos
          </Link>
        </div>
      </div>
    </main>
  );
}


