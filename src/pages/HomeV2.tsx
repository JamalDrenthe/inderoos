import { Link } from 'react-router-dom';
import { ArrowRight, Lock, MapPin, CreditCard, Users } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { getLocalizedText, getLocalizedWeekenders, membershipPlans, ticketOptions } from '../lib/siteData';

const HomeV2 = () => {
  const { language } = useLanguage();
  const upcomingWeekenders = getLocalizedWeekenders(language).slice(0, 6);

  const content = {
    nl: {
      heroBadge: 'SECRET WEEKENDERS',
      heroTitle: 'Underground nachten voor mensen die discretie serieus nemen.',
      heroText:
        'Dark-mode RSVPs, geheime locaties, een strakke deur en een community die draait op de juiste energie. Geen ruis. Geen uitverkocht-labels. Alleen de juiste mensen op het juiste moment.',
      primaryCta: 'Bekijk de kalender',
      secondaryCta: 'Aanmelden',
      ticketsTitle: 'Losse tickets en memberships',
      ticketsText:
        'Los binnen of lock een terugkerende spot. Alles loopt nu via Google Form capture en handmatige Tikkies, zodat de backend bewust simpel blijft.',
      lineupBadge: 'UP NEXT',
      lineupTitle: 'De volgende drops',
      rulesBadge: 'HUISREGELS',
      rulesTitle: 'Alles draait op regels, timing en vertrouwen.',
      rules: [
        {
          title: 'Strict No-Phone Policy',
          text: 'Telefoons gaan bij de entree in een locker of worden afgeplakt. Geen foto’s, geen video’s, geen bewijs.',
          icon: Lock,
        },
        {
          title: 'Secret Location',
          text: 'De exacte locatie volgt pas op de dag zelf via de communitykanalen of directe drop.',
          icon: MapPin,
        },
        {
          title: 'Tikkie Flow',
          text: 'Je plek staat pas vast nadat je betaalverzoek is voldaan. Voor twijfelaars bewaren we niets.',
          icon: CreditCard,
        },
        {
          title: 'Members Only Energy',
          text: 'We vetten op vibe, balans en discretie. Niet iedereen maakt de cut.',
          icon: Users,
        },
      ],
      communityTitle: 'Besloten community na je eerste nacht',
      communityText:
        'Na deelname krijg je toegang tot een afgeschermde member login voor chats, netwerkcontacten, aftercare en toekomstige drops.',
      communityCta: 'Bekijk Member Login',
      finalTitle: 'Je hoeft niet te haasten. Wij schakelen capaciteit dynamisch bij.',
      finalText:
        'We werken nooit met openbare “uitverkocht”-communicatie. Nieuwe locaties en extra rooms worden op basis van de vraag geopend.',
      finalCta: 'Vraag toegang aan',
      perMonth: 'p/m',
      from: 'vanaf',
      viewAll: 'Volledige kalender',
    },
    en: {
      heroBadge: 'SECRET WEEKENDERS',
      heroTitle: 'Underground nights for people who take discretion seriously.',
      heroText:
        'Dark-mode RSVPs, secret locations, a tight door, and a community built on the right energy. No noise. No sold-out labels. Just the right people at the right time.',
      primaryCta: 'View the calendar',
      secondaryCta: 'Apply now',
      ticketsTitle: 'Single tickets and memberships',
      ticketsText:
        'Enter once or lock recurring access. For now the backend stays intentionally lean with Google Form capture and manual Tikkie payments.',
      lineupBadge: 'UP NEXT',
      lineupTitle: 'The next drops',
      rulesBadge: 'HOUSE RULES',
      rulesTitle: 'Everything runs on rules, timing, and trust.',
      rules: [
        {
          title: 'Strict No-Phone Policy',
          text: 'Phones go into a locker or get sealed at the door. No photos, no videos, no evidence.',
          icon: Lock,
        },
        {
          title: 'Secret Location',
          text: 'The exact location is only revealed on the day itself through community channels or direct drop.',
          icon: MapPin,
        },
        {
          title: 'Tikkie Flow',
          text: 'Your place only locks once the payment request is completed. We do not hold anything for doubters.',
          icon: CreditCard,
        },
        {
          title: 'Members Only Energy',
          text: 'We vet on vibe, balance, and discretion. Not everyone makes the cut.',
          icon: Users,
        },
      ],
      communityTitle: 'Private community after your first night',
      communityText:
        'After attending, you unlock a protected member login for chats, networking, aftercare, and future drops.',
      communityCta: 'Open Member Login',
      finalTitle: 'No need to rush. We switch capacity dynamically.',
      finalText:
        'We never run public “sold out” messaging. New venues and extra rooms get activated based on demand.',
      finalCta: 'Request access',
      perMonth: '/ month',
      from: 'from',
      viewAll: 'Full calendar',
    },
    de: {
      heroBadge: 'SECRET WEEKENDERS',
      heroTitle: 'Underground-Nächte für Menschen, die Diskretion ernst nehmen.',
      heroText:
        'Dark-Mode-RSVPs, geheime Locations, eine strenge Tür und eine Community, die auf der richtigen Energie basiert. Kein Lärm. Keine Sold-out-Labels. Nur die richtigen Menschen zur richtigen Zeit.',
      primaryCta: 'Kalender ansehen',
      secondaryCta: 'Jetzt anmelden',
      ticketsTitle: 'Einzeltickets und Memberships',
      ticketsText:
        'Einmal reinkommen oder wiederkehrenden Zugang sichern. Das Backend bleibt bewusst schlank mit Google-Form-Capture und manuellen Tikkies.',
      lineupBadge: 'UP NEXT',
      lineupTitle: 'Die nächsten Drops',
      rulesBadge: 'REGELN',
      rulesTitle: 'Alles läuft über Regeln, Timing und Vertrauen.',
      rules: [
        {
          title: 'Strict No-Phone Policy',
          text: 'Handys kommen am Eingang in einen Locker oder werden versiegelt. Keine Fotos, keine Videos, keine Beweise.',
          icon: Lock,
        },
        {
          title: 'Secret Location',
          text: 'Die genaue Location wird erst am Eventtag über die Community oder einen direkten Drop bekanntgegeben.',
          icon: MapPin,
        },
        {
          title: 'Tikkie Flow',
          text: 'Dein Platz ist erst nach Zahlung gesichert. Für Unentschlossene halten wir nichts frei.',
          icon: CreditCard,
        },
        {
          title: 'Members Only Energy',
          text: 'Wir prüfen nach Vibe, Balance und Diskretion. Nicht alle schaffen es.',
          icon: Users,
        },
      ],
      communityTitle: 'Private Community nach deiner ersten Nacht',
      communityText:
        'Nach der Teilnahme erhältst du Zugang zu einem geschützten Member Login für Chats, Networking, Aftercare und zukünftige Drops.',
      communityCta: 'Member Login öffnen',
      finalTitle: 'Kein Grund zur Hektik. Wir schalten Kapazität dynamisch frei.',
      finalText:
        'Wir kommunizieren nie öffentlich “ausverkauft”. Neue Locations und zusätzliche Räume werden bedarfsorientiert aktiviert.',
      finalCta: 'Zugang anfragen',
      perMonth: '/ Monat',
      from: 'ab',
      viewAll: 'Ganzer Kalender',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden pt-32 pb-24 px-6 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(214,28,28,0.20),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_28%)]" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <span className="mono text-[#D61C1C] mb-5 block">{copy.heroBadge}</span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-6 max-w-4xl">{copy.heroTitle}</h1>
            <p className="text-lg md:text-xl text-[#C7C7CD] leading-relaxed max-w-2xl mb-8">{copy.heroText}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/evenementen">
                <button className="btn-primary flex items-center gap-2">
                  {copy.primaryCta}
                  <ArrowRight size={18} />
                </button>
              </Link>
              <Link to="/boeking">
                <button className="btn-secondary">{copy.secondaryCta}</button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingWeekenders.slice(0, 4).map((weekender) => (
              <div key={weekender.id} className="card-dark overflow-hidden border-gradient">
                <div className="h-44 overflow-hidden">
                  <img src={weekender.image} alt={weekender.titleText} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="mono text-[#D61C1C]">WEEK {weekender.weekNumber}</span>
                    <span className="text-xs text-[#A7A7AB]">{copy.from} €75</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">{weekender.titleText}</h2>
                  <p className="text-[#A7A7AB] text-sm mb-2">{weekender.startLabelText || weekender.seasonLabelText}</p>
                  <p className="text-[#D6D6DA] text-sm leading-relaxed">{weekender.scheduleText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 max-w-3xl">
            <span className="mono text-[#D61C1C] mb-4 block">RSVP TIERS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{copy.ticketsTitle}</h2>
            <p className="text-[#A7A7AB] text-lg leading-relaxed">{copy.ticketsText}</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-8">
            <div className="grid grid-cols-1 gap-5">
              {ticketOptions.map((ticket) => (
                <div key={ticket.id} className="card-dark p-6">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="text-2xl font-bold text-white">{getLocalizedText(ticket.label, language)}</h3>
                    <span className="text-[#D61C1C] font-semibold text-2xl">€ {ticket.price}</span>
                  </div>
                  <p className="text-[#A7A7AB] leading-relaxed">{getLocalizedText(ticket.description, language)}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {membershipPlans.map((plan) => (
                <div key={plan.id} className="card-dark p-6 md:p-7 flex flex-col">
                  <span className="mono text-[#D61C1C] mb-3">MEMBERSHIP</span>
                  <h3 className="text-2xl font-bold text-white mb-2">{getLocalizedText(plan.name, language)}</h3>
                  <p className="text-[#D61C1C] font-semibold text-2xl mb-4">{getLocalizedText(plan.priceLabel, language)}</p>
                  <p className="text-[#A7A7AB] leading-relaxed mb-6">{getLocalizedText(plan.description, language)}</p>
                  <div className="space-y-3 mb-8 flex-1">
                    {plan.perks.map((perk) => (
                      <div key={perk.nl} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D61C1C] mt-2.5" />
                        <p className="text-[#D6D6DA] text-sm leading-relaxed">{getLocalizedText(perk, language)}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/boeking">
                    <button className="btn-secondary w-full">{copy.secondaryCta}</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-24 bg-[#111113]">
        <div className="max-w-7xl mx-auto py-20">
          <span className="mono text-[#D61C1C] mb-4 block">{copy.lineupBadge}</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white">{copy.lineupTitle}</h2>
            <Link to="/evenementen" className="text-[#D61C1C] font-semibold flex items-center gap-2">
              {copy.viewAll}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcomingWeekenders.map((weekender) => (
              <div key={weekender.id} className="card-dark overflow-hidden">
                <div className="h-56 overflow-hidden">
                  <img src={weekender.image} alt={weekender.titleText} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="mono text-[#D61C1C]">WEEK {weekender.weekNumber}</span>
                    <span className="text-[#A7A7AB] text-sm">{weekender.seasonLabelText}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{weekender.titleText}</h3>
                  <p className="text-[#A7A7AB] text-sm mb-3">{weekender.startLabelText || weekender.scheduleText}</p>
                  <p className="text-[#D6D6DA] text-sm leading-relaxed mb-6">{weekender.atmosphereText}</p>
                  <Link to={`/boeking/${weekender.id}`}>
                    <button className="text-[#D61C1C] font-semibold flex items-center gap-2">
                      {copy.secondaryCta}
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div>
            <span className="mono text-[#D61C1C] mb-4 block">{copy.rulesBadge}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{copy.rulesTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {copy.rules.map((rule) => (
                <div key={rule.title} className="card-dark p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#D61C1C]/15 flex items-center justify-center mb-5">
                    <rule.icon size={20} className="text-[#D61C1C]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{rule.title}</h3>
                  <p className="text-[#A7A7AB] leading-relaxed">{rule.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-dark p-8 border-gradient">
              <span className="mono text-[#D61C1C] mb-4 block">MEMBER LOGIN</span>
              <h3 className="text-3xl font-bold text-white mb-4">{copy.communityTitle}</h3>
              <p className="text-[#A7A7AB] leading-relaxed mb-6">{copy.communityText}</p>
              <Link to="/community">
                <button className="btn-secondary w-full">{copy.communityCta}</button>
              </Link>
            </div>

            <div className="card-dark p-8 bg-[linear-gradient(180deg,_rgba(214,28,28,0.16),_rgba(20,20,22,0.75))]">
              <h3 className="text-3xl font-bold text-white mb-4">{copy.finalTitle}</h3>
              <p className="text-[#E0E0E5] leading-relaxed mb-6">{copy.finalText}</p>
              <Link to="/boeking">
                <button className="btn-primary w-full">{copy.finalCta}</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeV2;
