"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"

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
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Raise a Complaint</CardTitle>
        <CardDescription>
          Select a category, describe the issue, and optionally attach a photo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <RadioGroup onValueChange={setSelectedCategory}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sanitation" id="sanitation" />
              <Label htmlFor="sanitation">Sanitation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="water" id="water" />
              <Label htmlFor="water">Water</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="electricity" id="electricity" />
              <Label htmlFor="electricity">Electricity</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="road" id="road" />
              <Label htmlFor="road">Road</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="others" id="others" />
              <Label htmlFor="others">Others</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="complaint">Complaint</Label>
          <Textarea
            id="complaint"
            placeholder="Describe the issue in detail..."
            value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Attach Image (optional)</Label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <Button onClick={handleSubmit}>Submit Complaint</Button>
      </CardContent>
    </Card>
  )
}
