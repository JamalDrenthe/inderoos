import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Users, Check, AlertCircle, ArrowLeft, Mail, Phone } from 'lucide-react';
import { getUpcomingEvents } from '../data/events';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Reservation } from '../types';

const Booking = () => {
  const { eventId } = useParams<{ eventId?: string }>();
  const [, setReservations] = useLocalStorage<Reservation[]>('reservations', []);
  
  const allEvents = getUpcomingEvents();
  const selectedEvent = eventId ? allEvents.find(e => e.id === eventId) : null;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ticketType: 'man' as 'man' | 'stel' | 'vrouw',
    quantity: 1,
    selectedEventId: eventId || '',
    notes: '',
    ageConfirmed: false,
    termsAccepted: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newReservationId, setNewReservationId] = useState<string>('');

  useEffect(() => {
    if (eventId) {
      setFormData(prev => ({ ...prev, selectedEventId: eventId }));
    }
  }, [eventId]);

  const getMaxQuantity = (type: 'man' | 'stel' | 'vrouw') => {
    switch (type) {
      case 'man': return 5;
      case 'stel': return 2;
      case 'vrouw': return 5;
      default: return 5;
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Voornaam is verplicht';
    if (!formData.lastName.trim()) newErrors.lastName = 'Achternaam is verplicht';
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail is verplicht';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ongeldig e-mailadres';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Telefoonnummer is verplicht';
    if (!formData.selectedEventId) newErrors.event = 'Selecteer een evenement';
    if (!formData.ageConfirmed) newErrors.age = 'Je moet 18+ zijn om te reserveren';
    if (!formData.termsAccepted) newErrors.terms = 'Je moet akkoord gaan met de voorwaarden';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    const event = allEvents.find(e => e.id === formData.selectedEventId);
    if (!event) return 0;
    
    const price = event.price[formData.ticketType];
    return price * formData.quantity;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const event = allEvents.find(e => e.id === formData.selectedEventId);
    if (!event) return;
    
    const reservationId = `RES-${Date.now()}`;
    const reservation: Reservation = {
      id: reservationId,
      eventId: formData.selectedEventId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      ticketType: formData.ticketType,
      quantity: formData.quantity,
      totalPrice: calculateTotal(),
      status: 'new',
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setReservations(prev => [...prev, reservation]);
    setNewReservationId(reservationId);
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // In production: Send email to customer and admin notification
    console.log('Email to customer:', formData.email);
    console.log('Admin notification sent');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'ticketType') {
      // Reset quantity when ticket type changes
      setFormData(prev => ({ ...prev, ticketType: value as 'man' | 'stel' | 'vrouw', quantity: 1 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="card-dark p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Reservering ontvangen!</h2>
            <p className="text-[#A7A7AB] mb-6">
              Bedankt voor je reservering bij Gang2Bang.
            </p>
            
            <div className="bg-[#141416] rounded-xl p-6 mb-8 text-left">
              <div className="flex items-start gap-4 mb-4">
                <Mail size={24} className="text-[#D61C1C] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium mb-1">E-mailbevestiging</p>
                  <p className="text-[#A7A7AB] text-sm">
                    We hebben een bevestiging gestuurd naar <span className="text-white">{formData.email}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={24} className="text-[#D61C1C] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium mb-1">Volgende stap</p>
                  <p className="text-[#A7A7AB] text-sm">
                    Je ontvangt <strong className="text-white">binnen 24 uur</strong> een Tikkie-betaalverzoek op dit e-mailadres of via SMS. Zodra de betaling is ontvangen, is je reservering definitief.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#141416] rounded-xl p-6 mb-8">
              <p className="text-sm text-[#A7A7AB] mb-2">Reserveringsnummer:</p>
              <p className="text-xl font-mono text-white mb-4">{newReservationId}</p>
              <p className="text-sm text-[#A7A7AB] mb-2">Te betalen:</p>
              <p className="text-2xl font-bold text-[#D61C1C]">€{calculateTotal()}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/evenementen">
                <button className="btn-primary w-full sm:w-auto">
                  Bekijk meer evenementen
                </button>
              </Link>
              <Link to="/">
                <button className="btn-secondary w-full sm:w-auto">
                  Terug naar home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="px-6 lg:px-12 mb-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/evenementen" className="inline-flex items-center gap-2 text-[#A7A7AB] hover:text-white transition-colors mb-6">
            <ArrowLeft size={18} />
            <span>Terug naar evenementen</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Reserveer je plek</h1>
          <p className="text-[#A7A7AB] text-lg">
            Vul het formulier in om je reservering te plaatsen. Je ontvangt binnen 24 uur een Tikkie-betaalverzoek.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Event selection - read only if pre-selected */}
            <div className="card-dark p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">1. Gekozen evenement</h3>
              
              {selectedEvent ? (
                <div className="flex items-start gap-6 bg-[#141416] rounded-xl p-6">
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title} 
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">{selectedEvent.title}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[#A7A7AB]">
                        <Calendar size={18} />
                        <span>{selectedEvent.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#A7A7AB]">
                        <Clock size={18} />
                        <span>{selectedEvent.time}</span>
                      </div>
                    </div>
                    <input type="hidden" name="selectedEventId" value={formData.selectedEventId} />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allEvents.slice(0, 6).map(event => (
                    <label
                      key={event.id}
                      className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.selectedEventId === event.id
                          ? 'border-[#D61C1C] bg-[#D61C1C]/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="selectedEventId"
                        value={event.id}
                        checked={formData.selectedEventId === event.id}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <div className="flex items-start gap-4">
                        <img src={event.image} alt={event.title} className="w-20 h-20 object-cover rounded-lg" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">{event.title}</h4>
                          <p className="text-[#A7A7AB] text-sm">{event.date}</p>
                          <p className="text-[#A7A7AB] text-sm">{event.time}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              {errors.event && (
                <p className="text-[#D61C1C] text-sm mt-4 flex items-center gap-2">
                  <AlertCircle size={16} />
                  {errors.event}
                </p>
              )}
            </div>

            {/* Personal info */}
            <div className="card-dark p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">2. Je gegevens</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Voornaam *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Je voornaam"
                    className={errors.firstName ? 'border-[#D61C1C]' : ''}
                  />
                  {errors.firstName && <p className="text-[#D61C1C] text-sm mt-2">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Achternaam *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Je achternaam"
                    className={errors.lastName ? 'border-[#D61C1C]' : ''}
                  />
                  {errors.lastName && <p className="text-[#D61C1C] text-sm mt-2">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">E-mailadres *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="je@email.nl"
                    className={errors.email ? 'border-[#D61C1C]' : ''}
                  />
                  {errors.email && <p className="text-[#D61C1C] text-sm mt-2">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Telefoonnummer *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="06-12345678"
                    className={errors.phone ? 'border-[#D61C1C]' : ''}
                  />
                  {errors.phone && <p className="text-[#D61C1C] text-sm mt-2">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Ticket selection */}
            <div className="card-dark p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">3. Ticketkeuze</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Type ticket *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['man', 'stel', 'vrouw'] as const).map((type) => {
                      const event = allEvents.find(e => e.id === formData.selectedEventId);
                      const price = event?.price[type] || 0;
                      
                      return (
                        <label
                          key={type}
                          className={`relative p-4 rounded-xl border cursor-pointer transition-all text-center ${
                            formData.ticketType === type
                              ? 'border-[#D61C1C] bg-[#D61C1C]/10'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <input
                            type="radio"
                            name="ticketType"
                            value={type}
                            checked={formData.ticketType === type}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <Users size={20} className="mx-auto mb-2 text-[#A7A7AB]" />
                          <p className="text-white text-sm capitalize mb-1">{type}</p>
                          <p className="text-[#D61C1C] font-bold">€{price}</p>
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Aantal {formData.ticketType === 'stel' ? '(max 2 stellen)' : '(max 5)'}
                  </label>
                  <select
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full"
                  >
                    {Array.from({ length: getMaxQuantity(formData.ticketType) }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>
                        {num} {formData.ticketType === 'stel' ? (num === 1 ? 'stel' : 'stellen') : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Total */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[#A7A7AB]">Totaal te betalen:</span>
                  <span className="text-3xl font-bold text-[#D61C1C]">€{calculateTotal()}</span>
                </div>
                <p className="text-[#A7A7AB] text-sm mt-2">
                  Je ontvangt een Tikkie-betaalverzoek binnen 24 uur
                </p>
              </div>
            </div>

            {/* Notes */}
            <div className="card-dark p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">4. Opmerkingen (optioneel)</h3>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Heb je speciale wensen of vragen?"
                rows={4}
              />
            </div>

            {/* Terms */}
            <div className="card-dark p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">5. Voorwaarden</h3>
              <div className="space-y-4">
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    name="ageConfirmed"
                    checked={formData.ageConfirmed}
                    onChange={handleInputChange}
                  />
                  <span className="text-[#A7A7AB] text-sm">
                    Ik bevestig dat ik 18 jaar of ouder ben *
                  </span>
                </label>
                {errors.age && <p className="text-[#D61C1C] text-sm">{errors.age}</p>}
                
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                  />
                  <span className="text-[#A7A7AB] text-sm">
                    Ik ga akkoord met de{' '}
                    <Link to="/algemene-voorwaarden" className="text-[#D61C1C] hover:underline">
                      algemene voorwaarden
                    </Link>{' '}
                    en{' '}
                    <Link to="/privacy" className="text-[#D61C1C] hover:underline">
                      privacyverklaring
                    </Link>{' '}
                    *
                  </span>
                </label>
                {errors.terms && <p className="text-[#D61C1C] text-sm">{errors.terms}</p>}
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Bezig met verwerken...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Reservering plaatsen
                  </>
                )}
              </button>
              <Link to="/evenementen" className="sm:w-auto">
                <button type="button" className="btn-secondary w-full">Annuleren</button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Booking;
