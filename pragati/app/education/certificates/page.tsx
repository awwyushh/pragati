import { Download, Share2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProtectedPageHeader } from "@/components/protected-page-header"

const certificates = [
  {
    id: "cert1",
    title: "Adult Literacy Program Completion",
    issuer: "Village Education Board",
    date: "January 2023",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "cert2",
    title: "Digital Skills for Community Leaders",
    issuer: "Digital India Initiative",
    date: "March 2023",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "cert3",
    title: "Basic Health & Sanitation",
    issuer: "Local Health Department",
    date: "April 2023",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
]

export default function EducationCertificatesPage() {
  return (
    <>
      <ProtectedPageHeader title="Certificates" backHref="/education" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <Card
              key={cert.id}
              className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative w-full h-40 bg-muted">
                <img
                  src={cert.imageUrl || "/placeholder.svg"}
                  alt={cert.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{cert.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Issued by {cert.issuer} on {cert.date}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
                <Button variant="secondary" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {certificates.length === 0 && (
          <Card className="text-center py-8">
            <CardTitle>No Certificates Yet</CardTitle>
            <CardDescription className="mt-2">Complete courses and quizzes to earn certificates!</CardDescription>
          </Card>
        )}
      </div>
    </>
  )
}
