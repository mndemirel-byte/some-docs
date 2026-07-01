import type { ReactNode } from "react";
import styles from "./numbered-grid.module.css";

export function NumberedGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function NumberedItem({
  num,
  wide,
  children,
}: {
  num: number;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.item} ${wide ? styles.wide : ""}`}>
      <span className={styles.num}>{num}</span>
      <span className={styles.text}>{children}</span>
    </div>
  );
}
