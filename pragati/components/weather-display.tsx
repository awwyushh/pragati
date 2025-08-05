"use client"

import { useState, useEffect } from "react"
import { Cloud, Sun, CloudRain, Wind, Droplets } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  location: string
  uvIndex: number
  visibility: number
}

const defaultWeatherData: WeatherData = {
  temperature: 25,
  condition: "Sunny",
  humidity: 60,
  windSpeed: 10,
  location: "Current Location",
  uvIndex: 6,
  visibility: 10,
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return <Sun className="h-16 w-16 text-yellow-500" />
    case "cloudy":
    case "partly cloudy":
      return <Cloud className="h-16 w-16 text-gray-500" />
    case "rainy":
      return <CloudRain className="h-16 w-16 text-blue-500" />
    default:
      return <Sun className="h-16 w-16 text-yellow-500" />
  }
}

const getWeatherGradient = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return "from-yellow-400 to-orange-500"
    case "cloudy":
    case "partly cloudy":
      return "from-gray-400 to-blue-500"
    case "rainy":
      return "from-blue-400 to-indigo-600"
    default:
      return "from-yellow-400 to-orange-500"
  }
}

const LiveWeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData>(defaultWeatherData)
  const [loading, setLoading] = useState(true)

  // Simulate fetching weather data (replace with actual API call)
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true)
      // Simulate API response delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate updated weather data
      const updatedWeather: WeatherData = {
        temperature: 28,
        condition: "Partly Cloudy",
        humidity: 65,
        windSpeed: 12,
        location: "New Delhi, India",
        uvIndex: 7,
        visibility: 8,
      }
      setWeather(updatedWeather)
      setLoading(false)
    }

    fetchWeatherData()

    // Update weather every 10 minutes (adjust as needed)
    const intervalId = setInterval(fetchWeatherData, 600000)

    return () => clearInterval(intervalId) // Cleanup on unmount
  }, [])

  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>
          <p className="text-center text-gray-600 mt-4 text-lg">Loading weather data...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
      {/* Gradient background overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getWeatherGradient(weather.condition)} opacity-5`}></div>

      <CardHeader className="text-center pb-4 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Live Weather
          </CardTitle>
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1 text-sm">Live</Badge>
        </div>
        <p className="text-lg text-gray-600 font-medium">{weather.location}</p>
      </CardHeader>

      <CardContent className="p-8 relative z-10">
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            {getWeatherIcon(weather.condition)}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${getWeatherGradient(weather.condition)} opacity-20 rounded-full blur-xl`}
            ></div>
          </div>
          <div className="ml-8 text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
              {weather.temperature}°C
            </div>
            <div className="text-xl text-gray-700 font-semibold">{weather.condition}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            <Droplets className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600 font-medium">Humidity</p>
              <p className="text-xl font-bold text-blue-600">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <Wind className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600 font-medium">Wind Speed</p>
              <p className="text-xl font-bold text-green-600">{weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center justify-center p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
            <Sun className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600 font-medium">UV Index</p>
              <p className="text-xl font-bold text-orange-500">{weather.uvIndex}</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
            <Cloud className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600 font-medium">Visibility</p>
              <p className="text-xl font-bold text-purple-600">{weather.visibility} km</p>
            </div>
          </div>
        </div>

        <div className="text-center p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default LiveWeatherCard
