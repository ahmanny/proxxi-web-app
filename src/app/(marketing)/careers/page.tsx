import Link from "next/link";
import {
  Scissors,
  Wind,
  Zap,
  Wrench,
  Home,
  CheckCircle2,
  ArrowRight,
  Download,
} from "lucide-react";

const benefits = [
  {
    title: "Be your own boss",
    description: "Set your own schedule, choose your clients",
  },
  {
    title: "Grow your earnings",
    description: "Build a loyal customer base and earn consistently",
  },
  {
    title: "Trusted by thousands",
    description: "Verified providers get more bookings",
  },
  {
    title: "Fast payouts",
    description: "Get paid weekly directly to your bank account",
  },
];

const services = [
  {
    icon: Scissors,
    title: "Barbers",
    description: "Men's grooming and hairstyling",
  },
  {
    icon: Wind,
    title: "Hair Stylists",
    description: "Coloring, braiding, treatments",
  },
  {
    icon: Zap,
    title: "Electricians",
    description: "Wiring, repairs, installations",
  },
  {
    icon: Wrench,
    title: "Plumbers",
    description: "Pipe fitting, leak repairs, installations",
  },
  {
    icon: Home,
    title: "House Cleaners",
    description: "Home cleaning, deep cleaning, post-construction",
  },
];

const steps = [
  {
    step: "01",
    title: "Create your profile",
    description: "Sign up and tell us about your skills",
  },
  {
    step: "02",
    title: "Get verified",
    description:
      "Our team reviews your profile, usually within 24 hours",
  },
  {
    step: "03",
    title: "Start earning",
    description: "Accept bookings and get paid weekly",
  },
];

const testimonials = [
  {
    name: "Emeka",
    location: "Lagos",
    quote:
      "I've been on Proxxi for 6 months and my income has tripled. I now have regular clients who book me every week.",
  },
  {
    name: "Chidimma",
    location: "Abuja",
    quote:
      "The verification process was quick. I was taking bookings within 2 days of signing up.",
  },
  {
    name: "Tunde",
    location: "Port Harcourt",
    quote:
      "What I love most is the flexibility. I choose when I work and set my own prices.",
  },
];

const blogPosts = [
  {
    title: "What Makes a Great Barber? Tips from Top-Rated Proxxi Providers",
    excerpt:
      "We spoke with five of the highest-rated barbers on Proxxi to find out what separates a good haircut from a great one.",
    date: "March 18, 2026",
    slug: "what-makes-great-barber-proxxi-providers",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=450&fit=crop",
  },
  {
    title: "How Proxxi Verified Providers Ensure Quality Service",
    excerpt:
      "Every Proxxi provider goes through a verification process. Here's exactly what that means and why it matters.",
    date: "February 20, 2026",
    slug: "how-proxxi-verified-providers-ensure-quality",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop",
  },
  {
    title: "The Rise of On-Demand Home Services in Nigeria",
    excerpt:
      "From booking a barber to scheduling a plumber, on-demand home services are reshaping how Nigerians manage their households.",
    date: "March 28, 2026",
    slug: "rise-of-on-demand-home-services-nigeria",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=450&fit=crop",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-emerald-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-800/50 text-emerald-300 text-sm font-medium rounded-full">
              <CheckCircle2 className="w-4 h-4" />
              Join thousands of providers across Nigeria
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Turn your skill into a business
            </h1>
            <p className="text-lg text-emerald-100 leading-relaxed">
              Join thousands of providers earning on Proxxi. Be your own boss.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
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
        </div>
      </section>

      {/* ── WHY BECOME A PROXXI PROVIDER? ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Why become a Proxxi provider?
            </h2>
            <p className="text-slate-500 text-lg">
              Join the fastest-growing home services platform in Nigeria
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES WE'RE LOOKING FOR ── */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Services we&apos;re looking for
            </h2>
            <p className="text-slate-500 text-lg">
              Join these categories and start earning today
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1 text-center">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YOUR JOURNEY STARTS HERE ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Your journey starts here
            </h2>
            <p className="text-slate-500 text-lg">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100"
              >
                <span className="text-xs font-semibold text-emerald-600 tracking-widest uppercase mb-2 block">
                  Step {step.step}
                </span>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="/provider/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-colors"
            >
              Sign Up Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── PROVIDER TESTIMONIALS ── */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              What our providers say
            </h2>
            <p className="text-slate-500 text-lg">
              Real stories from Proxxi providers across Nigeria
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-lg font-semibold text-emerald-600">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-500">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST FROM OUR BLOG ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Latest from our blog
            </h2>
            <p className="text-slate-500 text-lg">
              Tips and insights for service providers
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-300 hover:shadow-md transition-all duration-200"
              >
                <div className="aspect-video bg-slate-100 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <p className="text-xs text-slate-400">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors"
            >
              View All Posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-slate-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Ready to start?
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Download the Proxxi provider app and join thousands of service
              professionals earning on their own terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
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
        </div>
      </section>
    </>
  );
}