"use client"

import type React from "react"

import { useState } from "react"
import { CropCalendarCard } from "@/components/crop-calendar-card"
import { ProtectedPageHeader } from "@/components/protected-page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"
import { toast } from "sonner"

export default function AgricultureCropCalendarPage() {
  const [cropName, setCropName] = useState("")
  const [landSize, setLandSize] = useState("")
  const [crops, setCrops] = useState<{ cropName: string; landSize: string }[]>([])

  const handleAddCrop = (e: React.FormEvent) => {
    e.preventDefault()
    if (cropName.trim() && landSize.trim()) {
      setCrops([...crops, { cropName, landSize }])
      setCropName("")
      setLandSize("")
      toast.success("Crop Added!", {
        description: `${cropName} (${landSize}) has been added to your calendar.`,
        duration: 3000,
      })
    } else {
      toast.error("Missing Details", {
        description: "Please enter both crop name and land size.",
        duration: 3000,
      })
    }
  }

  const mockDescription =
    "This crop requires well-drained soil and full sunlight. Optimal planting time is early spring. Ensure consistent moisture during germination and early growth stages. Monitor for common pests like aphids and consider organic pest control methods."

  return (
    <>
      <ProtectedPageHeader title="Crop Calendar" backHref="/agriculture" />
      <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-8 space-y-12">
          {/* Form for adding crop details */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Add New Crop
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Enter details for your crops to manage their planting and harvesting schedules.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleAddCrop} className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="crop-name" className="text-lg font-medium text-gray-700">
                    Crop Name
                  </Label>
                  <Input
                    id="crop-name"
                    type="text"
                    placeholder="e.g., Wheat, Corn, Tomatoes"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-lg p-3"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="land-size" className="text-lg font-medium text-gray-700">
                    Land Size
                  </Label>
                  <Input
                    id="land-size"
                    type="text"
                    placeholder="e.g., 2 acres, 5 hectares"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    className="border-green-200 focus:border-green-500 focus:ring-green-500 text-lg p-3"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <PlusCircle className="h-5 w-5 mr-3" /> Add Crop
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Crop Cards */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Crops</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {crops.length === 0 ? (
                <p className="col-span-full text-center text-lg text-gray-600 p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
                  No crops added yet. Use the form above to add your first crop!
                </p>
              ) : (
                crops.map((crop, index) => (
                  <CropCalendarCard
                    key={index}
                    cropName={crop.cropName}
                    landSize={crop.landSize}
                    description={mockDescription}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
