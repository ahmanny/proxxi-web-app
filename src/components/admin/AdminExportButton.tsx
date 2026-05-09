"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, FileSpreadsheet, File, FileText } from "lucide-react";
import { toast } from "react-hot-toast";

interface AdminExportButtonProps {
  exportUrl: string;
  filename?: string;
  disabled?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  label?: string;
  queryParams?: Record<string, string>;
  format?: 'csv' | 'excel';
}

export function AdminExportButton({
  exportUrl,
  filename,
  disabled = false,
  variant = "outline",
  size = "default",
  label = "Export",
  queryParams,
  format = 'csv'
}: AdminExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!exportUrl) return;
    
    setIsExporting(true);
    try {
      // Build URL with query params if provided
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      let url = exportUrl.startsWith('http') ? exportUrl : `${apiBaseUrl}${exportUrl}`;
      if (queryParams && Object.keys(queryParams).length > 0) {
        const params = new URLSearchParams(queryParams).toString();
        url = `${url}?${params}`;
      }

      // Get auth token from localStorage or cookie
      const token = typeof window !== 'undefined' 
        ? localStorage.getItem('token') || document.cookie.match(/token=([^;]+)/)?.[1]
        : null;

      const response = await fetch(url, {
        credentials: 'include',
        headers: {
          'Accept': format === 'excel' 
            ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
            : 'text/csv',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Export failed (${response.status})`);
      }
      
      const blob = await response.blob();
      
      // Determine content type and extension
      const contentType = format === 'excel' 
        ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        : 'text/csv';
      const extension = format === 'excel' ? 'xlsx' : 'csv';
      
      // Create download
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename || `export-${Date.now()}.${extension}`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(downloadUrl);
      a.remove();
      
      toast.success(`Export downloaded successfully`);
    } catch (error) {
      console.error('Export failed:', error);
      toast.error(error instanceof Error ? error.message : 'Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleExport}
      disabled={disabled || isExporting}
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : format === 'excel' ? (
        <File className="h-4 w-4 mr-2" />
      ) : (
        <Download className="h-4 w-4 mr-2" />
      )}
      {label}
    </Button>
  );
}

// Batch Export Component - Export multiple datasets at once
interface BatchExportProps {
  exports: {
    label: string;
    url: string;
    filename?: string;
    queryParams?: Record<string, string>;
  }[];
  onComplete?: (results: { success: string[]; failed: string[] }) => void;
}

export function AdminBatchExport({ exports, onComplete }: BatchExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [currentExport, setCurrentExport] = useState<string | null>(null);

  const handleBatchExport = async () => {
    setIsExporting(true);
    const results = { success: [] as string[], failed: [] as string[] };

    for (const exp of exports) {
      setCurrentExport(exp.label);
      try {
        let url = exp.url;
        if (exp.queryParams) {
          const params = new URLSearchParams(exp.queryParams).toString();
          url = `${url}?${params}`;
        }

        const response = await fetch(url, { credentials: 'include' });
        
        if (!response.ok) throw new Error('Failed');
        
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = exp.filename || `${exp.label.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        a.remove();
        
        results.success.push(exp.label);
      } catch (error) {
        results.failed.push(exp.label);
      }
    }

    setCurrentExport(null);
    setIsExporting(false);
    onComplete?.(results);
    
    if (results.failed.length === 0) {
      toast.success(`All ${results.success.length} exports completed`);
    } else {
      toast.error(`${results.failed.length} exports failed`);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleBatchExport} 
      disabled={isExporting}
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Exporting {currentExport}...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          Export All
        </>
      )}
    </Button>
  );
}

// Export Options Grid - For export page
interface ExportOption {
  label: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  href: string;
  format?: 'csv' | 'excel';
}

interface AdminExportOptionsProps {
  options: ExportOption[];
  className?: string;
}

export function AdminExportOptions({ options, className }: AdminExportOptionsProps) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${className || ''}`}>
      {options.map((option, index) => (
        <a
          key={index}
          href={option.href}
          className="flex flex-col p-6 bg-card rounded-xl border border-border hover:border-primary hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              {option.icon ? (
                <option.icon className="h-6 w-6 text-primary" />
              ) : (
                <FileSpreadsheet className="h-6 w-6 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{option.label}</h3>
              {option.format && (
                <span className="text-xs text-muted-foreground uppercase">
                  {option.format}
                </span>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4 flex-1">{option.description}</p>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Download className="w-4 h-4" />
            Download
          </div>
        </a>
      ))}
    </div>
  );
}

// Export with Date Range Filter
interface DateRangeExportProps {
  exportUrl: string;
  filename?: string;
  label?: string;
}

export function AdminDateRangeExport({ 
  exportUrl, 
  filename, 
  label = "Export with Date Range" 
}: DateRangeExportProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    setIsExporting(true);
    try {
      const url = `${exportUrl}?startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url, { credentials: 'include' });
      
      if (!response.ok) throw new Error('Export failed');
      
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = filename || `export-${startDate}-to-${endDate}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(urlBlob);
      a.remove();
      
      toast.success("Export downloaded");
    } catch (error) {
      toast.error("Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="px-3 py-2 border rounded-lg"
      />
      <span className="text-muted-foreground">to</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="px-3 py-2 border rounded-lg"
      />
      <Button 
        variant="outline" 
        onClick={handleExport} 
        disabled={isExporting || !startDate || !endDate}
      >
        {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        <span className="ml-2">{label}</span>
      </Button>
    </div>
  );
}