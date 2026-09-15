import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { shopProducts } from '../data/platformContent';

const Shop = () => {
  const { language } = useLanguage();

  const content = {
    nl: {
      badge: 'SHOP',
      title: 'Voor avonden die al beginnen voordat je vertrekt.',
      intro:
        'Een discrete selectie van lingerie, verzorging en rituele details die passen bij de sfeer van In De Roos.',
      category: 'Categorie',
      cta: 'Vraag product aan',
      servicesCta: 'Bekijk diensten',
    },
    en: {
      badge: 'SHOP',
      title: 'For nights that begin before you leave home.',
      intro:
        'A discreet selection of lingerie, care, and ritual details that fit the atmosphere of In De Roos.',
      category: 'Category',
      cta: 'Request product',
      servicesCta: 'View services',
    },
    de: {
      badge: 'SHOP',
      title: 'Für Nächte, die schon beginnen, bevor du das Haus verlässt.',
      intro:
        'Eine diskrete Auswahl an Lingerie, Pflege und sinnlichen Details, passend zur Atmosphäre von In De Roos.',
      category: 'Kategorie',
      cta: 'Produkt anfragen',
      servicesCta: 'Services ansehen',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen px-6 pb-16 pt-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12 max-w-4xl">
          <span className="mono mb-4 block text-[#D61C1C]">{copy.badge}</span>
          <h1 className="mb-5 text-4xl font-black text-white md:text-6xl">{copy.title}</h1>
          <p className="text-lg leading-relaxed text-[#A7A7AB]">{copy.intro}</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {shopProducts.map((product) => (
            <article key={product.id} className="card-dark overflow-hidden">
              <div className="h-72 overflow-hidden">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="mono text-[#D61C1C]">{product.badge || copy.category}</span>
                  <span className="text-xl font-bold text-white">€ {product.price}</span>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-white">{product.name}</h2>
                <p className="mb-2 text-sm uppercase tracking-[0.18em] text-[#A7A7AB]">{product.category}</p>
                <p className="mb-6 leading-relaxed text-[#C7C7CD]">{product.description}</p>
                <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-[#D61C1C]">
                  {copy.cta}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-14 rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(214,28,28,0.16),rgba(20,20,22,0.78))] p-8 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3 text-[#D61C1C]">
                <ShoppingBag size={18} />
                <span className="mono">IN DE ROOS EDITS</span>
              </div>
              <h2 className="text-3xl font-bold text-white">Rituelen, verzorging en private gifting.</h2>
            </div>
            <Link to="/diensten">
              <button className="btn-secondary flex items-center gap-2">
                <Sparkles size={16} />
                {copy.servicesCta}
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shop;
