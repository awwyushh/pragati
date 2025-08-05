import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProtectedPageHeader } from "@/components/protected-page-header"

const healthSchemes = [
  {
    name: "Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana)",
    description:
      "World’s largest health assurance scheme offering ₹5 lakh coverage per family per year for secondary and tertiary care hospitalization.",
  },
  {
    name: "Rashtriya Swasthya Bima Yojana (RSBY)",
    description:
      "Health insurance for BPL families covering hospitalization expenses up to a fixed limit.",
  },
  {
    name: "National Health Mission (NHM)",
    description:
      "Ensures accessible, affordable, and quality healthcare with services like maternal and child health, and immunisation.",
  },
  {
    name: "Central Government Health Scheme (CGHS)",
    description:
      "Comprehensive healthcare for central government employees, pensioners, and dependents.",
  },
  {
    name: "Pradhan Mantri National Dialysis Programme (PMNDP)",
    description:
      "Free dialysis services at public health facilities for patients in need.",
  },
  {
    name: "NPCDCS – Cancer, Diabetes, CVD & Stroke",
    description:
      "Focuses on preventing and controlling major non-communicable diseases.",
  },
]

export default function HealthSchemesPage() {
  return (
    <>
      <ProtectedPageHeader title="Health Schemes" backHref="/health" />
      <div className="flex flex-1 flex-col gap-6 p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-1">Government Schemes for Health</CardTitle>
            <CardDescription className="text-base">
              Explore various government initiatives and health programs available to citizens.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {healthSchemes.map((scheme, index) => (
              <Link
                key={index}
                href="#"
                className="block border rounded-md p-6 bg-background/50 hover:border-primary hover:bg-primary/10 transition-colors duration-200 group"
              >
                <h3 className="font-semibold text-lg mb-2 group-hover:underline">
                  {scheme.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {scheme.description}
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
