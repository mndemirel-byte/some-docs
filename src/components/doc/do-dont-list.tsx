import type { ReactNode } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import styles from "./do-dont-list.module.css";

export function DoDontList({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function DoItem({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.card} ${styles.do}`}>
      <div className={styles.icon}>
        <IconCheck size={14} />
      </div>
      <div className={styles.body}>
        <h4>{title}</h4>
        {children}
      </div>
    </div>
  );
}

export function DontItem({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.card} ${styles.dont}`}>
      <div className={styles.icon}>
        <IconX size={14} />
      </div>
      <div className={styles.body}>
        <h4>{title}</h4>
        {children}
      </div>
    </div>
  );
}
