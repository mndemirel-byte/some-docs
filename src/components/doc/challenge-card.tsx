import type { ReactNode } from "react";
import { Disclosure } from "./disclosure";
import styles from "./challenge-card.module.css";

export function ChallengeCard({
  num,
  title,
  children,
}: {
  num: number;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <Disclosure
      trigger={
        <>
          <div className={styles.num}>{num}</div>
          <div className={styles.title}>{title}</div>
        </>
      }
      className={styles.card}
      triggerClassName={styles.header}
      contentClassName={styles.body}
      iconClassName={styles.toggleIcon}
      iconOpenClassName={styles.toggleIconOpen}
    >
      {children}
    </Disclosure>
  );
}
