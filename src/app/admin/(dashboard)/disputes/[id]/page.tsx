"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useFetchDisputeById, useResolveDispute } from "@/services/admin/adminQueries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  User,
  Briefcase,
  Calendar,
  DollarSign,
  FileText,
  ImageIcon,
  CheckCircle,
  ArrowLeft,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

const getResolutionBadge = (resolution?: string) => {
  switch (resolution) {
    case "resolved":
    case "resolved_in_favor_of_consumer":
    case "resolved_in_favor_of_provider":
      return <Badge variant="success">Resolved</Badge>;
    case "pending":
      return <Badge variant="warning">Pending</Badge>;
    case "rejected":
    case "dismissed":
      return <Badge variant="destructive">Rejected</Badge>;
    case "partially_resolved":
      return <Badge variant="secondary">Partially Resolved</Badge>;
    default:
      return <Badge variant="outline">{resolution || "Pending"}</Badge>;
  }
};

const getResolutionLabel = (resolution?: string) => {
  switch (resolution) {
    case "resolved_in_favor_of_consumer":
      return "Resolved in favor of consumer";
    case "resolved_in_favor_of_provider":
      return "Resolved in favor of provider";
    case "partially_resolved":
      return "Partially resolved";
    case "dismissed":
      return "Dismissed";
    default:
      return resolution?.replace(/_/g, " ") || "Pending";
  }
};

const InfoItem = ({ label, value }: { label: string; value?: string | number | null }) => (
  <div>
    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
    <p className="font-medium text-sm">{value || '-'}</p>
  </div>
);

const resolutionOptions = [
  { value: "resolved_in_favor_of_consumer", label: "Resolved in favor of consumer" },
  { value: "resolved_in_favor_of_provider", label: "Resolved in favor of provider" },
  { value: "partially_resolved", label: "Partially resolved" },
  { value: "dismissed", label: "Dismissed" },
];

export default function DisputeDetailPage() {
  const params = useParams();
  const disputeId = params?.id as string;
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState("resolved_in_favor_of_provider");
  const [adminNotes, setAdminNotes] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: dispute, isLoading, error, refetch } = useFetchDisputeById(disputeId);
  const resolveMutation = useResolveDispute();

  const handleResolve = async () => {
    if (!adminNotes.trim()) {
      toast.error("Please provide admin notes");
      return;
    }

    try {
      await resolveMutation.mutateAsync({
        disputeId,
        resolution: selectedResolution,
        adminNotes
      });
      toast.success("Dispute resolved successfully");
      setResolveModalOpen(false);
      setAdminNotes("");
      refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to resolve dispute");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading dispute details...</p>
        </div>
      </div>
    );
  }

  if (error || !dispute) {
    return (
      <div className="p-8">
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="pt-6">
            <p className="text-red-600 font-medium">Failed to load dispute details</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/admin/disputes">Back to Disputes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const d = dispute.data || dispute;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/disputes">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">Dispute #{d._id?.slice(0, 8)}</h1>
              {getResolutionBadge(d.resolution)}
            </div>
            <p className="text-muted-foreground">Raised by {d.raisedByLabel}</p>
          </div>
        </div>

        {d.resolution === 'pending' && (
          <Button onClick={() => setResolveModalOpen(true)}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Resolve Dispute
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Dispute Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <InfoItem label="Reason" value={d.reason?.replace(/_/g, " ")} />
              <InfoItem label="Raised By" value={d.raisedByLabel} />
              <InfoItem label="Created" value={d.createdAt ? new Date(d.createdAt).toLocaleString() : '-'} />
              {d.resolvedAt && (
                <InfoItem label="Resolved At" value={new Date(d.resolvedAt).toLocaleString()} />
              )}
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Description</p>
              <p className="text-sm">{d.description}</p>
            </div>
            {d.adminNotes && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Admin Notes</p>
                <p className="text-sm">{d.adminNotes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {d.booking && (
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Linked Booking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <InfoItem label="Service" value={d.booking.serviceName} />
                <InfoItem label="Status" value={d.booking.status} />
                <InfoItem label="Price" value={`₦${d.booking.price?.total?.toLocaleString()}`} />
                <InfoItem label="Scheduled" value={d.booking.scheduledAt ? new Date(d.booking.scheduledAt).toLocaleString() : '-'} />
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/admin/bookings/${d.booking._id}`}>
                  View Booking Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {d.consumer && (
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
                  <p className="font-medium text-sm">{d.consumer.name || '-'}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium text-sm">{d.consumer.phone || '-'}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-sm">{d.consumer.email || '-'}</p>
                </div>
                {d.consumer._id && (
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <Link href={`/admin/consumers/${d.consumer._id}`}>View Profile</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {d.provider && (
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
                  <p className="font-medium text-sm">{d.provider.name || '-'}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium text-sm">{d.provider.phone || '-'}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-sm">{d.provider.email || '-'}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-muted-foreground">Service Type</p>
                  <p className="font-medium text-sm capitalize">{d.provider.serviceType?.replace("_", " ") || '-'}</p>
                </div>
                {d.provider._id && (
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <Link href={`/admin/providers/${d.provider._id}`}>View Profile</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {d.evidence && d.evidence.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Evidence ({d.evidence.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {d.evidence.map((img: string, index: number) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`Evidence ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border hover:ring-2 hover:ring-primary transition-all"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs">View</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={resolveModalOpen} onOpenChange={setResolveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Dispute</DialogTitle>
            <DialogDescription>
              Select resolution and provide notes to resolve this dispute.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Resolution</Label>
              <select
                className="w-full mt-1 p-2 border rounded"
                value={selectedResolution}
                onChange={(e) => setSelectedResolution(e.target.value)}
              >
                {resolutionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Admin Notes (Required)</Label>
              <Textarea
                placeholder="Explain the resolution rationale..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResolveModalOpen(false)}>Cancel</Button>
            <Button onClick={handleResolve} disabled={resolveMutation.isPending}>
              {resolveMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Confirm Resolution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Evidence Image</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Evidence"
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}