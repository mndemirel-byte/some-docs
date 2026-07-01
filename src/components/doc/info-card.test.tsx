import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IconFileDescription } from "@tabler/icons-react";
import { CardGrid, InfoCard } from "./info-card";
import styles from "./info-card.module.css";

describe("InfoCard", () => {
  it("renders the icon, title, and description body", () => {
    render(
      <InfoCard icon={IconFileDescription} title="CLAUDE.md">
        The main agent manifest.
      </InfoCard>,
    );

    expect(screen.getByText("CLAUDE.md")).toBeInTheDocument();
    expect(screen.getByText("The main agent manifest.")).toBeInTheDocument();
    expect(document.querySelector("svg.tabler-icon-file-description")).not.toBeNull();
  });

  it("renders icon and title together inside a heading when variant is inline", () => {
    render(
      <InfoCard icon={IconFileDescription} title="What is a skill?" variant="inline">
        A reusable working discipline.
      </InfoCard>,
    );

    const heading = screen.getByRole("heading", { level: 4 });
    expect(heading).toHaveTextContent("What is a skill?");
    expect(heading.querySelector("svg.tabler-icon-file-description")).not.toBeNull();
  });

  it("renders a fixed two-column layout when CardGrid columns is 'two'", () => {
    const { container } = render(
      <CardGrid columns="two">
        <div>a</div>
      </CardGrid>,
    );

    expect(container.firstElementChild).toHaveClass(styles.gridTwo);
  });

  it("renders raw children (no .desc wrapper) with an uppercase caption-style heading when variant is caption", () => {
    const { container } = render(
      <InfoCard icon={IconFileDescription} title="Required tools" variant="caption">
        <ul>
          <li>Node.js</li>
        </ul>
      </InfoCard>,
    );

    const heading = screen.getByRole("heading", { level: 4 });
    expect(heading).toHaveTextContent("Required tools");
    expect(container.querySelector(`.${styles.desc}`)).toBeNull();
  });

  it("applies a caller-supplied iconColor as an inline style on the icon", () => {
    render(
      <InfoCard
        icon={IconFileDescription}
        title="Required tools"
        variant="caption"
        iconColor="rgb(1, 2, 3)"
      >
        <p>Body</p>
      </InfoCard>,
    );

    const icon = document.querySelector("svg.tabler-icon-file-description");
    expect(icon).toHaveStyle({ color: "rgb(1, 2, 3)" });
  });

  it("renders the cozy two-column spacing when CardGrid spacing is 'cozy'", () => {
    const { container } = render(
      <CardGrid columns="two" spacing="cozy">
        <div>a</div>
      </CardGrid>,
    );

    expect(container.firstElementChild).toHaveClass(styles.gridTwoCozy);
  });

  it("renders a boxed icon beside the title and meta line, separate from the body, when variant is boxed", () => {
    render(
      <InfoCard
        icon={IconFileDescription}
        title="/diagnose — Structured Debugging"
        meta="For hard bugs — when neither the agent nor you can solve it"
        variant="boxed"
      >
        <p>Body content</p>
      </InfoCard>,
    );

    const heading = screen.getByRole("heading", { level: 4 });
    expect(heading).toHaveTextContent("/diagnose — Structured Debugging");
    expect(
      screen.getByText("For hard bugs — when neither the agent nor you can solve it"),
    ).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("renders a single-column layout when CardGrid columns is 'one'", () => {
    const { container } = render(
      <CardGrid columns="one">
        <div>a</div>
      </CardGrid>,
    );

    expect(container.firstElementChild).toHaveClass(styles.gridOne);
  });

  it("renders a bolded title above the description text, with no heading element, when variant is stat", () => {
    render(
      <InfoCard
        icon={IconFileDescription}
        title="Shared Understanding"
        variant="stat"
        iconColor="var(--accent-text)"
      >
        Everyone agrees on scope before code is written.
      </InfoCard>,
    );

    expect(screen.getByText("Shared Understanding").tagName).toBe("STRONG");
    expect(
      screen.getByText("Everyone agrees on scope before code is written."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading")).toBeNull();
  });

  it("renders a fixed three-column layout when CardGrid columns is 'three'", () => {
    const { container } = render(
      <CardGrid columns="three">
        <div>a</div>
      </CardGrid>,
    );

    expect(container.firstElementChild).toHaveClass(styles.gridThree);
  });
});
