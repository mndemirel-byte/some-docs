import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page from "./page";
import terminalStyles from "@/components/doc/terminal.module.css";

describe("Matt Pocock Skills doc page", () => {
  it("renders the English hero title for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Building a Project from");
    expect(screen.getByText("Scratch")).toBeInTheDocument();
    expect(heading.textContent).toContain("with Matt Pocock Skills");
  });

  it("renders the terminal header using the token-driven surface2 class, not a hardcoded color", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const label = screen.getByText("claude — /zoom-out");
    const head = label.parentElement;
    expect(head).toHaveClass(terminalStyles.head);
    expect(head).not.toHaveAttribute("style");
  });

  it("renders all major English section headings and step titles", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const headings = [
      "Prerequisites and Setup",
      "Project Definition: URL Shortener",
      "Skill Map: Which One, When?",
      "Prepare the Repo for the Skills",
      "Interrogate the Idea and Establish Domain Language",
      "Produce a PRD",
      "Split the PRD into Issues",
      "Implementation with TDD",
      "Issue Management",
      "Improve the Architecture",
      "As Needed: Helper Skills",
      "Summary: The Complete Flow",
      "Resources",
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

  it("renders the Turkish hero content for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Matt Pocock Skills");
  });

  it("renders all major Turkish section headings", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const headings = [
      "Ön Koşullar ve Kurulum",
      "Proje Tanımı: URL Shortener",
      "Skill Haritası: Hangisi Ne Zaman Kullanılır?",
      "Repo'yu Skill'ler İçin Hazırla",
      "Fikri Sorgula ve Domain Dilini Kur",
      "PRD Oluştur",
      "PRD'yi Issue'lara Böl",
      "TDD ile İmplementasyon",
      "Issue Yönetimi",
      "Mimariyi İyileştir",
      "İhtiyaç Halinde: Yardımcı Skill'ler",
      "Özet: Komple Akış",
      "Kaynaklar",
    ];
    for (const heading of headings) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
  });
});
