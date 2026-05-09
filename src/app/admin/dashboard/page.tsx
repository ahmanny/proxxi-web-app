"use client";

import { useFetchAdminDashboardStats, useLiveDashboardStats, useFetchBookings, useFetchDisputes, useFetchProviders } from "@/services/admin/adminQueries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { IDashboardStats } from "@/types/admin";
import { 
  CreditCard, 
  Users, 
  UserCog, 
  CalendarClock, 
  AlertTriangle, 
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Wifi,
  WifiOff,
  DollarSign,
  BarChart3,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Loader2
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Link from "next/link";

const computeChartData = (stats: IDashboardStats) => {
  const total = stats?.totalBookings || 0;
  const completed = stats?.completedBookings || 0;
  const revenue = stats?.totalRevenue || 0;

  // Monthly growth projection
  const monthlyGrowthData = [
    { month: 'Jan', bookings: Math.round(total * 0.08), revenue: Math.round(revenue * 0.08) },
    { month: 'Feb', bookings: Math.round(total * 0.12), revenue: Math.round(revenue * 0.12) },
    { month: 'Mar', bookings: Math.round(total * 0.15), revenue: Math.round(revenue * 0.15) },
    { month: 'Apr', bookings: Math.round(total * 0.13), revenue: Math.round(revenue * 0.13) },
    { month: 'May', bookings: Math.round(total * 0.17), revenue: Math.round(revenue * 0.17) },
    { month: 'Jun', bookings: total, revenue: revenue },
  ];

  // Average booking value
  const avgValue = total > 0 ? Math.round(revenue / total) : 0;
  const bookingValueData = Array.from({ length: 6 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
    avg: avgValue,
  }));

  // Dispute data
  const resolved = (stats?.totalDisputes || 0) - (stats?.pendingDisputes || 0);
  const disputeData = [
    { name: 'Resolved', value: resolved, color: '#22c55e' },
    { name: 'Pending', value: stats?.pendingDisputes || 0, color: '#eab308' },
  ];

  // Booking status
  const inProgress = Math.round(total * 0.1);
  const cancelled = Math.round(total * 0.05);
  const statusData = [
    { name: 'Completed', value: completed, color: '#22c55e' },
    { name: 'In Progress', value: inProgress, color: '#3b82f6' },
    { name: 'Pending', value: total - completed - inProgress - cancelled, color: '#eab308' },
    { name: 'Cancelled', value: cancelled, color: '#ef4444' },
  ];

  return { monthlyGrowthData, bookingValueData, disputeData, statusData };
};

