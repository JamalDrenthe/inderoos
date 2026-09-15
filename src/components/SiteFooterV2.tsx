import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useLanguage } from '../context/useLanguage';

const SiteFooterV2 = () => {
  const { language } = useLanguage();

  const content = {
    nl: {
      tagline: 'Besloten nachten met karakter.',
      linksTitle: 'Pagina’s',
      links: [
        { path: '/blog', label: 'Blog' },
        { path: '/shop', label: 'Boutique' },
        { path: '/contact', label: 'Contact' },
        { path: '/dames-heren', label: 'Dames & Heren' },
        { path: '/diensten', label: 'Diensten' },
        { path: '/faq', label: 'FAQ' },
        { path: '/gallery', label: 'Gallerij' },
        { path: '/community', label: 'Member Login' },
        { path: '/evenementen', label: 'Nachten' },
        { path: '/prijzen', label: 'Prijzen' },
        { path: '/veiligheid', label: 'Veiligheid' },
      ],
      contactTitle: 'Direct contact',
      contactItems: ['hello@inderoos.nl', 'Amsterdam & geheime locaties'],
      promiseTitle: 'Altijd helder',
      promiseItems: [
        'Locatie-drop pas op eventdag',
        'Hosts, huisregels en consent-first flow',
        'Prijzen op één aparte pagina, niet op elke kaart',
      ],
      rights: 'Alle rechten voorbehouden.',
      adults: '18+ adults only',
    },
    en: {
      tagline: 'Private nights with character.',
      linksTitle: 'Pages',
      links: [
        { path: '/shop', label: 'Boutique' },
        { path: '/contact', label: 'Contact' },
        { path: '/faq', label: 'FAQ' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/blog', label: 'Journal' },
        { path: '/dames-heren', label: 'Ladies & Gentlemen' },
        { path: '/community', label: 'Member Login' },
        { path: '/evenementen', label: 'Nights' },
        { path: '/prijzen', label: 'Pricing' },
        { path: '/veiligheid', label: 'Safety' },
        { path: '/diensten', label: 'Services' },
      ],
      contactTitle: 'Direct contact',
      contactItems: ['hello@inderoos.nl', 'Amsterdam & secret venues'],
      promiseTitle: 'Always clear',
      promiseItems: [
        'Location drop only on event day',
        'Hosts, rules, and a consent-first flow',
        'Pricing on one dedicated page, not on every card',
      ],
      rights: 'All rights reserved.',
      adults: '18+ adults only',
    },
    de: {
      tagline: 'Private Nächte mit Charakter.',
      linksTitle: 'Seiten',
      links: [
        { path: '/shop', label: 'Boutique' },
        { path: '/contact', label: 'Kontakt' },
        { path: '/faq', label: 'FAQ' },
        { path: '/gallery', label: 'Galerie' },
        { path: '/blog', label: 'Journal' },
        { path: '/dames-heren', label: 'Ladies & Gentlemen' },
        { path: '/community', label: 'Member Login' },
        { path: '/evenementen', label: 'Nächte' },
        { path: '/prijzen', label: 'Preise' },
        { path: '/diensten', label: 'Services' },
        { path: '/veiligheid', label: 'Sicherheit' },
      ],
      contactTitle: 'Direkter Kontakt',
      contactItems: ['hello@inderoos.nl', 'Amsterdam & geheime Locations'],
      promiseTitle: 'Immer klar',
      promiseItems: [
        'Location-Drop erst am Eventtag',
        'Hosts, Regeln und Consent-First-Flow',
        'Preise auf einer eigenen Seite statt auf jeder Karte',
      ],
      rights: 'Alle Rechte vorbehalten.',
      adults: 'Nur für Erwachsene 18+',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  return (
    <footer className="mt-16 border-t border-white/5 bg-[#080809] px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr_1fr]">
          <div>
            <BrandLogo src="/logos/Inderooslogogold1.png" className="mb-5 inline-flex items-center" imageClassName="h-16 w-auto max-w-[280px] object-contain opacity-95 md:h-20" />
            <p className="max-w-sm text-sm leading-relaxed text-[#A7A7AB]">{copy.tagline}</p>
          </div>

          <div>
            <h4 className="mono mb-4 text-white">{copy.linksTitle}</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {copy.links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-[#A7A7AB] transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mono mb-4 text-white">{copy.contactTitle}</h4>
            <div className="space-y-3 text-sm text-[#A7A7AB]">
              <a href="mailto:hello@inderoos.nl" className="flex items-center gap-3 transition-colors hover:text-white">
                <Mail size={16} className="text-[#D61C1C]" />
                {copy.contactItems[0]}
              </a>
              <p className="flex items-center gap-3">
                <MapPin size={16} className="text-[#D61C1C]" />
                {copy.contactItems[1]}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-center md:flex-row md:text-left">
          <p className="text-xs text-[#A7A7AB]">© {new Date().getFullYear()} In De Roos. {copy.rights}</p>
          <p className="text-xs font-semibold text-[#D61C1C]">{copy.adults}</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooterV2;
