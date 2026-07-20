import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Subagents companion guide decision tree fragment", () => {
  it("renders all 5 questions with their yes/no outcomes", async () => {
    const { default: Content } = await import("./should-i-use-a-subagent.mdx");
    render(<Content />);

    const questions = [
      "1. Do I need the intermediate work later?",
      "2. Will the task produce lots of logs, search results, or file content?",
      "3. Do I need a fresh perspective separated from implementation context?",
      "4. Do I need step-by-step debugging visibility?",
      "5. Is the task only a deterministic command?",
    ];
    for (const question of questions) {
      expect(screen.getByText(question)).toBeInTheDocument();
    }

    expect(screen.getAllByText("YES").length).toBe(5);
    expect(screen.getAllByText("NO").length).toBe(5);
    expect(screen.getAllByText("Continue").length).toBe(4);
    expect(screen.getAllByText("Subagent").length).toBe(2);
    expect(screen.getAllByText("Main Thread").length).toBe(2);
    expect(screen.getByText("Bash / Hook")).toBeInTheDocument();
    expect(screen.getByText("Subagent may help")).toBeInTheDocument();
  });
});
