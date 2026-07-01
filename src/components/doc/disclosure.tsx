"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import styles from "./disclosure.module.css";

export function Disclosure({
  trigger,
  children,
  id,
  className = styles.wrap,
  triggerClassName = styles.button,
  contentClassName = styles.content,
  iconClassName = styles.toggleIcon,
  iconOpenClassName = styles.toggleIconOpen,
}: {
  trigger: ReactNode;
  children: ReactNode;
  id?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
  iconOpenClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div id={id} className={className}>
      <button
        type="button"
        className={triggerClassName}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {trigger}
        <IconChevronDown
          className={`${iconClassName} ${open ? iconOpenClassName : ""}`}
        />
      </button>
      {open ? <div className={contentClassName}>{children}</div> : null}
    </div>
  );
}
