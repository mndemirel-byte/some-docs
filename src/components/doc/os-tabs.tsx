"use client";

import { Children, type ReactNode, useState } from "react";
import styles from "./os-tabs.module.css";

export function OsTabs({
  tabs,
  children,
}: {
  tabs: { id: string; label: ReactNode }[];
  children: ReactNode;
}) {
  const [active, setActive] = useState(tabs[0]?.id);
  const panels = Children.toArray(children);
  const activeIndex = tabs.findIndex((tab) => tab.id === active);

  return (
    <div>
      <div className={styles.bar}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab} ${tab.id === active ? styles.active : ""}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {panels[activeIndex]}
    </div>
  );
}
