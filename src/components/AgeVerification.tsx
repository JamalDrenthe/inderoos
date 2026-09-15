import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import BrandLogo from './BrandLogo';

const AgeVerification = () => {
  // Use lazy initialization to check localStorage synchronously only once
  const [isOpen, setIsOpen] = useState(() => {
    // Return false during SSR/hydration if window is undefined
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem('inderoos_age_verified');
  });
  
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [language, setLanguage] = useState<'nl' | 'en' | 'de'>('nl');

  useEffect(() => {
    // Only handle side-effects like body overflow in useEffect
    if (isOpen && !isFading) {
      document.body.style.overflow = 'hidden';
      // Trigger entry animation
      requestAnimationFrame(() => setIsMounted(true));
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isFading]);

  const handleAccept = () => {
    localStorage.setItem('inderoos_age_verified', 'true');
    setIsFading(true);
    setTimeout(() => {
      setIsOpen(false);
      document.body.style.overflow = 'auto'; // Restore scrolling
    }, 400); // Matches the duration of the transition
  };

  const handleDecline = () => {
    // If they decline, redirect them away to a safe search engine
    window.location.href = 'https://www.google.com';
  };

  if (!isOpen) return null;

  const content = {
    nl: {
      title: 'Leeftijdsverificatie',
      text: 'In De Roos is een besloten community. Onze evenementen en de inhoud van deze website zijn uitsluitend bestemd voor personen van 18 jaar en ouder.',
      question: 'Ben je 18 jaar of ouder?',
      accept: 'Ja, ik ben 18+',
      decline: 'Nee, ik ben jonger',
      terms: 'Door op "Ja" te klikken, ga je ermee akkoord dat we functionele cookies gebruiken om je keuze te onthouden.',
    },
    en: {
      title: 'Age Verification',
      text: 'In De Roos is a private community. Our events and the content of this website are strictly intended for individuals aged 18 and older.',
      question: 'Are you 18 years or older?',
      accept: 'Yes, I am 18+',
      decline: 'No, I am under 18',
      terms: 'By clicking "Yes", you agree to our use of functional cookies to remember your choice.',
    },
    de: {
      title: 'Altersüberprüfung',
      text: 'In De Roos ist eine geschlossene Community. Unsere Veranstaltungen und der Inhalt dieser Website sind ausschließlich für Personen ab 18 Jahren bestimmt.',
      question: 'Bist du 18 Jahre oder älter?',
      accept: 'Ja, ich bin 18+',
      decline: 'Nein, ich bin jünger',
      terms: 'Durch Klicken auf "Ja" stimmst du der Verwendung funktionaler Cookies zu, um deine Auswahl zu speichern.',
    },
  };

  const copy = content[language as keyof typeof content] || content.en;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#080809]/95 px-4 backdrop-blur-xl transition-all duration-700 ease-out ${
        !isMounted ? 'opacity-0' : isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div 
        className={`relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#111113] shadow-[0_40px_120px_rgba(0,0,0,0.6)] transition-all duration-700 delay-100 ease-out ${
          !isMounted ? 'translate-y-8 scale-95 opacity-0' : isFading ? 'translate-y-4 scale-95 opacity-0' : 'translate-y-0 scale-100 opacity-100'
        }`}
      >
        {/* Top gradient glow */}
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,rgba(214,28,28,0.15),transparent_50%)]" />

        <div className="relative p-8 sm:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <BrandLogo src="/logos/Inderooslogogold3.png" clickable={false} className="mb-6 flex justify-center" imageClassName="h-14 w-auto object-contain" />
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.03] text-[#D61C1C]">
              <Shield size={24} />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white">{copy.title}</h2>
            <p className="mb-6 text-sm leading-relaxed text-[#A7A7AB]">{copy.text}</p>
            <p className="font-semibold text-white">{copy.question}</p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleAccept}
              className="w-full rounded-full bg-[#D61C1C] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#E52525] hover:shadow-[0_0_20px_rgba(214,28,28,0.3)] active:scale-[0.98]"
            >
              {copy.accept}
            </button>
            <button
              onClick={handleDecline}
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-3.5 text-sm font-medium text-[#A7A7AB] transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {copy.decline}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex justify-center gap-4 mb-4">
              <button onClick={() => setLanguage('nl')} className={`text-xs font-medium uppercase tracking-wider ${language === 'nl' ? 'text-white' : 'text-white/30 hover:text-white/70'}`}>NL</button>
              <button onClick={() => setLanguage('en')} className={`text-xs font-medium uppercase tracking-wider ${language === 'en' ? 'text-white' : 'text-white/30 hover:text-white/70'}`}>EN</button>
              <button onClick={() => setLanguage('de')} className={`text-xs font-medium uppercase tracking-wider ${language === 'de' ? 'text-white' : 'text-white/30 hover:text-white/70'}`}>DE</button>
            </div>
            <p className="text-center text-[11px] text-white/40">{copy.terms}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
