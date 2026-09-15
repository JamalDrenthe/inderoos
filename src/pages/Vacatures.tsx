import { useState } from 'react';
import { BriefcaseBusiness, Code2, HeartHandshake, Sparkles } from 'lucide-react';
import VacancyOverlay, { type VacancyOverlayData } from '../components/VacancyOverlay';
import { useLanguage } from '../context/useLanguage';

type VacancyCategory = 'core' | 'tech' | 'midlance';

interface VacancyRole {
  id: string;
  title: string;
  category: VacancyCategory;
  salary?: string;
  hours?: string;
  employmentType?: string;
}

const coreRoles: VacancyRole[] = [
  { id: 'masseuse', title: 'Masseur / Masseuse', category: 'core', salary: '€ 3.000 - € 5.000', hours: '32 - 40 uur' },
  { id: 'spiced-content-creators', title: 'Spiced Content Creators', category: 'core', salary: '€ 3.000 - € 5.000' },
  { id: 'content-creators', title: 'Content Creators', category: 'core', salary: '€ 3.000 - € 5.000' },
  { id: 'webcammer', title: 'Webcammer', category: 'core', salary: '€ 3.000 - € 5.000' },
  { id: 'hostess-host', title: 'Hostess / Host', category: 'core', salary: '€ 2.000 - € 3.000' },
  { id: 'event-manager', title: 'Event Manager', category: 'core', salary: '€ 3.000 - € 5.000' },
  { id: 'project-leider', title: 'Project Leider', category: 'core', salary: '€ 3.000 - € 5.000' },
  { id: 'fb-manager', title: 'F & B Manager', category: 'core', salary: '€ 3.000 - € 5.000' },
  { id: 'it-servicedesk', title: 'IT servicedesk', category: 'core', salary: '€ 3.000 - € 5.000' },
  { id: 'bedieningsmedewerker', title: 'Bedieningsmedewerker', category: 'core', salary: '€ 3.000 - € 5.000' },
  { id: 'chauffeurs', title: 'Chauffeurs', category: 'core', salary: '€ 3.000 - € 5.000' },
  { id: 'administratief-medewerker', title: 'Administratief medewerker', category: 'core', salary: '€ 3.000 - € 5.000' },
  { id: 'recruiter', title: 'Recruiter', category: 'core', salary: '€ 3.000 - € 5.000' },
];

const techRoles: VacancyRole[] = [
  { id: 'ai-engineer-data-scientist', title: 'AI Engineer - Data Scientist', category: 'tech' },
  { id: 'fullstack-developer', title: 'Fullstack Developer', category: 'tech' },
  { id: 'devops-engineer', title: 'DevOps Engineer', category: 'tech' },
  { id: 'cloud-engineer', title: 'Cloud Engineer', category: 'tech' },
  { id: 'cyber-security-analyst', title: 'Cyber Security Analyst', category: 'tech' },
  { id: 'business-developer', title: 'Business Developer', category: 'tech' },
  { id: 'sales-developer', title: 'Sales Developer', category: 'tech' },
  { id: 'consultant', title: 'Consultant', category: 'tech' },
  { id: 'data-engineer', title: 'Data Engineer', category: 'tech' },
  { id: 'ui-ux-designer', title: 'UI/UX Designer', category: 'tech' },
  { id: 'marketing-developer', title: 'Marketing Developer', category: 'tech' },
  { id: 'hr-professional', title: 'HR professional', category: 'tech' },
  { id: 'online-remote-sales-closer', title: 'Online Remote Sales Closer', category: 'tech' },
  { id: 'senior-affiliated-marketeer', title: 'Senior Affiliated Marketeer', category: 'tech' },
];

const midlanceRoles: VacancyRole[] = [
  { id: 'mistress', title: 'Mistress', category: 'midlance', salary: '€ 2.000' },
  { id: 'cuckold', title: 'Cuckold', category: 'midlance', salary: '€ 2.000' },
  { id: 'sub', title: 'Sub', category: 'midlance', salary: '€ 2.000' },
  { id: 'dom', title: 'Dom', category: 'midlance', salary: '€ 2.000' },
  { id: 'dvp', title: 'DVP', category: 'midlance', salary: '€ 2.000' },
  { id: 'danseressen', title: 'Danseressen', category: 'midlance', salary: '€ 2.000' },
  { id: 'beveiliger', title: 'Beveiliger', category: 'midlance', salary: '€ 2.000' },
];

