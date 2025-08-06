"use client"

import { CardDescription, Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SOSButton } from "@/components/sos-button"
import { NoticeMarquee } from "@/components/notice-marquee"
import Link from "next/link"
import { Newspaper, HeartPulse, Leaf, GraduationCap } from "lucide-react"
import { ProtectedPageHeader } from "@/components/protected-page-header"

const dashboardNavItems = [
  {
    title: "Health",
    href: "/health",
    icon: HeartPulse,
    description: "Access health tips and clinic info.",
    gradient: "from-red-500 to-pink-500",
  },
  {
    title: "Education",
    href: "/education",
    icon: GraduationCap,
    description: "Explore learning modules and quizzes.",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    title: "Agriculture",
    href: "/agriculture",
    icon: Leaf,
    description: "Get farming guides and weather alerts.",
    gradient: "from-green-500 to-teal-500",
  },
  {
    title: "News",
    href: "/news",
    icon: Newspaper,
    description: "Stay updated with local and national news.",
    gradient: "from-orange-500 to-red-500",
  },
]

export default function DashboardPage() {
  return (
    <>
      <SOSButton />
      <ProtectedPageHeader title="Dashboard" />
      <NoticeMarquee />
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="relative z-10 flex flex-col gap-4 p-4 md:gap-6 md:p-6 max-w-5xl mx-auto">
          <div className="grid gap-4">
            {/* Welcome Card */}
            <Card className="col-span-full p-4 md:p-6 border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-3xl font-extrabold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome!
                </CardTitle>
                <p className="text-sm text-gray-700">
                  This is your personalized dashboard. Navigate using the sidebar or the quick access cards below.
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Remember to check the notice board for important announcements.
                </p>
              </CardContent>
            </Card>

            {/* Quick Access Cards */}
            <Card className="col-span-full p-4 md:p-6 border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl mb-1 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Quick Access
                </CardTitle>
                <CardDescription className="mb-4 text-sm text-gray-700">
                  Navigate directly to key sections of the application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dashboardNavItems.map((item) => (
                    <Link key={item.title} href={item.href} className="block group">
                      <Card className="flex flex-col items-center p-6 border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer rounded-lg text-center relative overflow-hidden">
                        {/* Gradient overlay on hover */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        ></div>

                        <CardTitle className="text-xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent relative z-10">
                          {item.title}
                        </CardTitle>
                        {item.icon && (
                          <div
                            className={`mb-4 rounded-full p-3 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 relative z-10 bg-gradient-to-r ${item.gradient}`}
                          >
                            <item.icon className="h-12 w-12" />
                          </div>
                        )}
                        <CardDescription className="text-sm text-gray-700 relative z-10">
                          {item.description}
                        </CardDescription>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}