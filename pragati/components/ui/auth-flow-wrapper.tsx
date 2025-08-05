"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export function AuthFlowWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  // Determine if the current path is a "public" path that doesn't need the sidebar
  const isPublicPath = ["/", "/login", "/language-selection"].includes(pathname)

  // Check localStorage only on the client side
  const isLoggedIn = typeof window !== "undefined" ? localStorage.getItem("isLoggedIn") === "true" : false
  const selectedLanguage = typeof window !== "undefined" ? localStorage.getItem("selectedLanguage") : null

  useEffect(() => {
    // If it's a public path, no authentication/language check is needed for *staying* on this page.
    // The redirects below handle moving *away* from public paths if the user is fully authenticated.
    if (isPublicPath) {
      // If user is fully authenticated, redirect from login/language-selection to dashboard
      if (isLoggedIn && selectedLanguage && (pathname === "/login" || pathname === "/language-selection")) {
        router.replace("/dashboard")
      }
      return // No further checks needed for public paths
    }

    // If it's a protected path (not a public path)
    if (!isLoggedIn) {
      router.replace("/login") // Not logged in, redirect to login
    } else if (!selectedLanguage) {
      router.replace("/language-selection") // Logged in but no language, redirect to language selection
    }
    // If logged in AND language selected, they can stay on the protected page.
  }, [pathname, router, isLoggedIn, selectedLanguage, isPublicPath]) // Added isPublicPath to dependencies

  // Render logic:
  // If it's a public path, just render children directly (no sidebar).
  if (isPublicPath) {
    return <>{children}</>
  } else {
    // If it's a protected path, always render with SidebarProvider.
    // The useEffect above will handle redirecting if auth/language is missing.
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    )
  }
}
