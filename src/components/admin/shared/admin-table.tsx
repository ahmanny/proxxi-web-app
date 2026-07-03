"use client"

import React from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"

export interface TableColumn<T> {
  header: string
  accessorKey?: keyof T | string
  render?: (row: T, index: number) => React.ReactNode
}

interface AdminTableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  isLoading?: boolean
  emptyState?: React.ReactNode
}

export function AdminTable<T>({
  columns,
  data,
  isLoading = false,
  emptyState,
}: AdminTableProps<T>) {
  return (
    <div className="border-border bg-card w-full rounded-xl border overflow-hidden">
      <div className="w-full overflow-x-auto scrollbar-hide">
        <Table>
          <TableHeader className="bg-muted/50 border-b border-border">
            <TableRow className="hover:bg-transparent border-none">
              {columns.map((col, idx) => (
                <TableHead
                  key={idx}
                  className="text-muted-foreground px-6 py-4.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading Skeleton State
              Array.from({ length: 5 }).map((_, rowIdx) => (
                <TableRow key={rowIdx} className="border-border hover:bg-transparent border-b">
                  {columns.map((_, colIdx) => (
                    <TableCell key={colIdx} className="px-6 py-4">
                      <div className="animate-pulse h-4 w-full max-w-[120px] rounded bg-muted-foreground/15" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              // Empty State Row
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="px-6 py-12 text-center">
                  {emptyState || (
                    <span className="text-muted-foreground text-sm">No records found.</span>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              // Data Rows
              data.map((row, rowIdx) => (
                <TableRow
                  key={rowIdx}
                  className="border-border hover:bg-primary/5 transition-colors border-b last:border-none"
                >
                  {columns.map((col, colIdx) => {
                    const cellContent = col.render
                      ? col.render(row, rowIdx)
                      : col.accessorKey
                      ? (row[col.accessorKey as keyof T] as React.ReactNode)
                      : null

                    return (
                      <TableCell
                        key={colIdx}
                        className="text-foreground px-6 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {cellContent ?? <span className="text-muted-foreground/50">—</span>}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
