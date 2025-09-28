import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("theme") as Theme | null;
      if (stored) return stored;

      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  const [hasUserPreference, setHasUserPreference] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("theme") !== null;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (hasUserPreference) {
      sessionStorage.setItem("theme", theme);
    }
  }, [theme, hasUserPreference]);

  const toggleTheme = () => {
    setHasUserPreference(true);
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}
