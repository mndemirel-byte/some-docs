import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IconCheck } from "@tabler/icons-react";
import { NumberedGrid, NumberedItem } from "./numbered-grid";
import styles from "./numbered-grid.module.css";

describe("NumberedItem", () => {
  it("renders the caller-supplied number as the badge, alongside its content", () => {
    render(
      <NumberedGrid>
        <NumberedItem num={7}>Keep context small</NumberedItem>
      </NumberedGrid>,
    );

    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("7")).toHaveClass(styles.num);
    expect(screen.getByText("Keep context small")).toBeInTheDocument();
  });

  it("renders a caller-supplied marker instead of the number badge when marker is given", () => {
    render(
      <NumberedGrid>
        <NumberedItem marker={<IconCheck data-testid="check-icon" />}>
          Narrow scope
        </NumberedItem>
      </NumberedGrid>,
    );

    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
    expect(screen.getByTestId("check-icon").closest(`.${styles.num}`)).not.toBeNull();
    expect(screen.getByText("Narrow scope")).toBeInTheDocument();
  });
});
