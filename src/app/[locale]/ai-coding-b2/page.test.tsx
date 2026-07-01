import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Page from "./page";
import skillCardStyles from "@/components/doc/skill-card.module.css";

describe("AI Coding B2 doc page", () => {
  it("renders the English hero title for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Best Practices,");
    expect(screen.getByText("Skill Map")).toBeInTheDocument();
    expect(heading.textContent).toContain("and Team Model");
  });

  it("renders all 5 skill-letter badges with their distinct token-driven color classes", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const expectedLetterClasses = {
      A: skillCardStyles.letterA,
      B: skillCardStyles.letterB,
      C: skillCardStyles.letterC,
      D: skillCardStyles.letterD,
      E: skillCardStyles.letterE,
    };

    for (const [letter, className] of Object.entries(expectedLetterClasses)) {
      const badge = screen
        .getAllByText(letter)
        .find((el) => el.classList.contains(className));
      expect(badge).not.toBeUndefined();
    }

    const uniqueClasses = new Set(Object.values(expectedLetterClasses));
    expect(uniqueClasses.size).toBe(5);
  });

  it("keeps skill card D collapsed by default and expands it on click", async () => {
    const user = userEvent.setup();
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    expect(screen.queryByText(/Red-Green-Refactor/)).toBeNull();

    const cardTitle = screen
      .getAllByText("Agentic Coding with TDD")
      .find((el) => el.closest("button"));
    await user.click(cardTitle as HTMLElement);

    expect(screen.getByText(/Red-Green-Refactor/)).toBeInTheDocument();
  });

  it("renders the Turkish hero content for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Best Practice'ler,");
    expect(screen.getByText("Beceri Haritası")).toBeInTheDocument();
    expect(heading.textContent).toContain("ve Takım Modeli");
  });

  it("renders all major English section headings and all 5 skill card names", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const headings = [
      "Things You Must Always Do",
      "Things You Must Never Do",
      "The Recommended AI Coding Playbook",
      "The AI Coding Skill Map",
      "Areas of Responsibility for Teams",
      "An Example AI Coding Session Flow",
      "The Most Important Best Practices",
      "Short Summary",
      "Resources",
    ];
    for (const heading of headings) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }

    const skillNames = [
      "Pair Programming with AI",
      "Structured Prompting",
      "PRD- and Issue-Based Work",
      "Agentic Coding with TDD",
      "Agent Workflow and AFK Coding",
    ];
    for (const name of skillNames) {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0);
    }
  });

  it("renders all major Turkish section headings", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const headings = [
      "Kesinlikle Yapılması Gerekenler",
      "Kesinlikle Yapılmaması Gerekenler",
      "Önerilen AI Coding Playbook",
      "AI Coding Beceri Haritası",
      "Takımlar İçin Sorumluluk Alanları",
      "Örnek AI Coding Session Akışı",
      "En Önemli Best Practice'ler",
      "Kısa Özet",
      "Kaynaklar",
    ];
    for (const heading of headings) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
  });

  it("does not render the Switcher UI on the doc page", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    expect(screen.queryByText("LIGHT")).toBeNull();
    expect(screen.queryByText("DARK")).toBeNull();
    expect(screen.queryByText("TR")).toBeNull();
  });
});
