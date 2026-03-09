import type { Language } from '../context/LanguageContext';
import type { Event } from '../types';

export type LocalizedString = Record<Language, string>;

export interface TicketOption {
  id: 'vrouw' | 'stel' | 'man';
  label: LocalizedString;
  price: number;
  description: LocalizedString;
}

export interface MembershipPlan {
  id: 'standard' | 'koppel' | 'baller';
  name: LocalizedString;
  price: number;
  priceLabel: LocalizedString;
  description: LocalizedString;
  perks: LocalizedString[];
}

export interface Weekender {
  id: string;
  weekNumber: number;
  seasonKey: 'march' | 'april' | 'may-june' | 'summer' | 'autumn' | 'december';
  seasonLabel: LocalizedString;
  title: LocalizedString;
  startLabel?: LocalizedString;
  schedule: LocalizedString;
  atmosphere: LocalizedString;
  image: string;
}

export const languageOptions: Array<{ code: Language; label: string }> = [
  { code: 'nl', label: 'NL' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
];

export const ticketOptions: TicketOption[] = [
  {
    id: 'vrouw',
    label: {
      nl: 'Vrouw',
      en: 'Woman',
      de: 'Frau',
    },
    price: 75,
    description: {
      nl: 'Los ticket voor discrete toegang tot een gekozen weekender.',
      en: 'Single-entry ticket for a selected discreet weekender.',
      de: 'Einzelticket für diskreten Zugang zu einem ausgewählten Weekender.',
    },
  },
  {
    id: 'stel',
    label: {
      nl: 'Stel',
      en: 'Couple',
      de: 'Paar',
    },
    price: 100,
    description: {
      nl: 'Samen binnen, samen gevet door onze hosts.',
      en: 'Enter together and get vetted together by our hosts.',
      de: 'Gemeinsam eintreten und gemeinsam von unseren Hosts geprüft werden.',
    },
  },
  {
    id: 'man',
    label: {
      nl: 'Man',
      en: 'Man',
      de: 'Mann',
    },
    price: 150,
    description: {
      nl: 'Individuele toegang onder strikte balans- en vibe-check.',
      en: 'Individual access under a strict balance and vibe check.',
      de: 'Individueller Zugang unter strenger Balance- und Vibe-Prüfung.',
    },
  },
];

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'standard',
    name: {
      nl: 'The Standard',
      en: 'The Standard',
      de: 'The Standard',
    },
    price: 250,
    priceLabel: {
      nl: '€ 250 p/m',
      en: '€250 / month',
      de: '250 € / Monat',
    },
    description: {
      nl: 'Toegang tot alle grote nationale en internationale feestdag-edities.',
      en: 'Access to all major national and international holiday editions.',
      de: 'Zugang zu allen großen nationalen und internationalen Feiertags-Editionen.',
    },
    perks: [
      {
        nl: 'Curated holiday line-up',
        en: 'Curated holiday line-up',
        de: 'Kuratiertes Feiertags-Line-up',
      },
      {
        nl: 'Voorrang op community-updates',
        en: 'Priority on community updates',
        de: 'Vorrang bei Community-Updates',
      },
      {
        nl: 'Toegang tot laatste-kans rollover weekends',
        en: 'Access to last-chance rollover weekends',
        de: 'Zugang zu Last-Chance-Rollover-Wochenenden',
      },
    ],
  },
  {
    id: 'koppel',
    name: {
      nl: 'The Koppel / Plus-One',
      en: 'The Couple / Plus-One',
      de: 'The Couple / Plus-One',
    },
    price: 500,
    priceLabel: {
      nl: '€ 500 p/m',
      en: '€500 / month',
      de: '500 € / Monat',
    },
    description: {
      nl: 'Elke week toegang tot 1 locatie naar keuze, inclusief thema-weekenden.',
      en: 'Weekly access to 1 venue of choice, including themed weekends.',
      de: 'Wöchentlich Zugang zu 1 Wunschlocation inklusive Themen-Wochenenden.',
    },
    perks: [
      {
        nl: '1 locatie per week naar keuze',
        en: '1 venue per week of choice',
        de: '1 Wunschlocation pro Woche',
      },
      {
        nl: 'Inclusief thema-weekenden',
        en: 'Includes themed weekends',
        de: 'Inklusive Themen-Wochenenden',
      },
      {
        nl: 'Plus-one flexibiliteit',
        en: 'Plus-one flexibility',
        de: 'Plus-one-Flexibilität',
      },
    ],
  },
  {
    id: 'baller',
    name: {
      nl: 'The Baller / All-Access',
      en: 'The Baller / All-Access',
      de: 'The Baller / All-Access',
    },
    price: 1000,
    priceLabel: {
      nl: '€ 1.000 p/m',
      en: '€1,000 / month',
      de: '1.000 € / Monat',
    },
    description: {
      nl: 'VIP-status met onbeperkte toegang tot alle locaties tegelijk en voorrang bij RSVP.',
      en: 'VIP status with unlimited access across all venues and priority RSVP.',
      de: 'VIP-Status mit unbegrenztem Zugang zu allen Locations und RSVP-Priorität.',
    },
    perks: [
      {
        nl: 'VIP-prioriteit bij RSVP',
        en: 'VIP RSVP priority',
        de: 'VIP-RSVP-Priorität',
      },
      {
        nl: 'Onbeperkte toegang tot alle locaties',
        en: 'Unlimited access to all venues',
        de: 'Unbegrenzter Zugang zu allen Locations',
      },
      {
        nl: 'Directe lijn voor drops en updates',
        en: 'Direct line for drops and updates',
        de: 'Direkter Draht für Drops und Updates',
      },
    ],
  },
];

