"use client";

import Link from "next/link";
import { MapPin, Compass, ArrowLeft, Search, LifeBuoy } from "lucide-react";
import { LandingLayout } from "@/components/my-ui/Logo";

export default function NotFound() {
  return (
    <LandingLayout>
      <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-emerald-50/40 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-emerald-50/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-[10%] opacity-20 animate-bounce" style={{ animationDuration: "3s" }}>
          <MapPin className="w-8 h-8 text-emerald-600" />
        </div>
        <div className="absolute top-32 right-[15%] opacity-15 animate-bounce" style={{ animationDuration: "4s", animationDelay: "0.5s" }}>
          <Compass className="w-6 h-6 text-emerald-600" />
        </div>
        <div className="absolute bottom-32 left-[20%] opacity-10 animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "1s" }}>
          <Search className="w-7 h-7 text-emerald-600" />
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-16 text-center">
          {/* Animated 404 illustration */}
          <div className="relative mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-emerald-100 rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-8 border border-emerald-100 shadow-xl shadow-emerald-100/50">
                <div className="relative">
                  <svg
                    width="180"
                    height="180"
                    viewBox="0 0 200 200"
                    className="mx-auto"
                  >
                    {/* City silhouette */}
                    <path
                      d="M20 180 L20 140 L40 140 L40 160 L55 160 L55 130 L75 130 L75 155 L90 155 L90 125 L110 125 L110 160 L125 160 L125 135 L145 135 L145 165 L160 165 L160 120 L180 120 L180 180 Z"
                      fill="#e2e8f0"
                    />
                    {/* Map marker body */}
                    <path
                      d="M100 40 C70 40 50 65 50 95 C50 135 100 175 100 175 C100 175 150 135 150 95 C150 65 130 40 100 40Z"
                      fill="#16a34a"
                      className="drop-shadow-lg"
                    />
                    {/* Map marker inner circle */}
                    <circle cx="100" cy="95" r="18" fill="white" />
                    <circle cx="100" cy="95" r="10" fill="#16a34a" />
                    {/* Question mark */}
                    <text
                      x="100"
                      y="105"
                      textAnchor="middle"
                      fontSize="28"
                      fontWeight="bold"
                      fill="white"
                    >
                      ?
                    </text>
                    {/* Pulse animation ring */}
                    <circle
                      cx="100"
                      cy="95"
                      r="30"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="2"
                      opacity="0.4"
                      className="animate-ping"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 404 large text */}
          <div className="mb-6">
            <span className="text-8xl font-bold bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent tracking-tight">
              404
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Oops! You seem to have taken a wrong turn.
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-lg text-slate-500 mb-8 max-w-lg mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 hover:border-emerald-200 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4" />
              Browse Services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 hover:border-emerald-200 transition-all duration-200 hover:-translate-y-0.5"
            >
              <LifeBuoy className="w-4 h-4" />
              Contact Support
            </Link>
          </div>

          {/* Report broken link */}
          <p className="text-sm text-slate-400">
            Found a broken link?{" "}
            <Link
              href="/report"
              className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
            >
              Report it to us
            </Link>
          </p>
        </div>
      </div>
    </LandingLayout>
  );
}