import type { ReactNode } from "react";
import styles from "./page-wrap.module.css";

export function PageWrap({ children }: { children: ReactNode }) {
  return <div className={styles.wrap}>{children}</div>;
}
