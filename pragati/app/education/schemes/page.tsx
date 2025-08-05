"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedPageHeader } from "@/components/protected-page-header"
import { GraduationCap, Handshake, BookOpen, Award, DollarSign, Lightbulb } from "lucide-react"

const educationSchemes = [
  {
    name: "Samagra Shiksha Abhiyan",
    description:
      "This is an overarching scheme for school education, encompassing all levels from pre-school to senior secondary. It aims to improve access, equity, and quality in education by integrating various existing schemes.",
    icon: GraduationCap,
    gradient: "from-blue-500 to-purple-500",
  },
  {
    name: "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    description:
      "This scheme provides scholarships to meritorious students from economically weaker sections to prevent them from dropping out at the class VIII level and to encourage them to continue their education at the secondary stage.",
    icon: Award,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    name: "National Overseas Scholarship (NOS) for SC etc. Candidates",
    description:
      "This scheme supports Scheduled Caste students in pursuing higher education (Masters and Ph.D. degrees) in notified foreign institutions.",
    icon: BookOpen,
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    name: "Central Sector Scheme of Scholarships for College and University Students",
    description:
      "This scheme offers scholarships to meritorious students pursuing higher education in colleges and universities.",
    icon: DollarSign,
    gradient: "from-green-500 to-lime-500",
  },
  {
    name: "Pradhan Mantri Uchchatar Shiksha Abhiyan (PM-USHA)",
    description:
      "This scheme focuses on enhancing the quality of higher education in state-run institutions by promoting accessibility, equity, and affordability.",
    icon: Lightbulb,
    gradient: "from-indigo-500 to-pink-500",
  },
  {
    name: "National Skill Development Mission",
    description:
      "This mission aims to increase the availability of skilled manpower for various sectors by providing vocational training and skill development programs according to DBT | Direct Benefit Transfer.",
    icon: Handshake,
    gradient: "from-red-500 to-orange-500",
  },
]

export default function EducationSchemesPage() {
  return (
    <>
      <ProtectedPageHeader title="Educational Schemes" backHref="/education" />
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-8 space-y-12">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Government Schemes for Education
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Explore various government initiatives and scholarships designed to support your educational journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 p-6">
              {educationSchemes.map((scheme, index) => (
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
