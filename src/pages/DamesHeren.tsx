import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Users, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Profile {
  id: string;
  name: string;
  age: number;
  type: 'dame' | 'heer' | 'stel';
  quote: string;
  style: string;
  image: string;
  isHost?: boolean;
}

const profiles: Profile[] = [
  // Dames
  {
    id: '1',
    name: 'Nadia',
    age: 32,
    type: 'dame',
    quote: 'Mijn hakken blijven aan, de rest mag vallen. Ik ben geen muurbloempje.',
    style: 'Verleidelijk',
    image: '/images/profile_nadia.jpg',
    isHost: true,
  },
  {
    id: '2',
    name: 'Sophie',
    age: 28,
    type: 'dame',
    quote: 'Ik kom voor de spanning, ik blijf voor de chemie.',
    style: 'Nieuwsgierig',
    image: '/images/profile_sophie.jpg',
  },
  {
    id: '3',
    name: 'Elena',
    age: 35,
    type: 'dame',
    quote: 'Oogcontact is het beste voorspel. Durf je te kijken?',
    style: 'Dominant',
    image: '/images/profile_elena.jpg',
    isHost: true,
  },
  {
    id: '4',
    name: 'Lisa',
    age: 29,
    type: 'dame',
    quote: 'Ik zoek iemand die weet wat hij wil. En het durft te vragen.',
    style: 'Avontuurlijk',
    image: '/images/profile_lisa.jpg',
  },
  {
    id: '5',
    name: 'Maya',
    age: 31,
    type: 'dame',
    quote: 'Zachtjes beginnen, hard eindigen. Dat is mijn ritme.',
    style: 'Passioneel',
    image: '/images/profile_maya.jpg',
  },
  {
    id: '6',
    name: 'Iris',
    age: 27,
    type: 'dame',
    quote: 'Ik dans graag. Op de muziek. Op jou.',
    style: 'Speels',
    image: '/images/profile_iris.jpg',
  },
  // Heren
  {
    id: '7',
    name: 'Julian',
    age: 45,
    type: 'heer',
    quote: 'Ik leid graag, maar volg als je me weet te verrassen.',
    style: 'Gedreven',
    image: '/images/profile_julian.jpg',
    isHost: true,
  },
  {
    id: '8',
    name: 'Samir',
    age: 37,
    type: 'heer',
    quote: 'Dansen is voorspel. Ik zoek een vrouw die durft.',
    style: 'Charismatisch',
    image: '/images/profile_samir.jpg',
  },
  {
    id: '9',
    name: 'Marcus',
    age: 42,
    type: 'heer',
    quote: 'Mijn handen zijn warm en weten wat ze willen.',
    style: 'Ervaren',
    image: '/images/profile_marcus.jpg',
    isHost: true,
  },
  {
    id: '10',
    name: 'Thomas',
    age: 34,
    type: 'heer',
    quote: 'Ik kijk graag toe. Maar ik doe liever mee.',
    style: 'Nieuwsgierig',
    image: '/images/profile_thomas.jpg',
  },
  {
    id: '11',
    name: 'David',
    age: 39,
    type: 'heer',
    quote: 'Spannend is niet eng. Spannend is leven.',
    style: 'Avontuurlijk',
    image: '/images/profile_david.jpg',
  },
  {
    id: '12',
    name: 'Ruben',
    age: 36,
    type: 'heer',
    quote: 'Ik weet wat ik wil. En ik vraag het gewoon.',
    style: 'Direct',
    image: '/images/profile_ruben.jpg',
  },
  // Stellen
  {
    id: '13',
    name: 'Lieve & Bram',
    age: 40,
    type: 'stel',
    quote: 'Zij kijkt, hij laat zich gaan. We zoeken iemand die onze dynamiek begrijpt.',
    style: 'Open',
    image: '/images/profile_lievebram.jpg',
    isHost: true,
  },
  {
    id: '14',
    name: 'Anna & Mark',
    age: 35,
    type: 'stel',
    quote: 'Samen ontdekken we grenzen. Samen gaan we eroverheen.',
    style: 'Nieuwsgierig',
    image: '/images/profile_annamark.jpg',
  },
  {
    id: '15',
    name: 'Kim & Jeroen',
    age: 38,
    type: 'stel',
    quote: 'Wij delen alles. Ons bed. Onze fantasieën. Onze nachten.',
    style: 'Gepassioneerd',
    image: '/images/profile_kimjeroen.jpg',
  },
];

