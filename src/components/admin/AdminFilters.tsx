"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X, RotateCcw } from "lucide-react";

interface FilterOption {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date';
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
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(filterValues || {});
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

  const hasActiveFilters = Object.values(activeFilters).some(v => v) || searchValue;

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          {showSearch && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-10"
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
                  <SelectTrigger>
                    <SelectValue placeholder={filter.placeholder || filter.label} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {filter.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
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
                />
              ) : null}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={handleSearch} className="shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
            {searchValue && (
              <div className="flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full text-sm">
                <span>Search: {searchValue}</span>
                <button onClick={() => { setSearchValue(""); onSearch?.(""); }}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {Object.entries(activeFilters).map(([key, value]) => {
              if (!value) return null;
              const filter = filters?.find(f => f.key === key);
              return (
                <div key={key} className="flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full text-sm">
                  <span>{filter?.label}: {value}</span>
                  <button onClick={() => handleFilterChange(key, "")}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}