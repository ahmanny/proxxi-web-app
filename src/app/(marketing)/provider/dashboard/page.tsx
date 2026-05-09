"use client";

import Link from "next/link";
import { ArrowLeft, Bell, DollarSign, MessageSquare, Star, CreditCard, CheckCircle2 } from "lucide-react";
import { LandingLayout } from "@/components/my-ui/Logo";

export default function ProviderDashboardPage() {
  const features = [
    { icon: Bell, title: "Real-time booking alerts", desc: "Get instant notifications when customers book your services" },
    { icon: DollarSign, title: "Earnings tracker", desc: "Track your daily, weekly and monthly earnings at a glance" },
    { icon: MessageSquare, title: "Customer messaging", desc: "Chat directly with customers before and after bookings" },
    { icon: Star, title: "Ratings & reviews", desc: "Build your reputation with customer feedback" },
    { icon: CreditCard, title: "Payout management", desc: "Manage your earnings and request withdrawals" },
  ];

  const benefits = [
    { title: "Manage bookings on the go", desc: "Accept or decline requests from anywhere" },
    { title: "Grow your customer base", desc: "Get discovered by thousands of potential customers" },
    { title: "Secure payments", desc: "Receive payments directly to your bank account" },
  ];

  return (
    <LandingLayout>
      {/* ── HERO ── */}
      <section className="bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Link
              href="/provider/signup"
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to signup
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full">
              <CheckCircle2 className="w-4 h-4" />
              Coming Soon
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Provider Dashboard
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Manage your bookings, track your earnings, and connect with
              customers — all from your phone.
            </p>
          </div>
        </div>
      </section>

      {/* ── AVAILABLE ON APP ── */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Available on the Proxxi Provider App
              </h2>
              <p className="text-slate-500">
                Everything you need to run your business, right in your pocket
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY USE THE APP? ── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Why use the app?
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-6 text-center"
                >
                  <h3 className="text-base font-semibold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-500">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LINK BACK ── */}
      <section className="bg-emerald-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link
              href="/provider/signup"
              className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to signup
            </Link>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}