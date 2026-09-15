import { BadgeCheck, Clock3, Lock, MapPin } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

const SafetyV2 = () => {
  const { language } = useLanguage();

  const content = {
    nl: {
      badge: 'HUISREGELS',
      title: 'Zachte grenzen. Harde afspraken.',
      intro:
        'De perfecte nacht ontstaat pas wanneer de kaders glashelder zijn. Zero ambiguity, volledige overgave. Door je aan te melden, bevestig je jouw begrip van onze wereld.',
      rules: [
        {
          title: 'Strict No-Phone Policy',
          text: 'Bij binnenkomst verdwijnt de buitenwereld. Telefoons worden ingenomen of afgeplakt. Geen camera’s, geen afleiding. Alleen het hier en nu.',
          icon: Lock,
        },
        {
          title: 'Secret Location',
          text: 'Mysterie bouwt de spanning op. De exacte locatie, verborgen in de stad, delen we pas op de dag zelf via onze afgeschermde kanalen.',
          icon: MapPin,
        },
        {
          title: 'Toegang 21:00 - 05:00',
          text: 'De deuren openen om 21:00 en sluiten wanneer wij dat bepalen. 18+ en een geldig ID zijn je absolute sleutel naar binnen.',
          icon: Clock3,
        },
      ],
      processTitle: 'De Reis Naar Binnen',
      process: [
        'Je profiel wordt aandachtig gewogen op energie, intentie en chemie.',
        'Wanneer jouw vibe resoneert met de groep, ontvang je discreet een verzoek.',
        'Pas na bevestiging is je plek in de schaduw verzekerd.',
        'De locatie onthult zich pas wanneer de nacht valt.',
      ],
      noteTitle: 'Jouw Akkoord',
      noteText:
        'Met je aanmelding beloof je meer dan alleen je aanwezigheid. Je belooft discretie, respect en een onvoorwaardelijke naleving van onze regels.',
    },
    en: {
      badge: 'HOUSE RULES',
      title: 'Soft boundaries. Hard agreements.',
      intro:
        'The perfect night only unfolds when the framework is crystal clear. Zero ambiguity, complete surrender. By applying, you confirm your understanding of our world.',
      rules: [
        {
          title: 'Strict No-Phone Policy',
          text: 'Upon entering, the outside world fades away. Phones are secured or sealed. No cameras, no distractions. Only the present moment.',
          icon: Lock,
        },
        {
          title: 'Secret Location',
          text: 'Mystery builds tension. The exact location, hidden within the city, is only revealed on the day itself through our secure channels.',
          icon: MapPin,
        },
        {
          title: 'Access 21:00 - 05:00',
          text: 'Doors open at 21:00 and close when we decide. 18+ and a valid ID are your absolute key to entry.',
          icon: Clock3,
        },
      ],
      processTitle: 'The Journey Inside',
      process: [
        'Your profile is carefully weighed on energy, intention, and chemistry.',
        'When your vibe resonates with the group, you discreetly receive an invitation.',
        'Only upon confirmation is your place in the shadows secured.',
        'The location reveals itself only as night falls.',
      ],
      noteTitle: 'Your Agreement',
      noteText:
        'By applying, you promise more than just your presence. You promise discretion, respect, and unconditional adherence to our rules.',
    },
    de: {
      badge: 'HAUSREGELN',
      title: 'Sanfte Grenzen. Harte Absprachen.',
      intro:
        'Die perfekte Nacht entfaltet sich erst, wenn der Rahmen kristallklar ist. Null Unklarheit, völlige Hingabe. Mit deiner Anmeldung bestätigst du dein Verständnis unserer Welt.',
      rules: [
        {
          title: 'Strict No-Phone Policy',
          text: 'Beim Eintreten verschwindet die Außenwelt. Telefone werden gesichert oder abgeklebt. Keine Kameras, keine Ablenkung. Nur das Hier und Jetzt.',
          icon: Lock,
        },
        {
          title: 'Secret Location',
          text: 'Geheimnis baut Spannung auf. Die genaue Location, versteckt in der Stadt, enthüllen wir erst am Tag selbst über unsere sicheren Kanäle.',
          icon: MapPin,
        },
        {
          title: 'Zugang 21:00 - 05:00',
          text: 'Die Türen öffnen sich um 21:00 Uhr und schließen, wenn wir es entscheiden. 18+ und eine gültige ID sind dein absoluter Schlüssel zum Eintritt.',
          icon: Clock3,
        },
      ],
      processTitle: 'Die Reise nach Innen',
      process: [
        'Dein Profil wird sorgfältig nach Energie, Absicht und Chemie abgewogen.',
        'Wenn dein Vibe mit der Gruppe resoniert, erhältst du diskret eine Einladung.',
        'Erst nach Bestätigung ist dein Platz in den Schatten gesichert.',
        'Die Location offenbart sich erst, wenn die Nacht hereinbricht.',
      ],
      noteTitle: 'Deine Zustimmung',
      noteText:
        'Mit deiner Anmeldung versprichst du mehr als nur deine Anwesenheit. Du versprichst Diskretion, Respekt und die bedingungslose Einhaltung unserer Regeln.',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <section className="max-w-4xl mb-12">
          <span className="mono text-[#D61C1C] mb-4 block">{copy.badge}</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5">{copy.title}</h1>
          <p className="text-[#A7A7AB] text-lg leading-relaxed">{copy.intro}</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {copy.rules.map((rule) => (
            <div key={rule.title} className="card-dark p-7 border-gradient">
              <div className="w-12 h-12 rounded-xl bg-[#D61C1C]/15 flex items-center justify-center mb-5">
                <rule.icon size={20} className="text-[#D61C1C]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">{rule.title}</h2>
              <p className="text-[#A7A7AB] leading-relaxed">{rule.text}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <div className="card-dark p-8 md:p-10 bg-[linear-gradient(180deg,_rgba(214,28,28,0.12),_rgba(20,20,22,0.85))]">
            <div className="flex items-center gap-3 mb-5">
              <BadgeCheck size={20} className="text-[#D61C1C]" />
              <h2 className="text-2xl font-bold text-white">{copy.processTitle}</h2>
            </div>
            <div className="space-y-4">
              {copy.process.map((step, index) => (
                <div key={step} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                  <span className="w-8 h-8 rounded-full bg-[#D61C1C] text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-[#E2E2E6] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-dark p-8 md:p-10">
            <h2 className="text-2xl font-bold text-white mb-5">{copy.noteTitle}</h2>
            <p className="text-[#A7A7AB] leading-relaxed mb-8">{copy.noteText}</p>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <p className="mono text-[#D61C1C] mb-4">NON-NEGOTIABLE</p>
              <div className="space-y-4 text-[#D6D6DA] leading-relaxed">
                <p>Strict no-phone policy.</p>
                <p>Secret location only on event day.</p>
                <p>18+, ID required, and a locked payment flow.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SafetyV2;
