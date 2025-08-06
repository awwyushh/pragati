"use client"

import { Input } from "@/components/ui/input"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { ProtectedPageHeader } from "@/components/protected-page-header" // Import ProtectedPageHeader
import { Megaphone } from "lucide-react" // Icon for the header

export default function ComplaintsPage() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [complaintText, setComplaintText] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
    }
  }

  const handleSubmit = async () => {
    if (!selectedCategory || !complaintText.trim()) {
      toast.error("Submission Failed: Please select a category and write your complaint.")
      setSubmissionStatus("error")
      return
    }
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log({
      category: selectedCategory,
      complaint: complaintText,
      image: selectedImage,
    })
    setSubmissionStatus("success")
    toast.success("Complaint Submitted! Your complaint has been successfully recorded.")
    // Reset form
    setSelectedCategory("")
    setComplaintText("")
    setSelectedImage(null)
  }

  return (
    <>
      <ProtectedPageHeader title="Raise a Complaint" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6">
        <Card className="w-full max-w-2xl mx-auto max-h-screen border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              <Megaphone className="h-8 w-8 text-blue-600" /> Raise a Complaint
            </CardTitle>
            <CardDescription className="text-base text-gray-700">
              Select a category, describe the issue, and optionally attach a photo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-3">
              <Label className="text-lg font-medium text-gray-700">Category</Label>
              <RadioGroup onValueChange={setSelectedCategory} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { value: "sanitation", label: "Sanitation" },
                  { value: "water", label: "Water" },
                  { value: "electricity", label: "Electricity" },
                  { value: "road", label: "Road" },
                  { value: "others", label: "Others" },
                ].map((item) => (
                  <div
                    key={item.value}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/80 backdrop-blur-sm border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <RadioGroupItem value={item.value} id={item.value} className="h-5 w-5 text-blue-600" />
                    <Label htmlFor={item.value} className="text-base text-gray-700 cursor-pointer">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label htmlFor="complaint" className="text-lg font-medium text-gray-700">
                Complaint
              </Label>
              <Textarea
                id="complaint"
                placeholder="Describe the issue in detail..."
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                className="min-h-[120px] border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-base text-gray-800 p-3 bg-white/80 backdrop-blur-sm"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="image" className="text-lg font-medium text-gray-700">
                Attach Image (optional)
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file:text-blue-600 file:font-semibold file:bg-blue-50 file:border-blue-200 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:file:bg-blue-100 transition-colors duration-200 bg-white/80 backdrop-blur-sm"
              />
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Submit Complaint
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
