"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";

// The showcase design is dark-first — the whole site runs locked in dark.
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
