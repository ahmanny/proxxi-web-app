"use client";

import { useUpdateUser } from "@/services/users/usersQueries";
import { User, useUserStore } from "@/store/UserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import InputField from "../my-ui/form/InputField";

const accountDetailSchema = z.object({
  name: z.string().min(3, "Enter your full name"),
  email: z.string().email("invalid Email"),
});

export default function AccountDetail() {
  const updateUserMutation = useUpdateUser();
  const { user, updateUser } = useUserStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accountDetailSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  //  Prefill form when user data is available
  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        name: user.name,
      });
    }
  }, [user, reset]);

  function submitChanges(data: Partial<User>) {
    console.log(data);
    toast.success("sumitted");
    updateUserMutation.mutate(data, {
      onSuccess: () => {
        updateUser(data);
        toast.success("Profile updated successfully");
      },
    });
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(submitChanges)}
        className=" flex flex-col py-14 gap-[35px] w-[320px] "
      >
        {/* <Avatar.Root size={"2xl"}>
          <Avatar.Fallback name={user?.name} />
          <Avatar.Image src={user?.profilePicture} />
        </Avatar.Root> */}
        <div className="flex flex-col gap-[18px]">
          <InputField
            label="Full Name"
            name="name"
            register={register}
            errors={errors}
          />
          <InputField
            label="Email"
            name="email"
            register={register}
            errors={errors}
          />
        </div>
        <button type="submit" className="btn !w-1/2">
          Save Changes
        </button>
      </form>
    </div>
  );
}
