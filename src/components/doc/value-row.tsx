import type { ComponentType, ReactNode } from "react";
import styles from "./value-row.module.css";

export function ValueRow({ children }: { children: ReactNode }) {
  return <div className={styles.row}>{children}</div>;
}

export function ValueCard({
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
      <div className={styles.icon}>
        <Icon size={28} style={iconColor ? { color: iconColor } : undefined} />
      </div>
      <div className={styles.label}>
        <strong>{title}</strong>
        {children}
      </div>
    </div>
  );
}
