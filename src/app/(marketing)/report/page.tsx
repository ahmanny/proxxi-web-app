"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Lock, Mail } from "lucide-react";
import { useSubmitReport } from "@/services/marketing/marketingQueries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "Booking Issue",
  "Provider Behavior",
  "Payment Issue",
  "Technical Problem",
  "Safety Concern",
  "Other",
];

export default function ReportPage() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const submitReport = useSubmitReport();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    if (description.trim().length < 20) {
      toast.error("Description must be at least 20 characters");
      return;
    }

    submitReport.mutate(
      { category, description: description.trim(), email: email.trim() || undefined, bookingId: bookingId.trim() || undefined },
      {
        onSuccess: () => {
          toast.success("Report submitted successfully");
          router.push("/");
        },
        onError: () => {
          toast.error("Failed to submit report. Please try again.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Report an issue
          </h1>
          <p className="text-slate-500 text-lg">
            Help us keep Proxxi safe and reliable
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-red-600">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bookingId">Booking ID</Label>
              <Input
                id="bookingId"
                type="text"
                placeholder="e.g. BOOK-12345"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="so we can follow up"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-red-600">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Please describe the issue in detail..."
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none"
              />
              <p className="text-xs text-slate-400 text-right">
                {description.length} / 20 min
              </p>
            </div>

            <Button
              type="submit"
              disabled={submitReport.isPending}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {submitReport.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </form>
        </div>

        <div className="mt-6 flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
          <Lock className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-emerald-800 leading-relaxed">
            Your report is treated with strict confidentiality. We take all
            reports seriously and investigate promptly.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Prefer email?{" "}
          <Link
            href="mailto:support@proxxi.app"
            className="text-emerald-600 hover:underline font-medium"
          >
            Contact us at support@proxxi.app
          </Link>
        </p>
      </div>
    </div>
  );
}
