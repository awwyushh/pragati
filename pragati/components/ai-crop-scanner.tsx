"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Camera, ImageIcon, Sparkles, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AICropScanner() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [aiResult, setAiResult] = useState<{
    prediction: string;
    status: string;
    filename: string;
  } | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("camera")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showTips, setShowTips] = useState(false)
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Show tips after 2 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTips(true)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Handle camera cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        setAiResult(null)
        // Stop camera if it was active
        stopCamera()
      }
      reader.readAsDataURL(file)
    }
  }
  
  const startCamera = async () => {
    try {
      if (videoRef.current) {
        const constraints = { 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        }
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        videoRef.current.srcObject = stream
        setCameraActive(true)
        setSelectedImage(null)
        setSelectedFile(null)
        setAiResult(null)
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      toast.error("Camera Access Failed", {
        description: "Please allow camera access or use the upload option.",
        duration: 3000,
      })
    }
  }
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }
  
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        
        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" })
            setSelectedFile(file)
            
            // Convert to data URL for preview
            const reader = new FileReader()
            reader.onloadend = () => {
              setSelectedImage(reader.result as string)
              stopCamera()
            }
            reader.readAsDataURL(file)
          }
        }, 'image/jpeg', 0.95)
      }
    }
  }

  const handleScan = async () => {
    if (!selectedFile) {
      toast.error("No Image Selected", {
        description: "Please capture or upload an image of your crop to scan.",
        duration: 3000,
      })
      return
    }
    
    setIsScanning(true)
    setAiResult(null)
    
    try {
      // Create form data for API request
      const formData = new FormData()
      formData.append('file', selectedFile)
      
      // Call the disease detection API
      const response = await fetch('https://kaushawl-disease-ml-api.hf.space/predict', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const result = await response.json()
      setAiResult(result)
      
      toast.success("Scan Complete!", {
        description: "AI analysis is ready.",
        duration: 3000,
      })
    } catch (error) {
      console.error('Error scanning image:', error)
      toast.error("Scanning Failed", {
        description: "There was an error analyzing your image. Please try again.",
        duration: 3000,
      })
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 animate-fade-in">
      <CardHeader className="text-center pb-2 md:pb-4">
        <CardTitle className="flex items-center justify-center gap-2 md:gap-3 text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent animate-slide-down">
          <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-blue-500 animate-pulse" /> AI Crop Scanner
        </CardTitle>
        <CardDescription className="text-sm md:text-base text-gray-600 mt-1 md:mt-2 animate-slide-down" style={{ animationDelay: '100ms' }}>
          Scan your crops for diseases and get instant insights from our AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:gap-6 p-4 md:p-6">
        {/* Hidden canvas for camera capture */}
        <canvas ref={canvasRef} className="hidden" />
        
        <Tabs 
          defaultValue="camera" 
          className="w-full animate-slide-up" 
          style={{ animationDelay: '200ms' }}
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value)
            if (value === "camera" && isMobile) {
              startCamera()
            } else if (value === "upload") {
              stopCamera()
            }
          }}
        >
          <TabsList className="grid w-full grid-cols-2 mb-4 p-1 bg-gray-100 rounded-lg">
            <TabsTrigger 
              value="camera" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all duration-300"
            >
              <Camera className="h-4 w-4" /> Camera
            </TabsTrigger>
            <TabsTrigger 
              value="upload" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all duration-300"
            >
              <ImageIcon className="h-4 w-4" /> Upload
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="camera" className="mt-0 animate-fade-in">
            <div className="grid gap-3">
              {!cameraActive ? (
                <div className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 h-64 animate-pulse-slow">
                  <Camera className="h-12 w-12 text-blue-400" />
                  <p className="text-center text-gray-600 font-medium">Tap the button below to access your camera</p>
                  <Button 
                    onClick={startCamera}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 animate-bounce-subtle"
                  >
                    Open Camera
                  </Button>
                  
                  {showTips && (
                    <div className="mt-2 text-xs text-gray-500 bg-blue-50 p-2 rounded-md border border-blue-100 animate-fade-in">
                      <p className="font-medium text-blue-700 mb-1">Tips:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Ensure good lighting for better results</li>
                        <li>Focus on affected plant areas</li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative w-full rounded-lg overflow-hidden border-2 border-blue-300 shadow-inner bg-black aspect-video animate-fade-in">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Button 
                      onClick={stopCamera}
                      variant="outline"
                      size="sm"
                      className="bg-white/80 backdrop-blur-sm hover:bg-white text-red-500 rounded-full h-8 w-8 p-0 flex items-center justify-center shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <Button 
                      onClick={captureImage}
                      className="bg-white text-blue-600 hover:bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-blue-300 animate-pulse-slow"
                    >
                      <Camera className="h-7 w-7" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="mt-0 animate-fade-in">
            <div className="grid gap-3">
              <Label htmlFor="crop-image" className="text-sm md:text-base font-medium text-gray-700 flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-blue-500" /> Upload Crop Image
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer group">
                <Input
                  id="crop-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file:text-blue-600 file:font-semibold file:bg-blue-50 file:border-blue-200 file:rounded-full file:px-4 file:py-2 file:mr-4 hover:file:bg-blue-100 transition-colors duration-200 text-sm w-full cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-2 group-hover:text-gray-700 transition-colors duration-200">
                  Supported formats: JPG, PNG, WEBP (Max size: 10MB)
                </p>
              </div>
              
              {showTips && (
                <div className="mt-1 text-xs text-gray-500 bg-blue-50 p-2 rounded-md border border-blue-100 animate-fade-in">
                  <p className="font-medium text-blue-700 mb-1">For best results:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Use clear, well-lit images</li>
                    <li>Focus on the affected area of the plant</li>
                    <li>Avoid blurry or dark photos</li>
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {selectedImage && (
          <div className="relative w-full rounded-lg overflow-hidden border-2 border-blue-300 shadow-inner bg-gray-100 aspect-video animate-slide-up">
            <Image 
              src={selectedImage} 
              alt="Crop Image" 
              fill 
              className="object-contain" 
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <button 
              onClick={() => {
                setSelectedImage(null)
                setSelectedFile(null)
                setAiResult(null)
              }}
              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white text-red-500 rounded-full h-8 w-8 flex items-center justify-center shadow-md transition-all duration-200"
              aria-label="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        )}
        
        <Button
          onClick={handleScan}
          disabled={isScanning || !selectedImage}
          className={`w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 md:px-8 py-3 md:py-4 text-sm md:text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${selectedImage ? 'animate-bounce-subtle' : ''}`}
        >
          {isScanning ? (
            <>
              <Loader2 className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3 animate-spin" /> 
              <span className="animate-pulse">Analyzing your crop...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" /> 
              <span>Analyze with AI</span>
            </>
          )}
        </Button>
        
        {aiResult && (
          <div 
            className={`mt-4 p-4 md:p-6 rounded-lg ${aiResult.status === "infected" || aiResult.status === "diseased" ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"} text-gray-800 shadow-md animate-slide-up`}
            style={{ animationDelay: '300ms' }}
          >
            <h4 className="font-bold text-lg md:text-xl mb-3 flex items-center gap-2">
              {aiResult.status === "infected" || aiResult.status === "diseased" ? (
                <>
                  <AlertCircle className="h-6 w-6 md:h-7 md:w-7 text-red-500 animate-pulse" /> 
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Disease Detected</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-6 w-6 md:h-7 md:w-7 text-green-500 animate-pulse" /> 
                  <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Healthy Plant</span>
                </>
              )}
            </h4>
            <div className="space-y-3 bg-white/80 backdrop-blur-sm p-3 rounded-md border border-gray-100 shadow-sm">
              <div className="flex items-start gap-2">
                <div className="bg-blue-100 text-blue-800 p-1 rounded-full mt-0.5">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">AI Analysis:</p>
                  <p className="text-sm md:text-base font-semibold">
                    {aiResult.prediction}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 border-t border-gray-100 pt-2">
                <div className={`rounded-full h-3 w-3 ${aiResult.status === "infected" || aiResult.status === "diseased" ? "bg-red-500" : "bg-green-500"} animate-pulse`}></div>
                <p className="text-xs md:text-sm text-gray-600">
                  Status: <span className={aiResult.status === "infected" || aiResult.status === "diseased" ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                    {aiResult.status.charAt(0).toUpperCase() + aiResult.status.slice(1)}
                  </span>
                </p>
              </div>
              
              {(aiResult.status === "infected" || aiResult.status === "diseased") && (
                <div className="mt-3 text-xs bg-yellow-50 p-2 rounded-md border border-yellow-100 animate-fade-in">
                  <p className="font-medium text-yellow-700 mb-1">Recommended Actions:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Isolate affected plants to prevent spread</li>
                    <li>Consider appropriate treatment options</li>
                    <li>Monitor other plants for similar symptoms</li>
                    <li>Consult with a local agriculture expert</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
