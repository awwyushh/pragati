"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar" // Import SidebarTrigger
import { AppSidebar } from "@/components/app-sidebar"

export function AuthFlowWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const isPublicPath = ["/", "/login", "/language-selection"].includes(pathname)

  // Check localStorage only on the client side
  const isLoggedIn = typeof window !== "undefined" ? localStorage.getItem("isLoggedIn") === "true" : false
  const selectedLanguage = typeof window !== "undefined" ? localStorage.getItem("selectedLanguage") : null

  useEffect(() => {
    if (isPublicPath) {
      if (isLoggedIn && selectedLanguage && (pathname === "/login" || pathname === "/language-selection")) {
        router.push("/dashboard")
      }
      return
    }

    if (!isLoggedIn) {
      router.push("/login")
    } else if (!selectedLanguage) {
      router.push("/language-selection")
    }
  }, [pathname, router, isLoggedIn, selectedLanguage, isPublicPath])

  // If it's a public path, just render children directly (no sidebar).
  if (isPublicPath) {
    return <>{children}</>
  } else {
    // If it's a protected path, always render with SidebarProvider and the sidebar structure.
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Place SidebarTrigger here, as it's always within SidebarProvider's context */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            {/* The rest of the header content will be handled by individual page components */}
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    )
  }
}
