import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MentalModelDiagram } from "./mental-model-diagram";

describe("MentalModelDiagram", () => {
  it("renders both context boxes, their message bubbles, and the legend", () => {
    render(<MentalModelDiagram />);

    expect(screen.getByText("MAIN THREAD")).toBeInTheDocument();
    expect(screen.getByText("SUBAGENT")).toBeInTheDocument();
    expect(screen.getByText("Research auth flow options")).toBeInTheDocument();
    expect(screen.getByText("Receives concise summary")).toBeInTheDocument();
    expect(screen.getByText("search · logs · files · notes")).toBeInTheDocument();
    expect(
      screen.getByText("structured result → summary"),
    ).toBeInTheDocument();

    expect(screen.getByText(/Main thread keeps decisions/)).toBeInTheDocument();
    expect(screen.getByText(/Subagent absorbs noisy work/)).toBeInTheDocument();
    expect(screen.getByText(/Only the result comes back/)).toBeInTheDocument();
  });

  it("colors its boxes with theme design tokens, not hardcoded hex values", () => {
    const { container } = render(<MentalModelDiagram />);

    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg?.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,6}/);
    expect(svg?.innerHTML).toMatch(/var\(--/);
  });
});
