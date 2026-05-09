"use client";

import { useState } from "react";
import { useFetchDisputes } from "@/services/admin/adminQueries";
import { AdminSummaryCard } from "@/components/admin/AdminSummaryCard";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminTable, Column } from "@/components/admin/AdminTable";
import { AdminExportButton } from "@/components/admin/AdminExportButton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Search, Eye, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import API from "@/lib/axios";
import type { IDispute } from "@/types/admin";

type Dispute = IDispute;

const getResolutionBadge = (resolution: string) => {
  switch (resolution) {
    case "resolved":
      return <Badge variant="success">Resolved</Badge>;
    case "pending":
      return <Badge variant="warning">Pending</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="outline">{resolution}</Badge>;
  }
};

export default function DisputesPage() {
  const { data, isLoading, error, refetch } = useFetchDisputes();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false);
  const [resolutionNote, setResolutionNote] = useState("");

  const resolveMutation = useMutation({
    mutationFn: ({
      id,
      resolution,
      adminNotes,
    }: {
      id: string;
      resolution: string;
      adminNotes: string;
    }) => API.patch(`/admin/disputes/${id}`, { resolution, adminNotes }),
    onSuccess: () => {
      setResolveDialogOpen(false);
      setSelectedDispute(null);
      refetch();
    },
  });

  const disputes: Dispute[] = data?.data || [];

  const filteredDisputes = disputes.filter(
    (d) =>
      d.raisedBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.resolution?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns: Column<Dispute>[] = [
    {
      key: "raisedBy",
      header: "Raised By",
      render: (d) => (
        <Badge variant="outline" className="capitalize">
          {d.raisedBy}
        </Badge>
      ),
    },
    {
      key: "reason",
      header: "Reason",
      render: (d) => <span className="font-medium">{d.reason}</span>,
    },
    {
      key: "description",
      header: "Description",
      render: (d) => (
        <span className="text-muted-foreground max-w-xs truncate">
          {d.description}
        </span>
      ),
    },
    {
      key: "resolution",
      header: "Status",
      render: (d) => getResolutionBadge(d.resolution || "pending"),
    },
    {
      key: "created",
      header: "Created",
      render: (d) => (
        <span className="text-muted-foreground">
          {d.createdAt ? new Date(d.createdAt).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (d) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/disputes/${d._id}`}>
              <Eye className="h-3 w-3 mr-1" />
              View
            </Link>
          </Button>
          {d.resolution === "pending" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedDispute(d);
                setResolveDialogOpen(true);
              }}
            >
              <CheckCircle className="h-4 w-4 text-green-600" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  const pendingCount = disputes.filter(
    (d) => d.resolution === "pending",
  ).length;
  const resolvedCount = disputes.filter(
    (d) => d.resolution === "resolved",
  ).length;

  const handleResolve = () => {
    if (!selectedDispute) return;
    resolveMutation.mutate({
      id: selectedDispute._id,
      resolution: "resolved",
      adminNotes: resolutionNote,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Disputes</h1>
          <p className="text-muted-foreground mt-1">
            Manage and resolve disputes
          </p>
        </div>
        <AdminExportButton
          exportUrl="/admin/export/disputes"
          filename="disputes.csv"
          label="Export Disputes"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <AdminSummaryCard
          title="Total Disputes"
          value={disputes.length}
          icon={AlertTriangle}
          color="primary"
        />
        <AdminSummaryCard
          title="Pending Resolution"
          value={pendingCount}
          icon={AlertTriangle}
          color="yellow"
        />
        <AdminSummaryCard
          title="Resolved"
          value={resolvedCount}
          icon={AlertTriangle}
          color="green"
        />
      </div>

      {/* Filters */}
      <AdminFilters
        filters={[]}
        onSearch={setSearchTerm}
        searchPlaceholder="Search by raised by, reason, or status..."
      />

      {/* Table */}
      <AdminTable
        data={filteredDisputes}
        columns={columns}
        isLoading={isLoading}
        error={error}
        keyExtractor={(d) => d._id}
        searchable={false}
        emptyMessage="No disputes found"
      />

      {/* Dispute Detail Modal */}
      <Dialog
        open={!!selectedDispute && !resolveDialogOpen}
        onOpenChange={() => setSelectedDispute(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Dispute Details</DialogTitle>
          </DialogHeader>
          {selectedDispute && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Raised By</p>
                  <p className="font-medium capitalize">
                    {selectedDispute.raisedBy}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reason</p>
                  <p className="font-medium">{selectedDispute.reason}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getResolutionBadge(selectedDispute.resolution || "pending")}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">
                    {selectedDispute.createdAt
                      ? new Date(selectedDispute.createdAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">{selectedDispute.description}</p>
              </div>
              {selectedDispute.resolution === "pending" && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={() => setResolveDialogOpen(true)}>
                    Resolve
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Resolve Dialog */}
      <Dialog open={resolveDialogOpen} onOpenChange={setResolveDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Resolve Dispute</DialogTitle>
            <DialogDescription>
              Provide resolution notes to resolve this dispute.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to resolve this dispute?
            </p>
            <div>
              <label className="text-sm font-medium">Resolution Notes</label>
              <textarea
                className="w-full mt-1 p-2 border rounded-lg"
                rows={3}
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                placeholder="Add notes about the resolution..."
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setResolveDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleResolve}
                disabled={resolveMutation.isPending}
              >
                {resolveMutation.isPending
                  ? "Resolving..."
                  : "Confirm Resolution"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
