import * as React from "react"

type Theme = "light" | "dark" | "system"

const STORAGE_KEY = "ui-theme"

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme
  document.documentElement.classList.toggle("dark", resolved === "dark")
}

export function useTheme() {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as Theme) ?? "system"
    } catch {
      return "system"
    }
  })

  React.useEffect(() => {
    applyTheme(theme)
  }, [theme])

  React.useEffect(() => {
    if (theme !== "system") return
    const mql = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => applyTheme("system")
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [theme])

  const setTheme = React.useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
    setThemeState(next)
  }, [])

  const resolvedTheme: "light" | "dark" =
    theme === "system" ? getSystemTheme() : theme

  return { theme, resolvedTheme, setTheme }
}
