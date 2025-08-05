"use client"

import type React from "react"
import { useRouter } from "next/navigation" // Import useRouter
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function LoginForm() {
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate successful login
    localStorage.setItem("isLoggedIn", "true")
    router.push("/language-selection") // Redirect to language selection after login
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="mx-auto w-full max-w-sm border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Login
          </CardTitle>
          <CardDescription className="text-base text-gray-700">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email" className="text-lg font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-lg p-3"
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-lg font-medium text-gray-700">
                  Password
                </Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="border-green-200 focus:border-green-500 focus:ring-green-500 text-lg p-3"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full border-purple-500 text-purple-700 hover:bg-purple-50 hover:text-purple-800 px-8 py-3 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-transparent"
            >
              Login with Google
            </Button>
          </form>
          <div className="mt-6 text-center text-base text-gray-700">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="underline text-blue-600 hover:text-blue-800 transition-colors duration-200 font-semibold"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
