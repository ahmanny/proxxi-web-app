"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginAdmin } from "@/services/auth/authQueries";
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2,
  Mail,
  Eye,
  EyeOff,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type AdminLoginFormData = z.infer<typeof schema>;

export default function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginAdmin();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<AdminLoginFormData> = (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Admin login successful");
        router.push(callbackUrl);
        router.refresh();
      },
      onError: (err: any) => {
        const errMsg = err?.response?.data?.message || err?.message || "Authentication failed";
        toast.error(errMsg);
      },
    });
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 select-none">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="bg-primary shadow-primary/20 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl shadow-lg">
            <ShieldCheck className="text-primary-foreground h-7 w-7" />
          </div>
          <h1 className="text-foreground text-3xl font-extrabold tracking-tight">
            Proxxi Admin
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Sign in to access the administrator panel
          </p>
        </div>

        <Card className="border-border bg-card border shadow-xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@proxxi.com"
                    className="flex h-9 w-full rounded-md border border-input bg-background/50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground border-border focus:border-ring focus:ring-ring/50 pl-10 outline-none"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-destructive flex items-center gap-1 text-xs mt-1">
                    <span className="bg-destructive inline-block h-1 w-1 shrink-0 rounded-full" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="flex h-9 w-full rounded-md border border-input bg-background/50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground border-border focus:border-ring focus:ring-ring/50 pr-10 pl-10 outline-none"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-destructive flex items-center gap-1 text-xs mt-1">
                    <span className="bg-destructive inline-block h-1 w-1 shrink-0 rounded-full" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button & Server Errors */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-full cursor-pointer"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </button>

                {loginMutation.isError && (
                  <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 backdrop-blur-sm transition-all duration-200">
                    <p className="text-xs font-medium text-destructive text-center leading-relaxed">
                      {loginMutation.error?.message || "Authentication failed"}
                    </p>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
