import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl font-medium mb-4">Endless Group</h3>
            <p className="text-gray-400 leading-relaxed">
              Experiencias de lujo únicas para quienes buscan lo extraordinario en cada viaje.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Servicios</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Travel</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Lifestyle</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Business</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Capital</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Compañía</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacidad</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Términos</Link></li>
            </ul>
          </div>
          {/* Sección de contacto premium alineada y elegante */}
          <div className="flex flex-col gap-4 items-start justify-center text-left w-full">
            <div className="flex items-center gap-3 w-full">
              <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span className="text-stone-300 text-sm">valenka@the8lifestyle.com</span>
            </div>
            <div className="flex items-center gap-3 w-full">
              <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10a9 9 0 0118 0c0 4.418-3.582 8-8 8s-8-3.582-8-8z" /><circle cx="12" cy="10" r="3" /></svg>
              <span className="text-stone-300 text-sm">Portugal / España / USA / Venezuela</span>
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <div className="flex items-center gap-3 w-full">
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-1.3L17 13M7 13l1.5-6h7l1.5 6" /></svg>
                <span className="text-stone-300 text-sm">+351 925 720 989</span>
              </div>
              <span className="font-serif text-base md:text-lg text-[#D4AF37] text-right italic tracking-wide mt-1 w-full">Nada se improvisa. Todo se siente.</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Endless Group. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 