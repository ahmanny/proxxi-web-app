"use client";

import { useMemo, useState } from "react";
import { useFetchUsers } from "@/services/admin/adminQueries";
import { AdminSummaryCard } from "@/components/admin/AdminSummaryCard";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminTable, Column } from "@/components/admin/AdminTable";
import { AdminExportButton } from "@/components/admin/AdminExportButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, User, Briefcase } from "lucide-react";
import Link from "next/link";
import type { IUser } from "@/types/admin";

type User = IUser;

const filterOptions = [
  {
    key: "role",
    label: "Role",
    type: "select" as const,
    options: [
      { value: "consumer", label: "Consumer" },
      { value: "provider", label: "Provider" },
      { value: "both", label: "Both" },
    ],
  },
  {
    key: "verified",
    label: "Verified",
    type: "select" as const,
    options: [
      { value: "consumer", label: "Consumer Verified" },
      { value: "provider", label: "Provider Verified" },
      { value: "both", label: "Both Verified" },
    ],
  },
];

export default function UsersPage() {
  const { data, isLoading, error } = useFetchUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const users: User[] = data || [];

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          user.consumerPhone,
          user.providerPhone,
          user.consumerEmail,
          user.providerEmail,
        ]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(normalizedSearch));

      const roleFilter = filters.role;
      const matchesRole =
        !roleFilter ||
        (roleFilter === "consumer" && user.activeRoles?.includes("consumer")) ||
        (roleFilter === "provider" && user.activeRoles?.includes("provider")) ||
        (roleFilter === "both" &&
          user.activeRoles?.includes("consumer") &&
          user.activeRoles?.includes("provider"));

      const verifiedFilter = filters.verified;
      const matchesVerified =
        !verifiedFilter ||
        (verifiedFilter === "consumer" && user.isConsumerEmailVerified) ||
        (verifiedFilter === "provider" && user.isProviderEmailVerified) ||
        (verifiedFilter === "both" &&
          user.isConsumerEmailVerified &&
          user.isProviderEmailVerified);

      return matchesSearch && matchesRole && matchesVerified;
    });
  }, [users, searchTerm, filters]);

  const columns: Column<User>[] = [
    {
      key: "consumer",
      header: "Consumer",
      render: (user) => (
        <div>
          <p className="font-medium">{user.consumerPhone || "-"}</p>
          <p className="text-xs text-muted-foreground">
            {user.consumerEmail || "-"}
          </p>
        </div>
      ),
    },
    {
      key: "provider",
      header: "Provider",
      render: (user) => (
        <div>
          <p className="font-medium">{user.providerPhone || "-"}</p>
          <p className="text-xs text-muted-foreground">
            {user.providerEmail || "-"}
          </p>
        </div>
      ),
    },
    {
      key: "roles",
      header: "Roles",
      render: (user) => (
        <div className="flex gap-1 flex-wrap">
          {user.activeRoles?.map((role) => (
            <Badge key={role} variant="secondary" className="capitalize">
              {role}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "verification",
      header: "Email verification",
      render: (user) => (
        <div className="flex flex-col gap-1">
          <Badge
            variant={user.isConsumerEmailVerified ? "success" : "outline"}
            className="text-xs"
          >
            Consumer: {user.isConsumerEmailVerified ? "Yes" : "No"}
          </Badge>
          <Badge
            variant={user.isProviderEmailVerified ? "success" : "outline"}
            className="text-xs"
          >
            Provider: {user.isProviderEmailVerified ? "Yes" : "No"}
          </Badge>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (user) => (
        <span>
          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (user) => (
        <div className="flex items-center gap-2">
          {user.activeRoles?.includes("consumer") && user.consumerId && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/consumers/${user.consumerId}`}>
                <User className="h-3 w-3 mr-1" />
                Consumer
              </Link>
            </Button>
          )}
          {user.activeRoles?.includes("provider") && user.providerId && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/providers/${user.providerId}`}>
                <Briefcase className="h-3 w-3 mr-1" />
                Provider
              </Link>
            </Button>
          )}
          {!user.consumerId && !user.providerId && (
            <span className="text-muted-foreground text-sm">-</span>
          )}
        </div>
      ),
    },
  ];

  const consumerCount = users.filter((u) =>
    u.activeRoles?.includes("consumer"),
  ).length;
  const providerCount = users.filter((u) =>
    u.activeRoles?.includes("provider"),
  ).length;
  const bothRolesCount = users.filter(
    (u) =>
      u.activeRoles?.includes("consumer") &&
      u.activeRoles?.includes("provider"),
  ).length;

  const exportQuery = useMemo(() => {
    const query: Record<string, string> = {};
    if (searchTerm) query.search = searchTerm;
    if (filters.role) query.role = filters.role;
    if (filters.verified) query.verified = filters.verified;
    return query;
  }, [searchTerm, filters]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground mt-1">
            View and manage consumers and providers.
          </p>
        </div>
        <AdminExportButton
          exportUrl="/admin/export/users"
          filename="users.csv"
          label="Export Users"
          queryParams={exportQuery}
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <AdminSummaryCard
          title="Total Users"
          value={users.length}
          icon={Users}
          color="primary"
        />
        <AdminSummaryCard
          title="Consumers"
          value={consumerCount}
          icon={Users}
          color="blue"
        />
        <AdminSummaryCard
          title="Providers"
          value={providerCount}
          icon={Users}
          color="purple"
        />
        <AdminSummaryCard
          title="Both Roles"
          value={bothRolesCount}
          icon={Users}
          color="green"
        />
      </div>

      {/* Filters */}
      <AdminFilters
        filters={filterOptions}
        onFilterChange={setFilters}
        onSearch={setSearchTerm}
        searchPlaceholder="Search by phone or email..."
      />

      {/* Table */}
      <AdminTable
        data={filteredUsers}
        columns={columns}
        isLoading={isLoading}
        error={error}
        keyExtractor={(u) => u._id}
        emptyMessage="No users found"
        searchable={false}
      />
    </div>
  );
}
