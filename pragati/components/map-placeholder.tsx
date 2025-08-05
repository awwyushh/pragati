import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import Image from "next/image"

interface MapPlaceholderProps {
  title: string
  description: string
  mapQuery: string // Used for placeholder image query
}

export function MapPlaceholder({ title, description, mapQuery }: MapPlaceholderProps) {
  return (
    <Card className="w-full bg-blue-50 text-blue-900 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" /> {title}
        </CardTitle>
        <CardDescription className="text-blue-800">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-48 rounded-md overflow-hidden border border-border bg-muted">
          <Image
            src={`/placeholder.svg?height=200&width=400&query=${encodeURIComponent(mapQuery)}`}
            alt={`Map of ${title}`}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center p-4">
            <p className="text-lg font-semibold">Map integration coming soon!</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
