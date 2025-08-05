"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Megaphone, HeartPulse, Leaf, GraduationCap, Newspaper } from "lucide-react"

const features = [
  {
    icon: HeartPulse,
    title: "Health & Wellness",
    description: "Access first-aid guides, maternal care tips, and vaccination alerts.",
    link: "/health",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: Leaf,
    title: "Agriculture Insights",
    description: "Get crop guidance, weather forecasts, and AI crop scanning tools.",
    link: "/agriculture",
    gradient: "from-green-500 to-teal-500",
  },
  {
    icon: GraduationCap,
    title: "Education & Learning",
    description: "Explore courses, quizzes, and government education schemes.",
    link: "/education",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    icon: Newspaper,
    title: "Latest News",
    description: "Stay updated with local and national news and important announcements.",
    link: "/news",
    gradient: "from-orange-500 to-red-500",
  },
]

export default function LandingPage() {
  useEffect(() => {
    const fetchGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            localStorage.setItem("userLocation", JSON.stringify({ latitude, longitude }))
          },
          (error) => {
            console.error("Error fetching geolocation:", error)
          },
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
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="w-full flex justify-center px-4 md:px-6">
          <div className="flex w-full max-w-screen-lg h-20 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent"
            >
              <Megaphone className="h-8 w-8 text-blue-600" />
              <span>PRAGATI</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
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
          {/* Dark overlay with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 z-0" />
          {/* Foreground Content */}
          <div className="relative z-10 max-w-4xl px-4 text-center space-y-8">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-tight text-white drop-shadow-lg">
              Empowering Rural Communities with{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                PRAGATI
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto font-medium text-white/90 drop-shadow-md">
              Your all-in-one platform for health, agriculture, education, and essential government services.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-6">
              <Button
                size="lg"
                className="px-10 py-4 text-xl font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/login">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-10 py-4 text-xl font-semibold border-white text-white hover:bg-white/20 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
                asChild
              >
                <Link href="/dashboard">Explore Features</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-tight text-center mb-16 sm:text-5xl md:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Key Features of <span className="text-primary">PRAGATI</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Link key={index} href={feature.link} className="block h-full group">
                  <Card className="h-full flex flex-col items-center text-center p-8 shadow-xl transition-all duration-300 hover:shadow-2xl border-0 bg-white/90 backdrop-blur-sm cursor-pointer relative overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    <div
                      className={`mb-6 rounded-full p-4 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 relative z-10 bg-gradient-to-r ${feature.gradient}`}
                    >
                      <feature.icon className="h-12 w-12" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-200 relative z-10 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed relative z-10">{feature.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-base text-gray-600 bg-white/90 backdrop-blur-sm shadow-inner">
        <div className="container px-4 md:px-6">&copy; {new Date().getFullYear()} PRAGATI. All rights reserved.</div>
      </footer>
    </div>
  )
}
