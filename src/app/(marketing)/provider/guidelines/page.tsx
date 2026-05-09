"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Clock, CheckCircle2, DollarSign, AlertTriangle, Flag } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { LandingLayout } from "@/components/my-ui/Logo";

export default function ProviderGuidelinesPage() {
  const codeOfConduct = [
    {
      title: "Professional Communication",
      desc: "Always communicate respectfully. Respond to booking requests promptly. Keep customers informed of any delays.",
    },
    {
      title: "Punctuality",
      desc: "Arrive on time as scheduled. If you&apos;re running late, notify the customer immediately through the app.",
    },
    {
      title: "Service Quality",
      desc: "Deliver services with reasonable skill and care. If you cannot complete a job, contact support immediately.",
    },
    {
      title: "Pricing Transparency",
      desc: "Display accurate prices. Do not quote one price and charge another.",
    },
    {
      title: "No-show Policy",
      desc: "Repeatedly failing to show up for confirmed bookings will result in account suspension.",
    },
    {
      title: "Respect & Safety",
      desc: "Treat all customers with respect. Any form of harassment, discrimination, or inappropriate behavior is strictly prohibited.",
    },
  ];

  const serviceStandards = [
    { title: "Barber", standard: "Clean cuts, proper sanitation of tools, professional appearance" },
    { title: "Hair Stylist", standard: "Quality products, consultation on style preferences, post-service care instructions" },
    { title: "Electrician", standard: "Safety compliance, proper certification display, clean work area" },
    { title: "Plumber", standard: "Leak-free repairs, proper tool usage, post-service cleanup" },
    { title: "House Cleaner", standard: "Thorough cleaning per specification, respect for property, eco-friendly products when requested" },
  ];

  const penalties = [
    "Warning",
    "Temporary suspension",
    "Permanent account removal",
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
              <Shield className="w-4 h-4" />
              Standards & Guidelines
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Provider Guidelines
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Our standards for quality service on Proxxi
            </p>
          </div>
        </div>
      </section>

      {/* ── INTRODUCTION ── */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <p className="text-slate-600 leading-relaxed">
              As a Proxxi provider, you represent our brand. These guidelines
              ensure every customer has a great experience. Following these
              standards helps build trust, grow your reputation, and create
              lasting relationships with customers.
            </p>
          </div>
        </div>
      </section>

      {/* ── CODE OF CONDUCT ── */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-600" />
            Code of Conduct
          </h2>
          <div className="space-y-4">
            {codeOfConduct.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-xl p-5 border border-slate-100"
              >
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE STANDARDS ── */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              Service Standards
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {serviceStandards.map((service, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500">{service.standard}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING GUIDELINES ── */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-600" />
            Pricing Guidelines
          </h2>
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
            <p className="text-slate-600 leading-relaxed">
              Set fair and competitive prices. Proxxi does not cap your pricing,
              but we reserve the right to remove providers who engage in price
              manipulation or deceptive pricing practices. Transparency builds
              trust with customers and helps maintain a healthy marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* ── PENALTIES ── */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-emerald-600" />
            Penalties
          </h2>
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
            <p className="text-slate-600 mb-4">
              Violations of these guidelines may result in:
            </p>
            <div className="space-y-3">
              {penalties.map((penalty, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                    {idx + 1}
                  </div>
                  <span className="text-slate-700 font-medium">{penalty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REPORTING ── */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Flag className="w-6 h-6 text-emerald-600" />
            Reporting
          </h2>
          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-300 leading-relaxed">
              If a customer violates our trust and safety guidelines, report them
              immediately. We take all reports seriously and will investigate
              promptly to protect our provider community.
            </p>
            <Link
              href="/report"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium mt-4"
            >
              Report an issue <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
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