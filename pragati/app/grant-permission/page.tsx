import { ProtectedPageHeader } from "@/components/protected-page-header"

export default function GrantPermissionsPage() {
  return (
    <>
      <ProtectedPageHeader title="Grant Permissions" />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-lg font-semibold">Manage Permissions</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Configure access rights and permissions for different users or modules.
          </p>
        </div>
      </div>
    </>
  )
}
