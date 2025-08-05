"use client"

import { useState } from "react"
import { CropCalendarCard } from "@/components/crop-calendar-card"
import { ProtectedPageHeader } from "@/components/protected-page-header"

export default function AgricultureCropCalendarPage() {
  const [cropName, setCropName] = useState("")
  const [landSize, setLandSize] = useState("")
  const [crops, setCrops] = useState<{ cropName: string; landSize: string }[]>(
    []
  )

  const handleAddCrop = (e: React.FormEvent) => {
    e.preventDefault()
    if (cropName.trim() && landSize.trim()) {
      setCrops([...crops, { cropName, landSize }])
      setCropName("")
      setLandSize("")
    }
  }

  const mockDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut erat nulla. Integer sit amet quam quis velit venenatis mollis."

  return (
    <>
      <ProtectedPageHeader title="Crop Calendar" backHref="/agriculture" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">


        {/* Form for adding crop details */}
        <form
          onSubmit={handleAddCrop}
          className="flex flex-col gap-4 border p-4 rounded-lg shadow"
        >
          <h2 className="text-lg font-semibold">Add Crop Details</h2>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <input
              type="text"
              placeholder="Crop Name"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              className="border p-2 rounded-md flex-1"
              required
            />
            <input
              type="text"
              placeholder="Land Size (e.g., 2 acres)"
              value={landSize}
              onChange={(e) => setLandSize(e.target.value)}
              className="border p-2 rounded-md flex-1"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add Crop
            </button>
          </div>
        </form>

        {/* Crop Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {crops.map((crop, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 border rounded-lg shadow-lg flex flex-col"
            >
              <h3 className="text-4xl text-green-300 font-semibold mb-2">{crop.cropName}</h3>
              <p className="text-2xl text-green-100 mb-4">Land Size: {crop.landSize}</p>
              <p className="text-md text-gray-100">{mockDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
