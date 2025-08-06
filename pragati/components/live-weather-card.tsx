"use client"

import { useEffect, useState, useRef } from "react" // Import useRef
import Image from "next/image"
import { Loader2, AlertTriangle, Droplet, Wind, CloudRain, Sun, WifiOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import gsap from "gsap" // Import GSAP

// Define interfaces for weather data
interface CurrentWeather {
  temp_c: number
  condition: {
    text: string
    icon: string
  }
  humidity: number
  wind_kph: number
  wind_dir: string
  precip_mm: number
  uv: number // Added UV index to interface
}

interface ForecastDay {
  date: string
  day: {
    maxtemp_c: number
    mintemp_c: number
    condition: {
      text: string
      icon: string
    }
  }
}

interface WeatherData {
  location: {
    name: string
    country: string
  }
  current: CurrentWeather
  forecast: {
    forecastday: ForecastDay[]
  }
}

interface LocationData {
  lat: number
  lon: number
  city: string
  country: string
}

export default function LiveWeatherCard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<LocationData | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [isOffline, setIsOffline] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  // Refs for GSAP animations
  const cardRef = useRef(null)
  const tempSectionRef = useRef(null)
  const forecastItemsRef = useRef<HTMLDivElement[]>([]) // Ref for multiple forecast items
  const alertRef = useRef(null)

  // Replace with your actual WeatherAPI.com key
  const WEATHER_API_KEY = "37533df0fad946e3be974608250803"
  
  // Cache keys
  const CACHE_KEYS = {
    WEATHER_DATA: "pragati_weather_data",
    LOCATION: "pragati_weather_location",
    LAST_UPDATED: "pragati_weather_last_updated"
  }

  // Function to save data to local storage
  const saveToCache = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error(`Failed to save ${key} to cache:`, error)
    }
  }

  // Function to get data from local storage
  const getFromCache = <T,>(key: string): T | null => {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) as T : null
    } catch (error) {
      console.error(`Failed to get ${key} from cache:`, error)
      return null
    }
  }

  // Function to check if cached data is still valid (less than 3 hours old)
  const isCacheValid = (timestamp: string | null): boolean => {
    if (!timestamp) return false
    const lastUpdatedTime = new Date(timestamp).getTime()
    const currentTime = new Date().getTime()
    const threeHoursInMs = 3 * 60 * 60 * 1000
    return currentTime - lastUpdatedTime < threeHoursInMs
  }

  // Network status detection
  useEffect(() => {
    // Check initial network status
    setIsOffline(!navigator.onLine)

    // Set up event listeners for online/offline status
    const handleOnline = () => {
      setIsOffline(false)
      console.log("Network connection restored")
    }

    const handleOffline = () => {
      setIsOffline(true)
      console.log("Network connection lost")
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Load cached data if available
    const cachedWeatherData = getFromCache<WeatherData>(CACHE_KEYS.WEATHER_DATA)
    const cachedLocation = getFromCache<LocationData>(CACHE_KEYS.LOCATION)
    const cachedLastUpdated = getFromCache<string>(CACHE_KEYS.LAST_UPDATED)

    if (cachedWeatherData && cachedLocation && cachedLastUpdated) {
      setWeatherData(cachedWeatherData)
      setLocation(cachedLocation)
      setLastUpdated(cachedLastUpdated)
      
      // Check for alerts based on cached data
      const currentTemp = cachedWeatherData.current.temp_c
      const conditionText = cachedWeatherData.current.condition.text.toLowerCase()

      if (conditionText.includes("storm") || conditionText.includes("rain")) {
        setShowAlert(true)
        setAlertMessage("⚠️ Expecting rain or storm conditions!")
      } else if (currentTemp < 5) {
        setShowAlert(true)
        setAlertMessage("⚠️ Temperature is below 5°C. Dress warmly!")
      }
      
      // If cache is valid, don't show loading state
      if (isCacheValid(cachedLastUpdated)) {
        setLoading(false)
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      // If we're offline and have valid cached data, don't try to fetch
      const cachedLastUpdated = getFromCache<string>(CACHE_KEYS.LAST_UPDATED)
      if (isOffline) {
        if (cachedLastUpdated) {
          setLoading(false)
          if (!isCacheValid(cachedLastUpdated)) {
            setAlertMessage(`⚠️ You're offline. Showing weather data from ${new Date(cachedLastUpdated).toLocaleString()}`)
            setShowAlert(true)
          }
          return
        } else {
          setError("You're offline and no cached weather data is available.")
          setLoading(false)
          return
        }
      }

      setLoading(true)
      setError(null)
      setShowAlert(false)
      setAlertMessage("")

      let currentLat: number | null = null
      let currentLon: number | null = null
      let currentCity: string | null = null
      let currentCountry: string | null = null

      // 1. Try to get user location via browser geolocation
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 })
        })
        currentLat = position.coords.latitude
        currentLon = position.coords.longitude
        console.log("Geolocation successful:", currentLat, currentLon)
      } catch (geoError: any) {
        console.warn("Geolocation failed:", geoError.message, "Falling back to IP-based location.")
        // 2. Fallback to IP-based location if denied or unavailable
        try {
          const ipResponse = await fetch("https://ipapi.co/json/")
          if (!ipResponse.ok) {
            throw new Error(`IP API error: ${ipResponse.statusText}`)
          }
          const ipData = await ipResponse.json()
          currentLat = ipData.latitude
          currentLon = ipData.longitude
          currentCity = ipData.city
          currentCountry = ipData.country_name
          console.log("IP-based location successful:", currentCity, currentCountry)
        } catch (ipError: any) {
          console.error("Failed to get IP-based location:", ipError.message)
          
          // If we have cached location data, use that instead
          const cachedLocation = getFromCache<LocationData>(CACHE_KEYS.LOCATION)
          if (cachedLocation) {
            currentLat = cachedLocation.lat
            currentLon = cachedLocation.lon
            currentCity = cachedLocation.city
            currentCountry = cachedLocation.country
            console.log("Using cached location data:", currentCity, currentCountry)
          } else {
            setError(
              "Unable to determine your location. Please enable location services or check your internet connection.",
            )
            setLoading(false)
            return
          }
        }
      }

      if (currentLat !== null && currentLon !== null) {
        const locationData = {
          lat: currentLat,
          lon: currentLon,
          city: currentCity || "Unknown City",
          country: currentCountry || "Unknown Country",
        }
        
        setLocation(locationData)

        // Fetch weather data
        try {
          if (!WEATHER_API_KEY || WEATHER_API_KEY === "37533df0fad946e3be974608250803") {
            throw new Error("Please replace 'YOUR_WEATHERAPI_KEY' with your actual WeatherAPI.com key.")
          }
          const weatherResponse = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${currentLat},${currentLon}&days=3`,
          )
          if (!weatherResponse.ok) {
            throw new Error(`Weather API error: ${weatherResponse.statusText}`)
          }
          const data: WeatherData = await weatherResponse.json()
          setWeatherData(data)

          // Update location with more precise data from weather API
          const updatedLocation = {
            ...(locationData),
            city: data.location.name,
            country: data.location.country,
          }
          setLocation(updatedLocation)
          
          // Save to cache
          const currentTimestamp = new Date().toISOString()
          saveToCache(CACHE_KEYS.WEATHER_DATA, data)
          saveToCache(CACHE_KEYS.LOCATION, updatedLocation)
          saveToCache(CACHE_KEYS.LAST_UPDATED, currentTimestamp)
          setLastUpdated(currentTimestamp)

          // Check for alerts
          const currentTemp = data.current.temp_c
          const conditionText = data.current.condition.text.toLowerCase()

          if (conditionText.includes("storm") || conditionText.includes("rain")) {
            setShowAlert(true)
            setAlertMessage("⚠️ Expecting rain or storm conditions!")
          } else if (currentTemp < 5) {
            setShowAlert(true)
            setAlertMessage("⚠️ Temperature is below 5°C. Dress warmly!")
          }
        } catch (weatherError: any) {
          console.error("Failed to fetch weather data:", weatherError.message)
          
          // If we have cached weather data, use that instead
          const cachedWeatherData = getFromCache<WeatherData>(CACHE_KEYS.WEATHER_DATA)
          const cachedLastUpdated = getFromCache<string>(CACHE_KEYS.LAST_UPDATED)
          
          if (cachedWeatherData && cachedLastUpdated) {
            setWeatherData(cachedWeatherData)
            setLastUpdated(cachedLastUpdated)
            setAlertMessage(`⚠️ Failed to update weather data. Showing data from ${new Date(cachedLastUpdated).toLocaleString()}`)
            setShowAlert(true)
          } else {
            setError(`Failed to fetch weather data: ${weatherError.message}. Please try again later.`)
          }
        } finally {
          setLoading(false)
        }
      }
    }

    fetchLocationAndWeather()
  }, [isOffline])

  // GSAP Animations
  useEffect(() => {
    if (!loading && !error && weatherData) {
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } })

      // Animate Weather Card (Container)
      tl.fromTo(cardRef.current, { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 })

      // Animate Temperature and Icon Section
      tl.fromTo(
        tempSectionRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, delay: 0.2 }, // Delay relative to start of timeline
        "<0.2", // Start 0.2 seconds after the previous animation (card) starts
      )

      // Animate Forecast Grid Items (Staggered fade-in from bottom)
      tl.fromTo(
        forecastItemsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
        "<0.3", // Start 0.3 seconds after the previous animation (temp section) starts
      )
    }
  }, [loading, error, weatherData]) // Rerun when data is loaded

  // Animate Weather Alert Box (if shown)
  useEffect(() => {
    if (showAlert && alertRef.current) {
      gsap.fromTo(
        alertRef.current,
        { x: -5 }, // Start slightly left
        {
          x: 5, // Move right
          duration: 0.1,
          repeat: 3, // Shake 3 times (left-right-left-right-left-right)
          yoyo: true,
          ease: "power1.inOut",
          onComplete: function() { gsap.set(alertRef.current, { x: 0 }); }, // Reset position after animation
        },
      )
    }
  }, [showAlert]) // Rerun when showAlert changes

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] w-full min-w-lg mx-auto p-4 rounded-2xl shadow-lg shadow-blue-300/50 bg-white/80 backdrop-blur-md border border-white/20 text-gray-900 dark:bg-gray-800/60 dark:text-gray-100 dark:shadow-gray-950/50">
        <Loader2 className="h-10 w-10 animate-spin text-gray-900 dark:text-gray-100" />
        <span className="mt-3 text-lg font-semibold">Fetching weather...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] w-full max-w-sm mx-auto p-4 rounded-2xl shadow-lg shadow-red-300/50 bg-red-500/30 backdrop-blur-md border border-red-400/20 text-white text-center">
        <AlertTriangle className="h-10 w-10 mb-3" />
        <p className="text-lg font-bold">Error:</p>
        <p className="text-sm">{error}</p>
        <p className="mt-3 text-xs opacity-80">
          Please ensure location services are enabled and you have a valid API key.
        </p>
      </div>
    )
  }

  if (!weatherData) {
    return (
      <div className="flex items-center justify-center min-h-[300px] w-full max-w-sm mx-auto p-4 rounded-2xl shadow-lg shadow-blue-300/50 bg-white/30 backdrop-blur-md border border-white/20 text-gray-900 dark:bg-gray-800/30 dark:text-gray-100 dark:shadow-gray-950/50">
        <p className="text-lg">No weather data available.</p>
      </div>
    )
  }

  const { current, location: weatherLocation, forecast } = weatherData
  const forecastDays = forecast.forecastday.slice(0, 3) // Ensure only 3 days

  return (
    <Card
      ref={cardRef}
      className="w-full max-w-2xl mx-auto p-4 rounded-2xl shadow-sm shadow-blue-100/5 bg-yellow-200/90 backdrop-blur-md text-gray-900 font-sans dark:bg-gray-800/30 dark:text-gray-100 border border-white/20 dark:border-gray-700/20 transition-all duration-300 hover:shadow-sm hover:shadow-blue-400/60 dark:hover:shadow-gray-900/60"
    >
      <CardHeader className="pb-3">
        {showAlert && (
          <div
            ref={alertRef}
            className="bg-red-500/30 backdrop-blur-sm border border-red-400/20 p-2 rounded-lg text-center font-bold text-sm flex items-center justify-center gap-2 mb-3"
          >
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            {alertMessage}
          </div>
        )}
        {isOffline && (
          <div className="bg-yellow-500/30 backdrop-blur-sm border border-yellow-400/20 p-2 rounded-lg text-center font-bold text-sm flex items-center justify-center gap-2 mb-3">
            <WifiOff className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            You are offline. Using cached data.
          </div>
        )}
        <CardTitle className="text-xl font-bold text-center">
          {weatherLocation.name}, {weatherLocation.country}
        </CardTitle>
        {lastUpdated && (
          <p className="text-xs text-center mt-1 opacity-70">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </p>
        )}
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Current Weather */}
        <div ref={tempSectionRef} className="flex flex-col items-center justify-center text-center">
          <p className="text-6xl font-extrabold leading-none drop-shadow-md">{Math.round(current.temp_c)}°</p>
          <div className="flex items-center mt-2">
            <Image
              src={`https:${current.condition.icon}`}
              alt={current.condition.text}
              width={64}
              height={64}
              className="w-16 h-16 drop-shadow-sm"
            />
            <p className="text-xl font-semibold ml-2">{current.condition.text}</p>
          </div>
        </div>

        {/* Current Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between p-2 bg-white/15 rounded-xl shadow-inner shadow-white/5">
            <span className="font-medium flex items-center gap-1">
              <Droplet className="h-4 w-4 text-blue-400" /> Humidity:
            </span>
            <span>{current.humidity}%</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-white/15 rounded-xl shadow-inner shadow-white/5">
            <span className="font-medium flex items-center gap-1">
              <Wind className="h-4 w-4 text-gray-400" /> Wind:
            </span>
            <span>
              {current.wind_kph} km/h {current.wind_dir}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-white/15 rounded-xl shadow-inner shadow-white/5">
            <span className="font-medium flex items-center gap-1">
              <CloudRain className="h-4 w-4 text-blue-500" /> Rainfall:
            </span>
            <span>{current.precip_mm} mm</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-white/15 rounded-xl shadow-inner shadow-white/5">
            <span className="font-medium flex items-center gap-1">
              <Sun className="h-4 w-4 text-yellow-400" /> UV Index:
            </span>
            <span>{current.uv || "N/A"}</span>
          </div>
        </div>

        {/* 3-Day Forecast */}
        <div className="grid gap-2">
          <h3 className="text-lg font-bold mb-1">3-Day Forecast</h3>
          {forecastDays.map((day, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) forecastItemsRef.current[index] = el
              }} // Assign ref to each item
              className="flex items-center justify-between p-3 bg-white/15 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:bg-white/20 shadow-inner shadow-white/5"
            >
              <span className="text-sm font-semibold w-1/4">
                {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <div className="flex items-center w-1/2 justify-center">
                <Image
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                  width={48}
                  height={48}
                  className="w-8 h-8 drop-shadow-sm"
                />
                <span className="text-sm ml-2 hidden sm:block">{day.day.condition.text}</span>
              </div>
              <div className="flex justify-end w-1/4 text-sm font-semibold">
                <span>{Math.round(day.day.maxtemp_c)}°</span>
                <span className="text-gray-700 dark:text-gray-300 ml-2 font-normal">
                  {Math.round(day.day.mintemp_c)}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}