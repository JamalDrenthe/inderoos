import { CalendarDays, Clock3, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

export interface OverlayEvent {
  id: string;
  image: string;
  weekNumber: number;
  titleText: string;
  startLabelText?: string;
  scheduleText: string;
  atmosphereText: string;
  seasonLabelText: string;
}

interface EventOverlayProps {
  event: OverlayEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventOverlay = ({ event, open, onOpenChange }: EventOverlayProps) => {
  const { language } = useLanguage();

  const content = {
    nl: {
      badge: 'EVENT OVERLAY',
      introTitle: 'Wat je kunt verwachten',
      introText:
        'Elke nacht blijft discreet, gecureerd en strak gehost. Je ontvangt de locatie pas op de dag zelf na screening en bevestiging.',
      flowTitle: 'Flow van de nacht',
      flow: [
        'Screening op energie, balans en discretie.',
        'Locatie-drop op eventdag na bevestiging.',
        'Hosts, heldere regels en een zachte maar strakke entrance.',
      ],
      details: 'Details',
      season: 'Seizoen',
      schedule: 'Venster',
      access: 'Toegang aanvragen',
      pricing: 'Bekijk prijzen',
      safety: 'Veiligheid & huisregels',
      atmosphere: 'Sfeer',
      closeText: 'Sluit event overlay',
    },
    en: {
      badge: 'EVENT OVERLAY',
      introTitle: 'What to expect',
      introText:
        'Each night stays discreet, curated, and tightly hosted. You only receive the location on the day itself after screening and confirmation.',
      flowTitle: 'Night flow',
      flow: [
        'Screening on energy, balance, and discretion.',
        'Location drop on event day after confirmation.',
        'Hosts, clear rules, and a soft but tight entrance.',
      ],
      details: 'Details',
      season: 'Season',
      schedule: 'Window',
      access: 'Request access',
      pricing: 'View pricing',
      safety: 'Safety & house rules',
      atmosphere: 'Atmosphere',
      closeText: 'Close event overlay',
    },
    de: {
      badge: 'EVENT OVERLAY',
      introTitle: 'Was dich erwartet',
      introText:
        'Jede Nacht bleibt diskret, kuratiert und klar gehostet. Die Location erhältst du erst am Eventtag nach Screening und Bestätigung.',
      flowTitle: 'Ablauf der Nacht',
      flow: [
        'Screening nach Energie, Balance und Diskretion.',
        'Location-Drop am Eventtag nach Bestätigung.',
        'Hosts, klare Regeln und ein softer, aber straffer Entrance.',
      ],
      details: 'Details',
      season: 'Saison',
      schedule: 'Zeitfenster',
      access: 'Zugang anfragen',
      pricing: 'Preise ansehen',
      safety: 'Sicherheit & Regeln',
      atmosphere: 'Atmosphäre',
      closeText: 'Event-Overlay schließen',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={event ? `event-overlay-description-${event.id}` : undefined}
        className="border border-white/10 bg-[#09090B] p-0 text-white shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:max-w-5xl"
      >
        {event ? (
          <div className="grid max-h-[85vh] overflow-hidden md:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[320px] overflow-hidden bg-[#111113]">
              <img src={event.image} alt={event.titleText} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.02),rgba(11,11,12,0.86))]" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="mono mb-3 text-[#D61C1C]">{copy.badge}</p>
                <h2 className="mb-2 text-3xl font-black md:text-5xl">{event.titleText}</h2>
                <p className="text-sm text-white/70">{event.startLabelText || event.seasonLabelText}</p>
              </div>
            </div>

            <div className="overflow-y-auto p-6 md:p-8">
              <DialogHeader className="mb-6 text-left">
                <DialogTitle className="text-2xl font-bold text-white">{copy.introTitle}</DialogTitle>
                <DialogDescription id={`event-overlay-description-${event.id}`} className="text-base leading-relaxed text-[#BEBEC6]">
                  {copy.introText}
                </DialogDescription>
              </DialogHeader>

              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#D61C1C]">
                    <CalendarDays size={16} />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">{copy.details}</span>
                  </div>
                  <p className="text-sm text-white/80">Week {event.weekNumber}</p>
                  <p className="mt-1 text-sm text-[#BEBEC6]">{copy.season}: {event.seasonLabelText}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#D61C1C]">
                    <Clock3 size={16} />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">{copy.schedule}</span>
                  </div>
                  <p className="text-sm text-[#E6E6EA]">{event.scheduleText}</p>
                </div>
              </div>

              <div className="mb-6 rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(214,28,28,0.12),rgba(255,255,255,0.02))] p-5">
                <div className="mb-3 flex items-center gap-2 text-[#D61C1C]">
                  <Sparkles size={16} />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]">{copy.atmosphere}</span>
                </div>
                <p className="leading-relaxed text-[#E3E3E8]">{event.atmosphereText}</p>
              </div>

              <div className="mb-8">
                <div className="mb-4 flex items-center gap-2 text-[#D61C1C]">
                  <ShieldCheck size={16} />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]">{copy.flowTitle}</span>
                </div>
                <div className="space-y-3">
                  {copy.flow.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                      <MapPin size={16} className="mt-1 flex-shrink-0 text-[#D61C1C]" />
                      <p className="text-sm leading-relaxed text-[#D6D6DA]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link to={`/boeking/${event.id}`} onClick={() => onOpenChange(false)}>
                  <button className="btn-primary w-full">{copy.access}</button>
                </Link>
                <Link to="/prijzen" onClick={() => onOpenChange(false)}>
                  <button className="btn-secondary w-full">{copy.pricing}</button>
                </Link>
              </div>
              <Link to="/veiligheid" onClick={() => onOpenChange(false)} className="mt-3 block text-sm font-medium text-[#A7A7AB] transition-colors hover:text-white">
                {copy.safety}
              </Link>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default EventOverlay;
