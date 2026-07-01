import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CollapsibleTrigger } from "./collapsible-trigger";
import styles from "./collapsible-trigger.module.css";

describe("CollapsibleTrigger", () => {
  it("renders the badge, name, and description, with the badge-kind class applied", () => {
    render(
      <CollapsibleTrigger
        badge="agent"
        badgeKind="agent"
        name="planner-agent"
        description="Requirement clarification, PRD and issues"
      />,
    );

    expect(screen.getByText("planner-agent")).toBeInTheDocument();
    expect(
      screen.getByText("Requirement clarification, PRD and issues"),
    ).toBeInTheDocument();
    expect(screen.getByText("agent")).toHaveClass(styles.badgeAgent);
  });
});
