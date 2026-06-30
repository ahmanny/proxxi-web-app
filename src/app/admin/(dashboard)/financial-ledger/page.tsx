"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFinancialLedger, FinancialLedgerEntry } from "@/services/admin/adminServices";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminTable, Column } from "@/components/admin/AdminTable";
import { AdminExportButton } from "@/components/admin/AdminExportButton";
import { ArrowRight } from "lucide-react";

export default function FinancialLedgerPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["financial-ledger", filters, page],
    queryFn: () => getFinancialLedger({
      ...filters,
      page,
      limit: 50,
    }),
  });

  const entries = data?.entries || [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getEntryTypeBadge = (entryType: string) => {
    const styles: Record<string, string> = {
      CREDIT_ESCROW: "bg-blue-100 text-blue-800",
      CREDIT_PENDING: "bg-yellow-100 text-yellow-800",
      MOVE_PENDING_TO_AVAILABLE: "bg-green-100 text-green-800",
      DEBIT_REFUND: "bg-red-100 text-red-800",
      DEBIT_WITHDRAWAL: "bg-purple-100 text-purple-800",
      PLATFORM_FEE: "bg-orange-100 text-orange-800",
    };
    const labels: Record<string, string> = {
      CREDIT_ESCROW: "Credit Escrow",
      CREDIT_PENDING: "Credit Pending",
      MOVE_PENDING_TO_AVAILABLE: "Released",
      DEBIT_REFUND: "Refund",
      DEBIT_WITHDRAWAL: "Withdrawal",
      PLATFORM_FEE: "Platform Fee",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[entryType] || "bg-gray-100"}`}>
        {labels[entryType] || entryType}
      </span>
    );
  };

  const getStatusChange = (fromStatus?: string, toStatus?: string) => {
    if (!fromStatus && !toStatus) return "-";
    const formatStatus = (status: string) => {
      const labels: Record<string, string> = {
        ESCROW_HELD: "Escrow Held",
        PENDING_EARNING: "Pending",
        AVAILABLE: "Available",
        RELEASED: "Released",
        REFUNDED: "Refunded",
      };
      return labels[status] || status;
    };
    if (fromStatus && toStatus) {
      return (
        <div className="flex items-center gap-1 text-xs">
          <span>{formatStatus(fromStatus)}</span>
          <ArrowRight className="h-3 w-3" />
          <span>{formatStatus(toStatus)}</span>
        </div>
      );
    }
    return toStatus ? formatStatus(toStatus) : "-";
  };

  const columns: Column<FinancialLedgerEntry>[] = [
    {
      key: "createdAt",
      header: "Date",
      render: (entry) => new Date(entry.createdAt).toLocaleString(),
    },
    {
      key: "entryType",
      header: "Entry Type",
      render: (entry) => getEntryTypeBadge(entry.entryType),
    },
    {
      key: "provider",
      header: "Provider",
      render: (entry) => (
        <div>
          <p className="font-medium">
            {entry.providerId?.firstName} {entry.providerId?.lastName}
          </p>
          <p className="text-sm text-muted-foreground">
            {entry.providerId?.providerEmail}
          </p>
        </div>
      ),
    },
    {
      key: "booking",
      header: "Booking",
      render: (entry) => entry.bookingId?.serviceName || "-",
    },
    {
      key: "amount",
      header: "Amount",
      render: (entry) => (
        <span className="font-medium">{formatCurrency(entry.amount)}</span>
      ),
    },
    {
      key: "statusChange",
      header: "Status Change",
      render: (entry) => getStatusChange(entry.fromStatus, entry.toStatus),
    },
    {
      key: "reference",
      header: "Reference",
      render: (entry) => (
        <span className="text-sm text-muted-foreground font-mono">
          {entry.reference || "-"}
        </span>
      ),
    },
  ];

  const filterOptions = [
    {
      key: "entryType",
      label: "Entry Type",
      type: 'select' as const,
      placeholder: "All Types",
      options: [
        { value: "CREDIT_ESCROW", label: "Credit Escrow" },
        { value: "CREDIT_PENDING", label: "Credit Pending" },
        { value: "MOVE_PENDING_TO_AVAILABLE", label: "Released" },
        { value: "DEBIT_REFUND", label: "Refund" },
        { value: "DEBIT_WITHDRAWAL", label: "Withdrawal" },
        { value: "PLATFORM_FEE", label: "Platform Fee" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Financial Ledger</h1>
          <p className="text-muted-foreground">Track all financial events and status changes</p>
        </div>
        <AdminExportButton
          exportUrl="/admin/export/financial-ledger"
          filename={`financial-ledger-${new Date().toISOString().split('T')[0]}.csv`}
          label="Export Ledger"
        />
      </div>

      {/* Filters */}
      <AdminFilters
        filterOptions={filterOptions}
        filterValues={filters}
        onFilterChange={setFilters}
        onSearchChange={setSearch}
        searchPlaceholder="Search ledger..."
        showSearch={true}
      />

      {/* Table */}
      <AdminTable
        data={entries}
        columns={columns}
        isLoading={isLoading}
        keyExtractor={(entry) => entry._id}
        emptyMessage="No ledger entries found"
        searchable={false}
      />

      {/* Pagination info */}
      {pagination.total > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {((pagination.page - 1) * 50) + 1} to {Math.min(pagination.page * 50, pagination.total)} of {pagination.total} entries
          </span>
        </div>
      )}
    </div>
  );
}