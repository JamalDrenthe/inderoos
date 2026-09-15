import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowRight, CalendarDays, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import EventOverlay, { type OverlayEvent } from '../components/EventOverlay';
import { useLanguage } from '../context/useLanguage';
import { getLocalizedWeekenders } from '../lib/siteData';

const HomeV3 = () => {
  const { language } = useLanguage();
  const upcomingWeekenders = getLocalizedWeekenders(language).slice(0, 6);
  const [selectedEvent, setSelectedEvent] = useState<OverlayEvent | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const content = {
    nl: {
      heroBadge: 'BESLOTEN NACHTEN',
      heroTitle: 'Nog voor de deur opengaat, voel je de belofte van de nacht.',
      heroText:
        'In De Roos is geen plek voor haast of oppervlakkigheid. Jij stapt een wereld binnen van fluweelzachte spanning, verfijnde service en zorgvuldig gecureerde ontmoetingen op verborgen locaties in Amsterdam. Alles draait om verlangen, discretie en de zeldzame luxe om je volledig aan de nacht over te geven.',
      primaryCta: 'Ontdek de nachten',
      secondaryCta: 'Bekijk prijzen',
      promises: [
        'Hosts die de sfeer bewaken.',
        'Adres pas op eventdag.',
        'Voorrang voor returning guests.',
      ],
      weekLabel: 'WEEK',
      teaserLabel: 'KOMENDE NACHTEN',
      teaserTitle: 'Kies de nacht die het langst in je hoofd blijft hangen.',
      teaserText:
        'Elke avond draagt haar eigen ritme, spanning en aantrekkingskracht. Laat je verleiden door de sfeer die jou roept, lees tussen de regels door en reserveer jouw moment achter gesloten deuren.',
      openOverlay: 'Ontdek de sfeer, timing en details',
      guideLabel: 'VERKEN DE WERELD',
      guideTitle: 'Alles wat je nodig hebt om met vertrouwen binnen te stappen.',
      guideCards: [
        {
          title: 'Dames & Heren',
          text: 'Ontdek de energie, chemie en aantrekkingskracht van de gasten die onze nachten hun karakter geven.',
          path: '/dames-heren',
          cta: 'Bekijk profielen',
        },
        {
          title: 'Boutique',
          text: 'Ontdek gecureerde lingerie, olie, tea en discrete extra’s die de spanning voor en na de nacht verder openen.',
          path: '/shop',
          cta: 'Bekijk boutique',
        },
        {
          title: 'Nachten',
          text: 'Zie welke nachten binnenkort openen en kies de setting, energie en timing die het sterkst naar je toe trekt.',
          path: '/evenementen',
          cta: 'Bekijk nachten',
        },
        {
          title: 'Vacatures',
          text: 'Voor persoonlijkheden met flair, rust en gevoel voor hospitality op het hoogste niveau.',
          path: '/vacatures',
          cta: 'Bekijk vacatures',
        },
      ],
      finalLabel: 'PRIJZEN & TOEGANG',
      finalTitle: 'Toegang begint met de juiste timing.',
      finalText:
        'Hier vind je helderheid over tickets, memberships en aanvraagroutes, zonder dat de spanning van de nacht verloren gaat. Eerst de verleiding, daarna de details.',
      finalPrimary: 'Bekijk prijzen',
      finalSecondary: 'Vraag toegang aan',
    },
    en: {
      heroBadge: 'PRIVATE NIGHTS',
      heroTitle: 'Before the door opens, you can already feel the promise of the night.',
      heroText:
        'In De Roos is not made for haste or the ordinary. You step into a world of velvet tension, refined service, and carefully curated encounters at hidden venues across Amsterdam. Everything revolves around desire, discretion, and the rare luxury of giving yourself fully to the night.',
      primaryCta: 'Discover the nights',
      secondaryCta: 'View pricing',
      promises: [
        'Hosts who protect the atmosphere.',
        'Address shared on the day of the event.',
        'Priority for returning guests.',
      ],
      weekLabel: 'WEEK',
      teaserLabel: 'UPCOMING NIGHTS',
      teaserTitle: 'Choose the night that lingers in your mind the longest.',
      teaserText:
        'Each evening carries its own rhythm, tension, and allure. Let yourself be drawn to the atmosphere that calls you, read between the lines, and reserve your moment behind closed doors.',
      openOverlay: 'Explore the mood, timing, and details',
      guideLabel: 'EXPLORE THE WORLD',
      guideTitle: 'Everything you need to step inside with confidence.',
      guideCards: [
        {
          title: 'Ladies & Gentlemen',
          text: 'Discover the energy, chemistry, and allure of the guests who give our nights their character.',
          path: '/dames-heren',
          cta: 'View profiles',
        },
        {
          title: 'Boutique',
          text: 'Discover curated lingerie, oils, tea, and discreet extras that deepen the tension before and after the night.',
          path: '/shop',
          cta: 'View boutique',
        },
        {
          title: 'Nights',
          text: 'See which nights are opening soon and choose the setting, rhythm, and timing that pull you in most strongly.',
          path: '/evenementen',
          cta: 'View nights',
        },
        {
          title: 'Careers',
          text: 'For personalities with poise, calm confidence, and an instinct for hospitality at the highest level.',
          path: '/vacatures',
          cta: 'View careers',
        },
      ],
      finalLabel: 'PRICING & ACCESS',
      finalTitle: 'Access begins with perfect timing.',
      finalText:
        'Here you will find clarity on tickets, memberships, and request flows without losing the tension that makes the night irresistible. First the seduction, then the details.',
      finalPrimary: 'View pricing',
      finalSecondary: 'Request access',
    },
    de: {
      heroBadge: 'PRIVATE NÄCHTE',
      heroTitle: 'Noch bevor sich die Tür öffnet, spürst du das Versprechen der Nacht.',
      heroText:
        'In De Roos ist kein Ort für Eile oder das Gewöhnliche. Du betrittst eine Welt aus samtiger Spannung, kultiviertem Service und sorgfältig kuratierten Begegnungen an verborgenen Orten in Amsterdam. Alles kreist um Verlangen, Diskretion und den seltenen Luxus, dich ganz der Nacht hinzugeben.',
      primaryCta: 'Nächte entdecken',
      secondaryCta: 'Preise ansehen',
      promises: [
        'Hosts, die die Atmosphäre bewahren.',
        'Adresse erst am Veranstaltungstag.',
        'Vorrang für wiederkehrende Gäste.',
      ],
      weekLabel: 'WOCHE',
      teaserLabel: 'KOMMENDE NÄCHTE',
      teaserTitle: 'Wähle die Nacht, die dir am längsten im Kopf bleibt.',
      teaserText:
        'Jeder Abend trägt seinen eigenen Rhythmus, seine eigene Spannung und Anziehungskraft. Lass dich von der Atmosphäre anziehen, die dich ruft, lies zwischen den Zeilen und sichere dir deinen Moment hinter verschlossenen Türen.',
      openOverlay: 'Stimmung, Timing und Details entdecken',
      guideLabel: 'ENTDECKE DIE WELT',
      guideTitle: 'Alles, was du brauchst, um mit Selbstvertrauen einzutreten.',
      guideCards: [
        {
          title: 'Ladies & Gentlemen',
          text: 'Entdecke die Energie, Chemie und Anziehungskraft der Gäste, die unseren Nächten ihren Charakter geben.',
          path: '/dames-heren',
          cta: 'Profile ansehen',
        },
        {
          title: 'Boutique',
          text: 'Entdecke kuratierte Lingerie, Öle, Tee und diskrete Extras, die die Spannung vor und nach der Nacht weiter öffnen.',
          path: '/shop',
          cta: 'Boutique ansehen',
        },
        {
          title: 'Nächte',
          text: 'Sieh, welche Nächte sich bald öffnen, und wähle das Setting, den Rhythmus und das Timing, die dich am stärksten anziehen.',
          path: '/evenementen',
          cta: 'Nächte ansehen',
        },
        {
          title: 'Jobs',
          text: 'Für Persönlichkeiten mit Haltung, Ruhe und Gespür für Hospitality auf höchstem Niveau.',
          path: '/vacatures',
          cta: 'Jobs ansehen',
        },
      ],
      finalLabel: 'PREISE & ZUGANG',
      finalTitle: 'Zugang beginnt mit dem richtigen Timing.',
      finalText:
        'Hier findest du Klarheit zu Tickets, Memberships und Anfragen, ohne dass die Spannung der Nacht verloren geht. Zuerst die Verlockung, dann die Details.',
      finalPrimary: 'Zu den Preisen',
      finalSecondary: 'Zugang anfragen',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;
  const heroRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const heroBadgeWidth = `${copy.heroBadge.length + 1}ch`;
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bannerY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -64]);
  const bannerScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -28]);
  const collageY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 26]);
  const mainImageScale = useTransform(scrollYProgress, [0, 1], [1.04, shouldReduceMotion ? 1.04 : 1.16]);
  const secondaryImageScale = useTransform(scrollYProgress, [0, 1], [1.02, shouldReduceMotion ? 1.02 : 1.11]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.14]);

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.11,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  // Guide sectie (wordt niet meer gebruikt maar laten we staan in state)
  // const cardIcons = [Users, Sparkles, CalendarDays, BriefcaseBusiness] as const;

  const openOverlay = (event: OverlayEvent) => {
    setSelectedEvent(event);
    setOverlayOpen(true);
  };

  return (
    <div className="min-h-screen">
      <motion.section ref={heroRef} className="overflow-hidden relative px-6 pt-28 pb-24 lg:px-12 lg:pt-24">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,28,28,0.26),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_22%)]"
          style={shouldReduceMotion ? undefined : { opacity: overlayOpacity }}
        />
        <div className="relative z-10">
          <motion.div
            className="mx-auto mb-8 flex max-w-[96rem] justify-center lg:-mt-2"
            style={shouldReduceMotion ? undefined : { y: bannerY, scale: bannerScale }}
          >
            <motion.img
              src="/logos/Inderooslogogold1.png"
              alt="In De Roos"
              className="h-auto w-[90%] max-w-[85rem] object-contain cursor-pointer"
              animate={shouldReduceMotion ? undefined : {
                y: [0, -8, 0],
                filter: [
                  'drop-shadow(0 0 15px rgba(214, 28, 28, 0.4)) drop-shadow(0 0 30px rgba(255, 215, 0, 0.1))',
                  'drop-shadow(0 0 25px rgba(214, 28, 28, 0.6)) drop-shadow(0 0 45px rgba(255, 215, 0, 0.2))',
                  'drop-shadow(0 0 15px rgba(214, 28, 28, 0.4)) drop-shadow(0 0 30px rgba(255, 215, 0, 0.1))'
                ]
              }}
              transition={shouldReduceMotion ? undefined : {
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
              whileHover={shouldReduceMotion ? undefined : { 
                scale: 1.03,
                filter: 'drop-shadow(0 0 30px rgba(214, 28, 28, 0.8)) drop-shadow(0 0 60px rgba(255, 215, 0, 0.3))'
              }}
              whileTap={shouldReduceMotion ? undefined : { 
                scale: 0.97,
                filter: 'drop-shadow(0 0 15px rgba(214, 28, 28, 0.9)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))'
              }}
            />
          </motion.div>

          <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div
              variants={staggerVariants}
              initial="hidden"
              animate="show"
              style={shouldReduceMotion ? undefined : { y: textY }}
            >
              <motion.div variants={fadeUpVariants} className="inline-flex gap-3 items-center px-4 py-2 mb-5 rounded-full border backdrop-blur-md border-white/10 bg-black/20">
                <motion.span
                  key={copy.heroBadge}
                  className="mono inline-block overflow-hidden whitespace-nowrap text-[#D61C1C]"
                  initial={shouldReduceMotion ? { width: heroBadgeWidth } : { width: 0 }}
                  animate={{ width: heroBadgeWidth }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.15, delay: 0.2, ease: 'easeInOut' }}
                >
                  {copy.heroBadge}
                </motion.span>
                {shouldReduceMotion ? null : (
                  <motion.span
                    className="inline-block h-4 w-px bg-[#D61C1C]"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.95, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                  />
                )}
              </motion.div>

              <motion.h1 className="mb-6 max-w-5xl">
                {copy.heroTitle.split(" ").map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.12 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`inline-block mr-[0.25em] ${
                      index === 0 || index === 1 || index === 2
                        ? 'text-5xl font-black leading-none text-white md:text-7xl'
                        : index === 3 || index === 4
                        ? 'text-5xl font-light italic leading-none text-white/90 md:text-7xl'
                        : 'text-4xl font-medium leading-tight text-[#C7C7CD] md:text-6xl'
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p variants={fadeUpVariants} className="mb-8 max-w-2xl text-lg leading-relaxed text-[#C7C7CD] md:text-xl">
                {copy.heroText}
              </motion.p>

              <motion.div variants={fadeUpVariants} className="flex flex-col gap-4 mb-8 sm:flex-row">
                <motion.div whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}>
                  <Link to="/evenementen">
                    <button className="flex gap-2 items-center btn-primary">
                      {copy.primaryCta}
                      <ArrowRight size={18} />
                    </button>
                  </Link>
                </motion.div>
                <motion.div whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}>
                  <Link to="/prijzen">
                    <button className="btn-secondary">{copy.secondaryCta}</button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div className="grid gap-4 sm:grid-cols-2 lg:-mt-5" style={shouldReduceMotion ? undefined : { y: collageY }}>
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.015 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-[28px] border border-white/8 bg-[#111113] sm:row-span-2"
              >
                <motion.video 
                  src="/videos/Sora/video.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="object-cover w-full h-full" 
                  style={shouldReduceMotion ? undefined : { scale: mainImageScale }} 
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.08),rgba(11,11,12,0.82))] pointer-events-none" />
                {upcomingWeekenders[0] ? (
                  <motion.button
                    type="button"
                    onClick={() => openOverlay(upcomingWeekenders[0])}
                    whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                    className="absolute inset-x-4 bottom-4 rounded-3xl border border-white/10 bg-[#0B0B0C]/80 p-5 text-left backdrop-blur-md"
                  >
                    <p className="mono mb-2 text-[#D61C1C]">{copy.weekLabel} {upcomingWeekenders[0].weekNumber}</p>
                    <p className="mb-1 text-2xl font-bold text-white">{upcomingWeekenders[0].titleText}</p>
                    <p className="text-sm text-[#A7A7AB]">{copy.openOverlay}</p>
                  </motion.button>
                ) : null}
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.02 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[28px] border border-white/8 bg-[#111113]"
              >
                <motion.img src="/images/hero_couple_3.jpg" alt="In De Roos detail" className="object-cover w-full h-full" style={shouldReduceMotion ? undefined : { scale: secondaryImageScale }} />
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.02 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[28px] border border-white/8 bg-[#111113]"
              >
                <motion.img src="/images/hero_group_1.jpg" alt="In De Roos guests" className="object-cover w-full h-full" style={shouldReduceMotion ? undefined : { scale: secondaryImageScale }} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="px-6 pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={staggerVariants} className="mb-10 max-w-3xl">
            <motion.span variants={fadeUpVariants} className="mono mb-4 block text-[#D61C1C]">{copy.teaserLabel}</motion.span>
            <motion.h2 variants={fadeUpVariants} className="mb-4 text-4xl font-bold text-white md:text-5xl">{copy.teaserTitle}</motion.h2>
            <motion.p variants={fadeUpVariants} className="text-lg leading-relaxed text-[#A7A7AB]">{copy.teaserText}</motion.p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {upcomingWeekenders.map((weekender) => (
              <motion.button
                key={weekender.id}
                type="button"
                onClick={() => openOverlay(weekender)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUpVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -10, scale: 1.015 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                className="overflow-hidden text-left transition-transform card-dark"
              >
                <div className="overflow-hidden h-64">
                  <motion.img src={weekender.image} alt={weekender.titleText} className="object-cover w-full h-full" whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }} transition={{ duration: 0.5 }} />
                </div>
                <div className="p-6">
                  <div className="flex gap-3 justify-between items-center mb-3">
                    <span className="mono text-[#D61C1C]">{copy.weekLabel} {weekender.weekNumber}</span>
                    <span className="text-sm text-[#A7A7AB]">{weekender.seasonLabelText}</span>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">{weekender.titleText}</h3>
                  <p className="mb-4 text-sm text-[#A7A7AB]">{weekender.startLabelText || weekender.scheduleText}</p>
                  <p className="line-clamp-3 text-sm leading-relaxed text-[#D6D6DA]">{weekender.atmosphereText}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111113] px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={staggerVariants} className="mb-10 max-w-3xl">
            <motion.span variants={fadeUpVariants} className="mono mb-4 block text-[#D61C1C]">ACHTER DE DEUREN</motion.span>
            <motion.h2 variants={fadeUpVariants} className="mb-6 text-4xl font-bold text-white md:text-5xl">Meer dan een feest, een levensstijl.</motion.h2>
            <motion.p variants={fadeUpVariants} className="text-lg leading-relaxed text-[#A7A7AB]">
              In De Roos is ontstaan vanuit een verlangen naar iets echts. Geen massaproductie, geen oordelende blikken, maar een safe haven waar gelijkgestemden samenkomen. We cureren elke nacht zorgvuldig om de perfecte balans te garanderen. Ontdek ons verhaal, onze waarden en waarom we doen wat we doen.
            </motion.p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.22 }}
              variants={fadeUpVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.015 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
              className="overflow-hidden relative p-8 card-dark group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                <Sparkles size={120} />
              </div>
              <h3 className="relative z-10 mb-4 text-3xl font-bold text-white">Over Ons</h3>
              <p className="mb-8 text-lg leading-relaxed text-[#A7A7AB] relative z-10 min-h-[90px]">
                Lees meer over het ontstaan van In De Roos, de visie achter onze exclusieve nachten en de mensen die dit mogelijk maken.
              </p>
              <Link to="/over-ons" className="inline-flex items-center gap-3 font-bold text-[#D61C1C] uppercase tracking-widest text-sm relative z-10 transition-transform group-hover:translate-x-2">
                Lees ons verhaal
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.22 }}
              variants={fadeUpVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.015 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
              className="overflow-hidden relative p-8 card-dark group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                <Sparkles size={120} />
              </div>
              <h3 className="relative z-10 mb-4 text-3xl font-bold text-white">Missie & Visie</h3>
              <p className="mb-8 text-lg leading-relaxed text-[#A7A7AB] relative z-10 min-h-[90px]">
                Onze kernwaarden: discretie, respect en ultieme vrijheid. Ontdek waar we voor staan en wat je van ons kunt verwachten.
              </p>
              <Link to="/missie-visie" className="inline-flex items-center gap-3 font-bold text-[#D61C1C] uppercase tracking-widest text-sm relative z-10 transition-transform group-hover:translate-x-2">
                Onze filosofie
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(214,28,28,0.16),rgba(20,20,22,0.78))] p-8 md:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[#D61C1C]">
              <CalendarDays size={18} />
              <span className="mono">{copy.finalLabel}</span>
            </div>
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">{copy.finalTitle}</h2>
            <p className="max-w-3xl leading-relaxed text-[#ECECF0]">{copy.finalText}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link to="/prijzen">
              <button className="w-full btn-secondary">{copy.finalPrimary}</button>
            </Link>
            <Link to="/boeking">
              <button className="w-full btn-primary">{copy.finalSecondary}</button>
            </Link>
          </div>
        </div>
      </section>

      <EventOverlay event={selectedEvent} open={overlayOpen} onOpenChange={setOverlayOpen} />
    </div>
  );
};

export default HomeV3;
