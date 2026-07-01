import styles from "./terminal.module.css";

export function Terminal({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  return (
    <div className={styles.terminal}>
      <div className={styles.head}>
        <div className={styles.dots}>
          <div className={`${styles.dot} ${styles.dotRed}`} />
          <div className={`${styles.dot} ${styles.dotYellow}`} />
          <div className={`${styles.dot} ${styles.dotGreen}`} />
        </div>
        <div className={styles.label}>{label}</div>
      </div>
      <pre className={styles.pre}>{children.trim()}</pre>
    </div>
  );
}
