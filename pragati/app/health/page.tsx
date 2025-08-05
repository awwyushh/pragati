"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AmbulanceIcon as FirstAid, Baby, Syringe, Handshake } from "lucide-react"
import { MapPlaceholder } from "@/components/map-placeholder"
import { ProtectedPageHeader } from "@/components/protected-page-header"
import { useEffect, useState } from "react"

const healthNavItems = [
  {
    title: "First-Aid Guides",
    href: "/health/first-aid-guidelines",
    icon: FirstAid,
    description: "Learn basic first-aid procedures for common injuries.",
  },
  {
    title: "Maternal & Child Health",
    href: "/health/maternal-child-health",
    icon: Baby,
    description: "Tips and resources for expecting mothers and child care.",
  },
  {
    title: "Vaccination Alerts",
    href: "/health/vaccination-alerts",
    icon: Syringe,
    description: "Stay informed about important vaccination schedules and set reminders.",
  },
  {
    title: "Government Schemes",
    href: "/health/schemes",
    icon: Handshake,
    description: "Discover government health and welfare programs.",
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
      <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-6">
        <div className="text-sm text-muted-foreground">
          {location ? (
            <p>
              <span className="font-semibold">Your Location:</span> Latitude – {location.latitude}, Longitude –{" "}
              {location.longitude}
            </p>
          ) : (
            <p className="italic">Location data not available.</p>
          )}
        </div>

        <MapPlaceholder
          title="Nearest Hospitals"
          description="Locate nearby hospitals and emergency services."
          mapQuery="map of hospitals in rural india"
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Healthcare Module</CardTitle>
            <CardDescription>Access essential health information and services.</CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {healthNavItems.map((item) => (
              <Link key={item.title} href={item.href} className="block">
                <Card className="h-full p-4 flex flex-col items-center text-center hover:shadow-md hover:border-primary transition-all duration-200 cursor-pointer">
                  {item.icon && (
                    <div className="mb-4 text-primary">
                      <item.icon className="h-10 w-10" />
                    </div>
                  )}
                  <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                  <CardDescription className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </Card>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
