"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Leaf, Ruler } from "lucide-react"

interface CropCalendarCardProps {
  cropName: string
  landSize: string
  description: string
}

export function CropCalendarCard({ cropName, landSize, description }: CropCalendarCardProps) {
  return (
    <Card className="h-full flex flex-col justify-between border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 overflow-hidden relative group">
      {/* Dynamic gradient overlay based on crop name (example) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          cropName.toLowerCase().includes("wheat")
            ? "from-yellow-500 to-orange-500"
            : cropName.toLowerCase().includes("corn")
              ? "from-amber-500 to-yellow-600"
              : cropName.toLowerCase().includes("tomato")
                ? "from-red-500 to-pink-500"
                : "from-green-500 to-blue-500"
        } opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>

      <CardHeader className="relative z-10 pb-4">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          {cropName}
        </CardTitle>
        <CardDescription className="text-lg text-gray-600 flex items-center gap-2">
          <Ruler className="h-5 w-5 text-gray-500" /> Land Size: {landSize}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 p-6 pt-0 flex-grow">
        <p className="text-base text-gray-700 leading-relaxed mb-6">{description}</p>
        <div className="flex flex-col gap-3">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <CalendarDays className="h-5 w-5 mr-2" /> View Schedule
          </Button>
          <Button
            variant="outline"
            className="w-full border-green-500 text-green-700 hover:bg-green-50 hover:text-green-800 px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-transparent"
          >
            <Leaf className="h-5 w-5 mr-2" /> Crop Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
