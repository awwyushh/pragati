"use client"

import {
  CardDescription,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
  },
  {
    title: "Education",
    href: "/education",
    icon: GraduationCap,
    description: "Explore learning modules and quizzes.",
  },
  {
    title: "Agriculture",
    href: "/agriculture",
    icon: Leaf,
    description: "Get farming guides and weather alerts.",
  },
  {
    title: "News",
    href: "/news",
    icon: Newspaper,
    description: "Stay updated with local and national news.",
  },
]

export default function DashboardPage() {
  return (
    <>
      <SOSButton />
      <ProtectedPageHeader title="Dashboard" />
      <NoticeMarquee />
      <div className="flex flex-1 flex-col gap-6 p-6 md:gap-10 md:p-8 max-w-5xl mx-auto">
        <div className="grid gap-6">
          {/* Welcome Card */}
          <Card className="col-span-full p-6 md:p-8">
            <CardHeader>
              <CardTitle className="text-4xl font-extrabold mb-2">Welcome!</CardTitle>
              <p className="text-sm text-muted-foreground">
                This is your personalized dashboard. Navigate using the sidebar or the quick access cards below.
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Remember to check the notice board for important announcements.
              </p>
            </CardContent>
          </Card>

          {/* Quick Access Cards */}
          <Card className="col-span-full p-6 md:p-8">
            <CardHeader>
              <CardTitle className="text-3xl mb-1">Quick Access</CardTitle>
              <CardDescription className="mb-6">
                Navigate directly to key sections of the application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {dashboardNavItems.map((item) => (
                  <Link key={item.title} href={item.href} className="block">
                    <Card className="h-full min-h-[200px] flex flex-col items-center p-8 hover:border-primary hover:shadow-xl transition-all duration-200 cursor-pointer rounded-lg text-center">
                      <CardTitle className="text-2xl font-bold mb-4">{item.title}</CardTitle>
                      {item.icon && (
                        <item.icon className="h-14 w-14 text-primary mb-6" />
                      )}
                      <CardDescription className="text-base text-muted-foreground">
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
    </>
  )
}
