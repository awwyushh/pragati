import { AgricultureGuidelines } from "@/components/agriculture-guidelines"
import { ProtectedPageHeader } from "@/components/protected-page-header"

export default function AgricultureGuidelinesPage() {
  return (
    <>
      <ProtectedPageHeader title="Farming Guidelines & Tips" backHref="/agriculture" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <AgricultureGuidelines />
      </div>
    </>
  )
}
