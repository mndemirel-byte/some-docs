"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import styles from "./code-block.module.css";

const KIND_CLASS = {
  plain: "",
  prompt: styles.langPrompt,
  example: styles.langExample,
  file: styles.langFile,
} as const;

export function CodeBlock({
  lang,
  kind = "plain",
  copyLabel = "Copy",
  copiedLabel = "Copied",
  children,
}: {
  lang: ReactNode;
  kind?: keyof typeof KIND_CLASS;
  copyLabel?: string;
  copiedLabel?: string;
  children: string;
}) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  async function handleCopy() {
    const text = preRef.current?.textContent?.trim() ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles.block}>
      <div className={styles.head}>
        <span className={`${styles.lang} ${KIND_CLASS[kind]}`}>{lang}</span>
        <button type="button" className={styles.copy} onClick={handleCopy}>
          {copied ? (
            <>
              <IconCheck size={13} /> {copiedLabel}
            </>
          ) : (
            <>
              <IconCopy size={13} /> {copyLabel}
            </>
          )}
        </button>
      </div>
      <pre ref={preRef} className={styles.pre}>
        {children.trim()}
      </pre>
    </div>
  );
}
