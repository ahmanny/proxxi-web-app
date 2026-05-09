import { useGoogleAuth } from "@/services/auth/authQueries";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuth() {
  const googleLoginMutation = useGoogleAuth();

  const handleGoogleSignin = useGoogleLogin({
    onSuccess: async (googleToken) => {
      googleLoginMutation.mutateAsync({
        access_token: googleToken.access_token,
      });
    },
    onError: () => console.log("Google Login Failed"),
  });
  return (
    <div className=" flex flex-col gap-[32px]">
      <div>
        <button
          className=" bg-[#E6E7E8] text-neutral-700 rounded-[4px] text-sm h-[45px] w-[350px] hover:bg-opacity-80 flex justify-center items-center gap-2"
          onClick={() => handleGoogleSignin()}
        >
          <FcGoogle className=" text-2xl" />
          Continue with Google
        </button>
      </div>
      <div className=" flex items-center justify-between w-full">
        <div className=" border-b-[1px] border-gray-300  w-[140px]"></div>
        <div className=" text-foreground-f8">OR</div>
        <div className=" border-b-[1px] border-gray-300  w-[140px]"></div>
      </div>
    </div>
  );
}
