"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPayments, Payment } from "@/services/admin/adminServices";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminTable, Column } from "@/components/admin/AdminTable";
import { AdminExportButton } from "@/components/admin/AdminExportButton";
import { AdminSummaryCard } from "@/components/admin/AdminSummaryCard";
import { CreditCard, CheckCircle, XCircle, Clock } from "lucide-react";

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["payments", filters, page],
    queryFn: () => getPayments({
      ...filters,
      page,
      limit: 50,
    }),
  });

  const payments = data?.payments || [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string, icon: any }> = {
      pending: { bg: "bg-yellow-100 text-yellow-800", icon: Clock },
      held: { bg: "bg-blue-100 text-blue-800", icon: CreditCard },
      completed: { bg: "bg-green-100 text-green-800", icon: CheckCircle },
      failed: { bg: "bg-red-100 text-red-800", icon: XCircle },
      cancelled: { bg: "bg-gray-100 text-gray-800", icon: XCircle },
    };
    const style = styles[status] || { bg: "bg-gray-100 text-gray-800", icon: CreditCard };
    const Icon = style.icon;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} flex items-center gap-1 w-fit`}>
        <Icon className="h-3 w-3" />
        {status}
      </span>
    );
  };

  const getFinancialStatusBadge = (status: string) => {
    const labels: Record<string, string> = {
      pending_earning: "Pending Earning",
      escrow_held: "Escrow Held",
      available: "Available",
      released: "Released",
    };
    return (
      <span className="text-sm">
        {labels[status] || status}
      </span>
    );
  };

  const columns: Column<Payment>[] = [
    {
      key: "createdAt",
      header: "Date",
      render: (payment) => payment.createdAt ? new Date(payment.createdAt).toLocaleString() : "-",
    },
    {
      key: "reference",
      header: "Reference",
      render: (payment) => (
        <span className="font-mono text-sm">{payment.reference}</span>
      ),
    },
    {
      key: "booking",
      header: "Booking",
      render: (payment) => payment.bookingId?.serviceName || "-",
    },
    {
      key: "amount",
      header: "Amount",
      render: (payment) => (
        <span className="font-medium">{formatCurrency(payment.amount)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (payment) => getStatusBadge(payment.status),
    },
    {
      key: "financialStatus",
      header: "Financial",
      render: (payment) => getFinancialStatusBadge(payment.financialStatus),
    },
    {
      key: "gateway",
      header: "Gateway",
      render: (payment) => (
        <span className="text-sm text-muted-foreground capitalize">
          {payment.gateway || "-"}
        </span>
      ),
    },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Payment Status",
      type: 'select' as const,
      placeholder: "All",
      options: [
        { value: "pending", label: "Pending" },
        { value: "held", label: "Held" },
        { value: "completed", label: "Completed" },
        { value: "failed", label: "Failed" },
      ],
    },
    {
      key: "financialStatus",
      label: "Financial Status",
      type: 'select' as const,
      placeholder: "All",
      options: [
        { value: "pending_earning", label: "Pending Earning" },
        { value: "escrow_held", label: "Escrow Held" },
        { value: "available", label: "Available" },
        { value: "released", label: "Released" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-muted-foreground">View all payment transactions</p>
        </div>
        <AdminExportButton
          exportUrl="/admin/export/payments"
          filename={`payments-${new Date().toISOString().split('T')[0]}.csv`}
          label="Export Payments"
        />
      </div>

      {/* Filters */}
      <AdminFilters
        filterOptions={filterOptions}
        filterValues={filters}
        onFilterChange={setFilters}
        onSearchChange={setSearch}
        searchPlaceholder="Search payments..."
        showSearch={true}
      />

      {/* Table */}
      <AdminTable
        data={payments}
        columns={columns}
        isLoading={isLoading}
        keyExtractor={(payment) => payment._id}
        emptyMessage="No payments found"
        searchable={false}
      />

      {/* Pagination info */}
      {pagination.total > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {((pagination.page - 1) * 50) + 1} to {Math.min(pagination.page * 50, pagination.total)} of {pagination.total} payments
          </span>
        </div>
      )}
    </div>
  );
}