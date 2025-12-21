import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar" // Note: Filename usually lowercase with Shadcn
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLocation, Outlet } from "react-router-dom" // Added Outlet

export default function DashboardLayout() {
  const location = useLocation()
  
  // Helper to prettify current path for breadcrumbs
  // Fixed logic to handle multiple slashes if necessary, basically your logic kept intact
  const getPageName = () => {
      const path = location.pathname;
      if (path === "/" || path === "") return "Student Profile";
      // Basic formatting: remove slash, replace dash with space, capitalize first letter
      return path.substring(1).split('/').pop()?.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()) || "Dashboard";
  };

  const currentPath = getPageName();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 sticky top-0 z-10">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">ERP</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPath}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="ml-auto flex items-center gap-4">
              <div className="hidden sm:block text-sm text-muted-foreground">
                Logged in as Student
              </div>
              <ModeToggle />
            </div>
        </header>
        
        {/* Main Content Area using Outlet for Router */}
        <div className="flex flex-1 flex-col gap-4 p-6 pt-6 max-w-[1600px] w-full mx-auto animate-in fade-in-50 duration-500">
          <Outlet /> 
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}