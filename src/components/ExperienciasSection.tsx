"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Experience {
  title: string;
  description: string;
  image: string;
  alt: string;
}

const experiences: Experience[] = [
  {
    title: "Santorini: El Encanto del Mediterráneo",
    description:
      "Sumérgete en la magia de Santorini, donde el azul del Egeo se funde con el blanco de sus villas. Vive atardeceres dorados, privacidad absoluta y una atmósfera diseñada para el deleite de los sentidos.",
    image: "/herosection/1.jpeg",
    alt: "Vista aérea de Santorini al atardecer",
  },
  {
    title: "Maldivas: Paraíso Sobre el Agua",
    description:
      "Despierta rodeado de aguas turquesa en una villa flotante. Disfruta de experiencias exclusivas, spa frente al mar y noches estrelladas en la intimidad de un paraíso natural incomparable.",
    image: "/herosection/2.jpeg",
    alt: "Villa sobre el mar en Maldivas",
  },
  {
    title: "Aspen: Lujo Entre Montañas",
    description:
      "Vive la sofisticación invernal en Aspen: cabañas exclusivas, paisajes nevados y momentos après-ski únicos. Un refugio de elegancia y confort en el corazón de las montañas.",
    image: "/herosection/3.jpeg",
    alt: "Paisaje nevado en Aspen",
  },
];

export default function ExperienciasSection() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = width < 640;

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#fffbe8] via-white to-[#f5f5f5]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-6xl font-light text-gray-900 mb-2 text-center">
            Experiencias que <span className="text-[#D4AF37] font-semibold">Trascienden</span> el Viaje
          </h2>
          <div className="w-16 h-1 bg-[#D4AF37] rounded-full mb-6" />
        </div>

        {isMobile ? (
          <div className="flex overflow-x-auto scroll-smooth hide-scrollbar">
            {experiences.map((exp, idx) => (
              <div key={idx} className="min-w-full px-4">
                <div className="flex flex-col items-start space-y-4">
                  <div className="w-full rounded-3xl overflow-hidden shadow-2xl relative h-48">
                    <Image
                      src={exp.image}
                      alt={exp.alt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="/placeholder.webp"
                    />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900">
                    {exp.title}
                  </h3>
                  <p className="text-gray-600 font-light">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-20">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-12 ${idx % 2 === 1 ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className="w-1/2 rounded-3xl overflow-hidden shadow-2xl relative h-64">
                  <Image
                    src={exp.image}
                    alt={exp.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="/placeholder.webp"
                  />
                </div>
                <div className="w-1/2 flex flex-col space-y-4">
                  <h3 className="font-serif text-4xl md:text-5xl font-bold text-gray-900">
                    {exp.title}
                  </h3>
                  <p className="text-xl text-gray-600 font-light">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <button
            onClick={() => (window.location.href = '/contacto')}
            className="px-8 py-3 rounded-full bg-[#D4AF37] text-white font-semibold uppercase tracking-wide shadow-lg hover:bg-[#bfa14a] transition-colors"
          >
            Contáctanos
          </button>
        </div>
      </div>
    </section>
  );
}
