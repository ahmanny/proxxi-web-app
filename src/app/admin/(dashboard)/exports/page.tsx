"use client";

import { AdminExportOptions, AdminDateRangeExport } from "@/components/admin/AdminExportButton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, UserCog, CalendarClock, AlertTriangle, ScrollText } from "lucide-react";

const exportOptions = [
  { 
    label: "Users", 
    description: "Export all users with their roles, phone numbers, and verification status",
    icon: Users,
    href: "/admin/export/users",
    format: 'csv' as const
  },
  { 
    label: "Providers", 
    description: "Export all providers with their ratings, service types, and approval status",
    icon: UserCog,
    href: "/admin/export/providers",
    format: 'csv' as const
  },
  { 
    label: "Bookings", 
    description: "Export all bookings with payment status, scheduled times, and totals",
    icon: CalendarClock,
    href: "/admin/export/bookings",
    format: 'csv' as const
  },
  { 
    label: "Disputes", 
    description: "Export all disputes with reasons, resolutions, and timestamps",
    icon: AlertTriangle,
    href: "/admin/export/disputes",
    format: 'csv' as const
  },
  { 
    label: "Audit Logs", 
    description: "Export all admin actions, outcomes, and detailed event logs",
    icon: ScrollText,
    href: "/admin/export/audit-logs",
    format: 'csv' as const
  },
];

export default function ExportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Export Data</h1>
        <p className="text-muted-foreground mt-1">Download platform data in CSV format</p>
      </div>

      {/* Date Range Export */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Export with Date Range</CardTitle>
          <CardDescription>Filter exports by specific date periods</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminDateRangeExport 
            exportUrl="/admin/export/bookings" 
            filename="bookings-date-range"
            label="Export Bookings by Date"
          />
        </CardContent>
      </Card>

      {/* Quick Exports */}
      <Card className="border-slate-200 bg-slate-50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            Quick exports download all data from the beginning. Use the date range filter above for specific periods.
          </p>
        </CardContent>
      </Card>

      {/* Export Options Grid */}
      <AdminExportOptions options={exportOptions} />

      {/* Export Info */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>About Exports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">File Format</h4>
              <p className="text-sm text-muted-foreground">
                All exports are in CSV format, compatible with Excel, Google Sheets, and other data tools.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Data Size</h4>
              <p className="text-sm text-muted-foreground">
                Exports are limited to 5,000 records per download. Use date filters for larger datasets.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}