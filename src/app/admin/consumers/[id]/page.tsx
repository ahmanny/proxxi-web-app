"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useFetchConsumerById } from "@/services/admin/adminQueries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield,
  Home,
  Loader2,
  ArrowLeft
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

const getVerificationBadge = (status?: string) => {
  switch (status) {
    case 'verified':
      return <Badge className="bg-green-100 text-green-700 border-green-200">Verified</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>;
    case 'rejected':
      return <Badge className="bg-red-100 text-red-700 border-red-200">Rejected</Badge>;
    default:
      return <Badge variant="outline">Unverified</Badge>;
  }
};

const InfoItem = ({ label, value }: { label: string; value?: string | number | null }) => (
  <div>
    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
    <p className="font-medium text-sm">{value || '-'}</p>
  </div>
);

export default function ConsumerDetailPage() {
  const params = useParams();
  const consumerId = params?.id as string;
  const [activeTab, setActiveTab] = useState("overview");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageLabel, setSelectedImageLabel] = useState("");
  
  const { data: consumer, isLoading, error } = useFetchConsumerById(consumerId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading consumer details...</p>
        </div>
      </div>
    );
  }

  if (error || !consumer) {
    return (
      <div className="p-8">
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="pt-6">
            <p className="text-red-600 font-medium">Failed to load consumer details</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/admin/consumers">Back to Consumers</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const c = consumer.data || consumer;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/consumers">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            {c.profilePicture ? (
              <img 
                src={c.profilePicture} 
                alt={`${c.firstName} ${c.lastName}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                <User className="w-8 h-8 text-slate-400" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold">
                  {c.firstName} {c.lastName}
                </h1>
                {getVerificationBadge(c.verificationStatus)}
              </div>
              <p className="text-muted-foreground">{c.email || c.phone || 'No contact info'}</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-100 p-1 w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

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
                    <p className="font-medium text-sm">{c.email || '-'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium text-sm">{c.phone || '-'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email Verified</p>
                    <p className="font-medium text-sm">{c.isConsumerEmailVerified ? 'Yes' : 'No'}</p>
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
                  <InfoItem label="Consumer ID" value={c._id?.slice(0, 8) + '...'} />
                  <InfoItem label="Created" value={c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '-'} />
                  <InfoItem label="User ID" value={c.userId?.slice(0, 8) + '...'} />
                  <InfoItem label="Addresses" value={c.addresses?.length || 0} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4 mt-6">
          {c.addresses && c.addresses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.addresses.map((address: any, index: number) => (
                <Card key={index} className={`border-slate-200 hover:shadow-md transition-shadow ${address.isDefault ? 'ring-2 ring-primary' : ''}`}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{address.label}</span>
                      </div>
                      {address.isDefault && (
                        <Badge variant="default" className="text-xs">Default</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {address.formattedAddress}
                    </p>
                    {address.location && (
                      <p className="text-xs text-muted-foreground">
                        {address.location.city}, {address.location.state}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-slate-200">
              <CardContent className="py-12 text-center">
                <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No addresses saved</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="verification" className="space-y-4 mt-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {c.verification?.idUri && (
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
                      setSelectedImage(c.verification?.idUri);
                      setSelectedImageLabel("ID Document");
                      setImageModalOpen(true);
                    }}
                  >
                    <img 
                      src={c.verification.idUri} 
                      alt="ID Document" 
                      className="w-full h-48 object-contain rounded-lg border bg-slate-50"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button variant="secondary" size="sm">View Full Size</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {c.verification?.selfieUri && (
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
                      setSelectedImage(c.verification?.selfieUri);
                      setSelectedImageLabel("Selfie Verification");
                      setImageModalOpen(true);
                    }}
                  >
                    <img 
                      src={c.verification.selfieUri} 
                      alt="Selfie" 
                      className="w-full h-48 object-contain rounded-lg border bg-slate-50"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button variant="secondary" size="sm">View Full Size</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!c.verification?.idUri && !c.verification?.selfieUri && (
              <Card className="border-slate-200 sm:col-span-2">
                <CardContent className="py-12 text-center">
                  <Shield className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No verification documents uploaded</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

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