"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWallets, getFinancialSummary, Wallet } from "@/services/admin/adminServices";
import { AdminSummaryCard } from "@/components/admin/AdminSummaryCard";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminTable, Column } from "@/components/admin/AdminTable";
import { AdminExportButton } from "@/components/admin/AdminExportButton";
import { Wallet as WalletIcon, TrendingUp, Clock, DollarSign } from "lucide-react";

export default function WalletsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  const { data: walletsData, isLoading } = useQuery({
    queryKey: ["wallets", search, filters, page],
    queryFn: () => getWallets({ search, ...filters, page, limit: 20 }),
  });

  const { data: summary } = useQuery({
    queryKey: ["financial-summary"],
    queryFn: getFinancialSummary,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const wallets = walletsData?.wallets || [];
  const pagination = walletsData?.pagination || { page: 1, pages: 1, total: 0 };

  const columns: Column<Wallet>[] = [
    {
      key: "provider",
      header: "Provider",
      render: (wallet) => (
        <div>
          <p className="font-medium">
            {wallet.providerId?.firstName} {wallet.providerId?.lastName}
          </p>
          <p className="text-sm text-muted-foreground">
            {wallet.providerId?.providerEmail}
          </p>
        </div>
      ),
    },
    {
      key: "availableBalance",
      header: "Available",
      render: (wallet) => (
        <span className="text-green-600 font-medium">
          {formatCurrency(wallet.availableBalance)}
        </span>
      ),
    },
    {
      key: "pendingBalance",
      header: "Pending",
      render: (wallet) => (
        <span className="text-yellow-600 font-medium">
          {formatCurrency(wallet.pendingBalance)}
        </span>
      ),
    },
    {
      key: "totalEarned",
      header: "Total Earned",
      render: (wallet) => (
        <span className="font-medium">
          {formatCurrency(wallet.totalEarned)}
        </span>
      ),
    },
    {
      key: "currency",
      header: "Currency",
      render: (wallet) => wallet.currency,
    },
    {
      key: "lastPayoutDate",
      header: "Last Payout",
      render: (wallet) => (
        <span className="text-sm text-muted-foreground">
          {wallet.lastPayoutDate
            ? new Date(wallet.lastPayoutDate).toLocaleDateString()
            : "-"}
        </span>
      ),
    },
  ];

  const filterOptions = [
    {
      key: "currency",
      label: "Currency",
      type: 'select' as const,
      placeholder: "All Currencies",
      options: [
        { value: "NGN", label: "NGN" },
        { value: "USD", label: "USD" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Provider Wallets</h1>
          <p className="text-muted-foreground">View provider wallet balances and transactions</p>
        </div>
        <AdminExportButton
          exportUrl="/admin/export/wallets"
          filename={`wallets-${new Date().toISOString().split('T')[0]}.csv`}
          label="Export Wallets"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminSummaryCard
          title="Total Available"
          value={formatCurrency(summary?.wallets?.totalAvailable || 0)}
          icon={WalletIcon}
          color="green"
        />
        <AdminSummaryCard
          title="Pending Balance"
          value={formatCurrency(summary?.wallets?.totalPending || 0)}
          icon={Clock}
          color="yellow"
        />
        <AdminSummaryCard
          title="Total Earned"
          value={formatCurrency(summary?.wallets?.totalEarned || 0)}
          icon={TrendingUp}
          color="blue"
        />
        <AdminSummaryCard
          title="Platform Fees"
          value={formatCurrency(summary?.platformFees || 0)}
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Filters */}
      <AdminFilters
        filterOptions={filterOptions}
        filterValues={filters}
        onFilterChange={setFilters}
        onSearchChange={setSearch}
        searchPlaceholder="Search by provider name or email..."
        showSearch={true}
      />

      {/* Table */}
      <AdminTable
        data={wallets}
        columns={columns}
        isLoading={isLoading}
        keyExtractor={(wallet) => wallet._id}
        emptyMessage="No wallets found"
        searchable={false}
        searchValue={search}
        onSearch={setSearch}
      />

      {/* Pagination info */}
      {pagination.total > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {((pagination.page - 1) * 20) + 1} to {Math.min(pagination.page * 20, pagination.total)} of {pagination.total} wallets
          </span>
          <div className="flex gap-2">
            <AdminSummaryCard
              title=""
              value={`Page ${pagination.page} of ${pagination.pages}`}
              icon={Clock}
              className="py-1 px-3"
            />
          </div>
        </div>
      )}
    </div>
  );
}