import { SchemesComponent } from "@/components/schemes-component"
import { ProtectedPageHeader } from "@/components/protected-page-header"

export default function AgricultureSchemesPage() {
  return (
    <>
      <ProtectedPageHeader title="Government Schemes" backHref="/agriculture" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <SchemesComponent />
      </div>
    </>
  )
}
