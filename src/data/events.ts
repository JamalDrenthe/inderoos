import type { Event, Theme, Testimonial } from '../types';
import { getUpcomingEvents as getSiteUpcomingEvents } from '../lib/siteData';

export const themes: Theme[] = [
  {
    id: 'cuck',
    name: 'Cuck & Hotwife',
    description: 'Een avond waarin de hotwife centraal staat en de cuck toekijkt – of meer. Ervaar de dynamiek van verlangen en overgave.',
    image: '/images/event_cuck.jpg',
  },
  {
    id: 'bbc',
    name: 'BBC Night',
    description: 'Ontmoet gelijkgestemden in een interracial setting. Respect en plezier staan voorop.',
    image: '/images/event_bbc.jpg',
  },
  {
    id: 'swingers',
    name: 'Swingers Nights',
    description: 'De klassieke swingeravond: stellen en singles ontmoeten elkaar in een ontspannen sfeer.',
    image: '/images/event_swingers.jpg',
  },
  {
    id: 'bdsm',
    name: 'BDSM Nights',
    description: 'Voor de liefhebbers van kink: ontdek je grenzen met touw, leer en speeltjes. Veiligheid en consent zijn essentieel.',
    image: '/images/theme_bdsm.jpg',
  },
];

export const getUpcomingEvents = (): Event[] => getSiteUpcomingEvents();

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Anna & Mark',
    quote: 'De sfeer was respectvol en opwindend tegelijk. De hosts zorgden ervoor dat iedereen zich op zijn gemak voelde.',
    image: '/images/testimonial_1.jpg',
  },
  {
    id: '2',
    name: 'Lisa',
    quote: 'Fijne hosts, schone locatie, geen gedoe. Alles was perfect geregeld van begin tot eind.',
    image: '/images/testimonial_2.jpg',
  },
  {
    id: '3',
    name: 'Tom & Kim',
    quote: 'We wisten niet wat we konden verwachten, maar het voelde direct veilig. Zeker voor herhaling vatbaar!',
    image: '/images/testimonial_3.jpg',
  },
];

export const benefits = [
  {
    id: 'drinks',
    title: 'Drankjes & Hapjes',
    description: 'Fris, bier, wijn en kleine bites de hele avond.',
    image: '/images/benefit_drinks.jpg',
  },
  {
    id: 'towels',
    title: 'Handdoeken & Hygiëne',
    description: 'Schone handdoeken, douches en verzorgingsproducten.',
    image: '/images/benefit_towels.jpg',
  },
  {
    id: 'massage',
    title: 'Massage & Ontspanning',
    description: 'Professionele massage tussen de sessies door.',
    image: '/images/benefit_massage.jpg',
  },
];
