import { useToast } from "@/hooks/useToast";
import { XCircle, CheckCircle, AlertCircle } from "lucide-react";

export function Toaster() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full md:max-w-[420px] p-4 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            relative rounded-lg p-4 pr-8 shadow-lg
            ${toast.type === "success" ? "bg-green-500" : ""}
            ${toast.type === "error" ? "bg-red-500" : ""}
            ${toast.type === "info" ? "bg-blue-500" : ""}
            text-white
          `}
        >
          <div className="flex items-start gap-3">
            {toast.type === "success" && <CheckCircle className="h-5 w-5" />}
            {toast.type === "error" && <XCircle className="h-5 w-5" />}
            {toast.type === "info" && <AlertCircle className="h-5 w-5" />}
            <div className="flex-1">
              <h3 className="font-medium">{toast.title}</h3>
              {toast.description && (
                <p className="text-sm opacity-90">{toast.description}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
