"use client";

import ThemeProvider from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ConvexProviderWrapper from "@/components/convex-provider";
import dynamic from 'next/dynamic';

// Import components that might cause hydration issues with no SSR
const SmoothCursor = dynamic(
  () => import('@/components/magic/SmoothCursor'),
  { ssr: false }
);

const BackgroundGrid = dynamic(
  () => import('@/components/magic/BackgroundGrid'),
  { ssr: false }
);

export default function ClientLayout({ children }) {
  return (
    <ConvexProviderWrapper>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <BackgroundGrid />
        <SmoothCursor />
        <Header />
        <main className="min-h-[calc(100vh-200px)]">
          {children}
        </main>
        <Footer />
      </ThemeProvider>
    </ConvexProviderWrapper>
  );
}
