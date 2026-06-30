"use client"

import React, { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"

interface AdminSearchProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  debounceMs?: number
}

export function AdminSearch({
  placeholder = "Search...",
  value,
  onChange,
  debounceMs = 400,
}: AdminSearchProps) {
  const [prevValue, setPrevValue] = useState(value)
  const [localValue, setLocalValue] = useState(value)

  // Sync internal value with external changes (e.g. resets) during render phase
  if (value !== prevValue) {
    setPrevValue(value)
    setLocalValue(value)
  }

  // Debounce effect
  useEffect(() => {
    if (localValue === value) return

    const timer = setTimeout(() => {
      onChange(localValue)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [localValue, value, onChange, debounceMs])

  const handleClear = () => {
    setLocalValue("")
    onChange("")
  }

  return (
    <div className="relative w-full max-w-sm">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="bg-card text-foreground border-border focus:border-ring focus:ring-ring/50 pl-10 pr-9 text-sm h-8"
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
