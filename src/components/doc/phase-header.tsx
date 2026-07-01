import type { ReactNode } from "react";
import styles from "./phase-header.module.css";

export function Phase({
  id,
  num,
  title,
  subtitle,
  optionalLabel,
  children,
}: {
  id: string;
  num: number | string;
  title: ReactNode;
  subtitle: ReactNode;
  optionalLabel?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.phase} id={id}>
      <div className={styles.head}>
        <div className={styles.num}>{num}</div>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.sub}>
            {subtitle}
            {optionalLabel ? (
              <span className={styles.optionalBadge}>{optionalLabel}</span>
            ) : null}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
