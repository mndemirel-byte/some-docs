import { IconList } from "@tabler/icons-react";
import styles from "./toc.module.css";

type TocEntry = {
  id: string;
  num: string;
  label: string;
  subEntries?: { id: string; num: string; label: string }[];
};

export function Toc({
  title,
  entries,
  layout = "grid",
}: {
  title: string;
  entries: TocEntry[];
  layout?: "grid" | "list";
}) {
  return (
    <div className={styles.toc}>
      <div className={styles.title}>
        <IconList size={14} /> {title}
      </div>
      {layout === "grid" ? (
        <div className={styles.grid}>
          {entries.map((entry) => (
            <a key={entry.id} className={styles.link} href={`#${entry.id}`}>
              <span className={styles.num}>{entry.num}</span>
              {entry.label}
            </a>
          ))}
        </div>
      ) : (
        <ul className={styles.list}>
          {entries.map((entry) => (
            <li key={entry.id}>
              <a className={styles.link} href={`#${entry.id}`}>
                <span className={styles.num}>{entry.num}</span>
                {entry.label}
              </a>
              {entry.subEntries ? (
                <ul className={styles.sub}>
                  {entry.subEntries.map((sub) => (
                    <li key={sub.id}>
                      <a className={styles.link} href={`#${sub.id}`}>
                        <span className={styles.num}>{sub.num}</span>
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
