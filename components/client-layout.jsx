"use client";

import ThemeProvider from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ConvexProviderWrapper from "@/components/convex-provider";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <ConvexProviderWrapper>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <div className="grain min-h-screen bg-[#0c0b0b] text-[#f3f1ec] selection:bg-[#d7193a] selection:text-white">
          {!isHomePage && <Header />}
          <main className="min-h-screen">
            {children}
          </main>
          {!isHomePage && <Footer />}
        </div>
      </ThemeProvider>
    </ConvexProviderWrapper>
  );
}
