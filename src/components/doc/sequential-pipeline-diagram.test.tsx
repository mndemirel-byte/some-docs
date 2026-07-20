import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SequentialPipelineDiagram } from "./sequential-pipeline-diagram";

describe("SequentialPipelineDiagram", () => {
  it("renders all three nodes, their context labels, and both summary arrow labels", () => {
    render(<SequentialPipelineDiagram />);

    expect(screen.getByText("Researcher")).toBeInTheDocument();
    expect(screen.getByText("100% raw context")).toBeInTheDocument();
    expect(screen.getByText("Planner")).toBeInTheDocument();
    expect(screen.getByText("partial context")).toBeInTheDocument();
    expect(screen.getByText("Worker")).toBeInTheDocument();
    expect(screen.getByText("less context")).toBeInTheDocument();

    expect(screen.getAllByText("summary").length).toBe(3);
  });

  it("colors its nodes with theme design tokens, not hardcoded hex values", () => {
    const { container } = render(<SequentialPipelineDiagram />);

    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg?.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,6}/);
    expect(svg?.innerHTML).toMatch(/var\(--/);
  });
});
