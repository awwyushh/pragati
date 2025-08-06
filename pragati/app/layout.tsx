import type { Metadata } from "next";
import type React from "react";
import { Poppins, Roboto_Serif } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { AuthFlowWrapper } from "@/components/ui/auth-flow-wrapper";
import { AIChatButton } from "@/components/ai-chat-button";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@/components/analytics";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-serif",
});

export const metadata: Metadata = {
  title: "PRAGATI - Empowering Rural Communities",
  description:
    "PRAGATI: Offline-First PWA for Remote Villages, providing health, agriculture, and education services.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          poppins.variable,
          robotoSerif.variable,
          poppins.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthFlowWrapper>{children}</AuthFlowWrapper>
          <Toaster richColors position="top-right" />
          <AIChatButton />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
