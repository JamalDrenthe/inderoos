import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { serviceOfferings } from '../data/platformContent';

const Services = () => {
  const { language } = useLanguage();

  const content = {
    nl: {
      badge: 'DIENSTEN',
      title: 'Persoonlijke sessies voor koppels, ontspanning en verdieping.',
      intro:
        'Sommige trajecten vragen niet om een drukke nacht, maar om rust, bedding en gerichte aandacht. Hier vind je de besloten services van In De Roos.',
      cta: 'Vraag intake aan',
    },
    en: {
      badge: 'SERVICES',
      title: 'Private sessions for couples, relaxation, and deeper alignment.',
      intro:
        'Some journeys do not ask for a crowded night but for calm, structure, and focused attention. These are the private services of In De Roos.',
      cta: 'Request intake',
    },
    de: {
      badge: 'SERVICES',
      title: 'Private Sessions für Paare, Entspannung und tiefere Ausrichtung.',
      intro:
        'Manche Prozesse brauchen keine volle Nacht, sondern Ruhe, Halt und gezielte Aufmerksamkeit. Hier findest du die privaten Services von In De Roos.',
      cta: 'Intake anfragen',
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

        <section className="grid gap-6 lg:grid-cols-2">
          {serviceOfferings.map((service) => (
            <article key={service.id} className="card-dark overflow-hidden">
              <div className="grid h-full gap-0 md:grid-cols-[0.42fr_0.58fr]">
                <div className="min-h-[280px] overflow-hidden">
                  <img src={service.image} alt={service.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col p-7 md:p-8">
                  <div className="mb-4 flex items-center gap-3 text-[#D61C1C]">
                    <HeartHandshake size={18} />
                    <span className="mono">{service.duration}</span>
                  </div>
                  <h2 className="mb-3 text-3xl font-bold text-white">{service.name}</h2>
                  <p className="mb-5 text-xl font-semibold text-[#D61C1C]">{service.priceLabel}</p>
                  <p className="mb-8 leading-relaxed text-[#C7C7CD]">{service.description}</p>
                  <div className="mt-auto">
                    <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-[#D61C1C]">
                      {copy.cta}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-14 rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(214,28,28,0.16),rgba(20,20,22,0.78))] p-8 md:p-10">
          <div className="mb-4 flex items-center gap-3 text-[#D61C1C]">
            <Sparkles size={18} />
            <span className="mono">PRIVATE GUIDANCE</span>
          </div>
          <p className="max-w-3xl leading-relaxed text-[#ECECF0]">
            Elke sessie begint met afstemming, duidelijke grenzen en de juiste setting. Zo blijft ook verdieping elegant, veilig en zorgvuldig begeleid.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Services;