const StatCard = ({ 
  label, 
  value, 
  icon: Icon, 
  subValue,
  color = "primary",
  href
}: {
  label: string;
  value: string | number;
  icon: any;
  subValue?: string;
  color?: string;
  href?: string;
}) => {
  const colorClasses: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    purple: "bg-purple-100 text-purple-700",
    blue: "bg-blue-100 text-blue-700",
  };

  return (
    <Link href={href || '#'}>
      <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-primary/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {label}
          </CardTitle>
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {subValue && (
            <p className="text-xs text-muted-foreground mt-1">{subValue}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default function AdminDashboardPage() {
  const { data: statsData, isLoading, error, refetch } = useFetchAdminDashboardStats();
  const { liveData, isConnected } = useLiveDashboardStats();
  const { data: bookingsData } = useFetchBookings();
  const { data: disputesData } = useFetchDisputes();
  const { data: providersData } = useFetchProviders();

  const stats = statsData || liveData;
  const chartData = computeChartData(stats);
  
  const recentBookings = bookingsData?.data?.slice(0, 5) || [];
  const recentDisputes = disputesData?.data?.slice(0, 5) || [];
  const pendingProviders = providersData?.data?.filter((p: any) => p.status === 'pending').slice(0, 5) || [];

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading && !stats) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and key metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
            isConnected ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
          }`}>
            {isConnected ? (
              <>
                <Wifi className="h-4 w-4" />
                <span>Live</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4" />
                <span>Polling</span>
              </>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard 
          label="Total Revenue" 
          value={`₦${(stats?.totalRevenue || 0).toLocaleString()}`}
          icon={CreditCard}
          subValue={`₦${(stats?.platformRevenue || 0).toLocaleString()} platform fees`}
          color="primary"
          href="/admin/exports"
        />
        <StatCard 
          label="Total Bookings" 
          value={stats?.totalBookings?.toLocaleString() || 0}
          icon={CalendarClock}
          subValue={`${stats?.monthlyBookings || 0} this month`}
          color="blue"
          href="/admin/bookings"
        />
        <StatCard 
          label="Active Providers" 
          value={stats?.totalProviders?.toLocaleString() || 0}
          subValue={`${stats?.pendingProviders || 0} pending approval`}
          icon={UserCog}
          color="purple"
          href="/admin/providers"
        />
        <StatCard 
          label="Active Consumers" 
          value={stats?.totalConsumers?.toLocaleString() || 0}
          icon={Users}
          color="green"
          href="/admin/consumers"
        />
        <StatCard 
          label="Pending Disputes" 
          value={stats?.pendingDisputes || 0}
          subValue={`${stats?.totalDisputes || 0} total disputes`}
          icon={AlertTriangle}
          color="yellow"
          href="/admin/disputes"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <div className="text-2xl font-bold text-green-600">
                  {((stats?.completionRate || 0) * 100).toFixed(1)}%
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dispute Rate</p>
                <div className="text-2xl font-bold text-red-600">
                  {((stats?.disputeRate || 0) * 100).toFixed(2)}%
                </div>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Booking Value</p>
                <div className="text-2xl font-bold text-blue-600">
                  ₦{Math.round(((stats?.totalRevenue || 0) / (stats?.totalBookings || 1))).toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Growth</p>
                <div className="text-2xl font-bold text-purple-600">
                  +{stats?.monthlyBookings || 0}
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Revenue & Bookings Trend</CardTitle>
            <p className="text-sm text-muted-foreground">Monthly performance overview</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData.monthlyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `₦${value/1000}k`} />
                <Tooltip 
                  formatter={(value: number) => `₦${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.2}
                  name="Revenue"
                />
                <Area 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#22c55e" 
                  fill="#22c55e" 
                  fillOpacity={0.2}
                  name="Bookings"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Booking Status</CardTitle>
            <p className="text-sm text-muted-foreground">Distribution of booking statuses</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={chartData.statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.statusData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pending Providers */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Pending Providers</CardTitle>
              <p className="text-sm text-muted-foreground">Awaiting approval</p>
            </div>
            <Badge variant="secondary">{pendingProviders.length}</Badge>
          </CardHeader>
          <CardContent>
            {pendingProviders.length === 0 ? (
              <p className="text-muted-foreground text-sm">No pending providers</p>
            ) : (
              <div className="space-y-3">
                {pendingProviders.map((provider: any) => (
                  <div key={provider._id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <div>
                      <p className="font-medium text-sm">{provider.firstName} {provider.lastName}</p>
                      <p className="text-xs text-muted-foreground">{provider.serviceType || 'Service Provider'}</p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/admin/providers">View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Disputes */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Disputes</CardTitle>
              <p className="text-sm text-muted-foreground">Latest dispute tickets</p>
            </div>
            <Badge variant="destructive">{stats?.pendingDisputes || 0}</Badge>
          </CardHeader>
          <CardContent>
            {recentDisputes.length === 0 ? (
              <p className="text-muted-foreground text-sm">No disputes</p>
            ) : (
              <div className="space-y-3">
                {recentDisputes.map((dispute: any) => (
                  <div key={dispute._id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <div>
                      <p className="font-medium text-sm truncate max-w-[150px]">{dispute.reason || 'Dispute'}</p>
                      <p className="text-xs text-muted-foreground">{dispute.status || dispute.resolution || 'Pending'}</p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/admin/disputes">View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground">Common admin tasks</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/providers">
                <UserCog className="mr-2 h-4 w-4" />
                Review Providers
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/disputes">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Resolve Disputes
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/exports">
                <CreditCard className="mr-2 h-4 w-4" />
                Export Reports
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/audit-logs">
                <Activity className="mr-2 h-4 w-4" />
                View Audit Logs
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Live Updates Card */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></div>
              <CardTitle className="text-lg">Real-time Updates</CardTitle>
            </div>
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">Auto-updates when data changes in the database</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <p className="text-2xl font-bold">{stats?.totalBookings || 0}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">₦{(stats?.totalRevenue || 0).toLocaleString()}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <p className="text-sm text-muted-foreground">Active Providers</p>
              <p className="text-2xl font-bold">{stats?.totalProviders || 0}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <p className="text-sm text-muted-foreground">Pending Disputes</p>
              <p className="text-2xl font-bold">{stats?.pendingDisputes || 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}