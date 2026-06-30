"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const STATUS_BADGE_COLORS: Record<string, string> = {
  // Booking Statuses
  PENDING: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
  ACCEPTED: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  IN_PROGRESS: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  COMPLETED: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  CANCELLED: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border border-red-500/20",

  // Dispute Statuses
  OPEN: "bg-red-500/10 text-red-400 border border-red-500/20",
  RESOLVED: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  UNDER_REVIEW: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",

  // Transaction / Payments Statuses
  SUCCESS: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  FAILED: "bg-red-500/10 text-red-400 border border-red-500/20",

  // Verification Statuses
  VERIFIED: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  UNVERIFIED: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20",
  
  // Roles
  "SUPER-ADMIN": "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  SUPER_ADMIN: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  SUPPORT: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
  FINANCE: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
}

interface AdminBadgeProps {
  status: string
  className?: string
}

export function AdminBadge({ status, className }: AdminBadgeProps) {
  const normalizedStatus = status.trim().toUpperCase()
  const styling = STATUS_BADGE_COLORS[normalizedStatus] || "bg-muted text-muted-foreground border border-border"

  const formatLabel = (str: string) => {
    return str
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide normal-case",
        styling,
        className
      )}
    >
      {formatLabel(status)}
    </Badge>
  )
}
