import { ProtectedPageHeader } from "@/components/protected-page-header" // Import the new header component

export default function WomenChildSOSPage() {
  return (
    <>
      <ProtectedPageHeader title="Women & Child SOS" /> {/* Use the new header component */}
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-lg font-semibold">Emergency Support</h2>
          <p className="text-sm text-muted-foreground mt-2">
            This section provides resources and immediate help for women and children in distress.
          </p>
        </div>
      </div>
    </>
  )
}
