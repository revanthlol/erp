"use client"

// ====================== StudentProfile ======================

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { authApi } from "@/lib/api"

export default function StudentProfile() {
  const [student, setStudent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const data = await authApi.getProfile()
      setStudent(data)
    } catch (err) {
      setError("Failed to load profile. Please relogin.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in-50 duration-500">
      {/* Profile Photo Card */}
      <div className="space-y-6">
        <Card className="shadow-sm overflow-hidden border-2 border-primary/5">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 flex justify-center items-center relative">
            <Avatar className="w-48 h-48 border-4 border-white shadow-xl">
              <AvatarImage
                src={student ? authApi.getProxyImageUrl(student.photoUrl) : ""}
              />
              <AvatarFallback className="text-4xl">ST</AvatarFallback>
            </Avatar>
          </div>
        </Card>
      </div>
    </div>
  )
}


// ====================== AppSidebar ======================

import { useState, useEffect } from "react"
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authApi } from "@/lib/api"

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

  const [profile, setProfile] = useState<{
    name: string
    regNo: string
    photoUrl: string
  } | null>(null)

  useEffect(() => {
    const loadSidebarData = async () => {
      try {
        const data: any = await authApi.getProfile()
        if (data) setProfile(data)
      } catch {
        console.log("Sidebar info sync failed (Silent)")
      }
    }
    loadSidebarData()
  }, [])

  const handleLogout = () => {
    authApi.logout()
  }

  const displayName = profile?.name || "Student"
  const displayUid = profile?.regNo || "Loading ID..."
  const initials =
    displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2) || "ST"

  const avatarUrl = authApi.getProxyImageUrl(profile?.photoUrl)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
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
                <div className="grid flex-1 text-left text-sm leading-tight ml-2 group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:hidden">
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
                    className="group-data-[collapsible=icon]:!justify-center"
                  >
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ✅ DIRECT LOGOUT (NO DROPDOWN) */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={handleLogout}
              className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!p-0"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback className="rounded-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight ml-2 group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold uppercase">
                  {displayName}
                </span>
                <span className="truncate text-xs">{displayUid}</span>
              </div>

              <LogOut className="ml-auto size-4 text-destructive group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
