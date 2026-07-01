import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Page from "./page";

describe("AI Coding B1 doc page", () => {
  it("renders the English hero title for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Disciplined Software Development with");
    expect(heading.textContent).toContain("AI Coding");
    expect(heading.textContent).toContain("Agents");
  });

  it("renders the Turkish hero content for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("AI Coding Agent'larla");
    expect(screen.getByText("Disiplinli")).toBeInTheDocument();
    expect(
      screen.getAllByText(/Büyük işi modele yedirmek yerine/).length,
    ).toBeGreaterThan(0);
  });

  it("keeps the first challenge card collapsed by default and expands it on click", async () => {
    const user = userEvent.setup();
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    expect(
      screen.queryByText(/AI very often produces a plan far too early/),
    ).toBeNull();

    const cardTitle = screen
      .getAllByText("Misunderstood Requirements")
      .find((el) => el.closest("button"));
    await user.click(cardTitle as HTMLElement);

    expect(
      screen.getByText(/AI very often produces a plan far too early/),
    ).toBeInTheDocument();
  });

  it("keeps the example output collapsed by default and expands it on click", async () => {
    const user = userEvent.setup();
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    expect(screen.queryByText(/Lesson viewing/)).toBeNull();

    await user.click(screen.getByText("Example output"));

    expect(screen.getByText(/Lesson viewing/)).toBeInTheDocument();
  });

  it("renders all major English section headings and phase titles", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const headings = [
      "Who Is This Document For?",
      "Abbreviations and Terms",
      "The Recommended AI Coding Workflow",
      "Break the Idea into Features",
      "Interrogate the Feature Brief",
      "Produce a PRD / Destination Document",
      "Split the PRD into Kanban Issues",
      "Have the Agent Write Code with TDD",
      "Human-in-the-Loop vs. AFK Task Split",
      "Improve the Codebase",
      "Resources",
    ];
    for (const heading of headings) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }

    const challengeTitles = [
      "Misunderstood Requirements",
      "The Limits of Spec-Driven Development",
      "Context Bloat and Over-Reliance on Compacting",
      "The Tendency Toward Horizontal Implementation",
      "Lack of Tests",
      "Bad Architecture: Shallow Modules",
    ];
    for (const title of challengeTitles) {
      expect(screen.getAllByText(title).length).toBeGreaterThan(0);
    }
  });

  it("renders all major Turkish section headings", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const headings = [
      "Bu Doküman Kimin İçin?",
      "Kısaltmalar ve Terimler",
      "Önerilen AI Coding Workflow",
      "Fikri Feature'lara Ayrıştır",
      "Feature Brief'i Netleştir",
      "PRD / Destination Document Üret",
      "PRD'yi Kanban Issue'larına Böl",
      "Agent'a TDD ile Kod Yazdır",
      "Human-in-the-loop ve AFK Task Ayrımı",
      "Kod Tabanını İyileştir",
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
