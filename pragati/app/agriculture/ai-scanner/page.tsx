import { AICropScanner } from "@/components/ai-crop-scanner"
import { ProtectedPageHeader } from "@/components/protected-page-header"

export default function AIAgricultureScannerPage() {
  return (
    <>
      <ProtectedPageHeader title="AI Crop Health Scanner" backHref="/agriculture" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <AICropScanner />
      </div>
    </>
  )
}
