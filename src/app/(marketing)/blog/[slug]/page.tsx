import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getRelatedPosts,
  formatDate,
} from "@/lib/marketing/blog-data";
import {
  ArrowLeft,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  Clock,
  Calendar,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  const headings = post.content.match(/<h2[^>]*>(.*?)<\/h2>/g) || [];

  return (
    <>
      {/* ── BACK TO BLOG ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative h-[400px] bg-slate-900 overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <span className="inline-block px-3 py-1 bg-emerald-600 text-white text-sm font-medium rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-slate-300">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full border-2 border-slate-700"
                />
                <div>
                  <p className="text-white font-medium">{post.author.name}</p>
                  <p className="text-sm text-slate-400">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLE CONTENT ── */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Table of Contents - Desktop */}
            {headings.length > 0 && (
              <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-8 p-6 bg-slate-50 rounded-2xl">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4">
                    On this page
                  </h4>
                  <nav className="space-y-2">
                    {headings.map((heading, index) => {
                      const title = heading.replace(/<[^>]*>/g, "");
                      const anchor = title.toLowerCase().replace(/\s+/g, "-");
                      return (
                        <a
                          key={index}
                          href={`#${anchor}`}
                          className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                        >
                          {title}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              </div>
            )}

            {/* Article */}
            <article className="lg:col-span-7">
              <div
                className="prose prose-lg prose-slate max-w-none
                  prose-headings:text-slate-900 prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                  prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-900
                  prose-ul:text-slate-600 prose-ol:text-slate-600
                  prose-li:mb-2
                  prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">
                  Share this article
                </h4>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    <span className="text-sm font-medium">Twitter</span>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                    <span className="text-sm font-medium">Facebook</span>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                    <Link2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Copy link</span>
                  </button>
                </div>
              </div>

              {/* Author Card */}
              <div className="mt-12 p-6 bg-slate-50 rounded-2xl">
                <div className="flex items-start gap-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 mb-1">Written by</p>
                    <h4 className="text-lg font-semibold text-slate-900">
                      {post.author.name}
                    </h4>
                    <p className="text-sm text-slate-600 mb-3">
                      {post.author.role}
                    </p>
                    <Link
                      href="/blog"
                      className="text-sm text-emerald-600 hover:underline"
                    >
                      More from this author →
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Spacer for alignment */}
            <div className="hidden lg:block lg:col-span-2" />
          </div>
        </div>
      </section>

      {/* ── RELATED POSTS ── */}
      {relatedPosts.length > 0 && (
        <section className="bg-slate-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Related posts
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="aspect-video bg-slate-100 overflow-hidden">
                    <img
                      src={related.featuredImage}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded mb-3">
                      {related.category}
                    </span>
                    <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BACK TO BLOG BOTTOM ── */}
      <section className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </div>
      </section>
    </>
  );
}