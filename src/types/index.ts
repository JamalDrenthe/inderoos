export interface Event {
  id: string;
  title: string;
  theme: string;
  date: string;
  day: string;
  time: string;
  price: {
    man: number;
    stel: number;
    vrouw: number;
  };
  image: string;
  description: string;
  included: string[];
  weekNumber?: number;
  season?: string;
  isActive?: boolean;
}

export interface Reservation {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ticketType: 'man' | 'stel' | 'vrouw' | 'membership';
  quantity: number;
  totalPrice: number;
  status: 'new' | 'pending' | 'paid' | 'cancelled';
  bookingMode?: 'ticket' | 'membership';
  selectionLabel?: string;
  language?: 'nl' | 'en' | 'de';
  notes?: string;
  adminNotes?: string;
  tikkieReference?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  image: string;
}

export interface AdminUser {
  username: string;
  password: string;
}

export interface SiteSettings {
  prices: {
    man: number;
    stel: number;
    vrouw: number;
  };
}
