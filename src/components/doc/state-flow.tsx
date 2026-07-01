import type { ReactNode } from "react";
import styles from "./state-flow.module.css";

const TONE_CLASS = {
  start: styles.start,
  mid: styles.mid,
  ok: styles.ok,
  hold: styles.hold,
  end: styles.end,
} as const;

export function StateFlow({ children }: { children: ReactNode }) {
  return <div className={styles.flow}>{children}</div>;
}

export function State({
  tone,
  children,
}: {
  tone: keyof typeof TONE_CLASS;
  children: ReactNode;
}) {
  return (
    <span className={`${styles.state} ${TONE_CLASS[tone]}`}>{children}</span>
  );
}

export function StateArrow({ children = "→" }: { children?: ReactNode }) {
  return <span className={styles.arrow}>{children}</span>;
}
