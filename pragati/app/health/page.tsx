"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { AmbulanceIcon as FirstAid, Baby, Syringe, Handshake, MapPin } from "lucide-react"
import { MapPlaceholder } from "@/components/map-placeholder"
import { ProtectedPageHeader } from "@/components/protected-page-header"
import { useEffect, useState } from "react"

const healthNavItems = [
  {
    title: "First-Aid Guides",
    href: "/health/first-aid-guidelines",
    icon: FirstAid,
    gradient: "from-red-500 to-orange-500",
  },
  {
    title: "Maternal & Child Health",
    href: "/health/maternal-child-health",
    icon: Baby,
    gradient: "from-pink-500 to-purple-500",
  },
  {
    title: "Vaccination Alerts",
    href: "/health/vaccination-alerts",
    icon: Syringe,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Government Schemes",
    href: "/health/schemes",
    icon: Handshake,
    gradient: "from-green-500 to-teal-500",
  },
]

export default function HealthPage() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation")
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation))
    }
  }, [])

  return (
    <>
      <ProtectedPageHeader title="Health" />
      <div className="relative min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-8 space-y-12">
          {/* Location Display */}
          <div className="flex justify-center text-center">
            <Card className="w-full max-w-md border-0 shadow-lg bg-white/90 backdrop-blur-sm p-4">
              <CardContent className="flex items-center justify-center gap-3 text-lg text-gray-700 font-medium">
                <MapPin className="h-6 w-6 text-blue-600" />
                {location ? (
                  <p>
                    <span className="font-semibold">Your Location:</span> Latitude – {location.latitude}, Longitude –{" "}
                    {location.longitude}
                  </p>
                ) : (
                  <p className="italic">Location data not available.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nearest Hospitals</h2>
            <div className="flex justify-center">
              <MapPlaceholder
                title="Nearest Hospitals"
                description="Locate nearby hospitals and emergency services."
                mapQuery="map of hospitals in rural india"
                className="w-full max-w-4xl h-96 rounded-lg shadow-xl border-0 bg-white/90 backdrop-blur-sm"
              />
            </div>
          </section>

          {/* Healthcare Module Navigation */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Healthcare Modules</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {healthNavItems.map((item) => (
                <Link key={item.title} href={item.href} className="block group">
                  <Card className="h-full p-6 flex flex-col items-center text-center justify-between border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    {item.icon && (
                      <div
                        className={`mb-4 p-3 rounded-full bg-gradient-to-r ${item.gradient} text-white shadow-md group-hover:shadow-lg transition-all duration-300 relative z-10`}
                      >
                        <item.icon className="h-8 w-8" />
                      </div>
                    )}
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-200 relative z-10 mb-2">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-base text-gray-700 leading-relaxed relative z-10">
                      {item.description}
                    </CardDescription>
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
