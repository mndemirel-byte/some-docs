import styles from "./fan-out-diagram.module.css";

export function FanOutDiagram() {
  return (
    <div className={styles.wrap}>
      <svg
        viewBox="0 0 920 300"
        role="img"
        aria-label="Fan-out diagram: main thread dispatching three subagents in parallel"
      >
        <defs>
          <marker id="fod-arrow-out" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" style={{ fill: "var(--accent)" }} />
          </marker>
          <marker id="fod-arrow-back" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" style={{ fill: "var(--amber)" }} />
          </marker>
        </defs>

        <rect
          x="20"
          y="105"
          width="220"
          height="90"
          rx="20"
          style={{ fill: "var(--surface)", stroke: "var(--border-strong)" }}
        />
        <text x="45" y="140" fontSize="17" fontWeight="700" style={{ fill: "var(--text)" }}>
          MAIN THREAD
        </text>
        <text x="45" y="163" fontSize="12" style={{ fill: "var(--muted)" }}>
          one message, 3 Agent blocks
        </text>

        <rect x="640" y="20" width="260" height="66" rx="16" style={{ fill: "var(--surface2)", stroke: "var(--border)" }} />
        <text x="662" y="59" fontSize="14" style={{ fill: "var(--text)" }}>
          Subagent A
        </text>

        <rect x="640" y="117" width="260" height="66" rx="16" style={{ fill: "var(--surface2)", stroke: "var(--border)" }} />
        <text x="662" y="156" fontSize="14" style={{ fill: "var(--text)" }}>
          Subagent B
        </text>

        <rect x="640" y="214" width="260" height="66" rx="16" style={{ fill: "var(--surface2)", stroke: "var(--border)" }} />
        <text x="662" y="253" fontSize="14" style={{ fill: "var(--text)" }}>
          Subagent C
        </text>

        <path d="M240 130 C400 130,480 53,640 53" style={{ stroke: "var(--accent)" }} strokeWidth="2.5" fill="none" markerEnd="url(#fod-arrow-out)" />
        <path d="M240 148 C420 148,500 150,640 150" style={{ stroke: "var(--accent)" }} strokeWidth="2.5" fill="none" markerEnd="url(#fod-arrow-out)" />
        <path d="M240 166 C400 166,480 247,640 247" style={{ stroke: "var(--accent)" }} strokeWidth="2.5" fill="none" markerEnd="url(#fod-arrow-out)" />

        <path d="M640 70 C480 100,400 175,240 178" style={{ stroke: "var(--amber)" }} strokeWidth="2" fill="none" markerEnd="url(#fod-arrow-back)" opacity={0.55} />
        <path d="M640 167 C500 178,420 180,240 182" style={{ stroke: "var(--amber)" }} strokeWidth="2" fill="none" markerEnd="url(#fod-arrow-back)" opacity={0.55} />
        <path d="M640 230 C480 205,400 186,240 186" style={{ stroke: "var(--amber)" }} strokeWidth="2" fill="none" markerEnd="url(#fod-arrow-back)" opacity={0.55} />
      </svg>
      <div className={styles.legend}>
        <span>🟢 dispatch — all start together</span>
        <span>🟠 each returns independently on completion (default: background)</span>
        <span>⏱ waiting for all of them takes as long as the slowest subagent</span>
      </div>
    </div>
  );
}
