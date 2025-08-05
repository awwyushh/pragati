import { Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProtectedPageHeader } from "@/components/protected-page-header"

const courses = [
  {
    id: "1",
    title: "Basic Literacy for Adults",
    thumbnail: "/placeholder.svg?height=150&width=250",
    language: "Hindi",
    subject: "Foundational Skills",
    duration: "4 weeks",
    description: "Learn reading, writing, and basic arithmetic.",
  },
  {
    id: "2",
    title: "Digital Skills for Farmers",
    thumbnail: "/placeholder.svg?height=150&width=250",
    language: "Marathi",
    subject: "Technology",
    duration: "6 weeks",
    description: "Understand smartphone use, online payments, and digital records.",
  },
  {
    id: "3",
    title: "Health & Hygiene Basics",
    thumbnail: "/placeholder.svg?height=150&width=250",
    language: "English",
    subject: "Health",
    duration: "3 weeks",
    description: "Essential knowledge for personal and community hygiene.",
  },
  {
    id: "4",
    title: "Crop Management Techniques",
    thumbnail: "/placeholder.svg?height=150&width=250",
    language: "Hindi",
    subject: "Agriculture",
    duration: "8 weeks",
    description: "Advanced techniques for better crop yield and pest control.",
  },
]

const leaderboard = [
  { rank: 1, name: "Ravi Kumar", score: 980 },
  { rank: 2, name: "Priya Sharma", score: 950 },
  { rank: 3, name: "Amit Singh", score: 920 },
  { rank: 4, name: "Geeta Devi", score: 890 },
  { rank: 5, name: "Suresh Yadav", score: 870 },
]

const pastScores = [
  { quiz: "Basic Literacy Quiz 1", score: "85/100", date: "2023-01-15" },
  { quiz: "Digital Skills Quiz 2", score: "72/100", date: "2023-02-20" },
  { quiz: "Health & Hygiene Quiz", score: "90/100", date: "2023-03-10" },
]

export default function EducationCoursesPage() {
  return (
    <>
      <ProtectedPageHeader title="Courses & Quizzes" backHref="/education" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="relative mb-4">
          <Input
            type="search"
            placeholder="Search courses or quizzes..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus-visible:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Courses</CardTitle>
            <CardDescription>Explore various learning modules to enhance your knowledge.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative w-full h-40 bg-muted">
                  <Image
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Language:</span>
                    <span>{course.language}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Subject:</span>
                    <span>{course.subject}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <Button className="mt-4 w-full">View Course</Button>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quizzes</CardTitle>
            <CardDescription>Test your knowledge and track your progress.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
                <CardDescription>Top performers in recent quizzes.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Rank</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboard.map((entry) => (
                      <TableRow key={entry.rank}>
                        <TableCell className="font-medium">{entry.rank}</TableCell>
                        <TableCell>{entry.name}</TableCell>
                        <TableCell className="text-right">{entry.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Past Quiz Scores</CardTitle>
                <CardDescription>Review your performance on previous quizzes.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quiz</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastScores.map((score, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{score.quiz}</TableCell>
                        <TableCell>{score.score}</TableCell>
                        <TableCell className="text-right">{score.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button className="mt-4 w-full">Take a New Quiz</Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