const Vacatures = () => {
  const { language } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<VacancyRole | null>(null);

  const content = {
    nl: {
      badge: 'VACATURES',
      title: 'We bouwen aan nachten die blijven hangen.',
      intro:
        'In De Roos groeit. Daarom zoeken we mensen die service, spanning, discretie, creativiteit en operatie samen snappen. Van hospitality tot engineering en van creators tot midlance-profielen.',
      teamTitle: 'Hospitality, operatie & creators',
      techTitle: 'Digital, growth & techniek',
      midlanceTitle: 'Midlance',
      overlayBadge: 'VACATURE OVERLAY',
      salaryLabel: 'Indicatie',
      salaryFallback: 'Marktconform salaris',
      hoursLabel: 'Uren',
      hoursFallback: 'In overleg',
      employmentLabel: 'Samenwerking',
      employmentValues: {
        core: 'Parttime of fulltime',
        tech: 'Fulltime, hybride of remote in overleg',
        midlance: 'Projectbasis of flexibele inzet',
      },
      categoryLabels: {
        core: 'Hospitality, operatie & creators',
        tech: 'Digital, growth & techniek',
        midlance: 'Midlance',
      },
      viewRoleLabel: 'Bekijk vacature',
      summaryTitle: 'Rolprofiel',
      responsibilitiesTitle: 'Wat je gaat doen',
      expectationsTitle: 'Wat we in jou zoeken',
      offerTitle: 'Wat je van ons krijgt',
      summaryByCategory: {
        core: (title: string) => `Als ${title} zorg je voor rust, stijl en timing in een omgeving waar gastvrijheid en discretie tegelijk voelbaar moeten zijn.`,
        tech: (title: string) => `Als ${title} bouw je mee aan het digitale fundament achter een merk dat privacy, beleving en groei serieus neemt.`,
        midlance: (title: string) => `Als ${title} breng je presence, professionaliteit en duidelijke afstemming naar gecureerde avonden en trajecten.`,
      },
      responsibilitiesByCategory: {
        core: [
          'Je bewaakt kwaliteit, service en presentatie in elk contactmoment.',
          'Je stemt strak af met hosts, productie en operatie rond timing en discretie.',
          'Je leest de ruimte snel en handelt kalm, verzorgd en zelfstandig.',
        ],
        tech: [
          'Je vertaalt ambities naar schaalbare digitale oplossingen en heldere workflows.',
          'Je werkt met focus op performance, privacy, betrouwbaarheid en merkconsistentie.',
          'Je schakelt soepel met operatie, marketing en founders om snelheid te houden.',
        ],
        midlance: [
          'Je komt professioneel, discreet en stabiel opdagen binnen een duidelijke setting.',
          'Je respecteert grenzen, consent en briefing zonder de energie van de avond te verliezen.',
          'Je draagt actief bij aan sfeer, veiligheid en de juiste dynamiek op locatie.',
        ],
      },
      expectationsByCategory: {
        core: [
          'Je hebt gevoel voor service, uitstraling en volwassen communicatie.',
          'Je blijft rustig onder druk en begrijpt wanneer discretie voorrang heeft.',
          'Je kunt zelfstandig werken en tegelijk zacht maar strak samenwerken.',
        ],
        tech: [
          'Je denkt analytisch, werkt gestructureerd en levert graag zichtbaar resultaat.',
          'Je begrijpt security, privacy en gebruikerservaring als één geheel.',
          'Je vindt het prettig om verantwoordelijkheid te nemen in een merk dat nog groeit.',
        ],
        midlance: [
          'Je bent representatief, betrouwbaar en duidelijk in afstemming vooraf.',
          'Je kent je grenzen, bewaakt ze helder en respecteert die van anderen even sterk.',
          'Je begrijpt dat presence, timing en discretie samen de kwaliteit bepalen.',
        ],
      },
      offerByCategory: {
        core: [
          'Een merk met karakter, ambitie en ruimte voor initiatief.',
          'Discreet contact, duidelijke lijnen en snelle terugkoppeling.',
          'Werk in een omgeving waar hospitality, events en creativiteit samenkomen.',
        ],
        tech: [
          'Veel ruimte om architectuur, processen en groei mee vorm te geven.',
          'Directe impact op product, operaties en merkbeleving.',
          'Samenwerking in een ambitieuze context waar snelheid en kwaliteit tellen.',
        ],
        midlance: [
          'Heldere briefing, respectvolle screening en zorgvuldige afstemming.',
          'Een setting waarin energie, veiligheid en professionaliteit serieus worden genomen.',
          'Een merkcontext met luxe, mysterie en duidelijke grenzen.',
        ],
      },
      directApplyTitle: 'Direct reageren',
      processNote: (title: string) => `Wil je reageren op ${title}? Stuur je motivatie, beschikbaarheid, relevante ervaring en eventuele portfolio of socials. We reageren discreet en snel.`,
      ctaLabel: 'Solliciteer direct',
      secondaryLabel: 'Naar contact',
      secondaryPath: '/contact',
      mailSubjectPrefix: 'Vacature',
      mailBody: (title: string) => `Hallo In De Roos,\n\nGraag reageer ik op de rol ${title}.\n\nMotivatie:\nBeschikbaarheid:\nErvaring:\n\nMet vriendelijke groet,`,
      applyTitle: 'Solliciteren',
      applyText: 'Stuur je rol, motivatie, beschikbaarheid en relevante ervaring naar hello@inderoos.nl. We reageren discreet en snel terug.',
      mailLabel: 'Mail direct',
      promiseTitle: 'Wat je van ons mag verwachten',
      promiseItems: [
        'Een merk in opbouw met ruimte voor initiatief.',
        'Discretie, snelheid en heldere lijnen in communicatie.',
        'Werk binnen hospitality, events en digital met een eigen signatuur.',
      ],
    },
    en: {
      badge: 'CAREERS',
      title: 'We are building nights that linger.',
      intro:
        'In De Roos is growing. We are looking for people who understand service, tension, discretion, creativity, and operations at the same time. From hospitality to engineering and from creators to midlance profiles.',
      teamTitle: 'Hospitality, operations & creators',
      techTitle: 'Digital, growth & tech',
      midlanceTitle: 'Midlance',
      overlayBadge: 'ROLE OVERLAY',
      salaryLabel: 'Range',
      salaryFallback: 'Market-competitive compensation',
      hoursLabel: 'Hours',
      hoursFallback: 'To be agreed',
      employmentLabel: 'Engagement',
      employmentValues: {
        core: 'Part-time or full-time',
        tech: 'Full-time, hybrid or remote by agreement',
        midlance: 'Project-based or flexible deployment',
      },
      categoryLabels: {
        core: 'Hospitality, operations & creators',
        tech: 'Digital, growth & tech',
        midlance: 'Midlance',
      },
      viewRoleLabel: 'View role',
      summaryTitle: 'Role profile',
      responsibilitiesTitle: 'What you will do',
      expectationsTitle: 'What we look for',
      offerTitle: 'What you get from us',
      summaryByCategory: {
        core: (title: string) => `As ${title}, you bring calm, style, and timing into an environment where hospitality and discretion must be felt at once.`,
        tech: (title: string) => `As ${title}, you help build the digital foundation behind a brand that takes privacy, experience, and growth seriously.`,
        midlance: (title: string) => `As ${title}, you bring presence, professionalism, and clear alignment into curated nights and carefully hosted trajectories.`,
      },
      responsibilitiesByCategory: {
        core: [
          'You guard quality, service, and presentation across every touchpoint.',
          'You coordinate tightly with hosts, production, and operations around timing and discretion.',
          'You read the room quickly and act with calm, polish, and independence.',
        ],
        tech: [
          'You translate ambition into scalable digital solutions and clear workflows.',
          'You work with a strong focus on performance, privacy, reliability, and brand consistency.',
          'You collaborate smoothly with operations, marketing, and founders to keep momentum high.',
        ],
        midlance: [
          'You show up professionally, discreetly, and steadily within a clearly framed setting.',
          'You respect boundaries, consent, and briefing without flattening the energy of the night.',
          'You actively contribute to atmosphere, safety, and the right dynamic on location.',
        ],
      },
      expectationsByCategory: {
        core: [
          'You understand service, presence, and mature communication.',
          'You stay composed under pressure and know when discretion comes first.',
          'You work independently while still moving elegantly with the wider team.',
        ],
        tech: [
          'You think analytically, work in structure, and like delivering visible progress.',
          'You understand security, privacy, and user experience as one connected whole.',
          'You are comfortable taking ownership inside a brand that is still expanding.',
        ],
        midlance: [
          'You are representative, reliable, and clear in alignment before the assignment.',
          'You know your boundaries, communicate them well, and respect those of others just as strongly.',
          'You understand that presence, timing, and discretion define quality together.',
        ],
      },
      offerByCategory: {
        core: [
          'A brand with character, ambition, and room for initiative.',
          'Discreet contact, clear lines, and quick response times.',
          'Work in an environment where hospitality, events, and creativity meet.',
        ],
        tech: [
          'Room to shape architecture, workflows, and growth direction.',
          'Direct impact on product, operations, and brand experience.',
          'A high-trust environment where quality and speed both matter.',
        ],
        midlance: [
          'Clear briefing, respectful screening, and careful alignment.',
          'A setting where energy, safety, and professionalism are taken seriously.',
          'A brand context built on luxury, mystery, and clear boundaries.',
        ],
      },
      directApplyTitle: 'Apply directly',
      processNote: (title: string) => `Interested in ${title}? Send your motivation, availability, relevant experience, and any portfolio or socials. We reply discreetly and quickly.`,
      ctaLabel: 'Apply now',
      secondaryLabel: 'Go to contact',
      secondaryPath: '/contact',
      mailSubjectPrefix: 'Application',
      mailBody: (title: string) => `Hello In De Roos,\n\nI would like to apply for the role ${title}.\n\nMotivation:\nAvailability:\nExperience:\n\nKind regards,`,
      applyTitle: 'Apply',
      applyText: 'Send your preferred role, motivation, availability, and relevant experience to hello@inderoos.nl. We respond discreetly and fast.',
      mailLabel: 'Mail now',
      promiseTitle: 'What you can expect from us',
      promiseItems: [
        'A growing brand with room for initiative.',
        'Discretion, speed, and clear communication.',
        'Work across hospitality, events, and digital with a distinct signature.',
      ],
    },
    de: {
      badge: 'JOBS',
      title: 'Wir bauen Nächte, die nachwirken.',
      intro:
        'In De Roos wächst. Deshalb suchen wir Menschen, die Service, Spannung, Diskretion, Kreativität und Operatives zusammen verstehen. Von Hospitality bis Engineering und von Creators bis Midlance-Profilen.',
      teamTitle: 'Hospitality, Operations & Creators',
      techTitle: 'Digital, Growth & Tech',
      midlanceTitle: 'Midlance',
      overlayBadge: 'ROLLE OVERLAY',
      salaryLabel: 'Spanne',
      salaryFallback: 'Marktgerechtes Gehalt',
      hoursLabel: 'Stunden',
      hoursFallback: 'Nach Absprache',
      employmentLabel: 'Zusammenarbeit',
      employmentValues: {
        core: 'Teilzeit oder Vollzeit',
        tech: 'Vollzeit, hybrid oder remote nach Absprache',
        midlance: 'Projektbasis oder flexible Einsätze',
      },
      categoryLabels: {
        core: 'Hospitality, Operations & Creators',
        tech: 'Digital, Growth & Tech',
        midlance: 'Midlance',
      },
      viewRoleLabel: 'Rolle ansehen',
      summaryTitle: 'Rollenprofil',
      responsibilitiesTitle: 'Was du tun wirst',
      expectationsTitle: 'Wen wir suchen',
      offerTitle: 'Was du von uns bekommst',
      summaryByCategory: {
        core: (title: string) => `Als ${title} bringst du Ruhe, Stil und Timing in ein Umfeld, in dem Hospitality und Diskretion gleichzeitig spürbar sein müssen.`,
        tech: (title: string) => `Als ${title} baust du am digitalen Fundament einer Brand mit, die Privatsphäre, Erlebnis und Wachstum ernst nimmt.`,
        midlance: (title: string) => `Als ${title} bringst du Präsenz, Professionalität und klare Abstimmung in kuratierte Nächte und sorgfältig geführte Settings.`,
      },
      responsibilitiesByCategory: {
        core: [
          'Du sicherst Qualität, Service und Präsentation in jedem Kontaktmoment.',
          'Du stimmst dich eng mit Hosts, Produktion und Operations rund um Timing und Diskretion ab.',
          'Du liest den Raum schnell und handelst ruhig, gepflegt und eigenständig.',
        ],
        tech: [
          'Du übersetzt Ambitionen in skalierbare digitale Lösungen und klare Workflows.',
          'Du arbeitest mit Fokus auf Performance, Privatsphäre, Zuverlässigkeit und Markenkonsistenz.',
          'Du arbeitest flüssig mit Operations, Marketing und Founders zusammen, um Tempo zu halten.',
        ],
        midlance: [
          'Du erscheinst professionell, diskret und stabil innerhalb eines klar gesetzten Rahmens.',
          'Du respektierst Grenzen, Consent und Briefing, ohne die Energie des Abends zu verlieren.',
          'Du trägst aktiv zu Atmosphäre, Sicherheit und der richtigen Dynamik vor Ort bei.',
        ],
      },
      expectationsByCategory: {
        core: [
          'Du hast ein Gefühl für Service, Präsenz und erwachsene Kommunikation.',
          'Du bleibst unter Druck ruhig und weißt, wann Diskretion Vorrang hat.',
          'Du arbeitest selbstständig und gleichzeitig elegant im Team.',
        ],
        tech: [
          'Du denkst analytisch, arbeitest strukturiert und lieferst gern sichtbare Fortschritte.',
          'Du verstehst Security, Privacy und User Experience als zusammenhängendes Ganzes.',
          'Du übernimmst gern Verantwortung in einer Brand, die noch wächst.',
        ],
        midlance: [
          'Du bist repräsentativ, zuverlässig und klar in der Abstimmung vorab.',
          'Du kennst deine Grenzen, kommunizierst sie sauber und respektierst die Grenzen anderer genauso.',
          'Du verstehst, dass Präsenz, Timing und Diskretion gemeinsam Qualität erzeugen.',
        ],
      },
      offerByCategory: {
        core: [
          'Eine Brand mit Charakter, Ambition und Raum für Eigeninitiative.',
          'Diskreter Kontakt, klare Linien und schnelle Rückmeldungen.',
          'Arbeit in einem Umfeld, in dem Hospitality, Events und Kreativität zusammenkommen.',
        ],
        tech: [
          'Raum, Architektur, Workflows und Wachstumsrichtung mitzugestalten.',
          'Direkten Einfluss auf Produkt, Operations und Brand Experience.',
          'Ein Umfeld mit Vertrauen, in dem Qualität und Tempo gleichermaßen zählen.',
        ],
        midlance: [
          'Klares Briefing, respektvolles Screening und sorgfältige Abstimmung.',
          'Ein Setting, in dem Energie, Sicherheit und Professionalität ernst genommen werden.',
          'Ein Markenkontext aus Luxus, Mysterium und klaren Grenzen.',
        ],
      },
      directApplyTitle: 'Direkt bewerben',
      processNote: (title: string) => `Interesse an ${title}? Sende deine Motivation, Verfügbarkeit, relevante Erfahrung und ggf. Portfolio oder Socials. Wir antworten diskret und schnell.`,
      ctaLabel: 'Jetzt bewerben',
      secondaryLabel: 'Zur Kontaktseite',
      secondaryPath: '/contact',
      mailSubjectPrefix: 'Bewerbung',
      mailBody: (title: string) => `Hallo In De Roos,\n\nIch möchte mich gern auf die Rolle ${title} bewerben.\n\nMotivation:\nVerfügbarkeit:\nErfahrung:\n\nViele Grüße,`,
      applyTitle: 'Bewerben',
      applyText: 'Sende deine Wunschrolle, Motivation, Verfügbarkeit und relevante Erfahrung an hello@inderoos.nl. Wir antworten diskret und schnell.',
      mailLabel: 'Direkt mailen',
      promiseTitle: 'Was du von uns erwarten kannst',
      promiseItems: [
        'Eine wachsende Brand mit Raum für Eigeninitiative.',
        'Diskretion, Tempo und klare Kommunikation.',
        'Arbeit in Hospitality, Events und Digital mit eigener Signatur.',
      ],
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;

  const getRoleSalary = (role: VacancyRole) => role.salary || copy.salaryFallback;
  const getRoleHours = (role: VacancyRole) => role.hours || copy.hoursFallback;
  const getEmploymentValue = (role: VacancyRole) => role.employmentType || copy.employmentValues[role.category];

  const buildOverlayData = (role: VacancyRole): VacancyOverlayData => ({
    id: role.id,
    badge: copy.overlayBadge,
    title: role.title,
    categoryLabel: copy.categoryLabels[role.category],
    summaryTitle: copy.summaryTitle,
    summaryText: copy.summaryByCategory[role.category](role.title),
    salaryLabel: copy.salaryLabel,
    salaryValue: getRoleSalary(role),
    hoursLabel: copy.hoursLabel,
    hoursValue: getRoleHours(role),
    employmentLabel: copy.employmentLabel,
    employmentValue: getEmploymentValue(role),
    responsibilitiesTitle: copy.responsibilitiesTitle,
    responsibilities: copy.responsibilitiesByCategory[role.category],
    expectationsTitle: copy.expectationsTitle,
    expectations: copy.expectationsByCategory[role.category],
    offerTitle: copy.offerTitle,
    offer: copy.offerByCategory[role.category],
    applyTitle: copy.directApplyTitle,
    processNote: copy.processNote(role.title),
    ctaLabel: copy.ctaLabel,
    secondaryLabel: copy.secondaryLabel,
    secondaryPath: copy.secondaryPath,
    mailHref: `mailto:hello@inderoos.nl?subject=${encodeURIComponent(`${copy.mailSubjectPrefix}: ${role.title}`)}&body=${encodeURIComponent(copy.mailBody(role.title))}`,
  });

  const renderRoleCard = (role: VacancyRole) => (
    <div key={role.id} className="rounded-3xl border border-white/8 bg-white/[0.03] p-5">
      <h3 className="mb-3 text-xl font-semibold text-white">{role.title}</h3>
      <div className="space-y-2 text-sm text-[#C5C5CC]">
        <p>
          <span className="font-medium text-white">{copy.salaryLabel}:</span> {getRoleSalary(role)}
        </p>
        <p>
          <span className="font-medium text-white">{copy.hoursLabel}:</span> {getRoleHours(role)}
        </p>
        <p>
          <span className="font-medium text-white">{copy.employmentLabel}:</span> {getEmploymentValue(role)}
        </p>
      </div>
      <button type="button" onClick={() => setSelectedRole(role)} className="btn-secondary mt-5 w-full">
        {copy.viewRoleLabel}
      </button>
    </div>
  );

  return (
    <>
      <div className="min-h-screen px-6 pb-16 pt-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <section className="mb-12 max-w-4xl">
            <span className="mono mb-4 block text-[#D61C1C]">{copy.badge}</span>
            <h1 className="mb-5 text-4xl font-black text-white md:text-6xl">{copy.title}</h1>
            <p className="text-lg leading-relaxed text-[#A7A7AB]">{copy.intro}</p>
          </section>

          <section className="mb-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="card-dark p-8">
                <div className="mb-5 flex items-center gap-3">
                  <HeartHandshake size={18} className="text-[#D61C1C]" />
                  <h2 className="text-2xl font-bold text-white">{copy.teamTitle}</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {coreRoles.map(renderRoleCard)}
                </div>
              </div>

              <div className="card-dark p-8">
                <div className="mb-5 flex items-center gap-3">
                  <Code2 size={18} className="text-[#D61C1C]" />
                  <h2 className="text-2xl font-bold text-white">{copy.techTitle}</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {techRoles.map(renderRoleCard)}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="card-dark bg-[linear-gradient(180deg,rgba(214,28,28,0.14),rgba(20,20,22,0.82))] p-8">
                <div className="mb-5 flex items-center gap-3">
                  <Sparkles size={18} className="text-[#D61C1C]" />
                  <h2 className="text-2xl font-bold text-white">{copy.midlanceTitle}</h2>
                </div>
                <div className="space-y-4">
                  {midlanceRoles.map(renderRoleCard)}
                </div>
              </div>

              <div className="card-dark p-8">
                <div className="mb-5 flex items-center gap-3">
                  <BriefcaseBusiness size={18} className="text-[#D61C1C]" />
                  <h2 className="text-2xl font-bold text-white">{copy.applyTitle}</h2>
                </div>
                <p className="mb-6 leading-relaxed text-[#C5C5CC]">{copy.applyText}</p>
                <a href="mailto:hello@inderoos.nl?subject=Vacature%20In%20De%20Roos" className="btn-primary inline-flex items-center justify-center">
                  {copy.mailLabel}
                </a>
              </div>

              <div className="card-dark p-8">
                <h2 className="mb-5 text-2xl font-bold text-white">{copy.promiseTitle}</h2>
                <div className="space-y-4">
                  {copy.promiseItems.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                      <p className="text-[#E4E4E9]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <VacancyOverlay
        open={Boolean(selectedRole)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedRole(null);
          }
        }}
        vacancy={selectedRole ? buildOverlayData(selectedRole) : null}
      />
    </>
  );
};

export default Vacatures;
