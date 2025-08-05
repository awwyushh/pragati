"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function CropCalendarCard() {
  const cropData = [
    {
      season: "Kharif (Monsoon)",
      months: "June – October",
      crops: ["Rice", "Maize", "Bajra", "Jowar", "Cotton", "Groundnut", "Soybean", "Tur"],
    },
    {
      season: "Rabi (Winter)",
      months: "October – March",
      crops: ["Wheat", "Barley", "Mustard", "Chickpea", "Lentil", "Pea"],
    },
    {
      season: "Zaid (Summer)",
      months: "March – June",
      crops: ["Watermelon", "Muskmelon", "Cucumber", "Bitter Gourd", "Moong", "Sunflower"],
    },
  ]

  // Initialize selectedSeason to null, so no data is shown initially
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null)

  // Filter data based on selected season, or show nothing if no season is selected
  const filteredCropData = selectedSeason ? cropData.filter((entry) => entry.season === selectedSeason) : []

  return (
    <Card className="bg-orange-100 text-orange-800 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Crop Calendar</CardTitle>
        <CalendarDays className="h-6 w-6 text-orange-600" />
      </CardHeader>
      <CardContent>
        <CardDescription className="text-orange-700 mb-4">Seasonal information for major crops.</CardDescription>

        <div className="mb-4">
          <Select onValueChange={setSelectedSeason} value={selectedSeason || ""}>
            <SelectTrigger className="w-[180px] bg-white text-orange-900 border-orange-300">
              <SelectValue placeholder="Select Season" />
            </SelectTrigger>
            <SelectContent className="bg-white text-orange-900 border-orange-300">
              {cropData.map((entry) => (
                <SelectItem key={entry.season} value={entry.season}>
                  {entry.season}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Conditionally render the crop data section */}
        {selectedSeason && filteredCropData.length > 0 ? (
          <>
            {/* Table Header for larger screens */}
            <div className="hidden md:grid grid-cols-[1fr_1fr_2fr] gap-4 pb-2 border-b border-orange-300 font-semibold text-orange-900">
              <div>Season</div>
              <div>Months</div>
              <div>Major Crops</div>
            </div>

            {/* Responsive Rows */}
            <div className="grid gap-4 mt-4">
              {filteredCropData.map((entry, index) => (
                <div
                  key={index}
                  className="grid gap-2 p-3 rounded-md bg-orange-50 border border-orange-200
                             md:grid-cols-[1fr_1fr_2fr] md:gap-4 md:p-0 md:bg-transparent md:border-0 md:rounded-none"
                >
                  {/* Mobile Labels (hidden on md and larger screens) */}
                  <div className="md:hidden font-semibold text-orange-900">Season:</div>
                  <div className="font-medium">{entry.season}</div>

                  <div className="md:hidden font-semibold text-orange-900 mt-2">Months:</div>
                  <div>{entry.months}</div>

                  <div className="md:hidden font-semibold text-orange-900 mt-2">Major Crops:</div>
                  <div>{entry.crops.join(", ")}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // Message when no season is selected or no data for selected season
          <p className="text-muted-foreground text-center py-4">Please select a season to view crop information.</p>
        )}
      </CardContent>
    </Card>
  )
}
