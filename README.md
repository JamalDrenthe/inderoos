# In De Roos

![React 19](https://img.shields.io/badge/React-19-0B0B0C?logo=react&logoColor=61DAFB)
![TypeScript 5](https://img.shields.io/badge/TypeScript-5-0B0B0C?logo=typescript&logoColor=3178C6)
![Vite 7](https://img.shields.io/badge/Vite-7-0B0B0C?logo=vite&logoColor=646CFF)
![Tailwind CSS 3](https://img.shields.io/badge/Tailwind_CSS-3-0B0B0C?logo=tailwindcss&logoColor=06B6D4)
![Supabase Auth](https://img.shields.io/badge/Supabase-Auth-0B0B0C?logo=supabase&logoColor=3ECF8E)
![Languages NL EN DE](https://img.shields.io/badge/Languages-NL%20%7C%20EN%20%7C%20DE-0B0B0C)

![In De Roos social preview](public/og-image.png)

Een meertalige React + TypeScript + Vite webapp voor **In De Roos**: een besloten, luxueuze en volwassen nightlife-brand met een sterke **Dark Elegance** uitstraling, besloten toegang, event-curatie, RSVP-flow en member login.

Deze repository bevat zowel de publieke merkervaring als de praktische flows eromheen:

- **brand-driven homepage en marketingpagina's**
- **eventoverzicht met detail-overlays**
- **prijzen- en membershippagina's**
- **RSVP / boekingsflow**
- **member login via Supabase**
- **18+ leeftijdsverificatie**
- **NL / EN / DE lokalisatie**
- **favicon-, Apple touch- en social-sharing assets**

## Snel starten

```bash
npm install
npm run dev
```

Voeg daarna de benodigde `VITE_*` variabelen toe als je ook deze onderdelen wilt activeren:

- **Google Forms submits** voor RSVP-aanvragen
- **Supabase auth** voor de member login

## In een oogopslag

| Onderdeel | Huidige keuze |
| --- | --- |
| Merkstijl | Dark Elegance |
| Default logo asset | `public/inderooslogo2.png` |
| Talen | `nl`, `en`, `de` |
| Routing | `BrowserRouter` |
| Auth | Supabase Auth via directe REST-calls |
| RSVP submit | Optioneel via Google Forms |
| Centrale contentbron | `src/lib/siteData.ts` |
| Homepage | `src/pages/HomeV3.tsx` |
| Bookingflow | `src/pages/BookingV2.tsx` |
| Member area | `src/pages/CommunityV2.tsx` |

## Inhoud

- [Snel starten](#snel-starten)
- [In een oogopslag](#in-een-oogopslag)
- [Projectoverzicht](#projectoverzicht)
- [Belangrijkste functionaliteit](#belangrijkste-functionaliteit)
- [Technische stack](#technische-stack)
- [Architectuur in grote lijnen](#architectuur-in-grote-lijnen)
- [Routes](#routes)
- [Projectstructuur](#projectstructuur)
- [Installatie en lokaal ontwikkelen](#installatie-en-lokaal-ontwikkelen)
- [Dagelijkse developer workflow](#dagelijkse-developer-workflow)
- [Omgevingsvariabelen](#omgevingsvariabelen)
- [Lokalisatie](#lokalisatie)
- [Branding en assets](#branding-en-assets)
- [Booking- en RSVP-flow](#booking--en-rsvp-flow)
- [Member login en Supabase-auth](#member-login-en-supabase-auth)
- [Leeftijdsverificatie](#leeftijdsverificatie)
- [Contentbeheer](#contentbeheer)
- [Release-checklist](#release-checklist)
- [Deployment-notes](#deployment-notes)
- [Troubleshooting](#troubleshooting)
- [Bekende aandachtspunten](#bekende-aandachtspunten)

## Projectoverzicht

De site is ontworpen als een **dark editorial experience** rondom besloten events in Amsterdam. De codebase combineert een visueel rijke frontend met lichte client-side businesslogica voor:

- eventpresentatie
- pricing en memberships
- aanmeldingen en aanvragen
- eenvoudige client-side opslag
- authenticatie voor returning guests

De tone of voice van de site is bewust luxueus, discreet, suggestief en volwassen, zonder vulgair te worden. Tekst en UX sturen op:

- **anticipatie**
- **discretie**
- **verlangen**
- **curatie**
- **exclusiviteit**

## Belangrijkste functionaliteit

### Publieke merkervaring

- Donkere, premium homepage in `src/pages/HomeV3.tsx`
- Eventpagina met kaarten en overlay-details in `src/pages/EventsV3.tsx`
- Prijzenpagina losgetrokken van eventkaarten in `src/pages/Prices.tsx`
- Safety-, contact-, privacy- en voorwaardenpagina's

### Privé- en memberflows

- Member login / registratie in `src/pages/CommunityV2.tsx`
- Supabase REST-auth zonder aparte backend in deze repo
- Session persistence via `localStorage`

### RSVP en aanvragen

- Ticket- en membershipkeuze in `src/pages/BookingV2.tsx`
- Client-side validatie
- Optionele doorsturing naar Google Forms
- Lokale opslag van reserveringen voor frontendflow / admingebruik

### Compliance / gating

- Fullscreen 18+ gate in `src/components/AgeVerification.tsx`
- No-phone, secret location drop en consent-gedreven huisregels in de UX-copy

### Branding en distributie

- Standaard logo-bron: `public/inderooslogo2.png`
- Afgeleide web-assets voor favicon, Apple touch icon en social preview
- Open Graph- en Twitter-meta tags in `index.html`

## Technische stack

### Core

- **Vite 7**
- **React 19**
- **TypeScript 5**
- **React Router DOM 7**

### UI en styling

- **Tailwind CSS 3**
- **Lucide React** voor iconen
- **Radix UI** component primitives
- **GSAP** voor animatie in delen van de site

### Data / integraties

- **Supabase Auth** via directe REST-calls vanuit `src/lib/memberAuth.ts`
- **Google Forms** submit-integratie via `src/lib/googleForm.ts`
- **localStorage** voor taal, leeftijdsverificatie, reserveringen en member sessions

## Architectuur in grote lijnen

### Entry en providers

- `src/main.tsx`
  - mount de app
  - wrapt `App` in `LanguageProvider`

- `src/context/LanguageContext.tsx`
  - beheert actieve taal
  - synchroniseert taal naar `localStorage`
  - zet `document.documentElement.lang`
  - zet `document.documentElement.dataset.language`

### App shell

- `src/App.tsx`
  - definieert routing
  - rendert globale navigatie
  - rendert globale footer
  - injecteert `AgeVerification`
  - gebruikt `ScrollToTop`

### Kernmodules

- `src/lib/siteData.ts`
  - centrale bron voor tickets, memberships en weekenders
  - bevat de gelokaliseerde contentstructuur voor eventdata

- `src/lib/googleForm.ts`
  - verstuurt aanvragen naar een Google Form als de env-config compleet is

- `src/lib/memberAuth.ts`
  - handelt Supabase sign-in, sign-up, sign-out en profielophaal af

- `src/hooks/useLocalStorage.ts`
  - eenvoudige helper voor state + lokale opslag

## Routes

Onderstaande routes zijn momenteel in `src/App.tsx` gedefinieerd.

| Route | Component | Doel |
| --- | --- | --- |
| `/` | `HomeV3` | Homepage / merkintroductie |
| `/evenementen` | `EventsV3` | Eventoverzicht met overlays |
| `/prijzen` | `Prices` | Ticket- en membershipprijzen |
| `/boeking` | `BookingV2` | Algemene RSVP / booking flow |
| `/boeking/:eventId` | `BookingV2` | RSVP met vooraf geselecteerd event |
| `/bedankt` | `ThankYou` | Bedanktpagina na aanvraag |
| `/thank-you` | `ThankYou` | Engelstalig alias voor bedanktpagina |
| `/community` | `CommunityV2` | Member login / registratie |
| `/member-login` | `CommunityV2` | Alias voor member login |
| `/dames-heren` | `DamesHeren` | Pagina voor profielen / aantrekkingskracht / filtering |
| `/veiligheid` | `SafetyV2` | Veiligheid en gedragscode |
| `/huisregels` | `SafetyV2` | Alias voor veiligheid / huisregels |
| `/vacatures` | `Vacatures` | Recruitment / open rollen |
| `/contact` | `ContactV2` | Contactpagina |
| `/algemene-voorwaarden` | `Terms` | Algemene voorwaarden |
| `/privacy` | `Privacy` | Privacybeleid |
| `/admin` | `Admin` | Admin-omgeving |
| `/admin/login` | `AdminLogin` | Admin login |

## Projectstructuur

Een verkorte weergave van de belangrijkste mappen en bestanden:

```text
app/
├─ public/
│  ├─ apple-touch-icon.png
│  ├─ favicon.ico
│  ├─ favicon-16x16.png
│  ├─ favicon-32x32.png
│  ├─ og-image.png
│  ├─ inderooslogo2.png
│  └─ overige branding- en beeldassets
├─ src/
│  ├─ components/
│  │  ├─ AgeVerification.tsx
│  │  ├─ BrandLogo.tsx
│  │  ├─ EventOverlay.tsx
│  │  ├─ SiteNavigation.tsx
│  │  ├─ SiteNavigationV2.tsx
│  │  ├─ SiteFooterV2.tsx
│  │  └─ ScrollToTop.tsx
│  ├─ context/
│  │  ├─ language.ts
│  │  ├─ LanguageContext.tsx
│  │  └─ useLanguage.ts
│  ├─ hooks/
│  │  └─ useLocalStorage.ts
│  ├─ lib/
│  │  ├─ googleForm.ts
│  │  ├─ memberAuth.ts
│  │  └─ siteData.ts
│  ├─ pages/
│  │  ├─ HomeV3.tsx
│  │  ├─ EventsV3.tsx
│  │  ├─ BookingV2.tsx
│  │  ├─ CommunityV2.tsx
│  │  ├─ Prices.tsx
│  │  ├─ SafetyV2.tsx
│  │  ├─ Terms.tsx
│  │  ├─ Privacy.tsx
│  │  └─ overige pagina's
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ index.css
│  └─ vite-env.d.ts
├─ index.html
├─ package.json
└─ vite.config.ts
```

## Installatie en lokaal ontwikkelen

### Vereisten

- **Node.js 20+** aanbevolen
- **npm**

### Installeren

```bash
npm install
```

### Development server starten

```bash
npm run dev
```

### Productiebuild maken

```bash
npm run build
```

### Gebouwde app lokaal previewen

```bash
npm run preview
```

### Lint draaien

```bash
npm run lint
```

## Dagelijkse developer workflow

### Veelvoorkomende wijzigingen

- **Eventdata of pricing aanpassen**
  - werk in `src/lib/siteData.ts`

- **Homepage of merkcopy aanpassen**
  - werk vooral in `src/pages/HomeV3.tsx`

- **Eventpresentatie of overlays aanpassen**
  - werk vooral in `src/pages/EventsV3.tsx` en `src/components/EventOverlay.tsx`

- **RSVP-flow aanpassen**
  - werk in `src/pages/BookingV2.tsx` en `src/lib/googleForm.ts`

- **Member login aanpassen**
  - werk in `src/pages/CommunityV2.tsx` en `src/lib/memberAuth.ts`

- **Logo, favicon of social metadata aanpassen**
  - werk in `public/` en `index.html`

### Aanbevolen werkwijze

1. Werk content en labels direct in `nl`, `en` en `de` bij.
2. Controleer of CTA's, routes en interne links nog logisch uitkomen.
3. Controleer branding-assets als het logo of de social preview wijzigt.
4. Draai eerst een gerichte check op het bestand of onderdeel dat je aangepast hebt.
5. Draai daarna `npm run lint` voor de bredere status van de repo.

## Omgevingsvariabelen

De frontend verwacht optionele én functionele Vite-variabelen. De types staan in `src/vite-env.d.ts`.

### Ondersteunde variabelen

| Variabele | Verplicht | Doel |
| --- | --- | --- |
| `VITE_GOOGLE_FORM_ACTION_URL` | Optioneel | Google Form endpoint voor RSVP-submission |
| `VITE_GOOGLE_FORM_NAME_FIELD` | Optioneel | Form field key voor naam |
| `VITE_GOOGLE_FORM_EMAIL_FIELD` | Optioneel | Form field key voor e-mail |
| `VITE_GOOGLE_FORM_PHONE_FIELD` | Optioneel | Form field key voor telefoon |
| `VITE_GOOGLE_FORM_SELECTION_FIELD` | Optioneel | Form field key voor gekozen flow / ticket / membership |
| `VITE_GOOGLE_FORM_RULES_FIELD` | Optioneel | Form field key voor akkoord op regels |
| `VITE_SUPABASE_URL` | Vereist voor member login | Publieke Supabase project-URL |
| `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Vereist voor member login | Publieke Supabase anon / publishable key |

### Voorbeeld `.env`

```env
VITE_GOOGLE_FORM_ACTION_URL=
VITE_GOOGLE_FORM_NAME_FIELD=
VITE_GOOGLE_FORM_EMAIL_FIELD=
VITE_GOOGLE_FORM_PHONE_FIELD=
VITE_GOOGLE_FORM_SELECTION_FIELD=
VITE_GOOGLE_FORM_RULES_FIELD=

VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
```

### Belangrijke notities

- Zet **geen Supabase service role key** in de frontend.
- Zonder Google Form-config werkt de booking UI nog steeds, maar er wordt niets extern doorgestuurd.
- Zonder Supabase-config toont de memberpagina een duidelijke melding dat login nog niet geactiveerd is.

## Lokalisatie

De applicatie ondersteunt momenteel:

- `nl`
- `en`
- `de`

### Hoe de taal werkt

- De app wordt gewrapt door `LanguageProvider` in `src/main.tsx`.
- De actieve taal wordt opgeslagen onder localStorage key: `site-language`.
- De HTML-root krijgt automatisch:
  - `lang="..."`
  - `data-language="..."`

### Waar vertalingen leven

- Centrale event- en pricingdata: `src/lib/siteData.ts`
- Page-level copy: direct in pagina-componenten zoals:
  - `HomeV3.tsx`
  - `EventsV3.tsx`
  - `BookingV2.tsx`
  - `CommunityV2.tsx`

### Richtlijn voor nieuwe content

Als je nieuwe copy toevoegt, voeg die dan **altijd** in alle drie de talen toe. De codebase gaat op veel plekken uit van een complete `nl / en / de` set.

## Branding en assets

### Standaard logo

De standaard online logo-bron is:

```text
public/inderooslogo2.png
```

Deze asset wordt gebruikt als basis voor consistente web- en social branding.

### Afgeleide web-assets

De volgende bestanden zijn gegenereerd om online branding consistent te houden:

- `public/apple-touch-icon.png`
- `public/favicon.ico`
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/og-image.png`

### Meta-verwijzingen

`index.html` verwijst naar deze assets voor:

- browser favicon
- Apple touch icon
- Open Graph social preview
- Twitter social preview

### Als het logo verandert

Wanneer `inderooslogo2.png` wordt vervangen, moeten de afgeleide web-assets opnieuw worden gemaakt om visuele consistentie te behouden.

## Booking- en RSVP-flow

De bookingflow leeft in `src/pages/BookingV2.tsx`.

### Wat de flow ondersteunt

- keuze tussen **ticket** en **membership**
- selectie van een event / weekender
- keuze van tickettype of membershipplan
- contactgegevens
- extra notities
- 18+ bevestiging
- akkoord op huisregels
- samenvatting en vervolgstappen

### Databronnen

De bookingflow gebruikt vooral data uit `src/lib/siteData.ts`:

- `ticketOptions`
- `membershipPlans`
- `weekenders`

### Wat er technisch gebeurt bij submit

1. De form valideert verplichte velden client-side.
2. Er wordt een reserveringsobject samengesteld.
3. De reservering wordt lokaal opgeslagen via `useLocalStorage` onder de key `reservations`.
4. Als Google Form-config aanwezig is, wordt er een `POST` gedaan naar het Google Form endpoint.
5. Daarna volgt redirect naar de bedanktpagina.

### Belangrijke nuance

Deze repo bevat **geen volwaardige backend booking-opslag**. De flow combineert:

- lokale opslag voor frontendstatus
- optionele externe submit via Google Forms

## Member login en Supabase-auth

De memberomgeving leeft in `src/pages/CommunityV2.tsx`, met authlogica in `src/lib/memberAuth.ts`.

### Ondersteund

- inloggen
- registreren
- uitloggen
- sessieherstel vanuit lokale opslag
- profiel ophalen na login

### Technische aanpak

De code gebruikt **directe fetch-calls naar Supabase Auth REST endpoints**, niet de `@supabase/supabase-js` client library.

### Sessiebeheer

Sessions worden opgeslagen onder localStorage key:

```text
inderoos-member-session
```

### Gedrag bij ontbrekende config

Als `VITE_SUPABASE_URL` of `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` ontbreekt:

- blijft de pagina bruikbaar
- maar toont de member UI dat login nog niet actief is

### Gedrag bij sign-up

Afhankelijk van de instellingen in Supabase:

- kan registratie direct een sessie opleveren
- of eerst e-mailbevestiging vereisen

## Leeftijdsverificatie

De 18+ gate leeft in `src/components/AgeVerification.tsx`.

### Gedrag

- fullscreen overlay bij eerste bezoek
- taalwissel binnen de modal
- keuze wordt onthouden in localStorage
- weigeren stuurt de bezoeker weg van de site

### LocalStorage key

```text
inderoos_age_verified
```

### Opmerking

De huidige implementatie gebruikt **localStorage-persistentie**. In de UX-copy wordt gesproken over functionele cookies, maar technisch is dit op dit moment client-side opslag in de browser.

## Contentbeheer

### Waar update je wat?

- **eventkalender, tickets, memberships**
  - `src/lib/siteData.ts`

- **homepage copy**
  - `src/pages/HomeV3.tsx`

- **eventpagina copy**
  - `src/pages/EventsV3.tsx`

- **bookingtekst en validatiecopy**
  - `src/pages/BookingV2.tsx`

- **member flow copy**
  - `src/pages/CommunityV2.tsx`

- **logo- en web-assets**
  - `public/`
  - `index.html`

- **juridische content**
  - `src/pages/Terms.tsx`
  - `src/pages/Privacy.tsx`

### Richtlijnen voor copy

Nieuwe copy hoort consistent te blijven met de merkstijl:

- luxueus
- discreet
- direct maar verfijnd
- sensueel zonder plat te worden
- exclusief en psychologisch geladen

## Release-checklist

Gebruik deze checklist bij grotere content-, brand- of productie-updates:

- [ ] Homepage en kerncopy zijn bijgewerkt in `nl`, `en` en `de`
- [ ] Eventtitels, descriptions, tickets en memberships zijn inhoudelijk consistent
- [ ] `public/inderooslogo2.png` en afgeleide web-assets zijn nog synchroon
- [ ] `index.html` meta tags verwijzen naar de juiste favicon- en social-previewbestanden
- [ ] Bookingflow is getest met en zonder Google Form-configuratie
- [ ] Member login is getest als Supabase-configuratie aanwezig is
- [ ] Leeftijdsverificatie opent correct in een schone browsersessie
- [ ] Favicons en social preview zijn gecontroleerd na een harde refresh of in een privévenster

## Deployment-notes

### Vite-config

De app gebruikt momenteel in `vite.config.ts`:

```ts
base: './'
```

### BrowserRouter

Omdat de app `BrowserRouter` gebruikt, moet je host / platform onbekende routes terugschrijven naar `index.html`.

Voorbeelden:

- Netlify: redirect rule / SPA fallback
- Vercel: rewrite config
- custom static host: fallback naar `index.html`

### Social sharing

De meta tags in `index.html` zijn nu gekoppeld aan:

- `og-image.png`
- favicon assets
- Apple touch icon

Als je op productie een extern domein gebruikt en maximale compatibiliteit wilt voor socials, controleer dan of je uiteindelijk absolute production URLs wilt gebruiken voor `og:image`.

### Subdirectory deployment

De app gebruikt op sommige plekken root-relatieve assetpaden in `index.html`. Als je de site niet op domein-root maar op een subpad host, controleer dan expliciet:

- favicon paden
- Apple touch icon pad
- Open Graph image pad

## Troubleshooting

### Oude favicon blijft zichtbaar

Browsers cachen faviconbestanden agressief. Controleer daarom bij voorkeur via:

- een harde refresh
- een incognito- of privévenster
- handmatig legen van browsercache

### Member login is niet beschikbaar

Controleer of deze variabelen aanwezig zijn:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

Als één van beide ontbreekt, blijft de pagina werken maar wordt de loginflow niet geactiveerd.

### Bookingflow verstuurt lokaal maar niet extern

Controleer de Google Forms configuratie:

- `VITE_GOOGLE_FORM_ACTION_URL`
- `VITE_GOOGLE_FORM_NAME_FIELD`
- `VITE_GOOGLE_FORM_EMAIL_FIELD`
- `VITE_GOOGLE_FORM_PHONE_FIELD`
- `VITE_GOOGLE_FORM_SELECTION_FIELD`
- `VITE_GOOGLE_FORM_RULES_FIELD`

Let op: door `mode: 'no-cors'` krijg je in de frontend geen uitgebreide succes- of foutresponse terug.

### Directe routes geven 404 op productie

De app gebruikt `BrowserRouter`. Voeg daarom op je host altijd een SPA fallback of rewrite naar `index.html` toe.

## Bekende aandachtspunten

### Lintstatus

`npm run lint` rapporteert momenteel nog bestaande issues in andere delen van de codebase. Denk aan:

- enkele shared UI-bestanden
- bepaalde oudere helper- of paginafiles

Dat betekent:

- recente losse bestanden kunnen schoon zijn
- maar de repo als geheel is nog niet volledig lint-groen

### Google Forms submit

De Google Form integratie gebruikt `mode: 'no-cors'`. Daardoor kan de frontend geen rijke succes- of foutresponse teruglezen uit het verzoek.

### Frontend-only delen

Een aantal flows in deze repo zijn bewust frontend-gericht. Voor productie op grotere schaal is het verstandig om later te beoordelen of je extra backend-ondersteuning wilt voor:

- duurzame reservation storage
- audit logging
- admin management
- event-toegang en screening workflow

## Samenvatting

In De Roos is op dit moment een duidelijke combinatie van:

- een hoogwaardige merkervaring
- meertalige eventpresentatie
- een client-side RSVP-flow
- een Supabase-gedreven member login
- consistente branding-assets

Als je deze codebase verder uitbreidt, zijn de belangrijkste centrale punten om scherp te houden:

- `src/lib/siteData.ts`
- `src/App.tsx`
- `src/pages/HomeV3.tsx`
- `src/pages/BookingV2.tsx`
- `src/pages/CommunityV2.tsx`
- `index.html`
- `public/inderooslogo2.png` en afgeleide web-assets
