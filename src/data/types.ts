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