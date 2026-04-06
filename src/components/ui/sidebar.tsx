"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronsUpDown,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authApi } from "@/lib/api";

const sidebarVariants = {
  open: {
    width: "16rem",
  },
  closed: {
    width: "5rem",
  },
};

const textVariants = {
  open: {
    opacity: 1,
    x: 0,
    display: "block",
    transition: { duration: 0.2, ease: "easeOut" } as const,
  },
  closed: {
    opacity: 0,
    x: -10,
    transitionEnd: { display: "none" },
    transition: { duration: 0.2, ease: "easeIn" } as const,
  },
};

const transitionProps = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
} as const;

const sidebarItems = [
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
];

interface SessionNavBarProps {
  isPinned?: boolean;
  onHoverChange?: (hovered: boolean) => void;
  className?: string;
}

export function SessionNavBar({ isPinned = true, onHoverChange, className }: SessionNavBarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const [profile, setProfile] = useState<{
    name: string;
    regNo: string;
    photoUrl: string;
  } | null>(null);

  const effectivelyOpen = isPinned || isHovered;

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data: any = await authApi.getProfile();
        if (data) setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };
    loadProfile();
  }, []);

  const handleLogout = () => {
    authApi.logout();
  };

  const displayName = profile?.name || "Student";
  const displayUid = profile?.regNo || "Loading...";
  const initials =
    displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "ST";
  const avatarUrl = authApi.getProxyImageUrl(profile?.photoUrl);

  const handleMouseEnter = () => {
    if (!isPinned) {
      setIsHovered(true);
      onHoverChange?.(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsHovered(false);
      onHoverChange?.(false);
    }
  };

  return (
    <motion.div
      className={cn(
        "sidebar fixed left-0 z-40 h-full shrink-0 border-r bg-background",
        className
      )}
      initial={effectivelyOpen ? "open" : "closed"}
      animate={effectivelyOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex h-full flex-col overflow-hidden">
        {/* Header */}
        <div className="flex h-16 w-full shrink-0 items-center border-b px-4">
          <div className="flex items-center gap-3 w-full">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground overflow-hidden">
              <Avatar className="size-8">
                <AvatarImage src="/logo.png" />
                <AvatarFallback className="bg-primary text-primary-foreground">LA</AvatarFallback>
              </Avatar>
            </div>
            <AnimatePresence>
              {effectivelyOpen && (
                <motion.div
                  variants={textVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="flex flex-col overflow-hidden"
                >
                  <p className="truncate text-sm font-bold leading-tight">Loyola Academy</p>
                  <p className="truncate text-[10px] text-muted-foreground">Student ERP Portal</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Main Menu */}
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="flex flex-col gap-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                onClick={() => {
                  if (!isPinned) {
                    setIsHovered(false);
                    onHoverChange?.(false);
                  }
                }}
                className={cn(
                  "group flex h-12 w-full items-center rounded-md transition-all duration-200",
                  location.pathname === item.url
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  effectivelyOpen ? "px-3" : "justify-center"
                )}
              >
                <item.icon className={cn("size-5 shrink-0", location.pathname === item.url && "text-primary")} />
                <AnimatePresence>
                  {effectivelyOpen && (
                    <motion.span
                      variants={textVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="ml-3 truncate text-sm font-medium"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </div>
        </ScrollArea>

        {/* Footer / Account */}
        <div className="mt-auto flex flex-col border-t bg-muted/20 p-3">
          {/* Quick Logout Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className={cn(
              "mb-2 w-full justify-start gap-4 px-3 text-destructive hover:bg-destructive/10 hover:text-destructive transition-all",
              !effectivelyOpen && "justify-center px-0"
            )}
          >
            <LogOut className="size-5 shrink-0" />
            <AnimatePresence>
              {effectivelyOpen && (
                <motion.span
                  variants={textVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="text-[13px] font-bold tracking-tight"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          {/* Profile Section (Static) */}
          <div
            className={cn(
              "flex h-12 w-full items-center justify-start gap-4 transition-all duration-200",
              effectivelyOpen ? "p-2" : "justify-center"
            )}
          >
            <Avatar className="size-8 shrink-0 border-2 border-background shadow-sm">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <AnimatePresence>
              {effectivelyOpen && (
                <motion.div
                  variants={textVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="flex flex-1 items-center justify-between overflow-hidden text-left"
                >
                  <div className="flex flex-col justify-center overflow-hidden">
                    <p className="truncate text-[11px] font-black uppercase leading-tight tracking-tight">{displayName}</p>
                    <p className="truncate text-[10px] text-muted-foreground leading-none font-bold">{displayUid}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
