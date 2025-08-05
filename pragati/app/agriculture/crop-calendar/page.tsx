import { CropCalendarCard } from "@/components/crop-calendar-card"
import { ProtectedPageHeader } from "@/components/protected-page-header"

export default function AgricultureCropCalendarPage() {
  return (
    <>
      <ProtectedPageHeader title="Crop Calendar" backHref="/agriculture" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <CropCalendarCard />
      </div>
    </>
  )
}
