"use client";

import { useMemo, useState } from "react";
import { useFetchConsumers } from "@/services/admin/adminQueries";

import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminTable, Column } from "@/components/admin/AdminTable";
import { AdminExportButton } from "@/components/admin/AdminExportButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Mail, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { IConsumer } from "@/types/admin";

type Consumer = IConsumer;

const filterOptions = [
  {
    key: "verified",
    label: "Verification Status",
    type: "select" as const,
    options: [
      { value: "true", label: "Verified" },
      { value: "false", label: "Unverified" },
    ],
  },
];

export default function ConsumersPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch } = useFetchConsumers({
    page,
    limit: 20,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const consumers: Consumer[] = data?.data || [];
  const pagination = data?.pagination;

  const filteredConsumers = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();

    return consumers.filter((consumer) => {
      const matchesSearch =
        !normalizedSearch ||
        [consumer.firstName, consumer.lastName, consumer.email, consumer.phone]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(normalizedSearch));

      const verifiedFilter = filters.verified;
      const matchesVerified =
        !verifiedFilter ||
        (verifiedFilter === "true" && consumer.isVerified) ||
        (verifiedFilter === "false" && !consumer.isVerified);

      return matchesSearch && matchesVerified;
    });
  }, [consumers, searchTerm, filters]);

  const columns: Column<Consumer>[] = [
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <div>
          <p className="font-medium">
            {row.firstName} {row.lastName}
          </p>
          <p className="text-xs text-muted-foreground">{row._id}</p>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{row.email || "-"}</span>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{row.phone || "-"}</span>
        </div>
      ),
    },
    {
      key: "verified",
      header: "Verified",
      render: (row) =>
        row.isVerified ? (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Verified
          </Badge>
        ) : (
          <Badge variant="secondary">Unverified</Badge>
        ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <Button asChild>
          <Link href={`/admin/consumers/${row._id}`}>
            View Details
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      ),
    },
  ];

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">
            Failed to load consumers. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Consumers</h1>
        </div>
        <AdminExportButton
          exportUrl="/admin/export/consumers"
          filename="consumers.csv"
          label="Export Consumers"
        />
      </div>

      {/* Filters */}
      <AdminFilters
        searchPlaceholder="Search consumers..."
        filterOptions={filterOptions}
        filterValues={filters}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilters}
      />

      {/* Table */}
      <AdminTable<Consumer>
        columns={columns}
        data={filteredConsumers}
        isLoading={isLoading}
        emptyMessage="No consumers found"
        keyExtractor={(c) => c._id}
        searchable={false}
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
