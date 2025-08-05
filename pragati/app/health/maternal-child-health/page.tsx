"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { ProtectedPageHeader } from "@/components/protected-page-header"

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
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Care for Mothers and Children</CardTitle>
            <CardDescription>Guidance for prenatal care, child development, and common health issues.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="mb-4">
              <Select onValueChange={setSelectedTrimester} value={selectedTrimester || ""}>
                <SelectTrigger className="w-full md:w-[250px] bg-white text-foreground border-border">
                  <SelectValue placeholder="Select Trimester" />
                </SelectTrigger>
                <SelectContent className="bg-white text-foreground border-border">
                  {trimesterData.map((data) => (
                    <SelectItem key={data.trimester} value={data.trimester}>
                      {data.trimester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {currentTrimesterData ? (
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Diet: What to Eat & Avoid</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <div>
                      <h3 className="font-semibold text-lg text-green-600">Eat:</h3>
                      <p className="text-sm text-muted-foreground">{currentTrimesterData.eat}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-destructive">Avoid:</h3>
                      <p className="text-sm text-muted-foreground">{currentTrimesterData.avoid}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Danger Signs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{currentTrimesterData.dangerSigns}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sleep & Posture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{currentTrimesterData.sleepPosture}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Supplements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{currentTrimesterData.supplements}</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Please select a trimester to view detailed information.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
