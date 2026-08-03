import {
  analysisRound1,
  type ExecutiveMetricTone,
  type Status,
} from './data/analysisRound1'

const {
  roundLabel,
  analysisDate,
  executiveMetrics,
  capabilityGroups,
  scoreRows,
  domains,
  reviewSteps,
  architectureLayers,
} = analysisRound1

function getStatusClass(status: Status) {
  return `status-pill status-pill--${status.toLowerCase().replace(/\s+/g, '-')}`
}

function getMetricToneClass(tone: ExecutiveMetricTone) {
  return `metric-card metric-card--${tone}`
}

function App() {
  return (
    <main className="app-shell">
      <section className="hero panel">
        <div className="hero-copy-block">
          <p className="eyebrow">Pilot design</p>
          <h1>Sync Connector Capability Dashboard</h1>
          <p className="hero-copy">
            A scorecard for one question only: where Microsoft has capability gaps,
            parity, or lead in synced connectors versus Glean, OpenAI, and Claude.
          </p>
          <div className="hero-tags" aria-label="Scope tags">
            <span>Synced connectors only</span>
            <span>Public evidence first</span>
            <span>PM-reviewed scoring</span>
            <span>{`${roundLabel}: ${analysisDate}`}</span>
          </div>
        </div>
        <aside className="hero-aside">
          <div className="hero-callout">
            <span className="callout-label">Scope guardrail</span>
            <strong>Exclude FCC, MCP/federated, agent UX, and response quality.</strong>
            <p>
              Use capability difference when competitors achieve similar outcomes through
              a non-sync model.
            </p>
          </div>
        </aside>
      </section>

      <section className="metrics-grid" aria-label="Executive scorecard metrics">
        {executiveMetrics.map((metric) => (
          <article className={getMetricToneClass(metric.tone)} key={metric.label}>
            <span className="metric-label">{metric.label}</span>
            <strong className="metric-value">{metric.value}</strong>
            <p className="metric-detail">{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="main-grid">
        <article className="panel scorecard-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Core view</p>
              <h2>Capability scorecard</h2>
            </div>
            <span className="badge">Lead / Closing gaps / Lags / Not evaluated</span>
          </div>
          <div className="table-wrap">
            <table className="score-table">
              <thead>
                <tr>
                  <th>Capability</th>
                  <th>Microsoft</th>
                  <th>Glean</th>
                  <th>OpenAI</th>
                  <th>Claude</th>
                  <th>Status</th>
                  <th>Severity</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {scoreRows.map((row) => (
                  <tr key={row.capability}>
                    <td>
                      <strong>{row.capability}</strong>
                      <p>{row.note}</p>
                    </td>
                    <td>{row.microsoft}</td>
                    <td>{row.glean}</td>
                    <td>{row.openAi}</td>
                    <td>{row.claude}</td>
                    <td>
                      <span className={getStatusClass(row.status)}>{row.status}</span>
                    </td>
                    <td>{row.severity}</td>
                    <td>{row.confidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="side-stack">
          <article className="panel evidence-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Evidence drawer</p>
                <h2>Review packet</h2>
              </div>
            </div>
            <ul className="evidence-list">
              <li>
                <strong>Source URL and vendor</strong>
                <p>Keep the scoring cell tied to an auditable doc, release note, or product page.</p>
              </li>
              <li>
                <strong>Extracted quote or screenshot</strong>
                <p>Use direct evidence for parity or lag claims. No inferred competitive claims.</p>
              </li>
              <li>
                <strong>Last observed date and confidence</strong>
                <p>Make staleness visible so not-evaluated rows are clearly separated from real gaps.</p>
              </li>
              <li>
                <strong>Reviewer note</strong>
                <p>Capture whether the row is a true gap, capability difference, or needs more proof.</p>
              </li>
            </ul>
          </article>

          <article className="panel formula-panel">
            <p className="eyebrow">Scoring recommendation</p>
            <h2>Transparent roll-up</h2>
            <p className="formula-copy">
              Capability score = weighted percentage of priority capabilities where Microsoft is
              Lead or Parity minus weighted percentage of high-severity Lag items.
            </p>
            <div className="formula-grid">
              <div>
                <span className="formula-label">Roadmap impact</span>
                <strong>Candidate / Watch / No action</strong>
              </div>
              <div>
                <span className="formula-label">Source freshness</span>
                <strong>Current / Stale / Unknown</strong>
              </div>
            </div>
          </article>
        </aside>
      </section>

      <section className="taxonomy-grid" aria-label="Capability taxonomy">
        {capabilityGroups.map((group) => (
          <article className="panel taxonomy-card" key={group.title}>
            <p className="eyebrow">Capability group</p>
            <h3>{group.title}</h3>
            <p>{group.focus}</p>
            <span>{group.rationale}</span>
          </article>
        ))}
      </section>

      <section className="detail-grid">
        <article className="panel coverage-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Drill-down A</p>
              <h2>Catalog coverage by domain</h2>
            </div>
          </div>
          <div className="domain-grid">
            {domains.map((domain) => (
              <div className="domain-card" key={domain.name}>
                <strong>{domain.name}</strong>
                <ul>
                  {domain.connectors.map((connector) => (
                    <li key={connector}>{connector}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        <article className="panel workflow-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Weekly PM flow</p>
              <h2>Review workflow</h2>
            </div>
          </div>
          <ol className="workflow-list">
            {reviewSteps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="panel architecture-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Supporting architecture</p>
            <h2>Evidence-to-scorecard pipeline</h2>
          </div>
          <span className="badge">Agentic jobs assist; PM approves</span>
        </div>
        <div className="architecture-strip" aria-label="Architecture layers">
          {architectureLayers.map((layer, index) => (
            <div className="architecture-node" key={layer}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{layer}</strong>
            </div>
          ))}
        </div>
        <p className="architecture-footnote">
          Best automation targets are doc-change detection, claim extraction, taxonomy mapping,
          conflict flagging, and draft weekly summaries. Strategic classification still stays with
          PM review.
        </p>
      </section>
    </main>
  )
}

export default App