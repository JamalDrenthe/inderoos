import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Euro, 
  LogOut, 
  Search, 
  Check, 
  X,
  Download,
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  Edit3,
  Save,
  Mail,
  Phone,
  FileText,
  CreditCard
} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Reservation, Event } from '../types';
import { getUpcomingEvents } from '../data/events';

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated] = useLocalStorage('adminAuthenticated', false);
  const [reservations, setReservations] = useLocalStorage<Reservation[]>('reservations', []);
  const [managedEvents, setManagedEvents] = useLocalStorage<Event[]>('managedEvents', getUpcomingEvents());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'pending' | 'paid' | 'cancelled'>('all');
  const [activeTab, setActiveTab] = useState<'reservations' | 'events' | 'settings'>('reservations');
  const [expandedReservation, setExpandedReservation] = useState<string | null>(null);
  const [editingReservation, setEditingReservation] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Reservation>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  const handleStatusChange = (reservationId: string, newStatus: Reservation['status']) => {
    setReservations(prev =>
      prev.map(r =>
        r.id === reservationId ? { ...r, status: newStatus, updatedAt: new Date().toISOString() } : r
      )
    );
    setEditingReservation(null);
  };

  const handleSaveEdit = (reservationId: string) => {
    setReservations(prev =>
      prev.map(r =>
        r.id === reservationId ? { ...r, ...editForm, updatedAt: new Date().toISOString() } : r
      )
    );
    setEditingReservation(null);
    setEditForm({});
  };

  const handleUpdateEventTheme = (eventId: string, newTheme: Event['theme']) => {
    setManagedEvents(prev =>
      prev.map(e =>
        e.id === eventId ? { ...e, theme: newTheme, title: getThemeTitle(newTheme) } : e
      )
    );
  };

  const getThemeTitle = (theme: Event['theme']) => {
    const titles: Record<string, string> = {
      cuck: 'Cuck & Hotwife',
      bbc: 'BBC Night',
      swingers: 'Swingers Social',
      bdsm: 'BDSM Nights'
    };
    return titles[theme] || theme;
  };

  const filteredReservations = reservations
    .filter(r => {
      if (statusFilter === 'all') return true;
      return r.status === statusFilter;
    })
    .filter(r => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        r.firstName.toLowerCase().includes(searchLower) ||
        r.lastName.toLowerCase().includes(searchLower) ||
        r.email.toLowerCase().includes(searchLower) ||
        r.id.toLowerCase().includes(searchLower) ||
        r.phone.includes(searchTerm)
      );
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const stats = {
    total: reservations.length,
    new: reservations.filter(r => r.status === 'new').length,
    pending: reservations.filter(r => r.status === 'pending').length,
    paid: reservations.filter(r => r.status === 'paid').length,
    cancelled: reservations.filter(r => r.status === 'cancelled').length,
    revenue: reservations
      .filter(r => r.status === 'paid')
      .reduce((sum, r) => sum + r.totalPrice, 0),
  };

  const getEventName = (eventId: string) => {
    const event = managedEvents.find(e => e.id === eventId);
    return event ? `${event.title} (${event.date})` : eventId;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
            <Check size={12} />
            Betaald
          </span>
        );
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
            <AlertCircle size={12} />
            Nieuw
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
            <ClockIcon size={12} />
            In afwachting
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
            <X size={12} />
            Geannuleerd
          </span>
        );
      default:
        return null;
    }
  };

  const exportToCSV = () => {
    const headers = ['Reserveringsnummer', 'Naam', 'Email', 'Telefoon', 'Evenement', 'Ticket type', 'Aantal', 'Bedrag', 'Status', 'Tikkie ref', 'Datum'];
    const rows = filteredReservations.map(r => [
      r.id,
      `${r.firstName} ${r.lastName}`,
      r.email,
      r.phone,
      getEventName(r.eventId),
      r.ticketType,
      r.quantity,
      r.totalPrice,
      r.status,
      r.tikkieReference || '',
      new Date(r.createdAt).toLocaleDateString('nl-NL'),
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reserveringen-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const ClockIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="px-6 lg:px-12 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="mono text-[#D61C1C] mb-2 block">ADMIN</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center gap-2 self-start"
            >
              <LogOut size={18} />
              Uitloggen
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6 lg:px-12 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 border-b border-white/10">
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'reservations' 
                  ? 'text-[#D61C1C] border-b-2 border-[#D61C1C]' 
                  : 'text-[#A7A7AB] hover:text-white'
              }`}
            >
              Reserveringen
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'events' 
                  ? 'text-[#D61C1C] border-b-2 border-[#D61C1C]' 
                  : 'text-[#A7A7AB] hover:text-white'
              }`}
            >
              Evenementen
            </button>
          </div>
        </div>
      </section>

      {activeTab === 'reservations' && (
        <>
          {/* Stats */}
          <section className="px-6 lg:px-12 mb-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="card-dark p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Users size={20} className="text-[#D61C1C]" />
                    <span className="text-[#A7A7AB] text-sm">Totaal</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
                <div className="card-dark p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle size={20} className="text-blue-500" />
                    <span className="text-[#A7A7AB] text-sm">Nieuw</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.new}</p>
                </div>
                <div className="card-dark p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <ClockIcon size={20} />
                    <span className="text-[#A7A7AB] text-sm">In afwachting</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.pending}</p>
                </div>
                <div className="card-dark p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Check size={20} className="text-green-500" />
                    <span className="text-[#A7A7AB] text-sm">Betaald</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.paid}</p>
                </div>
                <div className="card-dark p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Euro size={20} className="text-[#D61C1C]" />
                    <span className="text-[#A7A7AB] text-sm">Omzet</span>
                  </div>
                  <p className="text-3xl font-bold text-white">€{stats.revenue}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="px-6 lg:px-12 mb-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7A7AB]" />
                  <input
                    type="text"
                    placeholder="Zoek op naam, email, telefoon of reserveringsnummer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 bg-[#141416]"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="bg-[#141416] min-w-[150px]"
                  >
                    <option value="all">Alle statussen</option>
                    <option value="new">Nieuw</option>
                    <option value="pending">In afwachting</option>
                    <option value="paid">Betaald</option>
                    <option value="cancelled">Geannuleerd</option>
                  </select>
                  <button
                    onClick={exportToCSV}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Download size={18} />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Reservations list */}
          <section className="px-6 lg:px-12">
            <div className="max-w-7xl mx-auto space-y-4">
              {filteredReservations.length === 0 ? (
                <div className="card-dark p-12 text-center text-[#A7A7AB]">
                  Geen reserveringen gevonden
                </div>
              ) : (
                filteredReservations.map((reservation) => (
                  <div key={reservation.id} className="card-dark overflow-hidden">
                    {/* Summary row */}
                    <div 
                      className="p-6 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                      onClick={() => setExpandedReservation(expandedReservation === reservation.id ? null : reservation.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-[#A7A7AB] text-sm">{reservation.id}</span>
                          {getStatusBadge(reservation.status)}
                        </div>
                        <p className="text-white font-semibold">{reservation.firstName} {reservation.lastName}</p>
                        <p className="text-[#A7A7AB] text-sm">{getEventName(reservation.eventId)}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-[#D61C1C] font-bold text-xl">€{reservation.totalPrice}</p>
                          <p className="text-[#A7A7AB] text-sm capitalize">{reservation.ticketType} × {reservation.quantity}</p>
                        </div>
                        <div className="text-[#A7A7AB]">
                          {expandedReservation === reservation.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {expandedReservation === reservation.id && (
                      <div className="border-t border-white/10 p-6 bg-[#141416]">
                        {editingReservation === reservation.id ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[#A7A7AB] text-sm mb-1">Status</label>
                                <select
                                  value={editForm.status || reservation.status}
                                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as Reservation['status'] })}
                                  className="w-full bg-[#0B0B0C]"
                                >
                                  <option value="new">Nieuw</option>
                                  <option value="pending">In afwachting</option>
                                  <option value="paid">Betaald</option>
                                  <option value="cancelled">Geannuleerd</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[#A7A7AB] text-sm mb-1">Tikkie referentie</label>
                                <input
                                  type="text"
                                  value={editForm.tikkieReference || reservation.tikkieReference || ''}
                                  onChange={(e) => setEditForm({ ...editForm, tikkieReference: e.target.value })}
                                  placeholder="Bijv. TIK-123456"
                                  className="w-full bg-[#0B0B0C]"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[#A7A7AB] text-sm mb-1">Interne notities</label>
                              <textarea
                                value={editForm.adminNotes || reservation.adminNotes || ''}
                                onChange={(e) => setEditForm({ ...editForm, adminNotes: e.target.value })}
                                placeholder="Notities voor admin..."
                                rows={3}
                                className="w-full bg-[#0B0B0C]"
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveEdit(reservation.id)}
                                className="btn-primary flex items-center gap-2"
                              >
                                <Save size={16} />
                                Opslaan
                              </button>
                              <button
                                onClick={() => {
                                  setEditingReservation(null);
                                  setEditForm({});
                                }}
                                className="btn-secondary"
                              >
                                Annuleren
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex items-center gap-3">
                                <Mail size={18} className="text-[#A7A7AB]" />
                                <span className="text-white">{reservation.email}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Phone size={18} className="text-[#A7A7AB]" />
                                <span className="text-white">{reservation.phone}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Calendar size={18} className="text-[#A7A7AB]" />
                                <span className="text-white">{new Date(reservation.createdAt).toLocaleDateString('nl-NL')}</span>
                              </div>
                            </div>
                            
                            {reservation.notes && (
                              <div className="flex items-start gap-3">
                                <FileText size={18} className="text-[#A7A7AB] mt-1" />
                                <div>
                                  <p className="text-[#A7A7AB] text-sm">Opmerkingen klant:</p>
                                  <p className="text-white">{reservation.notes}</p>
                                </div>
                              </div>
                            )}
                            
                            {reservation.tikkieReference && (
                              <div className="flex items-center gap-3">
                                <CreditCard size={18} className="text-[#A7A7AB]" />
                                <div>
                                  <p className="text-[#A7A7AB] text-sm">Tikkie referentie:</p>
                                  <p className="text-white font-mono">{reservation.tikkieReference}</p>
                                </div>
                              </div>
                            )}
                            
                            {reservation.adminNotes && (
                              <div className="bg-[#0B0B0C] rounded-lg p-4">
                                <p className="text-[#A7A7AB] text-sm mb-1">Interne notities:</p>
                                <p className="text-white">{reservation.adminNotes}</p>
                              </div>
                            )}
                            
                            <div className="flex gap-2 pt-4 border-t border-white/10">
                              <button
                                onClick={() => {
                                  setEditingReservation(reservation.id);
                                  setEditForm({
                                    status: reservation.status,
                                    tikkieReference: reservation.tikkieReference,
                                    adminNotes: reservation.adminNotes
                                  });
                                }}
                                className="btn-secondary flex items-center gap-2"
                              >
                                <Edit3 size={16} />
                                Bewerken
                              </button>
                              {reservation.status === 'new' && (
                                <>
                                  <button
                                    onClick={() => handleStatusChange(reservation.id, 'pending')}
                                    className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
                                  >
                                    Markeer: Tikkie verstuurd
                                  </button>
                                  <button
                                    onClick={() => handleStatusChange(reservation.id, 'paid')}
                                    className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                                  >
                                    Markeer: Betaald
                                  </button>
                                </>
                              )}
                              {reservation.status === 'pending' && (
                                <button
                                  onClick={() => handleStatusChange(reservation.id, 'paid')}
                                  className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                                >
                                  Markeer: Betaald
                                </button>
                              )}
                              {reservation.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                                >
                                  Annuleren
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        </>
      )}

      {activeTab === 'events' && (
        <section className="px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="card-dark p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Evenementen beheren</h2>
              <p className="text-[#A7A7AB] text-sm">
                Wijs thema&apos;s toe aan de komende weekenden. De wijzigingen worden direct zichtbaar op de website.
              </p>
            </div>
            
            <div className="space-y-4">
              {managedEvents.map((event) => (
                <div key={event.id} className="card-dark p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[#D61C1C] font-semibold capitalize">{event.day}</span>
                        <span className="text-[#A7A7AB]">•</span>
                        <span className="text-white">{event.date}</span>
                        <span className="text-[#A7A7AB]">•</span>
                        <span className="text-[#A7A7AB]">{event.time}</span>
                      </div>
                      <p className="text-white font-semibold text-lg">{event.title}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-[#A7A7AB] text-sm">Thema:</label>
                      <select
                        value={event.theme}
                        onChange={(e) => handleUpdateEventTheme(event.id, e.target.value as Event['theme'])}
                        className="bg-[#141416] min-w-[180px]"
                      >
                        <option value="cuck">Cuck & Hotwife</option>
                        <option value="bbc">BBC Night</option>
                        <option value="swingers">Swingers Social</option>
                        <option value="bdsm">BDSM Nights</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Admin;
