import { Link } from 'react-router-dom';
import { Mail, Lock, MapPin, Clock3 } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

const SiteFooter = () => {
  const { language } = useLanguage();

  const content = {
    nl: {
      tagline: 'Exclusieve weekender-community met geheime locaties, harde regels en een strakke RSVP-flow.',
      linksTitle: 'Navigatie',
      links: [
        { path: '/evenementen', label: 'Kalender' },
        { path: '/boeking', label: 'Aanmelden' },
        { path: '/veiligheid', label: 'Huisregels' },
        { path: '/community', label: 'Member Login' },
        { path: '/contact', label: 'Contact' },
      ],
      rulesTitle: 'Niet onderhandelbaar',
      rules: [
        'Strict no-phone policy',
        'Secret location drop op eventdag',
        '21:00 - 05:00 toegang',
        '18+ en ID verplicht',
      ],
      rights: 'Alle rechten voorbehouden.',
      adults: '18+ adults only',
    },
    en: {
      tagline: 'Exclusive weekender community with secret locations, hard rules, and a tight RSVP flow.',
      linksTitle: 'Navigation',
      links: [
        { path: '/evenementen', label: 'Calendar' },
        { path: '/boeking', label: 'Apply' },
        { path: '/veiligheid', label: 'Rules' },
        { path: '/community', label: 'Member Login' },
        { path: '/contact', label: 'Contact' },
      ],
      rulesTitle: 'Non-negotiable',
      rules: [
        'Strict no-phone policy',
        'Secret location revealed on event day',
        '21:00 - 05:00 access',
        '18+ and ID required',
      ],
      rights: 'All rights reserved.',
      adults: '18+ adults only',
    },
    de: {
      tagline: 'Exklusive Weekender-Community mit geheimen Locations, klaren Regeln und straffem RSVP-Prozess.',
      linksTitle: 'Navigation',
      links: [
        { path: '/evenementen', label: 'Kalender' },
        { path: '/boeking', label: 'Anmelden' },
        { path: '/veiligheid', label: 'Regeln' },
        { path: '/community', label: 'Member Login' },
        { path: '/contact', label: 'Kontakt' },
      ],
      rulesTitle: 'Nicht verhandelbar',
      rules: [
        'Strikte No-Phone-Policy',
        'Secret Location erst am Eventtag',
        '21:00 - 05:00 Zugang',
        '18+ und Ausweis Pflicht',
      ],
      rights: 'Alle Rechte vorbehalten.',
      adults: 'Nur für Erwachsene 18+',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  const icons = [Lock, MapPin, Clock3, Mail];

  return (
    <footer className="bg-[#080809] border-t border-white/5 py-16 px-6 lg:px-12 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr_1fr] gap-10 mb-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-4 text-white">
              <span className="mono text-[#D61C1C]">PRIVATE RSVP</span>
              <span className="text-2xl font-bold tracking-[0.2em] uppercase">In De Roos</span>
            </Link>
            <p className="text-[#A7A7AB] text-sm leading-relaxed max-w-sm">{copy.tagline}</p>
          </div>

          <div>
            <h4 className="mono text-white mb-4">{copy.linksTitle}</h4>
            <ul className="space-y-3">
              {copy.links.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-[#A7A7AB] hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mono text-white mb-4">{copy.rulesTitle}</h4>
            <ul className="space-y-3">
              {copy.rules.map((rule, index) => {
                const Icon = icons[index] ?? Lock;
                return (
                  <li key={rule} className="text-[#A7A7AB] text-sm flex items-start gap-3">
                    <Icon size={16} className="text-[#D61C1C] mt-0.5 flex-shrink-0" />
                    <span>{rule}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#A7A7AB] text-xs">© {new Date().getFullYear()} In De Roos. {copy.rights}</p>
          <p className="text-[#D61C1C] text-xs font-semibold">{copy.adults}</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
