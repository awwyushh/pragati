"use client"

interface ProtectedPageHeaderProps {
  title: string
}

export const ProtectedPageHeader = ({ title }: ProtectedPageHeaderProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
    </div>
  )
}
