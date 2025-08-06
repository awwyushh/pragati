import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user"
  return (
    <div className={cn("flex items-end gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/pragati-ai-avatar.png" alt="Pragati AI" />
          <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">AI</AvatarFallback>
        </Avatar>
      )}
      <Card
        className={cn(
          "max-w-[70%] p-3 rounded-lg shadow-md",
          isUser
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none"
            : "bg-white/80 backdrop-blur-sm text-gray-800 rounded-bl-none border border-gray-200",
        )}
      >
        <CardContent className="p-0 text-base leading-relaxed">{content}</CardContent>
      </Card>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/user-avatar-placeholder.png" alt="You" />
          <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-400 text-white">You</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
