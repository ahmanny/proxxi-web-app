"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useSubmitContact } from "@/services/marketing/marketingQueries";
import toast from "react-hot-toast";

const subjectOptions = [
  "General Inquiry",
  "Partnership",
  "Technical Issue",
  "Provider Support",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: submitContact, isPending } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    submitContact({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone || undefined,
      subject: formData.subject,
      message: formData.message,
    }, {
      onSuccess: () => {
        setShowSuccess(true);
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
      },
      onError: () => {
        toast.error("Failed to send message. Please try again.");
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in touch</h1>
        <p className="text-lg text-slate-600">
          Have a question or feedback? We&apos;d love to hear from you.
        </p>
      </section>

      <section className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8">
            {showSuccess ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600 mb-6">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="text-emerald-600 font-medium hover:text-emerald-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone <span className="text-slate-400">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition-colors"
                      placeholder="+234 XXX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition-colors bg-white"
                    >
                      <option value="">Select a subject</option>
                      {subjectOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Email</h3>
                  <p className="text-slate-600 text-sm">hello@proxxi.app</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Phone</h3>
                  <p className="text-slate-600 text-sm">+234 XXX XXX XXXX</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Address</h3>
                  <p className="text-slate-600 text-sm">Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Hours</h3>
                  <p className="text-slate-600 text-sm">Mon-Fri 9am-6pm WAT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-16 text-center">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Have questions?</h3>
          <p className="text-slate-600 mb-4">
            Check out our frequently asked questions for quick answers.
          </p>
          <Link
            href="/help"
            className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700"
          >
            Visit Help Center
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
