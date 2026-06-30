"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBroadcastNotification } from "@/services/admin/adminQueries";
import { Bell, Send, Loader2 } from "lucide-react";

export default function NotificationsPage() {
  const broadcastMutation = useBroadcastNotification();
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    targetRole: "all"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    broadcastMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ title: "", message: "", targetRole: "all" });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
        <p className="text-muted-foreground mt-1">Broadcast push notifications to users</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Broadcast Form */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Broadcast Notification</CardTitle>
                <CardDescription>Send push notifications to all users</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter notification title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Enter notification message"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Target Audience
                </label>
                <select
                  className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={formData.targetRole}
                  onChange={(e) => setFormData({...formData, targetRole: e.target.value})}
                >
                  <option value="all">All Users</option>
                  <option value="consumer">Consumers Only</option>
                  <option value="provider">Providers Only</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={broadcastMutation.isPending}
                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                {broadcastMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Notification
                  </>
                )}
              </button>

              {broadcastMutation.isSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">Notification sent successfully!</p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>About Broadcast</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">How it works</h4>
              <p className="text-sm text-muted-foreground">
                Broadcast notifications are sent to all users who have opted in to push notifications. 
                Users will receive the notification on their mobile devices.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Audience targeting</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">All</Badge>
                  <span className="text-sm text-muted-foreground">Send to all users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Consumers</Badge>
                  <span className="text-sm text-muted-foreground">Service customers only</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Providers</Badge>
                  <span className="text-sm text-muted-foreground">Service providers only</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}