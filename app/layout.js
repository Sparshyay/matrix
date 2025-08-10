import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import ConvexProviderWrapper from "@/components/convex-provider";
import SmoothCursor from "@/components/magic/SmoothCursor";
import BackgroundGrid from "@/components/magic/BackgroundGrid";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Matrix — Portfolio",
  description: "Minimal portfolio for Matrix studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
      </body>
    </html>
  );
}
