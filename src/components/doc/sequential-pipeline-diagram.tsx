import styles from "./sequential-pipeline-diagram.module.css";

const NODES = [
  { x: 25, title: "Researcher", sub: "100% raw context" },
  { x: 290, title: "Planner", sub: "partial context" },
  { x: 555, title: "Worker", sub: "less context" },
];

export function SequentialPipelineDiagram() {
  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 900 220" role="img" aria-label="Sequential pipeline context loss diagram">
        <defs>
          <marker
            id="spd-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" style={{ fill: "var(--amber)" }} />
          </marker>
        </defs>

        {NODES.map((node) => (
          <g key={node.title}>
            <rect
              x={node.x}
              y="65"
              width="170"
              height="80"
              rx="16"
              style={{ fill: "var(--surface)", stroke: "var(--border-strong)" }}
            />
            <text x={node.x + 25} y="98" fontSize="15" fontWeight="700" style={{ fill: "var(--text)" }}>
              {node.title}
            </text>
            <text x={node.x + 10} y="122" fontSize="12" style={{ fill: "var(--muted)" }}>
              {node.sub}
            </text>
          </g>
        ))}

        <path d="M195 105 H285" style={{ stroke: "var(--amber)" }} strokeWidth="3" markerEnd="url(#spd-arrow)" />
        <text x="215" y="92" fontSize="12" style={{ fill: "var(--amber)" }}>summary</text>

        <path d="M460 105 H550" style={{ stroke: "var(--amber)" }} strokeWidth="3" markerEnd="url(#spd-arrow)" />
        <text x="480" y="92" fontSize="12" style={{ fill: "var(--amber)" }}>summary</text>

        <path d="M725 105 H815" style={{ stroke: "var(--amber)" }} strokeWidth="3" markerEnd="url(#spd-arrow)" />
        <text x="742" y="92" fontSize="12" style={{ fill: "var(--amber)" }}>summary</text>

        <text x="830" y="112" fontSize="26" style={{ fill: "var(--amber)" }}>⚠</text>
      </svg>
    </div>
  );
}
