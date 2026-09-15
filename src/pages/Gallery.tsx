import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Film, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import galleryAssets from '../data/galleryAssetsCombined.json';

type GalleryKind = 'photo' | 'video';

interface GalleryItem {
  id: string;
  kind: GalleryKind;
  title: string;
  description: string;
  image: string;
  meta: string;
}

const buildDynamicItems = (): GalleryItem[] => {
  return galleryAssets.map((assetPath, index) => {
    const ext = assetPath.split('.').pop()?.toLowerCase() || '';
    const isVideo = ext === 'mp4' || ext === 'webm';
    const kind: GalleryKind = isVideo ? 'video' : 'photo';
    
    // Extract a readable title from the filename
    const fileName = assetPath.split('/').pop() || '';
    const baseName = fileName.replace(/\.[^/.]+$/, "");
    const readableTitle = baseName
      .split(/[_-]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace(/[0-9]+.*$/, '') // Clean up trailing numbers/hashes
      .trim() || 'Gallery Item';

    const cleanTitle = (readableTitle: string) => {
      // Return the generated title based on the index to ensure consistency per file
      // while keeping it simple and static for the example without unused variables
      // using the readableTitle string length as a deterministic seed
      const titles = [
        "Seductive Glance",
        "Midnight Whispers",
        "Velvet Shadows",
        "Sensual Encounter",
        "Intimate Moments",
        "Hidden Desires",
        "Elegance",
        "Late Night Chemistry",
        "Soft Touch",
        "Unspoken Rules"
      ];
      
      const index = readableTitle.length % titles.length;

      // We still want to use the actual title as requested by the user: "Zet uitzonderlijk de bestandstitel van deze video in de tekst van de container"
      // Wait, the user specifically asked to use the filename in the text of the container. 
      // But we also wanted "sexy" titles. So let's combine or use the titles array if not an explicitly clear filename.
      if (assetPath.includes('video')) return readableTitle;
      return titles[index];
    };

    return {
      id: `dynamic-${index}`,
      kind,
      title: cleanTitle(readableTitle),
      description: `Filename: ${fileName} - ${isVideo ? 'Een intiem moment vastgelegd in beweging.' : 'Een gecureerd beeld uit onze collectie.'}`,
      image: assetPath,
      meta: isVideo ? 'Video archive' : 'Photo archive',
      fileName: fileName,
    };
  });
};

const Gallery = () => {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | GalleryKind>('all');
  const galleryItems = useMemo(() => buildDynamicItems(), []);

  const content = {
    nl: {
      badge: 'GALLERIJ',
      title: 'Alle content in één besloten collectie.',
      intro:
        'Hier vind je de visuele en muzikale lagen rond In De Roos. Foto’s, video’s en music drops blijven filterbaar, zodat je precies de sfeer kunt openen die je zoekt.',
      filters: {
        all: 'Alles',
        photo: 'Photos',
        video: 'Videos',
        music: 'Music',
      },
      browseLabel: 'Filter de collectie',
      cta: 'Vraag toegang tot meer content',
      footerTitle: 'Meer zien, horen of delen?',
      footerText:
        'Gebruik contact als je clips, shoots, playlists of nieuwe content discreet met ons wilt delen of aanvragen.',
    },
    en: {
      badge: 'GALLERY',
      title: 'All content gathered in one private collection.',
      intro:
        'This is where the visual and musical layers around In De Roos come together. Photos, videos, and music drops stay filterable, so you can open exactly the atmosphere you are looking for.',
      filters: {
        all: 'All',
        photo: 'Photos',
        video: 'Videos',
        music: 'Music',
      },
      browseLabel: 'Filter the collection',
      cta: 'Request access to more content',
      footerTitle: 'Want to see, hear, or share more?',
      footerText:
        'Use contact if you want to request or discreetly share clips, shoots, playlists, or new content with us.',
    },
    de: {
      badge: 'GALERIE',
      title: 'Alle Inhalte in einer privaten Kollektion.',
      intro:
        'Hier kommen die visuellen und musikalischen Ebenen rund um In De Roos zusammen. Fotos, Videos und Music-Drops bleiben filterbar, damit du genau die Atmosphäre öffnen kannst, die du suchst.',
      filters: {
        all: 'Alles',
        photo: 'Photos',
        video: 'Videos',
        music: 'Music',
      },
      browseLabel: 'Kollektion filtern',
      cta: 'Zugang zu mehr Content anfragen',
      footerTitle: 'Mehr sehen, hören oder teilen?',
      footerText:
        'Nutze Kontakt, wenn du Clips, Shootings, Playlists oder neue Inhalte diskret anfragen oder mit uns teilen möchtest.',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  const filteredItems = useMemo(
    () => (activeFilter === 'all' ? galleryItems : galleryItems.filter((item) => item.kind === activeFilter)),
    [activeFilter, galleryItems],
  );

  const iconByFilter = {
    photo: Camera,
    video: Film,
  } as const;

  return (
    <div className="min-h-screen px-6 pb-16 pt-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12 max-w-4xl">
          <span className="mono mb-4 block text-[#D61C1C]">{copy.badge}</span>
          <h1 className="mb-5 text-4xl font-black text-white md:text-6xl">{copy.title}</h1>
          <p className="text-lg leading-relaxed text-[#A7A7AB]">{copy.intro}</p>
        </section>

        <section className="mb-10 rounded-[32px] border border-white/8 bg-white/[0.03] p-5 md:p-6">
          <div className="mb-4 flex items-center gap-3 text-[#D61C1C]">
            <SlidersHorizontal size={18} />
            <span className="mono">{copy.browseLabel}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {(['all', 'photo', 'video'] as const).map((filter) => {
              const Icon = filter === 'all' ? SlidersHorizontal : iconByFilter[filter];
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                    activeFilter === filter ? 'bg-[#D61C1C] text-white' : 'bg-[#141416] text-[#C6C6CD] hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {copy.filters[filter]}
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => {
            const Icon = iconByFilter[item.kind];
            const isVideo = item.kind === 'video';
            return (
              <div key={item.id} className="group overflow-hidden rounded-[28px] border border-white/8 bg-[#111113] transition-colors hover:border-white/20">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {isVideo ? (
                    <video src={item.image} autoPlay loop muted playsInline className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(11,11,13,0.9)_100%)] pointer-events-none" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/85 backdrop-blur-md">
                    <Icon size={14} className="text-[#D61C1C]" />
                    {copy.filters[item.kind]}
                  </div>
                </div>
                <div className="p-6 relative z-10">
                  <p className="mono mb-3 text-[#D61C1C]">{item.meta}</p>
                  <h2 className="mb-3 text-3xl font-bold text-white">{item.title}</h2>
                  <p className="mb-6 leading-relaxed text-[#C7C7CD]">{item.description}</p>
                  <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-[#D61C1C]">
                    {copy.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-14 rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(214,28,28,0.16),rgba(20,20,22,0.78))] p-8 md:p-10">
          <h2 className="mb-4 text-3xl font-bold text-white">{copy.footerTitle}</h2>
          <p className="max-w-3xl leading-relaxed text-[#ECECF0]">{copy.footerText}</p>
        </section>
      </div>
    </div>
  );
};

export default Gallery;
