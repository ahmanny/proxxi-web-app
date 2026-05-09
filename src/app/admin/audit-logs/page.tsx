"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFetchAuditLogs } from "@/services/admin/adminQueries";
import { AdminSummaryCard } from "@/components/admin/AdminSummaryCard";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminTable, Column } from "@/components/admin/AdminTable";
import { AdminExportButton } from "@/components/admin/AdminExportButton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollText, Search, Eye, Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { IAuditLog } from "@/types/admin";

type AuditLog = IAuditLog;

const getOutcomeBadge = (outcome: string) => {
  switch (outcome) {
    case "success":
      return <Badge variant="success">Success</Badge>;
    case "failure":
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="outline">{outcome}</Badge>;
  }
};

export default function AuditLogsPage() {
  const searchParams = useSearchParams();
  const adminId = searchParams.get("adminId");
  
  const { data, isLoading, error } = useFetchAuditLogs({ adminId: adminId || undefined });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const logs: AuditLog[] = data?.data?.items || [];

  const filteredLogs = logs.filter(
    (log) =>
      log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actorType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.targetType?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns: Column<AuditLog>[] = [
    {
      key: "action",
      header: "Action",
      render: (log) => <span className="font-medium">{log.action}</span>,
    },
    {
      key: "actor",
      header: "Actor",
      render: (log) => (
        <Badge variant="outline" className="capitalize">
          {log.actorType}
        </Badge>
      ),
    },
    {
      key: "target",
      header: "Target",
      render: (log) => (
        <div>
          <span className="font-medium">{log.targetType}</span>
          <span className="text-xs text-muted-foreground ml-1">
            ({log.targetId?.slice(0, 8)}...)
          </span>
        </div>
      ),
    },
    {
      key: "outcome",
      header: "Outcome",
      render: (log) => getOutcomeBadge(log.outcome),
    },
    {
      key: "date",
      header: "Date",
      render: (log) => (
        <span className="text-muted-foreground text-sm">
          {log.createdAt ? new Date(log.createdAt).toLocaleString() : "-"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Details",
      render: (log) => (
        <Button variant="ghost" size="icon" onClick={() => setSelectedLog(log)}>
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const totalActions = logs.length;
  const successfulActions = logs.filter((l) => l.outcome === "success").length;
  const failedActions = logs.filter((l) => l.outcome === "failure").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Track all admin actions</p>
        </div>
        <AdminExportButton
          exportUrl="/admin/export/audit-logs"
          filename="audit-logs.csv"
          label="Export Logs"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <AdminSummaryCard
          title="Total Actions"
          value={totalActions}
          icon={ScrollText}
          color="primary"
        />
        <AdminSummaryCard
          title="Successful"
          value={successfulActions}
          icon={ScrollText}
          color="green"
        />
        <AdminSummaryCard
          title="Failed"
          value={failedActions}
          icon={ScrollText}
          color="red"
        />
      </div>

      {/* Filters */}
      <AdminFilters
        filters={[]}
        onSearch={setSearchTerm}
        searchPlaceholder="Search by action, actor, or target..."
      />

      {/* Table */}
      <AdminTable
        data={filteredLogs}
        columns={columns}
        isLoading={isLoading}
        error={error}
        keyExtractor={(log) => log._id}
        searchable={false}
        emptyMessage="No audit logs found"
      />

      {/* Log Detail Modal */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Audit Log Details</DialogTitle>
            <DialogDescription>
              View detailed information about this audit log entry.
            </DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Action</p>
                  <p className="font-medium">{selectedLog.action}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Outcome</p>
                  {getOutcomeBadge(selectedLog.outcome)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Actor Type</p>
                  <p className="font-medium capitalize">
                    {selectedLog.actorType}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Actor ID</p>
                  <p className="font-medium text-xs">
                    {selectedLog.actorId || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Target Type</p>
                  <p className="font-medium">{selectedLog.targetType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Target ID</p>
                  <p className="font-medium text-xs">
                    {selectedLog.targetId || "-"}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Timestamp</p>
                  <p className="font-medium">
                    {selectedLog.createdAt
                      ? new Date(selectedLog.createdAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
              </div>
              {selectedLog.details && (
                <div>
                  <p className="text-sm text-muted-foreground">Details</p>
                  <pre className="mt-1 p-3 bg-slate-100 rounded-lg text-xs overflow-x-auto">
                    {JSON.stringify(selectedLog.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
