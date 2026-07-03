"use client"

import React from "react"
import { AlertCircle } from "lucide-react"

interface AdminEmptyStateProps {
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
  action?: React.ReactNode
}

export function AdminEmptyState({
  title,
  description,
  icon: Icon = AlertCircle,
  action,
}: AdminEmptyStateProps) {
  return (
    <div className="border-border bg-card/50 flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center sm:p-12">
      <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-foreground text-lg font-semibold tracking-tight">
        {title}
      </h3>
      <p className="text-muted-foreground mt-2 max-w-sm text-sm">
        {description}
      </p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  )
}
