"use client"

import React, { useState, useEffect } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Reminder {
  id: number
  name: string
  date: string
}

export default function VaccinationReminder() {
  const [vaccineName, setVaccineName] = useState("")
  const [vaccineDate, setVaccineDate] = useState("")
  const [reminders, setReminders] = useState<Reminder[]>([])

  useEffect(() => {
    const storedReminders = localStorage.getItem("vaccinationReminders")
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("vaccinationReminders", JSON.stringify(reminders))

    const today = new Date().toISOString().split("T")[0]
    reminders.forEach((reminder) => {
      if (reminder.date === today) {
        toast(`Today is the day for ${reminder.name} vaccination.`, {
          description: "Vaccination Reminder!",
          duration: 10000,
          action: {
            label: "Dismiss",
            onClick: () => removeReminder(reminder.id),
          },
        })
      }
    })
  }, [reminders])

  const addReminder = () => {
    if (vaccineName && vaccineDate) {
      const newReminder = {
        id: Date.now(),
        name: vaccineName,
        date: vaccineDate,
      }

      const updatedReminders = [...reminders, newReminder]
      setReminders(updatedReminders)

      toast.success(`Reminder for ${vaccineName} on ${vaccineDate} has been set.`, {
        description: "Reminder Added!",
      })

      setVaccineName("")
      setVaccineDate("")
    } else {
      toast.error("Please enter both vaccine name and date.", {
        description: "Input Error",
      })
    }
  }

  const removeReminder = (id: number) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id)
    setReminders(updatedReminders)

    toast.info("The vaccination reminder has been deleted.", {
      description: "Reminder Removed",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vaccination Reminders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Vaccine Name</Label>
          <Input
            placeholder="e.g. Hepatitis B"
            value={vaccineName}
            onChange={(e) => setVaccineName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Vaccination Date</Label>
          <Input type="date" value={vaccineDate} onChange={(e) => setVaccineDate(e.target.value)} />
        </div>
        <Button onClick={addReminder}>Set Reminder</Button>

        {reminders.length > 0 && (
          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-2">Upcoming Reminders</h3>
            {reminders.map((reminder) => (
              <div key={reminder.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <p className="font-medium">{reminder.name}</p>
                  <p className="text-sm text-muted-foreground">{reminder.date}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => removeReminder(reminder.id)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
