"use client";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() { const { theme, setTheme } = useTheme(); const mounted = useSyncExternalStore(() => () => { }, () => true, () => false); if (!mounted) return <div className="h-10 w-10 rounded-full border border-zinc-200 dark:border-zinc-800" />; const dark = theme === "dark"; return <button aria-label="Toggle theme" onClick={() => setTheme(dark ? "light" : "dark")} className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>; }
