"use client";

import { useUiStore } from "@/store/UiStore";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import React from "react";

export default function WriteReviewBtn() {
  const router = useRouter();
  const { openReviewModal } = useUiStore();
  const { isLoggedIn } = useUserStore();
  const handleWriteReviewClick = () => {
    console.log("am hear");

    if (!isLoggedIn) {
      const currentPath = window.location.pathname;
      const path = `${currentPath}?review=true`;
      const callbackUrl = encodeURIComponent(path);
      router.push(`/auth/login?callbackUrl=${callbackUrl}`);
    } else {
      openReviewModal();
      console.log("modal open");
    }
  };
  return (
    <button
      type="button"
      onClick={() => handleWriteReviewClick()}
      className="border border-[#0E1422] h-16 w-48 capitalize font-semibold rounded-lg hover:bg-[#f0f0f0]"
    >
      Write a review
    </button>
  );
}
