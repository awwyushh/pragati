"use client"

import { Button } from "@/components/ui/button"
import { PhoneCall } from "lucide-react"
import { toast } from "sonner"
import { useState, useEffect } from "react"

export function SOSButton() {
  const [showRedOverlay, setShowRedOverlay] = useState(false)

  useEffect(() => {
    if (showRedOverlay) {
      const timer = setTimeout(() => {
        setShowRedOverlay(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showRedOverlay])

  const handleSOSClick = () => {
    setShowRedOverlay(true)
    toast.error("🚨 SOS Call Initiated!", {
      description: "Emergency services have been notified. Help is on the way.",
      duration: 3000,
    })
  }

  return (
    <>
      {showRedOverlay && (
        <div className="fixed inset-0 z-[9999] bg-red-600 opacity-75 transition-opacity duration-300" />
      )}
      <Button
        onClick={handleSOSClick}
        className="fixed top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg"
        aria-label="SOS Call"
      >
        <PhoneCall className="h-6 w-6" />
        <span className="sr-only">SOS Call</span>
      </Button>
    </>
  )
}
