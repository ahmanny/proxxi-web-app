"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import {
  useFetchBookingById,
  useAdminCancelBooking,
  useAdminRefundBooking,
  useAdminCompleteBooking,
  useAdminResolveDispute,
} from "@/services/admin/adminQueries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  User,
  Briefcase,
  MapPin,
  CreditCard,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  DollarSign,
  Calendar,
  Shield,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import { toast } from "react-hot-toast";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge variant="success">Completed</Badge>;
    case "pending":
      return <Badge variant="warning">Pending</Badge>;
    case "cancelled":
    case "cancelled_refunded":
      return <Badge variant="destructive">Cancelled</Badge>;
    case "accepted":
      return <Badge variant="default">Accepted</Badge>;
    case "declined":
      return <Badge variant="destructive">Declined</Badge>;
    case "in_progress":
      return <Badge variant="default">In Progress</Badge>;
    case "completion_pending":
      return <Badge variant="warning">Awaiting Completion</Badge>;
    case "disputed":
      return <Badge variant="destructive">Disputed</Badge>;
    case "expired":
      return <Badge variant="secondary">Expired</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getPaymentBadge = (status: string) => {
  switch (status) {
    case "released":
      return <Badge variant="success">Paid</Badge>;
    case "held":
    case "authorized":
      return <Badge variant="warning">Escrow</Badge>;
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "refunded":
      return <Badge variant="success">Refunded</Badge>;
    case "failed":
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <div>
    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
      {label}
    </p>
    <p className="font-medium text-sm">{value || "-"}</p>
  </div>
);

const BookingMap = dynamic(() => import("@/components/ui/map").then(mod => ({ default: mod.BookingMap })), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-slate-100 rounded-lg animate-pulse flex items-center justify-center text-muted-foreground">Loading map...</div>
});

type ActionType = "cancel" | "refund" | "complete" | "resolve-dispute";

