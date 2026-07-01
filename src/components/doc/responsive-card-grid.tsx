import type { ComponentType, ReactNode } from "react";
import styles from "./responsive-card-grid.module.css";

export function ResponsiveCardGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function ResponsiveCard({
  icon: Icon,
  name,
  children,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  name: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.card}>
      <Icon size={20} className={styles.icon} />
      <div className={styles.name}>{name}</div>
      <div className={styles.desc}>{children}</div>
    </div>
  );
}
