import { Toast } from "./toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <>
      {toasts.map(({ id, title, description, variant }) => (
        <Toast
          key={id}
          className={variant === "destructive" ? "bg-destructive" : undefined}
        >
          <div className="grid gap-1">
            {title && <div className="font-semibold">{title}</div>}
            {description && <div className="text-sm">{description}</div>}
          </div>
        </Toast>
      ))}
    </>
  );
}
