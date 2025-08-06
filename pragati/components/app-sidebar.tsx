"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Home,
  Newspaper,
  HeartPulse,
  Leaf,
  GraduationCap,
  User,
  Megaphone,
  ChevronUp,
  MessageSquare,
  AlertTriangle,
  Menu,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    category: "main",
  },
  {
    title: "News",
    href: "/news",
    icon: Newspaper,
    category: "main",
  },
  {
    title: "Health",
    href: "/health",
    icon: HeartPulse,
    category: "services",
  },
  {
    title: "Agriculture",
    href: "/agriculture",
    icon: Leaf,
    category: "services",
  },
  {
    title: "Education",
    href: "/education",
    icon: GraduationCap,
    category: "services",
  },
  {
    title: "Complaints",
    href: "/complaints",
    icon: MessageSquare,
    category: "support",
  },
  {
    title: "Emergency SOS",
    href: "/women-child-sos",
    icon: AlertTriangle,
    category: "support",
    highlight: true,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: User,
    category: "account",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  
  // Group navigation items by category
  const groupedNavItems = navItems.reduce((acc, item) => {
    const category = item.category || 'other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(item)
    return acc
  }, {} as Record<string, typeof navItems>)
  
  // Set active category based on current path
  useEffect(() => {
    const currentItem = navItems.find(item => pathname === item.href)
    if (currentItem) {
      setActiveCategory(currentItem.category || null)
    }
  }, [pathname])
  
  // Category labels mapping
  const categoryLabels: Record<string, string> = {
    main: "Main",
    services: "Services",
    support: "Support & Help",
    account: "Account"
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border/10">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 p-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 hover:opacity-80"
        >
          <Megaphone className="h-6 w-6 text-blue-600" />
          <span>PRAGATI</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="py-2">
        {Object.entries(groupedNavItems).map(([category, items]) => (
          <SidebarGroup key={category}>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 font-medium px-3 py-2">
              {categoryLabels[category] || category}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={pathname === item.href}
                      className={`transition-all duration-200 ${item.highlight ? 'bg-red-50 hover:bg-red-100 text-red-700' : ''}`}
                    >
                      <Link href={item.href} className="flex items-center gap-3 py-2 px-3 rounded-md">
                        <div className={`flex items-center justify-center ${pathname === item.href ? 'text-blue-600' : 'text-gray-600'} ${item.highlight ? 'text-red-600' : ''}`}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="flex-1">{item.title}</span>
                        {item.highlight && (
                          <Badge variant="destructive" className="text-xs py-0 px-1.5">
                            SOS
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarSeparator className="my-2" />
      </SidebarContent>
      <SidebarFooter className="p-3 border-t border-sidebar-border/10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Language</span>
            <Link href="/language-selection" className="text-blue-600 hover:underline">Change</Link>
          </div>
          <div className="p-2 bg-gray-50 rounded-md text-sm flex items-center justify-between">
            <span className="font-medium">English</span>
            <span className="text-xs text-gray-500">v1.0.0</span>
          </div>
          
          <div className="mt-2 text-xs text-center text-gray-400">
            © 2024 PRAGATI - Empowering Rural Communities
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
