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
  RefreshCw,
  CornerDownLeft,
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
  onRefreshSession?: () => void | Promise<void>;
  refreshingSession?: boolean;
  showRefreshHint?: boolean;
  onDismissRefreshHint?: () => void;
}

export function SessionNavBar({
  isPinned = true,
  onHoverChange,
  className,
  onRefreshSession,
  refreshingSession = false,
  showRefreshHint = false,
  onDismissRefreshHint,
}: SessionNavBarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hintVisible, setHintVisible] = useState(showRefreshHint);
  const [hintPulsing, setHintPulsing] = useState(showRefreshHint);
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

  useEffect(() => {
    setHintVisible(showRefreshHint);
    setHintPulsing(showRefreshHint);
  }, [showRefreshHint]);

  useEffect(() => {
    if (!showRefreshHint) return;

    const timerId = window.setTimeout(() => {
      setHintPulsing(false);
    }, 3600);

    return () => window.clearTimeout(timerId);
  }, [showRefreshHint]);

  const dismissHint = () => {
    setHintVisible(false);
    setHintPulsing(false);
    onDismissRefreshHint?.();
  };

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
        <div className="relative mt-auto flex flex-col border-t bg-muted/20 p-3 overflow-visible">
          <AnimatePresence>
            {hintVisible && effectivelyOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute bottom-[4.4rem] left-3 right-3 z-20"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-background/80 p-3 shadow-xl shadow-black/10 backdrop-blur-md dark:border-white/5 dark:bg-zinc-950/75">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/10 pointer-events-none" />
                  <div className="absolute -bottom-2 left-5 text-primary/80">
                    <CornerDownLeft className="h-4 w-4" />
                  </div>
                  <div className="relative flex items-start gap-3">
                    <div
                      className={cn(
                        "relative mt-1.5 size-2.5 shrink-0 rounded-full bg-primary",
                        hintPulsing && "after:absolute after:inset-0 after:rounded-full after:bg-primary/40 after:animate-ping after:content-['']"
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">Refresh Session</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        Reconnects ERP automatically if session expires.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={dismissHint}
                          className="h-8 rounded-full px-3 text-xs font-semibold"
                        >
                          Got it
                        </Button>
                        <span className="text-[11px] text-muted-foreground">
                          Click refresh to dismiss too.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Refresh Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              dismissHint();
              onRefreshSession?.();
            }}
            disabled={refreshingSession || !onRefreshSession}
            className={cn(
              "relative mb-2 w-full justify-start gap-4 px-3 text-primary hover:bg-primary/10 hover:text-primary transition-all overflow-visible",
              hintVisible && effectivelyOpen && "ring-1 ring-primary/35 shadow-[0_0_0_8px_rgba(59,130,246,0.08)]",
              hintPulsing && effectivelyOpen && "animate-[pulse_1.8s_ease-in-out_infinite]",
              !effectivelyOpen && "justify-center px-0"
            )}
          >
            {hintVisible && effectivelyOpen && (
              <span className="absolute inset-0 rounded-md bg-primary/10 blur-md" aria-hidden="true" />
            )}
            <RefreshCw className={cn("size-5 shrink-0", refreshingSession && "animate-spin")} />
            <AnimatePresence>
              {effectivelyOpen && (
                <motion.span
                  variants={textVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="text-[13px] font-bold tracking-tight"
                >
                  Refresh Session
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

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
