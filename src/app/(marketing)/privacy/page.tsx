"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldCheck } from "lucide-react";

const TOC = [
  { id: "introduction", label: "1. Introduction" },
  { id: "collection", label: "2. Information We Collect" },
  { id: "usage", label: "3. How We Use Your Information" },
  { id: "legal", label: "4. Legal Basis for Processing (NDPR)" },
  { id: "sharing", label: "5. Data Sharing & Third Parties" },
  { id: "security", label: "6. Data Security" },
  { id: "retention", label: "7. Data Retention" },
  { id: "rights", label: "8. Your Rights (NDPR)" },
  { id: "cookies", label: "9. Cookies & Tracking" },
  { id: "children", label: "10. Children's Privacy" },
  { id: "changes", label: "11. Changes to Policy" },
  { id: "contact", label: "12. Contact Us" },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-slate-500">Last updated: May 2026</p>
          <p className="text-slate-500 text-lg mt-2">
            How we collect, use, and protect your data
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium text-emerald-700">NDPR Compliant</span>
          </div>
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
              <p className="text-slate-600 leading-relaxed">
                Proxxi ("we," "our," or "us") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information in accordance with the Nigeria Data Protection Regulation (NDPR) 2019 and the Nigeria Data Protection Act (NDPA) 2023. By using Proxxi, you consent to the practices described in this policy.
              </p>
            </section>

            <section id="collection">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                We collect the following categories of personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li><strong>Identity data:</strong> Name, date of birth, gender, profile photo.</li>
                <li><strong>Contact data:</strong> Email address, phone number, physical address.</li>
                <li><strong>Payment data:</strong> Billing information, payment method details (processed via Paystack).</li>
                <li><strong>Location data:</strong> Real-time location during service delivery, saved addresses.</li>
                <li><strong>Transaction data:</strong> Service history, booking records, provider ratings.</li>
                <li><strong>Communication data:</strong> Messages between Consumers and Providers, support tickets.</li>
                <li><strong>Technical data:</strong> Device information, IP address, browser type, operating system.</li>
                <li><strong>Usage data:</strong> Pages visited, features used, session duration.</li>
              </ul>
            </section>

            <section id="usage">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                We use your personal data for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Processing and managing your account and bookings.</li>
                <li>Facilitating payments between Consumers and Providers.</li>
                <li>Matching Consumers with appropriate Providers based on service category and location.</li>
                <li>Sending booking confirmations, reminders, and service-related notifications.</li>
                <li>Verifying Provider identity, qualifications, and background where applicable.</li>
                <li>Providing customer support and resolving disputes.</li>
                <li>Improving our Platform, services, and user experience through analytics.</li>
                <li>Complying with legal obligations under Nigerian law.</li>
                <li>Detecting and preventing fraud, abuse, and security incidents.</li>
              </ul>
            </section>

            <section id="legal">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Legal Basis for Processing (NDPR)</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Under the Nigeria Data Protection Regulation (NDPR) 2019 and the NDPA Act 2023, we process your personal data under the following lawful bases:
              </p>
              <dl className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <dt className="font-semibold text-slate-800 mb-1">Consent</dt>
                  <dd className="text-slate-600 text-sm">You have given explicit, informed consent to the processing of your personal data for one or more specific purposes. You may withdraw consent at any time.</dd>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <dt className="font-semibold text-slate-800 mb-1">Contract</dt>
                  <dd className="text-slate-600 text-sm">Processing is necessary for the performance of a contract we have with you, such as processing your booking and facilitating payment.</dd>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <dt className="font-semibold text-slate-800 mb-1">Legal Obligation</dt>
                  <dd className="text-slate-600 text-sm">We are required by Nigerian law to process certain data, including tax records, anti-money laundering compliance, and regulatory reporting.</dd>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <dt className="font-semibold text-slate-800 mb-1">Legitimate Interests</dt>
                  <dd className="text-slate-600 text-sm">We have a genuine business need to process your data that does not override your rights and freedoms. This includes fraud prevention, improving our services, and network security.</dd>
                </div>
              </dl>
            </section>

            <section id="sharing">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Sharing & Third Parties</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                We share your personal data with the following third parties:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Paystack:</strong> For secure payment processing. Their use of your data is governed by their own privacy policy.</li>
                <li><strong>Cloud infrastructure providers:</strong> Hosting and data storage services that operate under our instructions.</li>
                <li><strong>Law enforcement and regulatory bodies:</strong> When legally required by Nigerian law, including responses to valid court orders, law enforcement requests, or regulatory investigations.</li>
                <li><strong>Trusted service providers:</strong> Analytics, communication, and customer support providers operating under data processing agreements.</li>
              </ul>
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                <p className="text-sm text-emerald-800 font-medium">
                  We do not sell your personal data to any third party for commercial purposes.
                </p>
              </div>
            </section>

            <section id="security">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Security</h2>
              <p className="text-slate-600 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include encryption in transit and at rest, access controls, regular security audits, and staff training on data protection. While we strive to protect your data, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section id="retention">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data Retention</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                We retain your personal data for as long as your account is active or as needed to provide services to you. Specific retention periods are as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li><strong>Account data:</strong> Retained for the duration of your account plus 90 days after account closure.</li>
                <li><strong>Transaction and booking records:</strong> Retained for a minimum of 5 years in compliance with Nigerian tax and financial regulations.</li>
                <li><strong>Support and communication records:</strong> Retained for 2 years after the case is closed.</li>
                <li><strong>Fraud and security records:</strong> Retained for 7 years in accordance with anti-fraud and legal requirements.</li>
              </ul>
            </section>

            <section id="rights">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Your Rights (NDPR)</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                Under the NDPR 2019 and NDPA Act 2023, you have the following rights:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Right of Access:</strong> Request a copy of your personal data held by us.</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete personal data.</li>
                <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your personal data where there is no compelling reason for its continued processing.</li>
                <li><strong>Right to Restrict Processing:</strong> Request that we limit the processing of your personal data in specific circumstances.</li>
                <li><strong>Right to Data Portability:</strong> Receive your personal data in a structured, commonly used, and machine-readable format.</li>
                <li><strong>Right to Object:</strong> Object to processing of your personal data based on legitimate interests or for direct marketing.</li>
                <li><strong>Right to Lodge a Complaint:</strong> File a complaint with the Nigeria Data Protection Agency (NDPA) if you believe your rights have been violated.</li>
              </ol>
              <p className="text-slate-600 leading-relaxed">
                To exercise any of these rights, contact us at{" "}
                <Link href="mailto:privacy@proxxi.app" className="text-emerald-600 hover:underline">
                  privacy@proxxi.app
                </Link>
                . We will respond to your request within 30 days.
              </p>
            </section>

            <section id="cookies">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Cookies & Tracking</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                We use cookies and similar tracking technologies to operate our Platform. The types of cookies we use are:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Essential cookies:</strong> Required for the Platform to function. They cannot be disabled.</li>
                <li><strong>Performance cookies:</strong> Help us understand how visitors interact with the Platform by collecting anonymous information.</li>
                <li><strong>Analytics cookies:</strong> Used to improve the user experience and Platform performance.</li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                You can manage your cookie preferences through your browser settings. Disabling cookies may affect the functionality of the Platform.
              </p>
            </section>

            <section id="children">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Children's Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                Proxxi does not knowingly collect personal data from individuals under 13 years of age. If we become aware that we have collected data from a child under 13 without verification of parental consent, we will take steps to delete that information as soon as possible. If you believe a child under 13 has provided us with personal data, please contact us at{" "}
                <Link href="mailto:privacy@proxxi.app" className="text-emerald-600 hover:underline">
                  privacy@proxxi.app
                </Link>
                .
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. Any changes will be communicated by posting the updated policy on the Platform with an updated "Last updated" date. Your continued use of the Platform after any changes constitutes acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                For privacy-related inquiries, to exercise your data rights, or to report a data incident, contact us:
              </p>
              <div className="bg-slate-50 rounded-lg p-5 space-y-3">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Data Protection Officer</p>
                  <Link href="mailto:dpo@proxxi.app" className="text-emerald-600 hover:underline">
                    dpo@proxxi.app
                  </Link>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Privacy Team</p>
                  <Link href="mailto:privacy@proxxi.app" className="text-emerald-600 hover:underline">
                    privacy@proxxi.app
                  </Link>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Registered Office</p>
                  <p className="text-sm text-slate-500">[Address], Lagos, Nigeria</p>
                </div>
              </div>
              <p className="text-slate-500 text-sm mt-4">
                You also have the right to lodge a complaint with the Nigeria Data Protection Agency (NDPA) at{" "}
                <Link href="https://ndpa.gov.ng" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  ndpa.gov.ng
                </Link>
                .
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
