"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Lightbulb,
  Trophy,
  HelpCircle,
  Handshake,
  Play,
  Download,
  MessageCircle,
  Clock,
  Award,
} from "lucide-react"
import { ProtectedPageHeader } from "@/components/protected-page-header"
import { CircularProgress } from "@/components/circular-progress"

const educationNavItems = [
  {
    title: "Courses",
    href: "/education/courses",
    icon: BookOpen,
    description: "Explore various learning modules and quizzes.",
  },
  {
    title: "Certificates",
    href: "/education/certificates",
    icon: Trophy,
    description: "View your earned certificates.",
  },
  {
    title: "Contests",
    href: "/education/contests",
    icon: HelpCircle,
    description: "Participate in educational challenges.",
  },
  {
    title: "Ask AI",
    href: "/education/ask-ai",
    icon: Lightbulb,
    description: "Get instant answers from AI assistant.",
  },
  {
    title: "Schemes",
    href: "/education/schemes",
    icon: Handshake,
    description: "Discover government education schemes.",
  },
]

const ongoingCourses = [
  {
    id: 1,
    title: "Introduction to React Development",
    language: "English",
    thumbnail: "/react-course-thumbnail.png",
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    language: "Hindi",
    thumbnail: "/javascript-course-thumbnail.png",
    progress: 40,
    totalLessons: 18,
    completedLessons: 7,
  },
]

const quizzes = [
  {
    id: 1,
    title: "React Fundamentals",
    questions: 15,
    duration: "20 min",
    difficulty: "Beginner",
    thumbnail: "/react-quiz-thumbnail.png",
  },
  {
    id: 2,
    title: "JavaScript ES6+",
    questions: 20,
    duration: "25 min",
    difficulty: "Intermediate",
    thumbnail: "/javascript-quiz-thumbnail.png",
  },
  {
    id: 3,
    title: "Web Development Basics",
    questions: 12,
    duration: "15 min",
    difficulty: "Beginner",
    thumbnail: "/web-dev-quiz-thumbnail.png",
  },
  {
    id: 4,
    title: "Node.js Backend",
    questions: 18,
    duration: "30 min",
    difficulty: "Advanced",
    thumbnail: "/nodejs-quiz-thumbnail.png",
  },
]

const certificates = [
  {
    id: 1,
    title: "Full Stack Web Development",
    issueDate: "2024-01-15",
    thumbnail: "/full-stack-certificate.png",
  },
  {
    id: 2,
    title: "React Developer Certification",
    issueDate: "2023-12-10",
    thumbnail: "/react-certificate.png",
  },
  {
    id: 3,
    title: "JavaScript Mastery",
    issueDate: "2023-11-20",
    thumbnail: "/placeholder-9ezng.png",
  },
]

export default function EducationPage() {
  return (
    <>
      <ProtectedPageHeader title="Education" />
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-8 space-y-12">
          {/* Talk to Tutor Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              Talk to a Tutor Now
            </Button>
          </div>

          {/* Ongoing Courses Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Ongoing Courses</h2>
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              {ongoingCourses.map((course) => (
                <Card
                  key={course.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm"
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-blue-600 text-white text-sm px-3 py-1">
                      {course.language}
                    </Badge>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl text-gray-800 mb-3 text-center">{course.title}</h3>
                        <p className="text-base text-gray-600 text-center">
                          {course.completedLessons} of {course.totalLessons} lessons completed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <CircularProgress progress={course.progress} size={80} />
                      <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 text-base">
                        <Play className="mr-2 h-5 w-5" />
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quizzes Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Practice Quizzes</h2>
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-6 px-4" style={{ width: "max-content" }}>
                {quizzes.map((quiz) => (
                  <Card
                    key={quiz.id}
                    className="flex-shrink-0 w-80 hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm"
                  >
                    <div className="relative">
                      <img
                        src={quiz.thumbnail || "/placeholder.svg"}
                        alt={quiz.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <Badge
                        className={`absolute top-3 right-3 text-sm px-3 py-1 ${
                          quiz.difficulty === "Beginner"
                            ? "bg-green-500"
                            : quiz.difficulty === "Intermediate"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        } text-white`}
                      >
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-base text-gray-800 mb-4">{quiz.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span className="flex items-center">
                          <HelpCircle className="mr-2 h-4 w-4" />
                          {quiz.questions} questions
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {quiz.duration}
                        </span>
                      </div>
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3"
                      >
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Certificates Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Certificates</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {certificates.map((certificate) => (
                <Card
                  key={certificate.id}
                  className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm"
                >
                  <div className="relative">
                    <img
                      src={certificate.thumbnail || "/placeholder.svg"}
                      alt={certificate.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3">
                      <Award className="h-8 w-8 text-yellow-500" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-base text-gray-800 mb-3 text-center">{certificate.title}</h3>
                    <p className="text-sm text-gray-600 text-center mb-4">
                      Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-3">
                      <Button size="lg" variant="outline" className="flex-1 text-sm py-2">
                        View
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white text-sm py-2"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
