import type { ComponentType, ReactNode } from "react";
import { IconAlertCircle } from "@tabler/icons-react";
import styles from "./callout.module.css";

const KIND_CLASS = {
  accent: "",
  info: styles.info,
  tip: styles.tip,
  warning: styles.warning,
} as const;

export function Callout({
  icon: Icon = IconAlertCircle,
  kind = "accent",
  children,
}: {
  icon?: ComponentType<{ size?: number; className?: string }>;
  kind?: keyof typeof KIND_CLASS;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.callout} ${KIND_CLASS[kind]}`}>
      <Icon size={16} className={styles.icon} />
      <div>{children}</div>
    </div>
  );
}
