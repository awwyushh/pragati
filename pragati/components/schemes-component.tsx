"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Handshake, PiggyBank, Tractor, Building2, Milk, Percent } from "lucide-react"
import Link from "next/link"

export function SchemesComponent() {
  const schemes = [
    {
      name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      description:
        "Provides income support of ₹6,000 per year to small and marginal farmers, paid in three equal installments.",
      url: "https://pmkisan.gov.in/", // Placeholder URL
      icon: PiggyBank,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      name: "Pradhan Mantri Kisan Maan Dhan Yojana (PMKMY)",
      description:
        "A voluntary and contributory pension scheme for small and marginal farmers aged 18-40, providing a social security net for old age.",
      url: "https://maandhan.in/", // Placeholder URL
      icon: Handshake,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Agriculture Infrastructure Fund",
      description: "Supports the creation of post-harvest management infrastructure and community farming assets.",
      url: "https://agriinfra.dacnet.nic.in/", // Placeholder URL
      icon: Building2,
      gradient: "from-orange-500 to-red-500",
    },
    {
      name: "National Livestock Mission - Entrepreneurship Development & Employment Generation (NLM-EDEG)",
      description: "Aims to promote entrepreneurship and employment in the livestock sector.",
      url: "https://nlm.udyamimitra.in/", // Placeholder URL
      icon: Tractor,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Dairy Entrepreneurship Development Scheme (DEDS)",
      description: "Provides financial assistance for dairy-related activities.",
      url: "https://www.nabard.org/content.aspx?id=592", // Placeholder URL
      icon: Milk,
      gradient: "from-yellow-500 to-lime-500",
    },
    {
      name: "Interest Subvention Scheme",
      description: "Offers interest subsidies on loans to farmers.",
      url: "https://agricoop.nic.in/schemes/interest-subvention-scheme", // Placeholder URL
      icon: Percent,
      gradient: "from-teal-500 to-green-500",
    },
  ]

  return (
    <Card className="w-full max-w-3xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          <Handshake className="h-8 w-8 text-green-600" /> Government Schemes for Farmers
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        {schemes.map((scheme, index) => (
          <Link key={index} href={scheme.url} target="_blank" rel="noopener noreferrer" className="block group">
            <div
              className={`relative p-6 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden`}
              title={`Click to visit ${scheme.name} website`}
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
  )
}
