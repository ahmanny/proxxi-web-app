"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  error?: Error | null;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  searchValue?: string;
  emptyMessage?: string;
  keyExtractor: (item: T) => string;
}

export function AdminTable<T>({
  data,
  columns,
  isLoading,
  error,
  searchable = true,
  searchPlaceholder = "Search...",
  onSearch,
  searchValue = "",
  emptyMessage = "No data found",
  keyExtractor,
}: AdminTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="border border-border bg-card w-full rounded-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50 border-b border-border">
            <TableRow className="hover:bg-transparent border-none">
              {columns.map((column) => (
                <TableHead key={column.key} className="text-muted-foreground px-6 py-4.5 text-xs font-semibold uppercase tracking-wider">
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, rowIdx) => (
              <TableRow key={rowIdx} className="border-border hover:bg-transparent border-b">
                {columns.map((_, colIdx) => (
                  <TableCell key={colIdx} className="px-6 py-4">
                    <div className="animate-pulse h-4 w-full max-w-[120px] rounded bg-muted-foreground/15" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-500/20 bg-red-500/10">
        <CardContent className="py-8 text-center">
          <p className="text-red-400 font-medium">Failed to load data. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-10 bg-card text-foreground border-border focus:border-ring focus:ring-ring/50 text-sm h-8"
            value={searchValue}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      )}

      <div className="border border-border bg-card w-full rounded-xl overflow-hidden">
        <div className="w-full overflow-x-auto scrollbar-hide">
          <Table>
            <TableHeader className="bg-muted/50 border-b border-border">
              <TableRow className="hover:bg-transparent border-none">
                {columns.map((column) => (
                  <TableHead key={column.key} className="text-muted-foreground px-6 py-4.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item) => (
                  <TableRow key={keyExtractor(item)} className="border-border hover:bg-primary/5 transition-colors border-b last:border-none">
                    {columns.map((column) => (
                      <TableCell key={column.key} className="text-foreground px-6 py-4 text-sm font-medium whitespace-nowrap">
                        {column.render 
                          ? column.render(item) 
                          : String((item as any)[column.key] ?? '')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 shadow-sm select-none">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-border text-foreground text-xs font-semibold hover:bg-secondary transition-colors disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-border text-foreground text-xs font-semibold hover:bg-secondary transition-colors disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing <span className="text-foreground font-semibold">{startIndex + 1}</span> to{" "}
                <span className="text-foreground font-semibold">{Math.min(startIndex + itemsPerPage, data.length)}</span> of{" "}
                <span className="text-foreground font-semibold">{data.length}</span> results
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-50 text-xs font-semibold"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1 px-3">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isCurrent = pageNum === currentPage;

                    if (
                      totalPages > 5 &&
                      Math.abs(pageNum - currentPage) > 1 &&
                      pageNum !== 1 &&
                      pageNum !== totalPages
                    ) {
                      if (pageNum === 2 && currentPage > 3) {
                        return (
                          <span key="dots-start" className="text-xs text-muted-foreground/40">
                            ...
                          </span>
                        )
                      }
                      if (pageNum === totalPages - 1 && currentPage < totalPages - 2) {
                        return (
                          <span key="dots-end" className="text-xs text-muted-foreground/40">
                            ...
                          </span>
                        )
                      }
                      return null;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-8 w-8 rounded-lg text-xs font-bold transition-all ${
                          isCurrent
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground/60 hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-50 text-xs font-semibold"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}