import type { ReactNode } from "react";
import { Fragment } from "react";
import styles from "./formula.module.css";

export function Formula({ nodes }: { nodes: ReactNode[] }) {
  return (
    <div className={styles.formula}>
      {nodes.map((node, index) => (
        <Fragment key={index}>
          {index > 0 ? <span className={styles.arrow}>→</span> : null}
          <div className={styles.node}>{node}</div>
        </Fragment>
      ))}
    </div>
  );
}
