"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function AIChatButton() {
  return (
    <Link href="/ai-chat" passHref>
      <Button
        size="lg"
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600 hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="Ask Pragati AI"
        style={{
          backgroundImage: 'url("/ai.jpeg")', // Replace with the image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Sparkles className="text-white" />
      </Button>
    </Link>
  )
}
