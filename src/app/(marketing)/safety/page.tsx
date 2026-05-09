"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Lock, UserCheck, AlertTriangle, MessageCircle, Eye, CreditCard, MapPin, Camera, Flag } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const consumerTips = [
  {
    icon: UserCheck,
    title: "Verify provider identity before the service",
    description: "Check the provider's profile, ratings, and reviews before booking. Confirm their identity when they arrive.",
  },
  {
    icon: MessageCircle,
    title: "Use in-app communication only",
    description: "Keep all communication within the Proxxi app. This creates a record and ensures your information stays secure.",
  },
  {
    icon: CreditCard,
    title: "Never share payment outside the platform",
    description: "Always pay through the app. Off-platform payments aren't protected and may compromise your financial security.",
  },
  {
    icon: Eye,
    title: "Share your booking details with a trusted person",
    description: "Let someone know when and where you're expecting a service. Share the provider's details for added safety.",
  },
  {
    icon: MapPin,
    title: "Meet in safe, public locations when possible",
    description: "For initial meetings, consider meeting in public places like cafes or shared spaces in your building.",
  },
  {
    icon: Flag,
    title: "Report inappropriate behavior immediately",
    description: "If a provider makes you uncomfortable, end the service and report it immediately through the app.",
  },
];

const providerTips = [
  {
    icon: UserCheck,
    title: "Verify client details before accepting",
    description: "Review the client's profile and booking information before accepting any service request.",
  },
  {
    icon: MessageCircle,
    title: "Use the app's messaging system",
    description: "Keep all communication through Proxxi. This protects both you and the client with documented conversations.",
  },
  {
    icon: MapPin,
    title: "Meet clients in safe locations",
    description: "Choose well-lit, populated areas for service. Trust your instincts and prioritize your safety.",
  },
  {
    icon: Lock,
    title: "Keep your personal address private",
    description: "Don't share your home address until you've established trust with a client through multiple bookings.",
  },
  {
    icon: Camera,
    title: "Document services with photos",
    description: "Take photos of completed work through the app. This protects you and provides quality assurance.",
  },
  {
    icon: Flag,
    title: "Report suspicious requests",
    description: "If something feels off about a request, report it to our trust and safety team immediately.",
  },
];

export default function SafetyPage() {
  const [activeTab, setActiveTab] = useState("consumers");

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Your safety is our priority</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            At Proxxi, we&apos;re committed to creating a secure environment for both consumers and service providers. Here are our safety guidelines.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-center mb-8">
              <TabsTrigger value="consumers" className="flex-1 sm:flex-none">
                For Consumers
              </TabsTrigger>
              <TabsTrigger value="providers" className="flex-1 sm:flex-none">
                For Providers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="consumers">
              <div className="grid sm:grid-cols-2 gap-6">
                {consumerTips.map((tip) => (
                  <div key={tip.title} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                      <tip.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{tip.title}</h3>
                    <p className="text-sm text-slate-600">{tip.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="providers">
              <div className="grid sm:grid-cols-2 gap-6">
                {providerTips.map((tip) => (
                  <div key={tip.title} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                      <tip.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{tip.title}</h3>
                    <p className="text-sm text-slate-600">{tip.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-900 mb-2">In case of emergency</h3>
                <p className="text-red-800 mb-2">
                  If you&apos;re in immediate danger, contact the nearest police station or call <span className="font-semibold">199</span> (Nigeria Emergency Number).
                </p>
                <p className="text-sm text-red-700">
                  For non-emergency safety concerns, reach out to our support team through the app or contact us at emergency@proxxi.app
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-50 rounded-xl p-8">
            <Flag className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Need to report an issue?</h3>
            <p className="text-slate-600 mb-6">
              Help us keep Proxxi safe by reporting any suspicious activity or safety concerns.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
            >
              Report an Issue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
