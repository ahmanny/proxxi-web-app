import { Inbox } from "lucide-react";
import { MdArrowForward } from "react-icons/md";

interface EmptyStateProps {
  message: string;
  subtitle?: string;
  btnText?: string;
  action?: () => void;
}

export default function EmptyState({
  action,
  subtitle,
  message = "No items found",
  btnText,
}: EmptyStateProps) {
  return (
    <div className="w-full first:h-[304px] flex justify-center items-center ">
      <div className="flex flex-col justify-center items-center gap-4 w-[300px]">
        <Inbox className="w-16 h-16  mb-2 text-custom-500" />
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="heading-h5 text-gray-600">{message}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        {action && (
          <button
            type="button"
            onClick={action}
            className="primary-p1 text-custom-50 h-[40px] rounded-md flex justify-center items-center gap-2 w-1/2"
          >
            <span>{btnText}</span>
            <MdArrowForward className="text-2xl" />
          </button>
        )}
      </div>
    </div>
  );
}
