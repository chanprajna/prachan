"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark"
    setIsDark(!isDark)
    
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-8 h-8 px-0 rounded-full text-stone-500 hover:text-zen-green dark:text-stone-400 dark:hover:text-zen-green"
      onClick={toggleTheme}
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark ? '-rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
      <span className="sr-only">切換深色模式</span>
    </Button>
  )
}
