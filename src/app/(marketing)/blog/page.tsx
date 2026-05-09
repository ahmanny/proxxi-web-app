"use client";

import { useState } from "react";
import Link from "next/link";
import {
  getAllPosts,
  getFeaturedPost,
  getPostsByCategory,
  getAllCategories,
  formatDate,
  BlogPost,
} from "@/lib/marketing/blog-data";

const POSTS_PER_PAGE = 3;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["All", ...getAllCategories()];
  const featuredPost = getFeaturedPost();

  const filteredPosts =
    activeCategory === "All"
      ? getAllPosts()
      : getPostsByCategory(activeCategory);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">
              Proxxi Blog
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Tips, guides and insights on home services in Nigeria
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      {featuredPost && (
        <section className="bg-slate-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto bg-slate-100 overflow-hidden">
                  <img
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full w-fit mb-4">
                    Featured
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-600 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {featuredPost.author.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatDate(featuredPost.publishedAt)} ·{" "}
                        {featuredPost.readTime} min read
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── CATEGORY FILTER ── */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post: BlogPost) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-300 hover:shadow-md transition-all duration-200"
              >
                <div className="aspect-video bg-slate-100 overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs font-medium text-slate-700">
                        {post.author.name}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {formatDate(post.publishedAt)} · {post.readTime} min
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {paginatedPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── PAGINATION ── */}
      {totalPages > 1 && (
        <section className="bg-white py-8 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── NEWSLETTER CTA ── */}
      <section className="bg-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-3">Stay updated</h2>
            <p className="text-emerald-100 mb-6">
              Get the latest tips and insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}