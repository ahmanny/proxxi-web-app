"use client"

import React from "react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface FilterOption {
  label: string
  value: string
}

interface AdminFiltersProps {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function AdminFilters({
  options,
  value,
  onChange,
  placeholder = "Filter...",
}: AdminFiltersProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val || "")}>
      <SelectTrigger className="bg-card border-border hover:bg-primary/5 transition-colors h-8 text-xs font-semibold select-none">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent side="bottom" align="start" className="admin-theme min-w-[140px] bg-popover border border-border">
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="text-xs hover:bg-primary/5 focus:bg-primary/5 transition-colors cursor-pointer text-foreground"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
