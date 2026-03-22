import { useRef, useEffect } from "react"
import { SidebarProvider, SidebarInset, useSidebar } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { LogOut, Menu } from "lucide-react"
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
  const { toggleSidebar, isMobile, open } = useSidebar()

  const getPageName = () => {
    const path = location.pathname
    if (path === "/" || path === "") return "Student Profile"
    return path.substring(1).split('/').pop()?.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()) || "Dashboard"
  }

  const currentPath = getPageName()

  const pillTouchStartX = useRef(0)

  const handlePillTouchStart = (e: React.TouchEvent) => {
    pillTouchStartX.current = e.touches[0].clientX
  }

  const handlePillTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - pillTouchStartX.current
    if (dx > 40) {
      e.preventDefault()
      toggleSidebar()
    }
    // taps (dx <= 40) are handled by onClick, so do nothing here
  }

  useEffect(() => {
    if (!isMobile) return
    const pill = document.getElementById('sidebar-pill')
    if (!pill) return
    // remove class first to allow re-trigger on same route reload
    pill.classList.remove('hinting')
    // force reflow so the animation restarts cleanly
    void pill.offsetWidth
    pill.classList.add('hinting')
    const timer = setTimeout(() => pill.classList.remove('hinting'), 920)
    return () => clearTimeout(timer)
  }, [location.pathname, isMobile])

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
      {isMobile && !open && (
        <div
          id="sidebar-pill"
          onTouchStart={handlePillTouchStart}
          onTouchEnd={handlePillTouchEnd}
          onClick={toggleSidebar}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-50 w-3.5 h-40 rounded-r-full bg-border/90 touch-none select-none transition-[background,opacity] duration-200 ease-in-out active:bg-border"
          aria-label="Open sidebar"
        />
      )}
    </>
  )
}

export default function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen={window.innerWidth >= 768}>
      <DashboardContent />
    </SidebarProvider>
  )
}
