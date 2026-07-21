import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NestedTreeDiagram } from "./nested-tree-diagram";

describe("NestedTreeDiagram", () => {
  it("renders the main thread, team-lead, and developer nodes with their tool lists and depth labels", () => {
    render(<NestedTreeDiagram />);

    expect(screen.getByText("MAIN THREAD")).toBeInTheDocument();
    expect(screen.getByText("team-lead")).toBeInTheDocument();
    expect(screen.getByText("developer")).toBeInTheDocument();

    expect(screen.getByText(/tools: Agent/)).toBeInTheDocument();
    expect(screen.getByText(/Read, Edit/)).toBeInTheDocument();

    expect(screen.getByText(/level 1/i)).toBeInTheDocument();
    expect(screen.getByText(/depth limit 5/i)).toBeInTheDocument();

    expect(screen.getByText(/only sees team-lead/i)).toBeInTheDocument();
    expect(screen.getByText(/max 5 levels/i)).toBeInTheDocument();
  });

  it("colors its nodes with theme design tokens, not hardcoded hex values", () => {
    const { container } = render(<NestedTreeDiagram />);

    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg?.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,6}/);
    expect(svg?.innerHTML).toMatch(/var\(--/);
  });
});
