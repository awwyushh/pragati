import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedPageHeader } from "@/components/protected-page-header"
import { HeartPulse, LigatureIcon as Bandage, Flame, Bone, Brain, Droplets } from "lucide-react"

export default function FirstAidGuidesPage() {
  const firstAidGuides = [
    {
      title: "Cuts and Scrapes",
      description: "Clean the wound with soap and water, apply antiseptic, and cover with a sterile bandage.",
      icon: Bandage,
      gradient: "from-red-500 to-orange-500",
    },
    {
      title: "Burns (Minor)",
      description: "Cool the burn with cold (not ice) water for 10-15 minutes. Do not apply butter or oil.",
      icon: Flame,
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      title: "Sprains and Strains",
      description: "Apply R.I.C.E. (Rest, Ice, Compression, Elevation) to reduce swelling and pain.",
      icon: Bone,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Choking",
      description: "Perform abdominal thrusts (Heimlich maneuver) if the person is conscious and choking severely.",
      icon: Brain,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Bleeding (Severe)",
      description: "Apply direct pressure to the wound with a clean cloth. Elevate the injured part if possible.",
      icon: Droplets,
      gradient: "from-red-600 to-purple-600",
    },
    {
      title: "Fainting",
      description: "Lay the person down, elevate their legs, and loosen tight clothing. Ensure fresh air.",
      icon: HeartPulse,
      gradient: "from-green-500 to-teal-500",
    },
  ]

  return (
    <>
      <ProtectedPageHeader title="First-Aid Guides" backHref="/health" />
      <div className="relative min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-8 space-y-12">
          <Card className="w-full max-w-3xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
                Basic First-Aid
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Essential steps for common injuries and emergencies. Learn how to respond effectively.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 p-6">
              {firstAidGuides.map((guide, index) => (
                <div
                  key={index}
                  className={`relative p-6 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group`}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${guide.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className="flex items-start gap-4 relative z-10">
                    {guide.icon && (
                      <div
                        className={`p-3 rounded-full bg-gradient-to-r ${guide.gradient} text-white shadow-md group-hover:shadow-lg transition-all duration-300`}
                      >
                        <guide.icon className="h-6 w-6" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-800 group-hover:text-gray-900 transition-colors duration-200 mb-2">
                        {guide.title}
                      </h3>
                      <p className="text-base text-gray-700 leading-relaxed">{guide.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
