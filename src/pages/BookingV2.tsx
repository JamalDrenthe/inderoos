import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Check, CreditCard, Lock, Users } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { getLocalizedText, membershipPlans, ticketOptions } from '../lib/siteData';
import { submitGoogleForm } from '../lib/googleForm';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Reservation } from '../types';

type BookingMode = 'ticket' | 'membership';
type TicketSelection = (typeof ticketOptions)[number]['id'];
type MembershipSelection = (typeof membershipPlans)[number]['id'];

const BookingV2 = () => {
  const { eventId } = useParams<{ eventId?: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [, setReservations] = useLocalStorage<Reservation[]>('reservations', []);

  const [formData, setFormData] = useState({
    bookingMode: 'ticket' as BookingMode,
    selectedEventId: eventId ?? '',
    ticketType: 'vrouw' as TicketSelection,
    quantity: 1,
    membershipId: membershipPlans[0].id as MembershipSelection,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    ageConfirmed: false,
    rulesAccepted: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (eventId) {
      setFormData((prev) => ({ ...prev, bookingMode: 'ticket', selectedEventId: eventId }));
    }
  }, [eventId]);

  const content = {
    nl: {
      back: 'Terug naar kalender',
      badge: 'PRIVATE RSVP',
      title: 'Vraag toegang aan voor losse tickets of memberships.',
      intro:
        'We houden de flow bewust strak: eerst screening, daarna Tikkie en pas daarna definitieve bevestiging. Kies hieronder of je een los ticket wilt aanvragen of recurring access zoekt via membership.',
      modeTitle: '1. Kies je flow',
      ticketMode: 'Los ticket',
      membershipMode: 'Membership',
      ticketTitle: '2. Kies je ticket',
      membershipTitle: '2. Kies je membership',
      quantity: 'Aantal',
      detailsTitle: '3. Jouw gegevens',
      firstName: 'Voornaam',
      lastName: 'Achternaam',
      email: 'E-mailadres',
      phone: 'Telefoonnummer',
      notes: 'Notities',
      notesPlaceholder: 'Vertel iets over je vibe, wensen of plus-one.',
      rulesTitle: '4. Bevestig de huisregels',
      ageConfirmed: 'Ik bevestig dat ik 18+ ben en een geldig ID meeneem.',
      rulesAccepted: 'Ik ga akkoord met de strict no-phone policy, de secret location drop op eventdag en de no-refund / rollover policy.',
      houseRules: [
        'Geen telefoons binnen.',
        'Locatie pas op eventdag.',
        'Toegang tussen 21:00 en 05:00.',
        'Geen refunds, alleen rollover.',
      ],
      summaryTitle: 'Samenvatting',
      summaryFallback: 'Maak eerst een keuze om je samenvatting te zien.',
      selectedTicket: 'Ticket',
      selectedMembership: 'Membership',
      total: 'Indicatie',
      processTitle: 'Wat er hierna gebeurt',
      process: [
        'Je aanvraag wordt intern gescreend op vibe, balans en discretie.',
        'Als het klopt ontvang je binnen 24 uur een Tikkie.',
        'Pas na betaling is je plek definitief.',
      ],
      submit: 'Verstuur aanvraag',
      submitting: 'Aanvraag wordt verstuurd...',
      cancel: 'Annuleren',
      rulesError: 'Je moet akkoord gaan met de huisregels.',
      ageError: 'Bevestig dat je 18+ bent.',
      firstNameError: 'Voornaam is verplicht.',
      lastNameError: 'Achternaam is verplicht.',
      emailError: 'Voer een geldig e-mailadres in.',
      phoneError: 'Telefoonnummer is verplicht.',
      pricingPageLabel: 'Tarief op prijzenpagina',
      viewPrices: 'Bekijk prijzen',
      monthHint: 'per maand',
      windowText: 'Na screening ontvang je timing, betaalverzoek en verdere instructies discreet terug.',
    },
    en: {
      back: 'Back to calendar',
      badge: 'PRIVATE RSVP',
      title: 'Request access for single tickets or memberships.',
      intro:
        'The flow stays intentionally tight: first screening, then payment request, and only then final confirmation. Choose below whether you want a single ticket or recurring access through membership.',
      modeTitle: '1. Choose your flow',
      ticketMode: 'Single ticket',
      membershipMode: 'Membership',
      ticketTitle: '2. Choose your ticket',
      membershipTitle: '2. Choose your membership',
      quantity: 'Quantity',
      detailsTitle: '3. Your details',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      phone: 'Phone number',
      notes: 'Notes',
      notesPlaceholder: 'Tell us something about your vibe, wishes, or plus-one.',
      rulesTitle: '4. Confirm the house rules',
      ageConfirmed: 'I confirm I am 18+ and will bring valid ID.',
      rulesAccepted: 'I agree to the strict no-phone policy, the secret location drop on event day, and the no-refund / rollover policy.',
      houseRules: [
        'No phones inside.',
        'Location only on event day.',
        'Access between 21:00 and 05:00.',
        'No refunds, rollover only.',
      ],
      summaryTitle: 'Summary',
      summaryFallback: 'Make a selection first to unlock your summary.',
      selectedTicket: 'Ticket',
      selectedMembership: 'Membership',
      total: 'Estimate',
      processTitle: 'What happens next',
      process: [
        'Your application is screened internally for vibe, balance, and discretion.',
        'If it fits, you receive a payment request within 24 hours.',
        'Your place is only final after payment.',
      ],
      submit: 'Submit application',
      submitting: 'Submitting application...',
      cancel: 'Cancel',
      rulesError: 'You must agree to the house rules.',
      ageError: 'Confirm that you are 18+.',
      firstNameError: 'First name is required.',
      lastNameError: 'Last name is required.',
      emailError: 'Enter a valid email address.',
      phoneError: 'Phone number is required.',
      pricingPageLabel: 'Rate on pricing page',
      viewPrices: 'View pricing',
      monthHint: 'per month',
      windowText: 'After screening, you receive timing, payment request, and next steps discreetly.',
    },
    de: {
      back: 'Zurück zum Kalender',
      badge: 'PRIVATE RSVP',
      title: 'Fordere Zugang für Einzeltickets oder Memberships an.',
      intro:
        'Der Ablauf bleibt bewusst klar: zuerst Screening, dann Zahlungsanfrage und erst danach die finale Bestätigung. Wähle unten, ob du ein Einzelticket anfragen oder recurring access über eine Membership möchtest.',
      modeTitle: '1. Wähle deinen Flow',
      ticketMode: 'Einzelticket',
      membershipMode: 'Membership',
      ticketTitle: '2. Wähle dein Ticket',
      membershipTitle: '2. Wähle deine Membership',
      quantity: 'Anzahl',
      detailsTitle: '3. Deine Daten',
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail-Adresse',
      phone: 'Telefonnummer',
      notes: 'Notizen',
      notesPlaceholder: 'Erzähl uns etwas über deine Vibes, Wünsche oder deinen Plus-One.',
      rulesTitle: '4. Bestätige die Hausregeln',
      ageConfirmed: 'Ich bestätige, dass ich 18+ bin und einen gültigen Ausweis mitbringe.',
      rulesAccepted: 'Ich stimme der strict no-phone policy, dem secret location drop am Eventtag und der no-refund / rollover policy zu.',
      houseRules: [
        'Keine Telefone drinnen.',
        'Location erst am Eventtag.',
        'Zugang zwischen 21:00 und 05:00.',
        'Keine Refunds, nur Rollover.',
      ],
      summaryTitle: 'Zusammenfassung',
      summaryFallback: 'Triff zuerst eine Auswahl, um deine Zusammenfassung zu sehen.',
      selectedTicket: 'Ticket',
      selectedMembership: 'Membership',
      total: 'Schätzung',
      processTitle: 'Was danach passiert',
      process: [
        'Deine Anfrage wird intern auf Vibe, Balance und Diskretion geprüft.',
        'Wenn es passt, erhältst du innerhalb von 24 Stunden eine Zahlungsanfrage.',
        'Erst nach Zahlung ist dein Platz final.',
      ],
      submit: 'Anfrage senden',
      submitting: 'Anfrage wird gesendet...',
      cancel: 'Abbrechen',
      rulesError: 'Du musst den Hausregeln zustimmen.',
      ageError: 'Bestätige, dass du 18+ bist.',
      firstNameError: 'Vorname ist erforderlich.',
      lastNameError: 'Nachname ist erforderlich.',
      emailError: 'Gib eine gültige E-Mail-Adresse ein.',
      phoneError: 'Telefonnummer ist erforderlich.',
      pricingPageLabel: 'Tarif auf Preiseseite',
      viewPrices: 'Preise ansehen',
      monthHint: 'pro Monat',
      windowText: 'Nach dem Screening erhältst du Timing, Zahlungsanfrage und nächste Schritte diskret zurück.',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;
  const selectedTicket = ticketOptions.find((ticket) => ticket.id === formData.ticketType) ?? ticketOptions[0];
  const selectedMembership = membershipPlans.find((plan) => plan.id === formData.membershipId) ?? membershipPlans[0];
  const maxQuantity = formData.ticketType === 'stel' ? 2 : 5;

  const selectionLabel = useMemo(() => {
    if (formData.bookingMode === 'membership') {
      return getLocalizedText(selectedMembership.name, language);
    }

    const ticketLabel = getLocalizedText(selectedTicket.label, language);
    return `${ticketLabel} × ${formData.quantity}`;
  }, [formData.bookingMode, formData.quantity, language, selectedMembership.name, selectedTicket.label]);

  const totalPrice = useMemo(() => {
    if (formData.bookingMode === 'membership') {
      return selectedMembership.price;
    }

    return selectedTicket.price * formData.quantity;
  }, [formData.bookingMode, formData.quantity, selectedMembership.price, selectedTicket.price]);

  const setField = <K extends keyof typeof formData>(name: K, value: (typeof formData)[K]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as string]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      nextErrors.firstName = copy.firstNameError;
    }
    if (!formData.lastName.trim()) {
      nextErrors.lastName = copy.lastNameError;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = copy.emailError;
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = copy.phoneError;
    }
    if (!formData.ageConfirmed) {
      nextErrors.ageConfirmed = copy.ageError;
    }
    if (!formData.rulesAccepted) {
      nextErrors.rulesAccepted = copy.rulesError;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const reservationId = `RSVP-${Date.now()}`;
    const reservation: Reservation = {
      id: reservationId,
      eventId: formData.bookingMode === 'ticket' ? formData.selectedEventId || eventId || 'ticket-request' : `membership-${formData.membershipId}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      ticketType: formData.bookingMode === 'ticket' ? formData.ticketType : 'membership',
      quantity: formData.bookingMode === 'ticket' ? formData.quantity : 1,
      totalPrice,
      status: 'new',
      bookingMode: formData.bookingMode,
      selectionLabel,
      language,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setReservations((prev) => [reservation, ...prev]);

    try {
      await submitGoogleForm({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        selection: `${selectionLabel} · € ${totalPrice}`,
        rulesAccepted: formData.ageConfirmed && formData.rulesAccepted,
      });
    } catch (error) {
      console.error('Google Form submission failed', error);
    } finally {
      setIsSubmitting(false);
    }

    navigate('/bedankt', {
      state: {
        email: formData.email,
        price: totalPrice,
        selectionLabel,
      },
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <section className="max-w-4xl mb-12">
          <Link to="/evenementen" className="inline-flex items-center gap-2 text-[#A7A7AB] hover:text-white transition-colors mb-6">
            <ArrowLeft size={17} />
            <span>{copy.back}</span>
          </Link>
          <span className="mono text-[#D61C1C] mb-4 block">{copy.badge}</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 max-w-4xl">{copy.title}</h1>
          <p className="text-[#A7A7AB] text-lg leading-relaxed max-w-3xl">{copy.intro}</p>
        </section>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="space-y-8">
            <section className="card-dark p-8 md:p-10">
              <h2 className="text-2xl font-bold text-white mb-6">{copy.modeTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setField('bookingMode', 'ticket')}
                  className={`rounded-2xl border p-5 text-left transition-colors ${
                    formData.bookingMode === 'ticket' ? 'border-[#D61C1C] bg-[#D61C1C]/10' : 'border-white/10 bg-white/[0.02]'
                  }`}
                >
                  <p className="text-white font-semibold mb-1">{copy.ticketMode}</p>
                  <p className="text-[#A7A7AB] text-sm">{copy.pricingPageLabel}</p>
                </button>
                <button
                  type="button"
                  onClick={() => setField('bookingMode', 'membership')}
                  className={`rounded-2xl border p-5 text-left transition-colors ${
                    formData.bookingMode === 'membership' ? 'border-[#D61C1C] bg-[#D61C1C]/10' : 'border-white/10 bg-white/[0.02]'
                  }`}
                >
                  <p className="text-white font-semibold mb-1">{copy.membershipMode}</p>
                  <p className="text-[#A7A7AB] text-sm">{copy.pricingPageLabel}</p>
                </button>
              </div>
              <Link to="/prijzen" className="inline-flex items-center gap-2 text-sm font-medium text-[#D61C1C] mb-8">
                {copy.viewPrices}
                <ArrowLeft size={14} className="rotate-180" />
              </Link>

              {formData.bookingMode === 'ticket' ? (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">{copy.ticketTitle}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {ticketOptions.map((ticket) => (
                        <button
                          key={ticket.id}
                          type="button"
                          onClick={() => {
                            setField('ticketType', ticket.id);
                            setField('quantity', 1);
                          }}
                          className={`rounded-2xl border p-5 text-left transition-colors ${
                            formData.ticketType === ticket.id ? 'border-[#D61C1C] bg-[#D61C1C]/10' : 'border-white/10 bg-white/[0.02]'
                          }`}
                        >
                          <p className="text-white font-semibold mb-2">{getLocalizedText(ticket.label, language)}</p>
                          <p className="text-[#D61C1C] text-sm font-semibold mb-2 uppercase tracking-[0.2em]">{copy.pricingPageLabel}</p>
                          <p className="text-[#A7A7AB] text-sm leading-relaxed">{getLocalizedText(ticket.description, language)}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-white text-sm font-medium mb-2">{copy.quantity}</label>
                    <select
                      id="quantity"
                      name="quantity"
                      title={copy.quantity}
                      value={formData.quantity}
                      onChange={(event) => setField('quantity', Number(event.target.value))}
                    >
                      {Array.from({ length: maxQuantity }, (_, index) => index + 1).map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">{copy.membershipTitle}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {membershipPlans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setField('membershipId', plan.id)}
                        className={`rounded-2xl border p-5 text-left transition-colors ${
                          formData.membershipId === plan.id ? 'border-[#D61C1C] bg-[#D61C1C]/10' : 'border-white/10 bg-white/[0.02]'
                        }`}
                      >
                        <p className="mono text-[#D61C1C] mb-3">MEMBERSHIP</p>
                        <p className="text-white font-semibold text-xl mb-2">{getLocalizedText(plan.name, language)}</p>
                        <p className="text-[#D61C1C] text-sm font-semibold mb-3 uppercase tracking-[0.2em]">{copy.pricingPageLabel}</p>
                        <p className="text-[#A7A7AB] text-sm leading-relaxed mb-4">{getLocalizedText(plan.description, language)}</p>
                        <div className="space-y-2">
                          {plan.perks.map((perk) => (
                            <div key={perk.nl} className="flex items-start gap-2">
                              <Check size={14} className="text-[#D61C1C] mt-1 flex-shrink-0" />
                              <p className="text-[#D6D6DA] text-sm leading-relaxed">{getLocalizedText(perk, language)}</p>
                            </div>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section className="card-dark p-8 md:p-10">
              <h2 className="text-2xl font-bold text-white mb-6">{copy.detailsTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-white text-sm font-medium mb-2">{copy.firstName}</label>
                  <input id="firstName" value={formData.firstName} onChange={(event) => setField('firstName', event.target.value)} placeholder={copy.firstName} />
                  {errors.firstName ? <p className="text-[#D61C1C] text-sm mt-2">{errors.firstName}</p> : null}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-white text-sm font-medium mb-2">{copy.lastName}</label>
                  <input id="lastName" value={formData.lastName} onChange={(event) => setField('lastName', event.target.value)} placeholder={copy.lastName} />
                  {errors.lastName ? <p className="text-[#D61C1C] text-sm mt-2">{errors.lastName}</p> : null}
                </div>
                <div>
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">{copy.email}</label>
                  <input id="email" type="email" value={formData.email} onChange={(event) => setField('email', event.target.value)} placeholder="member@domain.com" />
                  {errors.email ? <p className="text-[#D61C1C] text-sm mt-2">{errors.email}</p> : null}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">{copy.phone}</label>
                  <input id="phone" type="tel" value={formData.phone} onChange={(event) => setField('phone', event.target.value)} placeholder="06 12345678" />
                  {errors.phone ? <p className="text-[#D61C1C] text-sm mt-2">{errors.phone}</p> : null}
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="notes" className="block text-white text-sm font-medium mb-2">{copy.notes}</label>
                <textarea id="notes" rows={4} value={formData.notes} onChange={(event) => setField('notes', event.target.value)} placeholder={copy.notesPlaceholder} />
              </div>
            </section>

            <section className="card-dark p-8 md:p-10">
              <h2 className="text-2xl font-bold text-white mb-6">{copy.rulesTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {copy.houseRules.map((rule) => (
                  <div key={rule} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 flex items-start gap-3">
                    <Lock size={16} className="text-[#D61C1C] mt-1 flex-shrink-0" />
                    <p className="text-[#D6D6DA] text-sm leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <label className="checkbox-wrapper">
                  <input type="checkbox" checked={formData.ageConfirmed} onChange={(event) => setField('ageConfirmed', event.target.checked)} />
                  <span className="text-[#D6D6DA] text-sm leading-relaxed">{copy.ageConfirmed}</span>
                </label>
                {errors.ageConfirmed ? <p className="text-[#D61C1C] text-sm">{errors.ageConfirmed}</p> : null}

                <label className="checkbox-wrapper">
                  <input type="checkbox" checked={formData.rulesAccepted} onChange={(event) => setField('rulesAccepted', event.target.checked)} />
                  <span className="text-[#D6D6DA] text-sm leading-relaxed">Ik ga akkoord met de voorwaarde</span>
                </label>
                {errors.rulesAccepted ? <p className="text-[#D61C1C] text-sm">{errors.rulesAccepted}</p> : null}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="card-dark p-8 md:p-10 border-gradient">
              <h2 className="text-2xl font-bold text-white mb-6">{copy.summaryTitle}</h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-3">
                  <span className="text-[#A7A7AB]">{formData.bookingMode === 'ticket' ? copy.selectedTicket : copy.selectedMembership}</span>
                  <span className="text-white text-right">{selectionLabel}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[#A7A7AB]">{copy.total}</span>
                  <span className="text-[#D61C1C] font-semibold text-right">€ {totalPrice}</span>
                </div>
              </div>
            </section>

            <section className="card-dark p-8 md:p-10 bg-[linear-gradient(180deg,_rgba(214,28,28,0.12),_rgba(20,20,22,0.85))]">
              <div className="flex items-center gap-3 mb-5">
                <CreditCard size={18} className="text-[#D61C1C]" />
                <h2 className="text-xl font-bold text-white">{copy.processTitle}</h2>
              </div>
              <div className="space-y-4 mb-8">
                {copy.process.map((step, index) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#D61C1C] text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-[#E2E2E6] text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 mb-8">
                <div className="flex items-start gap-3 mb-3">
                  <CalendarDays size={16} className="text-[#D61C1C] mt-0.5 flex-shrink-0" />
                  <p className="text-[#D6D6DA] text-sm leading-relaxed">{copy.windowText}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Users size={16} className="text-[#D61C1C] mt-0.5 flex-shrink-0" />
                  <p className="text-[#D6D6DA] text-sm leading-relaxed">{formData.bookingMode === 'membership' ? `${copy.selectedMembership}: ${copy.monthHint}` : selectionLabel}</p>
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
                {isSubmitting ? copy.submitting : copy.submit}
                <Check size={16} />
              </button>
              <Link to="/evenementen" className="block mt-3">
                <button type="button" className="btn-secondary w-full">{copy.cancel}</button>
              </Link>
            </section>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default BookingV2;
