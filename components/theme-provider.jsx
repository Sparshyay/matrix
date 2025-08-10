"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider attribute="class" disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  );
}

export default ThemeProvider;


