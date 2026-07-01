import type { ReactNode } from "react";
import styles from "./section.module.css";

export function Section({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num?: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.section} id={id}>
      <div className={styles.head}>
        {num ? <span className={styles.num}>{num}</span> : null}
        <h2 className={styles.title}>{title}</h2>
      </div>
      {children}
    </div>
  );
}
