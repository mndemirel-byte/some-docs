import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Page from "./page";
import fileTreeStyles from "@/components/doc/file-tree.module.css";

describe("Agentic workflow cheat sheet doc page", () => {
  it("renders the English hero title for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Agentic");
    expect(heading.textContent).toContain("Cheat Sheet");
  });

  it("renders the Turkish hero description for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    expect(
      screen.getByText(/Oturumdan sonra tekrar bakılacak pratik referans/),
    ).toBeInTheDocument();
  });

  it("renders a table of contents with all 13 section anchors", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const expectedIds = [
      "mental",
      "structure",
      "setup",
      "claude",
      "rules",
      "settings",
      "commands",
      "skills",
      "agents",
      "hooks",
      "plugin",
      "context",
      "patterns",
    ];

    for (const id of expectedIds) {
      expect(
        document.querySelector(`a[href="#${id}"]`),
        `expected a TOC link to #${id}`,
      ).not.toBeNull();
    }
  });

  it("renders all 13 English section placeholder headings with correct ids", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const expected: [string, string][] = [
      ["mental", "Mental model"],
      ["structure", "File structure"],
      ["setup", "Setup commands"],
      ["claude", "CLAUDE.md"],
      ["rules", "rules"],
      ["settings", "settings.json"],
      ["commands", "commands"],
      ["skills", "skills"],
      ["agents", "agents"],
      ["hooks", "hooks"],
      ["plugin", "plugin"],
      ["context", "context / token management"],
      ["patterns", "Do / Don't"],
    ];

    for (const [id, label] of expected) {
      const heading = screen.getByRole("heading", { level: 2, name: label });
      expect(heading.closest(`#${id}`)).not.toBeNull();
    }
  });

  it("renders all 13 Turkish section placeholder headings with correct ids", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const expected: [string, string][] = [
      ["mental", "Mental model"],
      ["structure", "Dosya yapısı"],
      ["setup", "Setup komutları"],
      ["claude", "CLAUDE.md"],
      ["rules", "rules"],
      ["settings", "settings.json"],
      ["commands", "commands"],
      ["skills", "skills"],
      ["agents", "agents"],
      ["hooks", "hooks"],
      ["plugin", "plugin"],
      ["context", "context / token yönetimi"],
      ["patterns", "Yap / Yapma"],
    ];

    for (const [id, label] of expected) {
      const heading = screen.getByRole("heading", { level: 2, name: label });
      expect(heading.closest(`#${id}`)).not.toBeNull();
    }
  });

  it("renders a mental-model card grid covering all 7 concepts for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const mentalSection = document.getElementById("mental");
    expect(mentalSection).not.toBeNull();
    const scoped = within(mentalSection as HTMLElement);

    const conceptTitles = [
      "rules",
      "CLAUDE.md",
      "settings.json",
      "commands",
      "skills",
      "agents",
      "hooks",
    ];
    for (const title of conceptTitles) {
      expect(scoped.getAllByText(title).length).toBeGreaterThan(0);
    }
  });

  it("renders Turkish mental-model copy and both callouts for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const mentalSection = document.getElementById("mental");
    expect(mentalSection).not.toBeNull();
    const scoped = within(mentalSection as HTMLElement);

    expect(
      scoped.getByText(/Kalıcı davranış standardı, kodlama prensipleri/),
    ).toBeInTheDocument();
    expect(scoped.getByText(/Kısa ayrım:/)).toBeInTheDocument();
    expect(scoped.getByText(/Skill ↔ Agent ilişkisi:/)).toBeInTheDocument();
  });

  it("renders the recommended file tree and a folder-responsibility row for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const structureSection = document.getElementById("structure");
    expect(structureSection).not.toBeNull();
    const scoped = within(structureSection as HTMLElement);

    expect(scoped.getByText("your-project/")).toHaveClass(
      fileTreeStyles.dirName,
    );

    const claudeMdEntries = scoped.getAllByText("CLAUDE.md");
    const specialEntry = claudeMdEntries.find((el) =>
      el.classList.contains(fileTreeStyles.specialName),
    );
    expect(specialEntry).not.toBeUndefined();

    const readmeEntries = scoped.getAllByText("README.md");
    const readmeFileEntry = readmeEntries.find((el) =>
      el.classList.contains(fileTreeStyles.fileName),
    );
    expect(readmeFileEntry).not.toBeUndefined();

    expect(
      scoped.getByText(/Modular persistent instructions/),
    ).toBeInTheDocument();
  });

  it("renders Turkish file-structure copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const structureSection = document.getElementById("structure");
    expect(structureSection).not.toBeNull();
    const scoped = within(structureSection as HTMLElement);

    expect(scoped.getByText("your-project/")).toHaveClass(
      fileTreeStyles.dirName,
    );
    expect(
      scoped.getByText(/Modüler kalıcı talimatlar/),
    ).toBeInTheDocument();
  });

  it("shows the bash setup script by default and switches to PowerShell on tab click", async () => {
    const user = userEvent.setup();
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const setupSection = document.getElementById("setup");
    expect(setupSection).not.toBeNull();
    const scoped = within(setupSection as HTMLElement);

    expect(
      scoped.getByText(/mkdir -p \.claude\/skills\/\{plan,work,review,diagnose,commit\}/),
    ).toBeInTheDocument();
    expect(scoped.queryByText(/New-Item -ItemType Directory/)).toBeNull();

    await user.click(scoped.getByText("Windows (PowerShell)"));

    expect(
      scoped.getByText(/New-Item -ItemType Directory/),
    ).toBeInTheDocument();
    expect(
      scoped.queryByText(/mkdir -p \.claude\/skills\/\{plan,work,review,diagnose,commit\}/),
    ).toBeNull();
  });

  it("renders the CLAUDE.md good/avoid lists and full template for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const claudeSection = document.getElementById("claude");
    expect(claudeSection).not.toBeNull();
    const scoped = within(claudeSection as HTMLElement);

    expect(scoped.getByText("Good content")).toBeInTheDocument();
    expect(scoped.getByText("Avoid")).toBeInTheDocument();
    expect(scoped.getByText("Project goal")).toBeInTheDocument();
    expect(
      scoped.getByText("Roadmaps that will not be maintained"),
    ).toBeInTheDocument();

    expect(
      scoped.getByText(/Default development flow is Plan -> Work -> Review\./),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Do not delete files without explicit instruction\./),
    ).toBeInTheDocument();
  });

  it("renders Turkish CLAUDE.md good/avoid copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const claudeSection = document.getElementById("claude");
    expect(claudeSection).not.toBeNull();
    const scoped = within(claudeSection as HTMLElement);

    expect(scoped.getByText("İyi içerikler")).toBeInTheDocument();
    expect(scoped.getByText("Kaçınılacak şeyler")).toBeInTheDocument();
    expect(scoped.getByText("Proje amacı")).toBeInTheDocument();
    expect(
      scoped.getByText(/Default development flow is Plan -> Work -> Review\./),
    ).toBeInTheDocument();
  });

  it("renders the rules file tree, both code examples, comparison table, and callouts for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const rulesSection = document.getElementById("rules");
    expect(rulesSection).not.toBeNull();
    const scoped = within(rulesSection as HTMLElement);

    expect(
      scoped.getByText(/tiny global rules; loads every session/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Validate request input at the boundary\./),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Prefer small, focused components\./),
    ).toBeInTheDocument();
    expect(scoped.getByText(/Global rule/)).toBeInTheDocument();
    expect(scoped.getByText(/Why frontmatter matters:/)).toBeInTheDocument();
    expect(
      scoped.getByText(/Practical rule strategy:/),
    ).toBeInTheDocument();
  });

  it("renders Turkish rules copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const rulesSection = document.getElementById("rules");
    expect(rulesSection).not.toBeNull();
    const scoped = within(rulesSection as HTMLElement);

    expect(
      scoped.getByText(/tiny global rules; loads every session/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Frontmatter neden önemli\?/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Pratik rule stratejisi:/),
    ).toBeInTheDocument();
  });

  it("renders the settings scope table, example, and closing callout for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const settingsSection = document.getElementById("settings");
    expect(settingsSection).not.toBeNull();
    const scoped = within(settingsSection as HTMLElement);

    expect(scoped.getByText("Personal preferences and global settings.")).toBeInTheDocument();
    expect(scoped.getByText("Shared team/repository settings.")).toBeInTheDocument();
    expect(
      scoped.getByText(/Bash\(git push --force\*\)/),
    ).toBeInTheDocument();
    expect(scoped.getByText(/Best practice:/)).toBeInTheDocument();
  });

  it("renders Turkish settings.json copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const settingsSection = document.getElementById("settings");
    expect(settingsSection).not.toBeNull();
    const scoped = within(settingsSection as HTMLElement);

    expect(scoped.getByText("Kişisel tercih ve global ayarlar.")).toBeInTheDocument();
    expect(scoped.getByText("Takım/repo için ortak ayarlar.")).toBeInTheDocument();
    expect(
      scoped.getByText(/Bash\(git push --force\*\)/),
    ).toBeInTheDocument();
    expect(scoped.getByText(/Best practice:/)).toBeInTheDocument();
  });

  it("renders the commands comparison tables and file-tree examples for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const commandsSection = document.getElementById("commands");
    expect(commandsSection).not.toBeNull();
    const scoped = within(commandsSection as HTMLElement);

    expect(
      scoped.getByText("Reusable procedures such as planning, implementation, review, diagnose, commit"),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("Inspect usage, cost, or limits."),
    ).toBeInTheDocument();
    expect(scoped.getByText("SKILL.md")).toHaveClass(fileTreeStyles.fileName);
    expect(scoped.getByText("plan.md")).toHaveClass(fileTreeStyles.fileName);
  });

  it("renders Turkish commands copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const commandsSection = document.getElementById("commands");
    expect(commandsSection).not.toBeNull();
    const scoped = within(commandsSection as HTMLElement);

    expect(
      scoped.getByText(/Yeni custom workflow için bunu kullan\./),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("Kullanım, maliyet veya limit durumunu görmek."),
    ).toBeInTheDocument();
    expect(scoped.getByText("SKILL.md")).toHaveClass(fileTreeStyles.fileName);
  });

  it("renders all 5 skill disclosures and expands the plan skill's verbatim SKILL.md for the en locale", async () => {
    const user = userEvent.setup();
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const skillsSection = document.getElementById("skills");
    expect(skillsSection).not.toBeNull();
    const scoped = within(skillsSection as HTMLElement);

    expect(scoped.getByText(/Inline skill/)).toBeInTheDocument();
    expect(
      scoped.getByText(/Skills can be invoked in two ways/),
    ).toBeInTheDocument();

    const skillNames = ["plan", "work", "review", "diagnose", "commit"];
    for (const name of skillNames) {
      expect(scoped.getAllByText(name).length).toBeGreaterThan(0);
    }

    expect(
      scoped.queryByText(/description: Clarify requirements and turn broad work/),
    ).toBeNull();

    await user.click(scoped.getByText("Clarify requirements and create issues"));

    expect(
      scoped.getByText(/description: Clarify requirements and turn broad work into small implementation issues\./),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Prefer tracer-bullet issues that produce visible behavior\./),
    ).toBeInTheDocument();
  });

  it("renders Turkish skills copy and all 5 skill triggers for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const skillsSection = document.getElementById("skills");
    expect(skillsSection).not.toBeNull();
    const scoped = within(skillsSection as HTMLElement);

    expect(
      scoped.getByText(/skill içeriğini ana session context'ine yükler\./),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Skill'ler iki şekilde devreye girebilir/),
    ).toBeInTheDocument();

    const skillDescriptions = [
      "Gereksinim netleştirme ve issue çıkarma",
      "Tek scoped işi uygula",
      "Diff review prosedürü",
      "Debugging prosedürü",
      "Commit hazırlığı",
    ];
    for (const description of skillDescriptions) {
      expect(scoped.getByText(description)).toBeInTheDocument();
    }
  });

  it("renders all 3 agent disclosures and expands the planner agent's verbatim markdown for the en locale", async () => {
    const user = userEvent.setup();
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const agentsSection = document.getElementById("agents");
    expect(agentsSection).not.toBeNull();
    const scoped = within(agentsSection as HTMLElement);

    expect(
      scoped.getByText(/field preloads selected skill content into the agent at startup\./),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/You implement one scoped API task\. Follow the preloaded conventions\./),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("On-demand Skill tool"),
    ).toBeInTheDocument();

    const agentDescriptions = [
      "Creates plans/issues without writing production code",
      "Implements one task",
      "Reviews the diff",
    ];
    for (const description of agentDescriptions) {
      expect(scoped.getByText(description)).toBeInTheDocument();
    }

    expect(
      scoped.queryByText(/description: Clarifies requirements, creates PRDs\/issues/),
    ).toBeNull();

    await user.click(scoped.getByText("Creates plans/issues without writing production code"));

    expect(
      scoped.getByText(/description: Clarifies requirements, creates PRDs\/issues, and does not write production code\./),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Prefer implementation issues that can be completed and reviewed independently\./),
    ).toBeInTheDocument();
  });

  it("renders Turkish agents copy and all 3 agent triggers for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const agentsSection = document.getElementById("agents");
    expect(agentsSection).not.toBeNull();
    const scoped = within(agentsSection as HTMLElement);

    expect(
      scoped.getByText(/alanı agent'ın bazı skill içeriklerini başlangıçta preload etmesi içindir\./),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Agent'a geniş yetki vermek yerine/),
    ).toBeInTheDocument();

    const agentDescriptions = [
      "Kod yazmadan plan/issue üretir",
      "Tek işi uygular",
      "Diff'i inceler",
    ];
    for (const description of agentDescriptions) {
      expect(scoped.getByText(description)).toBeInTheDocument();
    }
  });

  it("renders the hook-type table, both code examples, and closing callout for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const hooksSection = document.getElementById("hooks");
    expect(hooksSection).not.toBeNull();
    const scoped = within(hooksSection as HTMLElement);

    expect(
      scoped.getByText("Block risky bash commands or require approval."),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Reminder: file changed\. Run the smallest relevant test before continuing\./),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/"command": "echo 'File changed\. Consider running tests\.'"/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Keep hooks boring and safe\./),
    ).toBeInTheDocument();
  });

  it("renders Turkish hooks copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const hooksSection = document.getElementById("hooks");
    expect(hooksSection).not.toBeNull();
    const scoped = within(hooksSection as HTMLElement);

    expect(
      scoped.getByText("Riskli bash komutunu engellemek veya onay istemek."),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Reminder: file changed\. Run the smallest relevant test before continuing\./),
    ).toBeInTheDocument();
    expect(
      scoped.getByText(/Hook'ları sıkıcı ve güvenli tut\./),
    ).toBeInTheDocument();
  });

  it("renders the local-vs-GitHub comparison, plugin tree, plugin.json, and closing table for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const pluginSection = document.getElementById("plugin");
    expect(pluginSection).not.toBeNull();
    const scoped = within(pluginSection as HTMLElement);

    expect(scoped.getByText("When local?")).toBeInTheDocument();
    expect(scoped.getByText("When GitHub?")).toBeInTheDocument();
    expect(scoped.getByText("Personal workflow experiments")).toBeInTheDocument();
    expect(scoped.getByText("plugin.json")).toHaveClass(fileTreeStyles.fileName);
    expect(
      scoped.getByText(/Reusable Plan -> Work -> Review workflow for Claude Code/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("Explains installation, usage, and the workflow provided."),
    ).toBeInTheDocument();
  });

  it("renders Turkish plugin copy for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const pluginSection = document.getElementById("plugin");
    expect(pluginSection).not.toBeNull();
    const scoped = within(pluginSection as HTMLElement);

    expect(scoped.getByText("Ne zaman lokal?")).toBeInTheDocument();
    expect(scoped.getByText("Ne zaman GitHub?")).toBeInTheDocument();
    expect(scoped.getByText("Kişisel workflow denemesi")).toBeInTheDocument();
    expect(scoped.getByText("plugin.json")).toHaveClass(fileTreeStyles.fileName);
    expect(
      scoped.getByText(/Reusable Plan -> Work -> Review workflow for Claude Code/),
    ).toBeInTheDocument();
    expect(
      scoped.getByText("Kurulum, kullanım ve hangi workflow'u sağladığını açıklar."),
    ).toBeInTheDocument();
  });

  it("renders all 4 context/token management flow steps in order for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const contextSection = document.getElementById("context");
    expect(contextSection).not.toBeNull();
    const scoped = within(contextSection as HTMLElement);

    const headings = scoped.getAllByRole("heading", { level: 4 });
    expect(headings.map((h) => h.textContent)).toEqual([
      "Keep sessions small.",
      "Write decisions to files.",
      "Use compact/clear when context grows.",
      "Choose models by task type.",
    ]);
  });

  it("renders all 4 Turkish context/token management flow steps in order for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const contextSection = document.getElementById("context");
    expect(contextSection).not.toBeNull();
    const scoped = within(contextSection as HTMLElement);

    const headings = scoped.getAllByRole("heading", { level: 4 });
    expect(headings.map((h) => h.textContent)).toEqual([
      "Session'ı küçük tut.",
      "Kararı dosyaya yaz.",
      "Context şişince compact/clear kullan.",
      "Model seçimini iş tipine göre yap.",
    ]);
  });

  it("renders all 5 Do items and 5 Don't items for the en locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const patternsSection = document.getElementById("patterns");
    expect(patternsSection).not.toBeNull();
    const scoped = within(patternsSection as HTMLElement);

    const doItems = [
      "Split work into small vertical slices.",
      "Give explicit test commands.",
      "Stop when scope expands.",
      "Make review part of the process.",
      "Move repeated procedures into skills/plugins.",
    ];
    const dontItems = [
      "Do not ask for a complete feature in one prompt.",
      "Do not merge untested AI-written code.",
      "Do not turn CLAUDE.md into a junk drawer.",
      "Do not put complex decision logic into hooks.",
      "Do not give agents unlimited scope.",
    ];
    for (const text of [...doItems, ...dontItems]) {
      expect(scoped.getByText(text)).toBeInTheDocument();
    }
  });

  it("renders all 5 Turkish Yap items and 5 Yapma items for the tr locale", async () => {
    const ui = await Page({ params: Promise.resolve({ locale: "tr" }) });
    render(ui);

    const patternsSection = document.getElementById("patterns");
    expect(patternsSection).not.toBeNull();
    const scoped = within(patternsSection as HTMLElement);

    const doItems = [
      "İşi küçük vertical slice'lara böl.",
      "Agent'a test komutlarını açık ver.",
      "Scope dışına çıkınca durdur.",
      "Review'u sürecin parçası yap.",
      "Tekrar eden prosedürü skill/plugin yap.",
    ];
    const dontItems = [
      "Tek prompt ile komple feature yaptırma.",
      "Testsiz AI kodunu merge etme.",
      "CLAUDE.md'yi çöplüğe çevirme.",
      "Hook'lara karmaşık karar mantığı koyma.",
      "Agent'a sınırsız scope verme.",
    ];
    for (const text of [...doItems, ...dontItems]) {
      expect(scoped.getByText(text)).toBeInTheDocument();
    }
  });

  it("has no leftover placeholder text and every TOC anchor resolves to a real section, for both locales", async () => {
    for (const locale of ["en", "tr"] as const) {
      const ui = await Page({ params: Promise.resolve({ locale }) });
      const { unmount } = render(ui);

      expect(screen.queryByText("Content coming soon.")).toBeNull();
      expect(screen.queryByText("İçerik yakında.")).toBeNull();

      const expectedIds = [
        "mental",
        "structure",
        "setup",
        "claude",
        "rules",
        "settings",
        "commands",
        "skills",
        "agents",
        "hooks",
        "plugin",
        "context",
        "patterns",
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
