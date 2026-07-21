import styles from "./nested-tree-diagram.module.css";

export function NestedTreeDiagram() {
  return (
    <div className={styles.wrap}>
      <svg
        viewBox="0 0 920 260"
        role="img"
        aria-label="Nested subagent tree: main thread, team lead, developer"
      >
        <defs>
          <marker id="ntd-arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" style={{ fill: "var(--accent)" }} />
          </marker>
        </defs>

        <rect x="20" y="90" width="210" height="80" rx="18" style={{ fill: "var(--surface)", stroke: "var(--border-strong)" }} />
        <text x="42" y="124" fontSize="16" fontWeight="700" style={{ fill: "var(--text)" }}>
          MAIN THREAD
        </text>
        <text x="42" y="146" fontSize="11" style={{ fill: "var(--muted)" }}>
          tools: Agent
        </text>

        <rect x="345" y="90" width="210" height="80" rx="18" style={{ fill: "var(--accent-bg)", stroke: "var(--accent-border)" }} />
        <text x="367" y="124" fontSize="16" fontWeight="700" style={{ fill: "var(--accent-text)" }}>
          team-lead
        </text>
        <text x="367" y="146" fontSize="11" style={{ fill: "var(--accent-text)" }}>
          tools: ..., Agent
        </text>

        <rect x="670" y="90" width="220" height="80" rx="18" style={{ fill: "var(--surface2)", stroke: "var(--border)" }} />
        <text x="692" y="124" fontSize="14" style={{ fill: "var(--text)" }}>
          developer
        </text>
        <text x="692" y="146" fontSize="11" style={{ fill: "var(--muted)" }}>
          tools: Read, Edit — no Agent
        </text>

        <path d="M230 130 H345" style={{ stroke: "var(--accent)" }} strokeWidth="2.5" fill="none" markerEnd="url(#ntd-arrow)" />
        <path d="M555 130 H670" style={{ stroke: "var(--accent)" }} strokeWidth="2.5" fill="none" markerEnd="url(#ntd-arrow)" />

        <text x="235" y="188" fontSize="11" style={{ fill: "var(--amber)" }}>
          level 1
        </text>
        <text x="565" y="188" fontSize="11" style={{ fill: "var(--amber)" }}>
          level 2 · depth limit 5
        </text>
      </svg>
      <div className={styles.legend}>
        <span>🧠 main thread only sees team-lead</span>
        <span>🔒 an agent without the Agent tool can never nest further</span>
        <span>📏 max 5 levels</span>
      </div>
    </div>
  );
}
