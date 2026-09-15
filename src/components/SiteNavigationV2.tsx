import { useEffect, useState } from 'react';
import { ChevronDown, Globe2, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { useLanguage } from '../context/useLanguage';
import { languageOptions } from '../lib/siteData';

const SiteNavigationV2 = () => {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isPlusOpen, setIsPlusOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = {
    nl: {
      links: [
        { path: '/evenementen', label: 'Nachten' },
        { path: '/prijzen', label: 'Prijzen' },
        { path: '/dames-heren', label: 'Dames & Heren' },
        { path: '/community', label: 'Member Login' },
      ],
      plusLabel: 'Plus',
      plusLinks: [
        { path: '/gallery', label: 'Gallerij' },
        { path: '/shop', label: 'Boutique' },
        { path: '/diensten', label: 'Diensten' },
        { path: '/vacatures', label: 'Vacatures' },
        { path: '/veiligheid', label: 'Veiligheid' },
        { path: '/contact', label: 'Contact' },
      ],
      cta: 'Vraag toegang aan',
      switcher: 'Taal',
      openMenu: 'Open menu',
      closeMenu: 'Sluit menu',
    },
    en: {
      links: [
        { path: '/evenementen', label: 'Nights' },
        { path: '/prijzen', label: 'Pricing' },
        { path: '/dames-heren', label: 'Ladies & Gentlemen' },
        { path: '/community', label: 'Member Login' },
      ],
      plusLabel: 'Plus',
      plusLinks: [
        { path: '/gallery', label: 'Gallery' },
        { path: '/shop', label: 'Boutique' },
        { path: '/diensten', label: 'Services' },
        { path: '/vacatures', label: 'Careers' },
        { path: '/veiligheid', label: 'Safety' },
        { path: '/contact', label: 'Contact' },
      ],
      cta: 'Request access',
      switcher: 'Language',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    de: {
      links: [
        { path: '/evenementen', label: 'Nächte' },
        { path: '/prijzen', label: 'Preise' },
        { path: '/dames-heren', label: 'Ladies & Gentlemen' },
        { path: '/community', label: 'Member Login' },
      ],
      plusLabel: 'Plus',
      plusLinks: [
        { path: '/gallery', label: 'Galerie' },
        { path: '/shop', label: 'Boutique' },
        { path: '/diensten', label: 'Services' },
        { path: '/vacatures', label: 'Jobs' },
        { path: '/veiligheid', label: 'Sicherheit' },
        { path: '/contact', label: 'Kontakt' },
      ],
      cta: 'Zugang anfragen',
      switcher: 'Sprache',
      openMenu: 'Menü öffnen',
      closeMenu: 'Menü schließen',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  const isActive = (path: string) => location.pathname === path;
  const isPlusActive = copy.plusLinks.some((link) => isActive(link.path));
  const handleCloseMenus = () => {
    setIsMobileMenuOpen(false);
    setIsLanguageOpen(false);
    setIsPlusOpen(false);
  };
  const handleToggleLanguage = () => {
    setIsPlusOpen(false);
    setIsLanguageOpen((prev) => !prev);
  };
  const handleTogglePlus = () => {
    setIsLanguageOpen(false);
    setIsPlusOpen((prev) => !prev);
  };
  const handleToggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      handleCloseMenus();
      return;
    }

    setIsMobileMenuOpen(true);
  };

  return (
    <>
      <nav
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'border-b border-white/5 bg-[#080809]/92 shadow-[0_16px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl'
            : 'bg-[linear-gradient(180deg,rgba(8,8,9,0.8),rgba(8,8,9,0.08))]'
        }`}
      >
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-6 py-4 lg:px-8 xl:px-12">
          {/* Logo (Left) */}
          <div className="flex lg:flex-1">
            <BrandLogo src="/logos/Inderooslogogold3.png" className="flex items-center" imageClassName="h-10 w-auto object-contain md:h-12" />
          </div>

          {/* Links (Center) */}
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <div className="flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.02] p-1.5 backdrop-blur-md">
              {copy.links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleCloseMenus}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-all duration-300 xl:px-4 xl:text-sm ${
                    isActive(link.path)
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-[#A7A7AB] hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="relative">
                {isPlusOpen ? (
                  <button
                    type="button"
                    aria-controls="desktop-plus-menu"
                    aria-expanded="true"
                    aria-haspopup="menu"
                    onClick={handleTogglePlus}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-all duration-300 xl:px-4 xl:text-sm ${
                      isPlusActive || isPlusOpen
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-[#A7A7AB] hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <span>{copy.plusLabel}</span>
                    <ChevronDown size={14} className="rotate-180 transition-transform" />
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-controls="desktop-plus-menu"
                    aria-expanded="false"
                    aria-haspopup="menu"
                    onClick={handleTogglePlus}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-all duration-300 xl:px-4 xl:text-sm ${
                      isPlusActive || isPlusOpen
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-[#A7A7AB] hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <span>{copy.plusLabel}</span>
                    <ChevronDown size={14} className="transition-transform" />
                  </button>
                )}

                {isPlusOpen ? (
                  <div id="desktop-plus-menu" className="absolute left-1/2 top-full z-10 mt-3 w-56 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#111113] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                    {copy.plusLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={handleCloseMenus}
                        className={`flex w-full items-center rounded-xl px-3 py-2 text-sm transition-colors ${
                          isActive(link.path)
                            ? 'bg-[#D61C1C] text-white'
                            : 'text-[#A7A7AB] hover:bg-white/[0.04] hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Actions (Right) */}
          <div className="flex items-center justify-end gap-3 lg:flex-1">
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <div className="relative">
                <button
                  type="button"
                  aria-label={copy.switcher}
                  onClick={handleToggleLanguage}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white transition-colors hover:border-white/20"
                >
                  <Globe2 size={14} className="text-[#A7A7AB]" />
                  <span>{language.toUpperCase()}</span>
                  <ChevronDown size={14} className={`transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLanguageOpen ? (
                  <div className="absolute right-0 mt-3 w-40 rounded-2xl border border-white/10 bg-[#111113] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                    {languageOptions.map((option) => (
                      <button
                        key={option.code}
                        type="button"
                        onClick={() => {
                          setLanguage(option.code);
                          handleCloseMenus();
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                          language === option.code ? 'bg-[#D61C1C] text-white' : 'text-[#A7A7AB] hover:bg-white/[0.04] hover:text-white'
                        }`}
                      >
                        <span>{option.label}</span>
                        <span className="text-[11px] uppercase tracking-[0.2em]">{option.code}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <Link to="/boeking" onClick={handleCloseMenus}>
                <button className="btn-primary whitespace-nowrap">{copy.cta}</button>
              </Link>
            </div>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? copy.closeMenu : copy.openMenu}
              className="rounded-full border border-white/10 bg-white/[0.03] p-3 text-white lg:hidden"
              onClick={handleToggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-40 bg-[#080809]/98 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden">
          <div className="mx-auto flex h-full max-w-xl flex-col">
            <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-3">
              <button
                type="button"
                onClick={handleToggleLanguage}
                className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-white"
              >
                <span className="flex items-center gap-2">
                  <Globe2 size={16} className="text-[#A7A7AB]" />
                  {copy.switcher}
                </span>
                <span className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#A7A7AB]">
                  {language}
                  <ChevronDown size={14} className={`transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </span>
              </button>

              {isLanguageOpen ? (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => {
                        setLanguage(option.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`rounded-2xl px-3 py-3 text-sm font-semibold transition-colors ${
                        language === option.code ? 'bg-[#D61C1C] text-white' : 'bg-white/[0.03] text-[#A7A7AB]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="grid gap-3">
              {copy.links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleCloseMenus}
                  className={`rounded-3xl border px-5 py-4 text-lg font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'border-[#D61C1C] bg-[#D61C1C]/12 text-white'
                      : 'border-white/10 bg-white/[0.03] text-[#E5E5EA]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03]">
                {isPlusOpen ? (
                  <button
                    type="button"
                    aria-controls="mobile-plus-menu"
                    aria-expanded="true"
                    aria-haspopup="menu"
                    onClick={handleTogglePlus}
                    className={`flex w-full items-center justify-between rounded-3xl px-5 py-4 text-lg font-semibold transition-colors ${
                      isPlusActive || isPlusOpen ? 'text-white' : 'text-[#E5E5EA]'
                    }`}
                  >
                    <span>{copy.plusLabel}</span>
                    <ChevronDown size={18} className="rotate-180 transition-transform" />
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-controls="mobile-plus-menu"
                    aria-expanded="false"
                    aria-haspopup="menu"
                    onClick={handleTogglePlus}
                    className={`flex w-full items-center justify-between rounded-3xl px-5 py-4 text-lg font-semibold transition-colors ${
                      isPlusActive || isPlusOpen ? 'text-white' : 'text-[#E5E5EA]'
                    }`}
                  >
                    <span>{copy.plusLabel}</span>
                    <ChevronDown size={18} className="transition-transform" />
                  </button>
                )}

                {isPlusOpen ? (
                  <div id="mobile-plus-menu" className="grid gap-2 px-3 pb-3">
                    {copy.plusLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={handleCloseMenus}
                        className={`rounded-2xl border px-4 py-3 text-base font-medium transition-colors ${
                          isActive(link.path)
                            ? 'border-[#D61C1C] bg-[#D61C1C]/12 text-white'
                            : 'border-white/10 bg-[#0F0F11] text-[#C7C7CD]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-auto pt-8">
              <Link to="/boeking" onClick={handleCloseMenus}>
                <button className="btn-primary w-full">{copy.cta}</button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SiteNavigationV2;
