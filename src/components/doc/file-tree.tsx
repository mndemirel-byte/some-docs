import type { ReactNode } from "react";
import {
  IconFileCode,
  IconFileDescription,
  IconFileText,
  IconFolder,
  IconFolderOpen,
} from "@tabler/icons-react";
import styles from "./file-tree.module.css";

export function FileTree({ children }: { children: ReactNode }) {
  return <ul className={styles.tree}>{children}</ul>;
}

export function Dir({
  name,
  root,
  children,
}: {
  name: ReactNode;
  root?: boolean;
  children?: ReactNode;
}) {
  const Icon = root ? IconFolderOpen : IconFolder;
  return (
    <li>
      <span className={styles.row}>
        <Icon className={`${styles.icon} ${styles.folderIcon}`} />
        <span className={styles.dirName}>{name}</span>
      </span>
      {children ? <ul>{children}</ul> : null}
    </li>
  );
}

export function File({
  name,
  kind = "text",
}: {
  name: ReactNode;
  kind?: "code" | "text";
}) {
  const Icon = kind === "code" ? IconFileCode : IconFileText;
  return (
    <li>
      <span className={styles.row}>
        <Icon className={`${styles.icon} ${styles.fileIcon}`} />
        <span className={styles.fileName}>{name}</span>
      </span>
    </li>
  );
}

export function Special({ name }: { name: ReactNode }) {
  return (
    <li>
      <span className={styles.row}>
        <IconFileDescription className={`${styles.icon} ${styles.specialIcon}`} />
        <span className={styles.specialName}>{name}</span>
      </span>
    </li>
  );
}
