"use client";

import InputField from "@/components/my-ui/form/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const passwordChangeSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordChangeSchema),
  });

  const submitChanges = (data: any) => {
    const credentials = {
      newPassword: data.newPassword,
    };
    // changePasswordMutation.mutate(shippingAddress, {
    //   onSuccess: () => {
    //     toast.success("password changed successfully");
    //   },
    // });
    //   changePasswordMutation.mutate(credentials);
    console.log(credentials);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(submitChanges)}
        className=" flex flex-col py-14 gap-[45px] w-[320px] "
      >
        <div className="flex flex-col gap-[18px]">
          {/* new password input */}
          <div className="flex-col flex w-full">
            <InputField
              label="New Password"
              name="newPassword"
              register={register}
              errors={errors}
            />
          </div>
          {/* confirm password input */}
          <div className="flex-col flex w-full">
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              register={register}
              errors={errors}
            />
          </div>
        </div>
        {/* submit button */}
        <button type="submit" className="btn !w-1/2">
          change password
        </button>
      </form>
    </div>
  );
}
