"use client"

import { useEffect, useState, useRef, useCallback } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TimerReset, LogOut } from "lucide-react";
import { authApi } from "@/lib/api";

// 18 Minutes
const IDLE_TIMEOUT_MS = 18 * 60 * 1000; 

export function SessionAlert() {
  const [open, setOpen] = useState(false);
  const lastActivity = useRef<number>(Date.now());

  const showSessionModal = useCallback(() => {
    if (!window.location.pathname.includes('/login') && !open) {
        setOpen(true);
    }
  }, [open]);

  // 1. Idle Detection
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
    const resetTimer = () => { lastActivity.current = Date.now(); };

    const intervalId = setInterval(() => {
        const now = Date.now();
        if (now - lastActivity.current >= IDLE_TIMEOUT_MS) {
            showSessionModal();
        }
    }, 60 * 1000); 

    events.forEach(event => document.addEventListener(event, resetTimer));

    return () => {
        clearInterval(intervalId);
        events.forEach(event => document.removeEventListener(event, resetTimer));
    };
  }, [showSessionModal]);

  // 2. Network 401 Listener
  useEffect(() => {
    const handleAuthEvent = () => showSessionModal();
    window.addEventListener("auth:session-expired", handleAuthEvent);
    return () => window.removeEventListener("auth:session-expired", handleAuthEvent);
  }, [showSessionModal]);

  const handleReLogin = () => {
    setOpen(false);
    authApi.logout(); 
  };

  return (
    <AlertDialog open={open}>
      {/* Removed onPointerDownOutside prop to fix TypeScript error. 
          AlertDialog blocks outside clicks by default. */}
      <AlertDialogContent className="z-[5000]">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 mb-2">
            <div className="p-2 rounded-full bg-amber-50 dark:bg-amber-900/20">
                <TimerReset className="h-6 w-6" />
            </div>
            <AlertDialogTitle>Session Expired</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base text-foreground/80 leading-relaxed">
            You have been inactive for a while. For your security, the university system automatically closes sessions.
            <br/><br/>
            Please sign in again to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={handleReLogin}
            className="bg-primary hover:bg-primary/90 text-black font-medium gap-2"
          >
            <LogOut className="h-4 w-4" /> 
            Login Again
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}