"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

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

  const API_KEY = "pub_2796b7cf898c4b24a7754e2318e85945"

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
          // Fixed: removed access to data.results[0].message because NewsArticle has no 'message' property
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
    event.currentTarget.src = "/placeholder.svg?height=192&width=384"
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 sm:text-4xl lg:text-5xl">
          Indian News
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Stay updated with the latest headlines from India.
        </p>
      </header>

      {/* Language Selector */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
        <div className="flex items-center gap-2">
          <Label htmlFor="language-select" className="text-gray-700 dark:text-gray-300">
            Language:
          </Label>
          <Select value={currentLang} onValueChange={handleLanguageChange}>
            <SelectTrigger id="language-select" className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">Hindi</SelectItem>
              <SelectItem value="mr">Marathi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Loading News...</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Fetching the latest headlines for you.</CardDescription>
            </CardContent>
          </Card>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center border-red-500">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-red-500">{error}</CardDescription>
            </CardContent>
          </Card>
        </div>
      )}

      {!loading && !error && news.length === 0 && (
        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle className="text-xl font-bold">No News Available</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Could not retrieve any news articles for the selected language. Please try a different language.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      )}

      {!loading && !error && news.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {article.image_url ? (
                  <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                    <Image
                      src={article.image_url}
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
                      src="/placeholder.svg?height=192&width=384"
                      alt="No image available"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}

                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-bold leading-tight">
                    <Link href={article.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">
                    {article.description || "No description available."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                  {article.source_id && <span className="font-medium">{article.source_id}</span>}
                  {article.pubDate && <span>• {formattedDate}</span>}
                  {article.category && article.category.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {article.category.map((cat) => (
                        <span
                          key={cat}
                          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded px-2 py-0.5 text-xs capitalize"
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
