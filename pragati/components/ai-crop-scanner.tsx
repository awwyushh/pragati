"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { toast } from "sonner"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Camera, Sparkles } from "lucide-react"

export function AICropScanner() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [aiResult, setAiResult] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        setAiResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleScan = () => {
    if (!selectedImage) {
      toast.error("No Image Selected", {
        description: "Please upload an image of your crop to scan.",
        duration: 3000,
      })
      return
    }

    setIsScanning(true)
    setAiResult(null)

    // Simulated AI scanning
    setTimeout(() => {
      const results = [
        "This appears to be a healthy tomato plant. Ensure consistent watering.",
        "Signs of early blight detected. Consider applying a copper-based fungicide.",
        "This looks like a nutrient deficiency, possibly nitrogen. Apply a balanced fertilizer.",
        "Healthy wheat crop. Continue regular monitoring for pests.",
        "Evidence of powdery mildew. Improve air circulation and consider organic fungicides.",
      ]
      const randomResult = results[Math.floor(Math.random() * results.length)]
      setAiResult(randomResult)
      setIsScanning(false)

      toast.success("Scan Complete!", {
        description: "AI analysis is ready.",
        duration: 3000,
      })
    }, 3000)
  }

  return (
    <Card className="bg-blue-50 text-blue-900 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" /> AI Crop Scanner
        </CardTitle>
        <CardDescription className="text-blue-800">
          Upload an image of your crop to get instant insights and suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="crop-image">Upload Crop Image</Label>
          <Input id="crop-image" type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {selectedImage && (
          <div className="relative w-full h-48 rounded-md overflow-hidden border border-border">
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Uploaded Crop"
              layout="fill"
              objectFit="contain"
            />
          </div>
        )}

        <Button onClick={handleScan} disabled={isScanning || !selectedImage}>
          {isScanning ? (
            <>
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" /> Scanning...
            </>
          ) : (
            <>
              <Camera className="h-4 w-4 mr-2" /> Scan Crop
            </>
          )}
        </Button>

        {aiResult && (
          <div className="mt-4 p-3 rounded-md bg-blue-100 border border-blue-200 text-blue-900">
            <h4 className="font-semibold">AI Analysis:</h4>
            <p className="text-sm mt-1">{aiResult}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
