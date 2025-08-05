"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
]

export default function LanguageSelectionPage() {
  const router = useRouter()

  const handleLanguageSelect = (langCode: string) => {
    localStorage.setItem("selectedLanguage", langCode)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 dark:bg-gray-950">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Select Your Language</CardTitle>
          <p className="text-muted-foreground">Choose your preferred language to use the application.</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant="outline"
              className="flex h-24 flex-col items-center justify-center gap-2 text-lg font-semibold bg-transparent"
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <Globe className="h-6 w-6" />
              <span>{lang.name}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