const weekenderSchedule: LocalizedString = {
  nl: 'Vrijdag 21:00 tot maandag 05:00',
  en: 'Friday 21:00 until Monday 05:00',
  de: 'Freitag 21:00 bis Montag 05:00',
};

const seasonLabels = {
  march: {
    nl: 'Maart',
    en: 'March',
    de: 'März',
  },
  april: {
    nl: 'April',
    en: 'April',
    de: 'April',
  },
  'may-june': {
    nl: 'Mei / Juni',
    en: 'May / June',
    de: 'Mai / Juni',
  },
  summer: {
    nl: 'Zomer',
    en: 'Summer',
    de: 'Sommer',
  },
  autumn: {
    nl: 'Najaar',
    en: 'Autumn',
    de: 'Herbst',
  },
  december: {
    nl: 'December',
    en: 'December',
    de: 'Dezember',
  },
} as const;

export const weekenders: Weekender[] = [
  {
    id: 'week-12-arab-suikerfeest',
    weekNumber: 12,
    seasonKey: 'march',
    seasonLabel: seasonLabels.march,
    title: {
      nl: 'Arab / Suikerfeest',
      en: 'Arab / Eid Edition',
      de: 'Arab / Eid Edition',
    },
    startLabel: {
      nl: 'Start 19 maart',
      en: 'Starts March 19',
      de: 'Startet am 19. März',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Warm licht, zachte stoffen en een late-night crowd die discretie begrijpt.',
      en: 'Warm lighting, soft textures, and a late-night crowd that understands discretion.',
      de: 'Warmes Licht, weiche Texturen und ein Late-Night-Publikum mit Sinn für Diskretion.',
    },
    image: '/images/event_cuck.jpg',
  },
  {
    id: 'week-13-lost-hour',
    weekNumber: 13,
    seasonKey: 'march',
    seasonLabel: seasonLabels.march,
    title: {
      nl: 'Lost Hour',
      en: 'Lost Hour',
      de: 'Lost Hour',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Een donker, strak weekend waarin tijd verdwijnt en de afterglow blijft hangen.',
      en: 'A dark, tight weekend where time disappears and the afterglow lingers.',
      de: 'Ein dunkles, präzises Wochenende, in dem Zeit verschwindet und der Nachhall bleibt.',
    },
    image: '/images/event_bbc.jpg',
  },
  {
    id: 'week-14-pasen',
    weekNumber: 14,
    seasonKey: 'april',
    seasonLabel: seasonLabels.april,
    title: {
      nl: 'Pasen',
      en: 'Easter',
      de: 'Ostern',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Een lange paasnacht met geheime adressen, stille entree en zware bas.',
      en: 'A long Easter night with secret addresses, silent entry, and heavy bass.',
      de: 'Eine lange Osternacht mit geheimen Adressen, stillem Einlass und tiefem Bass.',
    },
    image: '/images/event_swingers.jpg',
  },
  {
    id: 'week-15-orthodox-pasen',
    weekNumber: 15,
    seasonKey: 'april',
    seasonLabel: seasonLabels.april,
    title: {
      nl: 'Orthodox Pasen',
      en: 'Orthodox Easter',
      de: 'Orthodoxe Ostern',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Internationale energie, lange tafels, gesloten kringen en een underground tempo.',
      en: 'International energy, long tables, closed circles, and an underground tempo.',
      de: 'Internationale Energie, lange Tafeln, geschlossene Kreise und Underground-Tempo.',
    },
    image: '/images/theme_bdsm.jpg',
  },
  {
    id: 'week-17-koningsdag',
    weekNumber: 17,
    seasonKey: 'april',
    seasonLabel: seasonLabels.april,
    title: {
      nl: 'Koningsdag',
      en: 'King’s Day',
      de: 'Königstag',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Oranje rook, privé-villa’s en een guestlist die van speels naar meedogenloos gaat.',
      en: 'Orange haze, private villas, and a guest list that moves from playful to ruthless.',
      de: 'Oranger Dunst, private Villen und eine Gästeliste von verspielt bis gnadenlos.',
    },
    image: '/images/safety_hosts.jpg',
  },
  {
    id: 'week-18-bevrijdingsdag',
    weekNumber: 18,
    seasonKey: 'may-june',
    seasonLabel: seasonLabels['may-june'],
    title: {
      nl: 'Bevrijdingsdag',
      en: 'Liberation Day',
      de: 'Befreiungstag',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Ruime zalen, diepe house en een crowd die vrijheid serieus neemt.',
      en: 'Wide rooms, deep house, and a crowd that takes freedom seriously.',
      de: 'Große Räume, Deep House und eine Crowd, die Freiheit ernst nimmt.',
    },
    image: '/images/event_cuck.jpg',
  },
  {
    id: 'week-19-moederdag',
    weekNumber: 19,
    seasonKey: 'may-june',
    seasonLabel: seasonLabels['may-june'],
    title: {
      nl: 'Moederdag',
      en: 'Mother’s Day',
      de: 'Muttertag',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Zachte luxe, kaarslicht en een room-to-room flow vol spanning.',
      en: 'Soft luxury, candlelight, and a room-to-room flow full of tension.',
      de: 'Sanfter Luxus, Kerzenlicht und ein raumübergreifender Flow voller Spannung.',
    },
    image: '/images/event_bbc.jpg',
  },
  {
    id: 'week-21-pinksteren',
    weekNumber: 21,
    seasonKey: 'may-june',
    seasonLabel: seasonLabels['may-june'],
    title: {
      nl: 'Pinksteren',
      en: 'Pentecost',
      de: 'Pfingsten',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Een lang weekend met extra drop-windows en besloten afterhours.',
      en: 'A long weekend with extra drop windows and members-only afterhours.',
      de: 'Ein langes Wochenende mit zusätzlichen Drop-Fenstern und Afterhours nur für Mitglieder.',
    },
    image: '/images/event_swingers.jpg',
  },
  {
    id: 'week-25-vaderdag',
    weekNumber: 25,
    seasonKey: 'may-june',
    seasonLabel: seasonLabels['may-june'],
    title: {
      nl: 'Vaderdag',
      en: 'Father’s Day',
      de: 'Vatertag',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Donkere bar, old-money styling en een strakke deurselectie.',
      en: 'Dark bar, old-money styling, and a tight door selection.',
      de: 'Dunkle Bar, Old-Money-Styling und eine strenge Türselektion.',
    },
    image: '/images/theme_bdsm.jpg',
  },
  {
    id: 'week-26-hugh-hefner',
    weekNumber: 26,
    seasonKey: 'may-june',
    seasonLabel: seasonLabels['may-june'],
    title: {
      nl: 'Hugh Hefner Edition',
      en: 'Hugh Hefner Edition',
      de: 'Hugh Hefner Edition',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Velvet, suites, late bottles en hosts met een zwak voor glamour.',
      en: 'Velvet, suites, late bottles, and hosts with a weakness for glamour.',
      de: 'Samt, Suiten, späte Flaschen und Hosts mit einer Schwäche für Glamour.',
    },
    image: '/images/safety_hosts.jpg',
  },
  {
    id: 'week-28-princess-diana',
    weekNumber: 28,
    seasonKey: 'summer',
    seasonLabel: seasonLabels.summer,
    title: {
      nl: 'Princess Diana',
      en: 'Princess Diana',
      de: 'Princess Diana',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Zomerwit, geheime tuinen en een crowd die weet hoe je grand entrance maakt.',
      en: 'Summer white, secret gardens, and a crowd that knows how to make a grand entrance.',
      de: 'Sommerweiß, geheime Gärten und eine Crowd mit Sinn für den großen Auftritt.',
    },
    image: '/images/event_cuck.jpg',
  },
  {
    id: 'week-29-elvis-presley',
    weekNumber: 29,
    seasonKey: 'summer',
    seasonLabel: seasonLabels.summer,
    title: {
      nl: 'Elvis Presley',
      en: 'Elvis Presley',
      de: 'Elvis Presley',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Gouden spots, midnight sets en een rock-and-roll randje aan de dresscode.',
      en: 'Golden spots, midnight sets, and a rock-and-roll edge to the dress code.',
      de: 'Goldene Spots, Mitternachts-Sets und eine Rock-’n’-Roll-Kante in der Dresscode.',
    },
    image: '/images/event_bbc.jpg',
  },
  {
    id: 'week-30-marilyn-monroe',
    weekNumber: 30,
    seasonKey: 'summer',
    seasonLabel: seasonLabels.summer,
    title: {
      nl: 'Marilyn Monroe',
      en: 'Marilyn Monroe',
      de: 'Marilyn Monroe',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Soft focus, veel spiegelwerk en kamers die pas laat echt wakker worden.',
      en: 'Soft focus, plenty of mirrors, and rooms that truly wake up late.',
      de: 'Soft Focus, viele Spiegel und Räume, die erst spät wirklich wach werden.',
    },
    image: '/images/event_swingers.jpg',
  },
  {
    id: 'week-37-cosplay',
    weekNumber: 37,
    seasonKey: 'autumn',
    seasonLabel: seasonLabels.autumn,
    title: {
      nl: 'Cosplay',
      en: 'Cosplay',
      de: 'Cosplay',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Maskers, karakterspel en een crowd die volledig in het thema duikt.',
      en: 'Masks, character play, and a crowd that fully leans into the theme.',
      de: 'Masken, Rollenspiel und eine Crowd, die komplett im Thema aufgeht.',
    },
    image: '/images/theme_bdsm.jpg',
  },
  {
    id: 'week-38-yom-kippur',
    weekNumber: 38,
    seasonKey: 'autumn',
    seasonLabel: seasonLabels.autumn,
    title: {
      nl: 'Yom Kippur',
      en: 'Yom Kippur',
      de: 'Yom Kippur',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Ingetogen luxe, lage lichten en een uiterst selecte member mix.',
      en: 'Restrained luxury, low lights, and an extremely selective member mix.',
      de: 'Zurückhaltender Luxus, gedimmtes Licht und ein äußerst selektiver Member-Mix.',
    },
    image: '/images/safety_hosts.jpg',
  },
  {
    id: 'week-39-oktoberfest',
    weekNumber: 39,
    seasonKey: 'autumn',
    seasonLabel: seasonLabels.autumn,
    title: {
      nl: 'Oktoberfest',
      en: 'Oktoberfest',
      de: 'Oktoberfest',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Diepe houttinten, grote tafels en een rauwere late-night energie.',
      en: 'Deep wood tones, long tables, and a rougher late-night energy.',
      de: 'Tiefe Holztöne, lange Tafeln und eine rauere Late-Night-Energie.',
    },
    image: '/images/event_cuck.jpg',
  },
  {
    id: 'week-42-ade',
    weekNumber: 42,
    seasonKey: 'autumn',
    seasonLabel: seasonLabels.autumn,
    title: {
      nl: 'ADE',
      en: 'ADE',
      de: 'ADE',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Festivalweek, nachtelijke drops en een internationale RSVP-stroom.',
      en: 'Festival week, nighttime drops, and an international RSVP flow.',
      de: 'Festivalwoche, nächtliche Drops und ein internationaler RSVP-Flow.',
    },
    image: '/images/event_bbc.jpg',
  },
  {
    id: 'week-43-wintertijd',
    weekNumber: 43,
    seasonKey: 'autumn',
    seasonLabel: seasonLabels.autumn,
    title: {
      nl: 'Wintertijd',
      en: 'Winter Time',
      de: 'Winterzeit',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Nog een extra uur duisternis voor een nacht die langer blijft plakken.',
      en: 'One extra hour of darkness for a night that lingers even longer.',
      de: 'Eine zusätzliche Stunde Dunkelheit für eine Nacht, die noch länger nachwirkt.',
    },
    image: '/images/event_swingers.jpg',
  },
  {
    id: 'week-44-halloween',
    weekNumber: 44,
    seasonKey: 'autumn',
    seasonLabel: seasonLabels.autumn,
    title: {
      nl: 'Halloween',
      en: 'Halloween',
      de: 'Halloween',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Capes, latex, fog machines en een bunker-vibe tot diep in de maandag.',
      en: 'Capes, latex, fog machines, and a bunker vibe deep into Monday.',
      de: 'Umhänge, Latex, Nebelmaschinen und eine Bunker-Vibe bis tief in den Montag.',
    },
    image: '/images/theme_bdsm.jpg',
  },
  {
    id: 'week-49-sinterklaas',
    weekNumber: 49,
    seasonKey: 'december',
    seasonLabel: seasonLabels.december,
    title: {
      nl: 'Sinterklaas',
      en: 'Saint Nicholas',
      de: 'Sankt Nikolaus',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Donkere chocolade, rode details en een playfully strict guest flow.',
      en: 'Dark chocolate, red accents, and a playfully strict guest flow.',
      de: 'Dunkle Schokolade, rote Akzente und ein spielerisch strenger Gästefluss.',
    },
    image: '/images/safety_hosts.jpg',
  },
  {
    id: 'week-52-kerst',
    weekNumber: 52,
    seasonKey: 'december',
    seasonLabel: seasonLabels.december,
    title: {
      nl: 'Kerst',
      en: 'Christmas',
      de: 'Weihnachten',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Fluwelen salons, lange diners en een zacht maar meedogenloos tempo.',
      en: 'Velvet salons, long dinners, and a soft but relentless tempo.',
      de: 'Samtige Salons, lange Dinner und ein sanftes, aber kompromissloses Tempo.',
    },
    image: '/images/event_cuck.jpg',
  },
  {
    id: 'week-53-oud-nieuw',
    weekNumber: 53,
    seasonKey: 'december',
    seasonLabel: seasonLabels.december,
    title: {
      nl: 'Oud & Nieuw',
      en: 'New Year’s Eve',
      de: 'Silvester',
    },
    schedule: weekenderSchedule,
    atmosphere: {
      nl: 'Champagne, countdowns, discrete fireworks en een nieuwe guestlist bij middernacht.',
      en: 'Champagne, countdowns, discreet fireworks, and a new guest list at midnight.',
      de: 'Champagner, Countdowns, diskretes Feuerwerk und eine neue Gästeliste um Mitternacht.',
    },
    image: '/images/event_bbc.jpg',
  },
];

