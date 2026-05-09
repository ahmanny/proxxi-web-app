"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText } from "lucide-react";

const TOC = [
  { id: "introduction", label: "1. Introduction" },
  { id: "definitions", label: "2. Definitions" },
  { id: "acceptance", label: "3. Acceptance of Terms" },
  { id: "accounts", label: "4. User Accounts" },
  { id: "consumer", label: "5. Consumer Terms" },
  { id: "provider", label: "6. Provider Terms" },
  { id: "bookings", label: "7. Bookings & Payments" },
  { id: "cancellations", label: "8. Cancellations & Refunds" },
  { id: "reviews", label: "9. Ratings & Reviews" },
  { id: "ip", label: "10. Intellectual Property" },
  { id: "liability", label: "11. Limitation of Liability" },
  { id: "indemnification", label: "12. Indemnification" },
  { id: "disputes", label: "13. Dispute Resolution" },
  { id: "governing", label: "14. Governing Law" },
  { id: "changes", label: "15. Changes to Terms" },
  { id: "contact", label: "16. Contact Us" },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <FileText className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Terms & Conditions
          </h1>
          <p className="text-slate-500">Last updated: May 2026</p>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
                Table of Contents
              </h2>
              <ul className="space-y-2">
                {TOC.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-slate-500 hover:text-emerald-600 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="lg:hidden mb-8">
            <Accordion type="single" collapsible className="bg-white rounded-xl border border-slate-100">
              <AccordionItem value="toc">
                <AccordionTrigger className="px-5">Table of Contents</AccordionTrigger>
                <AccordionContent className="px-5 pb-4">
                  <ul className="space-y-2">
                    {TOC.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-sm text-slate-500 hover:text-emerald-600 transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <article className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-10 space-y-10">
            <section id="introduction">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                These Terms and Conditions ("Terms") govern your use of the Proxxi platform, including the website and mobile application (collectively, the "Platform"). By accessing or using Proxxi, you agree to be bound by these Terms in full.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Proxxi is operated by [Company Name], a company registered under the laws of the Federal Republic of Nigeria, with its registered office located at [Address]. These Terms constitute a legally binding agreement between you and Proxxi.
              </p>
            </section>

            <section id="definitions">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Definitions</h2>
              <dl className="space-y-3 text-slate-600">
                <div className="flex gap-2"><dt className="font-semibold text-slate-800 min-w-[120px]">Proxxi:</dt><dd>The Platform, services, and technology operated by [Company Name].</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-slate-800 min-w-[120px]">Platform:</dt><dd>The Proxxi website and mobile application.</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-slate-800 min-w-[120px]">User:</dt><dd>Any person who accesses or uses the Platform.</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-slate-800 min-w-[120px]">Consumer:</dt><dd>A User who books and pays for services through the Platform.</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-slate-800 min-w-[120px]">Provider:</dt><dd>A verified service professional who offers services through the Platform.</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-slate-800 min-w-[120px]">Service:</dt><dd>Any service offered by a Provider through the Platform.</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-slate-800 min-w-[120px]">Booking:</dt><dd>A confirmed arrangement between a Consumer and a Provider.</dd></div>
                <div className="flex gap-2"><dt className="font-semibold text-slate-800 min-w-[120px]">Payment:</dt><dd>Funds transferred through the Platform for a Service.</dd></div>
              </dl>
            </section>

            <section id="acceptance">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By creating an account or using any part of the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use the Platform. These Terms apply to all Users, whether Consumers, Providers, or visitors.
              </p>
            </section>

            <section id="accounts">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. User Accounts</h2>
              <p className="text-slate-600 leading-relaxed">
                To access certain features of the Platform, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You are solely responsible for safeguarding your account credentials. Proxxi reserves the right to suspend or terminate accounts that violate these Terms or engage in fraudulent activity.
              </p>
            </section>

            <section id="consumer">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Consumer Terms</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                As a Consumer, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Provide accurate and complete information when creating an account and placing bookings.</li>
                <li>Pay for services as agreed and in accordance with the pricing displayed on the Platform.</li>
                <li>Treat Providers with respect and courtesy at all times.</li>
                <li>Not misuse the Platform for fraudulent purposes, including but not limited to false bookings, chargebacks, or misrepresentation.</li>
                <li>Comply with all applicable laws of the Federal Republic of Nigeria when using the Platform.</li>
              </ul>
            </section>

            <section id="provider">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Provider Terms</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                As a Provider, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Provide accurate information during the registration and verification process.</li>
                <li>Deliver services with reasonable skill, care, and professionalism.</li>
                <li>Maintain appropriate licenses, certifications, and qualifications required for your service category.</li>
                <li>Set transparent and accurate pricing with no hidden fees.</li>
                <li>Not engage in deceptive, misleading, or fraudulent practices.</li>
                <li>Respond to booking requests in a timely manner.</li>
                <li>Comply with all applicable Nigerian laws and regulations governing your profession.</li>
              </ul>
            </section>

            <section id="bookings">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Bookings & Payments</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                All bookings made through Proxxi are subject to availability and confirmation. Payments are processed securely through Paystack. Proxxi reserves the right to withhold payment if fraudulent activity is suspected. Service fees are clearly displayed before booking confirmation. By confirming a booking, you agree to pay the total amount displayed, which includes the service fee and any applicable taxes.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Proxxi acts as an intermediary and is not a party to the service contract between the Consumer and the Provider, unless otherwise explicitly stated.
              </p>
            </section>

            <section id="cancellations">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Cancellations & Refunds</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Consumers may cancel a booking up to 2 hours before the scheduled service time and receive a full refund. Cancellations made within 2 hours of the scheduled time may be subject to a cancellation fee at the discretion of the Provider. Provider cancellations may result in account suspension or termination, particularly for repeat offenders. Refund disputes can be raised within 48 hours of the scheduled service time through the Platform or by contacting support@proxxi.app.
              </p>
              <p className="text-slate-600 leading-relaxed">
                In cases where a Provider fails to arrive or deliver the service, the Consumer is entitled to a full refund following an investigation by Proxxi.
              </p>
            </section>

            <section id="reviews">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Ratings & Reviews</h2>
              <p className="text-slate-600 leading-relaxed">
                After a service is completed, Consumers may leave a rating and review for the Provider. Reviews must be honest, factual, and free from defamation, harassment, or hate speech. Proxxi reserves the right to remove reviews that violate these guidelines. Providers may not retaliate against Consumers for negative reviews.
              </p>
            </section>

            <section id="ip">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Intellectual Property</h2>
              <p className="text-slate-600 leading-relaxed">
                All content, designs, logos, trademarks, and software on the Platform are the property of Proxxi or its licensors and are protected by Nigerian and international intellectual property laws. Users may not reproduce, distribute, or create derivative works from Proxxi content without prior written consent.
              </p>
            </section>

            <section id="liability">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed">
                Proxxi acts as an intermediary between Consumers and Providers. To the fullest extent permitted by Nigerian law, Proxxi shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of the Platform or the services of any Provider. Proxxi does not guarantee the quality, safety, or legality of any service provided.
              </p>
            </section>

            <section id="indemnification">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Indemnification</h2>
              <p className="text-slate-600 leading-relaxed">
                You agree to indemnify and hold harmless Proxxi, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from your use of the Platform, your violation of these Terms, or your violation of any applicable law.
              </p>
            </section>

            <section id="disputes">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Dispute Resolution</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Any dispute arising from these Terms or your use of the Platform shall first be subject to mandatory mediation. The parties shall attempt to resolve the dispute in good faith through mediation administered by a recognized Nigerian mediation body within 30 days of written notice of the dispute.
              </p>
              <p className="text-slate-600 leading-relaxed">
                If mediation fails, disputes shall be referred to arbitration under the Arbitration and Conciliation Act (ACA) of Nigeria. The arbitration shall take place in Lagos, Nigeria, and the arbitration award shall be final and binding.
              </p>
            </section>

            <section id="governing">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Governing Law</h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes not subject to arbitration shall fall under the exclusive jurisdiction of the courts of the Federal Republic of Nigeria.
              </p>
            </section>

            <section id="consumer-rights">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Consumer Rights</h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms are subject to the Federal Competition and Consumer Protection Act (FCCPA) 2018 and other applicable Nigerian laws. As a Consumer, you are entitled to protection under the FCCPA, including the right to fair, honest, and safe services. You also have the right to lodge complaints with the Federal Competition and Consumer Protection Commission (FCCPC) if your rights are violated.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">15. Changes to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                Proxxi reserves the right to modify these Terms at any time. Changes will be effective immediately upon posting on the Platform. Your continued use of the Platform after any change constitutes your acceptance of the updated Terms. It is your responsibility to review these Terms periodically.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">16. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed">
                If you have any questions about these Terms, please contact us at{" "}
                <Link href="mailto:support@proxxi.app" className="text-emerald-600 hover:underline">
                  support@proxxi.app
                </Link>{" "}
                or through the{" "}
                <Link href="/report" className="text-emerald-600 hover:underline">
                  Report an Issue
                </Link>{" "}
                page on our Platform.
              </p>
            </section>

            <div className="pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-400">Last updated: May 2026</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
