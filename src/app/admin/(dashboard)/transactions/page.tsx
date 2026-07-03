"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWalletTransactions, WalletTransaction } from "@/services/admin/adminServices";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminTable, Column } from "@/components/admin/AdminTable";
import { AdminExportButton } from "@/components/admin/AdminExportButton";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["wallet-transactions", filters, page],
    queryFn: () => getWalletTransactions({
      ...filters,
      page,
      limit: 50,
    }),
  });

  const transactions = data?.transactions || [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTypeIcon = (type: string) => {
    if (type === "credit") {
      return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
    }
    return <ArrowUpRight className="h-4 w-4 text-red-600" />;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
      reversed: "bg-gray-100 text-gray-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100"}`}>
        {status}
      </span>
    );
  };

  const getPurposeLabel = (purpose: string) => {
    const labels: Record<string, string> = {
      booking_revenue: "Booking Revenue",
      escrow: "Escrow",
      withdrawal: "Withdrawal",
      refund: "Refund",
      platform_fee: "Platform Fee",
      bonus: "Bonus",
    };
    return labels[purpose] || purpose;
  };

  const columns: Column<WalletTransaction>[] = [
    {
      key: "createdAt",
      header: "Date",
      render: (txn) => new Date(txn.createdAt).toLocaleString(),
    },
    {
      key: "type",
      header: "Type",
      render: (txn) => (
        <div className="flex items-center gap-2">
          {getTypeIcon(txn.type)}
          <span className="capitalize">{txn.type}</span>
        </div>
      ),
    },
    {
      key: "provider",
      header: "Provider",
      render: (txn) => (
        <div>
          <p className="font-medium">
            {txn.providerId?.firstName} {txn.providerId?.lastName}
          </p>
          <p className="text-sm text-muted-foreground">
            {txn.providerId?.providerEmail}
          </p>
        </div>
      ),
    },
    {
      key: "purpose",
      header: "Purpose",
      render: (txn) => getPurposeLabel(txn.purpose),
    },
    {
      key: "amount",
      header: "Amount",
      render: (txn) => (
        <span className={`font-medium ${txn.type === "credit" ? "text-green-600" : "text-red-600"}`}>
          {txn.type === "credit" ? "+" : "-"}{formatCurrency(txn.amount)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (txn) => getStatusBadge(txn.status),
    },
    {
      key: "reference",
      header: "Reference",
      render: (txn) => (
        <span className="text-sm text-muted-foreground font-mono">
          {txn.reference}
        </span>
      ),
    },
  ];

  const filterOptions = [
    {
      key: "type",
      label: "Type",
      type: 'select' as const,
      placeholder: "All Types",
      options: [
        { value: "credit", label: "Credit" },
        { value: "debit", label: "Debit" },
      ],
    },
    {
      key: "status",
      label: "Status",
      type: 'select' as const,
      placeholder: "All Status",
      options: [
        { value: "completed", label: "Completed" },
        { value: "pending", label: "Pending" },
        { value: "failed", label: "Failed" },
      ],
    },
    {
      key: "purpose",
      label: "Purpose",
      type: 'select' as const,
      placeholder: "All Purposes",
      options: [
        { value: "booking_revenue", label: "Booking Revenue" },
        { value: "withdrawal", label: "Withdrawal" },
        { value: "refund", label: "Refund" },
        { value: "platform_fee", label: "Platform Fee" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Wallet Transactions</h1>
          <p className="text-muted-foreground">View all provider wallet transactions</p>
        </div>
        <AdminExportButton
          exportUrl="/admin/export/wallet-transactions"
          filename={`transactions-${new Date().toISOString().split('T')[0]}.csv`}
          label="Export Transactions"
        />
      </div>

      {/* Filters */}
      <AdminFilters
        filterOptions={filterOptions}
        filterValues={filters}
        onFilterChange={setFilters}
        onSearchChange={setSearch}
        searchPlaceholder="Search transactions..."
        showSearch={true}
      />

      {/* Table */}
      <AdminTable
        data={transactions}
        columns={columns}
        isLoading={isLoading}
        keyExtractor={(txn) => txn._id}
        emptyMessage="No transactions found"
        searchable={false}
      />

      {/* Pagination info */}
      {pagination.total > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {((pagination.page - 1) * 50) + 1} to {Math.min(pagination.page * 50, pagination.total)} of {pagination.total} transactions
          </span>
        </div>
      )}
    </div>
  );
}