"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Bell, DollarSign, User, AlertCircle, X } from "lucide-react";
import { getAdminNotifications, AdminNotification } from "@/services/admin/adminNotifications";

const getIcon = (type: AdminNotification["type"]) => {
    switch (type) {
        case "withdrawal":
            return <DollarSign className="w-4 h-4" />;
        case "provider":
            return <User className="w-4 h-4" />;
        case "dispute":
            return <AlertCircle className="w-4 h-4" />;
        default:
            return <Bell className="w-4 h-4" />;
    }
};

const getTypeColor = (type: AdminNotification["type"]) => {
    switch (type) {
        case "withdrawal":
            return "bg-green-500";
        case "provider":
            return "bg-blue-500";
        case "dispute":
            return "bg-red-500";
        default:
            return "bg-gray-500";
    }
};

export function AdminNotificationBell() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { data: notifications = [], isLoading } = useQuery({
        queryKey: ["adminNotifications"],
        queryFn: getAdminNotifications,
        refetchInterval: 30000, // Refresh every 30 seconds
    });

    const totalCount = notifications.reduce((sum, n) => sum + n.count, 0);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNotificationClick = (notification: AdminNotification) => {
        router.push(notification.href);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-lg hover:bg-muted transition-colors"
            >
                <Bell className="w-5 h-5 text-muted-foreground" />
                {totalCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full">
                        {totalCount > 99 ? "99+" : totalCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
                        <span className="font-semibold">Notifications</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-muted rounded"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto">
                        {isLoading ? (
                            <div className="p-4 text-center text-muted-foreground">
                                Loading...
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="p-6 text-center text-muted-foreground">
                                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No new notifications</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-border">
                                {notifications.map((notification) => (
                                    <button
                                        key={notification.id}
                                        onClick={() => handleNotificationClick(notification)}
                                        className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2 rounded-full ${getTypeColor(notification.type)} text-white`}>
                                                {getIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium text-sm">{notification.title}</p>
                                                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-muted">
                                                        {notification.count}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {notification.message}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-border bg-muted/30">
                            <button
                                onClick={() => {
                                    router.push("/admin/dashboard");
                                    setIsOpen(false);
                                }}
                                className="w-full text-center text-sm text-primary hover:underline"
                            >
                                View all notifications
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}