"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import styles from "./challenge-card.module.css";

export function ChallengeCard({
  num,
  title,
  children,
}: {
  num: number;
  title: ReactNode;
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
        <div className={styles.num}>{num}</div>
        <div className={styles.title}>{title}</div>
        <IconChevronDown
          className={`${styles.toggleIcon} ${open ? styles.toggleIconOpen : ""}`}
        />
      </button>
      {open ? <div className={styles.body}>{children}</div> : null}
    </div>
  );
}
