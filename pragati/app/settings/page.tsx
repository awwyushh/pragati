import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Globe, KeyRound } from "lucide-react"
import { ProtectedPageHeader } from "@/components/protected-page-header" // Import the new header component

export default function SettingsPage() {
  return (
    <>
      <ProtectedPageHeader title="Settings" /> {/* Use the new header component */}
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details and profile picture.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Picture</Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="village">Village</Label>
              <Input id="village" defaultValue="Remote Village A" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" disabled />
            </div>
            <Button className="w-fit">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
            <CardDescription>Configure language and permissions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link
              href="/language-selection"
              className="flex items-center gap-3 rounded-md p-3 hover:bg-muted transition-colors"
            >
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div className="grid gap-0.5">
                <p className="text-sm font-medium leading-none">Language Settings</p>
                <p className="text-sm text-muted-foreground">Change your preferred language for the app.</p>
              </div>
            </Link>
            <Link
              href="/grant-permissions"
              className="flex items-center gap-3 rounded-md p-3 hover:bg-muted transition-colors"
            >
              <KeyRound className="h-5 w-5 text-muted-foreground" />
              <div className="grid gap-0.5">
                <p className="text-sm font-medium leading-none">Grant Permissions</p>
                <p className="text-sm text-muted-foreground">Manage app permissions and access.</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
