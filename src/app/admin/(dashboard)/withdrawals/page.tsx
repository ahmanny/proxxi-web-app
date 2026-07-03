"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWithdrawals, approveWithdrawal, rejectWithdrawal, WalletTransaction } from "@/services/admin/adminServices";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminTable, Column } from "@/components/admin/AdminTable";
import { AdminExportButton } from "@/components/admin/AdminExportButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Clock, ArrowDownToLine } from "lucide-react";
import toast from "react-hot-toast";

interface Withdrawal extends WalletTransaction {}

export default function WithdrawalsPage() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [rejectDialog, setRejectDialog] = useState<{ open: boolean; withdrawalId: string }>({ open: false, withdrawalId: "" });
  const [rejectReason, setRejectReason] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["withdrawals", filters, page],
    queryFn: () => getWithdrawals({
      status: filters.status || undefined,
      page,
      limit: 50,
    }),
  });

  const approveMutation = useMutation({
    mutationFn: approveWithdrawal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
      toast.success("Withdrawal approved successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to approve withdrawal");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => rejectWithdrawal(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
      setRejectDialog({ open: false, withdrawalId: "" });
      setRejectReason("");
      toast.success("Withdrawal rejected");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to reject withdrawal");
    },
  });

  const withdrawals = data?.withdrawals || [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    const icons: Record<string, any> = {
      pending: Clock,
      completed: CheckCircle,
      failed: XCircle,
    };
    const Icon = icons[status] || Clock;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100"} flex items-center gap-1 w-fit`}>
        <Icon className="h-3 w-3" />
        {status}
      </span>
    );
  };

  const columns: Column<Withdrawal>[] = [
    {
      key: "createdAt",
      header: "Date",
      render: (withdrawal) => new Date(withdrawal.createdAt).toLocaleString(),
    },
    {
      key: "provider",
      header: "Provider",
      render: (withdrawal) => (
        <div>
          <p className="font-medium">
            {withdrawal.providerId?.firstName} {withdrawal.providerId?.lastName}
          </p>
          <p className="text-sm text-muted-foreground">
            {withdrawal.providerId?.providerEmail}
          </p>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (withdrawal) => (
        <span className="font-bold text-lg">{formatCurrency(withdrawal.amount)}</span>
      ),
    },
    {
      key: "reference",
      header: "Reference",
      render: (withdrawal) => (
        <span className="text-sm font-mono text-muted-foreground">
          {withdrawal.reference}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (withdrawal) => getStatusBadge(withdrawal.status),
    },
    {
      key: "actions",
      header: "Actions",
      render: (withdrawal) => {
        if (withdrawal.status === "pending") {
          return (
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => approveMutation.mutate(withdrawal._id)}
                disabled={approveMutation.isPending}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setRejectDialog({ open: true, withdrawalId: withdrawal._id })}
                disabled={rejectMutation.isPending}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </div>
          );
        }
        if (withdrawal.status === "completed") {
          return <span className="text-green-600 text-sm">Processed</span>;
        }
        if (withdrawal.status === "failed") {
          return <span className="text-red-600 text-sm">Rejected</span>;
        }
        return null;
      },
    },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      type: 'select' as const,
      placeholder: "All Status",
      options: [
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
        { value: "failed", label: "Failed" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Withdrawal Requests</h1>
          <p className="text-muted-foreground">Manage provider withdrawal requests</p>
        </div>
        <AdminExportButton
          exportUrl="/admin/export/withdrawals"
          filename={`withdrawals-${new Date().toISOString().split('T')[0]}.csv`}
          label="Export Withdrawals"
        />
      </div>

      {/* Filters */}
      <AdminFilters
        filterOptions={filterOptions}
        filterValues={filters}
        onFilterChange={setFilters}
        showSearch={false}
      />

      {/* Table */}
      <AdminTable
        data={withdrawals}
        columns={columns}
        isLoading={isLoading}
        keyExtractor={(withdrawal) => withdrawal._id}
        emptyMessage="No withdrawal requests found"
        searchable={false}
      />

      {/* Pagination info */}
      {pagination.total > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {((pagination.page - 1) * 50) + 1} to {Math.min(pagination.page * 50, pagination.total)} of {pagination.total} withdrawals
          </span>
        </div>
      )}

      {/* Reject Dialog */}
      <Dialog open={rejectDialog.open} onOpenChange={(open) => setRejectDialog({ open, withdrawalId: "" })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Withdrawal</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this withdrawal request.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label>Rejection Reason</Label>
            <Input
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter reason..."
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog({ open: false, withdrawalId: "" })}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => rejectMutation.mutate({ id: rejectDialog.withdrawalId, reason: rejectReason })}
              disabled={!rejectReason.trim()}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}