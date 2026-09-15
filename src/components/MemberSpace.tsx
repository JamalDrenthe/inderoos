import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ImagePlus, LogOut, Mail, Save, Sparkles, Users } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultCommunityProfiles, defaultDirectMessages } from '../data/platformContent';
import type { DirectMessage, MemberProfile, Reservation } from '../types';
import type { MemberSession } from '../lib/memberAuth';

interface MemberSpaceProps {
  onSignOut: () => Promise<void> | void;
  profileName: string;
  session: MemberSession;
}

const createEmptyProfile = (email: string, name: string, attendedEventIds: string[]): MemberProfile => ({
  id: `member-${Date.now()}`,
  email,
  fullName: name,
  displayName: name,
  bio: '',
  location: 'Amsterdam',
  lookingFor: '',
  interests: [],
  avatarUrl: '/logos/Inderooslogogold3.png',
  attendedEventIds,
});

const MemberSpace = ({ onSignOut, profileName, session }: MemberSpaceProps) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'profile' | 'community' | 'inbox'>('profile');
  const [profiles, setProfiles] = useLocalStorage<MemberProfile[]>('memberProfiles', defaultCommunityProfiles);
  const [messages, setMessages] = useLocalStorage<DirectMessage[]>('communityMessages', defaultDirectMessages);
  const [reservations] = useLocalStorage<Reservation[]>('reservations', []);
  const [profileDraft, setProfileDraft] = useState<Partial<MemberProfile> | null>(null);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);
  const [messageForm, setMessageForm] = useState({ subject: '', body: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const email = session.user.email || '';

  useEffect(() => {
    if (!email) {
      return;
    }

    const attendedEventIds = reservations
      .filter((reservation) => reservation.email === email)
      .map((reservation) => reservation.selectionLabel || reservation.eventId);

    setProfiles((prev) => {
      const existing = prev.find((profile) => profile.email === email);
      if (existing) {
        return prev.map((profile) =>
          profile.email === email
            ? {
                ...profile,
                fullName: profile.fullName || profileName || email,
                displayName: profile.displayName || profileName || email,
                attendedEventIds: Array.from(new Set([...profile.attendedEventIds, ...attendedEventIds])),
              }
            : profile,
        );
      }

      return [createEmptyProfile(email, profileName || email, attendedEventIds), ...prev];
    });
  }, [email, profileName, reservations, setProfiles]);

  const currentProfile = useMemo(
    () => profiles.find((profile) => profile.email === email) || null,
    [email, profiles],
  );

  const profileForm = currentProfile ? { ...currentProfile, ...(profileDraft ?? {}) } : null;

  const communityProfiles = useMemo(
    () => profiles.filter((profile) => {
      if (profile.email === email) return false;
      if (!searchQuery) return true;
      const lowerQuery = searchQuery.toLowerCase();
      return (
        (profile.displayName?.toLowerCase() || '').includes(lowerQuery) ||
        (profile.location?.toLowerCase() || '').includes(lowerQuery) ||
        (profile.interests || []).some(interest => interest.toLowerCase().includes(lowerQuery)) ||
        (profile.bio?.toLowerCase() || '').includes(lowerQuery)
      );
    }),
    [email, profiles, searchQuery],
  );

  const directInbox = useMemo(
    () =>
      currentProfile
        ? [...messages]
            .filter((message) => message.recipientId === currentProfile.id || message.senderId === currentProfile.id)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        : [],
    [currentProfile, messages],
  );

  const reservationInbox = useMemo(() => {
    const rawInbox = [...reservations]
        .filter((reservation) => reservation.email === email)
        .flatMap((reservation) =>
          (reservation.messageHistory || []).map((message) => ({
            ...message,
            eventLabel: reservation.selectionLabel || reservation.eventId,
            paymentLink: reservation.paymentLink,
          })),
        )
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (rawInbox.length === 0) {
      return [{
        id: 'welcome-admin',
        subject: language === 'nl' ? 'Welkom bij In De Roos' : language === 'en' ? 'Welcome to In De Roos' : 'Willkommen bei In De Roos',
        body: language === 'nl' ? 'Je profiel is succesvol geactiveerd. Zodra je een reservering plaatst en goedgekeurd wordt, verschijnen hier je exclusieve locatie-instructies en betaallinks.\n\nDiscretie is onze prioriteit. Verken de nachten en we zien je snel.' : language === 'en' ? 'Your profile has been successfully activated. Once you place a reservation and are approved, your exclusive location instructions and payment links will appear here.\n\nDiscretion is our priority. Explore the nights and we will see you soon.' : 'Dein Profil wurde erfolgreich aktiviert. Sobald du eine Reservierung vornimmst und genehmigt wirst, erscheinen hier deine exklusiven Standortanweisungen und Zahlungslinks.\n\nDiskretion ist unsere Priorität. Erkunde die Nächte und wir sehen uns bald.',
        createdAt: new Date().toISOString(),
        eventLabel: 'SYSTEM',
        senderId: 'admin',
        recipientId: currentProfile?.id || '',
        paymentLink: '',
      }];
    }
    return rawInbox;
  }, [email, reservations, language, currentProfile?.id]);

  const selectedRecipient = communityProfiles.find((profile) => profile.id === selectedRecipientId) || null;

  const content = {
    nl: {
      badge: 'MEMBER SPACE',
      tabs: {
        profile: 'Mijn profiel',
        community: 'Community',
        inbox: 'Inbox',
      },
      profileTitle: 'Jouw profiel',
      profileText: 'Werk je profiel bij, upload een foto en laat subtiel zien wie jij bent binnen de community.',
      uploadLabel: 'Upload profielfoto',
      displayName: 'Schermnaam',
      fullName: 'Volledige naam',
      location: 'Locatie',
      lookingFor: 'Waar sta je voor open?',
      bio: 'Bio',
      interests: 'Interesses',
      save: 'Profiel opslaan',
      nights: 'Aanwezige nachten',
      communityTitle: 'Andere members',
      communityText: 'Bekijk wie er in de community zit en stuur direct een bericht naar iemand die je aandacht trekt.',
      sendMessage: 'Stuur bericht',
      inboxTitle: 'Jouw inbox',
      inboxText: 'Hier verschijnen updates vanuit admin en berichten van andere members.',
      adminInbox: 'Admin & betaling',
      memberInbox: 'Berichten van members',
      subject: 'Onderwerp',
      body: 'Bericht',
      send: 'Verstuur',
      exploreNights: 'Bekijk nachten',
      signOut: 'Uitloggen',
      noAdminMessages: 'Nog geen admin- of betaalberichten ontvangen.',
      noMemberMessages: 'Nog geen memberberichten ontvangen.',
    },
    en: {
      badge: 'MEMBER SPACE',
      tabs: {
        profile: 'My profile',
        community: 'Community',
        inbox: 'Inbox',
      },
      profileTitle: 'Your profile',
      profileText: 'Update your profile, upload a photo, and show who you are inside the community with a little more nuance.',
      uploadLabel: 'Upload profile photo',
      displayName: 'Display name',
      fullName: 'Full name',
      location: 'Location',
      lookingFor: 'What are you open to?',
      bio: 'Bio',
      interests: 'Interests',
      save: 'Save profile',
      nights: 'Attended nights',
      communityTitle: 'Other members',
      communityText: 'See who is already inside the community and message the people who catch your attention.',
      sendMessage: 'Send message',
      inboxTitle: 'Your inbox',
      inboxText: 'Admin updates and messages from other members appear here.',
      adminInbox: 'Admin & payment',
      memberInbox: 'Member messages',
      subject: 'Subject',
      body: 'Message',
      send: 'Send',
      exploreNights: 'View nights',
      signOut: 'Sign out',
      noAdminMessages: 'No admin or payment messages yet.',
      noMemberMessages: 'No member messages yet.',
    },
    de: {
      badge: 'MEMBER SPACE',
      tabs: {
        profile: 'Mein Profil',
        community: 'Community',
        inbox: 'Inbox',
      },
      profileTitle: 'Dein Profil',
      profileText: 'Aktualisiere dein Profil, lade ein Foto hoch und zeige etwas feiner, wer du innerhalb der Community bist.',
      uploadLabel: 'Profilfoto hochladen',
      displayName: 'Anzeigename',
      fullName: 'Vollständiger Name',
      location: 'Ort',
      lookingFor: 'Wofür bist du offen?',
      bio: 'Bio',
      interests: 'Interessen',
      save: 'Profil speichern',
      nights: 'Besuchte Nächte',
      communityTitle: 'Andere Members',
      communityText: 'Sieh, wer bereits in der Community ist, und schreibe direkt den Menschen, die deine Aufmerksamkeit halten.',
      sendMessage: 'Nachricht senden',
      inboxTitle: 'Deine Inbox',
      inboxText: 'Hier erscheinen Updates vom Admin und Nachrichten anderer Members.',
      adminInbox: 'Admin & Zahlung',
      memberInbox: 'Nachrichten von Members',
      subject: 'Betreff',
      body: 'Nachricht',
      send: 'Senden',
      exploreNights: 'Nächte ansehen',
      signOut: 'Ausloggen',
      noAdminMessages: 'Noch keine Admin- oder Zahlungsnachrichten erhalten.',
      noMemberMessages: 'Noch keine Member-Nachrichten erhalten.',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  const handleSaveProfile = () => {
    if (!currentProfile || !profileForm) {
      return;
    }

    setProfiles((prev) => prev.map((profile) => (profile.id === profileForm.id ? profileForm : profile)));
    setProfileDraft(null);
  };

  const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentProfile) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return;
      }

      setProfileDraft((prev) => ({ ...(currentProfile || {}), ...(prev ?? {}), avatarUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = () => {
    if (!currentProfile || !selectedRecipient || !messageForm.subject.trim() || !messageForm.body.trim()) {
      return;
    }

    const nextMessage: DirectMessage = {
      id: `dm-${Date.now()}`,
      senderId: currentProfile.id,
      senderName: currentProfile.displayName,
      recipientId: selectedRecipient.id,
      recipientName: selectedRecipient.displayName,
      subject: messageForm.subject.trim(),
      body: messageForm.body.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [nextMessage, ...prev]);
    setMessageForm({ subject: '', body: '' });
    setActiveTab('inbox');
  };

  if (!profileForm || !currentProfile) {
    return null;
  }

  return (
    <div>
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D61C1C]/30 bg-[#D61C1C]/10 text-[#D61C1C]">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-white">{profileName}</h1>
            <span className="mono text-xs tracking-[0.2em] text-[#A7A7AB]">{copy.badge}</span>
          </div>
        </div>
        <button type="button" onClick={onSignOut} className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-[#A7A7AB] transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white">
          <LogOut size={16} className="transition-transform group-hover:-translate-x-1" />
          {copy.signOut}
        </button>
      </div>

      <div className="mb-12 flex justify-center">
        <div className="inline-flex rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-md">
          {(['profile', 'community', 'inbox'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-8 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                activeTab === tab ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'text-[#A7A7AB] hover:text-white'
              }`}
            >
              {copy.tabs[tab]}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'profile' ? (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 backdrop-blur-xl lg:col-span-4">
            <div className="group relative mb-8 overflow-hidden rounded-2xl bg-black/50 aspect-[4/5] w-full">
              <img src={profileForm.avatarUrl} alt={profileForm.displayName} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
              <label htmlFor="member-avatar" className="absolute bottom-6 left-1/2 -translate-x-1/2 flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 border border-white/20">
                <ImagePlus size={16} />
                {copy.uploadLabel}
              </label>
              <input id="member-avatar" type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-wide text-white">{copy.profileTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#A7A7AB]">{copy.profileText}</p>
            </div>
            
            <div className="mt-auto">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#A7A7AB]">{copy.nights}</p>
              <div className="flex flex-wrap gap-2">
                {profileForm.attendedEventIds.map((night) => (
                  <span key={night} className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-xs text-white backdrop-blur-sm">
                    {night}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl xl:p-12 lg:col-span-8">
            <div className="grid gap-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="group">
                  <label htmlFor="member-display-name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#A7A7AB] transition-colors group-focus-within:text-white">{copy.displayName}</label>
                  <input id="member-display-name" value={profileForm.displayName} onChange={(event) => setProfileDraft((prev) => ({ ...(currentProfile || {}), ...(prev ?? {}), displayName: event.target.value }))} className="w-full border-b border-white/10 bg-transparent py-3 text-lg text-white placeholder-white/20 focus:border-white focus:outline-none focus:ring-0 transition-all" />
                </div>
                <div className="group">
                  <label htmlFor="member-full-name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#A7A7AB] transition-colors group-focus-within:text-white">{copy.fullName}</label>
                  <input id="member-full-name" value={profileForm.fullName} onChange={(event) => setProfileDraft((prev) => ({ ...(currentProfile || {}), ...(prev ?? {}), fullName: event.target.value }))} className="w-full border-b border-white/10 bg-transparent py-3 text-lg text-white placeholder-white/20 focus:border-white focus:outline-none focus:ring-0 transition-all" />
                </div>
              </div>
              
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="group">
                  <label htmlFor="member-location" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#A7A7AB] transition-colors group-focus-within:text-white">{copy.location}</label>
                  <input id="member-location" value={profileForm.location} onChange={(event) => setProfileDraft((prev) => ({ ...(currentProfile || {}), ...(prev ?? {}), location: event.target.value }))} className="w-full border-b border-white/10 bg-transparent py-3 text-lg text-white placeholder-white/20 focus:border-white focus:outline-none focus:ring-0 transition-all" />
                </div>
                <div className="group">
                  <label htmlFor="member-looking-for" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#A7A7AB] transition-colors group-focus-within:text-white">{copy.lookingFor}</label>
                  <input id="member-looking-for" value={profileForm.lookingFor} onChange={(event) => setProfileDraft((prev) => ({ ...(currentProfile || {}), ...(prev ?? {}), lookingFor: event.target.value }))} className="w-full border-b border-white/10 bg-transparent py-3 text-lg text-white placeholder-white/20 focus:border-white focus:outline-none focus:ring-0 transition-all" />
                </div>
              </div>

              <div className="group">
                <label htmlFor="member-interests" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#A7A7AB] transition-colors group-focus-within:text-white">{copy.interests}</label>
                <input
                  id="member-interests"
                  value={profileForm.interests.join(', ')}
                  onChange={(event) =>
                    setProfileDraft((prev) => ({
                      ...(currentProfile || {}),
                      ...(prev ?? {}),
                      interests: event.target.value
                        .split(',')
                        .map((interest) => interest.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder="E.g. tantra, aftercare, connection"
                  className="w-full border-b border-white/10 bg-transparent py-3 text-lg text-white placeholder-white/20 focus:border-white focus:outline-none focus:ring-0 transition-all"
                />
              </div>

              <div className="group">
                <label htmlFor="member-bio" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#A7A7AB] transition-colors group-focus-within:text-white">{copy.bio}</label>
                <textarea id="member-bio" value={profileForm.bio} onChange={(event) => setProfileDraft((prev) => ({ ...(currentProfile || {}), ...(prev ?? {}), bio: event.target.value }))} rows={4} className="w-full resize-none border-b border-white/10 bg-transparent py-3 text-lg text-white placeholder-white/20 focus:border-white focus:outline-none focus:ring-0 transition-all" />
              </div>

              <div className="mt-4 flex justify-end">
                <button type="button" onClick={handleSaveProfile} className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105">
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                    <div className="relative h-full w-8 bg-black/10" />
                  </div>
                  <Save size={18} />
                  {copy.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {activeTab === 'community' ? (
        <div className="space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md">
            <h3 className="px-4 text-xl font-bold tracking-wide text-white">{copy.communityTitle}</h3>
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search name, location or interest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-black/50 py-3 pl-5 pr-12 text-sm text-white placeholder-white/30 backdrop-blur-md transition-all focus:border-white/40 focus:outline-none focus:ring-0"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
              </div>
            </div>
          </div>
          
          {communityProfiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 py-20 text-center">
              <Users size={48} className="mb-4 text-white/10" />
              <p className="text-lg text-[#A7A7AB]">No members found matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="grid gap-6 md:grid-cols-2 lg:col-span-7">
                {communityProfiles.map((profile) => (
                  <article key={profile.id} className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all hover:bg-white/[0.04] hover:border-white/20">
                    <div className="relative aspect-square overflow-hidden bg-black/50">
                      <img src={profile.avatarUrl} alt={profile.displayName} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent opacity-90" />
                      <div className="absolute bottom-4 left-6 flex items-center gap-2 text-[#D61C1C]">
                        <Users size={14} />
                        <span className="mono text-[10px] tracking-[0.2em]">MEMBER</span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6 pt-2">
                      <div className="mb-4 flex items-end justify-between">
                        <div>
                          <h3 className="text-xl font-bold tracking-wide text-white">{profile.displayName}</h3>
                          <p className="text-xs tracking-wider text-[#A7A7AB] uppercase mt-1">{profile.location}</p>
                        </div>
                      </div>
                      <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-[#D7D7DC]">{profile.bio || "No bio provided yet."}</p>
                      
                      <div className="mt-auto">
                        <div className="mb-6 flex flex-wrap gap-2">
                          {profile.interests.slice(0, 3).map((interest) => (
                            <span key={interest} className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-wider text-white">
                              {interest}
                            </span>
                          ))}
                          {profile.interests.length > 3 && (
                            <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-wider text-white">
                              +{profile.interests.length - 3}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRecipientId(profile.id);
                            setActiveTab('community');
                            // Scroll to message form on mobile
                            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                          }}
                          className={`w-full rounded-full border px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                            selectedRecipientId === profile.id 
                              ? 'bg-white text-black border-white' 
                              : 'border-white/20 text-white hover:bg-white hover:text-black'
                          }`}
                        >
                          <Mail size={14} />
                          {copy.sendMessage}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="sticky top-32 h-fit lg:col-span-5">
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Sparkles size={120} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D61C1C]/30 bg-[#D61C1C]/10 px-4 py-1.5 text-[#F1D4D4]">
                      <Sparkles size={14} />
                      <span className="mono text-[10px] tracking-[0.2em]">DIRECT MESSAGE</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedRecipient ? `Write to ${selectedRecipient.displayName}` : 'Select a member'}
                    </h3>
                    
                    <p className="mb-8 text-sm leading-relaxed text-[#A7A7AB]">
                      {selectedRecipient 
                        ? 'Your message will be sent directly to their member inbox.' 
                        : 'Choose someone from the community directory to start a private conversation.'}
                    </p>
                    
                    <div className={`grid gap-6 transition-opacity duration-300 ${selectedRecipient ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                      <div className="group">
                        <label htmlFor="member-message-subject" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#A7A7AB] transition-colors group-focus-within:text-white">{copy.subject}</label>
                        <input id="member-message-subject" value={messageForm.subject} onChange={(event) => setMessageForm((prev) => ({ ...prev, subject: event.target.value }))} className="w-full border-b border-white/10 bg-transparent py-3 text-white placeholder-white/20 focus:border-white focus:outline-none focus:ring-0 transition-all" placeholder="What's on your mind?" />
                      </div>
                      <div className="group">
                        <label htmlFor="member-message-body" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#A7A7AB] transition-colors group-focus-within:text-white">{copy.body}</label>
                        <textarea id="member-message-body" value={messageForm.body} onChange={(event) => setMessageForm((prev) => ({ ...prev, body: event.target.value }))} rows={5} className="w-full resize-none border-b border-white/10 bg-transparent py-3 text-white placeholder-white/20 focus:border-white focus:outline-none focus:ring-0 transition-all" placeholder="Write your message here..." />
                      </div>
                      <button type="button" onClick={handleSendMessage} disabled={!selectedRecipientId || !messageForm.subject || !messageForm.body} className="group relative mt-4 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100">
                        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                          <div className="relative h-full w-8 bg-black/10" />
                        </div>
                        <Mail size={16} />
                        {copy.send}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {activeTab === 'inbox' ? (
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-wide text-white">{copy.inboxTitle}</h2>
            <p className="text-[#A7A7AB] max-w-lg mx-auto">{copy.inboxText}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
            <h3 className="mb-6 flex items-center gap-3 text-xl font-bold tracking-wide text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"><CheckCircle2 size={16} /></span>
              {copy.adminInbox}
            </h3>
            
            {reservationInbox.length === 0 ? (
              <div className="rounded-2xl border border-white/5 bg-black/20 py-12 text-center text-[#A7A7AB]">
                <Mail size={32} className="mx-auto mb-4 opacity-20" />
                {copy.noAdminMessages}
              </div>
            ) : (
              <div className="space-y-4">
                {reservationInbox.map((message) => (
                  <div key={message.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 transition-all hover:bg-white/[0.04]">
                    <div className="absolute left-0 top-0 h-full w-1 bg-[#D61C1C]/50 opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
                      <p className="text-lg font-semibold tracking-wide text-white">{message.subject}</p>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-[#A7A7AB]">
                        {new Date(message.createdAt).toLocaleString(language === 'nl' ? 'nl-NL' : language === 'de' ? 'de-DE' : 'en-GB', { 
                          day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="mb-4 inline-block rounded border border-[#D61C1C]/20 bg-[#D61C1C]/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-[#D61C1C]">
                      {message.eventLabel}
                    </p>
                    <p className="whitespace-pre-line leading-relaxed text-[#A7A7AB]">{message.body}</p>
                    {message.paymentLink ? (
                      <a href={message.paymentLink} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-105">
                        <Mail size={16} />
                        Open betaallink
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
            <h3 className="mb-6 flex items-center gap-3 text-xl font-bold tracking-wide text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"><Users size={16} /></span>
              {copy.memberInbox}
            </h3>
            
            {directInbox.length === 0 ? (
              <div className="rounded-2xl border border-white/5 bg-black/20 py-12 text-center text-[#A7A7AB]">
                <Mail size={32} className="mx-auto mb-4 opacity-20" />
                {copy.noMemberMessages}
              </div>
            ) : (
              <div className="space-y-4">
                {directInbox.map((message) => {
                  const outgoing = message.senderId === currentProfile.id;
                  return (
                    <div key={message.id} className="group rounded-2xl border border-white/10 bg-black/40 p-6 transition-all hover:bg-white/[0.04]">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-wider text-white">
                            {outgoing ? `Naar ${message.recipientName}` : `Van ${message.senderName}`}
                          </span>
                          <p className="font-semibold tracking-wide text-white">{message.subject}</p>
                        </div>
                        <span className="text-xs text-[#A7A7AB]">
                          {new Date(message.createdAt).toLocaleString(language === 'nl' ? 'nl-NL' : language === 'de' ? 'de-DE' : 'en-GB', {
                            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="rounded-xl bg-white/[0.02] p-5 border border-white/5">
                        <p className="whitespace-pre-line leading-relaxed text-[#D7D7DC]">{message.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : null}

      <div className="mt-12 text-center">
        <Link to="/evenementen" className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-[#A7A7AB] transition-colors hover:text-white">
          <Sparkles size={16} className="text-[#D61C1C] transition-transform group-hover:scale-125" />
          {copy.exploreNights}
          <span className="block h-[1px] w-0 bg-white transition-all group-hover:w-full"></span>
        </Link>
      </div>
    </div>
  );
};

export default MemberSpace;
