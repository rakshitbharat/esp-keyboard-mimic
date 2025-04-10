import React from "react";
import { Layout } from "./components/Layout";
import { ThemeProvider } from "./components/ThemeProvider";
import { DeviceProvider } from "./providers/DeviceProvider";
import { SnippetProvider } from "./providers/SnippetProvider";
import { Toaster } from "./components/ui/toaster";

export const App = () => {
  return (
    <ThemeProvider>
      <DeviceProvider>
        <SnippetProvider>
          <Layout />
          <Toaster />
        </SnippetProvider>
      </DeviceProvider>
    </ThemeProvider>
  );
};
