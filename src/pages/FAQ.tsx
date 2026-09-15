import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, ShieldCheck, Search } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

const FAQ = () => {
  const { language } = useLanguage();
  const [openId, setOpenId] = useState<string>('screening');
  const [searchQuery, setSearchQuery] = useState('');

  const content = {
    nl: {
      badge: 'FAQ',
      title: 'Heldere antwoorden, discreet gehouden.',
      intro:
        'Hier vind je de vragen die het vaakst terugkomen rond tickets, memberships, screening, communicatie en de besloten setting van In De Roos.',
      searchPlaceholder: 'Zoek in veelgestelde vragen...',
      noResults: 'Geen vragen gevonden voor deze zoekopdracht.',
      items: [
        {
          id: 'screening',
          question: 'Hoe werkt de screening?',
          answer:
            'Elke aanvraag wordt eerst bekeken op energie, volwassenheid, balans en discretie. Pas wanneer die basis klopt, sturen we verdere informatie en een betaalverzoek door.',
        },
        {
          id: 'location',
          question: 'Wanneer ontvang ik de locatie?',
          answer:
            'De exacte locatie delen we pas na screening, bevestiging en kort voor het moment zelf. Zo blijft de setting rustig, selectief en veilig voor iedereen die aanwezig is.',
        },
        {
          id: 'tickets',
          question: 'Verkopen jullie weekenders?',
          answer:
            'Nee. Op dit moment werken we alleen met losse kaartjes en memberships. Daarmee houden we de flow helder en de toegang zorgvuldig afgestemd.',
        },
        {
          id: 'payment',
          question: 'Hoe loopt de betaling?',
          answer:
            'Na een positieve screening ontvang je handmatig een Tikkie of betalingsverzoek. Pas na betaling is je plek of membership-aanvraag definitief bevestigd.',
        },
        {
          id: 'phones',
          question: 'Wat zijn de belangrijkste huisregels?',
          answer:
            'Geen telefoons binnen, respect voor consent en grenzen, volwassen communicatie met hosts en gasten, en volledige discretie over locatie en aanwezigen.',
        },
        {
          id: 'community',
          question: 'Wat is het verschil tussen een ticket en een membership?',
          answer:
            'Een ticket is voor een losse aanvraag. Een membership is voor terugkerende toegang, prioriteit in communicatie en een diepere aansluiting op de community-flow.',
        },
      ],
      ctaTitle: 'Nog iets niet gevonden?',
      ctaText: 'Gebruik de contactpagina voor discrete vragen over tickets, memberships, promo of community access.',
      ctaLabel: 'Ga naar contact',
    },
    en: {
      badge: 'FAQ',
      title: 'Clear answers, kept discreet.',
      intro:
        'Here you will find the questions that come back most often around tickets, memberships, screening, communication, and the private setting of In De Roos.',
      searchPlaceholder: 'Search frequently asked questions...',
      noResults: 'No questions found matching your search.',
      items: [
        {
          id: 'screening',
          question: 'How does screening work?',
          answer:
            'Every request is first reviewed for energy, maturity, balance, and discretion. Only when that foundation feels right do we move toward payment and further details.',
        },
        {
          id: 'location',
          question: 'When do I receive the location?',
          answer:
            'We only share the exact location after screening, confirmation, and shortly before the actual moment. That keeps the setting calm, selective, and safe for everyone present.',
        },
        {
          id: 'tickets',
          question: 'Do you sell weekenders?',
          answer:
            'No. At the moment we only work with single tickets and memberships. That keeps the flow clean and access carefully aligned.',
        },
        {
          id: 'payment',
          question: 'How does payment work?',
          answer:
            'After a positive screening you receive a manual Tikkie or payment request. Your place or membership request is only final after payment has been completed.',
        },
        {
          id: 'phones',
          question: 'What are the main house rules?',
          answer:
            'No phones inside, full respect for consent and boundaries, adult communication with hosts and guests, and complete discretion about location and attendees.',
        },
        {
          id: 'community',
          question: 'What is the difference between a ticket and a membership?',
          answer:
            'A ticket is for a single request. A membership is for recurring access, priority communication, and a deeper position inside the community flow.',
        },
      ],
      ctaTitle: 'Still missing something?',
      ctaText: 'Use the contact page for discreet questions about tickets, memberships, promo, or community access.',
      ctaLabel: 'Go to contact',
    },
    de: {
      badge: 'FAQ',
      title: 'Klare Antworten, diskret gehalten.',
      intro:
        'Hier findest du die Fragen, die rund um Tickets, Memberships, Screening, Kommunikation und das private Setting von In De Roos am häufigsten auftauchen.',
      searchPlaceholder: 'Häufig gestellte Fragen durchsuchen...',
      noResults: 'Keine Fragen für diese Suchanfrage gefunden.',
      items: [
        {
          id: 'screening',
          question: 'Wie funktioniert das Screening?',
          answer:
            'Jede Anfrage wird zuerst auf Energie, Reife, Balance und Diskretion geprüft. Erst wenn diese Basis stimmt, gehen wir weiter zu Zahlung und weiteren Details.',
        },
        {
          id: 'location',
          question: 'Wann erhalte ich die Location?',
          answer:
            'Die genaue Location teilen wir erst nach Screening, Bestätigung und kurz vor dem eigentlichen Moment. So bleibt das Setting ruhig, selektiv und sicher für alle Anwesenden.',
        },
        {
          id: 'tickets',
          question: 'Verkauft ihr Weekender?',
          answer:
            'Nein. Aktuell arbeiten wir nur mit Einzeltickets und Memberships. So bleibt der Ablauf klar und der Zugang sorgfältig abgestimmt.',
        },
        {
          id: 'payment',
          question: 'Wie läuft die Zahlung?',
          answer:
            'Nach einem positiven Screening erhältst du manuell eine Tikkie- oder Zahlungsanfrage. Erst nach Zahlung ist dein Platz oder deine Membership-Anfrage final bestätigt.',
        },
        {
          id: 'phones',
          question: 'Was sind die wichtigsten Hausregeln?',
          answer:
            'Keine Telefone innen, voller Respekt für Consent und Grenzen, erwachsene Kommunikation mit Hosts und Gästen und vollständige Diskretion über Location und Anwesende.',
        },
        {
          id: 'community',
          question: 'Was ist der Unterschied zwischen Ticket und Membership?',
          answer:
            'Ein Ticket ist für eine einzelne Anfrage gedacht. Eine Membership steht für wiederkehrenden Zugang, priorisierte Kommunikation und eine tiefere Einbindung in den Community-Flow.',
        },
      ],
      ctaTitle: 'Noch etwas offen?',
      ctaText: 'Nutze die Kontaktseite für diskrete Fragen zu Tickets, Memberships, Promo oder Community-Zugang.',
      ctaLabel: 'Zum Kontakt',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return copy.items;
    
    const query = searchQuery.toLowerCase();
    return copy.items.filter(
      item => 
        item.question.toLowerCase().includes(query) || 
        item.answer.toLowerCase().includes(query)
    );
  }, [searchQuery, copy.items]);

  return (
    <div className="min-h-screen px-6 pb-16 pt-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12 max-w-4xl">
          <span className="mono mb-4 block text-[#D61C1C]">{copy.badge}</span>
          <h1 className="mb-5 text-4xl font-black text-white md:text-6xl">{copy.title}</h1>
          <p className="text-lg leading-relaxed text-[#A7A7AB] mb-8">{copy.intro}</p>
          
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder={copy.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-[#141416] py-4 pl-12 pr-6 text-white placeholder-white/30 transition-colors focus:border-[#D61C1C] focus:outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
          </div>
        </section>

        <section className="mb-14 grid gap-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 rounded-[32px] border border-white/5 bg-white/[0.02]">
              <HelpCircle size={32} className="mx-auto mb-4 text-white/20" />
              <p className="text-[#A7A7AB]">{copy.noResults}</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOpen = openId === item.id || (searchQuery && filteredItems.length < 3);
              return (
                <article key={item.id} className="card-dark p-0">
                  <button
                    type="button"
                    onClick={() => setOpenId((prev) => (prev === item.id ? '' : item.id))}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle size={18} className="text-[#D61C1C]" />
                      <h2 className="text-2xl font-bold text-white">{item.question}</h2>
                    </div>
                    <ChevronDown size={20} className={`text-[#A7A7AB] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen ? (
                    <div className="border-t border-white/8 px-6 py-5">
                      <p className="max-w-4xl leading-relaxed text-[#C7C7CD]">{item.answer}</p>
                    </div>
                  ) : null}
                </article>
              );
            })
          )}
        </section>

        <section className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(214,28,28,0.16),rgba(20,20,22,0.78))] p-8 md:p-10">
          <div className="mb-4 flex items-center gap-3 text-[#D61C1C]">
            <ShieldCheck size={18} />
            <span className="mono">FAQ SUPPORT</span>
          </div>
          <h2 className="mb-3 text-3xl font-bold text-white">{copy.ctaTitle}</h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-[#ECECF0]">{copy.ctaText}</p>
          <Link to="/contact">
            <button className="btn-primary">{copy.ctaLabel}</button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default FAQ;
