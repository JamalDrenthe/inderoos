import { useState } from 'react';
import { CreditCard, LockKeyhole, Sparkles, WalletCards, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';
import { getLocalizedText, membershipPlans, ticketOptions } from '../lib/siteData';

const Prices = () => {
  const { language } = useLanguage();
  const [visiblePrices, setVisiblePrices] = useState<Record<string, boolean>>({});

  const togglePrice = (id: string) => {
    setVisiblePrices(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const content = {
    nl: {
      badge: 'PRIJZEN',
      title: 'Helder. Transparant. Zonder ruis.',
      intro:
        'Hier zie je exact wat jouw toegang tot de nacht inhoudt. Geen afleiding, enkel de pure feiten. De rest van de ervaring is waar het ware mysterie begint.',
      ticketsTitle: 'Tickets',
      membershipsTitle: 'Memberships',
      noteTitle: 'Een naadloze overgang',
      noteItems: [
        'Tarieven zijn volkomen transparant, de nacht zelf blijft een mysterie.',
        'De exacte locatie onthullen we pas na een zorgvuldige, persoonlijke screening.',
        'In een besloten betaalomgeving bevestig je jouw keuze in alle rust.',
      ],
      processTitle: 'Jouw sleutel tot de nacht',
      process: [
        'Een uiterst discreet ontvangst- en screeningproces.',
        'Toegewijde hosts, strakke huisregels en een exclusieve, gecontroleerde entree.',
        'Een vloeiende doorstroom naar een nacht vol spanning, begeleid met duidelijke instructies.',
      ],
      primaryCta: 'Verken de nachten',
      secondaryCta: 'Bemachtig toegang',
      details: 'Bekijk details',
      monthHint: 'per maand',
    },
    en: {
      badge: 'PRICING',
      title: 'Clear. Transparent. No noise.',
      intro:
        'Here you see exactly what your access to the night entails. No distractions, just the pure facts. The rest of the experience is where the true mystery begins.',
      ticketsTitle: 'Tickets',
      membershipsTitle: 'Memberships',
      noteTitle: 'A seamless transition',
      noteItems: [
        'Rates are fully transparent, the night itself remains a mystery.',
        'The exact location is revealed only after a careful, personal screening.',
        'In a private payment environment, you can confirm your choice in peace.',
      ],
      processTitle: 'Your key to the night',
      process: [
        'An highly discreet reception and screening process.',
        'Dedicated hosts, strict house rules, and an exclusive, controlled entrance.',
        'A smooth progression to a night full of tension, guided by clear instructions.',
      ],
      primaryCta: 'Explore the nights',
      secondaryCta: 'Secure access',
      details: 'View details',
      monthHint: 'per month',
    },
    de: {
      badge: 'PREISE',
      title: 'Klar. Transparent. Kein Rauschen.',
      intro:
        'Hier siehst du genau, was dein Zugang zur Nacht beinhaltet. Keine Ablenkung, nur die reinen Fakten. Der Rest des Erlebnisses ist der Beginn des wahren Geheimnisses.',
      ticketsTitle: 'Tickets',
      membershipsTitle: 'Memberships',
      noteTitle: 'Ein nahtloser Übergang',
      noteItems: [
        'Die Tarife sind völlig transparent, die Nacht selbst bleibt ein Geheimnis.',
        'Die genaue Location wird erst nach einem sorgfältigen, persönlichen Screening enthüllt.',
        'In einer privaten Zahlungsumgebung bestätigst du deine Wahl in aller Ruhe.',
      ],
      processTitle: 'Dein Schlüssel zur Nacht',
      process: [
        'Ein äußerst diskreter Empfangs- und Screening-Prozess.',
        'Engagierte Hosts, strenge Hausregeln und ein exklusiver, kontrollierter Einlass.',
        'Ein fließender Übergang zu einer Nacht voller Spannung, begleitet von klaren Anweisungen.',
      ],
      primaryCta: 'Nächte erkunden',
      secondaryCta: 'Zugang sichern',
      details: 'Details ansehen',
      monthHint: 'pro Monat',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen px-6 pb-16 pt-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12 max-w-4xl">
          <span className="mono mb-4 block text-[#D61C1C]">{copy.badge}</span>
          <h1 className="mb-5 text-4xl font-black text-white md:text-6xl">{copy.title}</h1>
          <p className="text-lg leading-relaxed text-[#A7A7AB]">{copy.intro}</p>
        </section>

        <section className="mb-16 grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-6">
            <div className="card-dark p-8">
              <div className="mb-5 flex items-center gap-3">
                <WalletCards size={18} className="text-[#D61C1C]" />
                <h2 className="text-2xl font-bold text-white">{copy.ticketsTitle}</h2>
              </div>
              <div className="space-y-4">
                {ticketOptions.map((ticket, index) => {
                  const isVisible = visiblePrices[`ticket-${ticket.id}`];
                  return (
                    <div key={ticket.id} className="rounded-3xl border border-white/8 bg-[#111113] p-5 transition-colors hover:border-white/20">
                      <div className="mb-4 flex items-start gap-4">
                        <img 
                          src={`/images/hero_couple_${(index % 4) + 1}.jpg`} 
                          alt="Ticket vibe" 
                          className="h-20 w-20 rounded-2xl object-cover" 
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{getLocalizedText(ticket.label, language)}</h3>
                          <p className="leading-relaxed text-[#B9B9C1] text-sm">{getLocalizedText(ticket.description, language)}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-white/5 pt-4">
                        <button 
                          onClick={() => togglePrice(`ticket-${ticket.id}`)}
                          className="flex items-center gap-2 text-sm font-medium text-[#D61C1C] transition-colors hover:text-white"
                        >
                          {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                          {isVisible ? 'Verberg prijs' : 'Toon prijs'}
                        </button>
                        <span className={`text-2xl font-bold transition-all duration-300 ${isVisible ? 'text-white blur-none' : 'text-white/20 blur-sm select-none'}`}>
                          € {ticket.price}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card-dark bg-[linear-gradient(180deg,rgba(214,28,28,0.14),rgba(20,20,22,0.82))] p-8">
              <div className="mb-5 flex items-center gap-3">
                <LockKeyhole size={18} className="text-[#D61C1C]" />
                <h2 className="text-2xl font-bold text-white">{copy.noteTitle}</h2>
              </div>
              <div className="space-y-4">
                {copy.noteItems.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-[#E4E4E9]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-dark p-8">
              <div className="mb-5 flex items-center gap-3">
                <CreditCard size={18} className="text-[#D61C1C]" />
                <h2 className="text-2xl font-bold text-white">{copy.membershipsTitle}</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {membershipPlans.map((plan) => {
                  const isVisible = visiblePrices[`plan-${plan.id}`];
                  return (
                    <div key={plan.id} className="group overflow-hidden rounded-3xl border border-white/8 bg-[#111113] transition-colors hover:border-white/20">
                      <div className="relative h-32 overflow-hidden">
                        <img 
                          src={`/images/hero_couple_${plan.id === 'standard' ? '2' : plan.id === 'koppel' ? '3' : '4'}.jpg`} 
                          alt="Membership" 
                          className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(17,17,19,1)_100%)]" />
                        <p className="absolute bottom-3 left-6 mono text-[#D61C1C]">MEMBERSHIP</p>
                      </div>
                      <div className="p-6 pt-0">
                        <h3 className="mb-2 text-2xl font-bold text-white">{getLocalizedText(plan.name, language)}</h3>
                        <p className="mb-5 text-sm leading-relaxed text-[#B9B9C1]">{getLocalizedText(plan.description, language)}</p>
                        
                        <div className="mb-6 flex items-center justify-between rounded-xl bg-white/[0.03] p-3">
                          <button 
                            onClick={() => togglePrice(`plan-${plan.id}`)}
                            className="flex items-center gap-2 text-sm font-medium text-[#D61C1C] transition-colors hover:text-white"
                          >
                            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                            {isVisible ? 'Verberg' : 'Toon prijs'}
                          </button>
                          <span className={`text-xl font-bold transition-all duration-300 ${isVisible ? 'text-white blur-none' : 'text-white/20 blur-sm select-none'}`}>
                            {getLocalizedText(plan.priceLabel, language)}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {plan.perks.map((perk) => (
                            <div key={perk.nl} className="flex items-start gap-3">
                              <Sparkles size={15} className="mt-1 flex-shrink-0 text-[#D61C1C]" />
                              <p className="text-sm leading-relaxed text-[#E0E0E5]">{getLocalizedText(perk, language)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card-dark p-8">
              <h2 className="mb-5 text-2xl font-bold text-white">{copy.processTitle}</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {copy.process.map((item, index) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                    <p className="mono mb-3 text-[#D61C1C]">0{index + 1}</p>
                    <p className="leading-relaxed text-[#D7D7DC]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <Link to="/evenementen">
            <button className="btn-secondary w-full">{copy.primaryCta}</button>
          </Link>
          <Link to="/boeking">
            <button className="btn-primary w-full">{copy.secondaryCta}</button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Prices;
