"use client";

import { LANGUAGE_STORAGE_KEY, Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  onChange: (locale: Locale) => void;
  className?: string;
  variant?: "dark" | "light";
};

const LOCALES: Locale[] = ["es", "en", "de"];

export default function LanguageSwitcher({
  locale,
  onChange,
  className = "",
  variant = "dark",
}: LanguageSwitcherProps) {
  const isLight = variant === "light";

  return (
    <div
      className={`inline-flex items-center rounded-full p-1 ${
        isLight
          ? "border border-black/15 bg-white/80 backdrop-blur-sm"
          : "border border-white/25 bg-black/20"
      } ${className}`}
    >
      {LOCALES.map((item) => {
        const active = item === locale;
        return (
          <button
            key={item}
            type="button"
            onClick={() => {
              try {
                window.localStorage.setItem(LANGUAGE_STORAGE_KEY, item);
              } catch {
                // ignore
              }
              onChange(item);
            }}
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
              active
                ? "bg-[#D4AF37] text-black"
                : isLight
                  ? "text-black/70 hover:text-black"
                  : "text-white/80 hover:text-white"
            }`}
            aria-pressed={active}
            aria-label={`Cambiar idioma a ${item.toUpperCase()}`}
          >
            {item.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
