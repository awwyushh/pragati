import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ProtectedPageHeader } from "@/components/protected-page-header"

const mockNewsArticles = [
  {
    id: "1",
    headline: "Village Health Camp Successful in Early Detection",
    image: "/placeholder.svg?height=150&width=250",
    description:
      "A recent health camp organized in the village saw high participation, leading to early detection of several common ailments and providing free consultations.",
    link: "#",
  },
  {
    id: "2",
    headline: "New Government Subsidies Announced for Farmers",
    image: "/placeholder.svg?height=150&width=250",
    description:
      "The government has rolled out new agricultural subsidies aimed at boosting crop yield and supporting small-scale farmers. Details available in the Agriculture section.",
    link: "#",
  },
  {
    id: "3",
    headline: "Basic Literacy Program Launched for Adults",
    image: "/placeholder.svg?height=150&width=250",
    description:
      "An initiative to improve adult literacy has begun, offering free classes and learning materials to community members. Enroll now in the Education module.",
    link: "#",
  },
  {
    id: "4",
    headline: "Local Infrastructure Project Nears Completion",
    image: "/placeholder.svg?height=150&width=250",
    description:
      "The construction of the new village road is almost complete, promising better connectivity and easier access to markets for local produce.",
    link: "#",
  },
  {
    id: "5",
    headline: "Weather Advisory: Prepare for Monsoon Rains",
    image: "/placeholder.svg?height=150&width=250",
    description:
      "The meteorological department has issued an advisory for heavy monsoon rains in the coming week. Farmers are advised to take necessary precautions.",
    link: "#",
  },
  {
    id: "6",
    headline: "Community Cleanliness Drive Gains Momentum",
    image: "/placeholder.svg?height=150&width=250",
    description:
      "Residents actively participated in the weekly cleanliness drive, contributing to a healthier and more hygienic environment for everyone.",
    link: "#",
  },
]

export default function NewsPage() {
  return (
    <>
      <ProtectedPageHeader title="News" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Latest News & Updates</CardTitle>
            <CardDescription>
              Stay informed with the most recent happenings in your community and beyond.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockNewsArticles.map((article) => (
              <Link key={article.id} href={article.link} className="block">
                <Card className="flex flex-col overflow-hidden h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                  <div className="relative w-full h-40 bg-muted">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.headline}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">{article.headline}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                      {article.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
