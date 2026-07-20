import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DecisionTree, DecisionQuestion } from "./decision-tree";
import { TwoBoxGrid, Box } from "./two-box-grid";
import treeStyles from "./decision-tree.module.css";

describe("DecisionQuestion", () => {
  it("renders its question text alongside its branch children", () => {
    render(
      <DecisionQuestion>
        <strong>1. Do I need the intermediate work later?</strong>
        <TwoBoxGrid>
          <Box tone="green" label="YES">
            Main Thread
          </Box>
          <Box tone="red" label="NO">
            Continue
          </Box>
        </TwoBoxGrid>
      </DecisionQuestion>,
    );

    expect(
      screen.getByText("1. Do I need the intermediate work later?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Main Thread")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });
});

describe("DecisionTree", () => {
  it("stacks multiple questions vertically inside a single tree container", () => {
    const { container } = render(
      <DecisionTree>
        <DecisionQuestion>
          <strong>Question one</strong>
        </DecisionQuestion>
        <DecisionQuestion>
          <strong>Question two</strong>
        </DecisionQuestion>
      </DecisionTree>,
    );

    expect(screen.getByText("Question one")).toBeInTheDocument();
    expect(screen.getByText("Question two")).toBeInTheDocument();

    const tree = container.firstElementChild;
    expect(tree).toHaveClass(treeStyles.tree);
    expect(tree?.children.length).toBe(2);
  });
});
