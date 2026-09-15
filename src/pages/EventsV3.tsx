import { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import EventOverlay, { type OverlayEvent } from '../components/EventOverlay';
import { useLanguage } from '../context/useLanguage';
import { getLocalizedWeekenders } from '../lib/siteData';

const EventsV3 = () => {
  const { language } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState<OverlayEvent | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const localizedWeekenders = getLocalizedWeekenders(language);

  const groupedWeekenders = useMemo(
    () =>
      localizedWeekenders.reduce<Array<{ season: string; items: typeof localizedWeekenders }>>((groups, weekender) => {
        const currentGroup = groups.find((group) => group.season === weekender.seasonLabelText);

        if (currentGroup) {
          currentGroup.items.push(weekender);
          return groups;
        }

        groups.push({ season: weekender.seasonLabelText, items: [weekender] });
        return groups;
      }, []),
    [localizedWeekenders],
  );

  const content = {
    nl: {
      badge: 'DE NACHTEN',
      title: 'Verleidelijke nachten om vrij te houden.',
      intro:
        'Hier draait het om het ritme van het jaar, de sfeer per editie en de events waar je naar verlangt. Klik op een kaart om de details en sfeer van de avond te onthullen.',
      helper: 'Ontdek meer over de avond door op een editie te klikken.',
      seasonLabel: 'Seizoen',
      openDetails: 'Ontdek de nacht',
      pricingTitle: 'Jouw sleutel tot de nacht',
      pricingText:
        'Ticket- en membershipprijzen houden we discreet en helder. Ze staan niet meer op elke eventkaart, maar overzichtelijk op onze speciale prijzenpagina en in de beveiligde betaalflow.',
      pricingCta: 'Bekijk toegang & prijzen',
      bookingCta: 'Bemachtig jouw plek',
    },
    en: {
      badge: 'THE NIGHTS',
      title: 'Seductive nights to keep free.',
      intro:
        'This page is about the rhythm of the year, the atmosphere of each edition, and the events you desire. Tap a card to reveal the details and vibe of the night.',
      helper: 'Discover more about the night by clicking an edition.',
      seasonLabel: 'Season',
      openDetails: 'Discover the night',
      pricingTitle: 'Your key to the night',
      pricingText:
        'We keep ticket and membership pricing discreet and clear. They no longer sit on every event card, but live neatly on our dedicated pricing page and in the secure payment flow.',
      pricingCta: 'View access & pricing',
      bookingCta: 'Secure your spot',
    },
    de: {
      badge: 'DIE NÄCHTE',
      title: 'Verführerische Nächte, die du dir freihalten willst.',
      intro:
        'Hier dreht sich alles um den Rhythmus des Jahres, die Atmosphäre jeder Edition und die Events, nach denen du dich sehnst. Klick auf eine Karte, um die Details und Stimmung der Nacht zu enthüllen.',
      helper: 'Entdecke mehr über die Nacht, indem du auf eine Edition klickst.',
      seasonLabel: 'Saison',
      openDetails: 'Nacht entdecken',
      pricingTitle: 'Dein Schlüssel zur Nacht',
      pricingText:
        'Ticket- und Membershippreise halten wir diskret und klar. Sie stehen nicht mehr auf jeder Event-Karte, sondern übersichtlich auf unserer speziellen Preiseseite und im sicheren Zahlungsflow.',
      pricingCta: 'Zugang & Preise ansehen',
      bookingCta: 'Sichere dir deinen Platz',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  const openOverlay = (event: OverlayEvent) => {
    setSelectedEvent(event);
    setOverlayOpen(true);
  };

  return (
    <div className="min-h-screen px-6 pb-16 pt-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12 max-w-4xl">
          <span className="mono mb-4 block text-[#D61C1C]">{copy.badge}</span>
          <h1 className="mb-5 text-4xl font-black text-white md:text-6xl">{copy.title}</h1>
          <p className="mb-4 text-lg leading-relaxed text-[#A7A7AB]">{copy.intro}</p>
        </section>

        <section className="space-y-10">
          {groupedWeekenders.map((group) => (
            <div key={group.season}>
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-3xl font-bold text-white">{group.season}</h2>
                <span className="mono text-[#A7A7AB]">{copy.seasonLabel}</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((weekender) => (
                  <button
                    key={weekender.id}
                    type="button"
                    onClick={() => openOverlay(weekender)}
                    className="card-dark overflow-hidden text-left transition-transform hover:-translate-y-1"
                  >
                    <div className="h-60 overflow-hidden">
                      <img src={weekender.image} alt={weekender.titleText} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="mono text-[#D61C1C]">WEEK {weekender.weekNumber}</span>
                        <span className="text-sm text-[#A7A7AB]">{weekender.startLabelText || weekender.seasonLabelText}</span>
                      </div>
                      <h3 className="mb-2 text-2xl font-bold text-white">{weekender.titleText}</h3>
                      <p className="mb-4 text-sm text-[#A7A7AB]">{weekender.scheduleText}</p>
                      <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-[#D6D6DA]">{weekender.atmosphereText}</p>
                      <span className="inline-flex items-center gap-2 font-semibold text-[#D61C1C]">
                        {copy.openDetails}
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-8 rounded-[32px] border border-white/10 bg-black/40 backdrop-blur-xl p-8 md:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D61C1C] opacity-[0.03] blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-3 text-[#D61C1C]">
              <CalendarDays size={18} />
              <span className="mono">{copy.pricingTitle}</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">{copy.pricingTitle}</h2>
            <p className="max-w-3xl leading-relaxed text-[#ECECF0]">{copy.pricingText}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link to="/prijzen">
              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                <Sparkles size={16} />
                {copy.pricingCta}
              </button>
            </Link>
            <Link to="/boeking">
              <button className="btn-primary w-full">{copy.bookingCta}</button>
            </Link>
          </div>
        </section>
      </div>

      <EventOverlay event={selectedEvent} open={overlayOpen} onOpenChange={setOverlayOpen} />
    </div>
  );
};

export default EventsV3;
