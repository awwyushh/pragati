"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudRain, Sun, Cloud, Snowflake, Wind } from "lucide-react"

interface WeatherDisplayProps {
  temperature: number
  description: string
  icon: "sunny" | "cloudy" | "rainy" | "stormy" | "snowy" | "windy"
  location: string
}

const WeatherIcon = ({ icon }: { icon: WeatherDisplayProps["icon"] }) => {
  switch (icon) {
    case "sunny":
      return <Sun className="h-12 w-12 text-yellow-500" />
    case "cloudy":
      return <Cloud className="h-12 w-12 text-gray-400" />
    case "rainy":
      return <CloudRain className="h-12 w-12 text-blue-500" />
    case "stormy":
      return <CloudRain className="h-12 w-12 text-gray-600" /> // Using CloudRain for stormy as well, could be more specific
    case "snowy":
      return <Snowflake className="h-12 w-12 text-blue-300" />
    case "windy":
      return <Wind className="h-12 w-12 text-gray-500" />
    default:
      return <Sun className="h-12 w-12 text-yellow-500" />
  }
}

export function WeatherDisplay({ temperature, description, icon, location }: WeatherDisplayProps) {
  return (
    <Card className="flex flex-col justify-between p-4 bg-gradient-to-br from-secondary to-blue-200 text-secondary-foreground shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{location}</CardTitle>
        <WeatherIcon icon={icon} />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="text-5xl font-bold">{temperature}°C</div>
        <p className="text-sm capitalize">{description}</p>
      </CardContent>
    </Card>
  )
}
