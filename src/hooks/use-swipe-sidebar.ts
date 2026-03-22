import { useEffect } from "react"
import { useSidebar } from "@/components/ui/sidebar"

export function useSwipeSidebar() {
  const { open, toggleSidebar, isMobile } = useSidebar()

  useEffect(() => {
    if (!isMobile) return

    let startX = 0
    let startY = 0

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX
      const dy = Math.abs(e.changedTouches[0].clientY - startY)
      // Only trigger if: started within 20px of left edge, swiped right 60px+,
      // didn't drift vertically more than 80px, and sidebar is currently closed
      if (startX < 20 && dx > 60 && dy < 80 && !open) {
        toggleSidebar()
      }
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [isMobile, open, toggleSidebar])
}
