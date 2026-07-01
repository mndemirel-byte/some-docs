import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Disclosure } from "./disclosure";

describe("Disclosure", () => {
  it("toggles aria-expanded and reveals/hides the body on click", async () => {
    const user = userEvent.setup();
    render(
      <Disclosure trigger="Show details">
        <p>Hidden body content</p>
      </Disclosure>,
    );

    const button = screen.getByRole("button", { name: "Show details" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Hidden body content")).toBeNull();

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Hidden body content")).toBeInTheDocument();

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Hidden body content")).toBeNull();
  });

  it("lets a caller replace the default trigger styling with its own className", () => {
    render(
      <Disclosure trigger="Show details" triggerClassName="custom-trigger">
        <p>Hidden body content</p>
      </Disclosure>,
    );

    const button = screen.getByRole("button", { name: "Show details" });
    expect(button.className).toBe("custom-trigger");
  });

  it("renders multi-element trigger content as direct flex siblings, not wrapped in an extra element", () => {
    render(
      <Disclosure
        trigger={
          <>
            <div data-testid="badge">1</div>
            <div data-testid="title">Title</div>
          </>
        }
      >
        <p>Body</p>
      </Disclosure>,
    );

    const button = screen.getByRole("button");
    expect(screen.getByTestId("badge").parentElement).toBe(button);
    expect(screen.getByTestId("title").parentElement).toBe(button);
  });

  it("applies a caller-supplied id to the wrap element for anchor targeting", () => {
    const { container } = render(
      <Disclosure trigger="Show details" id="da">
        <p>Body</p>
      </Disclosure>,
    );

    expect(container.querySelector("#da")).not.toBeNull();
  });
});
