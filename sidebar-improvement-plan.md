# Sidebar UI/UX Improvement Plan
**Project:** Loyola ERP Student Portal  
**Scope:** `app-sidebar.tsx`, `DashboardLayout.tsx`, new hook  
**Goal:** Bigger tap targets · Hamburger icon · Swipe-to-open · Subtle animations

---

## What's Being Fixed

| # | Problem | Fix |
|---|---------|-----|
| 1 | Menu buttons too small (≈36px) | Enforce 44px min-height on every nav button |
| 2 | Buttons feel static, no feedback | Subtle hover bg fade + icon scale micro-animation |
| 3 | Active item not obvious enough | Left-border accent + icon color on active route |
| 4 | Sidebar trigger shows panel icon | Replace with `Menu` icon (☰) from lucide-react |
| 5 | No way to swipe open on mobile | Lightweight swipe-from-left-edge hook, zero deps |

---

## Files Touched

```
src/
├── components/
│   ├── app-sidebar.tsx        ← button sizing, active state, animations
│   └── DashboardLayout.tsx    ← hamburger trigger swap + mount swipe hook
└── hooks/
    └── use-swipe-sidebar.ts   ← new file: edge-swipe gesture (mobile only)
```

---

## Animation Rules (subtle, never slow)

- All transitions: `duration-150` or `duration-200` max
- Easing: `ease-in-out` everywhere
- Hover: icon scales to `1.1×`, background fades in
- Active: instant left-border + primary color, no delay
- Swipe hook: zero visual animation — purely functional trigger

---

## Constraints

- No new npm packages
- No changes to shadcn `ui/sidebar.tsx` primitives
- Swipe only activates on mobile (`isMobile` from `useSidebar`)
- Swipe zone: left 20px of screen, min 60px horizontal, max 80px vertical drift

---

---

```
I'm working on a React + TypeScript + Tailwind CSS + shadcn/ui project.
It's a student ERP portal (monorepo). The frontend is in the root `src/` folder.

Make ALL of the following changes in a single pass. Touch only the files listed.
Do not change any shadcn primitive files inside `src/components/ui/`.

---

### TASK 1 — app-sidebar.tsx
File: `src/components/app-sidebar.tsx`

1. Inside the `items.map(...)` block, update `SidebarMenuButton` with these changes:
   - Add `min-h-[44px] py-2 text-sm` for proper mobile tap target size
   - Add `transition-all duration-150 ease-in-out` for smooth state transitions
   - For the active border accent, add:
     `data-[active=true]:border-l-2 data-[active=true]:border-primary data-[active=true]:pl-[calc(0.5rem-2px)]`
     This offsets padding by 2px to compensate for the border so layout doesn't shift.

2. On the `<item.icon />` element inside the map, replace the plain `<item.icon />` with:
   ```tsx
   <item.icon className="size-4 shrink-0 transition-transform duration-150 ease-in-out group-hover:scale-110 group-data-[active=true]:text-primary" />
   ```

3. Do NOT change SidebarHeader, SidebarFooter, SidebarRail, the profile data fetching,
   the logout handler, or the items array.

---

### TASK 2 — use-swipe-sidebar.ts (NEW FILE)
Create this file at `src/hooks/use-swipe-sidebar.ts`:

```ts
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
```

---

### TASK 3 — DashboardLayout.tsx
File: `src/components/DashboardLayout.tsx`

1. Import the new hook and the Menu icon at the top:
   ```tsx
   import { Menu } from "lucide-react"
   import { useSwipeSidebar } from "@/hooks/use-swipe-sidebar"
   import { useSidebar } from "@/components/ui/sidebar"
   ```
   (If `useSidebar` is already imported, do not duplicate it.)

2. Inside the layout component body, call the hook:
   ```tsx
   useSwipeSidebar()
   ```

3. Find the existing `<SidebarTrigger>` (or whatever button currently toggles the sidebar).
   Replace it entirely with:
   ```tsx
   const { toggleSidebar } = useSidebar()
   // ...
   <button
     onClick={toggleSidebar}
     className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
     aria-label="Toggle sidebar"
   >
     <Menu className="size-5" />
   </button>
   ```

4. Remove the `SidebarTrigger` import from shadcn if it is no longer used anywhere.

5. Do not change anything else in this file — routing, layout structure, other imports stay as-is.

---

### After making all changes:
- Run `npx tsc --noEmit` and fix any type errors before finishing.
- Do not install any new npm packages.
- Do not modify any file inside `src/components/ui/`.
- Show me a summary of every line changed per file when done.
```
