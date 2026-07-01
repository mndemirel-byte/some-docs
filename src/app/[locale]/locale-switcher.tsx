import Link from "next/link";
import { routing } from "@/i18n/routing";
import styles from "./switcher.module.css";

export function LocaleSwitcher({ locale }: { locale: string }) {
  return (
    <div className={`${styles.row} ${styles.lang}`}>
      {routing.locales.map((loc) =>
        loc === locale ? (
          <span key={loc} className={`${styles.button} ${styles.active}`}>
            {loc.toUpperCase()}
          </span>
        ) : (
          <Link key={loc} href={`/${loc}`} className={styles.button}>
            {loc.toUpperCase()}
          </Link>
        ),
      )}
    </div>
  );
}
