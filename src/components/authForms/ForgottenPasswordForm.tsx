"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { z } from "zod";
import InputField from "../my-ui/form/InputField";
import { useFogottenPassword } from "@/services/auth/authQueries";

const schema = z.object({
  email: z.string().email("invallid Email"),
});
export default function ForgottenPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const forgottenPasswordMutation = useFogottenPassword();
  function submitForm(data: any) {
    forgottenPasswordMutation.mutate(data);
  }
  return (
    <div className="flex flex-col py-36 items-center gap-[30px]">
      <div className=" w-[350px]">
        <p className=" body-p1 mb-6">
          Please enter the email address associated with your account. We'll
          promptly send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className=" flex-col flex gap-2 mb-6 ">
            <InputField
              name="email"
              label="Email"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <button
              type="submit"
              className="primary-p1 text-custom-50 h-[40px] w-full rounded-md"
            >
              {forgottenPasswordMutation.isPending ? (
                <BeatLoader color="#3498db" />
              ) : (
                "Send reset link"
              )}
            </button>

            {/* backend errors */}
            {forgottenPasswordMutation.isError && (
              <p className=" text-red-500">
                {String(forgottenPasswordMutation.error?.message)}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
