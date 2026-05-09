"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, CreditCard, Briefcase, Shield, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const categories = [
  {
    icon: Sparkles,
    title: "Getting Started",
    questions: [
      { q: "How do I create a Proxxi account?", a: "Download the Proxxi app from your app store, tap 'Sign Up', and follow the prompts. You can sign up with your phone number or email." },
      { q: "Is Proxxi available in my city?", a: "Proxxi currently operates in Lagos, Abuja, Port Harcourt, Ibadan, and Kano. We're expanding rapidly to more cities." },
      { q: "How do I download the app?", a: "The Proxxi app is available on the App Store for iOS and Google Play Store for Android. Simply search for 'Proxxi' and download for free." },
    ],
  },
  {
    icon: CreditCard,
    title: "Booking & Payments",
    questions: [
      { q: "How do I book a service provider?", a: "Open the app, browse services, select a provider based on ratings and reviews, choose your preferred date and time, and confirm your booking." },
      { q: "What payment methods are accepted?", a: "We accept all major credit/debit cards, bank transfers, and USSD payments. Payment is processed securely through our platform." },
      { q: "Can I cancel or reschedule a booking?", a: "Yes, you can cancel or reschedule up to 2 hours before your scheduled appointment. Go to 'My Bookings' and select the booking you want to modify." },
      { q: "How do I rate a provider?", a: "After your service is completed, you'll receive a prompt to rate your experience. You can give 1-5 stars and leave a written review." },
    ],
  },
  {
    icon: Briefcase,
    title: "For Providers",
    questions: [
      { q: "How do I become a Proxxi provider?", a: "Fill out the provider application form on our website or app. Once approved after verification, you can start accepting bookings." },
      { q: "When will my account be approved?", a: "Most applications are reviewed within 24-48 hours. You'll receive an email or SMS notification once your account is approved." },
      { q: "How do I get paid?", a: "Payments are processed weekly and transferred directly to your registered bank account. You can view your earnings in the provider dashboard." },
    ],
  },
  {
    icon: Shield,
    title: "Account & Security",
    questions: [
      { q: "How do I reset my password?", a: "On the login screen, tap 'Forgot Password', enter your email or phone number, and follow the instructions sent to reset your password." },
      { q: "How do I change my phone number?", a: "Go to Settings > Account > Phone Number, and follow the verification process to update your number." },
      { q: "Is my personal information secure?", a: "Yes. We use bank-level encryption to protect your data. Your personal information is never shared with third parties without your consent." },
    ],
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-6">How can we help?</h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24 mb-16">
            {categories.map((category) => (
              <div
                key={category.title}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900">{category.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <category.icon className="w-5 h-5 text-emerald-600" />
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="bg-slate-50 rounded-xl">
                  {category.questions.map((item, questionIndex) => (
                    <AccordionItem
                      key={`${categoryIndex}-${questionIndex}`}
                      value={`${categoryIndex}-${questionIndex}`}
                      className="border-b-0 last:border-b-0"
                    >
                      <AccordionTrigger className="px-6 hover:no-underline hover:text-emerald-600 data-[state=open]:text-emerald-600">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 text-slate-600">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-10 text-white">
            <MessageCircle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Still need help?</h3>
            <p className="text-emerald-100 mb-6">
              Our support team is ready to assist you with any questions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Contact our support team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
