import { Link } from 'react-router-dom';
import { Mail, Instagram, AlertCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0C] border-t border-white/5 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Gang<span className="text-[#D61C1C]">2</span>Bang
              </span>
            </Link>
            <p className="text-[#A7A7AB] text-sm leading-relaxed max-w-xs">
              Exclusieve feesten in Amsterdam — veilig, stijlvol, discreet. Elke weekend een nieuw thema.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mono text-white mb-4">Navigatie</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/evenementen" className="text-[#A7A7AB] hover:text-white transition-colors text-sm">
                  Evenementen
                </Link>
              </li>
              <li>
                <Link to="/veiligheid" className="text-[#A7A7AB] hover:text-white transition-colors text-sm">
                  Veiligheid
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#A7A7AB] hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/algemene-voorwaarden" className="text-[#A7A7AB] hover:text-white transition-colors text-sm">
                  Algemene voorwaarden
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-[#A7A7AB] hover:text-white transition-colors text-sm">
                  Privacyverklaring
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mono text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@gang2bang.nl"
                  className="text-[#A7A7AB] hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Mail size={16} />
                  info@gang2bang.nl
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#A7A7AB] hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Instagram size={16} />
                  @gang2bang
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#A7A7AB] text-xs">
            © {new Date().getFullYear()} Gang2Bang. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-2 text-[#D61C1C]">
            <AlertCircle size={16} />
            <span className="text-xs font-semibold">18+ Alleen voor volwassenen</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
