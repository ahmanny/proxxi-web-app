"use client";

import { useState } from "react";
import {
  useFetchProviders,
  useApproveProvider,
  useRejectProvider,
} from "@/services/admin/adminQueries";
import { AdminSummaryCard } from "@/components/admin/AdminSummaryCard";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminTable, Column } from "@/components/admin/AdminTable";
import { AdminExportButton } from "@/components/admin/AdminExportButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  UserCog,
  Search,
  Star,
  Loader2,
  ChevronRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import type { IProvider } from "@/types/admin";

type Provider = IProvider;

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return <Badge variant="success">Approved</Badge>;
    case "pending":
      return <Badge variant="warning">Pending</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const filterOptions = [
  {
    key: "status",
    label: "Status",
    type: "select" as const,
    options: [
      { value: "pending", label: "Pending" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
    ],
  },
  {
    key: "serviceType",
    label: "Service Type",
    type: "select" as const,
    options: [
      { value: "barber", label: "Barber" },
      { value: "hair_stylist", label: "Hair Stylist" },
      { value: "electrician", label: "Electrician" },
      { value: "plumber", label: "Plumber" },
    ],
  },
];

export default function ProvidersPage() {
  const { data, isLoading, error, refetch } = useFetchProviders();
  const approveMutation = useApproveProvider();
  const rejectMutation = useRejectProvider();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const providers: Provider[] = data || [];

  const filteredProviders = providers.filter((p) => {
    const matchesSearch =
      `${p.firstName} ${p.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      p.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filters.status || p.status === filters.status;
    const matchesService =
      !filters.serviceType || p.serviceType === filters.serviceType;
    return matchesSearch && matchesStatus && matchesService;
  });

  const handleApprove = async (providerId: string) => {
    try {
      await approveMutation.mutateAsync(providerId);
      toast.success("Provider approved successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to approve provider");
    }
  };

  const handleReject = async () => {
    if (!selectedProvider || !rejectReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    try {
      await rejectMutation.mutateAsync({
        providerId: selectedProvider._id,
        reason: rejectReason,
      });
      toast.success("Provider rejected");
      setRejectDialogOpen(false);
      setSelectedProvider(null);
      setRejectReason("");
      refetch();
    } catch (error) {
      toast.error("Failed to reject provider");
    }
  };

  const columns: Column<Provider>[] = [
    {
      key: "name",
      header: "Name",
      render: (p) => (
        <div>
          <p className="font-medium">
            {p.firstName} {p.lastName}
          </p>
          <p className="text-xs text-muted-foreground">{p.email}</p>
        </div>
      ),
    },
    {
      key: "serviceType",
      header: "Service",
      render: (p) => (
        <Badge variant="outline" className="capitalize">
          {p.serviceType?.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (p) => getStatusBadge(p.status),
    },
    {
      key: "rating",
      header: "Rating",
      render: (p) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="font-medium">{p.rating?.toFixed(1) || "N/A"}</span>
          <span className="text-muted-foreground">({p.reviewCount})</span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (p) => (
        <Button asChild>
          <Link href={`/admin/providers/${p._id}`}>
            View Details
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      ),
    },
  ];

  const pendingCount = providers.filter((p) => p.status === "pending").length;
  const approvedCount = providers.filter((p) => p.status === "approved").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Providers</h1>
          <p className="text-muted-foreground mt-1">Manage service providers</p>
        </div>
        <AdminExportButton
          exportUrl="/admin/export/providers"
          filename="providers.csv"
          label="Export Providers"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <AdminSummaryCard
          title="Total Providers"
          value={providers.length}
          icon={UserCog}
          color="primary"
        />
        <AdminSummaryCard
          title="Pending Approval"
          value={pendingCount}
          icon={UserCog}
          color="yellow"
        />
        <AdminSummaryCard
          title="Active"
          value={approvedCount}
          icon={UserCog}
          color="green"
        />
      </div>

      {/* Filters */}
      <AdminFilters
        filters={filterOptions}
        onFilterChange={setFilters}
        onSearch={setSearchTerm}
        searchPlaceholder="Search by name or email..."
      />

      {/* Table */}
      <AdminTable
        data={filteredProviders}
        columns={columns}
        isLoading={isLoading}
        error={error}
        keyExtractor={(p) => p._id}
        emptyMessage="No providers found"
        searchable={false}
      />

      {/* Provider Detail Modal */}
      <Dialog
        open={!!selectedProvider && !rejectDialogOpen}
        onOpenChange={() => setSelectedProvider(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Provider Details</DialogTitle>
          </DialogHeader>
          {selectedProvider && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">
                    {selectedProvider.firstName} {selectedProvider.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedProvider.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Service Type</p>
                  <p className="font-medium capitalize">
                    {selectedProvider.serviceType?.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedProvider.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">
                      {selectedProvider.rating?.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground">
                      ({selectedProvider.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Availability</p>
                  <Badge
                    variant={
                      selectedProvider.isAvailable ? "success" : "secondary"
                    }
                  >
                    {selectedProvider.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>
              {selectedProvider.status === "pending" && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={() => handleApprove(selectedProvider._id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setRejectDialogOpen(true)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Provider</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this provider.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please provide a reason for rejecting this provider.
            </p>
            <div>
              <label className="text-sm font-medium">Rejection Reason</label>
              <textarea
                className="w-full mt-1 p-3 border rounded-lg"
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejection..."
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setRejectDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={rejectMutation.isPending || !rejectReason.trim()}
              >
                {rejectMutation.isPending ? "Rejecting..." : "Reject Provider"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
