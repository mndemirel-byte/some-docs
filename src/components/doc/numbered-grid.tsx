import type { ReactNode } from "react";
import styles from "./numbered-grid.module.css";

export function NumberedGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function NumberedItem({
  num,
  marker,
  wide,
  children,
}: {
  num?: number;
  marker?: ReactNode;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.item} ${wide ? styles.wide : ""}`}>
      <span className={styles.num}>{marker ?? num}</span>
      <span className={styles.text}>{children}</span>
    </div>
  );
}
