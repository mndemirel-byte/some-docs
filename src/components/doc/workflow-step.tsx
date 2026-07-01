import type { ReactNode } from "react";
import styles from "./workflow-step.module.css";

export function WorkflowStep({
  num,
  title,
  children,
}: {
  num: number;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.step}>
      <div className={styles.num}>{num}</div>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{children}</div>
      </div>
    </div>
  );
}
