import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { 
    getAdminDashboardStats, 
    getProviders, 
    getProviderById,
    getUsers, 
    getConsumers,
    getConsumerById,
    getBookings, 
    getBookingById,
    getDisputes,
    getDisputeById,
    getAuditLogs,
    broadcastNotification,
    subscribeToDashboardStream,
    exportAdminData,
    approveProvider,
    rejectProvider,
    adminCancelBooking,
    adminRefundBooking,
    adminCompleteBooking,
    adminResolveDispute,
    resolveDispute,
    logoutAdmin
} from "./adminServices";
import { useExportAdminData, downloadExport, EXPORT_PRESETS } from "./adminExport";
import type { 
    IDashboardStats, 
    IProvider, 
    IConsumer, 
    IUser, 
    IBooking, 
    IDispute, 
    IAuditLog 
} from "@/types/admin";

export const useFetchAdminDashboardStats = () => {
    return useQuery({
        queryKey: ["admin-dashboard-stats"],
        queryFn: getAdminDashboardStats,
        refetchInterval: 30000,
    })
}

export const useLiveDashboardStats = () => {
    const [liveData, setLiveData] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [lastValidData, setLastValidData] = useState<any>(null);

    useEffect(() => {
        let eventSource: EventSource | null = null;

        try {
            eventSource = subscribeToDashboardStream();
            
            eventSource.onopen = () => {
                setIsConnected(true);
            };

            eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                        setLiveData(data);
                        setLastValidData(data);
                    }
                } catch (e) {
                    console.error('Failed to parse SSE data', e);
                }
            };

            eventSource.onerror = () => {
                setIsConnected(false);
                // Don't close - let browser retry automatically
            };
        } catch (error) {
            console.error('SSE connection failed', error);
            setIsConnected(false);
        }

        return () => {
            eventSource?.close();
        };
    }, []);

    // Return last valid data if current is null
    const dataToReturn = liveData || lastValidData;
    return { liveData: dataToReturn, isConnected };
}

export const useFetchProviders = () => {
    return useQuery({
        queryKey: ["admin-providers"],
        queryFn: getProviders,
    })
}

export const useFetchProviderById = (id: string) => {
    return useQuery({
        queryKey: ["admin-provider", id],
        queryFn: () => getProviderById(id),
        enabled: !!id,
    })
}

export const useFetchUsers = () => {
    return useQuery({
        queryKey: ["admin-users"],
        queryFn: getUsers,
    })
}

export const useFetchConsumers = (query?: any) => {
    return useQuery({
        queryKey: ["admin-consumers", query],
        queryFn: () => getConsumers(query),
    })
}

export const useFetchConsumerById = (id: string) => {
    return useQuery({
        queryKey: ["admin-consumer", id],
        queryFn: () => getConsumerById(id),
        enabled: !!id,
    })
}

export const useFetchBookings = () => {
    return useQuery({
        queryKey: ["admin-bookings"],
        queryFn: getBookings,
    })
}

export const useFetchBookingById = (id: string) => {
    return useQuery({
        queryKey: ["admin-booking", id],
        queryFn: () => getBookingById(id),
        enabled: !!id,
    })
}

export const useAdminCancelBooking = () => {
    return useMutation({
        mutationFn: ({ bookingId, reason }: { bookingId: string; reason: string }) => 
            adminCancelBooking(bookingId, reason),
    })
}

export const useAdminRefundBooking = () => {
    return useMutation({
        mutationFn: ({ bookingId, reason }: { bookingId: string; reason: string }) => 
            adminRefundBooking(bookingId, reason),
    })
}

export const useAdminCompleteBooking = () => {
    return useMutation({
        mutationFn: ({ bookingId, reason }: { bookingId: string; reason: string }) => 
            adminCompleteBooking(bookingId, reason),
    })
}

export const useAdminResolveDispute = () => {
    return useMutation({
        mutationFn: ({ bookingId, resolution, adminNotes }: { bookingId: string; resolution: string; adminNotes: string }) => 
            adminResolveDispute(bookingId, resolution, adminNotes),
    })
}

export const useFetchDisputes = () => {
    return useQuery({
        queryKey: ["admin-disputes"],
        queryFn: getDisputes,
    })
}

export const useFetchDisputeById = (id: string) => {
    return useQuery({
        queryKey: ["admin-dispute", id],
        queryFn: () => getDisputeById(id),
        enabled: !!id,
    })
}

export const useResolveDispute = () => {
    return useMutation({
        mutationFn: ({ disputeId, resolution, adminNotes }: { disputeId: string; resolution: string; adminNotes: string }) => 
            resolveDispute(disputeId, resolution, adminNotes),
    })
}

export const useFetchAuditLogs = (params?: { adminId?: string; action?: string; actorType?: string; targetType?: string; outcome?: string; page?: number; limit?: number }) => {
    return useQuery({
        queryKey: ["admin-audit-logs", params],
        queryFn: () => getAuditLogs(params),
    })
}

export const useBroadcastNotification = () => {
    return useMutation({
        mutationFn: broadcastNotification,
    })
}

export const useExportAdminReport = () => {
    return useMutation({
        mutationFn: ({ resource, query }: { resource: string; query?: any }) => 
            exportAdminData(resource, query),
    })
}

export const useApproveProvider = () => {
    return useMutation({
        mutationFn: (providerId: string) => approveProvider(providerId),
    })
}

export const useRejectProvider = () => {
    return useMutation({
        mutationFn: ({ providerId, reason }: { providerId: string; reason: string }) => 
            rejectProvider(providerId, reason),
    })
}

export const useLogoutAdmin = () => {
    return useMutation({
        mutationFn: logoutAdmin,
        onSuccess: () => {
            if (typeof window !== 'undefined') {
                const { destroyCookie } = require('nookies');
                destroyCookie(null, "access-token", { path: "/" });
                destroyCookie(null, "refresh-token", { path: "/" });
                destroyCookie(null, "user-role", { path: "/" });
                localStorage.removeItem("token");
            }
        },
    })
}

// Enhanced export hooks
export const useExportUsers = () => useExportAdminData();
export const useExportProviders = () => useExportAdminData();
export const useExportBookings = () => useExportAdminData();
export const useExportDisputes = () => useExportAdminData();
export const useExportAuditLogs = () => useExportAdminData();

// Re-export utilities
export { downloadExport, EXPORT_PRESETS };