import { useState } from 'react';
import { Shield, Lock, MessageSquareText, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Community = () => {
  const { language } = useLanguage();
  const [showNotice, setShowNotice] = useState(false);

  const content = {
    nl: {
      badge: 'BESLOTEN COMMUNITY',
      title: 'Member Login',
      subtitle: 'Een afgeschermde plek voor gasten die al binnen zijn geweest.',
      body:
        'Na je eerste event krijg je toegang tot een private chat en netwerkruimte. Hier delen members de volgende drops, aftercare, connecties en laatste-kans edities.',
      featuresTitle: 'Wat hier later live gaat',
      features: [
        'Private chat per stad en event-weekend',
        'Netwerkprofielen voor members en plus-ones',
        'Aftercare, etiquette en RSVP-prioriteiten',
      ],
      formTitle: 'Placeholder login',
      email: 'Member e-mail',
      password: 'Access code',
      submit: 'Toon placeholder',
      notice: 'Deze login is nog niet actief. Toegang volgt na een event en goedkeuring door de community.',
      cta: 'Eerst aanmelden',
      sideTitle: 'Waarom besloten?',
      sidePoints: [
        'We houden de community klein, discreet en relevant.',
        'Toegang volgt pas na een fysieke check-in op locatie.',
        'Geen publieke profielen, geen open invites, geen ruis.',
      ],
    },
    en: {
      badge: 'PRIVATE COMMUNITY',
      title: 'Member Login',
      subtitle: 'A protected space for guests who have already been inside.',
      body:
        'After your first event, you unlock access to a private chat and networking space. Members use it for drops, aftercare, connections, and last-chance editions.',
      featuresTitle: 'What goes live here later',
      features: [
        'Private chat per city and event weekend',
        'Networking profiles for members and plus-ones',
        'Aftercare, etiquette, and RSVP priority flows',
      ],
      formTitle: 'Placeholder login',
      email: 'Member email',
      password: 'Access code',
      submit: 'Show placeholder',
      notice: 'This login is not active yet. Access follows after attendance and approval by the community.',
      cta: 'Apply first',
      sideTitle: 'Why private?',
      sidePoints: [
        'We keep the network small, discreet, and relevant.',
        'Access follows only after a physical check-in on location.',
        'No public profiles, no open invites, no noise.',
      ],
    },
    de: {
      badge: 'PRIVATE COMMUNITY',
      title: 'Member Login',
      subtitle: 'Ein geschützter Bereich für Gäste, die bereits dabei waren.',
      body:
        'Nach deinem ersten Event bekommst du Zugang zu einem privaten Chat- und Networking-Bereich. Members nutzen ihn für Drops, Aftercare, Kontakte und Last-Chance-Editionen.',
      featuresTitle: 'Was hier später live geht',
      features: [
        'Privater Chat pro Stadt und Event-Wochenende',
        'Netzwerkprofile für Members und Plus-Ones',
        'Aftercare, Etikette und RSVP-Priorität',
      ],
      formTitle: 'Placeholder-Login',
      email: 'Member-E-Mail',
      password: 'Zugangscode',
      submit: 'Placeholder anzeigen',
      notice: 'Dieser Login ist noch nicht aktiv. Zugang folgt nach Teilnahme und Freigabe durch die Community.',
      cta: 'Zuerst anmelden',
      sideTitle: 'Warum privat?',
      sidePoints: [
        'Wir halten das Netzwerk klein, diskret und relevant.',
        'Zugang gibt es erst nach physischem Check-in vor Ort.',
        'Keine öffentlichen Profile, keine offenen Einladungen, kein Lärm.',
      ],
    },
  } as const;

  const copy = content[language];

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <section className="mb-12">
          <span className="mono text-[#D61C1C] mb-4 block">{copy.badge}</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{copy.title}</h1>
          <p className="text-white/90 text-xl mb-4">{copy.subtitle}</p>
          <p className="text-[#A7A7AB] text-lg max-w-3xl leading-relaxed">{copy.body}</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <section className="card-dark p-8 md:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">{copy.formTitle}</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-white text-sm font-medium mb-2">{copy.email}</label>
                <input type="email" placeholder="member@domain.com" />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">{copy.password}</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <button
                type="button"
                onClick={() => setShowNotice(true)}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {copy.submit}
                <Lock size={16} />
              </button>
            </div>

            {showNotice ? (
              <div className="mt-6 rounded-2xl border border-[#D61C1C]/20 bg-[#D61C1C]/10 p-4 flex items-start gap-3">
                <Shield size={18} className="text-[#D61C1C] mt-0.5 flex-shrink-0" />
                <p className="text-[#E7E7EA] text-sm leading-relaxed">{copy.notice}</p>
              </div>
            ) : null}

            <div className="mt-10">
              <h3 className="text-white font-semibold mb-4">{copy.featuresTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {copy.features.map((feature) => (
                  <div key={feature} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                    <MessageSquareText size={18} className="text-[#D61C1C] mb-3" />
                    <p className="text-[#D6D6DA] text-sm leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="card-dark p-8">
              <h2 className="text-xl font-bold text-white mb-5">{copy.sideTitle}</h2>
              <div className="space-y-4">
                {copy.sidePoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <Users size={18} className="text-[#D61C1C] mt-1 flex-shrink-0" />
                    <p className="text-[#B1B1B8] leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-dark p-8 bg-[linear-gradient(180deg,_rgba(214,28,28,0.15),_rgba(20,20,22,0.75))]">
              <p className="mono text-[#D61C1C] mb-4">RSVP FIRST</p>
              <p className="text-white text-xl font-semibold mb-4">Access follows attendance.</p>
              <p className="text-[#D6D6DA] mb-6">The login stays locked until you have been screened, paid, and checked in on location.</p>
              <Link to="/boeking">
                <button className="btn-secondary w-full flex items-center justify-center gap-2">
                  {copy.cta}
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Community;
