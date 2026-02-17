import esData from "@/i18n/es.json";
import enData from "@/i18n/en.json";
import deData from "@/i18n/de.json";

type JsonObject = Record<string, unknown>;

export type Locale = "es" | "en" | "de";
export const LANGUAGE_STORAGE_KEY = "endless:locale";

const dictionaries: Record<Locale, JsonObject> = {
  es: esData as JsonObject,
  en: enData as JsonObject,
  de: deData as JsonObject,
};

const DEFAULT_LOCALE: Locale = "es";
const ENV_LOCALE = process.env.NEXT_PUBLIC_APP_LOCALE;

export function isLocale(value: string): value is Locale {
  return value === "es" || value === "en" || value === "de";
}

export function resolveLocale(locale?: string): Locale {
  if (locale && isLocale(locale)) return locale;
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && isLocale(stored)) return stored;
    } catch {
      // ignore
    }
  }
  if (ENV_LOCALE && isLocale(ENV_LOCALE)) return ENV_LOCALE;
  return DEFAULT_LOCALE;
}

function getDictionary(locale: Locale): JsonObject {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

function readByPath(path: string, locale: Locale): unknown {
  return path.split(".").reduce<unknown>((acc, segment) => {
    if (!acc || typeof acc !== "object") return undefined;
    return (acc as JsonObject)[segment];
  }, getDictionary(locale));
}

export function getText(path: string, fallback = "", locale?: Locale): string {
  const value = readByPath(path, resolveLocale(locale));
  return typeof value === "string" ? value : fallback;
}

export function getValue<T>(path: string, fallback: T, locale?: Locale): T {
  const value = readByPath(path, resolveLocale(locale));
  return (value as T) ?? fallback;
}

export function getPageData(locale?: Locale): JsonObject {
  return getDictionary(resolveLocale(locale));
}
