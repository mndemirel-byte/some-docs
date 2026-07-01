"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { IconChevronDown, IconUsers } from "@tabler/icons-react";
import styles from "./skill-card.module.css";

const LETTER_CLASS = {
  A: styles.letterA,
  B: styles.letterB,
  C: styles.letterC,
  D: styles.letterD,
  E: styles.letterE,
} as const;

export function SkillCard({
  id,
  letter,
  name,
  goal,
  prereq,
  forWho,
  children,
}: {
  id: string;
  letter: keyof typeof LETTER_CLASS;
  name: ReactNode;
  goal: ReactNode;
  prereq: ReactNode;
  forWho: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.card} id={id}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <div className={`${styles.letter} ${LETTER_CLASS[letter]}`}>
          {letter}
        </div>
        <div className={styles.meta}>
          <div className={styles.name}>{name}</div>
          <div className={styles.goal}>{goal}</div>
        </div>
        <span className={styles.prereq}>{prereq}</span>
        <IconChevronDown
          className={`${styles.toggleIcon} ${open ? styles.toggleIconOpen : ""}`}
        />
      </button>
      {open ? (
        <div className={styles.body}>
          {children}
          <div>
            <span className={styles.forBadge}>
              <IconUsers size={12} /> Who it&apos;s for
            </span>
            <span className={styles.forText}> {forWho}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function SkillCols({ children }: { children: ReactNode }) {
  return <div className={styles.cols}>{children}</div>;
}

export function SkillCol({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.col}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}
