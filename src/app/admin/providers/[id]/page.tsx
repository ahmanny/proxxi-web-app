"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { useFetchProviderById, useApproveProvider, useRejectProvider } from "@/services/admin/adminQueries";
import type { IProvider } from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserCog, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign, 
  Calendar,
  Shield,
  Wallet,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  Activity,
  Briefcase,
  CreditCard,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'approved':
      return <Badge className="bg-green-100 text-green-700 border-green-200">Approved</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>;
    case 'rejected':
      return <Badge className="bg-red-100 text-red-700 border-red-200">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const InfoItem = ({ label, value }: { label: string; value?: string | number | null }) => (
  <div>
    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
    <p className="font-medium text-sm">{value || '-'}</p>
  </div>
);

const StatCard = ({ label, value, subValue, icon: Icon, color }: { 
  label: string; 
  value: string | number; 
  subValue?: string;
  icon: any; 
  color: string;
}) => (
  <Card className="border-slate-200 shadow-sm">
    <CardContent className="pt-4">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-lg ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-bold">{value}</p>
          {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function ProviderDetailPage() {
  const params = useParams();
  const providerId = params?.id as string;
  const [activeTab, setActiveTab] = useState("overview");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageLabel, setSelectedImageLabel] = useState("");
  
  const { data: provider, isLoading, error, refetch } = useFetchProviderById(providerId);
  const approveMutation = useApproveProvider();
  const rejectMutation = useRejectProvider();

  const handleApprove = async () => {
    try {
      await approveMutation.mutateAsync(providerId);
      toast.success("Provider approved successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to approve provider");
    }
  };

  const handleReject = async () => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;
    try {
      await rejectMutation.mutateAsync({ providerId, reason });
      toast.success("Provider rejected");
      refetch();
    } catch (error) {
      toast.error("Failed to reject provider");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading provider details...</p>
        </div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="p-8">
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="pt-6">
            <p className="text-red-600 font-medium">Failed to load provider details</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/admin/providers">Back to Providers</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const p = provider.data || provider;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/providers">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            {p.profilePicture ? (
              <img 
                src={p.profilePicture} 
                alt={`${p.firstName} ${p.lastName}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                <UserCog className="w-8 h-8 text-slate-400" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold">
                  {p.firstName} {p.lastName}
                </h1>
                {getStatusBadge(p.status)}
              </div>
              <p className="text-muted-foreground capitalize">{p.serviceType?.replace("_", " ")}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {p.status === 'pending' && (
            <>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={handleApprove}
                disabled={approveMutation.isPending}
              >
                {approveMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Approve
              </Button>
              <Button 
                variant="destructive"
                onClick={handleReject}
                disabled={rejectMutation.isPending}
              >
                {rejectMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <XCircle className="h-4 w-4 mr-2" />
                )}
                Reject
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          label="Rating" 
          value={`${p.rating?.toFixed(1) || '0'}`} 
          subValue={`${p.reviewCount} reviews`}
          icon={Star} 
          color="bg-yellow-50 text-yellow-600" 
        />
        <StatCard 
          label="Base Price" 
          value={`₦${p.basePriceFrom?.toLocaleString() || '0'}`} 
          subValue="starting from"
          icon={DollarSign} 
          color="bg-blue-50 text-blue-600" 
        />
        <StatCard 
          label="Service Time" 
          value={`${p.avgServiceTime || 60}`} 
          subValue="minutes"
          icon={Clock} 
          color="bg-purple-50 text-purple-600" 
        />
        <StatCard 
          label="Availability" 
          value={p.isAvailable ? 'Active' : 'Inactive'} 
          subValue={p.availabilityMode}
          icon={Activity} 
          color="bg-green-50 text-green-600" 
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-100 p-1 w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="payout">Payout</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium text-sm">{p.email || '-'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium text-sm">{p.phone || '-'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email Verified</p>
                    <p className="font-medium text-sm">{p.isEmailVerified ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <InfoItem label="Provider ID" value={p._id?.slice(0, 8) + '...'} />
                  <InfoItem label="Created" value={p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '-'} />
                </div>
                {p.bio && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Bio</p>
                    <p className="text-sm text-muted-foreground">{p.bio}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-4 mt-6">
          {p.services && p.services.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.services.map((service: any, index: number) => (
                <Card key={index} className="border-slate-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold mb-1">{service.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{service.value}</p>
                    <p className="text-2xl font-bold text-primary">₦{service.price?.toLocaleString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-slate-200">
              <CardContent className="py-12 text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No services listed</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Location Tab */}
        <TabsContent value="location" className="space-y-4 mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shop Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                {p.shopAddress ? (
                  <div className="space-y-2">
                    <p className="font-medium">{p.shopAddress.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {p.shopAddress.city}, {p.shopAddress.state}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No shop address</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Service Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <span className="text-sm">Home Service</span>
                  <Badge variant={p.homeServiceAvailable ? "default" : "secondary"}>
                    {p.homeServiceAvailable ? 'Available' : 'Not Available'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <span className="text-sm">Shop Visit</span>
                  <Badge variant={p.offersShopVisit ? "default" : "secondary"}>
                    {p.offersShopVisit ? 'Available' : 'Not Available'}
                  </Badge>
                </div>
                {p.serviceArea && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <span className="text-sm">Service Radius</span>
                    <span className="font-medium">{p.serviceArea.radiusKm} km</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Weekly Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              {p.availability && p.availability.length > 0 ? (
                <div className="grid gap-2 sm:grid-cols-7">
                  {p.availability.map((day: any, index: number) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg text-center ${day.isClosed ? 'bg-red-50' : 'bg-green-50'}`}
                    >
                      <p className="font-medium text-sm">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'][day.dayOfWeek]}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {day.isClosed ? '-' : day.slots?.[0] ? `${day.slots[0].start}` : '✓'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No schedule set</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verification Tab */}
        <TabsContent value="verification" className="space-y-4 mt-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {p.verification?.idUri && (
              <Card className="border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    ID Document
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="relative group cursor-pointer"
                    onClick={() => {
                      setSelectedImage(p.verification?.idUri);
                      setSelectedImageLabel("ID Document");
                      setImageModalOpen(true);
                    }}
                  >
                    <img 
                      src={p.verification.idUri} 
                      alt="ID Document" 
                      className="w-full h-64 object-contain rounded-lg border bg-slate-50"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button variant="secondary" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(p.verification?.idUri);
                        setSelectedImageLabel("ID Document");
                        setImageModalOpen(true);
                      }}>
                        View Full Size
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {p.verification?.selfieUri && (
              <Card className="border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Selfie Verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="relative group cursor-pointer"
                    onClick={() => {
                      setSelectedImage(p.verification?.selfieUri);
                      setSelectedImageLabel("Selfie Verification");
                      setImageModalOpen(true);
                    }}
                  >
                    <img 
                      src={p.verification.selfieUri} 
                      alt="Selfie" 
                      className="w-full h-64 object-contain rounded-lg border bg-slate-50"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button variant="secondary" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(p.verification?.selfieUri);
                        setSelectedImageLabel("Selfie Verification");
                        setImageModalOpen(true);
                      }}>
                        View Full Size
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!p.verification?.idUri && !p.verification?.selfieUri && (
              <Card className="border-slate-200 sm:col-span-2">
                <CardContent className="py-12 text-center">
                  <Shield className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No verification documents uploaded</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Payout Tab */}
        <TabsContent value="payout" className="space-y-4 mt-6">
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Payout Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {p.payoutDetails ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-lg bg-slate-50">
                    <p className="text-xs text-muted-foreground mb-1">Bank Name</p>
                    <p className="font-medium">{p.payoutDetails.bankName}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50">
                    <p className="text-xs text-muted-foreground mb-1">Account Number</p>
                    <p className="font-medium">{p.payoutDetails.accountNumber}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50">
                    <p className="text-xs text-muted-foreground mb-1">Account Name</p>
                    <p className="font-medium">{p.payoutDetails.accountName}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50">
                    <p className="text-xs text-muted-foreground mb-1">Verification Status</p>
                    <Badge variant={p.payoutDetails.verifiedAt ? "default" : "secondary"}>
                      {p.payoutDetails.verifiedAt ? 'Verified' : 'Not Verified'}
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No payout details provided</p>
              )}
            </CardContent>
          </Card>

          {p.paystackRecipientCode && (
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Paystack Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-slate-50">
                  <p className="text-xs text-muted-foreground mb-1">Recipient Code</p>
                  <p className="font-mono text-sm">{p.paystackRecipientCode}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Image Preview Modal */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>{selectedImageLabel}</DialogTitle>
          </DialogHeader>
          <div className="p-4 overflow-auto">
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt={selectedImageLabel}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}