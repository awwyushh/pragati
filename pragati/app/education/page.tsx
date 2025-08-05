"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Lightbulb, Trophy, HelpCircle, Handshake } from "lucide-react"
import { ProtectedPageHeader } from "@/components/protected-page-header"

const educationNavItems = [
  {
    title: "Courses",
    href: "/education/courses",
    icon: BookOpen,
    description: "Explore various learning modules and quizzes.",
  },
  {
    title: "Certificates",
    href: "/education/certificates",
    icon: Trophy,
    description: "View your earned certificates.",
  },
  {
    title: "Contests",
    href: "/education/contests",
    icon: HelpCircle,
    description: "Participate in educational challenges.",
  },
  {
    title: "Ask AI",
    href: "/education/ask-ai",
    icon: Lightbulb,
    description: "Get instant answers from AI assistant.",
  },
  {
    title: "Schemes",
    href: "/education/schemes",
    icon: Handshake,
    description: "Discover government education schemes.",
  },
]

export default function EducationPage() {
  return (
    <>
      <ProtectedPageHeader title="Education" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {educationNavItems.map((item) => (
            <Link key={item.title} href={item.href} className="block">
              <Card className="h-full flex flex-col justify-between hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
                  {item.icon && <item.icon className="h-6 w-6 text-primary" />}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">{item.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
