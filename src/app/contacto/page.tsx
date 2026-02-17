"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getText, Locale, resolveLocale } from "@/lib/i18n";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgwnvqk";
const LABEL_CLASS = "text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/90 ml-1 font-semibold";
const INPUT_CLASS = "w-full bg-black/35 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4AF37]/60 focus:bg-black/55 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)] transition-all duration-300";

export default function ContactPage() {
    const [locale, setLocale] = useState<Locale>("es");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [isSending, setIsSending] = useState(false);
    const [submitState, setSubmitState] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    useEffect(() => {
        setLocale(resolveLocale());
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        setSubmitState(null);

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("No se pudo enviar el formulario.");
            }

            setSubmitState({
                type: "success",
                message: getText(
                    "contactoPage.form.successInline",
                    "Gracias por contactarnos. Un concierge se pondra en contacto con usted en breve.",
                    locale
                )
            });
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch {
            setSubmitState({
                type: "error",
                message: getText(
                    "contactoPage.form.errorInline",
                    "No pudimos enviar su mensaje. Intente de nuevo en unos minutos.",
                    locale
                )
            });
        } finally {
            setIsSending(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center relative overflow-hidden py-14 px-4 sm:px-6">
            <div className="absolute top-6 right-6 z-30">
                <LanguageSwitcher locale={locale} onChange={setLocale} />
            </div>
            {/* Background Ambience & Noise */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#101216] via-[#12151b] to-[#0e1116]">
                {/* Noise Texture */}
                <div
                    className="absolute inset-0 opacity-[0.025] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                />

                {/* Smoother Gradients */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_62%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(212,175,55,0.13),transparent_56%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(212,175,55,0.11),transparent_40%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(96,165,250,0.12),transparent_38%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),rgba(0,0,0,0.5))]" />

                {/* Cinematic light beams */}
                <div className="absolute -top-[15%] left-[8%] w-[42%] h-[130%] rotate-[-15deg] bg-[linear-gradient(to_bottom,rgba(212,175,55,0.12),transparent_55%)] blur-2xl beam beam-1" />
                <div className="absolute -top-[10%] right-[12%] w-[34%] h-[120%] rotate-[12deg] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1),transparent_58%)] blur-2xl beam beam-2" />

                {/* Subtle grid texture */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
                        backgroundSize: "64px 64px"
                    }}
                />

                {/* Animated Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/9 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-[38%] right-[20%] w-[22%] h-[22%] bg-sky-400/12 rounded-full blur-[95px] animate-pulse delay-700" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-stretch">

                {/* Left Side: Info */}
                <div className="text-center lg:text-left space-y-8 opacity-0 animate-enter flex flex-col justify-center" style={{ animationDelay: '0.1s' }}>
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
                                <span>
                                    {getText("contactoPage.brand", "ENDLESS.", locale).replace(".", "")}
                                </span>
                                <span className="text-[#D4AF37]">.</span>
                            </h1>
                        </Link>
                        <h2 className="text-white text-3xl md:text-4xl font-light tracking-wide mb-4">{getText("contactoPage.title", "Hablemos de Excelencia", locale)}</h2>
                        <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                            {getText(
                                "contactoPage.description",
                                "Estamos aquí para diseñar experiencias inolvidables a su medida. Complete el formulario y nuestro equipo de concierge le asistirá personalmente.",
                                locale
                            )}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 text-left max-w-xl mx-auto lg:mx-0">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 mb-4">Qué puede esperar</p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#D4AF37]" />
                                <p className="text-white/75 text-sm">Respuesta personalizada por nuestro equipo en menos de 24 horas.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#D4AF37]" />
                                <p className="text-white/75 text-sm">Atención enfocada en viajes, estilo de vida y oportunidades de negocio.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#D4AF37]" />
                                <p className="text-white/75 text-sm">Canal 100% privado y gestionado por especialistas.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="relative opacity-0 animate-enter" style={{ animationDelay: '0.3s' }}>
                    <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-[#D4AF37]/30 via-white/10 to-transparent pointer-events-none" />
                    <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 p-7 md:p-10 rounded-3xl shadow-2xl shadow-black/60">
                    <div className="mb-6 md:mb-7">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-2">
                            Formulario privado
                        </p>
                        <h3 className="text-white text-xl md:text-2xl font-medium tracking-wide">
                            Comparta su solicitud
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label htmlFor="name" className={LABEL_CLASS}>{getText("contactoPage.form.fields.name.label", "Nombre", locale)}</label>
                                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className={INPUT_CLASS} placeholder={getText("contactoPage.form.fields.name.placeholder", "Su nombre", locale)} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className={LABEL_CLASS}>{getText("contactoPage.form.fields.phone.label", "Teléfono", locale)}</label>
                                <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={INPUT_CLASS} placeholder={getText("contactoPage.form.fields.phone.placeholder", "+1 (555) 000-0000", locale)} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className={LABEL_CLASS}>{getText("contactoPage.form.fields.email.label", "Email", locale)}</label>
                            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className={INPUT_CLASS} placeholder={getText("contactoPage.form.fields.email.placeholder", "correo@ejemplo.com", locale)} />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className={LABEL_CLASS}>{getText("contactoPage.form.fields.message.label", "Mensaje", locale)}</label>
                            <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} required className={`${INPUT_CLASS} min-h-[120px] resize-y`} placeholder={getText("contactoPage.form.fields.message.placeholder", "¿En qué podemos asistirle?", locale)} />
                        </div>

                        {submitState && (
                            <p
                                className={`text-xs rounded-lg px-3 py-2 border ${
                                    submitState.type === "success"
                                        ? "text-emerald-300 border-emerald-500/30 bg-emerald-500/10"
                                        : "text-red-300 border-red-500/30 bg-red-500/10"
                                }`}
                                role="status"
                                aria-live="polite"
                            >
                                {submitState.message}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSending}
                            className="w-full mt-4 bg-[#D4AF37] text-black font-bold py-4 rounded-xl uppercase tracking-[0.2em] text-xs hover:bg-[#cda233] transition-all duration-300 hover:shadow-[0_0_24px_rgba(212,175,55,0.35)] hover:-translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {isSending
                                ? getText("contactoPage.form.submitLoading", "Enviando...", locale)
                                : getText("contactoPage.form.submitDefault", "Enviar Mensaje", locale)}
                        </button>
                        <p className="text-center text-[11px] text-white/35 leading-relaxed">
                            Al enviar este formulario, acepta ser contactado por nuestro equipo.
                        </p>
                    </form>
                    </div>
                </div>

                {/* Mobile Info Footer */}
                <div className="lg:hidden text-center mt-8 opacity-0 animate-enter" style={{ animationDelay: '0.4s' }}>
                    <Link href="/" className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest border-b border-transparent hover:border-white/40 pb-0.5">
                        {getText("contactoPage.backToHome", "Volver al Inicio", locale)}
                    </Link>
                </div>
            </div>

            <style jsx>{`
                @keyframes enter {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes beamFloatA {
                    0%, 100% { transform: translateY(0) rotate(-15deg); opacity: 0.62; }
                    50% { transform: translateY(22px) rotate(-13deg); opacity: 0.95; }
                }
                @keyframes beamFloatB {
                    0%, 100% { transform: translateY(0) rotate(12deg); opacity: 0.48; }
                    50% { transform: translateY(-18px) rotate(10deg); opacity: 0.8; }
                }
                .animate-enter {
                    animation: enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .beam {
                    transform-origin: top center;
                }
                .beam-1 {
                    animation: beamFloatA 10s ease-in-out infinite;
                }
                .beam-2 {
                    animation: beamFloatB 12s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
