import { useState, useEffect, useRef } from "react"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, RefreshCw } from "lucide-react"
import { Popover, PopoverAnchor, PopoverArrow, PopoverContent } from "@/components/ui/popover"
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
import { toast } from "sonner"

export default function DashboardLayout() {
  const location = useLocation()
  const [isPinned, setIsPinned] = useState(() => {
    const saved = sessionStorage.getItem("sidebar_pinned")
    return saved === null ? true : saved === "true"
  })
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isRefreshingSession, setIsRefreshingSession] = useState(false)
  const [showRefreshHint, setShowRefreshHint] = useState(false)
  const [showRefreshHintPulse, setShowRefreshHintPulse] = useState(false)
  
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

  // Show the refresh hint exactly once after a manual login.
  useEffect(() => {
    const shouldShowHint = sessionStorage.getItem("erp-refresh-session-tip") === "1"
    if (shouldShowHint) {
      setShowRefreshHint(true)
      setShowRefreshHintPulse(true)
      sessionStorage.removeItem("erp-refresh-session-tip")
    }
  }, [])

  useEffect(() => {
    if (!showRefreshHint) return

    const timerId = window.setTimeout(() => {
      setShowRefreshHintPulse(false)
    }, 3600)

    return () => window.clearTimeout(timerId)
  }, [showRefreshHint])

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

  const handleRefreshSession = async () => {
    if (isRefreshingSession) return

    setIsRefreshingSession(true)
    try {
      await authApi.refreshSession()
      toast.success("ERP session refreshed")
      window.location.reload()
    } catch (error) {
      console.error("ERP session refresh failed", error)
      toast.error("Failed to refresh ERP session")
    } finally {
      setIsRefreshingSession(false)
    }
  }

  const dismissRefreshHint = () => {
    setShowRefreshHint(false)
    setShowRefreshHintPulse(false)
  }

  const handleHeaderRefreshClick = async () => {
    dismissRefreshHint()
    await handleRefreshSession()
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
          onRefreshSession={handleRefreshSession}
          refreshingSession={isRefreshingSession}
        />
      )}

      {/* Mobile Sidebar (Drawer) */}
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-[16.05rem] border-none">
          <SessionNavBar
            isPinned={true}
            className="relative w-64 border-none shadow-none"
            onRefreshSession={handleRefreshSession}
            refreshingSession={isRefreshingSession}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div 
        className={cn(
          "flex flex-1 flex-col min-w-0 transition-all duration-300 ease-in-out",
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
            <Popover
              open={showRefreshHint}
              onOpenChange={(open) => {
                if (!open) dismissRefreshHint()
              }}
            >
              <PopoverAnchor asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleHeaderRefreshClick}
                  disabled={isRefreshingSession}
                  className={cn(
                    "relative overflow-visible border-primary/20 text-primary hover:bg-primary/10 transition-all",
                    showRefreshHint && "ring-1 ring-primary/40 shadow-[0_0_0_8px_rgba(59,130,246,0.12)]",
                    showRefreshHintPulse && "animate-[pulse_1.8s_ease-in-out_infinite]"
                  )}
                  title="Refresh ERP session"
                >
                  {showRefreshHint && (
                    <span className="absolute inset-0 rounded-md bg-primary/10 blur-md" aria-hidden="true" />
                  )}
                  <RefreshCw className={`h-4 w-4 relative z-10 ${isRefreshingSession ? "animate-spin" : ""}`} />
                </Button>
              </PopoverAnchor>
              {showRefreshHint && (
                <PopoverContent
                  side="bottom"
                  align="center"
                  sideOffset={12}
                  className="w-[250px] overflow-visible rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 shadow-lg shadow-black/10"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  onEscapeKeyDown={dismissRefreshHint}
                >
                  <div className="relative space-y-3">
                    <PopoverArrow className="fill-white" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900">Refresh Session</p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                        Reconnects ERP automatically if session expires.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        onClick={dismissRefreshHint}
                        className="h-8 rounded-full border border-zinc-900 bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800"
                      >
                        Got it
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              )}
            </Popover>
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
