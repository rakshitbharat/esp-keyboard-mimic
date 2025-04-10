import React from "react";
import { FloatingWindow } from "../FloatingWindow";
import { SnippetPanel } from "../SnippetPanel";
import { Settings } from "../Settings";
import { Toaster } from "./toaster";

export const Layout = () => {
  return (
    <div className="relative h-screen w-screen">
      <div className="fixed top-4 left-4">
        <FloatingWindow />
      </div>
      <div className="fixed top-4 right-4 space-y-4">
        <SnippetPanel />
        <Settings />
      </div>
      <Toaster />
    </div>
  );
};
