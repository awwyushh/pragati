"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Megaphone,
  HeartPulse,
  Leaf,
  GraduationCap,
  Newspaper,
} from "lucide-react"

const features = [
  {
    icon: HeartPulse,
    title: "Health & Wellness",
    description:
      "Access first-aid guides, maternal care tips, and vaccination alerts.",
    link: "/health",
  },
  {
    icon: Leaf,
    title: "Agriculture Insights",
    description:
      "Get crop guidance, weather forecasts, and AI crop scanning tools.",
    link: "/agriculture",
  },
  {
    icon: GraduationCap,
    title: "Education & Learning",
    description:
      "Explore courses, quizzes, and government education schemes.",
    link: "/education",
  },
  {
    icon: Newspaper,
    title: "Latest News",
    description:
      "Stay updated with local and national news and important announcements.",
    link: "/news",
  },
]

export default function LandingPage() {
  useEffect(() => {
    const fetchGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            localStorage.setItem(
              "userLocation",
              JSON.stringify({ latitude, longitude })
            )
          },
          (error) => {
            console.error("Error fetching geolocation:", error)
          }
        )
      } else {
        console.error("Geolocation is not supported by this browser.")
      }
    }

    if (!localStorage.getItem("userLocation")) {
      fetchGeolocation()
    }
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex justify-center px-4 md:px-6">
          <div className="flex w-full max-w-screen-lg h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <Megaphone className="h-6 text-primary" />
              <span>PRAGATI</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Image + Overlay */}
        <section className="relative w-full min-h-[80vh] py-20 md:py-32 flex items-center justify-center overflow-hidden text-white">
          {/* Background Image */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/landing.jpeg')" }}
            aria-hidden="true"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-50 z-0" />

          {/* Foreground Content */}
          <div className="relative z-10 max-w-4xl px-4 text-center space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Empowering Rural Communities with{" "}
              <span className="text-primary font-extrabold">PRAGATI</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto font-medium text-white">
              Your all-in-one platform for health, agriculture, education, and essential government services.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-4">
              <Button size="lg" className="px-8 py-3 text-lg font-semibold" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 text-lg font-semibold border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/dashboard">Explore Features</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 sm:text-4xl md:text-5xl">
              Key Features of <span className="text-primary">PRAGATI</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Link key={index} href={feature.link} className="block h-full">
                  <Card className="h-full flex flex-col items-center text-center p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary cursor-pointer">
                    <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                      <feature.icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground bg-card">
        <div className="container px-4 md:px-6">
          &copy; {new Date().getFullYear()} PRAGATI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
