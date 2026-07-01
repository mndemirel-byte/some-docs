"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import styles from "./expandable-example.module.css";

export function ExpandableExample({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.button}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{label}</span>
        <IconChevronDown
          className={`${styles.toggleIcon} ${open ? styles.toggleIconOpen : ""}`}
        />
      </button>
      {open ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
}
