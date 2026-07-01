import type { ComponentType, ReactNode } from "react";
import styles from "./section-skill-card.module.css";

export function SectionSkillGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function SectionSkillCard({
  icon: Icon,
  name,
  when,
  children,
}: {
  icon: ComponentType<{ size?: number }>;
  name: ReactNode;
  when: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <div className={styles.icon}>
          <Icon size={18} />
        </div>
        <div>
          <h4 className={styles.name}>{name}</h4>
          <div className={styles.when}>{when}</div>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
