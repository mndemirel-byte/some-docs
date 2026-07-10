import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import Page from "./page";
import styles from "./index.module.css";
import switcherStyles from "./switcher.module.css";
import { THEME_STORAGE_KEY } from "./theme";

describe("Index page", () => {
  it("renders English chrome text for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Development with");
    expect(screen.getByText("AI Coding")).toBeInTheDocument();
    expect(
      screen.getByText(/Four comprehensive guides applicable at every level/),
    ).toBeInTheDocument();
  });

  it("renders Turkish chrome text for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("AI Coding ile");
    expect(screen.getByText("Disiplinli")).toBeInTheDocument();
    expect(
      screen.getByText(/Bireysel developer'dan ekip modeline kadar/),
    ).toBeInTheDocument();
  });

  it("renders Turkish card content and footer for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    expect(screen.getByText("Best Practice'ler ve Takım Modeli")).toBeInTheDocument();
    expect(screen.getAllByText("Dokümana Git")).toHaveLength(5);
    expect(
      screen.getByText(/Tüm dokümanlar aynı klasörde olduğunda linklerin çalışır/),
    ).toBeInTheDocument();
  });

  it("renders all 4 cards with the correct titles, hrefs, and accent variant", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const expected = [
      {
        title: "Claude Code Agentic Project Setup",
        href: "/en/setup",
        variant: styles.c1,
      },
      {
        title: "Disciplined Development with AI Coding",
        href: "/en/ai-coding-b1",
        variant: styles.c2,
      },
      {
        title: "Best Practices and Team Model",
        href: "/en/ai-coding-b2",
        variant: styles.c3,
      },
      {
        title: "Building a Project with Matt Pocock Skills",
        href: "/en/matt-pocock-skills",
        variant: styles.c4,
      },
      {
        title: "Agentic Development Cheat Sheet",
        href: "/en/agentic-workflow-cheat-sheet",
        variant: styles.c5,
      },
    ];

    for (const card of expected) {
      const heading = screen.getByText(card.title);
      const link = heading.closest("a");
      expect(link).not.toBeNull();
      expect(link).toHaveAttribute("href", card.href);
      expect(link).toHaveClass(styles.card, card.variant);
    }
  });

  it("shows EN as active/non-clickable and links to /tr on the en page", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const active = screen.getByText("EN");
    expect(active.tagName).toBe("SPAN");

    const trLink = screen.getByText("TR");
    expect(trLink.tagName).toBe("A");
    expect(trLink).toHaveAttribute("href", "/tr");
  });

  it("shows TR as active/non-clickable and links to /en on the tr page", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const active = screen.getByText("TR");
    expect(active.tagName).toBe("SPAN");

    const enLink = screen.getByText("EN");
    expect(enLink.tagName).toBe("A");
    expect(enLink).toHaveAttribute("href", "/en");
  });
});

describe("Theme switcher", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("shows LIGHT as active/non-clickable and DARK as clickable by default", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const active = screen.getByText("LIGHT");
    expect(active.tagName).toBe("SPAN");

    const darkButton = screen.getByText("DARK");
    expect(darkButton.tagName).toBe("BUTTON");
  });

  it("switches to bright-saas and flips active/clickable state when DARK is clicked", async () => {
    const user = userEvent.setup();
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    await user.click(screen.getByText("DARK"));

    expect(document.documentElement.getAttribute("data-theme")).toBe(
      "bright-saas",
    );
    expect(screen.getByText("DARK").tagName).toBe("SPAN");
    expect(screen.getByText("LIGHT").tagName).toBe("BUTTON");
  });

  it("persists the choice to localStorage when DARK is clicked", async () => {
    const user = userEvent.setup();
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    await user.click(screen.getByText("DARK"));

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("bright-saas");
  });

  it("does not touch locale navigation when the theme is switched", async () => {
    const user = userEvent.setup();
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    expect(screen.getByText("DARK").closest("a")).toBeNull();
    expect(screen.getByText("LIGHT").closest("a")).toBeNull();

    await user.click(screen.getByText("DARK"));

    const trLink = screen.getByText("TR");
    expect(trLink.tagName).toBe("A");
    expect(trLink).toHaveAttribute("href", "/tr");
  });

  it("reflects a previously stored theme after mount for a returning visitor", async () => {
    localStorage.setItem(THEME_STORAGE_KEY, "bright-saas");
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    expect(await screen.findByText("DARK")).toHaveClass(switcherStyles.active);
    expect(screen.getByText("LIGHT").tagName).toBe("BUTTON");
  });
});
