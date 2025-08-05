"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Camera, Sparkles, Loader2 } from "lucide-react"

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
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          <Sparkles className="h-8 w-8 text-purple-600" /> AI Crop Scanner
        </CardTitle>
        <CardDescription className="text-base text-gray-600 mt-2">
          Upload an image of your crop to get instant insights and suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        <div className="grid gap-3">
          <Label htmlFor="crop-image" className="text-lg font-medium text-gray-700">
            Upload Crop Image
          </Label>
          <Input
            id="crop-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file:text-blue-600 file:font-semibold file:bg-blue-50 file:border-blue-200 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:file:bg-blue-100 transition-colors duration-200"
          />
        </div>
        {selectedImage && (
          <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-blue-300 shadow-inner">
            <Image src={selectedImage || "/placeholder.svg"} alt="Uploaded Crop" layout="fill" objectFit="contain" />
          </div>
        )}
        <Button
          onClick={handleScan}
          disabled={isScanning || !selectedImage}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isScanning ? (
            <>
              <Loader2 className="h-5 w-5 mr-3 animate-spin" /> Scanning...
            </>
          ) : (
            <>
              <Camera className="h-5 w-5 mr-3" /> Scan Crop
            </>
          )}
        </Button>
        {aiResult && (
          <div className="mt-4 p-6 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 text-gray-800 shadow-md">
            <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" /> AI Analysis:
            </h4>
            <p className="text-base leading-relaxed">{aiResult}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
