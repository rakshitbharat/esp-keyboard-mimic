"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipContent = TooltipPrimitive.Content;

export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={cn(
            "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95",
            className
          )}
        >
          {content}
        </TooltipContent>
      </TooltipPrimitive.Root>
    </TooltipProvider>
  );
}
