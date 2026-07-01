import type { ReactNode } from "react";
import { Disclosure } from "./disclosure";

export function ExpandableExample({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return <Disclosure trigger={label}>{children}</Disclosure>;
}
