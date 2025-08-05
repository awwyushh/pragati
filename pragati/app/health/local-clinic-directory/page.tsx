import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MapPin } from "lucide-react"
import { ProtectedPageHeader } from "@/components/protected-page-header"

export default function LocalClinicDirectoryPage() {
  const clinics = [
    { name: "Village Health Center", address: "Main Road, Village A", phone: "123-456-7890" },
    { name: "District Hospital", address: "Near Bus Stand, District Town", phone: "098-765-4321" },
    { name: "Community Clinic B", address: "Sector 3, Village B", phone: "111-222-3333" },
  ]

  return (
    <>
      <ProtectedPageHeader title="Local Clinic Directory" backHref="/health" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Find Healthcare Facilities</CardTitle>
            <CardDescription>A list of clinics and hospitals in your area.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {clinics.map((clinic, index) => (
              <div key={index} className="border rounded-md p-4 grid gap-2">
                <h3 className="font-semibold text-lg">{clinic.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{clinic.address}</span>
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{clinic.phone}</span>
                </p>
                <Button variant="outline" className="mt-2 w-fit bg-transparent">
                  View on Map
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
