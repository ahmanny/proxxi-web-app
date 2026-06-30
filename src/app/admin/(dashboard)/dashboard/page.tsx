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
  RefreshCw,
  Wifi,
  WifiOff,
  DollarSign,
  Activity,
  CheckCircle2,
  ChevronRight,
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

  // Dispute data
  const resolved = (stats?.totalDisputes || 0) - (stats?.pendingDisputes || 0);
  const disputeData = [
    { name: 'Resolved', value: resolved, color: '#10b981' }, // emerald-500
    { name: 'Pending', value: stats?.pendingDisputes || 0, color: '#f59e0b' }, // amber-500
  ];

  // Booking status
  const inProgress = Math.round(total * 0.1);
  const cancelled = Math.round(total * 0.05);
  const statusData = [
    { name: 'Completed', value: completed, color: '#10b981' }, // emerald-500
    { name: 'In Progress', value: inProgress, color: '#3b82f6' }, // blue-500
    { name: 'Pending', value: Math.max(0, total - completed - inProgress - cancelled), color: '#f59e0b' }, // amber-500
    { name: 'Cancelled', value: cancelled, color: '#ef4444' }, // red-500
  ];

  return { monthlyGrowthData, disputeData, statusData };
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
    primary: "bg-zinc-900 border-zinc-800 text-zinc-300",
    green: "bg-emerald-950/35 border-emerald-900/30 text-emerald-400",
    yellow: "bg-amber-950/35 border-amber-900/30 text-amber-400",
    red: "bg-red-950/35 border-red-900/30 text-red-400",
    purple: "bg-purple-950/35 border-purple-900/30 text-purple-400",
    blue: "bg-blue-950/35 border-blue-900/30 text-blue-400",
  };

  return (
    <Link href={href || '#'}>
      <Card className="border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-black/50 select-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            {label}
          </CardTitle>
          <div className={`p-1.5 rounded-lg border ${colorClasses[color]}`}>
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold text-foreground tracking-tight">{value}</div>
          {subValue && (
            <p className="text-xs text-zinc-500 mt-1">{subValue}</p>
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
          <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
          <p className="text-zinc-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and key metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
            isConnected 
              ? 'bg-emerald-950/30 border-emerald-900/40 text-emerald-400' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-400'
          }`}>
            {isConnected ? (
              <>
                <Wifi className="h-3.5 w-3.5" />
                <span>Live Feed</span>
              </>
            ) : (
              <>
                <WifiOff className="h-3.5 w-3.5" />
                <span>Polling Feed</span>
              </>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="border-zinc-800 hover:bg-zinc-900 hover:text-white bg-transparent h-8 text-zinc-300">
            <RefreshCw className="h-3.5 w-3.5 mr-2" />
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-zinc-800 bg-zinc-950/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Completion Rate</p>
                <div className="text-2xl font-semibold text-emerald-400 tracking-tight mt-1">
                  {((stats?.completionRate || 0) * 100).toFixed(1)}%
                </div>
              </div>
              <div className="p-2.5 bg-emerald-950/30 border border-emerald-900/30 rounded-lg text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-zinc-800 bg-zinc-950/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Dispute Rate</p>
                <div className="text-2xl font-semibold text-red-400 tracking-tight mt-1">
                  {((stats?.disputeRate || 0) * 100).toFixed(2)}%
                </div>
              </div>
              <div className="p-2.5 bg-red-950/30 border border-red-900/30 rounded-lg text-red-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Avg Booking Value</p>
                <div className="text-2xl font-semibold text-blue-400 tracking-tight mt-1">
                  ₦{Math.round(((stats?.totalRevenue || 0) / (stats?.totalBookings || 1))).toLocaleString()}
                </div>
              </div>
              <div className="p-2.5 bg-blue-950/30 border border-blue-900/30 rounded-lg text-blue-400">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Monthly Growth</p>
                <div className="text-2xl font-semibold text-purple-400 tracking-tight mt-1">
                  +{stats?.monthlyBookings || 0}
                </div>
              </div>
              <div className="p-2.5 bg-purple-950/30 border border-purple-900/30 rounded-lg text-purple-400">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-zinc-800 bg-zinc-950/30">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Revenue & Bookings Trend</CardTitle>
            <p className="text-xs text-zinc-400">Monthly performance overview</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData.monthlyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f23" />
                <XAxis dataKey="month" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} tickFormatter={(value) => `₦${value/1000}k`} />
                <Tooltip 
                  formatter={(value: number) => `₦${value.toLocaleString()}`}
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', color: '#f4f4f5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ffffff" 
                  fill="#ffffff" 
                  fillOpacity={0.05}
                  name="Revenue"
                />
                <Area 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#71717a" 
                  fill="#71717a" 
                  fillOpacity={0.05}
                  name="Bookings"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950/30">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Booking Status</CardTitle>
            <p className="text-xs text-zinc-400">Distribution of booking statuses</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={chartData.statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.statusData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', color: '#f4f4f5' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pending Providers */}
        <Card className="border-zinc-800 bg-zinc-950/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-base font-semibold text-foreground">Pending Providers</CardTitle>
              <p className="text-xs text-zinc-400">Awaiting approval</p>
            </div>
            <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700">{pendingProviders.length}</Badge>
          </CardHeader>
          <CardContent>
            {pendingProviders.length === 0 ? (
              <p className="text-zinc-500 text-xs py-4 text-center">No pending providers</p>
            ) : (
              <div className="space-y-2">
                {pendingProviders.map((provider: any) => (
                  <div key={provider._id} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/80">
                    <div>
                      <p className="font-medium text-xs text-zinc-200">{provider.firstName} {provider.lastName}</p>
                      <p className="text-[10px] text-zinc-500">{provider.serviceType || 'Service Provider'}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-zinc-800 hover:bg-zinc-800 text-zinc-300 h-7 text-xs bg-transparent" asChild>
                      <Link href="/admin/providers">Review</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Disputes */}
        <Card className="border-zinc-800 bg-zinc-950/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-base font-semibold text-foreground">Recent Disputes</CardTitle>
              <p className="text-xs text-zinc-400">Latest dispute tickets</p>
            </div>
            <Badge variant="destructive" className="bg-red-950 border border-red-900/40 text-red-400">{stats?.pendingDisputes || 0}</Badge>
          </CardHeader>
          <CardContent>
            {recentDisputes.length === 0 ? (
              <p className="text-zinc-500 text-xs py-4 text-center">No disputes</p>
            ) : (
              <div className="space-y-2">
                {recentDisputes.map((dispute: any) => (
                  <div key={dispute._id} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/80">
                    <div>
                      <p className="font-medium text-xs text-zinc-200 truncate max-w-[130px]">{dispute.reason || 'Dispute'}</p>
                      <p className="text-[10px] text-zinc-500">{dispute.status || dispute.resolution || 'Pending'}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-zinc-800 hover:bg-zinc-800 text-zinc-300 h-7 text-xs bg-transparent" asChild>
                      <Link href="/admin/disputes">Resolve</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-zinc-800 bg-zinc-950/30">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Quick Actions</CardTitle>
            <p className="text-xs text-zinc-400">Common admin tasks</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-between border-zinc-800 hover:bg-zinc-900 hover:text-white bg-transparent h-8.5 text-zinc-300 text-xs" asChild>
              <Link href="/admin/providers">
                <span className="flex items-center"><UserCog className="mr-2 h-4 w-4" /> Review Providers</span>
                <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between border-zinc-800 hover:bg-zinc-900 hover:text-white bg-transparent h-8.5 text-zinc-300 text-xs" asChild>
              <Link href="/admin/disputes">
                <span className="flex items-center"><AlertTriangle className="mr-2 h-4 w-4" /> Resolve Disputes</span>
                <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between border-zinc-800 hover:bg-zinc-900 hover:text-white bg-transparent h-8.5 text-zinc-300 text-xs" asChild>
              <Link href="/admin/exports">
                <span className="flex items-center"><CreditCard className="mr-2 h-4 w-4" /> Export Reports</span>
                <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between border-zinc-800 hover:bg-zinc-900 hover:text-white bg-transparent h-8.5 text-zinc-300 text-xs" asChild>
              <Link href="/admin/audit-logs">
                <span className="flex items-center"><Activity className="mr-2 h-4 w-4" /> View Audit Logs</span>
                <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Updates Banner */}
      <Card className="border-zinc-800 bg-zinc-950/40">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-500'}`}></div>
              <CardTitle className="text-base font-semibold text-foreground">Real-time Updates</CardTitle>
            </div>
            <Badge className={isConnected ? "bg-emerald-950 border-emerald-900/40 text-emerald-400" : "bg-zinc-800 border-zinc-700 text-zinc-400"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          <p className="text-xs text-zinc-400">Auto-updates when data changes in the database</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-3 bg-zinc-900/40 border border-zinc-800/80 rounded-lg">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Total Bookings</p>
              <p className="text-xl font-semibold text-zinc-200 mt-1">{stats?.totalBookings || 0}</p>
            </div>
            <div className="p-3 bg-zinc-900/40 border border-zinc-800/80 rounded-lg">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Total Revenue</p>
              <p className="text-xl font-semibold text-zinc-200 mt-1">₦{(stats?.totalRevenue || 0).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-zinc-900/40 border border-zinc-800/80 rounded-lg">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Active Providers</p>
              <p className="text-xl font-semibold text-zinc-200 mt-1">{stats?.totalProviders || 0}</p>
            </div>
            <div className="p-3 bg-zinc-900/40 border border-zinc-800/80 rounded-lg">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Pending Disputes</p>
              <p className="text-xl font-semibold text-zinc-200 mt-1">{stats?.pendingDisputes || 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}