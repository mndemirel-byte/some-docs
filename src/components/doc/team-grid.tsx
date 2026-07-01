import type { ComponentType, ReactNode } from "react";
import styles from "./team-grid.module.css";

export function TeamGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function TeamCard({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<{ size?: number }>;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>
        <Icon size={14} />
        {title}
      </h4>
      <div>{children}</div>
    </div>
  );
}
