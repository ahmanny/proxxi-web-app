'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Verification token is missing from the URL.');
      return;
    }

    const verifyToken = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://proxxi-web-neon.vercel.app/v1';
        // Call backend verification endpoint
        const response = await axios.get(`${apiUrl}/consumer/verify-email?token=${token}`);
        
        setStatus('success');
        setMessage(response.data?.message || 'Your email address has been verified successfully!');
      } catch (err: any) {
        setStatus('error');
        setMessage(
          err.response?.data?.message ||
            err.message ||
            'The verification link is invalid or has expired. Please request a new code in the app.'
        );
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800 text-center">
        
        {/* HEADER BRAND */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Proxxi
          </span>
        </div>

        {/* LOADING STATE */}
        {status === 'loading' && (
          <div className="py-8 flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Verifying Email
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Please wait while we confirm your verification link...
            </p>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === 'success' && (
          <div className="py-4 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
              Email Verified! 🎉
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8">
              {message}
            </p>

            <Link
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
            >
              <span>Return to Proxxi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* ERROR STATE */}
        {status === 'error' && (
          <div className="py-4 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6">
              <AlertCircle className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
              Verification Failed
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8">
              {message}
            </p>

            <Link
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              <span>Go to Homepage</span>
            </Link>
          </div>
        )}
      </div>

      {/* FOOTER NOTE */}
      <p className="mt-8 text-xs text-slate-400 dark:text-slate-500">
        © {new Date().getFullYear()} Proxxi Inc. All rights reserved.
      </p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
