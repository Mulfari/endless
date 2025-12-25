"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulating login request
        setTimeout(() => {
            setIsLoading(false);
            alert("Demo Login: Implement authentication logic here.");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80" />
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md px-6">
                {/* Logo */}
                <div className="text-center mb-12">
                    <Link href="/" className="inline-block group">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter transition-transform duration-300 hover:scale-[1.01]">
                            <span className="transition-all duration-300 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]">ENDLESS</span>
                            <span className="text-[#D4AF37] transition-all duration-300 group-hover:drop-shadow-[0_0_4px_rgba(212,175,55,0.5)]">.</span>
                        </h1>
                    </Link>
                    <p className="mt-4 text-white/40 text-xs uppercase tracking-[0.3em] font-light">
                        Client Area
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl shadow-black/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-xs uppercase tracking-widest text-white/50 ml-1">
                                Email / ID
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-black/40 transition-all duration-300"
                                placeholder="Introduzca su acceso"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label htmlFor="password" className="text-xs uppercase tracking-widest text-white/50">
                                    Contraseña
                                </label>
                                <Link href="/mantenimiento" className="text-[10px] uppercase tracking-wider text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors">
                                    ¿Olvidó su clave?
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-black/40 transition-all duration-300"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-8 bg-[#D4AF37] text-black font-bold py-4 rounded-xl uppercase tracking-[0.2em] text-xs hover:bg-[#cda233] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Accediendo...
                                    </>
                                ) : (
                                    "Iniciar Sesión"
                                )}
                            </span>
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center space-y-4">
                    <p className="text-white/30 text-[10px] leading-relaxed max-w-xs mx-auto">
                        Acceso exclusivo para miembros y clientes de Endless Group.
                        Si necesita asistencia, contacte a su concierge asignado.
                    </p>
                    <div>
                        <Link href="/" className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest border-b border-transparent hover:border-white/40 pb-0.5">
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
