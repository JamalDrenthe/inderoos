import { BriefcaseBusiness, Clock3, Euro, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

export interface VacancyOverlayData {
  id: string;
  badge: string;
  title: string;
  categoryLabel: string;
  summaryTitle: string;
  summaryText: string;
  salaryLabel: string;
  salaryValue: string;
  hoursLabel: string;
  hoursValue: string;
  employmentLabel: string;
  employmentValue: string;
  responsibilitiesTitle: string;
  responsibilities: readonly string[];
  expectationsTitle: string;
  expectations: readonly string[];
  offerTitle: string;
  offer: readonly string[];
  applyTitle: string;
  processNote: string;
  ctaLabel: string;
  secondaryLabel: string;
  secondaryPath: string;
  mailHref: string;
}

interface VacancyOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vacancy: VacancyOverlayData | null;
}

const VacancyOverlay = ({ open, onOpenChange, vacancy }: VacancyOverlayProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={vacancy ? `vacancy-overlay-description-${vacancy.id}` : undefined}
        className="border border-white/10 bg-[#09090B] p-0 text-white shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:max-w-6xl"
      >
        {vacancy ? (
          <div className="grid max-h-[85vh] overflow-hidden md:grid-cols-[0.92fr_1.08fr]">
            <div className="bg-[linear-gradient(180deg,rgba(214,28,28,0.18),rgba(15,15,17,0.96))] p-6 md:p-8">
              <p className="mono mb-3 text-[#F2B5B5]">{vacancy.badge}</p>
              <h2 className="mb-3 text-3xl font-black md:text-5xl">{vacancy.title}</h2>
              <p className="mb-8 text-sm uppercase tracking-[0.24em] text-white/60">{vacancy.categoryLabel}</p>

              <DialogHeader className="mb-6 text-left">
                <DialogTitle className="text-2xl font-bold text-white">{vacancy.summaryTitle}</DialogTitle>
                <DialogDescription id={`vacancy-overlay-description-${vacancy.id}`} className="text-base leading-relaxed text-[#E5D6D6]">
                  {vacancy.summaryText}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#FFD4D4]">
                    <Euro size={16} />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">{vacancy.salaryLabel}</span>
                  </div>
                  <p className="text-base font-semibold text-white">{vacancy.salaryValue}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#FFD4D4]">
                    <Clock3 size={16} />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">{vacancy.hoursLabel}</span>
                  </div>
                  <p className="text-base font-semibold text-white">{vacancy.hoursValue}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:col-span-2">
                  <div className="mb-2 flex items-center gap-2 text-[#FFD4D4]">
                    <BriefcaseBusiness size={16} />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">{vacancy.employmentLabel}</span>
                  </div>
                  <p className="text-base font-semibold text-white">{vacancy.employmentValue}</p>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto p-6 md:p-8">
              <div className="mb-6 rounded-3xl border border-white/8 bg-white/[0.03] p-5">
                <div className="mb-3 flex items-center gap-2 text-[#D61C1C]">
                  <Sparkles size={16} />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]">{vacancy.responsibilitiesTitle}</span>
                </div>
                <div className="space-y-3">
                  {vacancy.responsibilities.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/8 bg-[#0D0D0F] p-4">
                      <p className="text-sm leading-relaxed text-[#D6D6DA]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6 rounded-3xl border border-white/8 bg-white/[0.03] p-5">
                <div className="mb-3 flex items-center gap-2 text-[#D61C1C]">
                  <ShieldCheck size={16} />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]">{vacancy.expectationsTitle}</span>
                </div>
                <div className="space-y-3">
                  {vacancy.expectations.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/8 bg-[#0D0D0F] p-4">
                      <p className="text-sm leading-relaxed text-[#D6D6DA]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8 rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(214,28,28,0.12),rgba(255,255,255,0.02))] p-5">
                <div className="mb-3 flex items-center gap-2 text-[#D61C1C]">
                  <BriefcaseBusiness size={16} />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]">{vacancy.offerTitle}</span>
                </div>
                <div className="space-y-3">
                  {vacancy.offer.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <p className="text-sm leading-relaxed text-[#E5E5EA]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-5">
                <h3 className="mb-3 text-xl font-bold text-white">{vacancy.applyTitle}</h3>
                <p className="mb-5 leading-relaxed text-[#C6C6CD]">{vacancy.processNote}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <a href={vacancy.mailHref} className="btn-primary inline-flex items-center justify-center gap-2">
                    <Mail size={16} />
                    {vacancy.ctaLabel}
                  </a>
                  <Link to={vacancy.secondaryPath} onClick={() => onOpenChange(false)}>
                    <button className="btn-secondary w-full">{vacancy.secondaryLabel}</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default VacancyOverlay;
