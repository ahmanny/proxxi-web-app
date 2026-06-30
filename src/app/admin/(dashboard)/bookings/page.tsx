"use client";

import { useState } from "react";
import { useFetchBookings } from "@/services/admin/adminQueries";
import { AdminSummaryCard } from "@/components/admin/AdminSummaryCard";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminTable, Column } from "@/components/admin/AdminTable";
import { AdminExportButton } from "@/components/admin/AdminExportButton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarClock, Search, Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import type { IBooking } from "@/types/admin";

type Booking = IBooking;

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge variant="success">Completed</Badge>;
    case "pending":
      return <Badge variant="warning">Pending</Badge>;
    case "cancelled":
    case "cancelled_refunded":
      return <Badge variant="destructive">Cancelled</Badge>;
    case "accepted":
      return <Badge variant="default">Accepted</Badge>;
    case "declined":
      return <Badge variant="destructive">Declined</Badge>;
    case "in_progress":
      return <Badge variant="default">In Progress</Badge>;
    case "completion_pending":
      return <Badge variant="warning">Awaiting Completion</Badge>;
    case "disputed":
      return <Badge variant="destructive">Disputed</Badge>;
    case "expired":
      return <Badge variant="secondary">Expired</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getPaymentBadge = (status: string) => {
  switch (status) {
    case "paid":
    case "AUTHORIZED":
    case "RELEASED":
      return <Badge variant="success">Paid</Badge>;
    case "pending":
    case "HELD":
      return <Badge variant="warning">Pending</Badge>;
    case "failed":
      return <Badge variant="destructive">Failed</Badge>;
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
      { value: "accepted", label: "Accepted" },
      { value: "declined", label: "Declined" },
      { value: "in_progress", label: "In Progress" },
      { value: "completion_pending", label: "Completion Pending" },
      { value: "completed", label: "Completed" },
      { value: "disputed", label: "Disputed" },
      { value: "cancelled", label: "Cancelled" },
      { value: "expired", label: "Expired" },
      { value: "cancelled_refunded", label: "Cancelled & Refunded" },
    ],
  },
  {
    key: "paymentStatus",
    label: "Payment",
    type: "select" as const,
    options: [
      { value: "pending", label: "Pending" },
      { value: "authorized", label: "Authorized" },
      { value: "held", label: "Held" },
      { value: "released", label: "Released" },
      { value: "refunded", label: "Refunded" },
      { value: "failed", label: "Failed" },
    ],
  },
];

export default function BookingsPage() {
  const { data, isLoading, error } = useFetchBookings();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const bookings: Booking[] = data?.data || [];

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.serviceType?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filters.status || b.status === filters.status;
    const matchesPayment =
      !filters.paymentStatus || b.paymentStatus === filters.paymentStatus;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const columns: Column<Booking>[] = [
    {
      key: "service",
      header: "Service",
      render: (b) => (
        <div>
          <p className="font-medium">{b.serviceName}</p>
          <p className="text-xs text-muted-foreground capitalize">
            {b.serviceType?.replace("_", " ")}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (b) => getStatusBadge(b.status),
    },
    {
      key: "payment",
      header: "Payment",
      render: (b) => getPaymentBadge(b.paymentStatus),
    },
    {
      key: "total",
      header: "Total",
      render: (b) => (
        <span className="font-medium">₦{b.price?.total?.toLocaleString()}</span>
      ),
    },
    {
      key: "scheduled",
      header: "Scheduled",
      render: (b) => (
        <span className="text-muted-foreground">
          {b.scheduledAt ? new Date(b.scheduledAt).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (b) => (
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/bookings/${b._id}`}>
            <Eye className="h-3 w-3 mr-1" />
            View
          </Link>
        </Button>
      ),
    },
  ];

  const completedCount = bookings.filter(
    (b) => b.status === "completed",
  ).length;
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (b.price?.total || 0),
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground mt-1">Manage service bookings</p>
        </div>
        <AdminExportButton
          exportUrl="/admin/export/bookings"
          filename="bookings.csv"
          label="Export Bookings"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <AdminSummaryCard
          title="Total Bookings"
          value={bookings.length}
          icon={CalendarClock}
          color="primary"
        />
        <AdminSummaryCard
          title="Completed"
          value={completedCount}
          icon={CalendarClock}
          color="green"
        />
        <AdminSummaryCard
          title="Pending"
          value={pendingCount}
          icon={CalendarClock}
          color="yellow"
        />
        <AdminSummaryCard
          title="Total Revenue"
          value={`₦${totalRevenue.toLocaleString()}`}
          icon={CalendarClock}
          color="purple"
        />
      </div>

      {/* Filters */}
      <AdminFilters
        filters={filterOptions}
        onFilterChange={setFilters}
        onSearch={setSearchTerm}
        searchPlaceholder="Search by service or type..."
      />

      {/* Table */}
      <AdminTable
        data={filteredBookings}
        columns={columns}
        isLoading={isLoading}
        error={error}
        keyExtractor={(b) => b._id}
        searchable={false}
        emptyMessage="No bookings found"
      />
    </div>
  );
}
