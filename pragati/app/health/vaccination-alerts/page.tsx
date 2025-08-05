"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BellRing, Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { toast } from "sonner" // ✅ Replaced useToast
import { MapPlaceholder } from "@/components/map-placeholder"
import { ProtectedPageHeader } from "@/components/protected-page-header"

interface VaccinationReminder {
  id: string
  name: string
  date: string
}

export default function VaccinationAlertsPage() {
  const [reminders, setReminders] = useState<VaccinationReminder[]>([])
  const [vaccineName, setVaccineName] = useState("")
  const [vaccineDate, setVaccineDate] = useState("")

  useEffect(() => {
    const storedReminders = localStorage.getItem("vaccinationReminders")
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("vaccinationReminders", JSON.stringify(reminders))
    checkReminders()
  }, [reminders])

  const checkReminders = () => {
    const today = new Date().toISOString().split("T")[0]
    reminders.forEach((reminder) => {
      if (reminder.date === today) {
        toast(`Today is the day for ${reminder.name} vaccination.`, {
          duration: 10000,
          action: <Button onClick={() => removeReminder(reminder.id)}>Dismiss</Button>,
        })
      }
    })
  }
  

  const addReminder = () => {
    if (vaccineName.trim() === "" || vaccineDate.trim() === "") {
      toast.error("Please enter both vaccine name and date.")
      return
    }

    const newReminder: VaccinationReminder = {
      id: Date.now().toString(),
      name: vaccineName,
      date: vaccineDate,
    }

    setReminders((prev) => [...prev, newReminder])
    setVaccineName("")
    setVaccineDate("")

    toast.success(`Reminder for ${newReminder.name} on ${newReminder.date} has been set.`)
  }

  const removeReminder = (id: string) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id))
    toast("The vaccination reminder has been deleted.")
  }

  return (
    <>
      <ProtectedPageHeader title="Vaccination Alerts" backHref="/health" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <MapPlaceholder
          title="Nearest Vaccination Centers"
          description="Find nearby centers for vaccination services."
          mapQuery="map of vaccination centers in rural india"
        />

        <Card>
          <CardHeader>
            <CardTitle>Set Vaccination Reminders</CardTitle>
            <CardDescription>Add and manage reminders for upcoming vaccinations.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="vaccine-name">Vaccine Name</Label>
              <Input
                id="vaccine-name"
                placeholder="e.g., Polio Vaccine"
                value={vaccineName}
                onChange={(e) => setVaccineName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="vaccine-date">Vaccination Date</Label>
              <Input
                id="vaccine-date"
                type="date"
                value={vaccineDate}
                onChange={(e) => setVaccineDate(e.target.value)}
              />
            </div>
            <Button onClick={addReminder} className="w-fit">
              <Plus className="h-4 w-4 mr-2" /> Add Reminder
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Reminders</CardTitle>
            <CardDescription>List of your scheduled vaccination alerts.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {reminders.length === 0 ? (
              <p className="text-muted-foreground">No vaccination reminders set yet.</p>
            ) : (
              <div className="grid gap-2">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between rounded-md border p-3 bg-secondary/20"
                  >
                    <div className="flex items-center gap-3">
                      <BellRing className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{reminder.name}</p>
                        <p className="text-sm text-muted-foreground">{reminder.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeReminder(reminder.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Remove reminder</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
