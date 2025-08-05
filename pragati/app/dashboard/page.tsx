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
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle className="text-4xl font-extrabold">Welcome!</CardTitle>
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
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle className="text-3xl">Quick Access</CardTitle>
              <CardDescription>Navigate directly to key sections of the application.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dashboardNavItems.map((item) => (
                <Link key={item.title} href={item.href} className="block">
                  <Card className="h-full flex flex-col justify-between hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
                      {item.icon && <item.icon className="h-6 w-6 text-primary" />}
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-muted-foreground">{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
