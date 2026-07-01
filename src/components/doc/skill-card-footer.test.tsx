import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkillCardFooter } from "./skill-card-footer";

describe("SkillCardFooter", () => {
  it("renders the 'Who it's for' label alongside the given audience text", () => {
    render(<SkillCardFooter forWho="Everyone; the entry point into AI coding." />);

    expect(screen.getByText(/Who it's for/)).toBeInTheDocument();
    expect(
      screen.getByText(/Everyone; the entry point into AI coding\./),
    ).toBeInTheDocument();
  });
});
