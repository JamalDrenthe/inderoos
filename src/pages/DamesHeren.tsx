import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Users, Sparkles, Mail, LockKeyhole } from 'lucide-react';
import { getStoredMemberSession, isSessionValid } from '../lib/memberAuth';

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
    image: '/images/hero_couple_1.jpg',
    isHost: true,
  },
  {
    id: '2',
    name: 'Sophie',
    age: 28,
    type: 'dame',
    quote: 'Ik kom voor de spanning, ik blijf voor de chemie.',
    style: 'Nieuwsgierig',
    image: '/images/hero_couple_2.jpg',
  },
  {
    id: '3',
    name: 'Elena',
    age: 35,
    type: 'dame',
    quote: 'Oogcontact is het beste voorspel. Durf je te kijken?',
    style: 'Dominant',
    image: '/images/hero_couple_3.jpg',
    isHost: true,
  },
  {
    id: '4',
    name: 'Lisa',
    age: 29,
    type: 'dame',
    quote: 'Ik zoek iemand die weet wat hij wil. En het durft te vragen.',
    style: 'Avontuurlijk',
    image: '/images/hero_couple_4.jpg',
  },
  {
    id: '5',
    name: 'Maya',
    age: 31,
    type: 'dame',
    quote: 'Zachtjes beginnen, hard eindigen. Dat is mijn ritme.',
    style: 'Passioneel',
    image: '/images/hero_couple_5.jpg',
  },
  {
    id: '6',
    name: 'Iris',
    age: 27,
    type: 'dame',
    quote: 'Ik dans graag. Op de muziek. Op jou.',
    style: 'Speels',
    image: '/images/hero_couple_6.jpg',
  },
  // Heren
  {
    id: '7',
    name: 'Julian',
    age: 45,
    type: 'heer',
    quote: 'Ik leid graag, maar volg als je me weet te verrassen.',
    style: 'Gedreven',
    image: '/images/hero_group_1.jpg',
    isHost: true,
  },
  {
    id: '9',
    name: 'Marcus',
    age: 42,
    type: 'heer',
    quote: 'Mijn handen zijn warm en weten wat ze willen.',
    style: 'Ervaren',
    image: '/images/hero_group_2.jpg',
    isHost: true,
  },
  {
    id: '10',
    name: 'Thomas',
    age: 34,
    type: 'heer',
    quote: 'Ik kijk graag toe. Maar ik doe liever mee.',
    style: 'Nieuwsgierig',
    image: '/images/theme_bdsm.jpg',
  },
  {
    id: '11',
    name: 'David',
    age: 39,
    type: 'heer',
    quote: 'Spannend is niet eng. Spannend is leven.',
    style: 'Avontuurlijk',
    image: '/images/event_bbc.jpg',
  },
  {
    id: '12',
    name: 'Ruben',
    age: 36,
    type: 'heer',
    quote: 'Ik weet wat ik wil. En ik vraag het gewoon.',
    style: 'Direct',
    image: '/images/event_cuck.jpg',
  },
  // Stellen
  {
    id: '13',
    name: 'Lieve & Bram',
    age: 40,
    type: 'stel',
    quote: 'Zij kijkt, hij laat zich gaan. We zoeken iemand die onze dynamiek begrijpt.',
    style: 'Open',
    image: '/images/event_swingers.jpg',
    isHost: true,
  },
  {
    id: '14',
    name: 'Anna & Mark',
    age: 35,
    type: 'stel',
    quote: 'Samen ontdekken we grenzen. Samen gaan we eroverheen.',
    style: 'Nieuwsgierig',
    image: '/images/safety_hosts.jpg',
  },
  {
    id: '15',
    name: 'Kim & Jeroen',
    age: 38,
    type: 'stel',
    quote: 'Wij delen alles. Ons bed. Onze fantasieën. Onze nachten.',
    style: 'Gepassioneerd',
    image: '/images/hero_couple_1.jpg',
  },
];

const DamesHeren = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'dame' | 'heer' | 'stel'>('all');
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);
  const [isLoggedIn] = useState(() => isSessionValid(getStoredMemberSession()));

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
            Dit zijn de gezichten, de lichamen en de blikken die In De Roos maken tot wat het is. 
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
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/80 to-transparent transition-opacity duration-500 ${
                    hoveredProfile === profile.id ? 'opacity-100' : 'opacity-0'
                  }`} />

                  {/* Content */}
                  <div className={`absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end transition-all duration-500 ${
                    hoveredProfile === profile.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <p className="text-[#D61C1C] text-xs font-medium uppercase tracking-wider mb-2">
                      {profile.style}
                    </p>
                    <p className="text-white/90 text-sm italic leading-relaxed mb-4">
                      &ldquo;{profile.quote}&rdquo;
                    </p>
                    {isLoggedIn ? (
                      <button 
                        onClick={() => navigate('/community')}
                        className="flex items-center justify-center gap-2 w-full bg-white text-black py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105"
                      >
                        <Mail size={14} />
                        Stuur bericht
                      </button>
                    ) : (
                      <button 
                        onClick={() => navigate('/member-login')}
                        className="flex items-center justify-center gap-2 w-full border border-white/20 bg-black/40 backdrop-blur-sm text-white py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/10"
                      >
                        <LockKeyhole size={14} />
                        Login om te chatten
                      </button>
                    )}
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

      <section className="px-6 lg:px-12 mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(214,28,28,0.16),rgba(20,20,22,0.82))] p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4 text-[#D61C1C]">
              <Sparkles size={18} />
              <span className="mono">PROMO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Wil jij jezelf discreet promoten?
            </h2>
            <p className="max-w-3xl text-[#ECECF0] leading-relaxed mb-6">
              Ben je dame, heer of stel en wil je zichtbaar worden binnen onze selectie? Stuur je foto's, bio, stijl en intentie via contact. We kijken alleen naar profielen die passen bij de sfeer, discretie en chemie van In De Roos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <button className="btn-primary">Vraag promo aan</button>
              </Link>
              <Link to="/gallery">
                <button className="btn-secondary">Bekijk gallerij</button>
              </Link>
            </div>
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
              In De Roos respecteert de privacy en grenzen van alle deelnemers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white text-xl mb-6">
            Klaar om de chemie live te voelen?
          </p>
          <Link to="/evenementen">
            <button className="btn-primary flex items-center gap-2 mx-auto">
              <Heart size={18} className="fill-white" />
              Bekijk evenementen
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DamesHeren;
