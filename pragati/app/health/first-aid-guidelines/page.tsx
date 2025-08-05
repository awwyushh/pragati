import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedPageHeader } from "@/components/protected-page-header"

export default function FirstAidGuidesPage() {
  return (
    <>
      <ProtectedPageHeader title="First-Aid Guides" backHref="/health" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic First-Aid</CardTitle>
            <CardDescription>Essential steps for common injuries and emergencies.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="border rounded-md p-4">
              <h3 className="font-semibold text-lg">Cuts and Scrapes</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Clean the wound with soap and water, apply antiseptic, and cover with a sterile bandage.
              </p>
            </div>
            <div className="border rounded-md p-4">
              <h3 className="font-semibold text-lg">Burns (Minor)</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Cool the burn with cold (not ice) water for 10-15 minutes. Do not apply butter or oil.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
