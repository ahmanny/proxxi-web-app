"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { LandingLayout } from "@/components/my-ui/Logo";

export default function ProviderSignupPage() {
  return (
    <LandingLayout>
      {/* ── HERO ── */}
      <section className="bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full">
              <CheckCircle2 className="w-4 h-4" />
              Join 500+ providers
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Start earning on your own terms
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Set your prices, choose your hours, and grow your customer base —
              all from your phone.
            </p>
            <p className="text-base text-slate-600 font-medium">
              Web signup coming soon. Download the Proxxi Provider App to get
              started.
            </p>
          </div>
        </div>
      </section>

      {/* ── APP DOWNLOAD BUTTONS ── */}
      <section className="bg-white pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </section>

      {/* ── FEATURE HIGHLIGHTS ── */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "Create your profile in minutes",
                desc: "Upload photos, set your bio, choose your services",
              },
              {
                title: "Set your own prices",
                desc: "You&apos;re in control. No commission caps, transparent pricing",
              },
              {
                title: "Get verified and go live",
                desc: "Quick verification process to start accepting bookings",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-emerald-600">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { value: "500+", label: "providers already earning" },
              { value: "₦50,000+", label: "avg monthly earnings" },
              { value: "4.8/5", label: "avg rating" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-0">
            {[
              {
                q: "Is there a registration fee?",
                a: "No! Creating a Proxxi provider account is completely free.",
              },
              {
                q: "How do I get paid?",
                a: "Payments are processed weekly directly to your Nigerian bank account via Paystack.",
              },
              {
                q: "What cities is Proxxi available in?",
                a: "Currently available in Lagos. Coming to Abuja, Port Harcourt and more cities soon.",
              },
              {
                q: "Can I use Proxxi alongside my existing shop?",
                a: "Absolutely! Many providers use Proxxi to reach new customers while maintaining their physical shop.",
              },
            ].map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-slate-900 font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">
              Ready to start earning?
            </h2>
            <p className="text-slate-500">
              Download the Proxxi Provider App and join hundreds of providers
              growing their business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
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
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
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
            <Link
              href="/provider/guidelines"
              className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              View Provider Guidelines <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}