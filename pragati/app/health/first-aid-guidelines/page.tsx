import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { ProtectedPageHeader } from "@/components/protected-page-header"
  
  export default function FirstAidGuidesPage() {
    return (
      <>
        <ProtectedPageHeader title="First-Aid Guides" backHref="/health" />
        <div className="flex flex-1 flex-col gap-6 p-6 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-1">Basic First-Aid</CardTitle>
              <CardDescription className="text-base">
                Essential steps for common injuries and emergencies.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="border rounded-md p-6 bg-background/50">
                <h3 className="font-semibold text-lg mb-2">Cuts and Scrapes</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Clean the wound with soap and water, apply antiseptic, and cover with a sterile bandage.
                </p>
              </div>
              <div className="border rounded-md p-6 bg-background/50">
                <h3 className="font-semibold text-lg mb-2">Burns (Minor)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cool the burn with cold (not ice) water for 10-15 minutes. Do not apply butter or oil.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }
  