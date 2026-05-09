import API from "@/lib/axios";

export interface AdminNotification {
    id: string;
    type: "withdrawal" | "provider" | "dispute" | "booking";
    title: string;
    message: string;
    count: number;
    href: string;
}

export const getAdminNotifications = async (): Promise<AdminNotification[]> => {
    const notifications: AdminNotification[] = [];

    try {
        // Check pending withdrawals
        const withdrawalsRes = await API.get("/admin/withdrawals", {
            params: { status: "pending", limit: 1 },
        });
        const withdrawalsData = withdrawalsRes.data?.data || withdrawalsRes.data;
        const pendingWithdrawals = withdrawalsData?.pagination?.total || 0;
        if (pendingWithdrawals > 0) {
            notifications.push({
                id: "withdrawals",
                type: "withdrawal",
                title: "Pending Withdrawals",
                message: `${pendingWithdrawals} withdrawal request${pendingWithdrawals > 1 ? "s" : ""} awaiting approval`,
                count: pendingWithdrawals,
                href: "/admin/withdrawals",
            });
        }
    } catch (error) {
        console.error("Error fetching withdrawal notifications:", error);
    }

    try {
        // Check pending providers
        const providersRes = await API.get("/admin/providers", {
            params: { status: "pending", limit: 1 },
        });
        const providersData = providersRes.data?.data || providersRes.data;
        const pendingProviders = providersData?.pagination?.total || 0;
        if (pendingProviders > 0) {
            notifications.push({
                id: "providers",
                type: "provider",
                title: "Pending Providers",
                message: `${pendingProviders} provider application${pendingProviders > 1 ? "s" : ""} awaiting review`,
                count: pendingProviders,
                href: "/admin/providers?status=pending",
            });
        }
    } catch (error) {
        console.error("Error fetching provider notifications:", error);
    }

    try {
        // Check open disputes
        const disputesRes = await API.get("/admin/disputes", {
            params: { status: "open", limit: 1 },
        });
        const disputesData = disputesRes.data?.data || disputesRes.data;
        const openDisputes = disputesData?.pagination?.total || 0;
        if (openDisputes > 0) {
            notifications.push({
                id: "disputes",
                type: "dispute",
                title: "Open Disputes",
                message: `${openDisputes} dispute${openDisputes > 1 ? "s" : ""} need attention`,
                count: openDisputes,
                href: "/admin/disputes?status=open",
            });
        }
    } catch (error) {
        console.error("Error fetching dispute notifications:", error);
    }

    return notifications;
};