"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English", gradient: "from-blue-500 to-purple-500" },
  { code: "hi", name: "हिंदी (Hindi)", gradient: "from-green-500 to-teal-500" },
  { code: "mr", name: "मराठी (Marathi)", gradient: "from-orange-500 to-red-500" },
  { code: "bn", name: "বাংলা (Bengali)", gradient: "from-pink-500 to-purple-500" },
  { code: "te", name: "తెలుగు (Telugu)", gradient: "from-yellow-500 to-lime-500" },
  { code: "ta", name: "தமிழ் (Tamil)", gradient: "from-cyan-500 to-blue-500" },
]

export default function LanguageSelectionPage() {
  const router = useRouter()
  const handleLanguageSelect = (langCode: string) => {
    localStorage.setItem("selectedLanguage", langCode)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-2xl border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Select Your Language
          </CardTitle>
          <CardDescription className="text-base text-gray-700">
            Choose your preferred language to use the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 p-6">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant="outline"
              className={`flex h-28 flex-col items-center justify-center gap-3 text-lg font-semibold border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer rounded-lg text-center relative overflow-hidden bg-white/80 backdrop-blur-sm group`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${lang.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>
              <Globe
                className={`h-8 w-8 text-gray-700 group-hover:text-gray-900 transition-colors duration-200 relative z-10`}
              />
              <span className="text-gray-800 group-hover:text-gray-900 transition-colors duration-200 relative z-10">
                {lang.name}
              </span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
