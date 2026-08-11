"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-300">
        {children}
      </div>
      <Toaster />
    </>
  );
}
