import type { ComponentType, CSSProperties, ReactNode } from "react";
import styles from "./info-card.module.css";

export function CardGrid({
  children,
  columns = "auto",
  spacing = "compact",
}: {
  children: ReactNode;
  columns?: "auto" | "two" | "one" | "three";
  spacing?: "compact" | "cozy";
}) {
  let className = styles.grid;
  if (columns === "two") {
    className = spacing === "cozy" ? styles.gridTwoCozy : styles.gridTwo;
  } else if (columns === "one") {
    className = styles.gridOne;
  } else if (columns === "three") {
    className = styles.gridThree;
  }

  return <div className={className}>{children}</div>;
}

export function InfoCard({
  icon: Icon,
  iconColor,
  title,
  meta,
  children,
  variant = "stacked",
}: {
  icon: ComponentType<{
    size?: number;
    className?: string;
    style?: CSSProperties;
  }>;
  iconColor?: string;
  title: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  variant?: "stacked" | "inline" | "caption" | "boxed" | "stat";
}) {
  const iconStyle = iconColor ? { color: iconColor } : undefined;

  if (variant === "stat") {
    return (
      <div className={styles.cardStat}>
        <div className={styles.iconStat}>
          <Icon size={28} style={iconStyle} />
        </div>
        <div className={styles.labelStat}>
          <strong>{title}</strong>
          {children}
        </div>
      </div>
    );
  }

  if (variant === "boxed") {
    return (
      <div className={styles.cardBoxed}>
        <div className={styles.headBoxed}>
          <div className={styles.iconBoxed}>
            <Icon size={18} />
          </div>
          <div>
            <h4 className={styles.titleBoxed}>{title}</h4>
            {meta ? <div className={styles.metaBoxed}>{meta}</div> : null}
          </div>
        </div>
        <div className={styles.bodyBoxed}>{children}</div>
      </div>
    );
  }

  if (variant === "caption") {
    return (
      <div className={styles.cardCaption}>
        <h4 className={styles.titleCaption}>
          <Icon size={16} style={iconStyle} />
          {title}
        </h4>
        {children}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={styles.cardInline}>
        <h4 className={styles.titleInline}>
          <Icon size={16} className={styles.iconInline} style={iconStyle} />
          {title}
        </h4>
        <div className={styles.desc}>{children}</div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <Icon size={20} className={styles.icon} style={iconStyle} />
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{children}</div>
    </div>
  );
}
