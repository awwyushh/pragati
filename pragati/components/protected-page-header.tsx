"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ProtectedPageHeaderProps {
  title: string
  backHref?: string // Optional href for a back button
}

export function ProtectedPageHeader({ title, backHref }: ProtectedPageHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
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
      <h1 className="text-xl font-semibold">{title}</h1>
      {/* Any other header content like language selector or user profile can go here */}
    </header>
  )
}
