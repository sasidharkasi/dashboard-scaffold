export type Status =
  | 'Lead'
  | 'Parity'
  | 'Lag'
  | 'Capability difference'
  | 'Not evaluated'
  | 'Closing gaps'

export type Severity = 'High' | 'Medium' | 'Low'

export type ExecutiveMetricTone = 'strong' | 'alert' | 'neutral'

export type ExecutiveMetric = {
  label: string
  value: string
  detail: string
  tone: ExecutiveMetricTone
}

export type CapabilityGroup = {
  title: string
  focus: string
  rationale: string
}

export type ScoreRow = {
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

export type Domain = {
  name: string
  connectors: string[]
}

export type ReviewStep = {
  title: string
  detail: string
}

export type AnalysisRound = {
  roundLabel: string
  analysisDate: string
  executiveMetrics: ExecutiveMetric[]
  capabilityGroups: CapabilityGroup[]
  scoreRows: ScoreRow[]
  domains: Domain[]
  reviewSteps: ReviewStep[]
  architectureLayers: string[]
}

export const analysisRound1: AnalysisRound = {
  roundLabel: 'Round 1 analysis',
  analysisDate: '2026-08-03',
  executiveMetrics: [
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
  ],
  capabilityGroups: [
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
  ],
  scoreRows: [
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
  ],
  domains: [
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
  ],
  reviewSteps: [
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
  ],
  architectureLayers: [
    'Evidence source registry',
    'Evidence capture layer',
    'Normalized capability model',
    'Scoring and review layer',
    'Dashboard layer',
  ],
}