"use client";

import { passwordResetSchema } from "@/lib/validators/authValidator";
import { useResetPassword } from "@/services/auth/authQueries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../my-ui/form/InputField";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const resetPasswordMutation = useResetPassword();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordResetSchema),
  });

  // Function to reset password{ newPassword: string; confirmPassword: string }
  function onsubmit(data: any) {
    if (token) {
      const credentials = {
        newPassword: data.newPassword,
        token: token,
      };
      resetPasswordMutation.mutate(credentials);
      console.log(credentials);
    }
  }

  return (
    <div className="flex flex-col py-36 items-center gap-[30px]">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex flex-col gap-[15px] w-[350px]"
      >
        {/* new password input */}
        <InputField
          name="newPassword"
          label="New Password"
          register={register}
          errors={errors}
        />
        {/* confirm password input */}
        <InputField
          name="confirmPassword"
          label="Confirm Password"
          register={register}
          errors={errors}
        />
        {/* submit button */}
        <button
          type="submit"
          className="primary-p1 text-custom-50 h-[40px] w-full rounded-md mt-8"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
