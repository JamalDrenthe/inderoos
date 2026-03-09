import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Users, Heart, AlertTriangle, Check, Lock, Sparkles, MessageCircle, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Safety = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.safety-card',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' }
          );
        },
        once: true
      });
    });

    return () => ctx.revert();
  }, []);

  const codeOfConduct = [
    {
      icon: Shield,
      title: 'Consent is verplicht',
      description: 'Alles gebeurt met wederzijdse toestemming. "Nee" betekent nee, "stop" betekent stop. Respecteer altijd de grenzen van anderen.',
    },
    {
      icon: Heart,
      title: 'Safe words',
      description: 'Bij binnenkomst bespreken we safe words met alle deelnemers. Iedereen weet wat te doen bij een stop-signaal.',
    },
    {
      icon: Users,
      title: 'Vaste hosts aanwezig',
      description: 'Onze ervaren hosts houden de sfeer in de gaten en grijpen in bij ongewenst gedrag. Je bent nooit alleen.',
    },
    {
      icon: Lock,
      title: 'Privacy gewaarborgd',
      description: 'Wat er op onze feesten gebeurt, blijft daar. Geen foto\'s of video\'s zonder uitdrukkelijke toestemming van alle betrokkenen.',
    },
    {
      icon: Sparkles,
      title: 'Hygiëne standaard',
      description: 'Schone handdoeken, douches en verzorgingsproducten zijn altijd beschikbaar. Gebruik van condooms is verplicht.',
    },
    {
      icon: AlertTriangle,
      title: 'Meldpunt',
      description: 'Ervaring niet zoals verwacht? Er is altijd een vertrouwenspersoon beschikbaar tijdens het evenement.',
    },
  ];

  const expectations = [
    'Kom op tijd zodat we de huisregels kunnen doornemen',
    'Douche voor het feest begint',
    'Respecteer ieders grenzen en persoonlijke ruimte',
    'Gebruik condooms (beschikbaar op locatie)',
    'Drink verantwoord',
    'Geen drugs toegestaan',
    'Geen mobiele telefoons in de speelruimtes',
    'Respecteer de privacy van andere gasten',
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="px-6 lg:px-12 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="mono text-[#D61C1C] mb-4 block">VEILIGHEID</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Veiligheid voorop</h1>
          <p className="text-[#A7A7AB] text-lg max-w-2xl mx-auto">
            Bij Gang2Bang staat een veilige, respectvolle omgeving centraal. 
            Onze gedragscode zorgt ervoor dat iedereen zich comfortabel voelt.
          </p>
        </div>
      </section>

      {/* Code of Conduct */}
      <section className="px-6 lg:px-12 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Onze gedragscode</h2>
            <p className="text-[#A7A7AB] max-w-2xl mx-auto">
              Deze regels gelden voor alle deelnemers en worden strikt gehandhaafd door onze hosts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={sectionRef}>
            {codeOfConduct.map((rule, index) => (
              <div key={index} className="safety-card card-dark p-8">
                <div className="w-12 h-12 bg-[#D61C1C]/20 rounded-xl flex items-center justify-center mb-6">
                  <rule.icon size={24} className="text-[#D61C1C]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{rule.title}</h3>
                <p className="text-[#A7A7AB] leading-relaxed">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* First time section */}
      <section className="px-6 lg:px-12 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="mono text-[#D61C1C] mb-4 block">WAT TE VERWACHTEN</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Je eerste keer?</h2>
              <p className="text-[#A7A7AB] text-lg leading-relaxed mb-8">
                We begrijpen dat je misschien nerveus bent voor je eerste gangbang-feest. 
                Dat is helemaal normaal! Onze hosts staan klaar om je op je gemak te stellen 
                en al je vragen te beantwoorden.
              </p>
              <ul className="space-y-4">
                {expectations.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/90">
                    <Check size={20} className="text-[#D61C1C] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src="/images/safety_hosts.jpg" 
                  alt="Onze hosts"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hosts section */}
      <section className="px-6 lg:px-12 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#141416] rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <span className="mono text-[#D61C1C] mb-4 block">ONS TEAM</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Vaste hosts</h2>
              <p className="text-[#A7A7AB] max-w-2xl mx-auto">
                Onze vaste hosts zijn ervaren in het begeleiden van gangbang-feesten. 
                Zij zorgen voor een veilige, gebalanceerde sfeer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-[#D61C1C]/20 flex items-center justify-center">
                  <Users size={40} className="text-[#D61C1C]" />
                </div>
                <h4 className="text-white font-semibold mb-2">Ervaren begeleiders</h4>
                <p className="text-[#A7A7AB] text-sm">
                  Onze hosts hebben jarenlange ervaring in de lifestyle.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-[#D61C1C]/20 flex items-center justify-center">
                  <Shield size={40} className="text-[#D61C1C]" />
                </div>
                <h4 className="text-white font-semibold mb-2">Veiligheid eerst</h4>
                <p className="text-[#A7A7AB] text-sm">
                  Altijd alert op de sfeer en het welzijn van gasten.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-[#D61C1C]/20 flex items-center justify-center">
                  <Heart size={40} className="text-[#D61C1C]" />
                </div>
                <h4 className="text-white font-semibold mb-2">Discreet & respectvol</h4>
                <p className="text-[#A7A7AB] text-sm">
                  Jouw privacy en comfort staan voorop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report section */}
      <section className="px-6 lg:px-12 mb-24">
        <div className="max-w-4xl mx-auto">
          <div className="card-dark p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#D61C1C]/20 rounded-xl flex items-center justify-center">
                <MessageCircle size={24} className="text-[#D61C1C]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Meldpunt</h3>
                <p className="text-[#A7A7AB]">We nemen elke melding serieus</p>
              </div>
            </div>
            
            <p className="text-[#A7A7AB] mb-6">
              Heb je een ongewenste ervaring gehad tijdens een van onze evenementen? 
              Of heb je zorgen over het gedrag van een andere deelnemer? 
              Neem contact met ons op. We behandelen alle meldingen vertrouwelijk.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="mailto:info@gang2bang.nl?subject=Melding%20Gang2Bang"
                className="flex items-center gap-3 p-4 bg-[#141416] rounded-xl hover:bg-[#1a1a1c] transition-colors"
              >
                <Mail size={20} className="text-[#D61C1C]" />
                <div>
                  <p className="text-white font-medium">E-mail</p>
                  <p className="text-[#A7A7AB] text-sm">info@gang2bang.nl</p>
                </div>
              </a>
              <div className="flex items-center gap-3 p-4 bg-[#141416] rounded-xl">
                <Phone size={20} className="text-[#D61C1C]" />
                <div>
                  <p className="text-white font-medium">Tijdens evenement</p>
                  <p className="text-[#A7A7AB] text-sm">Sprek een host aan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="card-dark p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle size={24} className="text-[#D61C1C]" />
              <h3 className="text-xl font-bold text-white">Wettelijke informatie</h3>
            </div>
            <div className="space-y-4 text-[#A7A7AB]">
              <p>
                Alle evenementen van Gang2Bang vinden plaats in overeenstemming met de Nederlandse wetgeving. 
                Deelname is uitsluitend mogelijk voor personen van 18 jaar en ouder.
              </p>
              <p>
                Leeftijdsverificatie vindt plaats bij binnenkomst. Zorg dat je een geldig legitimatiebewijs 
                bij je hebt (paspoort, rijbewijs of ID-kaart).
              </p>
              <p>
                Het gebruik van drugs is op onze evenementen niet toegestaan. Personen onder invloed 
                van drugs worden geweigerd.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Safety;
