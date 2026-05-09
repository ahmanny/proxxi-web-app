"use client";

import InputField from "@/components/my-ui/form/InputField";
import { useUpdateUser } from "@/services/users/usersQueries";
import { useUserStore } from "@/store/UserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { z } from "zod";

const addressSchema = z.object({
  address: z.string().min(3, "Enter your Address"),
  city: z.string().min(1, "Enter your City"),
  state: z.string().min(3, "Enter your State"),
  zipCode: z.string().min(3, "Enter your Zip Code"),
  country: z.string().min(3, "Please select your Country"),
});
type AddressFormData = z.infer<typeof addressSchema>;
export default function AddressForm() {
  const updateUserMutation = useUpdateUser();
  const { user, updateUser } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  // ✅ Prefill form when user data is available
  useEffect(() => {
    if (user?.shippingAddress) {
      reset({
        address: user.shippingAddress.address,
        city: user.shippingAddress.city,
        state: user.shippingAddress.state,
        zipCode: user.shippingAddress.zipCode,
        country: user.shippingAddress.country,
      });
    }
  }, [user, reset]);

  function submitForm(data: AddressFormData) {
    const shippingAddress = {
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: data.country,
    };
    console.log(data);
    toast.success("sumitted");
    updateUserMutation.mutate(shippingAddress, {
      onSuccess: () => {
        updateUser({
          shippingAddress: shippingAddress,
        });
        toast.success("Profile updated successfully");
      },
    });
  }
  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-14 py-14">
      <div>
        <div className=" flex flex-col gap-[15px]">
          <InputField
            label="Street Address"
            name="address"
            register={register}
            errors={errors}
          />
          {/* city and state input */}
          <div className="flex gap-8 w-full">
            <div className=" flex-col flex w-1/2">
              <InputField
                label="City"
                name="city"
                register={register}
                errors={errors}
              />
            </div>
            <div className=" flex-col flex w-1/2">
              <InputField
                label="State"
                name="state"
                register={register}
                errors={errors}
              />
            </div>
          </div>
          {/* zip code and country input  */}
          <div className="flex gap-8 w-full ">
            <div className=" flex-col flex w-1/2">
              <InputField
                label="Zip Code"
                name="zipCode"
                register={register}
                errors={errors}
              />
            </div>
            <div className=" flex-col flex w-1/2 ">
              <InputField
                label="Country"
                name="country"
                register={register}
                errors={errors}
              />
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="btn !w-1/2">
        {updateUserMutation.isPending ? (
          <BeatLoader color="#3498db" />
        ) : (
          "Save Changes"
        )}
      </button>
    </form>
  );
}
