import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
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
import { useLocation } from "react-router-dom"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  
  // Helper to prettify current path for breadcrumbs
  const currentPath = location.pathname === '/' 
    ? 'Student Profile' 
    : location.pathname.substring(1).replace('-', ' ').replace(/^\w/, c => c.toUpperCase());

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Academic</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPath}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="ml-auto flex items-center gap-4">
              <div className="hidden sm:block text-sm text-muted-foreground">
                  AY: 2025-2026 | III SEM | A
              </div>
              <ModeToggle />
            </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6 pt-6 max-w-[1600px] w-full mx-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}