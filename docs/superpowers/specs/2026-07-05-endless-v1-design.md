# Endless Group — v1: "Escaparate que convierte a WhatsApp"

**Fecha:** 2026-07-05
**Tipo:** Entregable de cliente (agencia de concierge de lujo que ya opera; captación hoy informal por WhatsApp).
**Repo:** `Mulfari/endless` (Next.js 15 · React 19 · Tailwind v4 · i18n propio es/en/de).

## Objetivo

Una landing de marca cuyo **único trabajo** es que un prospecto de alto nivel sienta
**confianza + acceso + discreción** y **abra WhatsApp** con el concierge. No hay portal,
no hay carrito, no hay formulario. La superficie ya existe y está bastante terminada;
esto es **pulido + contenido real + conversión**, no construir de cero.

Principio rector: la web de un concierge de lujo no vende productos, vende confianza.

## Decisiones tomadas (con el cliente)

- **Marca:** se queda **Endless Group** (Travel · Lifestyle · Business · Capital).
- **Captación:** **solo WhatsApp** (click-to-chat). Se elimina el formulario.
- **Testimonios:** los actuales son **inventados** → se reemplazan por **prueba
  discreta** (sin nombres ni caras falsas).
- **WhatsApp del concierge:** `+351 925 720 989` (el del footer comentado). Ajustable
  en un solo lugar.
- **Contacto real de la empresa:** `valenka@the8lifestyle.com` · Portugal · España ·
  USA · Venezuela.

## Alcance v1

### 1. Conversión → WhatsApp (núcleo)
- **Helper aislado** `src/lib/whatsapp.ts`: constante del número + `whatsappLink(context, locale)`
  que devuelve `https://wa.me/351925720989?text=...` con **mensaje pre-rellenado**
  por idioma (es/en/de) y por contexto (`general`, `travels`, `lifestyle`, `business`, `capital`).
- **CTAs que apuntan a WhatsApp:**
  - Header "Contáctanos" → WhatsApp (`general`).
  - Los 4 CTAs de `ExperienciasSection` → WhatsApp con el contexto de su vertical.
  - Nueva **sección de cierre** (`ClosingCta`) antes del footer con un botón grande a WhatsApp.
- **Hero CTA** ("Explorar experiencias") se mantiene como **gate/reveal** (abre el resto
  de la página); no es un CTA de conversión, es la entrada a la experiencia.
- **Botón flotante de WhatsApp** (`WhatsAppFab`) fijo abajo-derecha, persistente en la home,
  con el glifo oficial de WhatsApp.
- Se **elimina** la página `/contacto` y todo el formulario Formspree.

### 2. Credibilidad — `ConfianzaSection` (reemplaza `TestimoniosSection`)
- Sin nombres/caras inventadas ni stats falsos ("15 años", "500+").
- Contenido: **pilares** (A medida · Acceso privado · Discreción · Concierge 24/7),
  **países de operación** (Portugal · España · USA · Venezuela) y una franja de
  **destinos/ambiente** usando las imágenes del hero como atmósfera (no como testimonios).
- Estética coherente (dorado #D4AF37, serif Playfair), tono sobrio.

### 3. Contacto real + limpieza
- **Footer:** se activa el bloque de contacto real (WhatsApp + email + ubicaciones);
  se **elimina** el newsletter (tenía `TODO` sin conectar). Links legales siguen a
  `/mantenimiento` en v1.
- **Borrar código muerto:** `GaleriaSection.tsx` (un `ServiciosSection` viejo sin usar),
  `IntroSection.tsx` (sin montar).
- **Quitar login demo:** borrar `src/app/login/`, el ícono de login del header, y las
  claves i18n `loginPage`.
- Limpiar i18n: quitar `contactoPage`, `loginPage`, `optionalSectionsNotMounted`;
  añadir `home.confianza` y `home.closingCta`; reescribir `home.footer`.

### 4. Pulido para compartir (el funnel es un link de WhatsApp)
- **OG image** + `openGraph`/`twitter` en `layout.tsx` (con `metadataBase`), usando una
  imagen del hero, para que al pegar el link en WhatsApp/redes se vea premium.
- Repaso de textos de las 4 verticales y responsividad; sin lorem.

## Fuera de v1 (pendiente explícito)
- Páginas legales reales (Privacidad/Términos hoy van a `/mantenimiento`).
- Portal de miembros / login real = **fase 2**.
- OG image "de autor" (diseñada); por ahora se usa una foto del hero.

## Arquitectura / unidades
- `lib/whatsapp.ts` — única fuente del número y de los mensajes; el resto solo consume
  `whatsappLink(context, locale)`. Cambiar el número o los textos = un archivo.
- `components/WhatsAppFab.tsx` — botón flotante, sin estado global, solo lee el helper.
- `components/ClosingCta.tsx` — sección de cierre.
- `components/ConfianzaSection.tsx` — reemplaza a `TestimoniosSection.tsx`.
- `page.tsx` — orquesta Hero → Experiencias → Confianza → ClosingCta → Footer + Fab.

## Verificación
- `npm run build` sin errores de tipos/lint.
- Revisión manual: todos los CTAs abren `wa.me/351925720989` con el texto correcto por
  idioma; no queda referencia a `/contacto` ni `/login`; no queda código muerto.

## Checklist de implementación
1. [ ] `lib/whatsapp.ts` (número + mensajes es/en/de por contexto).
2. [ ] `WhatsAppFab` + montarlo en `page.tsx`.
3. [ ] Header: "Contáctanos" → WhatsApp; quitar ícono de login.
4. [ ] `ExperienciasSection`: los 4 CTAs → WhatsApp por vertical.
5. [ ] `ClosingCta` + montaje antes del footer.
6. [ ] `ConfianzaSection` (nueva) + swap en `page.tsx`; borrar `TestimoniosSection`.
7. [ ] Footer: contacto real, quitar newsletter.
8. [ ] Borrar `GaleriaSection`, `IntroSection`, `app/login`, `app/contacto`.
9. [ ] i18n es/en/de: añadir confianza/closingCta/footer; quitar claves muertas.
10. [ ] `layout.tsx`: OG/metadata + `metadataBase`.
11. [ ] `npm run build` verde + repaso manual + commit/push.