const DamesHeren = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<'all' | 'dame' | 'heer' | 'stel'>('all');
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);

  const filteredProfiles = filter === 'all' 
    ? profiles 
    : profiles.filter(p => p.type === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.profile-card',
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out' }
          );
        },
        once: true
      });
    });

    return () => ctx.revert();
  }, [filteredProfiles]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dame': return '♀';
      case 'heer': return '♂';
      case 'stel': return '⚤';
      default: return '';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'dame': return 'Dame';
      case 'heer': return 'Heer';
      case 'stel': return 'Stel';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative px-6 lg:px-12 mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D61C1C]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart size={24} className="text-[#D61C1C] fill-[#D61C1C] animate-pulse" />
            <span className="mono text-[#D61C1C]">DE COMMUNITY</span>
            <Heart size={24} className="text-[#D61C1C] fill-[#D61C1C] animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Onze Dames <span className="text-[#D61C1C]">&</span> Heren
          </h1>
          <p className="text-2xl md:text-3xl text-[#A7A7AB] italic mb-8">
            De Chemie
          </p>
          <p className="text-[#A7A7AB] text-lg max-w-3xl mx-auto leading-relaxed">
            Dit zijn de gezichten, de lichamen en de blikken die Gang2Bang maken tot wat het is. 
            Geen poppenkast, maar echte mannen en vrouwen met een honger naar meer. 
            Ze zijn hier voor de spanning, de dans, de aanraking en alles wat daarna komt.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 lg:px-12 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                filter === 'all'
                  ? 'bg-[#D61C1C] text-white'
                  : 'bg-[#141416] text-[#A7A7AB] hover:text-white'
              }`}
            >
              <Users size={16} />
              Iedereen
            </button>
            <button
              onClick={() => setFilter('dame')}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                filter === 'dame'
                  ? 'bg-[#D61C1C] text-white'
                  : 'bg-[#141416] text-[#A7A7AB] hover:text-white'
              }`}
            >
              <span className="text-lg">♀</span>
              Dames
            </button>
            <button
              onClick={() => setFilter('heer')}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                filter === 'heer'
                  ? 'bg-[#D61C1C] text-white'
                  : 'bg-[#141416] text-[#A7A7AB] hover:text-white'
              }`}
            >
              <span className="text-lg">♂</span>
              Heren
            </button>
            <button
              onClick={() => setFilter('stel')}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                filter === 'stel'
                  ? 'bg-[#D61C1C] text-white'
                  : 'bg-[#141416] text-[#A7A7AB] hover:text-white'
              }`}
            >
              <span className="text-lg">⚤</span>
              Stellen
            </button>
          </div>
        </div>
      </section>

      {/* Profiles Grid */}
      <section ref={sectionRef} className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                className="profile-card group relative"
                onMouseEnter={() => setHoveredProfile(profile.id)}
                onMouseLeave={() => setHoveredProfile(null)}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#141416]">
                  {/* Profile image */}
                  <img 
                    src={profile.image} 
                    alt={profile.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Host badge */}
                  {profile.isHost && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="flex items-center gap-1 px-3 py-1 bg-[#D61C1C] text-white text-xs font-bold rounded-full">
                        <Sparkles size={12} />
                        HOST
                      </span>
                    </div>
                  )}

                  {/* Type icon */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="text-2xl text-white/80">{getTypeIcon(profile.type)}</span>
                  </div>

                  {/* Overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/60 to-transparent transition-opacity duration-500 ${
                    hoveredProfile === profile.id ? 'opacity-100' : 'opacity-0'
                  }`} />

                  {/* Content */}
                  <div className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-500 ${
                    hoveredProfile === profile.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <p className="text-[#D61C1C] text-xs font-medium uppercase tracking-wider mb-1">
                      {profile.style}
                    </p>
                    <p className="text-white/80 text-sm italic leading-relaxed mb-3">
                      &ldquo;{profile.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Name card below image */}
                <div className="mt-4 text-center">
                  <h3 className="text-white font-bold text-lg">
                    {profile.name}, {profile.age}
                  </h3>
                  <p className="text-[#A7A7AB] text-sm">
                    {getTypeLabel(profile.type)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 lg:px-12 mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="card-dark p-8 text-center">
            <p className="text-[#A7A7AB] text-sm leading-relaxed">
              Alle getoonde personen zijn 18+ en hebben schriftelijke toestemming gegeven voor het gebruik van hun profiel. 
              Hun aanwezigheid op deze site is hun eigen keuze. Net als wat er tijdens een evenement gebeurt. 
              Gang2Bang respecteert de privacy en grenzen van alle deelnemers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white text-xl mb-6">
            Klaar om de chemie te voelen?
          </p>
          <a href="/evenementen">
            <button className="btn-primary flex items-center gap-2 mx-auto">
              <Heart size={18} className="fill-white" />
              Bekijk evenementen
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default DamesHeren;
