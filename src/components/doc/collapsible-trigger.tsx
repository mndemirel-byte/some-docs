import type { ReactNode } from "react";
import styles from "./collapsible-trigger.module.css";

const BADGE_CLASS = {
  skill: styles.badgeSkill,
  agent: styles.badgeAgent,
  docs: styles.badgeDocs,
} as const;

export function CollapsibleTrigger({
  badge,
  badgeKind,
  name,
  description,
}: {
  badge: ReactNode;
  badgeKind: "skill" | "agent" | "docs";
  name: ReactNode;
  description: ReactNode;
}) {
  return (
    <div className={styles.left}>
      <span className={`${styles.badge} ${BADGE_CLASS[badgeKind]}`}>
        {badge}
      </span>
      <div>
        <div className={styles.name}>{name}</div>
        <div className={styles.desc}>{description}</div>
      </div>
    </div>
  );
}
