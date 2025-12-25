"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        // Simulating sending request
        setTimeout(() => {
            setIsSending(false);
            alert("Gracias por contactarnos. Un concierge se pondrá en contacto con usted en breve.");
            setFormData({ name: "", email: "", phone: "", message: "" });
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden py-12 px-6">
            {/* Background Ambience & Noise */}
            <div className="absolute inset-0 z-0 bg-neutral-950">
                {/* Noise Texture */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                />

                {/* Smoother Gradients */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(50,50,50,0.1),transparent_70%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(212,175,55,0.05),transparent_60%)]" />

                {/* Animated Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Side: Info */}
                <div className="text-center lg:text-left space-y-8 opacity-0 animate-enter" style={{ animationDelay: '0.1s' }}>
                    <div>
                        <Link href="/" className="inline-block group mb-6">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter transition-transform duration-300 hover:scale-[1.01]">
                                <span className="transition-all duration-300 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]">ENDLESS</span>
                                <span className="text-[#D4AF37] transition-all duration-300 group-hover:drop-shadow-[0_0_4px_rgba(212,175,55,0.5)]">.</span>
                            </h1>
                        </Link>
                        <h2 className="text-white text-3xl font-light tracking-wide mb-4">Hablemos de <span className="text-[#D4AF37] italic font-serif">Excelencia</span></h2>
                        <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                            Estamos aquí para diseñar experiencias inolvidables a su medida. Complete el formulario y nuestro equipo de concierge le asistirá personalmente.
                        </p>
                    </div>

                    {/* Email removed as requested */}
                </div>

                {/* Right Side: Form */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl shadow-black/50 opacity-0 animate-enter" style={{ animationDelay: '0.3s' }}>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-[#D4AF37]/80 ml-1 font-bold">Nombre</label>
                                <input id="name" type="text" value={formData.name} onChange={handleChange} required className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-black/50 transition-all duration-300" placeholder="Su nombre" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-[10px] uppercase tracking-widest text-[#D4AF37]/80 ml-1 font-bold">Teléfono</label>
                                <input id="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-black/50 transition-all duration-300" placeholder="+1 (555) 000-0000" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-[#D4AF37]/80 ml-1 font-bold">Email</label>
                            <input id="email" type="email" value={formData.email} onChange={handleChange} required className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-black/50 transition-all duration-300" placeholder="correo@ejemplo.com" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-[#D4AF37]/80 ml-1 font-bold">Mensaje</label>
                            <textarea id="message" rows={4} value={formData.message} onChange={handleChange} required className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-black/50 transition-all duration-300 resize-none" placeholder="¿En qué podemos asistirle?" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSending}
                            className="w-full mt-4 bg-[#D4AF37] text-black font-bold py-4 rounded-xl uppercase tracking-[0.2em] text-xs hover:bg-[#cda233] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSending ? "Enviando..." : "Enviar Mensaje"}
                        </button>
                    </form>
                </div>

                {/* Mobile Info Footer */}
                <div className="lg:hidden text-center mt-8 opacity-0 animate-enter" style={{ animationDelay: '0.4s' }}>
                    <Link href="/" className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest border-b border-transparent hover:border-white/40 pb-0.5">
                        Volver al Inicio
                    </Link>
                </div>
            </div>

            <style jsx>{`
                @keyframes enter {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-enter {
                    animation: enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
}
