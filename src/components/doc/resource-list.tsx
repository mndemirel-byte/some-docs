import type { ComponentType, ReactNode } from "react";
import styles from "./resource-list.module.css";

export function ResourceList({ children }: { children: ReactNode }) {
  return <ul className={styles.list}>{children}</ul>;
}

export function ResourceItem({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <li>
      <Icon size={16} className={styles.icon} />
      <div>
        <strong>{title}</strong>
        <br />
        <div className={styles.caption}>{children}</div>
      </div>
    </li>
  );
}
