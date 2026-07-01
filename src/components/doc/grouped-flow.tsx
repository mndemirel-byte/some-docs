import type { ComponentType, ReactNode } from "react";
import { IconArrowDown } from "@tabler/icons-react";
import styles from "./grouped-flow.module.css";

const TONE_CLASS = {
  once: styles.once,
  each: styles.each,
  when: styles.when,
} as const;

export function GroupedFlowPhase({
  icon: Icon,
  tone,
  title,
  children,
}: {
  icon: ComponentType<{ size?: number }>;
  tone: keyof typeof TONE_CLASS;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.phase}>
      <div className={`${styles.head} ${TONE_CLASS[tone]}`}>
        <Icon size={16} />
        <span>{title}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export function GroupedFlowStep({
  marker,
  title,
  children,
}: {
  marker: ReactNode;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.step}>
      <span className={styles.arrow}>{marker}</span>
      <div className={styles.content}>
        <strong>{title}</strong>
        <div>{children}</div>
      </div>
    </div>
  );
}

export function FlowConnector() {
  return (
    <div className={styles.connector}>
      <IconArrowDown size={18} style={{ margin: "0 auto" }} />
    </div>
  );
}
