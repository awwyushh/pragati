import type { Metadata } from "next"
import type React from "react"
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import { AuthFlowWrapper } from "@/components/ui/auth-flow-wrapper" // Re-import AuthFlowWrapper
import { AIChatButton } from "@/components/ai-chat-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PRAGATI - Empowering Rural Communities",
  description: "PRAGATI: Offline-First PWA for Remote Villages, providing health, agriculture, and education services.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
     
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <AuthFlowWrapper>{children}</AuthFlowWrapper> {/* Use AuthFlowWrapper */}
        <Toaster richColors position="top-right" />
        <AIChatButton />
      </body>
    </html>
  )
}
