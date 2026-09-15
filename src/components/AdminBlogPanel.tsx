import { useState } from 'react';
import { Edit3, Save, Trash2, X } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultBlogPosts } from '../data/platformContent';
import type { BlogPost } from '../types';

const createEmptyBlogPost = (): BlogPost => ({
  id: `post-${Date.now()}`,
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  coverImage: '/groepen/group1.png',
  author: 'In De Roos',
  tags: [],
  published: true,
  publishedAt: new Date().toISOString(),
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const AdminBlogPanel = () => {
  const [blogPosts, setBlogPosts] = useLocalStorage<BlogPost[]>('blogPosts', defaultBlogPosts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogPost>(createEmptyBlogPost());

  const startNew = () => {
    setEditingId('new');
    setForm(createEmptyBlogPost());
  };

  const startEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({ ...post });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(createEmptyBlogPost());
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) {
      return;
    }

    const normalizedPost: BlogPost = {
      ...form,
      slug: form.slug.trim() || slugify(form.title),
      tags: Array.isArray(form.tags)
        ? form.tags
        : String(form.tags)
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
      publishedAt: form.publishedAt || new Date().toISOString(),
    };

    setBlogPosts((prev) =>
      editingId === 'new'
        ? [normalizedPost, ...prev]
        : prev.map((post) => (post.id === normalizedPost.id ? normalizedPost : post)),
    );

    resetForm();
  };

  const handleDelete = (postId: string) => {
    setBlogPosts((prev) => prev.filter((post) => post.id !== postId));
    if (editingId === postId) {
      resetForm();
    }
  };

  return (
    <section className="px-6 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="card-dark p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Blog beheren</h2>
              <p className="mt-2 text-sm text-[#A7A7AB]">Maak, bewerk of verwijder posts die direct op de blogpagina verschijnen.</p>
            </div>
            <button onClick={startNew} className="btn-primary">Nieuwe post</button>
          </div>

          <div className="grid gap-4">
            <div>
              <label htmlFor="blog-title" className="mb-2 block text-sm font-medium text-[#A7A7AB]">Titel</label>
              <input id="blog-title" title="Titel" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} className="bg-[#141416]" />
            </div>
            <div>
              <label htmlFor="blog-slug" className="mb-2 block text-sm font-medium text-[#A7A7AB]">Slug</label>
              <input id="blog-slug" title="Slug" value={form.slug} onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))} placeholder="wordt automatisch gevuld" className="bg-[#141416]" />
            </div>
            <div>
              <label htmlFor="blog-excerpt" className="mb-2 block text-sm font-medium text-[#A7A7AB]">Excerpt</label>
              <textarea id="blog-excerpt" title="Excerpt" value={form.excerpt} onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))} rows={3} className="bg-[#141416]" />
            </div>
            <div>
              <label htmlFor="blog-content" className="mb-2 block text-sm font-medium text-[#A7A7AB]">Content</label>
              <textarea id="blog-content" title="Content" value={form.content} onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))} rows={8} className="bg-[#141416]" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="blog-cover-image" className="mb-2 block text-sm font-medium text-[#A7A7AB]">Cover image</label>
                <input id="blog-cover-image" title="Cover image" value={form.coverImage} onChange={(event) => setForm((prev) => ({ ...prev, coverImage: event.target.value }))} className="bg-[#141416]" />
              </div>
              <div>
                <label htmlFor="blog-tags" className="mb-2 block text-sm font-medium text-[#A7A7AB]">Tags</label>
                <input
                  id="blog-tags"
                  value={form.tags.join(', ')}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      tags: event.target.value
                        .split(',')
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder="guides, consent, rituals"
                  className="bg-[#141416]"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="blog-author" className="mb-2 block text-sm font-medium text-[#A7A7AB]">Auteur</label>
                <input id="blog-author" title="Auteur" value={form.author} onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))} className="bg-[#141416]" />
              </div>
              <div className="flex items-end gap-3">
                <label htmlFor="blog-published" className="flex items-center gap-2 text-sm text-white">
                  <input id="blog-published" type="checkbox" checked={form.published} onChange={(event) => setForm((prev) => ({ ...prev, published: event.target.checked }))} />
                  Gepubliceerd
                </label>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <Save size={16} />
                Opslaan
              </button>
              <button onClick={resetForm} className="btn-secondary flex items-center gap-2">
                <X size={16} />
                Annuleren
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {blogPosts.length === 0 ? (
            <div className="card-dark p-8 text-[#A7A7AB]">Nog geen blogposts.</div>
          ) : (
            blogPosts.map((post) => (
              <article key={post.id} className="card-dark overflow-hidden">
                <div className="grid gap-0 md:grid-cols-[0.32fr_0.68fr]">
                  <div className="min-h-[200px] overflow-hidden">
                    <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <span className="mono text-[#D61C1C]">{post.published ? 'LIVE' : 'DRAFT'}</span>
                      <span className="text-sm text-[#A7A7AB]">{new Date(post.publishedAt).toLocaleDateString('nl-NL')}</span>
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-white">{post.title}</h3>
                    <p className="mb-3 text-sm text-[#A7A7AB]">/{post.slug}</p>
                    <p className="mb-4 leading-relaxed text-[#D7D7DC]">{post.excerpt}</p>
                    <div className="mb-5 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#C7C7CD]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => startEdit(post)} className="btn-secondary flex items-center gap-2">
                        <Edit3 size={16} />
                        Bewerken
                      </button>
                      <button onClick={() => handleDelete(post.id)} className="flex items-center gap-2 rounded-lg bg-red-500/15 px-4 py-2 text-red-300 transition-colors hover:bg-red-500/25">
                        <Trash2 size={16} />
                        Verwijderen
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminBlogPanel;
