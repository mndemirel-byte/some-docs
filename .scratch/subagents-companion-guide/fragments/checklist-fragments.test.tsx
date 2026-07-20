import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Subagents companion guide checklist fragments", () => {
  it("renders all 6 numbered System Prompt Design items for en", async () => {
    const { default: Content } = await import("./system-prompt-design.en.mdx");
    render(<Content />);

    expect(screen.getByText("Scope")).toBeInTheDocument();
    expect(screen.getByText("What exactly is in scope?")).toBeInTheDocument();
    expect(screen.getByText("Boundaries")).toBeInTheDocument();
    expect(screen.getByText("What must it not do?")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("renders all 6 numbered System Prompt Design items for tr", async () => {
    const { default: Content } = await import("./system-prompt-design.tr.mdx");
    render(<Content />);

    expect(screen.getByText("Tam olarak neyi kapsıyor?")).toBeInTheDocument();
    expect(screen.getByText("Neyi yapmamalı?")).toBeInTheDocument();
  });

  it("renders all 8 Best Practices items with a checkmark marker instead of a number", async () => {
    const { default: Content } = await import("./best-practices-checklist.mdx");
    const { container } = render(<Content />);

    const items = [
      "Narrow scope",
      "Limited tools",
      "Structured output",
      "Report obstacles",
      "Custom system prompt",
      "Concise summaries",
      "Explicit stop condition",
      "Evidence-based findings",
    ];
    for (const text of items) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }

    expect(container.querySelectorAll("svg").length).toBe(8);
    expect(container.querySelectorAll("span").length).toBeGreaterThanOrEqual(16);
  });
});
