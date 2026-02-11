"use client";

import React from "react";

export const DarkModeToggle: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const theme = stored || (systemPrefersDark ? "dark" : "light");
      setIsDark(theme === "dark");
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      try {
        if (next) {
          document.documentElement.classList.add("dark");
          window.localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          window.localStorage.setItem("theme", "light");
        }
      } catch {
        // ignore
      }
      return next;
    });
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle dark mode"
        className="h-9 w-9 shrink-0 cursor-default rounded-full border border-black/25 bg-white/70 dark:border-white/40 dark:bg-black/40"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/25 bg-white/70 text-[0.65rem] font-medium text-black/80 transition hover:border-black hover:bg-white dark:border-white/40 dark:bg-black/40 dark:text-white/90 dark:hover:border-white dark:hover:bg-black/60"
    >
      {isDark ? "☾" : "☼"}
    </button>
  );
};

