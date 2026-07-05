import { Locale } from "@/lib/i18n";

/**
 * Única fuente del canal de captación de Endless Group.
 * Cambiar el número o los mensajes = editar SOLO este archivo.
 */
export const WHATSAPP_NUMBER = "351925720989"; // Concierge (Portugal)

export type WhatsAppContext =
  | "general"
  | "travels"
  | "lifestyle"
  | "business"
  | "capital";

const MESSAGES: Record<Locale, Record<WhatsAppContext, string>> = {
  es: {
    general:
      "Hola Endless Group, me gustaría conocer más sobre sus experiencias a medida.",
    travels: "Hola Endless Group, me interesa planificar un viaje a medida.",
    lifestyle:
      "Hola Endless Group, me interesa el servicio de Lifestyle (reservas, eventos, wellness).",
    business:
      "Hola Endless Group, me interesa el servicio de Business (networking y alianzas).",
    capital:
      "Hola Endless Group, me interesa el servicio de Capital (estructura y patrimonio).",
  },
  en: {
    general:
      "Hello Endless Group, I'd like to learn more about your bespoke experiences.",
    travels: "Hello Endless Group, I'd like to plan a bespoke trip.",
    lifestyle:
      "Hello Endless Group, I'm interested in your Lifestyle service (reservations, events, wellness).",
    business:
      "Hello Endless Group, I'm interested in your Business service (networking and partnerships).",
    capital:
      "Hello Endless Group, I'm interested in your Capital service (structure and wealth).",
  },
  de: {
    general:
      "Hallo Endless Group, ich möchte mehr über Ihre maßgeschneiderten Erlebnisse erfahren.",
    travels:
      "Hallo Endless Group, ich interessiere mich für eine maßgeschneiderte Reise.",
    lifestyle:
      "Hallo Endless Group, ich interessiere mich für Ihren Lifestyle-Service (Reservierungen, Events, Wellness).",
    business:
      "Hallo Endless Group, ich interessiere mich für Ihren Business-Service (Networking und Partnerschaften).",
    capital:
      "Hallo Endless Group, ich interessiere mich für Ihren Capital-Service (Struktur und Vermögen).",
  },
};

/** Devuelve el enlace click-to-chat con el mensaje pre-rellenado. */
export function whatsappLink(
  context: WhatsAppContext = "general",
  locale: Locale = "es"
): string {
  const dict = MESSAGES[locale] ?? MESSAGES.es;
  const text = dict[context] ?? dict.general;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
