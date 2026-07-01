import type { ReactNode } from "react";
import styles from "./two-box-grid.module.css";

const TONE_CLASS = {
  red: styles.red,
  green: styles.green,
  blue: styles.blue,
  neutral: styles.neutral,
} as const;

export function TwoBoxGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function Box({
  tone,
  label,
  children,
}: {
  tone: keyof typeof TONE_CLASS;
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.box} ${TONE_CLASS[tone]}`}>
      <div className={styles.label}>{label}</div>
      {children}
    </div>
  );
}
