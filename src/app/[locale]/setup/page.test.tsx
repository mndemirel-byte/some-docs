import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Page from "./page";
import fileTreeStyles from "@/components/doc/file-tree.module.css";

describe("Setup doc page", () => {
  it("renders the English hero title for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Claude Code");
    expect(heading.textContent).toContain("Agentic");
    expect(heading.textContent).toContain("Project Setup");
  });

  it("renders the Turkish hero badge and description for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    expect(screen.getByText(/orta seviye/)).toBeInTheDocument();
    expect(
      screen.getByText(/Herhangi bir yazılım projesine kopyalanabilecek/),
    ).toBeInTheDocument();
  });

  it("renders the file tree with token-driven classes for directory, special, and plain files", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    expect(screen.getByText("your-project/")).toHaveClass(
      fileTreeStyles.dirName,
    );

    const claudeMdEntries = screen.getAllByText("CLAUDE.md");
    const specialEntry = claudeMdEntries.find((el) =>
      el.classList.contains(fileTreeStyles.specialName),
    );
    expect(specialEntry).not.toBeUndefined();

    expect(screen.getByText("README.md")).toHaveClass(
      fileTreeStyles.fileName,
    );
  });

  it("shows the Linux command block by default and switches to Windows on tab click", async () => {
    const user = userEvent.setup();
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    expect(screen.getByText(/mkdir -p \.claude\/skills/)).toBeInTheDocument();
    expect(screen.queryByText(/New-Item -ItemType Directory/)).toBeNull();

    await user.click(screen.getByText("Windows (PowerShell)"));

    expect(screen.getByText(/New-Item -ItemType Directory/)).toBeInTheDocument();
    expect(screen.queryByText(/mkdir -p \.claude\/skills/)).toBeNull();
  });

  it("copies the visible command block's content when Copy is clicked", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText");
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    await user.click(screen.getAllByText("Copy")[0]);

    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining("mkdir -p .claude/skills"),
    );
    expect(await screen.findByText("Copied")).toBeInTheDocument();
  });

  it("keeps the CLAUDE.md template card collapsed by default and expands it on click", async () => {
    const user = userEvent.setup();
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    expect(
      screen.queryByText(/This repository uses an agentic development workflow/),
    ).toBeNull();

    await user.click(screen.getByText("Project Instructions for Claude Code"));

    expect(
      screen.getByText(/This repository uses an agentic development workflow/),
    ).toBeInTheDocument();
  });

  it("renders all 12 English section headings and skill/agent/docs cards", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const headings = [
      "Target Folder Structure",
      "Folders' Responsibilities",
      "Setup Commands",
      "CLAUDE.md Template",
      "Skill Set",
      "Skill Files",
      "Agent Definitions",
      "Docs README Templates",
      "Recommended Workflow",
      "Usage Principles",
      "Anti-Patterns",
      "Summary",
    ];
    for (const heading of headings) {
      expect(screen.getByRole("heading", { name: heading, level: 2 })).toBeInTheDocument();
    }

    const skillNames = [
      "grill-with-docs",
      "to-prd",
      "to-issues",
      "tdd",
      "codebase-design",
      "diagnosing-bugs",
      "improve-codebase-architecture",
    ];
    for (const skill of skillNames) {
      expect(screen.getAllByText(skill).length).toBeGreaterThan(0);
    }

    const agentNames = [
      "planner-agent",
      "implementation-agent",
      "debugging-agent",
      "architecture-review-agent",
      "documentation-agent",
    ];
    for (const agent of agentNames) {
      expect(screen.getAllByText(agent).length).toBeGreaterThan(0);
    }

    const docsNames = [
      "docs/prd/README.md",
      "docs/issues/README.md",
      "docs/adr/README.md",
      "docs/architecture/README.md",
      "docs/decisions/README.md",
    ];
    for (const doc of docsNames) {
      expect(screen.getAllByText(doc).length).toBeGreaterThan(0);
    }
  });

  it("renders all 12 Turkish section headings and skill/agent/docs cards", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const headings = [
      "Hedef Klasör Yapısı",
      "Klasörlerin Sorumlulukları",
      "Setup Komutları",
      "CLAUDE.md Şablonu",
      "Skill Set",
      "Skill Dosyaları",
      "Agent Tanımları",
      "Docs README Şablonları",
      "Önerilen Çalışma Akışı",
      "Kullanım Prensipleri",
      "Anti-pattern'ler",
      "Özet",
    ];
    for (const heading of headings) {
      expect(screen.getByRole("heading", { name: heading, level: 2 })).toBeInTheDocument();
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
