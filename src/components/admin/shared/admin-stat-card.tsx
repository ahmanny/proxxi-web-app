"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface AdminStatCardProps {
  label: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  trend?: {
    value: string | number
    isPositive: boolean
    description?: string
  }
  subtext?: React.ReactNode
  subtextClassName?: string
  className?: string
}

export function AdminStatCard({ label, value, icon: Icon, trend, subtext, subtextClassName, className }: AdminStatCardProps) {
  return (
    <Card className={cn("border-border bg-card overflow-hidden transition-all duration-200 hover:border-primary/30 hover:shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {value}
          </h3>
          {trend && (
            <div className="flex items-center gap-1.5 text-xs">
              <span
                className={cn(
                  "flex items-center gap-0.5 font-semibold rounded px-1.5 py-0.5",
                  trend.isPositive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                )}
              >
                {trend.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {trend.value}
              </span>
              {trend.description && (
                <span className="text-muted-foreground">{trend.description}</span>
              )}
            </div>
          )}
          {subtext && (
            <div className={cn("text-xs text-muted-foreground mt-1", subtextClassName)}>
              {subtext}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
