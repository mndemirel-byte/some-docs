import type { ComponentType, ReactNode } from "react";
import styles from "./playbook.module.css";

export function Playbook({
  icon: Icon,
  iconColor,
  title,
  steps,
}: {
  icon: ComponentType<{ size?: number; style?: React.CSSProperties }>;
  iconColor?: string;
  title: ReactNode;
  steps: ReactNode[];
}) {
  return (
    <div className={styles.playbook}>
      <div className={styles.title}>
        <Icon size={16} style={iconColor ? { color: iconColor } : undefined} />
        {title}
      </div>
      <ul className={styles.steps}>
        {steps.map((step, index) => (
          <li key={index}>
            <span className={styles.num}>{index + 1}</span>
            <span className={styles.text}>{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
