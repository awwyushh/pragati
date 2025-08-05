import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Phone, MapPin } from "lucide-react"
  import { ProtectedPageHeader } from "@/components/protected-page-header"
  
  export default function LocalClinicDirectoryPage() {
    const clinics = [
      {
        name: "Village Health Center",
        address: "Main Road, Village A",
        phone: "123-456-7890",
      },
      {
        name: "District Hospital",
        address: "Near Bus Stand, District Town",
        phone: "098-765-4321",
      },
      {
        name: "Community Clinic B",
        address: "Sector 3, Village B",
        phone: "111-222-3333",
      },
    ]
  
    return (
      <>
        <ProtectedPageHeader title="Local Clinic Directory" backHref="/health" />
        <div className="flex flex-1 flex-col gap-6 p-6 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-1">Find Healthcare Facilities</CardTitle>
              <CardDescription className="text-base">
                A list of clinics and hospitals in your area.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {clinics.map((clinic, index) => (
                <div
                  key={index}
                  className="border rounded-md p-6 bg-background/50 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <h3 className="font-semibold text-lg mb-2">{clinic.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{clinic.address}</span>
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-4">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{clinic.phone}</span>
                  </p>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto text-sm font-medium"
                  >
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
  