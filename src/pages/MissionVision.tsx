import { Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

const MissionVision = () => {
  const { language } = useLanguage();

  const content = {
    nl: {
      title: 'Missie & Visie',
      subtitle: 'Onze filosofie en belofte aan jou.',
      missionTitle: 'Onze Missie',
      missionText: 'Het creëren van een ultieme safe haven waar gelijkgestemden hun verlangens en grenzen in volledige vrijheid en veiligheid kunnen verkennen. We faciliteren onvergetelijke nachten met een onberispelijke sfeer, waar elke interactie gebaseerd is op wederzijds respect en consent.',
      visionTitle: 'Onze Visie',
      visionText: 'Wij geloven dat het nachtleven toe is aan een evolutie naar meer diepgang, discretie en authenticiteit. In De Roos wil dé standaard zetten voor exclusieve, intieme evenementen in Europa, waarbij we voortdurend innoveren om de perfecte chemie en setting te bieden voor onze community.',
      coreValuesTitle: 'Kernwaarden',
      coreValues: [
        {
          title: 'Discretie & Privacy',
          desc: 'Wat binnen onze deuren gebeurt, blijft binnen. Onze strikte no-phone policy garandeert absolute privacy.'
        },
        {
          title: 'Veiligheid & Consent',
          desc: 'De basis van elke interactie. We tolereren geen grensoverschrijdend gedrag en onze hosts waken over een veilige sfeer.'
        },
        {
          title: 'Kwaliteit & Chemie',
          desc: 'Door een nauwkeurige selectie en vetting zorgen we voor een gebalanceerde community met de juiste intenties.'
        },
        {
          title: 'Esthetiek & Sfeer',
          desc: 'Van de locatie tot de verlichting: elk detail is ontworpen om de zintuigen te prikkelen en een luxe ervaring te bieden.'
        }
      ]
    },
    en: {
      title: 'Mission & Vision',
      subtitle: 'Our philosophy and promise to you.',
      missionTitle: 'Our Mission',
      missionText: 'To create an ultimate safe haven where like-minded individuals can explore their desires and boundaries in complete freedom and safety. We facilitate unforgettable nights with an impeccable atmosphere, where every interaction is based on mutual respect and consent.',
      visionTitle: 'Our Vision',
      visionText: 'We believe nightlife is ready for an evolution towards more depth, discretion, and authenticity. In De Roos aims to set the standard for exclusive, intimate events in Europe, continuously innovating to provide the perfect chemistry and setting for our community.',
      coreValuesTitle: 'Core Values',
      coreValues: [
        {
          title: 'Discretion & Privacy',
          desc: 'What happens behind our doors, stays inside. Our strict no-phone policy guarantees absolute privacy.'
        },
        {
          title: 'Safety & Consent',
          desc: 'The foundation of every interaction. We do not tolerate boundary-crossing behavior, and our hosts ensure a safe atmosphere.'
        },
        {
          title: 'Quality & Chemistry',
          desc: 'Through careful selection and vetting, we ensure a balanced community with the right intentions.'
        },
        {
          title: 'Aesthetics & Atmosphere',
          desc: 'From the venue to the lighting: every detail is designed to stimulate the senses and offer a luxurious experience.'
        }
      ]
    },
    de: {
      title: 'Mission & Vision',
      subtitle: 'Unsere Philosophie und unser Versprechen an dich.',
      missionTitle: 'Unsere Mission',
      missionText: 'Einen ultimativen sicheren Hafen zu schaffen, in dem Gleichgesinnte ihre Wünsche und Grenzen in völliger Freiheit und Sicherheit erkunden können. Wir ermöglichen unvergessliche Nächte mit einer tadellosen Atmosphäre, in der jede Interaktion auf gegenseitigem Respekt und Einvernehmen beruht.',
      visionTitle: 'Unsere Vision',
      visionText: 'Wir glauben, dass das Nachtleben bereit ist für eine Evolution hin zu mehr Tiefe, Diskretion und Authentizität. In De Roos möchte den Standard für exklusive, intime Events in Europa setzen und kontinuierlich innovieren, um die perfekte Chemie und Umgebung für unsere Community zu bieten.',
      coreValuesTitle: 'Kernwerte',
      coreValues: [
        {
          title: 'Diskretion & Privatsphäre',
          desc: 'Was hinter unseren Türen passiert, bleibt drinnen. Unsere strenge No-Phone-Policy garantiert absolute Privatsphäre.'
        },
        {
          title: 'Sicherheit & Konsens',
          desc: 'Die Grundlage jeder Interaktion. Wir tolerieren kein grenzüberschreitendes Verhalten und unsere Hosts sorgen für eine sichere Atmosphäre.'
        },
        {
          title: 'Qualität & Chemie',
          desc: 'Durch sorgfältige Auswahl und Überprüfung sorgen wir für eine ausgewogene Community mit den richtigen Absichten.'
        },
        {
          title: 'Ästhetik & Atmosphäre',
          desc: 'Von der Location bis zur Beleuchtung: Jedes Detail ist darauf ausgelegt, die Sinne zu stimulieren und ein luxuriöses Erlebnis zu bieten.'
        }
      ]
    }
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen px-6 pb-24 pt-32 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <div className="mb-6 flex items-center justify-center gap-3 text-[#D61C1C]">
            <Sparkles size={24} />
            <span className="mono text-sm tracking-[0.2em] uppercase">In De Roos</span>
            <Sparkles size={24} />
          </div>
          <h1 className="mb-6 text-5xl font-black text-white md:text-6xl lg:text-7xl">{copy.title}</h1>
          <p className="text-xl md:text-2xl text-[#A7A7AB] italic">{copy.subtitle}</p>
        </div>

        <div className="space-y-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 backdrop-blur-xl">
              <h2 className="mb-6 text-2xl font-bold text-white">{copy.missionTitle}</h2>
              <p className="text-[#A7A7AB] leading-relaxed text-lg">{copy.missionText}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 backdrop-blur-xl">
              <h2 className="mb-6 text-2xl font-bold text-white">{copy.visionTitle}</h2>
              <p className="text-[#A7A7AB] leading-relaxed text-lg">{copy.visionText}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 md:p-12 backdrop-blur-xl">
            <div className="mb-10 flex items-center gap-4">
              <ShieldCheck className="text-[#D61C1C]" size={32} />
              <h2 className="text-3xl font-bold text-white">{copy.coreValuesTitle}</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {copy.coreValues.map((value, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-4 top-0 text-4xl font-black text-white/5">{idx + 1}</div>
                  <h3 className="mb-3 text-xl font-bold text-white relative z-10">{value.title}</h3>
                  <p className="text-[#A7A7AB] leading-relaxed relative z-10">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
