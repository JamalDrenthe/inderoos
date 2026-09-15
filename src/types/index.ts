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
  language?: 'nl' | 'en' | 'de' | 'fr' | 'es' | 'pl' | 'ar' | 'ru' | 'zh' | 'tr' | 'uk';
  notes?: string;
  adminNotes?: string;
  tikkieReference?: string;
  paymentLink?: string;
  messageHistory?: ReservationMessage[];
  createdAt: string;
  updatedAt?: string;
}

export interface ReservationMessage {
  id: string;
  reservationId: string;
  recipientEmail: string;
  subject: string;
  body: string;
  createdAt: string;
  kind: 'payment_request' | 'update';
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

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  published: boolean;
  publishedAt: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
}

export interface ServiceOffering {
  id: string;
  name: string;
  description: string;
  duration: string;
  priceLabel: string;
  image: string;
}

export interface MemberProfile {
  id: string;
  email: string;
  fullName: string;
  displayName: string;
  bio: string;
  location: string;
  lookingFor: string;
  interests: string[];
  avatarUrl: string;
  attendedEventIds: string[];
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  subject: string;
  body: string;
  createdAt: string;
}
