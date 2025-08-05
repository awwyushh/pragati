import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProtectedPageHeader } from "@/components/protected-page-header"

const contests = [
  {
    id: "c1",
    name: "Village Knowledge Bowl",
    description: "A quiz contest on general knowledge and local affairs.",
    date: "August 25, 2023",
    prize: "Study Kit",
  },
  {
    id: "c2",
    name: "Creative Story Writing",
    description: "Submit your original stories in local languages.",
    date: "September 10, 2023",
    prize: "Books",
  },
]

export default function EducationContestsPage() {
  return (
    <>
      <ProtectedPageHeader title="Contests" backHref="/education" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Educational Contests</CardTitle>
            <CardDescription>Participate in challenges to win rewards and learn more!</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {contests.length === 0 ? (
              <p className="text-muted-foreground">No contests available at the moment.</p>
            ) : (
              contests.map((contest) => (
                <div key={contest.id} className="border rounded-md p-4 grid gap-2">
                  <h3 className="font-semibold text-lg">{contest.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{contest.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Date: {contest.date} | Prize: {contest.prize}
                  </p>
                  <Button className="mt-3 w-fit">Register Now</Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
