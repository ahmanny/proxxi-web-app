"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface AuditLogEntry {
  _id: string;
  action: string;
  actorType: string;
  actorId?: string;
  targetType: string;
  targetId?: string;
  outcome: string;
  details?: Record<string, any>;
  createdAt: string;
}

interface AdminAuditLogTableProps {
  data: AuditLogEntry[];
  isLoading?: boolean;
  error?: Error | null;
}

const getOutcomeBadge = (outcome: string) => {
  switch (outcome) {
    case 'success':
      return <Badge variant="success">Success</Badge>;
    case 'failure':
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="outline">{outcome}</Badge>;
  }
};

export function AdminAuditLogTable({ data, isLoading, error }: AdminAuditLogTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter(log => 
    log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.actorType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.targetType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Stats
  const totalActions = data.length;
  const successfulActions = data.filter(l => l.outcome === 'success').length;
  const failedActions = data.filter(l => l.outcome === 'failure').length;

  if (isLoading) {
    return (
      <Card className="border-slate-200">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="py-8 text-center">
          <p className="text-red-600">Failed to load audit logs. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalActions}</div>
            <p className="text-sm text-muted-foreground">Total Actions</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{successfulActions}</div>
            <p className="text-sm text-muted-foreground">Successful</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{failedActions}</div>
            <p className="text-sm text-muted-foreground">Failed</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by action, actor, or target..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <Card className="border-slate-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="font-semibold">Action</TableHead>
              <TableHead className="font-semibold">Actor</TableHead>
              <TableHead className="font-semibold">Target</TableHead>
              <TableHead className="font-semibold">Outcome</TableHead>
              <TableHead className="font-semibold">Details</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No audit logs found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((log) => (
                <TableRow key={log._id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {log.actorType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div>
                      <span className="font-medium">{log.targetType}</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({log.targetId?.slice(0, 8)}...)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getOutcomeBadge(log.outcome)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                    {log.details ? JSON.stringify(log.details).slice(0, 50) : '-'}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {log.createdAt ? new Date(log.createdAt).toLocaleString() : '-'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}