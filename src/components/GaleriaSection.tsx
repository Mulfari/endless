import Image from "next/image";

export default function GaleriaSection() {
  return (
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
  );
} 