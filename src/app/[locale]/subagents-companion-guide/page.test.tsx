import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Page from "./page";

describe("Subagents companion guide doc page", () => {
  it("renders the English hero title for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Subagents");
    expect(heading.textContent).toContain("Companion Guide");
  });

  it("renders the Turkish hero description for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    expect(
      screen.getByText(/context'i koruyan, araçları sınırlayan/),
    ).toBeInTheDocument();
  });

  it("renders a table of contents with all 14 section anchors, for both locales", async () => {
    const expectedIds = [
      "mental",
      "compare",
      "lifecycle",
      "anatomy",
      "description",
      "prompt",
      "output",
      "tools",
      "models",
      "usecases",
      "anti",
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

  it("renders all 14 section headings with correct ids, for both locales", async () => {
    const expectedIds = [
      "mental",
      "compare",
      "lifecycle",
      "anatomy",
      "description",
      "prompt",
      "output",
      "tools",
      "models",
      "usecases",
      "anti",
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

  it("renders the Mental Model diagram and closing callout for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const mentalSection = document.getElementById("mental");
    expect(mentalSection).not.toBeNull();
    const scoped = within(mentalSection as HTMLElement);

    expect(scoped.getByText("MAIN THREAD")).toBeInTheDocument();
    expect(scoped.getByText("SUBAGENT")).toBeInTheDocument();
    expect(scoped.getByText(/A subagent is not a smarter agent/)).toBeInTheDocument();
  });

  it("renders the Turkish Mental Model callout for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const mentalSection = document.getElementById("mental");
    expect(mentalSection).not.toBeNull();
    const scoped = within(mentalSection as HTMLElement);

    expect(
      scoped.getByText(/Subagent daha akıllı bir agent değildir/),
    ).toBeInTheDocument();
  });

  it("renders the Main Thread vs Subagent comparison table with all 5 dimensions for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const compareSection = document.getElementById("compare");
    expect(compareSection).not.toBeNull();
    const scoped = within(compareSection as HTMLElement);

    const dimensions = ["Context", "Visibility", "Tool calls", "Context growth", "Return"];
    for (const dimension of dimensions) {
      expect(scoped.getByText(dimension)).toBeInTheDocument();
    }
    expect(
      scoped.getByText("User conversation, decisions, and ongoing work."),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("Returns a concise result, findings, or recommendation."),
    ).toBeInTheDocument();
  });

  it("renders Turkish comparison table copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const compareSection = document.getElementById("compare");
    expect(compareSection).not.toBeNull();
    const scoped = within(compareSection as HTMLElement);

    expect(
      scoped.getByText("Ayrı context; görev prompt'u ve kendi sistem talimatı."),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("Kısa sonuç, bulgular veya öneri döner."),
    ).toBeInTheDocument();
  });

  it("renders the YES/NO decision panel and closing decision-rule callout for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const compareSection = document.getElementById("compare");
    expect(compareSection).not.toBeNull();
    const scoped = within(compareSection as HTMLElement);

    expect(scoped.getByText("YES — Main Thread")).toBeInTheDocument();
    expect(scoped.getByText("NO — Subagent")).toBeInTheDocument();
    expect(
      scoped.getByText(/Use it when intermediate work affects later decisions/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Does the intermediate work matter\?/),
    ).toBeInTheDocument();
  });

  it("renders all 7 lifecycle steps in order for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const lifecycleSection = document.getElementById("lifecycle");
    expect(lifecycleSection).not.toBeNull();
    const scoped = within(lifecycleSection as HTMLElement);

    const headings = scoped.getAllByRole("heading", { level: 4 });
    expect(headings.map((h) => h.textContent)).toEqual([
      "User",
      "Main Agent",
      "Task Prompt",
      "Launch Subagent",
      "Research / Work",
      "Summary",
      "Destroy Context",
    ]);
  });

  it("renders all 7 Turkish lifecycle step descriptions for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const lifecycleSection = document.getElementById("lifecycle");
    expect(lifecycleSection).not.toBeNull();
    const scoped = within(lifecycleSection as HTMLElement);

    expect(scoped.getByText("Bir hedef veya problem verir.")).toBeInTheDocument();
    expect(
      scoped.getByText("Ara çalışma ana context'e taşınmaz; yalnızca sonuç kalır."),
    ).toBeInTheDocument();
  });

  it("renders the Anatomy section's YAML Frontmatter and System Prompt cards for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const anatomySection = document.getElementById("anatomy");
    expect(anatomySection).not.toBeNull();
    const scoped = within(anatomySection as HTMLElement);

    expect(scoped.getByText("YAML Frontmatter")).toBeInTheDocument();
    expect(scoped.getByText("System Prompt")).toBeInTheDocument();
    expect(
      scoped.getByText(/Identity, delegation description, tools, model, and UI color\./),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Not just a role; it defines scope, behavior, boundaries, and output contract\./),
    ).toBeInTheDocument();
  });

  it("renders Turkish Anatomy card copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const anatomySection = document.getElementById("anatomy");
    expect(anatomySection).not.toBeNull();
    const scoped = within(anatomySection as HTMLElement);

    expect(
      scoped.getByText(/Kimlik, delegation açıklaması, tools, model ve UI rengi\./),
    ).toBeInTheDocument();
  });

  it("renders the code-reviewer.md example with a working copy-to-clipboard button for the en locale", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText");
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const anatomySection = document.getElementById("anatomy");
    expect(anatomySection).not.toBeNull();
    const scoped = within(anatomySection as HTMLElement);

    expect(scoped.getByText(/name: code-reviewer/)).toBeInTheDocument();
    expect(
      scoped.getByText(/tools: Read, Grep, Glob, Bash/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/1\. Verdict: PASS or NEEDS_CHANGES/),
    ).toBeInTheDocument();

    await user.click(scoped.getByText("Copy"));

    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining("name: code-reviewer"),
    );
  });

  it("renders the Anatomy section's closing note about required frontmatter fields for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const anatomySection = document.getElementById("anatomy");
    expect(anatomySection).not.toBeNull();
    const scoped = within(anatomySection as HTMLElement);

    expect(scoped.getByText("Current note:")).toBeInTheDocument();
    expect(scoped.getByText(/Only/).textContent).toContain("are required");
    expect(
      scoped.getByText(/inherits available tools/),
    ).toBeInTheDocument();
  });

  it("renders the bad/good description examples with their code snippets for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const descriptionSection = document.getElementById("description");
    expect(descriptionSection).not.toBeNull();
    const scoped = within(descriptionSection as HTMLElement);

    expect(
      scoped.getByText("description: Expert reviewer for code."),
    ).toBeInTheDocument();
    expect(scoped.getByText(/Vague trigger, vague scope/)).toBeInTheDocument();

    expect(
      scoped.getByText(/description: Reviews completed code changes for correctness/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Clear job, trigger, and focus areas\./),
    ).toBeInTheDocument();
  });

  it("renders Turkish bad/good description copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const descriptionSection = document.getElementById("description");
    expect(descriptionSection).not.toBeNull();
    const scoped = within(descriptionSection as HTMLElement);

    expect(
      scoped.getByText(/Belirsiz tetikleyici, belirsiz scope/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Ne yaptığı, ne zaman kullanılacağı ve neye bakacağı açık\./),
    ).toBeInTheDocument();
  });

  it("renders the Turkish Anatomy closing note for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const anatomySection = document.getElementById("anatomy");
    expect(anatomySection).not.toBeNull();
    const scoped = within(anatomySection as HTMLElement);

    expect(scoped.getByText("Güncel not:")).toBeInTheDocument();
    expect(
      scoped.getByText(/Yalnızca/).textContent,
    ).toContain("zorunludur");
    expect(
      scoped.getByText(/mevcut araçlar miras alınır/),
    ).toBeInTheDocument();
  });

  it("renders the result-contract template and the Readable/Comparable/Finite cards for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const outputSection = document.getElementById("output");
    expect(outputSection).not.toBeNull();
    const scoped = within(outputSection as HTMLElement);

    expect(scoped.getByText(/## Verdict/)).toBeInTheDocument();
    expect(scoped.getByText(/PASS \| NEEDS_CHANGES \| BLOCKED/)).toBeInTheDocument();
    expect(scoped.getByText(/Maximum 5 bullets\./)).toBeInTheDocument();

    expect(scoped.getByText("Readable")).toBeInTheDocument();
    expect(scoped.getByText("Comparable")).toBeInTheDocument();
    expect(scoped.getByText("Finite")).toBeInTheDocument();
    expect(
      scoped.getByText("The parent can process results quickly."),
    ).toBeInTheDocument();
  });

  it("renders Turkish Structured Output card copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const outputSection = document.getElementById("output");
    expect(outputSection).not.toBeNull();
    const scoped = within(outputSection as HTMLElement);

    expect(
      scoped.getByText("Farklı run'lar aynı formatta karşılaştırılır."),
    ).toBeInTheDocument();
    expect(scoped.getByText("Şablon tamamlandığında iş biter.")).toBeInTheDocument();
  });

  it("renders the Least Privilege callout and all 4 tool-permission table rows for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const toolsSection = document.getElementById("tools");
    expect(toolsSection).not.toBeNull();
    const scoped = within(toolsSection as HTMLElement);

    expect(scoped.getByText("Least Privilege:")).toBeInTheDocument();
    expect(
      scoped.getByText(/Do not grant tools "just in case\."/),
    ).toBeInTheDocument();

    const agents = ["Research Agent", "Reviewer", "Writer", "Styling Agent"];
    for (const agent of agents) {
      expect(scoped.getByText(agent)).toBeInTheDocument();
    }
    expect(
      scoped.getByText("Explores the codebase without changing it."),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("Finds UI files and makes scoped changes."),
    ).toBeInTheDocument();
  });

  it("renders Turkish Tool Permissions table copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const toolsSection = document.getElementById("tools");
    expect(toolsSection).not.toBeNull();
    const scoped = within(toolsSection as HTMLElement);

    expect(
      scoped.getByText("Diff ve test çıktısı görür; dosya edit'lemez."),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("Doküman üretir veya günceller."),
    ).toBeInTheDocument();
  });

  it("renders the reviewer Bash-vs-Edit closing note for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const toolsSection = document.getElementById("tools");
    expect(toolsSection).not.toBeNull();
    const scoped = within(toolsSection as HTMLElement);

    expect(
      scoped.getByText("Why does a reviewer need Bash but not Edit?"),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/review and implementation must remain separate\./),
    ).toBeInTheDocument();
  });

  it("renders the Turkish reviewer Bash-vs-Edit closing note for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const toolsSection = document.getElementById("tools");
    expect(toolsSection).not.toBeNull();
    const scoped = within(toolsSection as HTMLElement);

    expect(
      scoped.getByText(/test veya lint çalıştırması gerekebilir/),
    ).toBeInTheDocument();
  });

  it("renders all 4 model cards and the closing simple-rule callout for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const modelsSection = document.getElementById("models");
    expect(modelsSection).not.toBeNull();
    const scoped = within(modelsSection as HTMLElement);

    const models = ["Haiku", "Sonnet", "Opus", "Inherit"];
    for (const model of models) {
      expect(scoped.getByText(model)).toBeInTheDocument();
    }
    expect(
      scoped.getByText("Fast lookup, classification, and small well-defined tasks."),
    ).toBeInTheDocument();
    expect(scoped.getByText("Simple rule:")).toBeInTheDocument();
    expect(
      scoped.getByText(/Increase capability as ambiguity and decision cost rise\./),
    ).toBeInTheDocument();
  });

  it("renders Turkish model card copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const modelsSection = document.getElementById("models");
    expect(modelsSection).not.toBeNull();
    const scoped = within(modelsSection as HTMLElement);

    expect(
      scoped.getByText("Parent ile aynı modeli kullanır; emin değilsen iyi başlangıç."),
    ).toBeInTheDocument();
    expect(scoped.getByText("Basit kural:")).toBeInTheDocument();
  });

  it("renders all 7 Good Use Cases cards for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const usecasesSection = document.getElementById("usecases");
    expect(usecasesSection).not.toBeNull();
    const scoped = within(usecasesSection as HTMLElement);

    const titles = [
      "Research",
      "Exploration",
      "Code Review",
      "Documentation",
      "Copywriting",
      "Design System",
      "Fresh Perspective",
    ];
    for (const title of titles) {
      expect(scoped.getByText(title)).toBeInTheDocument();
    }
    expect(
      scoped.getByText("Multi-file exploration and source gathering."),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("A second view isolated from the main thread's assumptions."),
    ).toBeInTheDocument();
  });

  it("renders Turkish Good Use Cases card copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const usecasesSection = document.getElementById("usecases");
    expect(usecasesSection).not.toBeNull();
    const scoped = within(usecasesSection as HTMLElement);

    expect(
      scoped.getByText("Kod tabanında nerede ne olduğunu bulma."),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("UI tutarlılığı ve style token denetimi."),
    ).toBeInTheDocument();
  });

  it("renders both anti-pattern panels with their why-subtext for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const antiSection = document.getElementById("anti");
    expect(antiSection).not.toBeNull();
    const scoped = within(antiSection as HTMLElement);

    expect(scoped.getByText("Expert Personas")).toBeInTheDocument();
    expect(
      scoped.getByText(/does not create quality/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Claude needs to know not who it "is,"/),
    ).toBeInTheDocument();

    expect(scoped.getByText("Test Runner Agents")).toBeInTheDocument();
    expect(
      scoped.getByText(/Prefer a hook or direct Bash\./),
    ).toBeInTheDocument();
  });

  it("renders Turkish anti-pattern panel copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const antiSection = document.getElementById("anti");
    expect(antiSection).not.toBeNull();
    const scoped = within(antiSection as HTMLElement);

    expect(
      scoped.getByText(/tek başına kalite getirmez/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Hook veya doğrudan Bash daha uygundur\./),
    ).toBeInTheDocument();
  });

  it("renders the sequential-pipeline diagram and closing handoff paragraph for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const antiSection = document.getElementById("anti");
    expect(antiSection).not.toBeNull();
    const scoped = within(antiSection as HTMLElement);

    expect(scoped.getByText("Sequential Pipelines")).toBeInTheDocument();
    expect(scoped.getByText("Researcher")).toBeInTheDocument();
    expect(scoped.getByText("Worker")).toBeInTheDocument();
    expect(
      scoped.getByText(/Every handoff compresses information and loses nuance\./),
    ).toBeInTheDocument();
  });

  it("renders the Turkish sequential-pipeline closing paragraph for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const antiSection = document.getElementById("anti");
    expect(antiSection).not.toBeNull();
    const scoped = within(antiSection as HTMLElement);

    expect(
      scoped.getByText(/Her handoff, bilgiyi sıkıştırır ve nüans kaybı yaratır\./),
    ).toBeInTheDocument();
  });

  it("renders all 8 Best Practices checklist items with checkmark markers for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const bestSection = document.getElementById("best");
    expect(bestSection).not.toBeNull();
    const scoped = within(bestSection as HTMLElement);

    const items = [
      "Narrow scope",
      "Limited tools",
      "Structured output",
      "Report obstacles",
      "Custom system prompt",
      "Concise summaries",
      "Explicit stop condition",
      "Evidence-based findings",
    ];
    for (const item of items) {
      expect(scoped.getByText(item)).toBeInTheDocument();
    }
  });

  it("renders the same 8 checklist items for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const bestSection = document.getElementById("best");
    expect(bestSection).not.toBeNull();
    const scoped = within(bestSection as HTMLElement);

    expect(scoped.getByText("Narrow scope")).toBeInTheDocument();
    expect(scoped.getByText("Evidence-based findings")).toBeInTheDocument();
  });

  it("keeps the workshop checklist collapsed by default and expands it to reveal all 6 points on click, for the en locale", async () => {
    const user = userEvent.setup();
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const bestSection = document.getElementById("best");
    expect(bestSection).not.toBeNull();
    const scoped = within(bestSection as HTMLElement);

    expect(
      scoped.queryByText(/Blocked olduğunda ne raporlayacağı belli mi\?/),
    ).toBeNull();

    await user.click(scoped.getByText("Workshop checklist — evaluating an agent file"));

    expect(scoped.getByText(/when to use/)).toBeInTheDocument();
    expect(
      scoped.getByText(/Blocked olduğunda ne raporlayacağı belli mi\?/),
    ).toBeInTheDocument();
  });

  it("uses the Turkish trigger label for the workshop checklist on the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const bestSection = document.getElementById("best");
    expect(bestSection).not.toBeNull();
    const scoped = within(bestSection as HTMLElement);

    expect(
      scoped.getByText("Workshop checklist — bir agent dosyasını değerlendirme"),
    ).toBeInTheDocument();
  });

  it("renders all 4 TL;DR takeaway cards and the closing final-rule callout for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const tldrSection = document.getElementById("tldr");
    expect(tldrSection).not.toBeNull();
    const scoped = within(tldrSection as HTMLElement);

    expect(scoped.getByText("Isolate noise.")).toBeInTheDocument();
    expect(scoped.getByText("Keep decisions.")).toBeInTheDocument();
    expect(scoped.getByText("Constrain tools.")).toBeInTheDocument();
    expect(scoped.getByText('Define "done."')).toBeInTheDocument();
    expect(
      scoped.getByText(/Keep search results, logs, and temporary file content out of the main thread\./),
    ).toBeInTheDocument();

    expect(scoped.getByText("Final rule:")).toBeInTheDocument();
    expect(
      scoped.getByText(/If it is noise, use a subagent\./),
    ).toBeInTheDocument();
  });

  it("renders Turkish TL;DR card copy and final-rule callout for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const tldrSection = document.getElementById("tldr");
    expect(tldrSection).not.toBeNull();
    const scoped = within(tldrSection as HTMLElement);

    expect(
      scoped.getByText("Gereksinimler, trade-off'lar ve kullanıcı kararları ana thread'de kalsın."),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Ara iş gürültüyse subagent\./),
    ).toBeInTheDocument();
  });

  it("renders all 6 numbered System Prompt Design checklist items and the closing avoid-persona callout for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const promptSection = document.getElementById("prompt");
    expect(promptSection).not.toBeNull();
    const scoped = within(promptSection as HTMLElement);

    expect(scoped.getByText("Scope")).toBeInTheDocument();
    expect(scoped.getByText("What exactly is in scope?")).toBeInTheDocument();
    expect(scoped.getByText("Boundaries")).toBeInTheDocument();
    expect(scoped.getByText("What must it not do?")).toBeInTheDocument();

    expect(scoped.getByText("Avoid:")).toBeInTheDocument();
    expect(
      scoped.getByText(/task boundaries and an output contract\./),
    ).toBeInTheDocument();
  });

  it("renders Turkish System Prompt Design checklist copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const promptSection = document.getElementById("prompt");
    expect(promptSection).not.toBeNull();
    const scoped = within(promptSection as HTMLElement);

    expect(scoped.getByText("Tam olarak neyi kapsıyor?")).toBeInTheDocument();
    expect(scoped.getByText("Neyi yapmamalı?")).toBeInTheDocument();
    expect(scoped.getByText("Kaçın:")).toBeInTheDocument();
  });

  it("renders all 5 decision-tree questions with their yes/no outcomes for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const treeSection = document.getElementById("tree");
    expect(treeSection).not.toBeNull();
    const scoped = within(treeSection as HTMLElement);

    expect(
      scoped.getByText("1. Do I need the intermediate work later?"),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("5. Is the task only a deterministic command?"),
    ).toBeInTheDocument();
    expect(scoped.getByText("Bash / Hook")).toBeInTheDocument();
    expect(scoped.getByText("Subagent may help")).toBeInTheDocument();
  });

  it("renders the same decision-tree questions for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const treeSection = document.getElementById("tree");
    expect(treeSection).not.toBeNull();
    const scoped = within(treeSection as HTMLElement);

    expect(
      scoped.getByText("1. Do I need the intermediate work later?"),
    ).toBeInTheDocument();
  });

  it("has no leftover placeholder text and every TOC anchor resolves to a real section, for both locales", async () => {
    for (const locale of ["en", "tr"] as const) {
      const ui = await Page({ params: Promise.resolve({ locale }) });
      const { unmount } = render(ui);

      expect(screen.queryByText("Content coming soon.")).toBeNull();
      expect(screen.queryByText("İçerik yakında.")).toBeNull();

      const expectedIds = [
        "mental",
        "compare",
        "lifecycle",
        "anatomy",
        "description",
        "prompt",
        "output",
        "tools",
        "models",
        "usecases",
        "anti",
        "tree",
        "best",
        "tldr",
      ];
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
