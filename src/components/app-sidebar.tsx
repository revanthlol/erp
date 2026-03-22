import { useState, useEffect } from "react"
import {
  CalendarDays, BookOpen, CreditCard, FileText,
  GraduationCap, Library, User, ClipboardList,
  LogOut, Briefcase, Clock,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupContent, SidebarGroupLabel, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarRail, useSidebar,
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
    displayName.split(" ").map((n) => n[0]).join("").slice(0, 2) || "ST"

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
                    className="min-h-[44px] py-2 text-sm transition-all duration-150 ease-in-out data-[active=true]:border-l-2 data-[active=true]:border-primary data-[active=true]:pl-[calc(0.5rem-2px)] group-data-[collapsible=icon]:!justify-center"
                  >
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="size-4 shrink-0 transition-transform duration-150 ease-in-out group-hover:scale-110 group-data-[active=true]:text-primary" />
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={handleLogout}
              className="cursor-pointer group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!p-0"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight ml-2 group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold uppercase">{displayName}</span>
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
