"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This is where you would normally send analytics data
    // For now, we'll just log page views to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(`Page view: ${pathname}${searchParams ? `?${searchParams}` : ""}`)
    }
    
    // In a real implementation, you would use something like:
    // if (typeof window.gtag === 'function') {
    //   window.gtag('event', 'page_view', {
    //     page_path: pathname + searchParams.toString(),
    //   })
    // }
  }, [pathname, searchParams])

  return null
}