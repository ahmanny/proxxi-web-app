"use client"

import React, { useEffect, useState } from "react"
import { useUserStore, AdminRole } from "@/store/UserStore"
import { ForbiddenPage } from "./forbidden-page"

interface Props {
  allowedRoles: AdminRole[]
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function RoleGate({ allowedRoles, fallback, children }: Props) {
  const user = useUserStore((state) => state.user)
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // If not logged in or lacks role, show fallback or Forbidden
  if (!isLoggedIn || !user || !user.adminRole || !allowedRoles.includes(user.adminRole)) {
    return fallback !== undefined ? <>{fallback}</> : <ForbiddenPage />
  }

  return <>{children}</>
}
