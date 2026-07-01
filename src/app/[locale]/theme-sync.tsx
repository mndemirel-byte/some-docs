"use client";

import { useEffect } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, isTheme } from "./theme";

export function ThemeSync() {
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    document.documentElement.setAttribute(
      "data-theme",
      isTheme(stored) ? stored : DEFAULT_THEME,
    );
  }, []);

  return null;
}
