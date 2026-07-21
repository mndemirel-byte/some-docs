import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FanOutDiagram } from "./fan-out-diagram";

describe("FanOutDiagram", () => {
  it("renders the main thread, all three subagent boxes, and the legend", () => {
    render(<FanOutDiagram />);

    expect(screen.getByText("MAIN THREAD")).toBeInTheDocument();
    expect(screen.getByText("Subagent A")).toBeInTheDocument();
    expect(screen.getByText("Subagent B")).toBeInTheDocument();
    expect(screen.getByText("Subagent C")).toBeInTheDocument();

    expect(screen.getByText(/dispatch/i)).toBeInTheDocument();
    expect(screen.getByText(/independent/i)).toBeInTheDocument();
    expect(screen.getByText(/slowest subagent/i)).toBeInTheDocument();
  });

  it("colors its boxes with theme design tokens, not hardcoded hex values", () => {
    const { container } = render(<FanOutDiagram />);

    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg?.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,6}/);
    expect(svg?.innerHTML).toMatch(/var\(--/);
  });
});
