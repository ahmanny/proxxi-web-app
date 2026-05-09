"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Download, PlayCircle } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 relative rounded-lg overflow-hidden flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="Proxxi"
          fill
          className="object-contain"
          priority
        />
      </div>
      <span className="text-xl font-bold text-slate-900">Proxxi</span>
    </div>
  );
}

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#services", label: "Services" },
  { href: "#for-providers", label: "For Providers" },
];

export function LandingLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Logo />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Get App
              </a>
              <Link
                href="/provider/signup"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Join as Provider
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-slate-600 hover:text-emerald-600"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden py-4 border-t border-slate-100 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-slate-600 hover:text-emerald-600 py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 py-2"
                >
                  <Download className="w-4 h-4" />
                  Get App
                </a>
                <Link
                  href="/provider/signup"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg text-center transition-colors"
                >
                  Join as Provider
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Page content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <Logo />
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Connecting consumers with trusted service providers across
                Nigeria. Book barbers, stylists, electricians, plumbers and
                more — all in one app.
              </p>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">
                Company
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Careers", href: "/careers" },
                  { label: "Contact", href: "/contact" },
                  { label: "Blog", href: "/blog" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-emerald-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Providers */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">
                Providers
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Become a Provider", href: "/provider/signup" },
                  { label: "Provider Dashboard", href: "/provider/dashboard" },
                  { label: "Provider Guidelines", href: "/provider/guidelines" },
                  { label: "Earnings & Payouts", href: "/provider/earnings" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-emerald-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">
                Support
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Help Center", href: "/help" },
                  { label: "Safety Tips", href: "/safety" },
                  { label: "Report an Issue", href: "/report" },
                  { label: "Terms & Conditions", href: "/terms" },
                  { label: "Privacy Policy", href: "/privacy" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-emerald-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} Proxxi. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {/* Social icons */}
              {[
                {
                  label: "Twitter",
                  href: "#",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  href: "#",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
                {
                  label: "Facebook",
                  href: "#",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "#",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-slate-400 hover:text-emerald-600 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}