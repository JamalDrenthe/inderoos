import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, LockKeyhole } from 'lucide-react';
import MemberSpace from '../components/MemberSpace';
import { useLanguage } from '../context/useLanguage';
import {
  clearStoredMemberSession,
  fetchMemberProfile,
  getStoredMemberSession,
  hasSupabaseAuthConfig,
  isSessionValid,
  signInMember,
  signOutMember,
  signUpMember,
  type MemberSession,
} from '../lib/memberAuth';

const CommunityV2 = () => {
  const { language } = useLanguage();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [session, setSession] = useState<MemberSession | null>(() => {
    const stored = getStoredMemberSession();
    return isSessionValid(stored) ? stored : null;
  });
  const [profileName, setProfileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!session) {
      return;
    }

    let isActive = true;

    fetchMemberProfile(session)
      .then((user) => {
        if (!isActive) {
          return;
        }

        setProfileName(user.user_metadata?.full_name || user.email || 'Member');
      })
      .catch(() => {
        if (!isActive) {
          return;
        }

        clearStoredMemberSession();
        setSession(null);
        setProfileName('');
      });

    return () => {
      isActive = false;
    };
  }, [session]);

  const content = {
    nl: {
      badge: 'MEMBER LOGIN',
      title: 'Voor gasten die vaker willen terugkomen.',
      subtitle:
        'Geen dode knop meer: dit is nu een echte member login met Supabase-auth. Voor returning guests, vaste gezichten en mensen die hun toegang netjes willen beheren.',
      loginTab: 'Inloggen',
      registerTab: 'Activeer account',
      fullName: 'Naam',
      email: 'E-mail',
      password: 'Wachtwoord',
      loginSubmit: 'Open member space',
      registerSubmit: 'Maak account aan',
      submitBusy: 'Even geduld...',
      unavailable: 'Supabase-configuratie ontbreekt nog. Voeg eerst de publieke Vite-keys toe om member login te activeren.',
      loginSuccess: 'Je bent ingelogd. Je member space is open.',
      registerSuccess: 'Je account is aangemaakt. Als e-mailbevestiging aanstaat, check dan eerst je inbox.',
      registerDirectSuccess: 'Je account is actief en je bent direct ingelogd.',
      activeTitle: 'Je zit binnen.',
      activeText:
        'Je member sessie is actief. Vanuit hier kun je terug naar de nachten, je toegang beheren en je volgende stap kiezen.',
      activeCards: [
        'Member login blijft besloten en gekoppeld aan je e-mailadres.',
        'Locatie en eventinformatie blijven alsnog gated tot na screening en bevestiging.',
        'Terugkerende gasten houden hier sneller grip op hun flow.',
      ],
      signOut: 'Uitloggen',
      ctaTitle: 'Nog geen toegang?',
      ctaText: 'Vraag eerst toegang aan voor een event. Daarna kun je je member account activeren zodra je approval rond is.',
      ctaButton: 'Vraag toegang aan',
      sideTitle: 'Waarom een member space?',
      sidePoints: [
        'Returning guests krijgen een stillere, snellere route terug naar de juiste nacht.',
        'De openbare site blijft elegant; de member flow blijft besloten.',
        'Supabase-auth maakt de knop eindelijk echt bruikbaar.',
      ],
    },
    en: {
      badge: 'MEMBER LOGIN',
      title: 'For guests who plan to return.',
      subtitle:
        'No dead button anymore: this is now a real member login with Supabase auth. Built for returning guests, familiar faces, and members who want a cleaner access flow.',
      loginTab: 'Sign in',
      registerTab: 'Activate account',
      fullName: 'Name',
      email: 'Email',
      password: 'Password',
      loginSubmit: 'Open member space',
      registerSubmit: 'Create account',
      submitBusy: 'One moment...',
      unavailable: 'Supabase config is missing. Add the public Vite keys first to activate member login.',
      loginSuccess: 'You are signed in. Your member space is open.',
      registerSuccess: 'Your account has been created. If email confirmation is enabled, check your inbox first.',
      registerDirectSuccess: 'Your account is active and you are signed in immediately.',
      activeTitle: 'You are in.',
      activeText:
        'Your member session is active. From here you can head back to the nights, manage access, and choose your next step.',
      activeCards: [
        'Member login stays private and tied to your email address.',
        'Location and event details still remain gated until screening and confirmation.',
        'Returning guests get a cleaner route back into the flow.',
      ],
      signOut: 'Sign out',
      ctaTitle: 'No access yet?',
      ctaText: 'Request access for an event first. Then activate your account once your approval is in place.',
      ctaButton: 'Request access',
      sideTitle: 'Why a member space?',
      sidePoints: [
        'Returning guests get a quieter, faster route back to the right night.',
        'The public site stays elegant; the member flow stays private.',
        'Supabase auth finally makes the button actually useful.',
      ],
    },
    de: {
      badge: 'MEMBER LOGIN',
      title: 'Für Gäste, die wiederkommen wollen.',
      subtitle:
        'Keine tote Schaltfläche mehr: Das ist jetzt ein echter Member Login mit Supabase-Auth. Für Returning Guests, bekannte Gesichter und Members mit sauberem Access-Flow.',
      loginTab: 'Einloggen',
      registerTab: 'Account aktivieren',
      fullName: 'Name',
      email: 'E-Mail',
      password: 'Passwort',
      loginSubmit: 'Member Space öffnen',
      registerSubmit: 'Account erstellen',
      submitBusy: 'Einen Moment...',
      unavailable: 'Die Supabase-Konfiguration fehlt noch. Füge zuerst die öffentlichen Vite-Keys hinzu, um den Member Login zu aktivieren.',
      loginSuccess: 'Du bist eingeloggt. Dein Member Space ist offen.',
      registerSuccess: 'Dein Account wurde erstellt. Wenn E-Mail-Bestätigung aktiv ist, prüfe zuerst dein Postfach.',
      registerDirectSuccess: 'Dein Account ist aktiv und du bist direkt eingeloggt.',
      activeTitle: 'Du bist drin.',
      activeText:
        'Deine Member-Session ist aktiv. Von hier aus kannst du zurück zu den Nächten, Zugang verwalten und deinen nächsten Schritt wählen.',
      activeCards: [
        'Der Member Login bleibt privat und an deine E-Mail gebunden.',
        'Location- und Eventinfos bleiben trotzdem bis nach Screening und Bestätigung gated.',
        'Returning Guests bekommen hier einen klareren Weg zurück in den Flow.',
      ],
      signOut: 'Ausloggen',
      ctaTitle: 'Noch kein Zugang?',
      ctaText: 'Fordere zuerst Zugang zu einem Event an. Danach kannst du deinen Account aktivieren, sobald deine Approval steht.',
      ctaButton: 'Zugang anfragen',
      sideTitle: 'Warum ein Member Space?',
      sidePoints: [
        'Returning Guests erhalten einen leiseren, schnelleren Weg zurück zur richtigen Nacht.',
        'Die öffentliche Site bleibt elegant; der Member Flow bleibt privat.',
        'Supabase-Auth macht den Button endlich wirklich nutzbar.',
      ],
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;
  const isConfigured = hasSupabaseAuthConfig();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'login') {
        const nextSession = await signInMember(formData.email, formData.password);
        setSession(nextSession);
        setSuccess(copy.loginSuccess);
      } else {
        const result = await signUpMember(formData.fullName, formData.email, formData.password);

        if (result.session) {
          setSession(result.session);
          setSuccess(copy.registerDirectSuccess);
        } else {
          setSuccess(copy.registerSuccess);
        }
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Er ging iets mis.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOutMember(session);
    setSession(null);
    setProfileName('');
    setSuccess('');
    setError('');
  };

  return (
    <div className="min-h-screen px-6 pb-16 pt-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {!session && (
          <div className="mx-auto max-w-xl">
            <section className="mb-12 text-center">
              <span className="mono mb-4 block text-[#D61C1C]">{copy.badge}</span>
              <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">{copy.title}</h1>
              <p className="text-[#A7A7AB] leading-relaxed">{copy.subtitle}</p>
            </section>
          </div>
        )}

        <div className={session ? "mx-auto" : "mx-auto max-w-xl"}>
          <section className={`rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl ${session ? 'p-4 sm:p-8 md:p-12' : 'p-8 md:p-12'}`}>
          {!isConfigured ? (
            <div className="rounded-3xl border border-[#D61C1C]/20 bg-[#D61C1C]/10 p-5 text-[#F1D4D4]">
              {copy.unavailable}
            </div>
          ) : session ? (
            <MemberSpace session={session} profileName={profileName || session.user.email || 'Member'} onSignOut={handleSignOut} />
          ) : (
            <>
              <div className="mb-6 grid grid-cols-2 gap-3 rounded-3xl border border-white/8 bg-white/[0.03] p-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                    setSuccess('');
                  }}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                    mode === 'login' ? 'bg-[#D61C1C] text-white' : 'text-[#A7A7AB]'
                  }`}
                >
                  {copy.loginTab}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError('');
                    setSuccess('');
                  }}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                    mode === 'register' ? 'bg-[#D61C1C] text-white' : 'text-[#A7A7AB]'
                  }`}
                >
                  {copy.registerTab}
                </button>
              </div>

              {error ? (
                  <div className="mb-5 flex items-start gap-3 rounded-2xl border border-[#D61C1C]/20 bg-[#D61C1C]/10 p-4 text-sm text-[#F1D4D4]">
                    <AlertCircle size={18} className="mt-0.5 flex-shrink-0 text-[#D61C1C]" />
                    <p>{error}</p>
                  </div>
                ) : null}

                {success ? (
                  <div className="mb-5 flex items-start gap-3 rounded-2xl border border-green-500/25 bg-green-500/10 p-4 text-sm text-green-100">
                    <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-green-400" />
                    <p>{success}</p>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {mode === 'register' ? (
                    <div>
                      <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-white">
                        {copy.fullName}
                      </label>
                      <input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required={mode === 'register'} placeholder={copy.fullName} />
                    </div>
                  ) : null}
                  <div>
                    <label htmlFor="memberEmail" className="mb-2 block text-sm font-medium text-white">
                      {copy.email}
                    </label>
                    <input id="memberEmail" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="member@inderoos.nl" />
                  </div>
                  <div>
                    <label htmlFor="memberPassword" className="mb-2 block text-sm font-medium text-white">
                      {copy.password}
                    </label>
                    <input id="memberPassword" name="password" type="password" minLength={6} value={formData.password} onChange={handleChange} required placeholder="••••••••" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn-primary flex w-full items-center justify-center gap-2 disabled:opacity-60">
                    <LockKeyhole size={16} />
                    {isSubmitting ? copy.submitBusy : mode === 'login' ? copy.loginSubmit : copy.registerSubmit}
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CommunityV2;
