import type { ReactNode } from "react";
import styles from "./cmd.module.css";

export function Cmd({ children }: { children: ReactNode }) {
  return <span className={styles.cmd}>{children}</span>;
}
