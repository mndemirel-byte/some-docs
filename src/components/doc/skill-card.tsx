import type { ReactNode } from "react";
import styles from "./skill-card.module.css";

export function SkillCols({ children }: { children: ReactNode }) {
  return <div className={styles.cols}>{children}</div>;
}

export function SkillCol({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.col}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}
