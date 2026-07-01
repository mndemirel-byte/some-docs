import type { ReactNode } from "react";
import styles from "./simple-principle-grid.module.css";

export function SimplePrincipleGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function SimplePrincipleCard({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{title}</h4>
      <div>{children}</div>
    </div>
  );
}
