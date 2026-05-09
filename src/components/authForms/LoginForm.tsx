"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginUser } from "@/services/auth/authQueries";
import GoogleAuth from "./GoogleAuth";
import InputField from "../my-ui/form/InputField";
import { loginSchema } from "@/lib/validators/authValidator";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const loginMutation = useLoginUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = decodeURIComponent(
    searchParams.get("callbackUrl") || "/"
  );

  // function to handle submit form click.
  function submitForm(data: any) {
    loginMutation.mutateAsync(data, {
      onSuccess: () => {
        router.push(callbackUrl);
      },
    });
  }
  return (
    <div className="flex flex-col justify-center items-center py-24 gap-[30px]">
      {/* component for google sign in option */}
      <GoogleAuth />
      {/* login form */}
      <form
        onSubmit={handleSubmit(submitForm)}
        className=" flex flex-col gap-[15px] w-[350px]"
      >
        {/* email input  */}
        <InputField
          name="email"
          label="Email"
          register={register}
          errors={errors}
        />
        {/* password input */}
        <InputField
          name="password"
          label="Password"
          register={register}
          errors={errors}
        />
        {/* forgotten password button */}
        <div className=" w-full flex justify-end">
          <Link
            href={`/auth/forgotten-password`}
            className=" text-right mb-3 hover:text-opacity-80"
          >
            Forgotten Password?
          </Link>
        </div>
        {/* submit form button */}
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
      <div>
        <p>
          Don't have an account? <Link href="/auth/sign-up"> Sign up</Link>
        </p>
      </div>
    </div>
  );
}
