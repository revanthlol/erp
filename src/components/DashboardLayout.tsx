import { SidebarProvider, SidebarInset, useSidebar } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { LogOut, Menu } from "lucide-react"
import { useSwipeSidebar } from "@/hooks/use-swipe-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLocation, Outlet } from "react-router-dom"
import { authApi } from "@/lib/api"

function DashboardContent() {
  const location = useLocation()
  const { toggleSidebar } = useSidebar()
  useSwipeSidebar()

  const getPageName = () => {
    const path = location.pathname
    if (path === "/" || path === "") return "Student Profile"
    return path.substring(1).split('/').pop()?.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()) || "Dashboard"
  }

  const currentPath = getPageName()

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 sticky top-0 z-10">
          <button
            onClick={toggleSidebar}
            className="-ml-1 inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Toggle sidebar"
          >
            <Menu className="size-5" />
          </button>
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => authApi.logout()}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-6 pt-6 max-w-[1600px] w-full mx-auto animate-in fade-in-50 duration-500">
          <Outlet />
        </div>
      </SidebarInset>
    </>
  )
}

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  )
}
