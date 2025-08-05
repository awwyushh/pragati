import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

export function AgricultureGuidelines() {
  return (
    <Card className="bg-orange-50 text-orange-900 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" /> Agricultural Guidelines
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="border-l-4 border-primary pl-3">
          <h3 className="font-semibold text-lg">Soil Health Management</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Regularly test your soil to understand its nutrient composition. Use organic fertilizers and crop rotation
            to maintain soil fertility.
          </p>
        </div>
        <div className="border-l-4 border-primary pl-3">
          <h3 className="font-semibold text-lg">Efficient Water Usage</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Implement drip irrigation or sprinklers to conserve water. Water crops during cooler parts of the day to
            minimize evaporation.
          </p>
        </div>
        <div className="border-l-4 border-primary pl-3">
          <h3 className="font-semibold text-lg">Pest and Disease Control</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor your crops regularly for signs of pests or diseases. Use integrated pest management (IPM)
            techniques, including natural predators and organic sprays.
          </p>
        </div>
        <div className="border-l-4 border-primary pl-3">
          <h3 className="font-semibold text-lg">Harvesting and Storage</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Harvest crops at the optimal time to ensure quality. Store produce in cool, dry conditions to prevent
            spoilage and extend shelf life.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
