import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = "Something went wrong",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-10">
      <AlertTriangle className="text-red-500 w-12 h-12" />
      <p className="text-lg font-medium text-red-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  );
}
