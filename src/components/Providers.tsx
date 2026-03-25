"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import type { ThemeProviderProps } from "next-themes";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SessionProvider>
      <ThemeProvider {...props}>{children}</ThemeProvider>
    </SessionProvider>
  );
}
