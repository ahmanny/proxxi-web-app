"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

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
      <Card className="border-slate-200">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="py-8 text-center">
          <p className="text-red-600">Failed to load data. Please try again.</p>
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
            className="pl-10"
            value={searchValue}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      )}

      <Card className="border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              {columns.map((column) => (
                <TableHead key={column.key} className="font-semibold">
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item) => (
                <TableRow key={keyExtractor(item)} className="hover:bg-slate-50">
                  {columns.map((column) => (
                    <TableCell key={column.key}>
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
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}