import { Link, useLocation } from 'react-router-dom';
import { Check, Lock, MapPin, CreditCard, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ThankYouState {
  email?: string;
  price?: number;
  selectionLabel?: string;
}

const ThankYou = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const state = (location.state as ThankYouState | null) ?? null;

  const content = {
    nl: {
      badge: 'BEDANKT',
      title: 'Je staat op de radar... nu even geduld.',
      intro:
        'Je hebt de eerste stap gezet. Maar laten we eerlijk zijn: niet iedereen komt binnen. Onze community draait op de juiste energie, de juiste mensen en absolute discretie.',
      stepsTitle: 'Wat je nu moet weten',
      steps: [
        {
          title: 'De Keuring',
          text: 'We checken wie je bent. Als de vibe klopt, sturen we je binnen 24 uur een Tikkie. Betaal hem direct; we houden geen plekken vast voor twijfelaars.',
          icon: CreditCard,
        },
        {
          title: 'De Bevestiging',
          text: 'Pas als het geld binnen is, ben je van ons. Je krijgt dan een officieel bewijs van toegang.',
          icon: Check,
        },
        {
          title: 'The Drop',
          text: 'Op de dag van het event onthullen we de locatie. Wees voorbereid op alles: een grachtenpand, een villa in het bos of een bunker onder de stad.',
          icon: MapPin,
        },
        {
          title: 'No Evidence',
          text: 'Onze gouden regel is heilig. Je telefoon gaat in een kluis of wordt afgeplakt. Wat er binnen gebeurt, blijft binnen. Wie lekt, vliegt eruit. Voorgoed.',
          icon: Lock,
        },
      ],
      outro: 'Kleed je alsof je je ex gaat tegenkomen. We zien je in het donker.',
      summaryTitle: 'Status van je aanvraag',
      paymentNote: 'Je ontvangt een betaalverzoek (Tikkie). Je plek is pas definitief zodra de betaling binnen is.',
      emailLabel: 'E-mail',
      selectionLabel: 'Keuze',
      amountLabel: 'Indicatie',
      backHome: 'Terug naar home',
      seeCalendar: 'Bekijk kalender',
    },
    en: {
      badge: 'THANK YOU',
      title: 'You’re on our radar... now wait for it.',
      intro:
        'You’ve made your move. But let’s be real: not everyone makes the cut. Our community thrives on the right energy, the right crowd, and total discretion.',
      stepsTitle: 'The Drill',
      steps: [
        {
          title: 'The Vetting',
          text: 'We’re checking you out. If the vibe fits, you’ll receive a payment link within 24 hours. Pay it instantly; we do not hold spots for the hesitant.',
          icon: CreditCard,
        },
        {
          title: 'The Confirmation',
          text: 'You’re only ours once the money hits. After that, your access is secured.',
          icon: Check,
        },
        {
          title: 'The Drop',
          text: 'We reveal the secret location on the day of the event. Be ready for anything: a canal house, a villa in the woods, or an underground bunker.',
          icon: MapPin,
        },
        {
          title: 'No Evidence',
          text: 'Our golden rule is non-negotiable. Your phone stays in a locker or gets sealed. What happens inside, stays inside. If you leak, you’re out. Forever.',
          icon: Lock,
        },
      ],
      outro: 'Dress like you’re about to run into your ex. See you in the dark.',
      summaryTitle: 'Your application status',
      paymentNote: 'You will receive a payment request. Your place is only confirmed once payment lands.',
      emailLabel: 'Email',
      selectionLabel: 'Selection',
      amountLabel: 'Estimate',
      backHome: 'Back home',
      seeCalendar: 'View calendar',
    },
    de: {
      badge: 'DANKE',
      title: 'Du bist auf unserem Radar... jetzt warte ab.',
      intro:
        'Du hast den ersten Schritt gemacht. Aber seien wir ehrlich: Nicht alle schaffen es hinein. Unsere Community lebt von der richtigen Energie, den richtigen Menschen und absoluter Diskretion.',
      stepsTitle: 'Was du jetzt wissen musst',
      steps: [
        {
          title: 'Das Screening',
          text: 'Wir prüfen, wer du bist. Wenn die Vibes stimmen, erhältst du innerhalb von 24 Stunden einen Zahlungslink. Bezahle sofort; wir halten keine Plätze für Unentschlossene frei.',
          icon: CreditCard,
        },
        {
          title: 'Die Bestätigung',
          text: 'Erst wenn das Geld eingeht, bist du bestätigt. Danach ist dein Zugang gesichert.',
          icon: Check,
        },
        {
          title: 'The Drop',
          text: 'Den geheimen Ort verraten wir am Veranstaltungstag. Rechne mit allem: Grachtenhaus, Villa im Wald oder Bunker unter der Stadt.',
          icon: MapPin,
        },
        {
          title: 'No Evidence',
          text: 'Unsere goldene Regel ist nicht verhandelbar. Dein Handy bleibt im Spind oder wird versiegelt. Was drinnen passiert, bleibt drinnen. Wer leakt, fliegt raus. Für immer.',
          icon: Lock,
        },
      ],
      outro: 'Zieh dich so an, als würdest du deinem Ex begegnen. Wir sehen uns im Dunkeln.',
      summaryTitle: 'Status deiner Anfrage',
      paymentNote: 'Du erhältst eine Zahlungsanfrage. Dein Platz ist erst bestätigt, wenn die Zahlung eingegangen ist.',
      emailLabel: 'E-Mail',
      selectionLabel: 'Auswahl',
      amountLabel: 'Schätzung',
      backHome: 'Zur Startseite',
      seeCalendar: 'Kalender ansehen',
    },
  } as const;

  const copy = content[language];

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="card-dark border-gradient p-8 md:p-12 mb-8 bg-[radial-gradient(circle_at_top,_rgba(214,28,28,0.18),_transparent_45%)]">
          <span className="mono text-[#D61C1C] mb-4 block">{copy.badge}</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl">{copy.title}</h1>
          <p className="text-[#D6D6DA] text-lg max-w-3xl leading-relaxed">{copy.intro}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <section className="card-dark p-8 md:p-10">
            <h2 className="text-2xl font-bold text-white mb-8">{copy.stepsTitle}</h2>
            <div className="space-y-6">
              {copy.steps.map((step) => (
                <div key={step.title} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                  <div className="w-12 h-12 rounded-xl bg-[#D61C1C]/15 flex items-center justify-center flex-shrink-0">
                    <step.icon size={20} className="text-[#D61C1C]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-[#B1B1B8] leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white text-lg mt-8">{copy.outro}</p>
          </section>

          <aside className="space-y-6">
            <div className="card-dark p-8">
              <h2 className="text-xl font-bold text-white mb-6">{copy.summaryTitle}</h2>
              <div className="space-y-4 text-sm">
                {state?.email ? (
                  <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-3">
                    <span className="text-[#A7A7AB]">{copy.emailLabel}</span>
                    <span className="text-white text-right">{state.email}</span>
                  </div>
                ) : null}
                {state?.selectionLabel ? (
                  <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-3">
                    <span className="text-[#A7A7AB]">{copy.selectionLabel}</span>
                    <span className="text-white text-right">{state.selectionLabel}</span>
                  </div>
                ) : null}
                {typeof state?.price === 'number' ? (
                  <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-3">
                    <span className="text-[#A7A7AB]">{copy.amountLabel}</span>
                    <span className="text-[#D61C1C] font-semibold text-right">€ {state.price}</span>
                  </div>
                ) : null}
              </div>
              <p className="text-[#D6D6DA] leading-relaxed mt-6">{copy.paymentNote}</p>
            </div>

            <div className="card-dark p-8">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center flex-shrink-0">
                  <Check size={18} className="text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Tikkie first, access after.</p>
                  <p className="text-[#A7A7AB] text-sm mt-1">Payment locks the spot. The location drop follows on event day.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-6">
                <Link to="/evenementen">
                  <button className="btn-primary w-full flex items-center justify-center gap-2">
                    {copy.seeCalendar}
                    <ArrowRight size={16} />
                  </button>
                </Link>
                <Link to="/">
                  <button className="btn-secondary w-full">{copy.backHome}</button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
