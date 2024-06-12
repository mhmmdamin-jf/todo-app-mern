"use client";
import React, { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { appQueryClient } from "@/libs/reactQuery";
function AppQueryClient({ children }: { children: ReactNode }) {
  const queryClient = appQueryClient;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default AppQueryClient;
