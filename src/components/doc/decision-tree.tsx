import type { ReactNode } from "react";
import styles from "./decision-tree.module.css";

export function DecisionTree({ children }: { children: ReactNode }) {
  return <div className={styles.tree}>{children}</div>;
}

export function DecisionQuestion({ children }: { children: ReactNode }) {
  return <div className={styles.question}>{children}</div>;
}
