import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Megaphone, HeartPulse, Leaf, GraduationCap, Newspaper } from "lucide-react"

const features = [
  {
    icon: HeartPulse,
    title: "Health & Wellness",
    description: "Access first-aid guides, maternal care tips, and vaccination alerts.",
    link: "/health",
  },
  {
    icon: Leaf,
    title: "Agriculture Insights",
    description: "Get crop guidance, weather forecasts, and AI crop scanning tools.",
    link: "/agriculture",
  },
  {
    icon: GraduationCap,
    title: "Education & Learning",
    description: "Explore courses, quizzes, and government education schemes.",
    link: "/education",
  },
  {
    icon: Newspaper,
    title: "Latest News",
    description: "Stay updated with local and national news and important announcements.",
    link: "/news",
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <Megaphone className="h-6 w-6 text-primary" />
            <span>PRAGATI</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 bg-gradient-to-br from-blue-50 to-blue-200 text-center flex items-center justify-center overflow-hidden">
          <div className="relative z-10 max-w-4xl px-4 space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Empowering Rural Communities with <span className="text-primary">PRAGATI</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl lg:text-2xl max-w-2xl mx-auto">
              Your all-in-one platform for health, agriculture, education, and essential government services. Bridging
              the gap with accessible information and support.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-4">
              <Button size="lg" className="px-8 py-3 text-lg font-semibold" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 text-lg font-semibold bg-transparent border-primary text-primary hover:bg-primary/10"
                asChild
              >
                <Link href="/dashboard">Explore Features</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 sm:text-4xl md:text-5xl">
              Key Features of <span className="text-primary">PRAGATI</span>
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Link key={index} href={feature.link} className="block">
                  <Card className="flex flex-col items-center p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary cursor-pointer h-full">
                    <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                      <feature.icon className="h-10 w-10" />
                    </div>
                    {/* Removed p-0 from CardHeader and CardContent to use default padding */}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">{feature.description}</CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action (Optional, can be added later) */}
        {/*
        <section className="w-full py-16 md:py-24 bg-primary text-primary-foreground text-center">
          <div className="container px-4 md:px-6 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Ready to get started?</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Join the PRAGATI community and empower your village with knowledge and resources.
            </p>
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg font-semibold" asChild>
              <Link href="/login">Sign Up Today</Link>
            </Button>
          </div>
        </section>
        */}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground bg-card">
        <div className="container px-4 md:px-6">&copy; {new Date().getFullYear()} PRAGATI. All rights reserved.</div>
      </footer>
    </div>
  )
}
