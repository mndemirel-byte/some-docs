import type { ReactNode } from "react";
import styles from "./key-quote.module.css";

export function KeyQuote({ children }: { children: ReactNode }) {
  return (
    <div className={styles.quote}>
      <div>{children}</div>
    </div>
  );
}
