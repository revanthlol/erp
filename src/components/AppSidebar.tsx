"use client"

import {
  CalendarDays,
  BookOpen,
  CreditCard,
  FileText,
  GraduationCap,
  Library,
  User,
  ClipboardList,
  LogOut,
  Briefcase, 
  Clock,
  ChevronsUpDown
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

const items = [
  { title: "Personal Details", url: "/", icon: User },
  { title: "Student Wise Subjects", url: "/subjects", icon: BookOpen },
  { title: "Attendance Details", url: "/attendance", icon: CalendarDays },
  { title: "Hour Wise Attendance", url: "/attendance-hourly", icon: Clock },
  { title: "Internal Mark Details", url: "/internals", icon: FileText },
  { title: "Hall Ticket", url: "/hall-ticket", icon: ClipboardList },
  { title: "Exam Mark Details", url: "/exam-marks", icon: GraduationCap },
  { title: "Student Services", url: "/services", icon: Briefcase },
  { title: "Online Library", url: "/library", icon: Library },
  { title: "Fee Paid Details", url: "/fees", icon: CreditCard },
]

export function AppSidebar() {
  const { isMobile } = useSidebar()
  const location = useLocation()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* LOGO SECTION FIX */}
            <SidebarMenuButton 
              size="lg" 
              asChild 
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!p-0"
            >
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                   <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="/logo.png" alt="Loyola" />
                      <AvatarFallback>LA</AvatarFallback>
                   </Avatar>
                </div>
                {/* Text hides automatically in Shadcn Sidebar, but margins were causing offset. The !justify-center fix above handles it. */}
                <div className="grid flex-1 text-left text-sm leading-tight ml-2 group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">Loyola Academy</span>
                  <span className="truncate text-xs">Student Portal</span>
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
                    className="group-data-[collapsible=icon]:!justify-center"
                  >
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
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
                {/* USER SECTION FIX */}
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!p-0"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/student.png" alt="User" />
                    <AvatarFallback className="rounded-lg">RG</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight ml-2 group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">Revanth Goud</span>
                    <span className="truncate text-xs">111724013034</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
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