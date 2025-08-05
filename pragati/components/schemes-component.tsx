"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Handshake } from "lucide-react"
import Link from "next/link"

export function SchemesComponent() {
  const schemes = [
    {
      name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      description:
        "Provides income support of ₹6,000 per year to small and marginal farmers, paid in three equal installments.",
      url: "https://pmkisan.gov.in/", // Placeholder URL
    },
    {
      name: "Pradhan Mantri Kisan Maan Dhan Yojana (PMKMY)",
      description:
        "A voluntary and contributory pension scheme for small and marginal farmers aged 18-40, providing a social security net for old age.",
      url: "https://maandhan.in/", // Placeholder URL
    },
    {
      name: "Agriculture Infrastructure Fund",
      description: "Supports the creation of post-harvest management infrastructure and community farming assets.",
      url: "https://agriinfra.dacnet.nic.in/", // Placeholder URL
    },
    {
      name: "National Livestock Mission - Entrepreneurship Development & Employment Generation (NLM-EDEG)",
      description: "Aims to promote entrepreneurship and employment in the livestock sector.",
      url: "https://nlm.udyamimitra.in/", // Placeholder URL
    },
    {
      name: "Dairy Entrepreneurship Development Scheme (DEDS)",
      description: "Provides financial assistance for dairy-related activities.",
      url: "https://www.nabard.org/content.aspx?id=592", // Placeholder URL
    },
    {
      name: "Interest Subvention Scheme",
      description: "Offers interest subsidies on loans to farmers.",
      url: "https://agricoop.nic.in/schemes/interest-subvention-scheme", // Placeholder URL
    },
  ]

  return (
    <Card className="bg-orange-50 text-orange-900 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Handshake className="h-6 w-6 text-primary" /> Government Schemes for Farmers
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {schemes.map((scheme, index) => (
          <Link
            key={index}
            href={scheme.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-l-4 border-primary pl-3 py-2 hover:bg-orange-100 transition-colors cursor-pointer group"
            title={`Click to visit ${scheme.name} website`}
          >
            <h3 className="font-semibold text-lg group-hover:underline">{scheme.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{scheme.description}</p>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
