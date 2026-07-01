import type { ReactNode } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import styles from "./anti-pattern-row.module.css";

export function AntiPatternRow({
  avoidLabel,
  preferLabel,
  avoid,
  prefer,
}: {
  avoidLabel: string;
  preferLabel: string;
  avoid: ReactNode;
  prefer: ReactNode;
}) {
  return (
    <div className={styles.row}>
      <div className={styles.avoid}>
        <div className={styles.label}>
          <IconX size={12} /> {avoidLabel}
        </div>
        <div className={styles.code}>{avoid}</div>
      </div>
      <div className={styles.prefer}>
        <div className={styles.label}>
          <IconCheck size={12} /> {preferLabel}
        </div>
        <div className={styles.code}>{prefer}</div>
      </div>
    </div>
  );
}
