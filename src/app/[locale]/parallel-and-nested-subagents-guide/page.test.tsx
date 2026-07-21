import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Page from "./page";

describe("Parallel & Nested Subagents guide doc page", () => {
  it("renders the English hero title for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Parallel");
    expect(heading.textContent).toContain("Nested Subagents");
  });

  it("renders the Turkish hero description for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    expect(
      screen.getByText(/Bu bölümde iki yeni katman ekliyoruz/),
    ).toBeInTheDocument();
  });

  it("renders a table of contents with all 15 section anchors, for both locales", async () => {
    const expectedIds = [
      "bridge",
      "pmodel",
      "pbenefit",
      "ptrigger",
      "puse",
      "pcaution",
      "nmodel",
      "nmech",
      "npro",
      "ncon",
      "nhow",
      "nmodelres",
      "tree",
      "best",
      "tldr",
    ];

    for (const locale of ["en", "tr"] as const) {
      const ui = await Page({ params: Promise.resolve({ locale }) });
      const { unmount } = render(ui);

      for (const id of expectedIds) {
        expect(
          document.querySelector(`a[href="#${id}"]`),
          `expected a TOC link to #${id} for locale ${locale}`,
        ).not.toBeNull();
      }

      unmount();
    }
  });

  it("renders all 15 section headings with correct ids, for both locales", async () => {
    const expectedIds = [
      "bridge",
      "pmodel",
      "pbenefit",
      "ptrigger",
      "puse",
      "pcaution",
      "nmodel",
      "nmech",
      "npro",
      "ncon",
      "nhow",
      "nmodelres",
      "tree",
      "best",
      "tldr",
    ];

    for (const locale of ["en", "tr"] as const) {
      const ui = await Page({ params: Promise.resolve({ locale }) });
      const { unmount } = render(ui);

      for (const id of expectedIds) {
        expect(
          document.getElementById(id),
          `expected a section with id #${id} for locale ${locale}`,
        ).not.toBeNull();
      }

      unmount();
    }
  });

  it("renders the bridge section's callout and both mental-model paragraphs for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const bridgeSection = document.getElementById("bridge");
    expect(bridgeSection).not.toBeNull();
    const scoped = within(bridgeSection as HTMLElement);

    expect(
      scoped.getByText(/a subagent is not a smarter agent, it is an isolated execution environment/),
    ).toBeInTheDocument();
    expect(scoped.getByText("Today's question:")).toBeInTheDocument();
    expect(
      scoped.getByText(/without losing isolation/),
    ).toBeInTheDocument();
  });

  it("renders Turkish bridge section copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const bridgeSection = document.getElementById("bridge");
    expect(bridgeSection).not.toBeNull();
    const scoped = within(bridgeSection as HTMLElement);

    expect(scoped.getByText("Bugünün sorusu:")).toBeInTheDocument();
    expect(
      scoped.getByText(/İzolasyonu koruyarak nasıl daha fazla iş paralelde yapabiliriz/),
    ).toBeInTheDocument();
  });

  it("renders the FanOutDiagram and both callouts in the Parallel Mental Model section for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const pmodelSection = document.getElementById("pmodel");
    expect(pmodelSection).not.toBeNull();
    const scoped = within(pmodelSection as HTMLElement);

    expect(scoped.getByText("MAIN THREAD")).toBeInTheDocument();
    expect(scoped.getByText("Subagent A")).toBeInTheDocument();
    expect(scoped.getByText("Key idea:")).toBeInTheDocument();
    expect(
      scoped.getByText(/Since Claude Code v2.1.198/),
    ).toBeInTheDocument();
  });

  it("renders Turkish Parallel Mental Model section copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const pmodelSection = document.getElementById("pmodel");
    expect(pmodelSection).not.toBeNull();
    const scoped = within(pmodelSection as HTMLElement);

    expect(scoped.getByText("Ana fikir:")).toBeInTheDocument();
    expect(
      scoped.getByText(/Claude Code v2.1.198'den beri/),
    ).toBeInTheDocument();
  });

  it("renders all 4 benefit rows in the Parallel Benefit table for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const pbenefitSection = document.getElementById("pbenefit");
    expect(pbenefitSection).not.toBeNull();
    const scoped = within(pbenefitSection as HTMLElement);

    const dimensions = ["Time", "Context isolation", "Independent perspectives", "Worktree isolation"];
    for (const dimension of dimensions) {
      expect(scoped.getByText(dimension)).toBeInTheDocument();
    }
    expect(
      scoped.getByText(/complete in the time of the slowest one/),
    ).toBeInTheDocument();
  });

  it("renders Turkish Parallel Benefit table copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const pbenefitSection = document.getElementById("pbenefit");
    expect(pbenefitSection).not.toBeNull();
    const scoped = within(pbenefitSection as HTMLElement);

    expect(scoped.getByText("Zaman")).toBeInTheDocument();
    expect(
      scoped.getByText(/Dosya değiştiren paralel görevler ayrı git worktree/),
    ).toBeInTheDocument();
  });

  it("renders all 3 trigger cards and the common-mistake callout in the Trigger section for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const ptriggerSection = document.getElementById("ptrigger");
    expect(ptriggerSection).not.toBeNull();
    const scoped = within(ptriggerSection as HTMLElement);

    expect(scoped.getByText("1. Check for dependencies")).toBeInTheDocument();
    expect(scoped.getByText("2. Ask explicitly")).toBeInTheDocument();
    expect(scoped.getByText("3. Single message, multiple blocks")).toBeInTheDocument();
    expect(scoped.getByText("Common mistake:")).toBeInTheDocument();
  });

  it("renders the repo-specific example and a copyable trigger prompt code block for the en locale", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText");
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const ptriggerSection = document.getElementById("ptrigger");
    expect(ptriggerSection).not.toBeNull();
    const scoped = within(ptriggerSection as HTMLElement);

    expect(scoped.getByText(/frontend-dev.*data-dev/)).toBeInTheDocument();
    expect(scoped.getByText(/Run the frontend-dev and data-dev subagents in parallel/)).toBeInTheDocument();

    await user.click(scoped.getByText("Copy"));

    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining("frontend-dev and data-dev"),
    );
  });

  it("renders Turkish Trigger section copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const ptriggerSection = document.getElementById("ptrigger");
    expect(ptriggerSection).not.toBeNull();
    const scoped = within(ptriggerSection as HTMLElement);

    expect(scoped.getByText("Sık hata:")).toBeInTheDocument();
    expect(
      scoped.getByText(/frontend-dev ve data-dev subagent'larını paralel çalıştır/),
    ).toBeInTheDocument();
  });

  it("renders all 4 use-case cards in the Parallel Use Cases section for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const puseSection = document.getElementById("puse");
    expect(puseSection).not.toBeNull();
    const scoped = within(puseSection as HTMLElement);

    expect(scoped.getByText("Independent module review")).toBeInTheDocument();
    expect(scoped.getByText("Multi-source research")).toBeInTheDocument();
    expect(scoped.getByText("Gathering multiple opinions")).toBeInTheDocument();
    expect(
      scoped.getByText("Splitting work with /batch and worktrees"),
    ).toBeInTheDocument();
  });

  it("renders Turkish Use Cases card copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const puseSection = document.getElementById("puse");
    expect(puseSection).not.toBeNull();
    const scoped = within(puseSection as HTMLElement);

    expect(scoped.getByText("Bağımsız modül review")).toBeInTheDocument();
    expect(
      scoped.getByText(/her biri kendi PR'ını açar/),
    ).toBeInTheDocument();
  });

  it("renders the do and don't lists and source callout in the Parallel Caution section for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const pcautionSection = document.getElementById("pcaution");
    expect(pcautionSection).not.toBeNull();
    const scoped = within(pcautionSection as HTMLElement);

    expect(
      scoped.getByText("Only parallelize tasks that are independent of each other."),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Don't fan out to dozens of subagents at once/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/impact context limits/),
    ).toBeInTheDocument();
  });

  it("renders Turkish Caution section copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const pcautionSection = document.getElementById("pcaution");
    expect(pcautionSection).not.toBeNull();
    const scoped = within(pcautionSection as HTMLElement);

    expect(
      scoped.getByText("Sadece birbirinden bağımsız görevleri paralelleştir."),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Onlarca subagent'ı aynı anda açma/),
    ).toBeInTheDocument();
  });

  it("renders the NestedTreeDiagram and mental-model paragraph in the Nested Mental Model section for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const nmodelSection = document.getElementById("nmodel");
    expect(nmodelSection).not.toBeNull();
    const scoped = within(nmodelSection as HTMLElement);

    expect(scoped.getByText("MAIN THREAD")).toBeInTheDocument();
    expect(scoped.getByText("team-lead")).toBeInTheDocument();
    expect(scoped.getByText("developer")).toBeInTheDocument();
    expect(
      scoped.getByText(/Nesting means a subagent uses its own/),
    ).toBeInTheDocument();
  });

  it("renders Turkish Nested Mental Model section copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const nmodelSection = document.getElementById("nmodel");
    expect(nmodelSection).not.toBeNull();
    const scoped = within(nmodelSection as HTMLElement);

    expect(
      scoped.getByText(/Nested, bir subagent'ın kendi/),
    ).toBeInTheDocument();
  });

  it("renders all 3 mechanism checklist items and the source callout in the Nested Mechanism section for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const nmechSection = document.getElementById("nmech");
    expect(nmechSection).not.toBeNull();
    const scoped = within(nmechSection as HTMLElement);

    expect(scoped.getByText("Depth limit: 5")).toBeInTheDocument();
    expect(scoped.getByText("Only the top summary returns")).toBeInTheDocument();
    expect(scoped.getByText("Resumed agents keep their depth")).toBeInTheDocument();
    expect(
      scoped.getByText("code.claude.com/docs/en/sub-agents"),
    ).toBeInTheDocument();
  });

  it("renders Turkish Nested Mechanism checklist copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const nmechSection = document.getElementById("nmech");
    expect(nmechSection).not.toBeNull();
    const scoped = within(nmechSection as HTMLElement);

    expect(scoped.getByText("Derinlik limiti: 5")).toBeInTheDocument();
    expect(
      scoped.getByText(/Arka planda devam eden bir subagent/),
    ).toBeInTheDocument();
  });

  it("renders all 3 advantage cards in the Nested Advantages section for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const nproSection = document.getElementById("npro");
    expect(nproSection).not.toBeNull();
    const scoped = within(nproSection as HTMLElement);

    expect(scoped.getByText("Hierarchical delegation")).toBeInTheDocument();
    expect(scoped.getByText("Dynamic orchestration")).toBeInTheDocument();
    expect(scoped.getByText("Reusable pieces")).toBeInTheDocument();
    expect(
      scoped.getByText(/without occupying the main thread/),
    ).toBeInTheDocument();
  });

  it("renders Turkish Nested Advantages card copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const nproSection = document.getElementById("npro");
    expect(nproSection).not.toBeNull();
    const scoped = within(nproSection as HTMLElement);

    expect(scoped.getByText("Hiyerarşik iş bölümü")).toBeInTheDocument();
    expect(
      scoped.getByText(/developer gibi küçük agent'lar başka lead'ler tarafından da çağrılabilir/),
    ).toBeInTheDocument();
  });

  it("renders the two invisible/weakened don't items, the 2-card grid, and the danger callout in the Nested Disadvantages section for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const nconSection = document.getElementById("ncon");
    expect(nconSection).not.toBeNull();
    const scoped = within(nconSection as HTMLElement);

    expect(scoped.getByText("Intermediate steps are invisible")).toBeInTheDocument();
    expect(scoped.getByText("Type restriction weakens when nested")).toBeInTheDocument();
    expect(scoped.getByText("Cost & latency compound")).toBeInTheDocument();
    expect(scoped.getByText("Hard depth wall")).toBeInTheDocument();
    expect(
      scoped.getByText(/ignored for nested spawns/),
    ).toBeInTheDocument();
  });

  it("renders Turkish Nested Disadvantages section copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const nconSection = document.getElementById("ncon");
    expect(nconSection).not.toBeNull();
    const scoped = within(nconSection as HTMLElement);

    expect(scoped.getByText("Ara adımlar görünmez")).toBeInTheDocument();
    expect(
      scoped.getByText(/Dikkatsiz tasarlanmış bir lead prompt/),
    ).toBeInTheDocument();
  });

  it("renders the team-lead.md agent definition with a working copy-to-clipboard button and the difference callout for the en locale", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText");
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const nhowSection = document.getElementById("nhow");
    expect(nhowSection).not.toBeNull();
    const scoped = within(nhowSection as HTMLElement);

    expect(scoped.getByText(/name: team-lead/)).toBeInTheDocument();
    expect(
      scoped.getByText(/tools: Read, Grep, Glob, Agent/),
    ).toBeInTheDocument();
    expect(scoped.getByText("The difference is here:")).toBeInTheDocument();

    await user.click(scoped.getAllByText("Copy")[0]);

    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining("name: team-lead"),
    );
  });

  it("renders Turkish team-lead.md section copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const nhowSection = document.getElementById("nhow");
    expect(nhowSection).not.toBeNull();
    const scoped = within(nhowSection as HTMLElement);

    expect(scoped.getByText("Fark burada:")).toBeInTheDocument();
    expect(
      scoped.getByText(/Sadece lead'e/),
    ).toBeInTheDocument();
  });

  it("renders the tech-lead repo example, the trial prompt code block, and the watch-it-live callout for the en locale", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText");
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const nhowSection = document.getElementById("nhow");
    expect(nhowSection).not.toBeNull();
    const scoped = within(nhowSection as HTMLElement);

    expect(
      scoped.getByText(/nesting is open only top-down, never the reverse/),
    ).toBeInTheDocument();
    expect(scoped.getByText("Watch it live:")).toBeInTheDocument();
    expect(
      scoped.getByText(/the real question is which model/),
    ).toBeInTheDocument();

    const copyButtons = scoped.getAllByText("Copy");
    await user.click(copyButtons[copyButtons.length - 1]);

    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining("Run the tech-lead subagent"),
    );
  });

  it("renders Turkish tech-lead example and watch-it-live callout copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const nhowSection = document.getElementById("nhow");
    expect(nhowSection).not.toBeNull();
    const scoped = within(nhowSection as HTMLElement);

    expect(scoped.getByText("Canlı izle:")).toBeInTheDocument();
    expect(
      scoped.getByText(/tech-lead subagent'ını çalıştır/),
    ).toBeInTheDocument();
  });

  it("renders the scenario paragraph and all 3 rows of the model-resolution table in the Model Resolution section for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const nmodelresSection = document.getElementById("nmodelres");
    expect(nmodelresSection).not.toBeNull();
    const scoped = within(nmodelresSection as HTMLElement);

    expect(
      scoped.getByText(/the main chat runs/),
    ).toBeInTheDocument();
    expect(scoped.getByText("Main chat")).toBeInTheDocument();
    expect(scoped.getByText("team-lead subagent")).toBeInTheDocument();
    expect(scoped.getByText("nested subagent")).toBeInTheDocument();
    expect(scoped.getAllByText("opus").length).toBeGreaterThanOrEqual(1);
  });

  it("renders Turkish Model Resolution scenario copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const nmodelresSection = document.getElementById("nmodelres");
    expect(nmodelresSection).not.toBeNull();
    const scoped = within(nmodelresSection as HTMLElement);

    expect(
      scoped.getByText(/Senaryo: ana sohbet/),
    ).toBeInTheDocument();
    expect(scoped.getByText("Ana sohbet")).toBeInTheDocument();
  });

  it("renders the official-docs callout and the ambiguous-for-multi-level-chains danger callout for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const nmodelresSection = document.getElementById("nmodelres");
    expect(nmodelresSection).not.toBeNull();
    const scoped = within(nmodelresSection as HTMLElement);

    expect(scoped.getByText("What the official docs say:")).toBeInTheDocument();
    expect(
      scoped.getByText(/defaults to the main conversation's model/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("Ambiguous for multi-level chains:"),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/github.com\/anthropics\/claude-code\/issues\/19174/),
    ).toBeInTheDocument();
  });

  it("renders Turkish official-docs and ambiguity callout copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const nmodelresSection = document.getElementById("nmodelres");
    expect(nmodelresSection).not.toBeNull();
    const scoped = within(nmodelresSection as HTMLElement);

    expect(scoped.getByText("Resmi doküman ne diyor:")).toBeInTheDocument();
    expect(
      scoped.getByText("Çok-seviyeli zincirde belirsiz:"),
    ).toBeInTheDocument();
  });

  it("renders the practical-answer callout and the settings.json hook code block with working copy-to-clipboard for the en locale", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText");
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const nmodelresSection = document.getElementById("nmodelres");
    expect(nmodelresSection).not.toBeNull();
    const scoped = within(nmodelresSection as HTMLElement);

    expect(
      scoped.getByText("Practical answer — don't guess, verify:"),
    ).toBeInTheDocument();
    expect(scoped.getByText(/"PostToolUse"/)).toBeInTheDocument();
    expect(scoped.getAllByText(/resolvedModel/).length).toBeGreaterThan(0);
    expect(
      scoped.getByText(/Open a second terminal with/),
    ).toBeInTheDocument();

    const copyButtons = scoped.getAllByText("Copy");
    await user.click(copyButtons[copyButtons.length - 1]);

    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining('"PostToolUse"'),
    );
  });

  it("renders Turkish practical-answer callout and explanatory paragraph copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const nmodelresSection = document.getElementById("nmodelres");
    expect(nmodelresSection).not.toBeNull();
    const scoped = within(nmodelresSection as HTMLElement);

    expect(
      scoped.getByText("Pratik cevap — tahmin etme, doğrula:"),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/İkinci bir terminalde/),
    ).toBeInTheDocument();
  });

  it("renders the two-prerequisites callout and the closing remove-ambiguity callout for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const nmodelresSection = document.getElementById("nmodelres");
    expect(nmodelresSection).not.toBeNull();
    const scoped = within(nmodelresSection as HTMLElement);

    expect(scoped.getByText("Two prerequisites:")).toBeInTheDocument();
    expect(
      scoped.getByText(/requires Claude Code ≥2.1.174/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("To remove the ambiguity entirely:"),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/forces one model across every level of the chain/),
    ).toBeInTheDocument();
  });

  it("renders Turkish two-prerequisites and remove-ambiguity callout copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const nmodelresSection = document.getElementById("nmodelres");
    expect(nmodelresSection).not.toBeNull();
    const scoped = within(nmodelresSection as HTMLElement);

    expect(scoped.getByText("İki ön koşul:")).toBeInTheDocument();
    expect(
      scoped.getByText("Belirsizliği tamamen kaldırmak istersen:"),
    ).toBeInTheDocument();
  });

  it("renders all 3 decision-tree questions with their yes/no outcomes for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const treeSection = document.getElementById("tree");
    expect(treeSection).not.toBeNull();
    const scoped = within(treeSection as HTMLElement);

    expect(
      scoped.getByText("1. Are the subtasks independent of each other?"),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("3. Will you need to debug the intermediate steps?"),
    ).toBeInTheDocument();
    expect(scoped.getByText("Parallel")).toBeInTheDocument();
    expect(scoped.getByText(/Nesting is safe/)).toBeInTheDocument();
  });

  it("renders the same decision-tree questions for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const treeSection = document.getElementById("tree");
    expect(treeSection).not.toBeNull();
    const scoped = within(treeSection as HTMLElement);

    expect(
      scoped.getByText("1. Alt görevler birbirinden bağımsız mı?"),
    ).toBeInTheDocument();
  });

  it("renders all 5 Best Practices checklist items for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const bestSection = document.getElementById("best");
    expect(bestSection).not.toBeNull();
    const scoped = within(bestSection as HTMLElement);

    const items = [
      "Verify independence before parallelizing",
      "State explicitly when you want parallelism",
      "Grant the Agent tool only to the lead",
      "Use worktrees for parallel work that writes files",
      "Treat depth 5 as a warning sign, not a target",
    ];
    for (const item of items) {
      expect(scoped.getByText(item)).toBeInTheDocument();
    }
  });

  it("renders the same 5 checklist items for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const bestSection = document.getElementById("best");
    expect(bestSection).not.toBeNull();
    const scoped = within(bestSection as HTMLElement);

    expect(
      scoped.getByText("Bağımsızlığı önce doğrula, sonra paralelleştir"),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("Derinlik 5'i tavan değil, uyarı sinyali say"),
    ).toBeInTheDocument();
  });

  it("renders all 4 TL;DR takeaway cards and the closing final-rule callout for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const tldrSection = document.getElementById("tldr");
    expect(tldrSection).not.toBeNull();
    const scoped = within(tldrSection as HTMLElement);

    expect(scoped.getByText("Parallel = one message.")).toBeInTheDocument();
    expect(
      scoped.getByText("Nested = grant or withhold the Agent tool."),
    ).toBeInTheDocument();
    expect(scoped.getByText("Results always get summarized.")).toBeInTheDocument();
    expect(scoped.getByText("Remember the limits.")).toBeInTheDocument();

    expect(scoped.getByText("Final rule:")).toBeInTheDocument();
    expect(
      scoped.getByText(/If the noise is layered/),
    ).toBeInTheDocument();
  });

  it("renders Turkish TL;DR card copy and final-rule callout for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const tldrSection = document.getElementById("tldr");
    expect(tldrSection).not.toBeNull();
    const scoped = within(tldrSection as HTMLElement);

    expect(
      scoped.getByText("Sonuç her zaman özetlenir."),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Gürültü katmanlıysa/),
    ).toBeInTheDocument();
  });

  it("has no leftover placeholder text and every TOC anchor resolves to a real section, for both locales", async () => {
    const expectedIds = [
      "bridge",
      "pmodel",
      "pbenefit",
      "ptrigger",
      "puse",
      "pcaution",
      "nmodel",
      "nmech",
      "npro",
      "ncon",
      "nhow",
      "nmodelres",
      "tree",
      "best",
      "tldr",
    ];

    for (const locale of ["en", "tr"] as const) {
      const ui = await Page({ params: Promise.resolve({ locale }) });
      const { unmount } = render(ui);

      expect(screen.queryByText("Content coming soon.")).toBeNull();
      expect(screen.queryByText("İçerik yakında.")).toBeNull();

      for (const id of expectedIds) {
        const anchor = document.querySelector(`a[href="#${id}"]`);
        expect(anchor, `expected a TOC link to #${id} for locale ${locale}`).not.toBeNull();
        expect(
          document.getElementById(id),
          `expected a section with id #${id} for locale ${locale}`,
        ).not.toBeNull();
      }

      unmount();
    }
  });
});
