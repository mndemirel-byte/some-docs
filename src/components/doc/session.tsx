import type { ReactNode } from "react";
import { IconRobot, IconUser } from "@tabler/icons-react";
import styles from "./session.module.css";

export function Session({ children }: { children: ReactNode }) {
  return <div className={styles.session}>{children}</div>;
}

export function DevTurn({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.turn}>
      <div className={`${styles.label} ${styles.dev}`}>
        <IconUser size={12} /> {label}
      </div>
      {children}
    </div>
  );
}

export function AiTurn({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.turn}>
      <div className={`${styles.label} ${styles.ai}`}>
        <IconRobot size={12} /> {label}
      </div>
      {children}
    </div>
  );
}
