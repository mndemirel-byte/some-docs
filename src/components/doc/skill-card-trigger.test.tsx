import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkillCardTrigger } from "./skill-card-trigger";
import styles from "./skill-card.module.css";

describe("SkillCardTrigger", () => {
  it("renders the letter, name, goal, and prereq, with the letter's accent class applied", () => {
    render(
      <SkillCardTrigger
        letter="D"
        name="Agentic Coding with TDD"
        goal="Tying AI's code generation to a test feedback loop"
        prereq="Test framework knowledge"
      />,
    );

    expect(screen.getByText("Agentic Coding with TDD")).toBeInTheDocument();
    expect(
      screen.getByText("Tying AI's code generation to a test feedback loop"),
    ).toBeInTheDocument();
    expect(screen.getByText("Test framework knowledge")).toBeInTheDocument();
    expect(screen.getByText("D")).toHaveClass(styles.letterD);
  });
});
