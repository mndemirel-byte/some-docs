import type { ComponentType, ReactNode } from "react";
import styles from "./principles-grid.module.css";

export function PrinciplesGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function PrincipleCard({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>
        <Icon size={16} className={styles.icon} />
        {title}
      </h4>
      <div className={styles.desc}>{children}</div>
    </div>
  );
}
