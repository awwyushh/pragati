"use client"

import Link from "next/link"
import { CalendarDays, Scan, BookOpen, Handshake } from "lucide-react"
import LiveWeatherCard from "@/components/live-weather-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ProtectedPageHeader } from "@/components/protected-page-header"

const agricultureNavItems = [
  {
    title: "AI Scanner",
    href: "/agriculture/ai-scanner",
    icon: Scan,
    description: "Analyze crop health from images.",
  },
  {
    title: "Crop Calendar",
    href: "/agriculture/crop-calendar",
    icon: CalendarDays,
    description: "View seasonal crop planting guides.",
  },
  {
    title: "Guidelines",
    href: "/agriculture/guidelines",
    icon: BookOpen,
    description: "Access farming tips and best practices.",
  },
  {
    title: "Schemes",
    href: "/agriculture/schemes",
    icon: Handshake,
    description: "Explore government support programs.",
  },
]

export default function AgriculturePage() {
  return (
    <>
      <ProtectedPageHeader title="Agriculture" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div id="weather" className="grid gap-4">
          <h2 className="text-2xl font-bold sr-only">Weather Conditions</h2>
          <LiveWeatherCard/>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
          {agricultureNavItems.map((item) => (
            <Link key={item.title} href={item.href} className="block">
              <Card className="h-full flex flex-col justify-between hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
                  {item.icon && <item.icon className="h-6 w-6 text-primary" />}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">{item.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
