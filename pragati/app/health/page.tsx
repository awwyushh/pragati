"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AmbulanceIcon as FirstAid, Baby, Syringe, Handshake } from "lucide-react"
import { MapPlaceholder } from "@/components/map-placeholder"
import { ProtectedPageHeader } from "@/components/protected-page-header"

import { useEffect, useState } from "react"

const healthNavItems = [
  {
    title: "First-Aid Guides",
    href: "/health/first-aid-guides",
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
    const [location, setLocation] = useState(null);

  useEffect(() => {
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    }
  }, []);
  return (
    <>
      <ProtectedPageHeader title="Health" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      {location ? (
        <p>
          Your Location: Latitude - {location.latitude}, Longitude - {location.longitude}
        </p>
      ) : (
        <p>Location data not available.</p>
      )}
        <MapPlaceholder
          title="Nearest Hospitals"
          description="Locate nearby hospitals and emergency services."
          mapQuery="map of hospitals in rural india"
          />

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Healthcare Module</CardTitle>
            <CardDescription>Access essential health information and services.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {healthNavItems.map((item) => (
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
          </CardContent>
        </Card>
      </div>
    </>
  )
}
