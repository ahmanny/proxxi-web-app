import API from "@/lib/axios"

export const getAdminDashboardStats = async () => {
    const response = await API.get("/admin/dashboard-stats");
    return response.data?.data || response.data;
}

export const subscribeToDashboardStream = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL || ''}/admin/dashboard-stream`;
    const eventSource = new EventSource(url, {
        withCredentials: true,
    });
    return eventSource;
}

export const getProviders = async () => {
    const response = await API.get("/admin/providers");
    return response.data?.data || response.data;
}

export const getProviderById = async (id: string) => {
    const response = await API.get(`/admin/providers/${id}`);
    return response.data?.data || response.data;
}

export const getUsers = async () => {
    const response = await API.get("/admin/users");
    return response.data?.data || response.data;
}

export const getConsumers = async (query?: any) => {
    const params = query ? new URLSearchParams(query).toString() : '';
    const url = params ? `/admin/consumers?${params}` : '/admin/consumers';
    const response = await API.get(url);
    return response.data?.data || response.data;
}

export const getConsumerById = async (id: string) => {
    const { data } = await API.get(`/admin/consumers/${id}`);
    return data;
}

export const updateConsumer = async (id: string, updates: any) => {
    const { data } = await API.patch(`/admin/consumers/${id}`, updates);
    return data;
}

export const getBookings = async () => {
    const { data } = await API.get("/admin/bookings");
    return data;
}

export const getBookingById = async (id: string) => {
    const { data } = await API.get(`/admin/bookings/${id}`);
    return data;
}

export const adminCancelBooking = async (bookingId: string, reason: string) => {
    const { data } = await API.post(`/admin/bookings/${bookingId}/cancel`, { reason });
    return data;
}

export const adminRefundBooking = async (bookingId: string, reason: string) => {
    const { data } = await API.post(`/admin/bookings/${bookingId}/refund`, { reason });
    return data;
}

export const adminCompleteBooking = async (bookingId: string, reason: string) => {
    const { data } = await API.post(`/admin/bookings/${bookingId}/complete`, { reason });
    return data;
}

export const adminResolveDispute = async (bookingId: string, resolution: string, adminNotes: string) => {
    const { data } = await API.post(`/admin/bookings/${bookingId}/resolve-dispute`, { resolution, adminNotes });
    return data;
}

export const getDisputes = async () => {
    const { data } = await API.get("/admin/disputes");
    return data;
}

export const getDisputeById = async (id: string) => {
    const { data } = await API.get(`/admin/disputes/${id}`);
    return data;
}

export const resolveDispute = async (id: string, resolution: string, adminNotes: string) => {
    const { data } = await API.patch(`/admin/disputes/${id}`, { resolution, adminNotes });
    return data;
}

export const getAuditLogs = async (params?: { adminId?: string; action?: string; actorType?: string; targetType?: string; outcome?: string; page?: number; limit?: number }) => {
    const { data } = await API.get("/admin/audit-logs", { params });
    return data;
}

export const broadcastNotification = async (payload: { title: string; message: string; targetRole?: string }) => {
    const { data } = await API.post("/admin/notifications/broadcast", payload);
    return data;
}

export const approveProvider = async (providerId: string) => {
    const { data } = await API.post(`/admin/providers/${providerId}/approve`);
    return data;
}

export const rejectProvider = async (providerId: string, reason: string) => {
    const { data } = await API.post(`/admin/providers/${providerId}/reject`, { reason });
    return data;
}

export const exportAdminData = async (resource: string, query?: any) => {
    const params = new URLSearchParams(query).toString();
    const url = params ? `/admin/export/${resource}?${params}` : `/admin/export/${resource}`;
    const response = await API.get(url, { responseType: 'blob' });
    return response.data;
}

export const logoutAdmin = async () => {
    try {
        await API.post("/auth/admin/logout");
    } catch (error) {
        console.error("Admin logout API error:", error);
    }
}

export interface AdminUser {
    _id: string;
    email: string;
    role: 'super-admin' | 'support' | 'finance';
    firstName?: string;
    lastName?: string;
    isActive: boolean;
    createdAt: string;
    lastLoginAt?: string;
}

export interface CreateAdminPayload {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role: 'super-admin' | 'support' | 'finance';
}

export interface UpdateAdminPayload {
    firstName?: string;
    lastName?: string;
    role?: 'super-admin' | 'support' | 'finance';
    isActive?: boolean;
}

export const getAllAdmins = async (): Promise<AdminUser[]> => {
    const response = await API.get("/admin/admins");
    return response.data?.data || response.data;
}

export const createAdmin = async (payload: CreateAdminPayload): Promise<AdminUser> => {
    const response = await API.post("/admin/admins", payload);
    return response.data?.data || response.data;
}

export const updateAdmin = async (id: string, payload: UpdateAdminPayload): Promise<AdminUser> => {
    const response = await API.patch(`/admin/admins/${id}`, payload);
    return response.data?.data || response.data;
}

export const toggleAdminStatus = async (id: string): Promise<AdminUser> => {
    const response = await API.post(`/admin/admins/${id}/toggle-status`);
    return response.data?.data || response.data;
}

export interface Wallet {
    _id: string;
    providerId: {
        _id: string;
        firstName?: string;
        lastName?: string;
        providerEmail?: string;
    };
    availableBalance: number;
    pendingBalance: number;
    totalEarned: number;
    currency: string;
    isActive: boolean;
    lastPayoutDate?: string;
    createdAt: string;
}

export interface WalletTransaction {
    _id: string;
    walletId: string;
    providerId: {
        _id: string;
        firstName?: string;
        lastName?: string;
        providerEmail?: string;
    };
    bookingId?: {
        _id: string;
        serviceName: string;
    };
    amount: number;
    type: 'credit' | 'debit';
    status: 'pending' | 'completed' | 'failed' | 'reversed';
    purpose: 'booking_revenue' | 'escrow' | 'withdrawal' | 'refund' | 'platform_fee' | 'bonus';
    reference: string;
    description: string;
    createdAt: string;
}

export interface Payment {
    _id: string;
    bookingId: {
        _id: string;
        serviceName: string;
        consumerId: string;
        providerId: string;
    };
    amount: number;
    status: string;
    financialStatus: string;
    reference: string;
    gateway: string;
    paidAt?: string;
    createdAt: string;
}

export interface FinancialLedgerEntry {
    _id: string;
    bookingId: {
        _id: string;
        serviceName: string;
    };
    providerId: {
        _id: string;
        firstName?: string;
        lastName?: string;
        providerEmail?: string;
    };
    entryType: string;
    fromStatus?: string;
    toStatus: string;
    amount: number;
    currency: string;
    reference?: string;
    createdAt: string;
}

export interface FinancialSummary {
    wallets: {
        totalAvailable: number;
        totalPending: number;
        totalEarned: number;
        walletCount: number;
    };
    platformFees: number;
    payments: {
        [key: string]: { count: number; amount: number };
    };
    withdrawals: {
        [key: string]: { count: number; amount: number };
    };
}

export const getWallets = async (params?: any) => {
    const response = await API.get("/admin/wallets", { params });
    return response.data?.data || response.data;
}

export const getWalletById = async (id: string) => {
    const response = await API.get(`/admin/wallets/${id}`);
    return response.data?.data || response.data;
}

export const getWalletTransactions = async (params?: any) => {
    const response = await API.get("/admin/wallet-transactions", { params });
    return response.data?.data || response.data;
}

export const getPayments = async (params?: any) => {
    const response = await API.get("/admin/payments", { params });
    return response.data?.data || response.data;
}

export const getPaymentById = async (id: string) => {
    const response = await API.get(`/admin/payments/${id}`);
    return response.data?.data || response.data;
}

export const getFinancialLedger = async (params?: any) => {
    const response = await API.get("/admin/financial-ledger", { params });
    return response.data?.data || response.data;
}

export const getFinancialSummary = async (): Promise<FinancialSummary> => {
    const response = await API.get("/admin/financial-summary");
    return response.data?.data || response.data;
}

export const getWithdrawals = async (params?: any) => {
    const response = await API.get("/admin/withdrawals", { params });
    return response.data?.data || response.data;
}

export const approveWithdrawal = async (id: string) => {
    const response = await API.post(`/admin/withdrawals/${id}/approve`);
    return response.data?.data || response.data;
}

export const rejectWithdrawal = async (id: string, reason: string) => {
    const response = await API.post(`/admin/withdrawals/${id}/reject`, { reason });
    return response.data?.data || response.data;
}