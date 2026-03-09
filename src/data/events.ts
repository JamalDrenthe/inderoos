import type { Event, Theme, Testimonial } from '../types';

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

export const getUpcomingEvents = (): Event[] => {
  const today = new Date();
  const events: Event[] = [];
  
  // Generate events for the next 4 weekends
  for (let i = 0; i < 4; i++) {
    const friday = new Date(today);
    friday.setDate(today.getDate() + ((5 + 7 - today.getDay()) % 7) + (i * 7));
    
    const saturday = new Date(friday);
    saturday.setDate(friday.getDate() + 1);
    
    const sunday = new Date(friday);
    sunday.setDate(friday.getDate() + 2);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('nl-NL', { 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
      });
    };

    // Friday - Cuck & Hotwife
    events.push({
      id: `cuck-${friday.toISOString().split('T')[0]}`,
      title: 'Cuck & Hotwife',
      theme: 'cuck',
      date: formatDate(friday),
      day: 'vrijdag',
      time: '22:00',
      price: { man: 150, stel: 75, vrouw: 50 },
      image: '/images/event_cuck.jpg',
      description: 'Een avond waarin de hotwife centraal staat en de cuck toekijkt – of meer. Ervaar de dynamiek van verlangen en overgave.',
      included: ['Drankjes', 'Hapjes', 'Handdoeken', 'Massages'],
    });

    // Saturday - BBC Night
    events.push({
      id: `bbc-${saturday.toISOString().split('T')[0]}`,
      title: 'BBC Night',
      theme: 'bbc',
      date: formatDate(saturday),
      day: 'zaterdag',
      time: '21:00',
      price: { man: 150, stel: 75, vrouw: 50 },
      image: '/images/event_bbc.jpg',
      description: 'Ontmoet gelijkgestemden in een interracial setting. Respect en plezier staan voorop.',
      included: ['Drankjes', 'Hapjes', 'Handdoeken', 'Massages'],
    });

    // Sunday - Swingers Social
    events.push({
      id: `swingers-${sunday.toISOString().split('T')[0]}`,
      title: 'Swingers Social',
      theme: 'swingers',
      date: formatDate(sunday),
      day: 'zondag',
      time: '19:00',
      price: { man: 150, stel: 75, vrouw: 50 },
      image: '/images/event_swingers.jpg',
      description: 'De klassieke swingeravond: stellen en singles ontmoeten elkaar in een ontspannen sfeer.',
      included: ['Drankjes', 'Hapjes', 'Handdoeken', 'Massages'],
    });
  }

  return events;
};

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
