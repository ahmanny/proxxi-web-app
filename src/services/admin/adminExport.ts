import { useMutation } from "@tanstack/react-query";
import API from "@/lib/axios";
import { toast } from "react-hot-toast";

interface ExportOptions {
  resource: string;
  filename?: string;
  query?: Record<string, any>;
  format?: 'csv' | 'excel';
}

interface ExportResult {
  success: boolean;
  filename?: string;
  error?: string;
}

export const useExportAdminData = () => {
  return useMutation({
    mutationFn: async ({ resource, filename, query, format = 'csv' }: ExportOptions): Promise<ExportResult> => {
      try {
        const params = new URLSearchParams(query).toString();
        const url = params ? `/admin/export/${resource}?${params}` : `/admin/export/${resource}`;
        
        const response = await API.get(url, {
          responseType: 'blob',
        });

        const contentType = response.headers['content-type'] || (format === 'excel' 
          ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
          : 'text/csv');
          
        const extension = contentType.includes('excel') ? 'xlsx' : 'csv';
        const downloadFilename = filename || `export-${Date.now()}.${extension}`;

        const blob = new Blob([response.data], { type: contentType });
        const urlBlob = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = urlBlob;
        a.download = downloadFilename;
        document.body.appendChild(a);
        a.click();
        
        window.URL.revokeObjectURL(urlBlob);
        a.remove();

        return { success: true, filename: downloadFilename };
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Export failed';
        return { success: false, error: errorMessage };
      }
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success(`Export downloaded: ${result.filename}`);
      } else {
        toast.error(result.error || 'Export failed');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Export failed. Please try again.');
    },
  });
};

// Utility function for direct download without React Query
export const downloadExport = async (
  resource: string,
  query?: Record<string, any>,
  customFilename?: string
): Promise<void> => {
  try {
    const params = new URLSearchParams(query).toString();
    const url = params ? `/admin/export/${resource}?${params}` : `/admin/export/${resource}`;
    
    const response = await API.get(url, { responseType: 'blob' });
    
    const contentType = response.headers['content-type'] || 'text/csv';
    const extension = contentType.includes('excel') ? 'xlsx' : 'csv';
    const filename = customFilename || `export-${Date.now()}.${extension}`;
    
    const blob = new Blob([response.data], { type: contentType });
    const blobUrl = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    window.URL.revokeObjectURL(blobUrl);
    a.remove();
    
    toast.success('Export downloaded successfully');
  } catch (error) {
    console.error('Export error:', error);
    throw error;
  }
};

// Export presets for common data types
export const EXPORT_PRESETS = {
  users: {
    resource: 'users',
    filename: 'users-export',
  },
  providers: {
    resource: 'providers',
    filename: 'providers-export',
  },
  bookings: {
    resource: 'bookings',
    filename: 'bookings-export',
  },
  disputes: {
    resource: 'disputes',
    filename: 'disputes-export',
  },
  auditLogs: {
    resource: 'audit-logs',
    filename: 'audit-logs-export',
  },
} as const;