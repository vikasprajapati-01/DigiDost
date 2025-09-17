import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { PWAInstaller } from "@/components/pwa/PWAInstaller";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "DigiDost - Rural Education Platform",
    template: "%s | DigiDost",
  },
  description: "Gamified learning platform for rural education with offline support",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DigiDost",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "DigiDost",
    title: "DigiDost - Rural Education Platform",
    description: "Gamified learning platform for rural education",
  },
  twitter: {
    card: "summary",
    title: "DigiDost - Rural Education Platform",
    description: "Gamified learning platform for rural education",
  },
  icons: {
    icon: "/demo.jpg",
    shortcut: "/demo.jpg",
    apple: [
      { url: "/demo.jpg", sizes: "192x192", type: "image/jpg" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#60a5fa" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="application-name" content="DigiDost" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DigiDost" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/demo.jpg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/demo.jpg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/demo.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/demo.jpg" />
      </head>
      <body className={`font-sans antialiased min-h-screen bg-background text-foreground`}>
        <PWAInstaller />
        <div id="root">
          {children}
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
