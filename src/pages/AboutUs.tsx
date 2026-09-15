import { Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

const AboutUs = () => {
  const { language } = useLanguage();

  const content = {
    nl: {
      title: 'Over Ons',
      subtitle: 'Meer dan een feest, een levensstijl.',
      intro: 'In De Roos is ontstaan vanuit een verlangen naar iets echts. Geen massaproductie, geen oordelende blikken, maar een safe haven waar gelijkgestemden samenkomen. Een plek waar discretie, respect en ultieme vrijheid de norm zijn.',
      originTitle: 'Onze Oorsprong',
      originText: 'We zagen dat het nachtleven in Nederland behoefte had aan vernieuwing. Er waren feesten, en er waren besloten clubs, maar de brug tussen die twee – een plek met de energie van een high-end event en de intimiteit van een privéfeest – ontbrak. In De Roos vult die leegte met zorgvuldig gecureerde nachten waar de chemie altijd klopt.',
      communityTitle: 'De Community',
      communityText: 'Onze gasten maken de avond. Daarom hanteren we een strikt selectiebeleid. We zoeken naar de juiste balans, de juiste energie en mensen die begrijpen wat "In De Roos" betekent. Het gaat niet om wie je bent in de buitenwereld, maar om hoe je je gedraagt als de deuren sluiten.',
    },
    en: {
      title: 'About Us',
      subtitle: 'More than a party, a lifestyle.',
      intro: 'In De Roos was born from a desire for something real. No mass production, no judgmental looks, but a safe haven where like-minded people come together. A place where discretion, respect, and ultimate freedom are the standard.',
      originTitle: 'Our Origin',
      originText: 'We saw that the nightlife in the Netherlands needed innovation. There were parties, and there were private clubs, but the bridge between the two – a place with the energy of a high-end event and the intimacy of a private party – was missing. In De Roos fills that void with carefully curated nights where the chemistry is always right.',
      communityTitle: 'The Community',
      communityText: 'Our guests make the night. That is why we maintain a strict selection policy. We look for the right balance, the right energy, and people who understand what "In De Roos" means. It is not about who you are in the outside world, but how you behave when the doors close.',
    },
    de: {
      title: 'Über Uns',
      subtitle: 'Mehr als eine Party, ein Lebensstil.',
      intro: 'In De Roos entstand aus dem Wunsch nach etwas Echtem. Keine Massenproduktion, keine verurteilenden Blicke, sondern ein sicherer Hafen, an dem Gleichgesinnte zusammenkommen. Ein Ort, an dem Diskretion, Respekt und ultimative Freiheit die Norm sind.',
      originTitle: 'Unser Ursprung',
      originText: 'Wir sahen, dass das Nachtleben in den Niederlanden Erneuerung brauchte. Es gab Partys und es gab private Clubs, aber die Brücke zwischen beiden – ein Ort mit der Energie eines High-End-Events und der Intimität einer Privatparty – fehlte. In De Roos füllt diese Lücke mit sorgfältig kuratierten Nächten, in denen die Chemie immer stimmt.',
      communityTitle: 'Die Community',
      communityText: 'Unsere Gäste machen die Nacht. Deshalb pflegen wir eine strenge Auswahlpolitik. Wir suchen nach der richtigen Balance, der richtigen Energie und nach Menschen, die verstehen, was "In De Roos" bedeutet. Es geht nicht darum, wer man in der Außenwelt ist, sondern darum, wie man sich verhält, wenn sich die Türen schließen.',
    }
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen px-6 pb-24 pt-32 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <div className="mb-6 flex items-center justify-center gap-3 text-[#D61C1C]">
            <Heart size={24} className="fill-[#D61C1C]" />
            <span className="mono text-sm tracking-[0.2em] uppercase">In De Roos</span>
            <Heart size={24} className="fill-[#D61C1C]" />
          </div>
          <h1 className="mb-6 text-5xl font-black text-white md:text-6xl lg:text-7xl">{copy.title}</h1>
          <p className="text-xl md:text-2xl text-[#A7A7AB] italic">{copy.subtitle}</p>
        </div>

        <div className="space-y-12">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12 backdrop-blur-xl">
            <Sparkles className="mb-6 text-[#D61C1C]" size={32} />
            <p className="text-lg md:text-xl leading-relaxed text-[#ECECF0]">{copy.intro}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 md:p-10 backdrop-blur-xl">
              <h2 className="mb-6 text-2xl font-bold text-white">{copy.originTitle}</h2>
              <p className="text-[#A7A7AB] leading-relaxed">{copy.originText}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 md:p-10 backdrop-blur-xl">
              <h2 className="mb-6 text-2xl font-bold text-white">{copy.communityTitle}</h2>
              <p className="text-[#A7A7AB] leading-relaxed">{copy.communityText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
