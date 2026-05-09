"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BeatLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginAdmin } from "@/services/auth/authQueries";
import InputField from "../my-ui/form/InputField";

const schema = z.object({
  email: z.string().email("invalid Email"),
  password: z.string().min(8, "password must be  at least 8 characters"),
});
export default function AdminLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const loginMutation = useLoginAdmin();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";
  const router = useRouter();
  // function to handle submit form click.
  function submitForm(data: any) {
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.push(callbackUrl);
      },
    });
  }
  return (
    <div className="flex flex-col justify-center items-center py-24 gap-[30px] min-h-screen">
      <div className="flex items-center gap-3">
        <img 
          src="/logo.png" 
          alt="Proxxi" 
          className="w-12 h-12 object-contain"
        />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Proxxi</h1>
          <p className="text-sm text-muted-foreground">Admin Portal</p>
        </div>
      </div>
      {/* login form */}
      <form
        onSubmit={handleSubmit(submitForm)}
        className=" flex flex-col gap-[15px] w-[320px]"
      >
        <InputField
          name="email"
          label="Email"
          register={register}
          errors={errors}
        />
        <InputField
          name="password"
          label="Password"
          register={register}
          errors={errors}
        />
        <button
          type="submit"
          className="primary-p1 text-custom-50 h-[40px] w-full rounded-md"
        >
          {loginMutation.isPending ? <BeatLoader color="#3498db" /> : "Login"}
        </button>
        {/* backend errors */}
        {loginMutation.isError && (
          <p className=" text-red-500">
            {String(loginMutation.error?.message)}
          </p>
        )}
      </form>
    </div>
  );
}
