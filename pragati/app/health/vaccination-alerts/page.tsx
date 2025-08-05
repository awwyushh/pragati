"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPlaceholder } from "@/components/map-placeholder"
import { ProtectedPageHeader } from "@/components/protected-page-header"
import { Syringe, BellRing, CalendarDays, MapPin, XCircle } from "lucide-react"

interface Reminder {
  id: number
  name: string
  date: string
}

export default function VaccinationReminder() {
  const [vaccineName, setVaccineName] = useState("")
  const [vaccineDate, setVaccineDate] = useState("")
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null) // Added location state

  useEffect(() => {
    const storedReminders = localStorage.getItem("vaccinationReminders")
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders))
    }
    const storedLocation = localStorage.getItem("userLocation") // Retrieve location
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation))
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
    <>
      <ProtectedPageHeader title="Vaccination Alerts" backHref="/health" />
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-8 space-y-12">
          {/* Location Display */}
          <div className="flex justify-center text-center">
            <Card className="w-full max-w-md border-0 shadow-lg bg-white/90 backdrop-blur-sm p-4">
              <CardContent className="flex items-center justify-center gap-3 text-lg text-gray-700 font-medium">
                <MapPin className="h-6 w-6 text-blue-600" />
                {location ? (
                  <p>
                    <span className="font-semibold">Your Location:</span> Latitude – {location.latitude}, Longitude –{" "}
                    {location.longitude}
                  </p>
                ) : (
                  <p className="italic">Location data not available.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nearest Vaccination Centers</h2>
            <div className="flex justify-center">
              <MapPlaceholder
                title="Nearest Vaccination Centers"
                description="Locate nearby vaccination centers and clinics."
                mapQuery="map of vaccination centers in rural india"
                className="w-full max-w-4xl h-96 rounded-lg shadow-xl border-0 bg-white/90 backdrop-blur-sm"
              />
            </div>
          </section>

          {/* Vaccination Reminders Card */}
          <Card className="w-full max-w-3xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                <Syringe className="h-8 w-8 text-blue-600" /> Vaccination Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="vaccine-name" className="text-lg font-medium text-gray-700">
                    Vaccine Name
                  </Label>
                  <Input
                    id="vaccine-name"
                    placeholder="e.g. Hepatitis B, Polio"
                    value={vaccineName}
                    onChange={(e) => setVaccineName(e.target.value)}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-lg text-black p-3"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="vaccine-date" className="text-lg font-medium text-gray-700">
                    Vaccination Date
                  </Label>
                  <Input
                    id="vaccine-date"
                    type="date"
                    value={vaccineDate}
                    onChange={(e) => setVaccineDate(e.target.value)}
                    className="border-green-200 focus:border-green-500 focus:ring-green-500 text-lg text-black p-3"
                  />
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={addReminder}
                >
                  <BellRing className="h-5 w-5 mr-3" /> Set Reminder
                </Button>
              </div>

              {reminders.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <CalendarDays className="h-6 w-6 text-purple-600" /> Upcoming Reminders
                  </h3>
                  <div className="grid gap-4">
                    {reminders.map((reminder) => (
                      <div
                        key={reminder.id}
                        className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-sm"
                      >
                        <div>
                          <p className="font-semibold text-lg text-gray-800">{reminder.name}</p>
                          <p className="text-base text-gray-600">{reminder.date}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeReminder(reminder.id)}
                          className="text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                          title="Remove Reminder"
                        >
                          <XCircle className="h-6 w-6" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
