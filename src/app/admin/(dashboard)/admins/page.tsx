"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getAllAdmins, 
  createAdmin, 
  updateAdmin, 
  toggleAdminStatus,
  CreateAdminPayload,
  UpdateAdminPayload,
  AdminUser
} from "@/services/admin/adminServices";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, History } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import CreateAdminModal from "@/components/admin/CreateAdminModal";
import EditAdminModal from "@/components/admin/EditAdminModal";
import { useUserStore } from "@/store/UserStore";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function AdminsPage() {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const currentUser = useUserStore((state) => state.user);
  const currentUserId = currentUser?._id;

  const { data: admins = [], isLoading } = useQuery({
    queryKey: ["admins"],
    queryFn: getAllAdmins,
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateAdminPayload) => createAdmin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      setIsCreateModalOpen(false);
      toast.success("Admin created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create admin");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAdminPayload }) => 
      updateAdmin(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      setEditingAdmin(null);
      toast.success("Admin updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update admin");
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (id: string) => toggleAdminStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      toast.success("Admin status updated");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "super-admin":
        return "bg-purple-100 text-purple-800";
      case "support":
        return "bg-blue-100 text-blue-800";
      case "finance":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "super-admin":
        return "Super Admin";
      case "support":
        return "Support";
      case "finance":
        return "Finance";
      default:
        return role;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Management</h1>
          <p className="text-muted-foreground">Manage admin accounts and roles</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Admin
        </Button>
      </div>

      <div className="bg-card rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Created</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Last Login</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                    Loading...
                  </td>
                </tr>
              ) : admins.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                    No admins found
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin._id} className="hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <span className="font-medium">
                        {admin.firstName && admin.lastName
                          ? `${admin.firstName} ${admin.lastName}`
                          : "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{admin.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeClass(
                          admin.role
                        )}`}
                      >
                        {getRoleLabel(admin.role)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          admin.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {admin.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {formatDate(admin.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {formatDateTime(admin.lastLoginAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (admin._id !== currentUserId) {
                                    setEditingAdmin(admin);
                                  }
                                }}
                                disabled={admin._id === currentUserId}
                                className={admin._id === currentUserId ? "opacity-50 cursor-not-allowed" : ""}
                              >
                                <Pencil className="w-3 h-3" />
                              </Button>
                            </TooltipTrigger>
                            {admin._id === currentUserId && (
                              <TooltipContent>
                                <p>You cannot edit your own account</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                        <Link href={`/admin/audit-logs?adminId=${admin._id}`}>
                          <Button variant="outline" size="sm">
                            <History className="w-3 h-3" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateAdminModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        isLoading={createMutation.isPending}
      />

      <EditAdminModal
        admin={editingAdmin}
        onClose={() => setEditingAdmin(null)}
        onSubmit={(data) => {
          if (editingAdmin) {
            updateMutation.mutate({ id: editingAdmin._id, payload: data });
          }
        }}
        onToggleStatus={() => {
          if (editingAdmin) {
            toggleStatusMutation.mutate(editingAdmin._id);
            setEditingAdmin(null);
          }
        }}
        isLoading={updateMutation.isPending || toggleStatusMutation.isPending}
      />
    </div>
  );
}