export interface IDashboardStats {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  inProgressBookings: number;
  totalConsumers: number;
  totalProviders: number;
  activeProviders: number;
  pendingProviders: number;
  totalDisputes: number;
  pendingDisputes: number;
  resolvedDisputes: number;
  monthlyBookings: number;
  lastMonthBookings: number;
  bookingsGrowth: number;
  totalRevenue: number;
  platformRevenue: number;
  completionRate: number;
  disputeRate: number;
}

export interface IAuditLog {
  _id: string;
  actorId?: string;
  actorType: 'admin' | 'system';
  action: string;
  targetType?: string;
  targetId?: string;
  outcome: string;
  details?: Record<string, any>;
  createdAt?: string;
}

export interface AuditLogsResponse {
  items: IAuditLog[];
  message?: string;
}

export interface INotification {
  title: string;
  message: string;
  targetRole?: 'consumer' | 'provider' | 'all';
}

export interface BroadcastResponse {
  success: boolean;
  message: string;
}