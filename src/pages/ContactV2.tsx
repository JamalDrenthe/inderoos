import { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

const ContactV2 = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    accountNumber: '',
    subject: '',
    message: '',
    verification: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    nl: {
      badge: 'CONTACT',
      title: 'Discreet contact, heldere lijnen.',
      intro:
        'Gebruik dit formulier voor vragen over tickets, memberships, promo, services of community access. Locatie-info delen we pas na screening en bevestiging.',
      formTitle: 'Stuur een bericht',
      name: 'Naam',
      email: 'E-mail',
      accountNumber: 'Rekeningnummer (IBAN)',
      subject: 'Onderwerp',
      message: 'Bericht',
      verificationLabel: 'Ik bevestig dat ik 18 jaar of ouder ben en de huisregels begrijp.',
      submit: 'Verstuur bericht',
      submitting: 'Bezig met verzenden...',
      success: 'Bericht ontvangen. We reageren zo discreet mogelijk terug.',
      options: {
        default: 'Kies een onderwerp',
        membership: 'Membership',
        booking: 'Aanmelding',
        community: 'Community',
        other: 'Anders',
      },
      channelsTitle: 'Communicatiekanalen',
      channels: [
        'Payment requests lopen handmatig via Tikkie.',
        'E-mail blijft het kanaal voor vragen en follow-up.',
      ],
      emailLabel: 'E-mail',
      secureTitle: 'Waarom zo gesloten?',
      secureText: 'Omdat de juiste crowd begint bij gecontroleerde communicatie, niet bij open broadcasts.',
    },
    en: {
      badge: 'CONTACT',
      title: 'Discreet contact, clear lines.',
      intro:
        'Use this form for questions about tickets, memberships, promo, services, or community access. We only share location details after screening and confirmation.',
      formTitle: 'Send a message',
      name: 'Name',
      email: 'Email',
      accountNumber: 'Account number (IBAN)',
      subject: 'Subject',
      message: 'Message',
      verificationLabel: 'I confirm that I am 18 years or older and understand the house rules.',
      submit: 'Send message',
      submitting: 'Sending...',
      success: 'Message received. We will respond as discreetly as possible.',
      options: {
        default: 'Choose a subject',
        membership: 'Membership',
        booking: 'Application',
        community: 'Community',
        other: 'Other',
      },
      channelsTitle: 'Communication channels',
      channels: [
        'Payment requests currently run manually through Tikkie.',
        'Email remains the channel for questions and follow-up.',
      ],
      emailLabel: 'Email',
      secureTitle: 'Why so closed?',
      secureText: 'Because the right crowd starts with controlled communication, not open broadcasts.',
    },
    de: {
      badge: 'KONTAKT',
      title: 'Diskreter Kontakt, klare Linien.',
      intro:
        'Nutze dieses Formular für Fragen zu Tickets, Memberships, Promo, Services oder Community-Zugang. Location-Details teilen wir erst nach Screening und Bestätigung.',
      formTitle: 'Nachricht senden',
      name: 'Name',
      email: 'E-Mail',
      accountNumber: 'Kontonummer (IBAN)',
      subject: 'Betreff',
      message: 'Nachricht',
      verificationLabel: 'Ich bestätige, dass ich 18 Jahre oder älter bin und die Hausregeln verstehe.',
      submit: 'Nachricht senden',
      submitting: 'Wird gesendet...',
      success: 'Nachricht empfangen. Wir antworten so diskret wie möglich.',
      options: {
        default: 'Betreff wählen',
        membership: 'Membership',
        booking: 'Anmeldung',
        community: 'Community',
        other: 'Sonstiges',
      },
      channelsTitle: 'Kommunikationskanäle',
      channels: [
        'Zahlungsanfragen laufen aktuell manuell über Tikkie.',
        'E-Mail bleibt der Kanal für Fragen und Follow-up.',
      ],
      emailLabel: 'E-Mail',
      secureTitle: 'Warum so geschlossen?',
      secureText: 'Weil die richtige Crowd mit kontrollierter Kommunikation beginnt, nicht mit offenen Broadcasts.',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target as HTMLInputElement;
    if (type === 'checkbox') {
      const checked = (event.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.verification) return;
    setIsSubmitting(true);

    // TODO: Replace with your actual Google Form Action URL
    const googleFormActionUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
    
    // TODO: Replace 'entry.XXXXXX' with your actual Google Form entry IDs
    const formPayload = new FormData();
    formPayload.append('entry.111111', formData.name);
    formPayload.append('entry.222222', formData.email);
    formPayload.append('entry.333333', formData.accountNumber);
    formPayload.append('entry.444444', formData.subject);
    formPayload.append('entry.555555', formData.message);
    formPayload.append('entry.666666', formData.verification ? 'Yes' : 'No');

    try {
      // Using no-cors because Google Forms doesn't return CORS headers for direct form submissions
      await fetch(googleFormActionUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formPayload,
      });
      // no-cors always returns an opaque response, so we assume success if no network error
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        accountNumber: '',
        subject: '',
        message: '',
        verification: false,
      });
    } catch (error) {
      console.error('Error submitting form', error);
      // Fallback behavior if network fails
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <section className="max-w-4xl mb-12">
          <span className="mono text-[#D61C1C] mb-4 block">{copy.badge}</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none">{copy.title}</h1>
          <p className="text-[#C7C7CD] text-xl leading-relaxed">{copy.intro}</p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="card-dark p-8 md:p-12 border-white/10 bg-[#0B0B0C]/80 backdrop-blur-xl">
            <h2 className="text-3xl font-bold text-white mb-8">{copy.formTitle}</h2>

            {showSuccess ? (
              <div className="rounded-2xl border border-green-500/25 bg-green-500/10 p-4 flex items-start gap-3 mb-6">
                <Check size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-green-200 text-sm leading-relaxed">{copy.success}</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-white text-sm font-medium mb-2">{copy.name}</label>
                  <input id="contact-name" name="name" value={formData.name} onChange={handleChange} required placeholder={copy.name} className="bg-[#141416] border-white/5 focus:border-[#D61C1C] rounded-xl px-5 py-4 w-full text-white" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-white text-sm font-medium mb-2">{copy.email}</label>
                  <input id="contact-email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="member@domain.com" className="bg-[#141416] border-white/5 focus:border-[#D61C1C] rounded-xl px-5 py-4 w-full text-white" />
                </div>
              </div>
              <div>
                <label htmlFor="contact-account" className="block text-white text-sm font-medium mb-2">{copy.accountNumber}</label>
                <input id="contact-account" name="accountNumber" type="text" value={formData.accountNumber} onChange={handleChange} required placeholder="NL00 INGB 0000 0000 00" className="bg-[#141416] border-white/5 focus:border-[#D61C1C] rounded-xl px-5 py-4 w-full text-white uppercase" />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-white text-sm font-medium mb-2">{copy.subject}</label>
                <select id="contact-subject" name="subject" title={copy.subject} value={formData.subject} onChange={handleChange} required className="bg-[#141416] border-white/5 focus:border-[#D61C1C] rounded-xl px-5 py-4 w-full text-white appearance-none">
                  <option value="">{copy.options.default}</option>
                  <option value="membership">{copy.options.membership}</option>
                  <option value="booking">{copy.options.booking}</option>
                  <option value="community">{copy.options.community}</option>
                  <option value="other">{copy.options.other}</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-white text-sm font-medium mb-2">{copy.message}</label>
                <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder={copy.message} className="bg-[#141416] border-white/5 focus:border-[#D61C1C] rounded-xl px-5 py-4 w-full resize-none text-white" />
              </div>
              
              <div className="flex items-start gap-3 mt-4 mb-2">
                <div className="flex items-center h-5">
                  <input
                    id="contact-verification"
                    name="verification"
                    type="checkbox"
                    checked={formData.verification}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 rounded border-white/20 bg-[#141416] text-[#D61C1C] focus:ring-[#D61C1C] focus:ring-offset-[#0B0B0C]"
                  />
                </div>
                <label htmlFor="contact-verification" className="text-sm text-[#A7A7AB] leading-tight cursor-pointer select-none">
                  {copy.verificationLabel}
                </label>
              </div>

              <button type="submit" disabled={isSubmitting || !formData.verification} className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed py-4 text-base mt-2">
                {isSubmitting ? copy.submitting : copy.submit}
                <Send size={16} />
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="card-dark p-8 md:p-10 border-white/10 group hover:border-white/20 transition-colors h-fit sticky top-32">
              <div className="flex items-center gap-3 mb-4">
                <Mail size={18} className="text-[#D61C1C]" />
                <span className="text-white font-semibold text-lg">{copy.emailLabel}</span>
              </div>
              <a href="mailto:hello@inderoos.nl" className="text-[#A7A7AB] hover:text-[#D61C1C] transition-colors text-lg inline-flex items-center gap-2 mb-8">
                hello@inderoos.nl
              </a>
              <p className="text-sm text-[#A7A7AB] leading-relaxed border-t border-white/10 pt-6">
                {copy.secureText}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactV2;
