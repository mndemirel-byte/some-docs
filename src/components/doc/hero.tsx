import type { ReactNode } from "react";
import styles from "./hero.module.css";

export function Hero({
  badge,
  variant = "pill",
  title,
  description,
  tags,
}: {
  badge: ReactNode;
  variant?: "pill" | "eyebrow";
  title: ReactNode;
  description: ReactNode;
  tags: string[];
}) {
  return (
    <div className={styles.hero}>
      <div className={variant === "pill" ? styles.badge : styles.eyebrow}>
        {badge}
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Accent({ children }: { children: ReactNode }) {
  return <span className={styles.titleAccent}>{children}</span>;
}
