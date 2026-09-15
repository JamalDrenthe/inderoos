import { CalendarDays, Sparkles } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/useLanguage';
import { defaultBlogPosts } from '../data/platformContent';
import type { BlogPost } from '../types';

const Blog = () => {
  const { language } = useLanguage();
  const [posts] = useLocalStorage<BlogPost[]>('blogPosts', defaultBlogPosts);

  const content = {
    nl: {
      badge: 'JOURNAL',
      title: 'Verhalen, rituelen en inzichten rond de nachten.',
      intro:
        'Niet alles hoeft direct op de vloer te gebeuren. Soms begint spanning in woorden, context en de manier waarop je een avond voorbereid benadert.',
      empty: 'Er zijn nog geen gepubliceerde blogposts.',
      dateLabel: 'Gepubliceerd',
    },
    en: {
      badge: 'JOURNAL',
      title: 'Stories, rituals, and reflections around the nights.',
      intro:
        'Not everything starts on the floor. Sometimes tension begins in language, context, and the way you prepare for a night that asks for presence.',
      empty: 'There are no published blog posts yet.',
      dateLabel: 'Published',
    },
    de: {
      badge: 'JOURNAL',
      title: 'Geschichten, Rituale und Einsichten rund um die Nächte.',
      intro:
        'Nicht alles beginnt auf der Fläche. Manchmal entsteht Spannung zuerst in Worten, Kontext und in der Art, wie du dich auf die Nacht vorbereitest.',
      empty: 'Es gibt noch keine veröffentlichten Blogposts.',
      dateLabel: 'Veröffentlicht',
    },
  } as const;

  const copy = content[language as keyof typeof content] || content.en;
  const publishedPosts = [...posts]
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="min-h-screen px-6 pb-16 pt-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12 max-w-4xl">
          <span className="mono mb-4 block text-[#D61C1C]">{copy.badge}</span>
          <h1 className="mb-5 text-4xl font-black text-white md:text-6xl">{copy.title}</h1>
          <p className="text-lg leading-relaxed text-[#A7A7AB]">{copy.intro}</p>
        </section>

        {publishedPosts.length === 0 ? (
          <div className="card-dark p-8 text-[#A7A7AB]">{copy.empty}</div>
        ) : (
          <div className="grid gap-8">
            {publishedPosts.map((post) => (
              <article key={post.id} className="card-dark overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-[0.42fr_0.58fr]">
                  <div className="h-full min-h-[280px] overflow-hidden">
                    <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-[#A7A7AB]">
                      <span className="mono text-[#D61C1C]">{post.tags.join(' · ')}</span>
                      <span className="flex items-center gap-2">
                        <CalendarDays size={15} className="text-[#D61C1C]" />
                        {copy.dateLabel} {new Date(post.publishedAt).toLocaleDateString(language === 'nl' ? 'nl-NL' : language === 'de' ? 'de-DE' : 'en-GB')}
                      </span>
                    </div>
                    <h2 className="mb-4 text-3xl font-bold text-white">{post.title}</h2>
                    <p className="mb-6 text-lg leading-relaxed text-[#E7E7EB]">{post.excerpt}</p>
                    <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6">
                      <div className="mb-3 flex items-center gap-2 text-[#D61C1C]">
                        <Sparkles size={16} />
                        <span className="mono">IN DE ROOS</span>
                      </div>
                      <p className="leading-relaxed text-[#C7C7CD]">{post.content}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
