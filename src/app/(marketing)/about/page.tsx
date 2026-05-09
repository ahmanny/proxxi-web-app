"use client";

import { Target, Heart, Users, Award, Shield, Globe, ThumbsUp } from "lucide-react";

const stats = [
  { value: "500+", label: "Providers" },
  { value: "10,000+", label: "Bookings" },
  { value: "4.8/5", label: "Average Rating" },
  { value: "5", label: "Cities" },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Every provider is verified and background-checked for your peace of mind.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "Quality services should be available to every Nigerian household.",
  },
  {
    icon: ThumbsUp,
    title: "Quality",
    description: "We maintain high standards by vetting all service providers.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building stronger communities through reliable local connections.",
  },
];

const team = [
  { name: "Chidi Okonkwo", role: "Founder & CEO", image: "https://picsum.photos/seed/chidi/200" },
  { name: "Amara Nwosu", role: "Head of Operations", image: "https://picsum.photos/seed/amara/200" },
  { name: "Emeka Eze", role: "Technical Lead", image: "https://picsum.photos/seed/emeka/200" },
  { name: "Fatima Bello", role: "Head of Growth", image: "https://picsum.photos/seed/fatima/200" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Building trust in home services across Nigeria
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Proxxi connects Nigerian households with verified, reliable service providers — making quality help just a tap away.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <Target className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our mission is to make reliable service providers accessible to every Nigerian household. We believe everyone deserves access to trusted professionals who can help maintain their homes and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Story</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Founded in 2024 by a team passionate about solving the service gap in Nigeria, Proxxi was born from a simple observation: finding reliable service providers was unnecessarily difficult.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our founders experienced firsthand the challenge of finding trustworthy barbers, electricians, plumbers, and other professionals. Too often, the process was filled with uncertainty, inconsistent quality, and a lack of accountability.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We built Proxxi to change that — creating a platform where quality, trust, and convenience come together. Today, we serve thousands of customers across multiple Nigerian cities, connecting them with hundreds of verified service providers.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center text-emerald-600">
                <div className="w-24 h-24 rounded-full bg-emerald-200 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-12 h-12" />
                </div>
                <p className="text-slate-500">Illustration placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-slate-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">{stat.value}</div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-sm text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-slate-50 rounded-xl p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-slate-900">{member.name}</h3>
                <p className="text-sm text-slate-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
