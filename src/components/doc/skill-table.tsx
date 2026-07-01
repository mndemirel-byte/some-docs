import type { ReactNode } from "react";
import styles from "./skill-table.module.css";

export function SkillTable({
  skillHeader,
  purposeHeader,
  rows,
}: {
  skillHeader: string;
  purposeHeader: string;
  rows: { skill: string; purpose: ReactNode }[];
}) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>{skillHeader}</th>
          <th>{purposeHeader}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.skill}>
            <td className={styles.code}>{row.skill}</td>
            <td>{row.purpose}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
