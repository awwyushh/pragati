import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner" // ✅ Updated here
import { AuthFlowWrapper } from "@/components/ui/auth-flow-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "PRAGATI - Empowering Rural Communities",
  description: "PRAGATI: Offline-First PWA for Remote Villages, providing health, agriculture, and education services.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <AuthFlowWrapper>{children}</AuthFlowWrapper>
        <Toaster richColors position="top-right" /> {/* ✅ Customize if needed */}
      </body>
    </html>
  )
}
