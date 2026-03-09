import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, Users, ChevronRight, Info } from 'lucide-react';
import { getUpcomingEvents } from '../data/events';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<'all' | 'vrijdag' | 'zaterdag' | 'zondag'>('all');
  
  const allEvents = getUpcomingEvents();
  const filteredEvents = selectedDay === 'all' 
    ? allEvents 
    : allEvents.filter(e => e.day === selectedDay);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.event-card',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' }
          );
        },
        once: true
      });
    });

    return () => ctx.revert();
  }, [filteredEvents]);

  const dayLabels = {
    all: 'Alle dagen',
    vrijdag: 'Vrijdag',
    zaterdag: 'Zaterdag',
    zondag: 'Zondag'
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="px-6 lg:px-12 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="mono text-[#D61C1C] mb-4 block">EVENEMENTEN</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Aankomende feesten</h1>
            <p className="text-[#A7A7AB] text-lg max-w-2xl mx-auto">
              Elke weekend organiseren we exclusieve gangbang-feesten met verschillende thema&apos;s. 
              Kies je dag en reserveer je plek.
            </p>
          </div>

          {/* Price info */}
          <div className="bg-[#141416] rounded-2xl p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Info size={20} className="text-[#D61C1C]" />
              <h3 className="text-white font-semibold">Ticketprijzen</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-between md:justify-start gap-4">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-[#A7A7AB]" />
                  <span className="text-white">Mannen</span>
                </div>
                <span className="text-[#D61C1C] font-bold text-xl">€150</span>
              </div>
              <div className="flex items-center justify-between md:justify-start gap-4">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-[#A7A7AB]" />
                  <span className="text-white">Stellen</span>
                </div>
                <span className="text-[#D61C1C] font-bold text-xl">€75</span>
              </div>
              <div className="flex items-center justify-between md:justify-start gap-4">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-[#A7A7AB]" />
                  <span className="text-white">Vrouwen</span>
                </div>
                <span className="text-[#D61C1C] font-bold text-xl">€50</span>
              </div>
            </div>
            <p className="text-[#A7A7AB] text-sm mt-6 pt-6 border-t border-white/5">
              Prijs is inclusief: drankjes, hapjes, handdoeken en massages
            </p>
          </div>

          {/* Day filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {(Object.keys(dayLabels) as Array<keyof typeof dayLabels>).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                  selectedDay === day
                    ? 'bg-[#D61C1C] text-white'
                    : 'bg-[#141416] text-[#A7A7AB] hover:text-white'
                }`}
              >
                {dayLabels[day]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events grid */}
      <section ref={sectionRef} className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="event-card card-dark group">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0B0B0C]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                      {event.day}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-[#A7A7AB] text-sm">
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#A7A7AB] text-sm">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  <p className="text-[#A7A7AB] text-sm mb-6 line-clamp-2">{event.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="text-sm">
                      <span className="text-[#A7A7AB]">vanaf </span>
                      <span className="text-[#D61C1C] font-bold">€{Math.min(event.price.man, event.price.stel, event.price.vrouw)}</span>
                    </div>
                    <Link to={`/boeking/${event.id}`}>
                      <button className="text-[#D61C1C] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Reserveer
                        <ChevronRight size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#A7A7AB]">Geen evenementen gevonden voor deze selectie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info section */}
      <section className="px-6 lg:px-12 mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#141416] rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Wat kun je verwachten</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-[#A7A7AB]">
                    <span className="text-[#D61C1C] mt-1">•</span>
                    <span>Een veilige en respectvolle omgeving</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#A7A7AB]">
                    <span className="text-[#D61C1C] mt-1">•</span>
                    <span>Vaste hosts die de sfeer bewaken</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#A7A7AB]">
                    <span className="text-[#D61C1C] mt-1">•</span>
                    <span>Duidelijke afspraken over consent</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#A7A7AB]">
                    <span className="text-[#D61C1C] mt-1">•</span>
                    <span>Schone faciliteiten met alle voorzieningen</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Belangrijk om te weten</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-[#A7A7AB]">
                    <span className="text-[#D61C1C] mt-1">•</span>
                    <span>Alleen online reserveringen, geen deurverkoop</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#A7A7AB]">
                    <span className="text-[#D61C1C] mt-1">•</span>
                    <span>Leeftijdsverificatie bij binnenkomst (18+)</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#A7A7AB]">
                    <span className="text-[#D61C1C] mt-1">•</span>
                    <span>Betaling via Tikkie na reservering</span>
                  </li>
                  <li className="flex items-start gap-3 text-[#A7A7AB]">
                    <span className="text-[#D61C1C] mt-1">•</span>
                    <span>Annuleren kan tot 24 uur van tevoren</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
