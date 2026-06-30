"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X, RotateCcw } from "lucide-react";

interface FilterOption {
  key: string;
  label: string;
  type: "text" | "select" | "date";
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface AdminFiltersProps {
  filters?: FilterOption[];
  filterOptions?: FilterOption[];
  filterValues?: Record<string, string>;
  onFilterChange?: (filters: Record<string, string>) => void;
  onSearchChange?: (search: string) => void;
  onSearch?: (search: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
}

export function AdminFilters({
  filters,
  filterOptions,
  filterValues,
  onFilterChange,
  onSearchChange,
  onSearch,
  searchPlaceholder = "Search...",
  showSearch = true,
}: AdminFiltersProps) {
  // Support both filterOptions and filters prop for filter options
  const filterOpts = filterOptions || filters || [];
  // Support both filterValues and use internal state
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    filterValues || {},
  );
  const [searchValue, setSearchValue] = useState("");

  const handleFilterChange = (key: string, value: string) => {
    const newValue = value === "all" ? "" : value;
    const newFilters = { ...activeFilters, [key]: newValue };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSearch = () => {
    if (onSearchChange) {
      onSearchChange(searchValue);
    } else {
      onSearch?.(searchValue);
    }
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSearchValue("");
    onFilterChange?.({});
    onSearch?.("");
  };

  const hasActiveFilters =
    Object.values(activeFilters).some((v) => v) || searchValue;

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        {showSearch && (
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-10 bg-zinc-950 text-foreground border-zinc-800 focus:border-zinc-700 outline-none focus:ring-0 focus-visible:ring-0"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        )}

        {/* Filter Dropdowns */}
        {filterOpts.map((filter) => (
          <div key={filter.key} className="w-full lg:w-48">
            {filter.type === 'select' ? (
              <Select
                value={activeFilters[filter.key] || ""}
                onValueChange={(value) => handleFilterChange(filter.key, value)}
              >
                <SelectTrigger className="bg-zinc-950 text-foreground border-zinc-800">
                  <SelectValue placeholder={filter.placeholder || filter.label} />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-300">
                  <SelectItem value="all" className="text-zinc-300 focus:bg-zinc-800 focus:text-white data-[highlighted]:bg-zinc-800 data-[highlighted]:text-white cursor-pointer">
                    All
                  </SelectItem>
                  {filter.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-zinc-300 focus:bg-zinc-800 focus:text-white data-[highlighted]:bg-zinc-800 data-[highlighted]:text-white cursor-pointer">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : filter.type === 'text' ? (
              <Input
                placeholder={filter.placeholder || filter.label}
                value={activeFilters[filter.key] || ""}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="bg-zinc-950 text-foreground border-zinc-800"
              />
            ) : null}
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleSearch} className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/95">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters} className="bg-transparent border-zinc-800 text-zinc-300 hover:bg-zinc-900">
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-zinc-800">
          {searchValue && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-300">
              <span>Search: {searchValue}</span>
              <button onClick={() => { setSearchValue(""); onSearch?.(""); }} className="hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value) return null;
            const filter = filterOpts?.find(f => f.key === key);
            const displayValue = filter?.options?.find(o => o.value === value)?.label || value;
            return (
              <div key={key} className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-300">
                <span>{filter?.label || key}: {displayValue}</span>
                <button onClick={() => handleFilterChange(key, "")} className="hover:text-foreground">
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
