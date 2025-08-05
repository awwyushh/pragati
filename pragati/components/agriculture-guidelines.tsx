import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

export function AgricultureGuidelines() {
  return (
    <Card className="w-full max-w-3xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          <Lightbulb className="h-8 w-8 text-orange-500" /> Agricultural Guidelines
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        <div className="relative p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border border-blue-100 shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-green-500 to-blue-500 rounded-l-lg"></div>
          <h3 className="font-bold text-xl text-gray-800 mb-2 pl-4">Soil Health Management</h3>
          <p className="text-base text-gray-700 leading-relaxed pl-4">
            Regularly test your soil to understand its nutrient composition. Use organic fertilizers and crop rotation
            to maintain soil fertility and structure for optimal growth.
          </p>
        </div>
        <div className="relative p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-100 shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-lg"></div>
          <h3 className="font-bold text-xl text-gray-800 mb-2 pl-4">Efficient Water Usage</h3>
          <p className="text-base text-gray-700 leading-relaxed pl-4">
            Implement modern irrigation techniques like drip irrigation or sprinklers to conserve water. Water crops
            during cooler parts of the day to minimize evaporation and maximize absorption.
          </p>
        </div>
        <div className="relative p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-100 shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-l-lg"></div>
          <h3 className="font-bold text-xl text-gray-800 mb-2 pl-4">Pest and Disease Control</h3>
          <p className="text-base text-gray-700 leading-relaxed pl-4">
            Monitor your crops regularly for early signs of pests or diseases. Utilize integrated pest management (IPM)
            techniques, including natural predators, resistant varieties, and organic sprays.
          </p>
        </div>
        <div className="relative p-4 rounded-lg bg-gradient-to-r from-lime-50 to-emerald-50 border border-emerald-100 shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-lime-500 to-emerald-500 rounded-l-lg"></div>
          <h3 className="font-bold text-xl text-gray-800 mb-2 pl-4">Harvesting and Storage</h3>
          <p className="text-base text-gray-700 leading-relaxed pl-4">
            Harvest crops at their optimal maturity to ensure peak quality and flavor. Store produce in appropriate
            cool, dry, and well-ventilated conditions to prevent spoilage and extend shelf life.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
