import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight, Shield, Users, Sparkles } from 'lucide-react';
import { themes, getUpcomingEvents, testimonials, benefits } from '../data/events';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const lineupRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const themesRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const safetyRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const upcomingEvents = getUpcomingEvents().slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo('.hero-card',
        { opacity: 0, scale: 0.92 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.1, 
          ease: 'power2.out',
          stagger: 0.08,
          delay: 0.2
        }
      );

      gsap.fromTo('.hero-title',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 }
      );

      gsap.fromTo('.hero-cta',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.9 }
      );

      // Lineup section
      ScrollTrigger.create({
        trigger: lineupRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.lineup-card',
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
          );
        },
        once: true
      });

      // Featured section
      ScrollTrigger.create({
        trigger: featuredRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.featured-image',
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' }
          );
          gsap.fromTo('.featured-content',
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.9, delay: 0.2, ease: 'power2.out' }
          );
        },
        once: true
      });

      // Themes section
      ScrollTrigger.create({
        trigger: themesRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.theme-card',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' }
          );
        },
        once: true
      });

      // Benefits section
      ScrollTrigger.create({
        trigger: benefitsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.benefit-card',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' }
          );
        },
        once: true
      });

      // Safety section
      ScrollTrigger.create({
        trigger: safetyRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.safety-content',
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
          );
          gsap.fromTo('.safety-image',
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' }
          );
        },
        once: true
      });

      // Testimonials section
      ScrollTrigger.create({
        trigger: testimonialsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.testimonial-card',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' }
          );
        },
        once: true
      });

      // CTA section
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.cta-content',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
          );
        },
        once: true
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Section 1: Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background collage */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-4 p-4 md:p-8 opacity-40">
          <div className="hero-card relative overflow-hidden rounded-xl">
            <img src="/images/hero_couple_1.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="hero-card relative overflow-hidden rounded-xl">
            <img src="/images/hero_couple_2.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="hero-card relative overflow-hidden rounded-xl">
            <img src="/images/hero_group_1.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="hero-card relative overflow-hidden rounded-xl">
            <img src="/images/hero_couple_3.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="hero-card relative overflow-hidden rounded-xl">
            <img src="/images/hero_couple_4.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="hero-card relative overflow-hidden rounded-xl">
            <img src="/images/hero_detail_1.jpg" alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Hero content overlay */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-white" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
            GANG<span className="text-[#D61C1C]">2</span>BANG
          </h1>
          <p className="hero-title text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
            Exclusieve feesten in Amsterdam — elke weekend een nieuw thema.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/evenementen">
              <button className="btn-primary flex items-center justify-center gap-2">
                Bekijk evenementen
                <ArrowRight size={18} />
              </button>
            </Link>
            <Link to="/veiligheid">
              <button className="btn-secondary">Veiligheid & info</button>
            </Link>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/60 via-transparent to-[#0B0B0C] pointer-events-none" />
      </section>

      {/* Section 2: Weekend Lineup */}
      <section ref={lineupRef} className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="mono text-[#D61C1C] mb-4 block">DIT WEEKEND</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Aankomende evenementen</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="lineup-card card-dark group cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="price-tag">vanaf €{event.price.vrouw}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[#A7A7AB] text-sm mb-2">
                    <span className="capitalize">{event.day}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-[#A7A7AB] text-sm mb-4">{event.date}</p>
                  <Link to={`/boeking/${event.id}`}>
                    <button className="text-[#D61C1C] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Reserveer nu
                      <ChevronRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/evenementen">
              <button className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-2 mx-auto transition-colors">
                Bekijk alle data
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Featured Event */}
      <section ref={featuredRef} className="py-24 px-6 lg:px-12 bg-[#141416]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="featured-image relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src="/images/event_cuck.jpg" 
                  alt="Cuck & Hotwife"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="featured-content">
              <span className="mono text-[#D61C1C] mb-4 block">FEATURED</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Cuck & Hotwife</h2>
              <p className="text-[#A7A7AB] text-lg leading-relaxed mb-6">
                Een avond waarin de hotwife centraal staat en de cuck toekijkt — of meedoet. 
                Verwacht spanning, rollenspel en een intieme sfeer waarin alles in overleg gebeurt.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/90">
                  <Users size={18} className="text-[#D61C1C]" />
                  Intieme setting met vaste hosts
                </li>
                <li className="flex items-center gap-3 text-white/90">
                  <Shield size={18} className="text-[#D61C1C]" />
                  Safe words & check-ins
                </li>
                <li className="flex items-center gap-3 text-white/90">
                  <Sparkles size={18} className="text-[#D61C1C]" />
                  Inclusief drankjes, hapjes, handdoeken
                </li>
              </ul>
              <Link to="/evenementen">
                <button className="btn-primary">Reserveer vrijdag</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Theme Gallery */}
      <section ref={themesRef} className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="mono text-[#D61C1C] mb-4 block">ONTDEK</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Onze thema&apos;s</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {themes.map((theme, index) => (
              <div key={theme.id} className={`theme-card card-dark group cursor-pointer ${index === 1 ? 'md:-mt-4' : ''}`}>
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={theme.image} 
                    alt={theme.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{theme.name}</h3>
                    <p className="text-[#A7A7AB] text-sm line-clamp-2">{theme.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/evenementen">
              <button className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-2 mx-auto transition-colors">
                Bekijk schema
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Benefits */}
      <section ref={benefitsRef} className="py-24 px-6 lg:px-12 bg-[#141416]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="mono text-[#D61C1C] mb-4 block">INCLUSIEF</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Wat is inclusief</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="benefit-card card-dark group">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="red-line" />
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-[#A7A7AB] text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Safety */}
      <section ref={safetyRef} className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="safety-content">
              <span className="mono text-[#D61C1C] mb-4 block">VEILIGHEID</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Veiligheid voorop</h2>
              <p className="text-[#A7A7AB] text-lg leading-relaxed mb-6">
                We werken met vaste hosts en een duidelijke gedragscode. Respect en consent 
                zijn niet optioneel — ze zijn de basis van elk evenement.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-white/90">
                  <Shield size={20} className="text-[#D61C1C] mt-1 flex-shrink-0" />
                  <span>Safe words worden besproken bij binnenkomst</span>
                </li>
                <li className="flex items-start gap-3 text-white/90">
                  <Users size={20} className="text-[#D61C1C] mt-1 flex-shrink-0" />
                  <span>Hosts houden de sfeer in de gaten</span>
                </li>
                <li className="flex items-start gap-3 text-white/90">
                  <Sparkles size={20} className="text-[#D61C1C] mt-1 flex-shrink-0" />
                  <span>Hygiëne en privacy zijn verplicht</span>
                </li>
              </ul>
              <Link to="/veiligheid">
                <button className="btn-secondary">Lees de gedragscode</button>
              </Link>
            </div>
            <div className="safety-image relative">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <img 
                  src="/images/safety_hosts.jpg" 
                  alt="Veiligheid en hosts"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section ref={testimonialsRef} className="py-24 px-6 lg:px-12 bg-[#141416]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="mono text-[#D61C1C] mb-4 block">BELEVINGEN</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Wat bezoekers zeggen</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card card-dark p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  </div>
                </div>
                <p className="text-[#A7A7AB] italic leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <section ref={ctaRef} className="py-32 px-6 lg:px-12 relative overflow-hidden">
        {/* Red background wash */}
        <div className="absolute inset-0 bg-[#D61C1C]/85" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center cta-content">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">RESERVEER JE PLEK</h2>
          <p className="text-xl text-white/90 mb-10">
            Kies je dag. Kies je thema. Wij regelen de rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/evenementen">
              <button className="bg-white text-[#D61C1C] px-8 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-white/90 transition-colors">
                Bekijk evenementen
              </button>
            </Link>
            <Link to="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors">
                Stuur een vraag
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
