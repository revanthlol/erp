import { useState, useEffect, useRef } from "react"
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
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
import { useLocation, Outlet, Link } from "react-router-dom"
import { authApi } from "@/lib/api"
import { SessionNavBar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export default function DashboardLayout() {
  const location = useLocation()
  const [isPinned, setIsPinned] = useState(() => {
    const saved = sessionStorage.getItem("sidebar_pinned")
    return saved === null ? true : saved === "true"
  })
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  
  const pillTouchStartX = useRef(0)

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      // When mobile is detected, we don't pin, but we don't overwrite the user's preference in sessionStorage
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Sync pinning preference to session
  useEffect(() => {
    if (!isMobile) {
      sessionStorage.setItem("sidebar_pinned", isPinned.toString())
    }
  }, [isPinned, isMobile])

  // Auto-close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname])

  const getPageName = () => {
    const path = location.pathname
    if (path === "/" || path === "") return "Student Profile"
    return path.substring(1).split('/').pop()?.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()) || "Dashboard"
  }

  const currentPath = getPageName()

  const handlePillTouchStart = (e: React.TouchEvent) => {
    pillTouchStartX.current = e.touches[0].clientX
  }

  const handlePillTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - pillTouchStartX.current
    if (dx > 40) {
      setIsMobileOpen(true)
    }
  }

  // Calculate left padding for desktop
  // If pinned: 16rem (256px)
  // If not pinned: 4rem (64px)
  const desktopPadding = isPinned ? "pl-64" : "pl-20"

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <SessionNavBar 
          isPinned={isPinned} 
          onHoverChange={setIsSidebarHovered}
        />
      )}

      {/* Mobile Sidebar (Drawer) */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-[16.05rem] border-none">
          <SessionNavBar isPinned={true} className="relative w-64 border-none shadow-none" />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div 
        className={cn(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out",
          !isMobile && desktopPadding
        )}
      >
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 lg:px-6 sticky top-0 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => isMobile ? setIsMobileOpen(true) : setIsPinned(!isPinned)}
            className="hover:bg-accent"
          >
            <Menu className="size-5" />
          </Button>
          
          <Separator orientation="vertical" className="mx-2 h-4" />
          
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link to="/">ERP</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-primary">{currentPath}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden sm:block text-sm text-muted-foreground font-medium">
              Student Portal
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

        <main className="flex-1 p-4 lg:p-8 max-w-[1600px] w-full mx-auto animate-in fade-in-50 duration-500">
          <Outlet />
        </main>
      </div>

      {/* Mobile Swipe/Click Pill */}
      {isMobile && !isMobileOpen && (
        <div
          id="sidebar-pill"
          onTouchStart={handlePillTouchStart}
          onTouchEnd={handlePillTouchEnd}
          onClick={() => setIsMobileOpen(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-50 w-3.5 h-40 rounded-r-full bg-border/90 touch-none select-none transition-all duration-200 active:bg-primary/20 cursor-pointer flex items-center justify-center group"
          aria-label="Open sidebar"
        >
           <div className="w-1 h-8 rounded-full bg-muted-foreground/30 group-active:bg-primary/50 transition-colors" />
        </div>
      )}
    </div>
  )
}
