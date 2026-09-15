import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, CreditCard, Layers3, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { getLocalizedText, getLocalizedWeekenders, membershipPlans, ticketOptions } from '../lib/siteData';

const EventsV2 = () => {
  const { language } = useLanguage();
  const localizedWeekenders = getLocalizedWeekenders(language);

  const content = {
    nl: {
      badge: 'WEEKENDER CALENDAR',
      title: 'Kalender, prijzen en recurring access.',
      intro:
        'Elke editie loopt van vrijdag tot maandag 05:00. We houden de frontend schaalbaar: geen openbare sold-out status, wel dynamische capaciteit per locatie.',
      ticketTitle: 'Losse tickets',
      membershipTitle: 'Memberships',
      calendarTitle: 'Het jaar in weeknummers',
      capacityTitle: 'Nooit “uitverkocht”',
      capacityText:
        'Capaciteit wordt dynamisch bijgeschakeld via extra locaties, extra rooms en interne waits. De site blijft daarom conversion-first in plaats van stock-first.',
      apply: 'Aanmelden',
      schedule: 'Venster',
      mood: 'Vibe',
      seasonLabel: 'Seizoen',
      capacityCard: 'Schaalbare Tailwind componenten voor altijd-open inventory states.',
    },
    en: {
      badge: 'WEEKENDER CALENDAR',
      title: 'Calendar, pricing, and recurring access.',
      intro:
        'Every edition runs from Friday until Monday 05:00. The frontend stays scalable: no public sold-out states, only dynamic capacity per venue.',
      ticketTitle: 'Single tickets',
      membershipTitle: 'Memberships',
      calendarTitle: 'The year in week numbers',
      capacityTitle: 'Never “sold out”',
      capacityText:
        'Capacity scales through extra venues, extra rooms, and internal wait handling. The site therefore stays conversion-first instead of stock-first.',
      apply: 'Apply',
      schedule: 'Window',
      mood: 'Vibe',
      seasonLabel: 'Season',
      capacityCard: 'Scalable Tailwind components built for always-open inventory states.',
    },
    de: {
      badge: 'WEEKENDER CALENDAR',
      title: 'Kalender, Preise und wiederkehrender Zugang.',
      intro:
        'Jede Edition läuft von Freitag bis Montag 05:00. Das Frontend bleibt skalierbar: keine öffentlichen Sold-out-States, nur dynamische Kapazität pro Location.',
      ticketTitle: 'Einzeltickets',
      membershipTitle: 'Memberships',
      calendarTitle: 'Das Jahr in Wochennummern',
      capacityTitle: 'Nie “ausverkauft”',
      capacityText:
        'Kapazität wird über zusätzliche Locations, zusätzliche Räume und internes Wait-Handling skaliert. Die Site bleibt deshalb conversion-first statt stock-first.',
      apply: 'Anmelden',
      schedule: 'Fenster',
      mood: 'Vibe',
      seasonLabel: 'Saison',
      capacityCard: 'Skalierbare Tailwind-Komponenten für dauerhaft offene Inventory-States.',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  const groupedWeekenders = localizedWeekenders.reduce<Array<{ season: string; items: typeof localizedWeekenders }>>((groups, weekender) => {
    const currentGroup = groups.find((group) => group.season === weekender.seasonLabelText);

    if (currentGroup) {
      currentGroup.items.push(weekender);
      return groups;
    }

    groups.push({ season: weekender.seasonLabelText, items: [weekender] });
    return groups;
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <section className="mb-12 max-w-4xl">
          <span className="mono text-[#D61C1C] mb-4 block">{copy.badge}</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5">{copy.title}</h1>
          <p className="text-[#A7A7AB] text-lg leading-relaxed">{copy.intro}</p>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-8 mb-16">
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard size={18} className="text-[#D61C1C]" />
              <h2 className="text-2xl font-bold text-white">{copy.ticketTitle}</h2>
            </div>
            {ticketOptions.map((ticket) => (
              <div key={ticket.id} className="card-dark p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-xl font-bold text-white">{getLocalizedText(ticket.label, language)}</h3>
                  <span className="text-[#D61C1C] font-semibold text-2xl">€ {ticket.price}</span>
                </div>
                <p className="text-[#A7A7AB] leading-relaxed">{getLocalizedText(ticket.description, language)}</p>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <Layers3 size={18} className="text-[#D61C1C]" />
              <h2 className="text-2xl font-bold text-white">{copy.membershipTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {membershipPlans.map((plan) => (
                <div key={plan.id} className="card-dark p-6 flex flex-col">
                  <span className="mono text-[#D61C1C] mb-3">MEMBERSHIP</span>
                  <h3 className="text-xl font-bold text-white mb-2">{getLocalizedText(plan.name, language)}</h3>
                  <p className="text-[#D61C1C] text-2xl font-semibold mb-4">{getLocalizedText(plan.priceLabel, language)}</p>
                  <p className="text-[#A7A7AB] leading-relaxed mb-6">{getLocalizedText(plan.description, language)}</p>
                  <div className="space-y-3 flex-1">
                    {plan.perks.map((perk) => (
                      <div key={perk.nl} className="flex items-start gap-3">
                        <Sparkles size={15} className="text-[#D61C1C] mt-1 flex-shrink-0" />
                        <p className="text-[#D6D6DA] text-sm leading-relaxed">{getLocalizedText(perk, language)}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/boeking" className="mt-8">
                    <button className="btn-secondary w-full">{copy.apply}</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <CalendarDays size={20} className="text-[#D61C1C]" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">{copy.calendarTitle}</h2>
          </div>

          <div className="space-y-10">
            {groupedWeekenders.map((group) => (
              <div key={group.season}>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <h3 className="text-2xl font-bold text-white">{group.season}</h3>
                  <span className="mono text-[#A7A7AB]">{copy.seasonLabel}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {group.items.map((weekender) => (
                    <div key={weekender.id} className="card-dark overflow-hidden">
                      <div className="h-56 overflow-hidden">
                        <img src={weekender.image} alt={weekender.titleText} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="mono text-[#D61C1C]">WEEK {weekender.weekNumber}</span>
                          <span className="text-[#A7A7AB] text-sm">€ 75+</span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2">{weekender.titleText}</h4>
                        <p className="text-[#A7A7AB] text-sm mb-4">{weekender.startLabelText || weekender.seasonLabelText}</p>
                        <div className="space-y-3 mb-6">
                          <div>
                            <p className="text-[#A7A7AB] text-xs uppercase tracking-wider mb-1">{copy.schedule}</p>
                            <p className="text-[#D6D6DA]">{weekender.scheduleText}</p>
                          </div>
                          <div>
                            <p className="text-[#A7A7AB] text-xs uppercase tracking-wider mb-1">{copy.mood}</p>
                            <p className="text-[#D6D6DA] leading-relaxed">{weekender.atmosphereText}</p>
                          </div>
                        </div>
                        <Link to={`/boeking/${weekender.id}`}>
                          <button className="text-[#D61C1C] font-semibold flex items-center gap-2">
                            {copy.apply}
                            <ArrowRight size={16} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card-dark p-8 md:p-10 bg-[linear-gradient(180deg,_rgba(214,28,28,0.14),_rgba(20,20,22,0.78))]">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{copy.capacityTitle}</h2>
          <p className="text-[#E0E0E5] leading-relaxed mb-5 max-w-4xl">{copy.capacityText}</p>
          <p className="text-[#A7A7AB]">{copy.capacityCard}</p>
        </section>
      </div>
    </div>
  );
};

export default EventsV2;
