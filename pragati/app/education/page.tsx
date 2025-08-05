"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  BookOpen,
  Lightbulb,
  Trophy,
  HelpCircle,
  Handshake,
} from "lucide-react"
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
      <div className="relative min-h-screen">
        {/* Background image with slight transparency */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('/your-background.jpg')", // Replace with your image path
          }}
        />

        {/* Foreground content */}
        <div className="relative z-10 flex flex-col items-center gap-4 p-4 md:gap-6 md:p-6">
          {educationNavItems.map((item) => (
            <Link key={item.title} href={item.href} className="block w-full max-w-3xl">
              <Card className="hover:border-primary w- hover:shadow-md transition-all duration-200 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
                  {item.icon && <item.icon className="h-6 w-6 text-primary" />}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
