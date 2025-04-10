import React from "react";
import DragWindowRegion from "@/components/DragWindowRegion";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background/90 backdrop-blur-sm rounded-lg border border-border/40 shadow-lg">
      <DragWindowRegion title="ESP Keyboard Mimic" />
      <main className="flex-1 p-2 overflow-hidden">{children}</main>
    </div>
  );
}
