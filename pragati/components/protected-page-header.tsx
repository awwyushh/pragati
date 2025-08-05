"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ProtectedPageHeaderProps {
  title: string
  backHref?: string // Optional href for a back button
}

export function ProtectedPageHeader({ title, backHref }: ProtectedPageHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      {" "}
      {/* Removed header tag as it's now in AuthFlowWrapper */}
      {backHref && (
        <>
          <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to {title}</span>
            </Link>
          </Button>
          <Separator orientation="vertical" className="mr-2 h-4" />
        </>
      )}
      <h1 className="text-6xl font-semibold">{title}</h1>
      {/* Any other header content like language selector or user profile can go here */}
    </div>
  )
}