export default function BookingDetailPage() {
  const params = useParams();
  const bookingId = params?.id as string;
  const [activeTab, setActiveTab] = useState("overview");
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [actionReason, setActionReason] = useState("");
  const [disputeResolution, setDisputeResolution] = useState(
    "resolved_in_favor_of_provider",
  );

  const {
    data: booking,
    isLoading,
    error,
    refetch,
  } = useFetchBookingById(bookingId);
  const cancelMutation = useAdminCancelBooking();
  const refundMutation = useAdminRefundBooking();
  const completeMutation = useAdminCompleteBooking();
  const resolveDisputeMutation = useAdminResolveDispute();

  const handleAction = async () => {
    if (!actionType || !actionReason.trim()) {
      toast.error("Please provide a reason");
      return;
    }

    try {
      switch (actionType) {
        case "cancel":
          await cancelMutation.mutateAsync({ bookingId, reason: actionReason });
          toast.success("Booking cancelled");
          break;
        case "refund":
          await refundMutation.mutateAsync({ bookingId, reason: actionReason });
          toast.success("Booking refunded");
          break;
        case "complete":
          await completeMutation.mutateAsync({
            bookingId,
            reason: actionReason,
          });
          toast.success("Booking marked as completed");
          break;
        case "resolve-dispute":
          await resolveDisputeMutation.mutateAsync({
            bookingId,
            resolution: disputeResolution,
            adminNotes: actionReason,
          });
          toast.success("Dispute resolved");
          break;
      }
      setActionModalOpen(false);
      setActionReason("");
      refetch();
    } catch (err: any) {
      toast.error(err?.message || "Action failed");
    }
  };

  const openActionModal = (type: ActionType) => {
    setActionType(type);
    setActionModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="p-8">
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="pt-6">
            <p className="text-red-600 font-medium">
              Failed to load booking details
            </p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/admin/bookings">Back to Bookings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const b = booking.data || booking;

  const timelineEvents = [
    { key: "createdAt", label: "Created", date: b.createdAt },
    { key: "scheduledAt", label: "Scheduled For", date: b.scheduledAt },
    { key: "acceptedAt", label: "Accepted", date: b.acceptedAt },
    { key: "actualStartTime", label: "Started", date: b.actualStartTime },
    { key: "completedAt", label: "Completed", date: b.completedAt },
    { key: "cancelledAt", label: "Cancelled", date: b.cancelledAt },
    { key: "declinedAt", label: "Declined", date: b.declinedAt },
  ].filter((e) => e.date);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/bookings">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">
                Booking #{b._id?.slice(0, 8)}
              </h1>
              {getStatusBadge(b.status)}
              {getPaymentBadge(b.paymentStatus)}
            </div>
            <p className="text-muted-foreground">
              {b.serviceName} • {b.serviceType}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {b.status === "pending" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openActionModal("cancel")}
              >
                Cancel
              </Button>
            </>
          )}
          {(b.status === "accepted" || b.status === "in_progress") && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openActionModal("complete")}
              >
                Mark Completed
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600"
                onClick={() => openActionModal("cancel")}
              >
                Cancel
              </Button>
            </>
          )}
          {b.paymentStatus === "held" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => openActionModal("refund")}
            >
              Refund
            </Button>
          )}
          {b.status === "disputed" && b.dispute && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => openActionModal("resolve-dispute")}
            >
              Resolve Dispute
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-100 p-1 w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-6">
          <div className="grid gap-6">
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <InfoItem label="Service" value={b.serviceName} />
                  <InfoItem
                    label="Service Type"
                    value={b.serviceType?.replace("_", " ")}
                  />
                  <InfoItem
                    label="Scheduled At"
                    value={
                      b.scheduledAt
                        ? new Date(b.scheduledAt).toLocaleString()
                        : "-"
                    }
                  />
                  <InfoItem label="Status" value={b.status} />
                  <InfoItem
                    label="Booking ID"
                    value={b._id?.slice(0, 12) + "..."}
                  />
                  <InfoItem
                    label="Created"
                    value={
                      b.createdAt
                        ? new Date(b.createdAt).toLocaleDateString()
                        : "-"
                    }
                  />
                </div>
                {b.note && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Note
                    </p>
                    <p className="text-sm">{b.note}</p>
                  </div>
                )}
                {b.declineReason && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Decline Reason
                    </p>
                    <p className="text-sm text-red-600">{b.declineReason}</p>
                  </div>
                )}
                {b.cancelMessage && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Cancellation Reason
                    </p>
                    <p className="text-sm text-red-600">{b.cancelMessage}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Consumer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium text-sm">
                        {b.consumer?.name || "-"}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium text-sm">
                        {b.consumer?.phone || "-"}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-sm">
                        {b.consumer?.email || "-"}
                      </p>
                    </div>
                    {b.consumer?._id && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        asChild
                      >
                        <Link href={`/admin/consumers/${b.consumer?._id}`}>
                          View Profile
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Provider
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium text-sm">
                        {b.provider?.name || "-"}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium text-sm">
                        {b.provider?.phone || "-"}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-sm">
                        {b.provider?.email || "-"}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground">
                        Service Type
                      </p>
                      <p className="font-medium text-sm capitalize">
                        {b.provider?.serviceType?.replace("_", " ") || "-"}
                      </p>
                    </div>
                    {b.provider?._id && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        asChild
                      >
                        <Link href={`/admin/providers/${b.provider?._id}`}>
                          View Profile
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {b.dispute && (
              <Card className="border-red-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    Dispute Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground">Raised By</p>
                      <p className="font-medium text-sm">
                        {b.dispute.raisedByLabel}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground">Reason</p>
                      <p className="font-medium text-sm">
                        {b.dispute.reason?.replace(/_/g, " ")}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs text-muted-foreground mb-1">
                        Description
                      </p>
                      <p className="text-sm">{b.dispute.description}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground">
                        Resolution
                      </p>
                      <Badge
                        variant={
                          b.dispute.resolution === "pending"
                            ? "warning"
                            : "success"
                        }
                      >
                        {b.dispute.resolution?.replace(/_/g, " ")}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="location" className="space-y-4 mt-6">
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {b.location?.geoAddress?.coordinates && b.location.geoAddress.coordinates.length >= 2 ? (
                <div className="space-y-4">
                  <BookingMap 
                    latitude={b.location.geoAddress.coordinates[1]}
                    longitude={b.location.geoAddress.coordinates[0]}
                    locationType={b.location?.type as "home" | "shop" | undefined}
                    address={typeof b.location?.textAddress === 'string' ? b.location.textAddress : b.location?.geoAddress ? `${b.location.geoAddress.city}, ${b.location.geoAddress.state}` : undefined}
                  />
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-lg bg-slate-50">
                    <p className="text-xs text-muted-foreground mb-1">
                      Service Type
                    </p>
                    <p className="font-medium capitalize">
                      {b.location?.type || "-"}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50">
                    <p className="text-xs text-muted-foreground mb-1">Address</p>
                    <p className="font-medium">
                      {b.location?.textAddress || "-"}
                    </p>
                  </div>
                  {b.location?.geoAddress && (
                    <div className="sm:col-span-2 p-4 rounded-lg bg-slate-50">
                      <p className="text-xs text-muted-foreground mb-1">
                        Geo Address
                      </p>
                      <p className="text-sm">
                        {b.location.geoAddress.city},{" "}
                        {b.location.geoAddress.state},{" "}
                        {b.location.geoAddress.country}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4 mt-6">
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 rounded-lg bg-slate-50">
                  <p className="text-xs text-muted-foreground mb-1">
                    Service Fee
                  </p>
                  <p className="font-medium">
                    ₦{b.price?.service?.toLocaleString() || "0"}
                  </p>
                </div>
                {(b.price?.homeServiceFee || b.price?.platformFee !== 0) && (
                  <div className="p-4 rounded-lg bg-slate-50">
                    <p className="text-xs text-muted-foreground mb-1">
                      Home Service Fee
                    </p>
                    <p className="font-medium">
                      ₦{b.price.homeServiceFee.toLocaleString()}
                    </p>
                  </div>
                )}
                {(b.price?.platformFee || b.price?.platformFee !== 0) && (
                  <div className="p-4 rounded-lg bg-slate-50">
                    <p className="text-xs text-muted-foreground mb-1">
                      Platform Fee
                    </p>
                    <p className="font-medium">
                      ₦{b.price.platformFee.toLocaleString()}
                    </p>
                  </div>
                )}
                <div className="p-4 rounded-lg bg-green-50">
                  <p className="text-xs text-green-600 mb-1">Total</p>
                  <p className="font-bold text-lg">
                    ₦{b.price?.total?.toLocaleString() || "0"}
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 mt-4">
                <div className="p-4 rounded-lg bg-slate-50">
                  <p className="text-xs text-muted-foreground mb-1">
                    Payment Status
                  </p>
                  {getPaymentBadge(b.paymentStatus)}
                </div>
                <div className="p-4 rounded-lg bg-slate-50">
                  <p className="text-xs text-muted-foreground mb-1">
                    Payout Status
                  </p>
                  <Badge variant="outline">{b.payoutStatus || "-"}</Badge>
                </div>
                <div className="p-4 rounded-lg bg-slate-50">
                  <p className="text-xs text-muted-foreground mb-1">
                    Booking Status
                  </p>
                  {getStatusBadge(b.status)}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4 mt-6">
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timelineEvents.length > 0 ? (
                  timelineEvents.map((event, index) => (
                    <div
                      key={event.key}
                      className="flex items-center gap-4 p-3 rounded-lg bg-slate-50"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="font-medium">{event.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.date
                            ? new Date(event.date).toLocaleString()
                            : "-"}
                        </p>
                      </div>
                      {index === 0 && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No timeline events</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={actionModalOpen} onOpenChange={setActionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "cancel" && "Cancel Booking"}
              {actionType === "refund" && "Refund Booking"}
              {actionType === "complete" && "Mark as Completed"}
              {actionType === "resolve-dispute" && "Resolve Dispute"}
            </DialogTitle>
            <DialogDescription>
              Provide a reason for this action. This will be recorded in the audit log.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {actionType === "resolve-dispute" && (
              <div>
                <Label>Resolution</Label>
                <select
                  className="w-full mt-1 p-2 border rounded"
                  value={disputeResolution}
                  onChange={(e) => setDisputeResolution(e.target.value)}
                >
                  <option value="resolved_in_favor_of_provider">
                    Resolved in favor of provider
                  </option>
                  <option value="resolved_in_favor_of_consumer">
                    Resolved in favor of consumer
                  </option>
                  <option value="resolved_partially">Partially resolved</option>
                  <option value="dismissed">Dismissed</option>
                </select>
              </div>
            )}
            <div>
              <Label>Reason / Notes (Required)</Label>
              <Textarea
                placeholder="Enter reason for this action..."
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              disabled={
                cancelMutation.isPending ||
                refundMutation.isPending ||
                completeMutation.isPending ||
                resolveDisputeMutation.isPending
              }
            >
              {(cancelMutation.isPending ||
                refundMutation.isPending ||
                completeMutation.isPending ||
                resolveDisputeMutation.isPending) && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
