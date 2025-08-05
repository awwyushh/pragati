import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedPageHeader } from "@/components/protected-page-header"

const educationSchemes = [
  {
    name: "Samagra Shiksha Abhiyan",
    description:
      "This is an overarching scheme for school education, encompassing all levels from pre-school to senior secondary. It aims to improve access, equity, and quality in education by integrating various existing schemes.",
  },
  {
    name: "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    description:
      "This scheme provides scholarships to meritorious students from economically weaker sections to prevent them from dropping out at the class VIII level and to encourage them to continue their education at the secondary stage.",
  },
  {
    name: "National Overseas Scholarship (NOS) for SC etc. Candidates",
    description:
      "This scheme supports Scheduled Caste students in pursuing higher education (Masters and Ph.D. degrees) in notified foreign institutions.",
  },
  {
    name: "Central Sector Scheme of Scholarships for College and University Students",
    description:
      "This scheme offers scholarships to meritorious students pursuing higher education in colleges and universities.",
  },
  {
    name: "Pradhan Mantri Uchchatar Shiksha Abhiyan (PM-USHA)",
    description:
      "This scheme focuses on enhancing the quality of higher education in state-run institutions by promoting accessibility, equity, and affordability.",
  },
  {
    name: "National Skill Development Mission",
    description:
      "This mission aims to increase the availability of skilled manpower for various sectors by providing vocational training and skill development programs according to DBT | Direct Benefit Transfer.",
  },
]

export default function EducationSchemesPage() {
  return (
    <>
      <ProtectedPageHeader title="Educational Schemes" backHref="/education" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Government Schemes for Education</CardTitle>
            <CardDescription>Explore various government initiatives and scholarships.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {educationSchemes.map((scheme, index) => (
              <Link
                key={index}
                href="#"
                className="block border rounded-md p-4 grid gap-2 hover:bg-primary/10 hover:border-primary transition-colors cursor-pointer group"
              >
                <h3 className="font-semibold text-lg group-hover:underline">{scheme.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{scheme.description}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
