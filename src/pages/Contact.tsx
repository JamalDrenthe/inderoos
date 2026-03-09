import { useState } from 'react';
import { Mail, MessageSquare, Send, Check, Instagram } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="px-6 lg:px-12 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="mono text-[#D61C1C] mb-4 block">CONTACT</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Neem contact op</h1>
          <p className="text-[#A7A7AB] text-lg max-w-2xl mx-auto">
            Heb je vragen over onze evenementen of wil je meer informatie? 
            We staan voor je klaar.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <div className="card-dark p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Stuur een bericht</h2>
              
              {showSuccess && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
                  <Check size={20} className="text-green-500" />
                  <p className="text-green-400 text-sm">
                    Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Naam *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Je naam"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">E-mailadres *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="je@email.nl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Onderwerp *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Kies een onderwerp</option>
                    <option value="general">Algemene vraag</option>
                    <option value="reservation">Reservering</option>
                    <option value="event">Evenement informatie</option>
                    <option value="safety">Veiligheid</option>
                    <option value="other">Anders</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Bericht *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Je bericht..."
                    rows={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Bezig met verzenden...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Verstuur bericht
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Contactgegevens</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#D61C1C]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-[#D61C1C]" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">E-mail</h4>
                      <a 
                        href="mailto:info@gang2bang.nl" 
                        className="text-[#A7A7AB] hover:text-white transition-colors"
                      >
                        info@gang2bang.nl
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#D61C1C]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Instagram size={20} className="text-[#D61C1C]" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Instagram</h4>
                      <a 
                        href="#" 
                        className="text-[#A7A7AB] hover:text-white transition-colors"
                      >
                        @gang2bang
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#D61C1C]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageSquare size={20} className="text-[#D61C1C]" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">WhatsApp</h4>
                      <p className="text-[#A7A7AB]">
                        Beschikbaar voor vragen op werkdagen
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#141416] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Veelgestelde vragen</h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-white font-medium">
                      <span>Hoe kan ik reserveren?</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <p className="text-[#A7A7AB] mt-3 text-sm">
                      Kies een evenement op onze evenementenpagina en klik op &ldquo;Reserveer&rdquo;. 
                      Vul het formulier in en voltooi de betaling via Tikkie.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-white font-medium">
                      <span>Kan ik annuleren?</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <p className="text-[#A7A7AB] mt-3 text-sm">
                      Ja, je kunt tot 24 uur van tevoren kosteloos annuleren. 
                      Neem contact met ons op via e-mail.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-white font-medium">
                      <span>Is er een dresscode?</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <p className="text-[#A7A7AB] mt-3 text-sm">
                      Dress to impress! Elegant en sexy wordt gewaardeerd. 
                      Op BDSM-avonden is fetish-wear natuurlijk welkom.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-white font-medium">
                      <span>Mag ik alleen komen?</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <p className="text-[#A7A7AB] mt-3 text-sm">
                      Ja, zowel singles als stellen zijn van harte welkom. 
                      Er is altijd een goede balans tussen mannen en vrouwen.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
