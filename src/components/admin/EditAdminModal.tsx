"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminUser, UpdateAdminPayload } from "@/services/admin/adminServices";

interface EditAdminModalProps {
  admin: AdminUser | null;
  onClose: () => void;
  onSubmit: (data: UpdateAdminPayload) => void;
  onToggleStatus: () => void;
  isLoading: boolean;
}

export default function EditAdminModal({
  admin,
  onClose,
  onSubmit,
  onToggleStatus,
  isLoading,
}: EditAdminModalProps) {
  const [formData, setFormData] = useState<UpdateAdminPayload>({
    firstName: "",
    lastName: "",
    role: "support",
    isActive: true,
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        firstName: admin.firstName || "",
        lastName: admin.lastName || "",
        role: admin.role,
        isActive: admin.isActive,
      });
    }
  }, [admin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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

  return (
    <Dialog open={!!admin} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Admin</DialogTitle>
          <DialogDescription>
            Update admin details and permissions. You cannot edit your own account.
          </DialogDescription>
        </DialogHeader>

        {admin && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{admin.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editFirstName">First Name</Label>
                <Input
                  id="editFirstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLastName">Last Name</Label>
                <Input
                  id="editLastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editRole">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value: "super-admin" | "support" | "finance") =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super-admin">
                    Super Admin - Full access to all features including user management
                  </SelectItem>
                  <SelectItem value="support">
                    Support - View and manage bookings, consumers, providers, and disputes
                  </SelectItem>
                  <SelectItem value="finance">
                    Finance - View all data plus manage payments, withdrawals, and refunds
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Account Status</p>
                <p className="text-sm text-muted-foreground">
                  {formData.isActive ? "Admin can log in" : "Admin is disabled"}
                </p>
              </div>
              <Button
                type="button"
                variant={formData.isActive ? "destructive" : "default"}
                size="sm"
                onClick={onToggleStatus}
                disabled={isLoading}
              >
                {formData.isActive ? "Deactivate" : "Activate"}
              </Button>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}