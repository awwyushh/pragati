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
    gradient: "from-emerald-500 to-teal-500",
    hoverGradient: "group-hover:from-emerald-600 group-hover:to-teal-600",
  },
  {
    title: "Crop Calendar",
    href: "/agriculture/crop-calendar",
    icon: CalendarDays,
    description: "View seasonal crop planting guides.",
    gradient: "from-orange-500 to-red-500",
    hoverGradient: "group-hover:from-orange-600 group-hover:to-red-600",
  },
  {
    title: "Guidelines",
    href: "/agriculture/guidelines",
    icon: BookOpen,
    description: "Access farming tips and best practices.",
    gradient: "from-blue-500 to-purple-500",
    hoverGradient: "group-hover:from-blue-600 group-hover:to-purple-600",
  },
  {
    title: "Schemes",
    href: "/agriculture/schemes",
    icon: Handshake,
    description: "Explore government support programs.",
    gradient: "from-green-500 to-lime-500",
    hoverGradient: "group-hover:from-green-600 group-hover:to-lime-600",
  },
]

export default function AgriculturePage() {
  return (
    <>
      <ProtectedPageHeader title="Agriculture" />
      <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-8 space-y-12">
          {/* Weather Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Current Weather Conditions</h2>
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <LiveWeatherCard />
              </div>
            </div>
          </section>

          {/* Agriculture Navigation Items */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Agriculture Tools</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {agricultureNavItems.map((item) => (
                <Link key={item.title} href={item.href} className="block">
                  <Card className="h-full flex flex-col justify-between hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg bg-white/90 backdrop-blur-sm group overflow-hidden relative">
                    {/* Gradient background overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 p-6 relative z-10">
                      <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                        {item.title}
                      </CardTitle>
                      <div
                        className={`p-2 rounded-full bg-gradient-to-r ${item.gradient} ${item.hoverGradient} transition-all duration-300 shadow-lg`}
                      >
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 relative z-10">
                      <CardDescription className="text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
