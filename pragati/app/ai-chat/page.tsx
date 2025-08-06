"use client"

import { AvatarFallback } from "@/components/ui/avatar"

import { AvatarImage } from "@/components/ui/avatar"

import { Avatar } from "@/components/ui/avatar"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ProtectedPageHeader } from "@/components/protected-page-header"
import { ChatMessage } from "@/components/chat-message"
import { Send, ImageIcon, Mic, Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantResponse = ""

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]) // Add empty assistant message

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        assistantResponse += chunk
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1]
          if (lastMessage && lastMessage.role === "assistant") {
            return [...prev.slice(0, -1), { ...lastMessage, content: assistantResponse }]
          }
          return prev // Should not happen if initial empty message is added correctly
        })
      }
    } catch (error) {
      console.error("Error sending message to AI:", error)
      toast.error("Failed to get AI response.", {
        description: "Please try again later.",
      })
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real application, you would upload this file and send its URL/ID to the AI model
      // For now, we'll just display a placeholder message.
      const reader = new FileReader()
      reader.onloadend = () => {
        setMessages((prev) => [
          ...prev,
          { role: "user", content: `[Image uploaded: ${file.name}] (Image processing not yet implemented)` },
        ])
        // Simulate AI response for image upload
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Thank you for the image! I'm ready to analyze it once this feature is fully integrated.",
            },
          ])
        }, 1000)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAudioRecord = () => {
    // In a real application, you would start audio recording here
    // and then send the audio file to an AI model for transcription/analysis.
    setMessages((prev) => [
      ...prev,
      { role: "user", content: "[Audio recorded] (Audio processing not yet implemented)" },
    ])
    // Simulate AI response for audio
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I've received your audio! I'll be able to understand spoken queries once this feature is integrated.",
        },
      ])
    }, 1000)
  }

  return (
    <>
      <ProtectedPageHeader title="Ask Pragati AI" />
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-3xl mx-auto w-full">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
              <Sparkles className="h-16 w-16 text-purple-500 mb-4" />
              <p className="text-xl font-semibold">Start a conversation with Pragati AI!</p>
              <p className="text-base">Ask me anything about health, agriculture, education, or news.</p>
            </div>
          )}
          {messages.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
          {isLoading && (
            <div className="flex justify-start items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/pragati-ai-avatar.png" alt="Pragati AI" />
                <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">AI</AvatarFallback>
              </Avatar>
              <div className="p-3 rounded-lg bg-white/80 backdrop-blur-sm text-gray-800 rounded-bl-none border border-gray-200">
                <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSendMessage}
          className="sticky bottom-0 w-full bg-white/90 backdrop-blur-sm border-t border-gray-200 p-4 shadow-lg"
        >
          <div className="flex items-center gap-3 max-w-3xl mx-auto">
            <Input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} className="hidden" />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              className="text-purple-600 hover:bg-purple-50"
              aria-label="Upload Image"
            >
              <ImageIcon className="h-6 w-6" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleAudioRecord}
              className="text-pink-600 hover:bg-pink-50"
              aria-label="Record Audio"
            >
              <Mic className="h-6 w-6" />
            </Button>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 min-h-[48px] max-h-[150px] resize-none rounded-full border border-gray-300 bg-gray-50 px-4 py-3 text-base focus:border-blue-500 focus:ring-blue-500 shadow-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:from-blue-600 hover:to-purple-600 hover:shadow-lg transition-all duration-300"
              disabled={!input.trim() || isLoading}
              aria-label="Send Message"
            >
              {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
