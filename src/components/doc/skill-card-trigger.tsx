import type { ReactNode } from "react";
import styles from "./skill-card.module.css";

const LETTER_CLASS = {
  A: styles.letterA,
  B: styles.letterB,
  C: styles.letterC,
  D: styles.letterD,
  E: styles.letterE,
} as const;

export function SkillCardTrigger({
  letter,
  name,
  goal,
  prereq,
}: {
  letter: keyof typeof LETTER_CLASS;
  name: ReactNode;
  goal: ReactNode;
  prereq: ReactNode;
}) {
  return (
    <>
      <div className={`${styles.letter} ${LETTER_CLASS[letter]}`}>
        {letter}
      </div>
      <div className={styles.meta}>
        <div className={styles.name}>{name}</div>
        <div className={styles.goal}>{goal}</div>
      </div>
      <span className={styles.prereq}>{prereq}</span>
    </>
  );
}
