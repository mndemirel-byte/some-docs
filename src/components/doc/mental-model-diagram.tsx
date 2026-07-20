import styles from "./mental-model-diagram.module.css";

export function MentalModelDiagram() {
  return (
    <div className={styles.wrap}>
      <svg
        viewBox="0 0 920 350"
        role="img"
        aria-label="Main thread and subagent context diagram"
      >
        <defs>
          <marker
            id="mmd-arrow-forward"
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" style={{ fill: "var(--accent)" }} />
          </marker>
          <marker
            id="mmd-arrow-back"
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" style={{ fill: "var(--amber)" }} />
          </marker>
        </defs>

        <rect
          x="25"
          y="45"
          width="365"
          height="255"
          rx="24"
          style={{ fill: "var(--surface)", stroke: "var(--border-strong)" }}
        />
        <text x="55" y="83" fontSize="20" fontWeight="700" style={{ fill: "var(--text)" }}>
          MAIN THREAD
        </text>
        <text x="55" y="110" fontSize="13" style={{ fill: "var(--muted)" }}>
          requirements · decisions · user interaction
        </text>
        <rect
          x="58"
          y="142"
          width="300"
          height="52"
          rx="12"
          style={{ fill: "var(--accent-bg)", stroke: "var(--accent-border)" }}
        />
        <text x="80" y="174" fontSize="14" style={{ fill: "var(--accent-text)" }}>
          Research auth flow options
        </text>
        <rect
          x="58"
          y="216"
          width="300"
          height="52"
          rx="12"
          style={{ fill: "var(--amber-bg)", stroke: "var(--amber-border)" }}
        />
        <text x="80" y="248" fontSize="14" style={{ fill: "var(--amber-text)" }}>
          Receives concise summary
        </text>

        <rect
          x="530"
          y="45"
          width="365"
          height="255"
          rx="24"
          style={{ fill: "var(--surface2)", stroke: "var(--border-strong)" }}
        />
        <text x="560" y="83" fontSize="20" fontWeight="700" style={{ fill: "var(--text)" }}>
          SUBAGENT
        </text>
        <text x="560" y="110" fontSize="13" style={{ fill: "var(--muted)" }}>
          isolated context · focused prompt · limited tools
        </text>
        <rect
          x="563"
          y="142"
          width="300"
          height="52"
          rx="12"
          style={{ fill: "var(--surface)", stroke: "var(--border)" }}
        />
        <text x="585" y="174" fontSize="14" style={{ fill: "var(--muted)" }}>
          search · logs · files · notes
        </text>
        <rect
          x="563"
          y="216"
          width="300"
          height="52"
          rx="12"
          style={{ fill: "var(--accent-bg)", stroke: "var(--accent-border)" }}
        />
        <text x="585" y="248" fontSize="14" style={{ fill: "var(--accent-text)" }}>
          structured result → summary
        </text>

        <path
          d="M390 168 C450 168,470 168,530 168"
          style={{ stroke: "var(--accent)" }}
          strokeWidth="3"
          fill="none"
          markerEnd="url(#mmd-arrow-forward)"
        />
        <path
          d="M530 242 C470 242,450 242,390 242"
          style={{ stroke: "var(--amber)" }}
          strokeWidth="3"
          fill="none"
          markerEnd="url(#mmd-arrow-back)"
        />
      </svg>
      <div className={styles.legend}>
        <span>🧠 Main thread keeps decisions</span>
        <span>🧪 Subagent absorbs noisy work</span>
        <span>📦 Only the result comes back</span>
      </div>
    </div>
  );
}
