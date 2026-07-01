"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, THEMES, isTheme, type Theme } from "./theme";
import styles from "./switcher.module.css";

const LABELS: Record<Theme, string> = {
  anthropic: "LIGHT",
  "bright-saas": "DARK",
};

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getSnapshot(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(stored) ? stored : DEFAULT_THEME;
}

function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

export function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function selectTheme(next: Theme) {
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    // localStorage writes don't fire a "storage" event in the tab that made
    // them (only in other tabs), so dispatch one to update this component.
    window.dispatchEvent(new StorageEvent("storage"));
  }

  return (
    <div className={styles.row}>
      {THEMES.map((candidate) =>
        candidate === theme ? (
          <span key={candidate} className={`${styles.button} ${styles.active}`}>
            {LABELS[candidate]}
          </span>
        ) : (
          <button
            key={candidate}
            type="button"
            className={styles.button}
            onClick={() => selectTheme(candidate)}
          >
            {LABELS[candidate]}
          </button>
        ),
      )}
    </div>
  );
}
