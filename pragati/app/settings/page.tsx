import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Globe, KeyRound } from "lucide-react"
import { ProtectedPageHeader } from "@/components/protected-page-header"

export default function SettingsPage() {
  return (
    <>
      <ProtectedPageHeader title="Settings" />
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6">
        <div className="relative z-10 flex flex-1 flex-col gap-6 max-w-4xl mx-auto">
          {/* Profile Information Card */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Profile Information
              </CardTitle>
              <CardDescription className="text-base text-gray-700">
                Update your personal details and profile picture.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24 border-2 border-blue-300 shadow-md">
                  <AvatarImage src="/user-avatar-placeholder.png" alt="User Avatar" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-xl font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-700 hover:bg-purple-50 hover:text-purple-800 px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-transparent"
                >
                  Change Picture
                </Button>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name" className="text-lg font-medium text-gray-700">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue=""
                  className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-lg text-gray-700 p-3"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="village" className="text-lg font-medium text-gray-700">
                  Village
                </Label>
                <Input
                  id="village"
                  defaultValue=""
                  className="border-green-200 focus:border-green-500 focus:ring-green-500 text-gray-700 text-lg p-3"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone" className="text-lg font-medium text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue=""
                  className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 text-lg p-3 text-gray-700"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-lg font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue=""
                  
                  className="border-gray-200 bg-gray-50 text-gray-700 text-lg p-3"
                />
              </div>
              <Button className="w-fit bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Application Settings Card */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Application Settings
              </CardTitle>
              <CardDescription className="text-base text-gray-700">Configure language and permissions.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 p-6">
              <Link
                href="/language-selection"
                className="flex items-center gap-4 rounded-lg p-4 bg-white/80 backdrop-blur-sm border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md group-hover:shadow-lg transition-all duration-300">
                  <Globe className="h-6 w-6" />
                </div>
                <div className="grid gap-0.5">
                  <p className="text-lg font-semibold leading-none text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                    Language Settings
                  </p>
                  <p className="text-base text-gray-700">Change your preferred language for the app.</p>
                </div>
              </Link>
              <Link
                href="/grant-permissions"
                className="flex items-center gap-4 rounded-lg p-4 bg-white/80 backdrop-blur-sm border border-green-200 shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md group-hover:shadow-lg transition-all duration-300">
                  <KeyRound className="h-6 w-6" />
                </div>
                <div className="grid gap-0.5">
                  <p className="text-lg font-semibold leading-none text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                    Grant Permissions
                  </p>
                  <p className="text-base text-gray-700">Manage app permissions and access.</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
