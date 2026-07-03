"use client"

import { ChevronRight } from "lucide-react"

interface AdminPaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  totalEntries?: number
  limit?: number
}

export function AdminPagination({
  page,
  totalPages,
  onPageChange,
  totalEntries,
  limit,
}: AdminPaginationProps) {
  if (totalPages <= 1) return null

  const showEntriesInfo = totalEntries !== undefined && limit !== undefined
  const startEntry = totalEntries === 0 ? 0 : (page - 1) * (limit ?? 20) + 1
  const endEntry = Math.min(page * (limit ?? 20), totalEntries ?? 0)

  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 shadow-sm select-none sm:px-6">
      {/* Mobile view pagination summary */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page <= 1}
          className="px-3 py-1.5 rounded-lg border border-border text-foreground text-xs font-semibold hover:bg-secondary transition-colors disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page >= totalPages}
          className="px-3 py-1.5 rounded-lg border border-border text-foreground text-xs font-semibold hover:bg-secondary transition-colors disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Desktop view pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          {showEntriesInfo ? (
            <p className="text-muted-foreground text-sm">
              Showing <span className="text-foreground font-semibold">{startEntry}</span> to{" "}
              <span className="text-foreground font-semibold">{endEntry}</span> of{" "}
              <span className="text-foreground font-semibold">{totalEntries}</span> entries
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">
              Showing page{" "}
              <span className="text-foreground font-semibold">{page}</span> of{" "}
              <span className="text-foreground font-semibold">{totalPages}</span>{" "}
              pages
            </p>
          )}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            {/* Prev Button */}
            <button
              onClick={() => onPageChange(Math.max(page - 1, 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-50 text-xs font-semibold"
            >
              Previous
            </button>

            {/* Pagination Page Number Display */}
            <div className="flex items-center gap-1 px-3">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1
                const isCurrent = pageNum === page

                // Limit the page numbers displayed
                if (
                  totalPages > 5 &&
                  Math.abs(pageNum - page) > 1 &&
                  pageNum !== 1 &&
                  pageNum !== totalPages
                ) {
                  if (pageNum === 2 && page > 3) {
                    return (
                      <span key="dots-start" className="text-xs text-muted-foreground/40">
                        ...
                      </span>
                    )
                  }
                  if (pageNum === totalPages - 1 && page < totalPages - 2) {
                    return (
                      <span key="dots-end" className="text-xs text-muted-foreground/40">
                        ...
                      </span>
                    )
                  }
                  return null
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`h-8 w-8 rounded-lg text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/60 hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => onPageChange(Math.min(page + 1, totalPages))}
              disabled={page >= totalPages}
              className="px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-50 text-xs font-semibold flex items-center gap-1"
            >
              Next
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
