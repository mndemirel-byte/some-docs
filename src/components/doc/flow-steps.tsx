import type { ReactNode } from "react";
import styles from "./flow-steps.module.css";

export function FlowSteps({ children }: { children: ReactNode }) {
  return <ul className={styles.list}>{children}</ul>;
}

export function FlowStep({
  num,
  title,
  children,
}: {
  num: number;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className={styles.step}>
      <div className={styles.num}>{num}</div>
      <div className={styles.body}>
        <h4>{title}</h4>
        {children}
      </div>
    </li>
  );
}
