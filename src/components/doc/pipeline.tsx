import type { ComponentType } from "react";
import { Fragment } from "react";
import styles from "./pipeline.module.css";

export function Pipeline({
  nodes,
}: {
  nodes: { icon: ComponentType<{ size?: number }>; label: string }[];
}) {
  return (
    <div className={styles.pipeline}>
      {nodes.map((node, index) => (
        <Fragment key={node.label}>
          {index > 0 ? <span className={styles.arrow}>→</span> : null}
          <div className={styles.node}>
            <div className={styles.dot}>
              <node.icon size={20} />
            </div>
            <div className={styles.label}>{node.label}</div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
