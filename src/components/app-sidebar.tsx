"use client"

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
  
  // Local state for sidebar profile data
  const [profile, setProfile] = useState<{name: string, regNo: string, photoUrl: string} | null>(null);

  // Fetch basics on mount
  useEffect(() => {
      const loadSidebarData = async () => {
          try {
              const data: any = await authApi.getProfile();
              if (data) setProfile(data);
          } catch (e) {
              console.log("Sidebar info sync failed (Silent)");
          }
      };
      loadSidebarData();
  }, []);

  const handleLogout = () => {
    authApi.logout(); // Uses the robust API logout clearing both keys
  };

  // Helper to secure the image via proxy
  const getSecurePhotoUrl = (originalUrl?: string) => {
      if (!originalUrl) return undefined;
      const token = localStorage.getItem("auth_token");
      if (!token) return originalUrl;
      return `http://localhost:3000/api/proxy/image?token=${token}&url=${encodeURIComponent(originalUrl)}`;
  };

  const displayName = profile?.name || "Student";
  const displayUid = profile?.regNo || "Loading ID...";
  // Extract initials
  const initials = displayName.split(" ").map(n => n[0]).join("").slice(0, 2) || "ST";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* LOGO SECTION */}
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
                {/* USER SECTION DYNAMIC */}
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!p-0"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    {/* Use secure proxy for sidebar image */}
                    <AvatarImage 
                        src={getSecurePhotoUrl(profile?.photoUrl)} 
                        alt={displayName} 
                    />
                    <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight ml-2 group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold uppercase">{displayName}</span>
                    <span className="truncate text-xs">{displayUid}</span>
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
                <DropdownMenuItem 
                    className="text-destructive focus:bg-destructive/10 cursor-pointer"
                    onClick={handleLogout} 
                >
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