export const getLocalizedText = (value: LocalizedString, language: Language) => value[language] ?? value.nl;

export const getLocalizedWeekenders = (language: Language) =>
  weekenders.map((weekender) => ({
    ...weekender,
    seasonLabelText: getLocalizedText(weekender.seasonLabel, language),
    titleText: getLocalizedText(weekender.title, language),
    startLabelText: weekender.startLabel ? getLocalizedText(weekender.startLabel, language) : '',
    scheduleText: getLocalizedText(weekender.schedule, language),
    atmosphereText: getLocalizedText(weekender.atmosphere, language),
  }));

export const getUpcomingEvents = (): Event[] =>
  weekenders.map((weekender) => ({
    id: weekender.id,
    title: weekender.title.nl,
    theme: weekender.id,
    date: weekender.startLabel?.nl ? `Week ${weekender.weekNumber} · ${weekender.startLabel.nl}` : `Week ${weekender.weekNumber}`,
    day: 'weekender',
    time: weekender.schedule.nl,
    price: {
      man: 150,
      stel: 100,
      vrouw: 75,
    },
    image: weekender.image,
    description: weekender.atmosphere.nl,
    included: [
      'Strict no-phone policy',
      'Secret location revealed on event day',
      '18+ and ID required',
      'Rollover on cancellation',
    ],
    weekNumber: weekender.weekNumber,
    season: weekender.seasonLabel.nl,
    isActive: true,
  }));
