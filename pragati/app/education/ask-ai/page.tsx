import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ProtectedPageHeader } from "@/components/protected-page-header"

export default function EducationAskAIPage() {
  return (
    <>
      <ProtectedPageHeader title="Ask AI" backHref="/education" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Ask Your Questions</CardTitle>
            <CardDescription>Get instant answers from our AI assistant on any educational topic.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="ai-question">Your Question</Label>
              <Textarea id="ai-question" placeholder="e.g., What is photosynthesis?" rows={5} />
            </div>
            <Button className="w-fit">Get Answer</Button>
            <div className="mt-4 p-3 rounded-md bg-muted text-background">
              <h4 className="font-semibold">AI Response:</h4>
              <p className="text-sm mt-1">{"(AI response will appear here after you ask a question)"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
