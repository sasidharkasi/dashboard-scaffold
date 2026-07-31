type Status =
  | 'Lead'
  | 'Parity'
  | 'Lag'
  | 'Capability difference'
  | 'Not evaluated'
  | 'Closing gaps'

type Severity = 'High' | 'Medium' | 'Low'

type ExecutiveMetric = {
  label: string
  value: string
  detail: string
  tone: 'strong' | 'alert' | 'neutral'
}

type CapabilityGroup = {
  title: string
  focus: string
  rationale: string
}

type ScoreRow = {
  capability: string
  microsoft: string
  glean: string
  openAi: string
  claude: string
  status: Status
  severity: Severity
  confidence: string
  note: string
}

type Domain = {
  name: string
  connectors: string[]
}

type ReviewStep = {
  title: string
  detail: string
}

const executiveMetrics: ExecutiveMetric[] = [
  {
    label: 'Overall sync capability position',
    value: '+18',
    detail: 'Weighted lead/parity score across priority sync capabilities.',
    tone: 'strong',
  },
  {
    label: 'Critical gap count',
    value: '4',
    detail: 'High-severity gaps that need roadmap or evidence review.',
    tone: 'alert',
  },
  {
    label: 'Top competitor pressure',
    value: 'Glean',
    detail: 'Pressure is highest where setup, observability, and admin depth align.',
    tone: 'neutral',
  },
  {
    label: 'Evidence confidence',
    value: '76%',
    detail: 'Rows backed by official docs, release notes, or verified internal evidence.',
    tone: 'strong',
  },
  {
    label: 'Changed since last review',
    value: '9',
    detail: 'New, removed, or reclassified capability rows since the prior review.',
    tone: 'alert',
  },
]

const capabilityGroups: CapabilityGroup[] = [
  {
    title: 'Connector catalog coverage',
    focus: 'Which enterprise systems are supported as synced or indexed connectors.',
    rationale: 'Answers whether Microsoft covers required source systems for enterprise rollout.',
  },
  {
    title: 'Ingestion and freshness',
    focus: 'Full crawl, incremental sync, event freshness, first crawl, permission freshness.',
    rationale: 'Indexed content is only useful if it is current and complete.',
  },
  {
    title: 'Permissions and security model',
    focus: 'ACLs, identity sync, external groups, deny-aware access, permission trimming.',
    rationale: 'Synced connectors must preserve source permissions after indexing.',
  },
  {
    title: 'Setup and configuration',
    focus: 'Auth model, inclusion rules, schema controls, staged rollout, setup friction.',
    rationale: 'Determines whether large tenants can deploy connectors consistently.',
  },
  {
    title: 'Observe and manage',
    focus: 'State, crawl stats, item errors, index browser, usage, edit or pause controls.',
    rationale: 'Admins need operational confidence after deployment, not just successful setup.',
  },
]

const scoreRows: ScoreRow[] = [
  {
    capability: 'ServiceNow KB synced connector',
    microsoft: 'Supported',
    glean: 'Supported',
    openAi: 'Evidence needed',
    claude: 'Evidence needed',
    status: 'Parity',
    severity: 'Medium',
    confidence: 'High',
    note: 'Catalog parity is clear; competitor sync-model evidence is still thin.',
  },
  {
    capability: 'Incremental sync',
    microsoft: 'Supported',
    glean: 'Supported',
    openAi: 'N/A if not tenant sync',
    claude: 'Capability difference',
    status: 'Capability difference',
    severity: 'High',
    confidence: 'Medium',
    note: 'Avoid calling this a product gap when competitor retrieval uses a non-sync model.',
  },
  {
    capability: 'Permission freshness',
    microsoft: 'Partial',
    glean: 'Supported',
    openAi: 'Evidence needed',
    claude: 'Evidence needed',
    status: 'Lag',
    severity: 'High',
    confidence: 'Medium',
    note: 'Candidate roadmap item because stale ACL propagation breaks trust in indexed content.',
  },
  {
    capability: 'Schema configuration',
    microsoft: 'Supported',
    glean: 'Supported',
    openAi: 'App-dependent',
    claude: 'MCP-dependent',
    status: 'Closing gaps',
    severity: 'Medium',
    confidence: 'Low',
    note: 'Use PM review before publishing because documentation language varies by vendor.',
  },
  {
    capability: 'Index browser and crawl diagnostics',
    microsoft: 'Supported',
    glean: 'Supported',
    openAi: 'Not evaluated',
    claude: 'Not evaluated',
    status: 'Lead',
    severity: 'Low',
    confidence: 'High',
    note: 'Strong admin-operability differentiator for sync-focused review.',
  },
  {
    capability: 'External group ACL support',
    microsoft: 'Evidence needed',
    glean: 'Supported',
    openAi: 'Not evaluated',
    claude: 'Not evaluated',
    status: 'Not evaluated',
    severity: 'High',
    confidence: 'Low',
    note: 'Keep this visible until evidence is upgraded or the row is reclassified.',
  },
]

const domains: Domain[] = [
  {
    name: 'ITSM',
    connectors: ['ServiceNow', 'Jira', 'Zendesk', 'Freshservice'],
  },
  {
    name: 'Knowledge and docs',
    connectors: ['Confluence', 'Google Drive', 'SharePoint Server', 'File Share', 'Websites'],
  },
  {
    name: 'Developer',
    connectors: ['GitHub', 'GitLab', 'Azure DevOps'],
  },
  {
    name: 'CRM and sales',
    connectors: ['Salesforce', 'Dynamics', 'Gong'],
  },
  {
    name: 'HR and ERP',
    connectors: ['Workday', 'SAP SuccessFactors', 'BambooHR'],
  },
]

const reviewSteps: ReviewStep[] = [
  {
    title: 'Scan executive cards',
    detail: 'Check overall position, critical gaps, confidence, and pressure shifts first.',
  },
  {
    title: 'Review changed rows',
    detail: 'Limit weekly attention to newly added, disputed, or reclassified capability rows.',
  },
  {
    title: 'Inspect high-severity lag items',
    detail: 'Open evidence, separate real gaps from capability-model differences, then decide action.',
  },
  {
    title: 'Approve score changes',
    detail: 'Keep the PM in the loop because public docs often describe similar outcomes differently.',
  },
  {
    title: 'Convert validated gaps',
    detail: 'Tag each issue as roadmap candidate, watch item, or no action.',
  },
]

const architectureLayers = [
  'Evidence source registry',
  'Evidence capture layer',
  'Normalized capability model',
  'Scoring and review layer',
  'Dashboard layer',
]

function getStatusClass(status: Status) {
  return `status-pill status-pill--${status.toLowerCase().replace(/\s+/g, '-')}`
}

function getMetricToneClass(tone: ExecutiveMetric['tone']) {
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