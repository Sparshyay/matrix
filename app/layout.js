import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL("https://fullspheregroup.online"),
  title: "Full Sphere — All Possibilities. One Sphere.",
  description:
    "Full Sphere Group is a premier digital engineering and design practice. We develop modern websites, intuitive mobile applications, conversion-focused UI/UX design, and tailored custom software systems.",
  alternates: {
    canonical: "https://fullspheregroup.online",
  },
  openGraph: {
    title: "Full Sphere — All Possibilities. One Sphere.",
    description:
      "Full Sphere Group is a premier digital engineering and design practice. Flagship Web, Mobile Apps, UI/UX Systems & Enterprise Software.",
    url: "https://fullspheregroup.online",
    siteName: "Full Sphere Group",
    images: [
      {
        url: "/images/fullsphere-logo.png",
        width: 800,
        height: 800,
        alt: "Full Sphere Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Sphere — All Possibilities. One Sphere.",
    description:
      "Full Sphere Group is a premier digital engineering and design practice.",
    images: ["/images/fullsphere-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
