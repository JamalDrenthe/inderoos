# In De Roos

In De Roos is een meertalige React-webapp voor een besloten nightlife- en
eventconcept. De site combineert een donkere, elegante merkpresentatie met
eventinformatie, RSVP's, memberships en een afgeschermde memberomgeving.

## Functionaliteit

- Meertalige interface in Nederlands, Engels en Duits.
- 18+ leeftijdsverificatie met onthouden keuze.
- Homepage, evenementenoverzicht en eventdetails.
- Ticket- en membershipprijzen.
- RSVP- en bookingflow met client-side validatie.
- Optionele verzending van aanvragen via Google Forms.
- Member login, registratie, profiel en communityfuncties via Supabase Auth.
- Adminpagina's voor beheer van onder andere blogcontent en vacatures.
- Veiligheidsinformatie, huisregels, privacy, voorwaarden en contact.
- Responsive navigatie, branding, favicon en social-preview assets.

## Tech stack

- React 19
- TypeScript 5
- Vite 7
- React Router DOM 7
- Tailwind CSS 3
- Radix UI
- Framer Motion en GSAP
- Lucide React
- Supabase Auth via directe REST-calls
- npm

## Lokaal starten

### Vereisten

- Node.js 20 of nieuwer
- npm

### Installeren en ontwikkelen

```bash
npm install
npm run dev
```

Vite toont daarna de lokale URL in de terminal.

### Scripts

| Script | Doel |
| --- | --- |
| `npm run dev` | Start de Vite-developmentserver |
| `npm run build` | Voert TypeScript-checks uit en maakt een productiebuild |
| `npm run lint` | Controleert de code met ESLint |
| `npm run preview` | Serveert de productiebuild lokaal |

## Omgevingsvariabelen

Maak lokaal een `.env`-bestand aan wanneer je externe integraties wilt
gebruiken. Alle variabelen zijn optioneel voor het bekijken van de basis-UI.

| Variabele | Gebruik |
| --- | --- |
| `VITE_GOOGLE_FORM_ACTION_URL` | Endpoint voor RSVP-formulieren |
| `VITE_GOOGLE_FORM_NAME_FIELD` | Veldsleutel voor de naam |
| `VITE_GOOGLE_FORM_EMAIL_FIELD` | Veldsleutel voor het e-mailadres |
| `VITE_GOOGLE_FORM_PHONE_FIELD` | Veldsleutel voor het telefoonnummer |
| `VITE_GOOGLE_FORM_SELECTION_FIELD` | Veldsleutel voor ticket of membership |
| `VITE_GOOGLE_FORM_RULES_FIELD` | Veldsleutel voor akkoord op de huisregels |
| `VITE_SUPABASE_URL` | Supabase-project-URL voor member login |
| `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Publieke Supabase-key voor member login |

Gebruik nooit een Supabase service-role key in deze frontend.

## Routes

De belangrijkste routes worden gedefinieerd in `src/App.tsx`:

| Route | Functie |
| --- | --- |
| `/` | Homepage en merkintroductie |
| `/evenementen` | Evenementenoverzicht |
| `/prijzen` | Tickets en memberships |
| `/boeking` | RSVP- en bookingflow |
| `/boeking/:eventId` | Booking voor een specifiek evenement |
| `/community` | Member login en memberomgeving |
| `/dames-heren` | Profielen en filters |
| `/veiligheid` en `/huisregels` | Veiligheid en gedragsregels |
| `/vacatures` | Vacatures |
| `/contact` | Contactinformatie |
| `/algemene-voorwaarden` | Algemene voorwaarden |
| `/privacy` | Privacybeleid |
| `/admin` | Adminomgeving |

## Projectstructuur

```text
.
├── public/                 # Logo's, video, muziek en overige media
├── src/
│   ├── components/         # Navigatie, overlays, gates en UI-componenten
│   ├── context/            # Globale taalcontext
│   ├── data/               # Gallery- en contentdata
│   ├── hooks/               # Herbruikbare React-hooks
│   ├── lib/                 # Auth, formulieren en sitegegevens
│   ├── pages/               # Routepagina's
│   ├── types/               # Gedeelde TypeScript-types
│   ├── App.tsx              # Routing en globale app-shell
│   └── main.tsx             # Frontend-entrypoint
├── supabase/               # Database-migraties
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Content en branding aanpassen

- Eventen, tickets en memberships staan in `src/lib/siteData.ts`.
- Taalstatus en lokalisatie worden beheerd via `src/context/`.
- Pagina-inhoud staat in `src/pages/`.
- Navigatie, footer en overlays staan in `src/components/`.
- Logo- en social assets staan in `public/`.

Voeg nieuwe zichtbare teksten toe voor alle drie de ondersteunde talen en
controleer daarna de routes, branding en responsive weergave.

## Controle vóór een release

```bash
npm run lint
npm run build
```

De productiebuild wordt aangemaakt in `dist/` en kan vervolgens op een
statische hostingdienst worden gepubliceerd.
