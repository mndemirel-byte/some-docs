import type { ComponentType, ReactNode } from "react";
import styles from "./two-col-grid.module.css";

export function TwoColGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function GridCard({
  icon: Icon,
  iconColor,
  title,
  children,
}: {
  icon: ComponentType<{ size?: number; style?: React.CSSProperties }>;
  iconColor?: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>
        <Icon size={16} style={iconColor ? { color: iconColor } : undefined} />
        {title}
      </h4>
      {children}
    </div>
  );
}
