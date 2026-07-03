import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You don&apos;t have permission to access this page. 
            Please contact your administrator if you believe this is an error.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/admin/dashboard">
            <Button variant="outline">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/admin/login">
            <Button>
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}