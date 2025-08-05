"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { ProtectedPageHeader } from "@/components/protected-page-header"
import { Baby, Utensils, AlertTriangle, Bed, Pill } from "lucide-react"

const trimesterData = [
  {
    trimester: "1st (1-3 months)",
    eat: "Folic acid rich foods (leafy greens, beans), dairy, lean protein, fruits, vegetables.",
    avoid: "Raw meat, unpasteurized dairy, certain fish (high mercury), excessive caffeine, papaya, pineapple.",
    dangerSigns: "Vaginal bleeding, severe nausea/vomiting, severe abdominal pain, fainting, fever.",
    sleepPosture: "Side-sleeping (especially left side), use pillows for comfort.",
    supplements: "Folic acid (essential for neural tube development), prenatal vitamins.",
  },
  {
    trimester: "2nd (4-6 months)",
    eat: "Iron-rich foods (spinach, lentils, red meat), protein, calcium (milk, yogurt), whole grains.",
    avoid: "Fried and greasy foods, sprouts, excessive sweets, unwashed produce.",
    dangerSigns:
      "Sudden swelling in face/hands, severe headache, blurred vision, persistent abdominal pain, fever, reduced fetal movement.",
    sleepPosture:
      "Left side-sleeping is ideal, avoid lying flat on your back. Use pillows between knees and under belly. Avoid bending from waist.",
    supplements: "Iron (to prevent anemia), Calcium (for baby's bone development), Vitamin D.",
  },
  {
    trimester: "3rd (7-9 months)",
    eat: "Fiber-rich foods (whole grains, fruits, vegetables), plenty of fluids, small frequent meals.",
    avoid: "Salty foods (can cause swelling), highly processed foods, raw eggs.",
    dangerSigns:
      "Early labor signs (contractions, water breaking), severe headache, persistent abdominal pain, reduced fetal movement, sudden weight gain, severe swelling.",
    sleepPosture:
      "Continue side-sleeping, use body pillows for support, elevate legs to reduce swelling. Avoid prolonged standing.",
    supplements: "Continue prenatal vitamins, iron, calcium. Discuss additional supplements with doctor.",
  },
]

export default function MaternalChildHealthPage() {
  const [selectedTrimester, setSelectedTrimester] = useState<string | null>(null)
  const currentTrimesterData = trimesterData.find((data) => data.trimester === selectedTrimester)

  return (
    <>
      <ProtectedPageHeader title="Maternal & Child Health" backHref="/health" />
      <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-8 space-y-12">
          <Card className="w-full max-w-4xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                <Baby className="h-8 w-8 text-pink-600" /> Care for Mothers and Children
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Guidance for prenatal care, child development, and common health issues.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 p-6">
              <div className="mb-4 flex justify-center">
                <Select onValueChange={setSelectedTrimester} value={selectedTrimester || ""}>
                  <SelectTrigger className="w-full md:w-[300px] py-5 bg-white/80 backdrop-blur-sm text-gray-800 border-blue-200 shadow-md hover:border-blue-300 transition-colors duration-200">
                    <SelectValue placeholder="Select Trimester" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 backdrop-blur-sm text-gray-800 border-blue-200 shadow-lg">
                    {trimesterData.map((data) => (
                      <SelectItem key={data.trimester} value={data.trimester} className="hover:bg-blue-50">
                        {data.trimester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {currentTrimesterData ? (
                <div className="grid gap-6">
                  <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center gap-3 pb-2">
                      <Utensils className="h-6 w-6 text-green-600" />
                      <CardTitle className="text-xl font-bold text-gray-800">Diet: What to Eat & Avoid</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 p-6 pt-2">
                      <div>
                        <h3 className="font-semibold text-lg text-green-600 mb-1">Eat:</h3>
                        <p className="text-base text-gray-700 leading-relaxed">{currentTrimesterData.eat}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-red-600 mb-1">Avoid:</h3>
                        <p className="text-base text-gray-700 leading-relaxed">{currentTrimesterData.avoid}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center gap-3 pb-2">
                      <AlertTriangle className="h-6 w-6 text-orange-600" />
                      <CardTitle className="text-xl font-bold text-gray-800">Danger Signs</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-2">
                      <p className="text-base text-gray-700 leading-relaxed">{currentTrimesterData.dangerSigns}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center gap-3 pb-2">
                      <Bed className="h-6 w-6 text-blue-600" />
                      <CardTitle className="text-xl font-bold text-gray-800">Sleep & Posture</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-2">
                      <p className="text-base text-gray-700 leading-relaxed">{currentTrimesterData.sleepPosture}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center gap-3 pb-2">
                      <Pill className="h-6 w-6 text-purple-600" />
                      <CardTitle className="text-xl font-bold text-gray-800">Supplements</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-2">
                      <p className="text-base text-gray-700 leading-relaxed">{currentTrimesterData.supplements}</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8 text-lg bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
                  Please select a trimester to view detailed information.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
