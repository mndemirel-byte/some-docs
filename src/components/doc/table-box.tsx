import type { ComponentType, ReactNode } from "react";
import styles from "./table-box.module.css";

const TONE_CLASS = {
  green: styles.green,
  amber: styles.amber,
} as const;

export function TableBox({
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
    <div className={styles.box}>
      <div className={`${styles.title} ${TONE_CLASS[tone]}`}>
        <Icon size={16} />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
