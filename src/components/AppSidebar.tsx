"use client"

import {
  CalendarDays, // Changed for Attendance
  BookOpen,
  CreditCard,
  FileText,
  GraduationCap,
  Library,
  Lock,
  User,
  ClipboardList,
  LogOut,
  Briefcase, 
  Clock // New icon for Hourly
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

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
  useSidebar,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronsUpDown } from "lucide-react"

// Updated Icons
const items = [
  { title: "Personal Details", url: "/", icon: User },
  { title: "Student Wise Subjects", url: "/subjects", icon: BookOpen },
  { title: "Attendance Details", url: "/attendance", icon: CalendarDays }, // Changed Icon
  { title: "Hour Wise Attendance", url: "/attendance-hourly", icon: Clock }, // Changed Icon
  { title: "Internal Mark Details", url: "/internals", icon: FileText },
  { title: "Hall Ticket", url: "/hall-ticket", icon: ClipboardList },
  { title: "Exam Mark Details", url: "/exam-marks", icon: GraduationCap },
  { title: "Student Services", url: "/services", icon: Briefcase },
  { title: "Online Library", url: "/library", icon: Library },
  { title: "Fee Paid Details", url: "/fees", icon: CreditCard },
]

export function AppSidebar() {
  const { isMobile } = useSidebar() // Changed 'state' to isMobile check, Shadcn handles state via CSS classes automatically now
  const location = useLocation()

  return (
    <Sidebar collapsible="icon">
      {/* 1. Header Fix: Using SidebarMenuButton size="lg" prevents cropping when collapsed */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                   {/* Logo Logic */}
                   <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="/logo.png" alt="Loyola" />
                      <AvatarFallback>LA</AvatarFallback>
                   </Avatar>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Loyola Academy</span>
                  <span className="truncate text-xs">Student ERP Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title} 
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Footer Fix: Ensure size="lg" for consistent icon spacing */}
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/student.png" alt="User" />
                    <AvatarFallback className="rounded-lg">RG</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Revanth Goud</span>
                    <span className="truncate text-xs">111724013034</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}