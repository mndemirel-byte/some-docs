"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import styles from "./collapsible-card.module.css";

const BADGE_CLASS = {
  skill: styles.badgeSkill,
  agent: styles.badgeAgent,
  docs: styles.badgeDocs,
} as const;

export function CollapsibleCard({
  badge,
  badgeKind,
  name,
  description,
  children,
}: {
  badge: ReactNode;
  badgeKind: "skill" | "agent" | "docs";
  name: ReactNode;
  description: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.card}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <div className={styles.left}>
          <span className={`${styles.badge} ${BADGE_CLASS[badgeKind]}`}>
            {badge}
          </span>
          <div>
            <div className={styles.name}>{name}</div>
            <div className={styles.desc}>{description}</div>
          </div>
        </div>
        <IconChevronDown
          className={`${styles.toggleIcon} ${open ? styles.toggleIconOpen : ""}`}
        />
      </button>
      {open ? <div className={styles.body}>{children}</div> : null}
    </div>
  );
}
