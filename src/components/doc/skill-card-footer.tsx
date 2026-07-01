import type { ReactNode } from "react";
import { IconUsers } from "@tabler/icons-react";
import styles from "./skill-card.module.css";

export function SkillCardFooter({ forWho }: { forWho: ReactNode }) {
  return (
    <div>
      <span className={styles.forBadge}>
        <IconUsers size={12} /> Who it&apos;s for
      </span>
      <span className={styles.forText}> {forWho}</span>
    </div>
  );
}
