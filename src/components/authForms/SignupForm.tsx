"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignupUser } from "@/services/auth/authQueries";
import InputField from "../my-ui/form/InputField";
import GoogleAuth from "./GoogleAuth";
import { signupSchema } from "@/lib/validators/authValidator";

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const signupMutation = useSignupUser();
  // function to handle submit form click.
  function submitForm(data: any) {
    signupMutation.mutate(data, {
      onSuccess: () => {
        router.push(callbackUrl);
      },
    });
  }
  return (
    <div className="flex flex-col justify-center items-center py-24 gap-[30px]">
      {/* component for google sign in option */}
      <GoogleAuth />
      {/* sign up form */}
      <form
        onSubmit={handleSubmit(submitForm)}
        className=" flex flex-col gap-[15px]"
      >
        {/* name label and input */}
        <InputField
          label="Name"
          name="name"
          register={register}
          errors={errors}
        />
        {/* email label and input */}
        <InputField
          label="Email"
          errors={errors}
          name="email"
          register={register}
        />
        {/* password label and input */}
        <InputField
          name="password"
          label="Password"
          register={register}
          errors={errors}
        />
        <div className=" w-[350px] flex justify-end ">
          <p className=" capitalize text-sm">
            by creating An account you agree with our terms or services, Privacy
            policy.
          </p>
        </div>

        <div>
          <button
            type="submit"
            className="primary-p1 text-custom-50 h-[40px] w-full rounded-md"
          >
            {signupMutation.isPending ? (
              <BeatLoader color="#3498db" />
            ) : (
              "Create Account"
            )}
          </button>
          {/* backend errors */}
          {signupMutation.isError && (
            <p className=" text-red-500">
              {String(signupMutation.error?.message)}
            </p>
          )}
        </div>
      </form>
      <div>
        <p>
          Already have an account? <Link href="/auth/login"> Login Up</Link>
        </p>
      </div>
    </div>
  );
}
