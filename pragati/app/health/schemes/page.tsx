"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedPageHeader } from "@/components/protected-page-header"
import { ShieldCheck, HeartPulse, Syringe, Hospital, BabyIcon as Kidney, Brain } from "lucide-react"

const healthSchemes = [
  {
    name: "Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana)",
    description:
      "World’s largest health assurance scheme offering ₹5 lakh coverage per family per year for secondary and tertiary care hospitalization.",
    icon: ShieldCheck,
    gradient: "from-blue-600 to-purple-600",
  },
  {
    name: "Rashtriya Swasthya Bima Yojana (RSBY)",
    description: "Health insurance for BPL families covering hospitalization expenses up to a fixed limit.",
    icon: HeartPulse,
    gradient: "from-green-500 to-teal-500",
  },
  {
    name: "National Health Mission (NHM)",
    description:
      "Ensures accessible, affordable, and quality healthcare with services like maternal and child health, and immunisation.",
    icon: Syringe,
    gradient: "from-pink-500 to-red-500",
  },
  {
    name: "Central Government Health Scheme (CGHS)",
    description: "Comprehensive healthcare for central government employees, pensioners, and dependents.",
    icon: Hospital,
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    name: "Pradhan Mantri National Dialysis Programme (PMNDP)",
    description: "Free dialysis services at public health facilities for patients in need.",
    icon: Kidney,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    name: "NPCDCS – Cancer, Diabetes, CVD & Stroke",
    description: "Focuses on preventing and controlling major non-communicable diseases.",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500",
  },
]

export default function HealthSchemesPage() {
  return (
    <>
      <ProtectedPageHeader title="Health Schemes" backHref="/health" />
      <div className="relative min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-8 space-y-12">
          <Card className="w-full max-w-4xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
                Government Schemes for Health
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Explore various government initiatives and health programs available to citizens.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 p-6">
              {healthSchemes.map((scheme, index) => (
                <Link key={index} href="#" className="block group">
                  <div
                    className={`relative p-6 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden`}
                  >
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${scheme.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    <div className="flex items-start gap-4 relative z-10">
                      {scheme.icon && (
                        <div
                          className={`p-3 rounded-full bg-gradient-to-r ${scheme.gradient} text-white shadow-md group-hover:shadow-lg transition-all duration-300`}
                        >
                          <scheme.icon className="h-6 w-6" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-800 group-hover:text-gray-900 transition-colors duration-200 mb-2">
                          {scheme.name}
                        </h3>
                        <p className="text-base text-gray-700 leading-relaxed">{scheme.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
