"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LanguageSelector() {
  return (
    <Select defaultValue="en">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="hi">Hindi</SelectItem>
        <SelectItem value="mr">Marathi</SelectItem>
        {/* Add more languages as needed */}
      </SelectContent>
    </Select>
  )
}
