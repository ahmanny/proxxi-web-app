"use client";

import Link from "next/link";
import {
  Search,
  CalendarCheck,
  Sparkles,
  UserPlus,
  ShieldCheck,
  CreditCard,
  Clock,
  Star,
  Download,
  PlayCircle,
  Scissors,
  Wind,
  Zap,
  Wrench,
  Car,
  Home,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function LandingPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 sm:pt-12 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                Available across Nigeria
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                Book trusted service providers in{" "}
                <span className="text-emerald-600">minutes</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed">
                Connect with verified barbers, hair stylists, electricians,
                plumbers, mechanics and more — all from one app. No more
                searching, just book and get served.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Consumer App
                </a>
                <a
                  href="/provider/signup"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors"
                >
                  Become a Provider
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right — illustration placeholder */}
            <div className="relative">
              <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-100 via-emerald-50 to-slate-100 flex items-center justify-center border border-emerald-200">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M12 2L4 6V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V6L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8V12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10 14C10.5523 14.6667 11.4477 15 12 15C12.5523 15 13.4477 14.6667 14 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-400 text-sm font-medium">
                    App Preview
                  </p>
                  <p className="text-slate-400 text-xs">Coming soon</p>
                </div>
              </div>
              {/* Decorative blobs */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-200 rounded-full opacity-40 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-slate-200 rounded-full opacity-40 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="bg-slate-50 py-16 sm:py-24 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              How Proxxi works
            </h2>
            <p className="text-slate-500 text-lg">
              Whether you are looking for help or offering it — get started in
              minutes.
            </p>
          </div>

          <div className="flex justify-center">
            <Tabs defaultValue="consumer" className="w-full max-w-3xl">
              <TabsList className="w-full justify-center mb-10">
                <TabsTrigger value="consumer">For Consumers</TabsTrigger>
                <TabsTrigger value="provider">For Providers</TabsTrigger>
              </TabsList>

              <TabsContent value="consumer">
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    {
                      step: "01",
                      icon: Search,
                      title: "Search",
                      desc: "Browse services or search for a specific provider near you.",
                    },
                    {
                      step: "02",
                      icon: CalendarCheck,
                      title: "Book",
                      desc: "Pick a time slot, confirm your address and pay securely.",
                    },
                    {
                      step: "03",
                      icon: Sparkles,
                      title: "Get Served",
                      desc: "Your provider arrives on time and gets the job done.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100"
                    >
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 tracking-widest uppercase mb-2 block">
                        Step {item.step}
                      </span>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="provider">
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    {
                      step: "01",
                      icon: UserPlus,
                      title: "Sign Up",
                      desc: "Register with your skills, upload your portfolio and set your prices.",
                    },
                    {
                      step: "02",
                      icon: ShieldCheck,
                      title: "Get Approved",
                      desc: "Our team verifies your identity and skills — usually within 24 hours.",
                    },
                    {
                      step: "03",
                      icon: CreditCard,
                      title: "Start Earning",
                      desc: "Receive bookings, serve customers and get paid directly to your account.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100"
                    >
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 tracking-widest uppercase mb-2 block">
                        Step {item.step}
                      </span>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        className="bg-white py-16 sm:py-24 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Services available near you
            </h2>
            <p className="text-slate-500 text-lg">
              From haircuts to home repairs — we have got you covered.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Scissors, label: "Barbers", count: "120+" },
              { icon: Wind, label: "Hair Stylists", count: "95+" },
              { icon: Zap, label: "Electricians", count: "80+" },
              { icon: Wrench, label: "Plumbers", count: "65+" },
              { icon: Car, label: "Mechanics", count: "50+" },
              { icon: Home, label: "House Cleaning", count: "40+" },
            ].map((service) => (
              <div
                key={service.label}
                className="group bg-white border border-slate-200 rounded-2xl p-5 text-center hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-emerald-50 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <service.icon className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-0.5">
                  {service.label}
                </h3>
                <p className="text-xs text-slate-400">{service.count} providers</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PROXXI ── */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Why choose Proxxi
            </h2>
            <p className="text-slate-500 text-lg">
              Built for trust, speed and reliability.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Providers",
                desc: "Every service provider goes through identity and skill verification before joining.",
              },
              {
                icon: CreditCard,
                title: "Secure Payments",
                desc: "Payments are processed securely through Paystack. Your money is protected.",
              },
              {
                icon: Clock,
                title: "Real-time Booking",
                desc: "See live availability, book instantly and receive confirmations in seconds.",
              },
              {
                icon: Star,
                title: "Rated & Reviewed",
                desc: "Read honest reviews from real customers before you book.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR PROVIDERS CTA ── */}
      <section
        id="for-providers"
        className="bg-slate-900 py-16 sm:py-24 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-900/50 text-emerald-400 text-sm font-medium rounded-full">
              <Sparkles className="w-4 h-4" />
              For Service Providers
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Turn your skill into a business
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Join thousands of providers already earning on Proxxi. Set your
              own prices, choose your hours, and build a loyal customer base in
              your city.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/provider/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-colors"
              >
                Join as a Provider
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                Watch Demo
              </a>
            </div>
            <p className="text-sm text-slate-500">
              No registration fee. Start earning from day one.
            </p>
          </div>
        </div>
      </section>

      {/* ── APP DOWNLOAD CTA ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-600 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-5">
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Ready to get started?
              </h2>
              <p className="text-emerald-100 text-lg">
                Download the Proxxi app and find trusted service providers near
                you — or join as a provider and start earning today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-5 py-3 bg-white text-slate-900 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  App Store
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-5 py-3 bg-white text-slate-900 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  Google Play
                </a>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-3xl bg-emerald-500/30 flex items-center justify-center">
                <div className="w-36 h-36 rounded-2xl bg-emerald-400/40 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-xl bg-emerald-300/50 flex items-center justify-center">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M12 2L4 6V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V6L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}