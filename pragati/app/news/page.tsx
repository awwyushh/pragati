"use client"

import type React from "react"

import { CardDescription, Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Newspaper } from "lucide-react" // Added for header icon

interface NewsArticle {
  title: string
  link: string
  description: string
  image_url?: string
  source_id?: string
  pubDate?: string
  category?: string[]
}

interface NewsApiResponse {
  status: string
  totalResults: number
  results: NewsArticle[]
}

export default function NewsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [news, setNews] = useState<NewsArticle[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const currentLang = searchParams.get("lang") || "en"
  const country = "in"
  const API_KEY = "pub_a6c17c5be9584a1e90877da4bbd0c1e9" // Ensure this is handled securely in a real app

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  const handleLanguageChange = (value: string) => {
    router.push(`/news/?${createQueryString("lang", value)}`)
  }

  useEffect(() => {
    const fetchNews = async () => {
      if (!API_KEY) {
        setError("API Key Missing: Please set the `NEWSDATA_API_KEY` environment variable to fetch news.")
        setLoading(false)
        return
      }
      setLoading(true)
      setError(null)
      setNews([])
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=${currentLang}&country=${country}`,
          { cache: "no-store" },
        )
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || `Failed to fetch news: ${response.statusText}`)
        }
        const data: NewsApiResponse = await response.json()
        if (data.status === "success" && data.results) {
          setNews(data.results)
        } else {
          throw new Error(data.status === "error" ? "API returned an error." : "No news found or API error.")
        }
      } catch (e: any) {
        console.error("Error fetching news:", e)
        setError(e.message || "An unexpected error occurred while fetching news.")
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [currentLang, API_KEY])

  // Proper Image onError handler with type
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null // Prevent infinite loop
    event.currentTarget.src = "/news-article-placeholder.png"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-12">
        <h1 className="flex items-center justify-center gap-3 text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent sm:text-5xl lg:text-6xl">
          <Newspaper className="h-10 w-10 text-orange-600" /> Indian News
        </h1>
        <p className="mt-4 text-lg text-gray-700">Stay updated with the latest headlines from India.</p>
      </header>

      {/* Language Selector */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
        <div className="flex items-center gap-4 p-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-md border border-gray-200">
          <Label htmlFor="language-select" className="text-lg font-medium text-gray-700">
            Language:
          </Label>
          <Select value={currentLang} onValueChange={handleLanguageChange}>
            <SelectTrigger
              id="language-select"
              className="w-[180px] py-5 bg-white/80 backdrop-blur-sm text-gray-800 border-orange-200 shadow-sm hover:border-orange-300 transition-colors duration-200"
            >
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 backdrop-blur-sm text-gray-800 border-orange-200 shadow-lg">
              <SelectItem value="en" className="hover:bg-orange-50">
                English
              </SelectItem>
              <SelectItem value="hi" className="hover:bg-orange-50">
                Hindi
              </SelectItem>
              <SelectItem value="mr" className="hover:bg-orange-50">
                Marathi
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Loading News...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-700">
                Fetching the latest headlines for you.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-red-500 text-base">{error}</CardDescription>
            </CardContent>
          </Card>
        </div>
      )}

      {!loading && !error && news.length === 0 && (
        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                No News Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-700">
                Could not retrieve any news articles for the selected language. Please try a different language.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      )}

      {!loading && !error && news.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {news.map((article) => {
            const formattedDate = article.pubDate
              ? new Date(article.pubDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Date N/A"
            return (
              <Card
                key={article.link}
                className="w-full overflow-hidden border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group relative"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                {article.image_url ? (
                  <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                    <Image
                      src={article.image_url || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-105"
                      onError={handleImageError}
                      priority={false}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    <Image
                      src="/news-article-placeholder.png"
                      alt="No image available"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <CardHeader className="p-6 relative z-10">
                  <CardTitle className="text-xl font-bold leading-tight text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                    <Link href={article.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-base text-gray-700 mt-2 line-clamp-3">
                    {article.description || "No description available."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex flex-wrap gap-2 text-sm text-gray-600 relative z-10">
                  {article.source_id && <span className="font-semibold">{article.source_id}</span>}
                  {article.pubDate && <span>• {formattedDate}</span>}
                  {article.category && article.category.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {article.category.map((cat) => (
                        <span
                          key={cat}
                          className="bg-orange-100 text-orange-700 rounded-full px-3 py-1 text-xs font-medium capitalize"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
