"use client";
import { useLogoutUser } from "@/services/auth/authQueries";
import { TbLogout } from "react-icons/tb";
import SpinnerOne from "../loaders/spinners/SpinnerOne";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface LogoutButtonProps {
  iconOnly?: boolean;
  routeTo: string;
}
export default function LogoutButton({ iconOnly, routeTo }: LogoutButtonProps) {
  const logout = useLogoutUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    setLoading(true);

    // Call the logout mutation
    logout.mutate(undefined, {
      onSuccess: () => {
        // Handle successful logout here (e.g., redirect to login page)
        router.push(routeTo);
      },
      onError: (error) => {
        // Handle error here (e.g., show error message)
        console.error("Logout failed:", error);
      },
    });
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        className="capitalize text-custom-500 flex  mx-auto px-5 py-2 gap-3 hover:bg-custom-10 dark:hover:bg-custom-200 items-center rounded-md "
      >
        {logout.isPending ? (
          <SpinnerOne />
        ) : (
          <>
            <TbLogout className="text-3xl" />
            {!iconOnly && <span className="heading-h4">Logout</span>}
          </>
        )}
      </button>
    </div>
  );
}
