"use client"

import React from "react"
import Link from "next/link"
import { ShieldAlert } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export function ForbiddenPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-destructive/20 blur-xl animate-pulse" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20 text-destructive shadow-lg">
          <ShieldAlert className="h-10 w-10" />
        </div>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Access Denied
      </h1>
      <p className="mt-4 max-w-md text-base text-muted-foreground">
        You do not have the required permissions to view this resource. 
        If you think this is a mistake, please reach out to your administrator.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/admin/dashboard"
          className={buttonVariants({ variant: "default", size: "lg" })}
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}
