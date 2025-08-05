import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedPageHeader } from "@/components/protected-page-header" // Import the new header component

const healthSchemes = [
  {
    name: "Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana)",
    description:
      "This is the world's largest publicly funded health assurance scheme, providing coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization. It aims to provide affordable healthcare to the poor and vulnerable.",
  },
  {
    name: "Rashtriya Swasthya Bima Yojana (RSBY)",
    description:
      "This scheme provides health insurance coverage to families below the poverty line, covering hospitalization expenses up to a certain limit.",
  },
  {
    name: "National Health Mission (NHM)",
    description:
      "Aims to provide accessible, affordable, and quality healthcare services to all, especially to the vulnerable populations. It includes a range of free services such as maternal health, child health, and immunisation programs.",
  },
  {
    name: "Central Government Health Scheme (CGHS)",
    description:
      "Provides comprehensive healthcare facilities to central government employees, pensioners, and their dependents.",
  },
  {
    name: "Pradhan Mantri National Dialysis Programme (PMNDP)",
    description: "Provides free dialysis services to patients in need at public health facilities.",
  },
  {
    name: "National Programme for Prevention and Control of Cancer, Diabetes, Cardiovascular Diseases & Stroke (NPCDCS)",
    description:
      "Focuses on preventing and controlling non-communicable diseases like cancer, diabetes, and cardiovascular diseases.",
  },
]

export default function HealthSchemesPage() {
  return (
    <>
      <ProtectedPageHeader title="Health Schemes" backHref="/health" />{" "}
      {/* Use the new header component with back button */}
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Government Schemes for Health</CardTitle>
            <CardDescription>Explore various government initiatives and health programs.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {healthSchemes.map((scheme, index) => (
              <Link
                key={index}
                href="#"
                className="block border rounded-md p-4 grid gap-2 hover:bg-primary/10 hover:border-primary transition-colors cursor-pointer group"
              >
                <h3 className="font-semibold text-lg group-hover:underline">{scheme.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{scheme.description}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
