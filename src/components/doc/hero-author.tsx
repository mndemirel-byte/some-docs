import type { ComponentType, ReactNode } from "react";
import styles from "./hero-author.module.css";

export function HeroAuthor({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ size?: number }>;
  children: ReactNode;
}) {
  return (
    <div className={styles.author}>
      <Icon size={16} />
      <div>{children}</div>
    </div>
  );
}
