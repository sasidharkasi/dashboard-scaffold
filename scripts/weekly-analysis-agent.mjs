import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const sourceRegistryPath = path.join(root, 'analysis', 'source-registry.json')
const capabilitySeedPath = path.join(root, 'analysis', 'capability-seed.json')
const outputTsPath = path.join(root, 'src', 'data', 'analysisCurrent.ts')
const outputJsonPath = path.join(root, 'analysis', 'out', 'latest-round.json')

const capabilityGroups = [
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

const domains = [
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

const reviewSteps = [
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

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, ' ')
}

function matchKeywords(text, keywords) {
  if (!text || !keywords?.length) {
    return false
  }

  return keywords.some((keyword) => text.includes(keyword.toLowerCase()))
}

function severityWeight(severity) {
  if (severity === 'High') {
    return 3
  }

  if (severity === 'Medium') {
    return 2
  }

  return 1
}

function statusPoints(status) {
  if (status === 'Lead') {
    return 2
  }

  if (status === 'Parity') {
    return 1
  }

  if (status === 'Lag') {
    return -2
  }

  return 0
}

function deriveCompetitorState(text, keywords, syncNuance) {
  const hasMatch = matchKeywords(text, keywords)

  if (!text) {
    return 'Not evaluated'
  }

  if (syncNuance && hasMatch) {
    return 'Capability difference'
  }

  return hasMatch ? 'Supported' : 'Evidence needed'
}

function deriveMicrosoftState(text, keywords) {
  if (!text) {
    return 'Not evaluated'
  }

  return matchKeywords(text, keywords) ? 'Supported' : 'Evidence needed'
}

function deriveRowStatus(microsoft, glean, openAi, claude) {
  const competitorSupported = [glean, openAi, claude].includes('Supported')
  const competitorDifference = [openAi, claude].includes('Capability difference')

  if (microsoft === 'Supported' && competitorSupported) {
    return 'Parity'
  }

  if (microsoft === 'Evidence needed' && competitorSupported) {
    return 'Lag'
  }

  if (microsoft === 'Supported' && competitorDifference) {
    return 'Closing gaps'
  }

  if (microsoft === 'Supported' && !competitorSupported) {
    return 'Lead'
  }

  return 'Not evaluated'
}

function deriveConfidence(matchedCount) {
  if (matchedCount >= 4) {
    return 'High'
  }

  if (matchedCount >= 2) {
    return 'Medium'
  }

  return 'Low'
}

async function fetchSource(url) {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      return ''
    }

    const html = await response.text()
    return normalize(html.replace(/<[^>]+>/g, ' '))
  } catch {
    return ''
  }
}

function deriveExecutiveMetrics(scoreRows, changedCount) {
  const weightedScore = scoreRows.reduce((sum, row) => {
    return sum + statusPoints(row.status) * severityWeight(row.severity)
  }, 0)

  const criticalGapCount = scoreRows.filter(
    (row) => row.severity === 'High' && row.status === 'Lag',
  ).length

  const confidenceBacked = scoreRows.filter((row) => row.confidence !== 'Low').length
  const confidencePct = Math.round((confidenceBacked / Math.max(scoreRows.length, 1)) * 100)

  const pressure = ['glean', 'openAi', 'claude'].map((vendor) => {
    const count = scoreRows.filter((row) => {
      if (vendor === 'glean') {
        return row.glean === 'Supported' && row.microsoft !== 'Supported'
      }

      if (vendor === 'openAi') {
        return row.openAi === 'Supported' && row.microsoft !== 'Supported'
      }

      return row.claude === 'Supported' && row.microsoft !== 'Supported'
    }).length

    return { vendor, count }
  })

  pressure.sort((a, b) => b.count - a.count)

  const topPressure =
    pressure[0].vendor === 'glean'
      ? 'Glean'
      : pressure[0].vendor === 'openAi'
        ? 'OpenAI'
        : 'Claude'

  return [
    {
      label: 'Overall sync capability position',
      value: `${weightedScore >= 0 ? '+' : ''}${weightedScore}`,
      detail: 'Weighted lead/parity score across priority sync capabilities.',
      tone: weightedScore >= 5 ? 'strong' : weightedScore >= 0 ? 'neutral' : 'alert',
    },
    {
      label: 'Critical gap count',
      value: `${criticalGapCount}`,
      detail: 'High-severity gaps that need roadmap or evidence review.',
      tone: criticalGapCount > 0 ? 'alert' : 'strong',
    },
    {
      label: 'Top competitor pressure',
      value: topPressure,
      detail: 'Pressure is highest where competitor support outpaces Microsoft evidence.',
      tone: 'neutral',
    },
    {
      label: 'Evidence confidence',
      value: `${confidencePct}%`,
      detail: 'Rows backed by at least medium evidence confidence from source matching.',
      tone: confidencePct >= 70 ? 'strong' : confidencePct >= 45 ? 'neutral' : 'alert',
    },
    {
      label: 'Changed since last review',
      value: `${changedCount}`,
      detail: 'Rows whose derived status changed since prior generated round.',
      tone: changedCount > 0 ? 'alert' : 'neutral',
    },
  ]
}

async function readJson(filePath, fallback) {
  try {
    const content = await fs.readFile(filePath, 'utf8')
    return JSON.parse(content)
  } catch {
    return fallback
  }
}

async function main() {
  const sourceRegistry = await readJson(sourceRegistryPath, [])
  const capabilitySeed = await readJson(capabilitySeedPath, [])
  const previousRound = await readJson(outputJsonPath, null)

  const vendorPages = { microsoft: '', glean: '', openAi: '', claude: '' }

  await Promise.all(
    sourceRegistry.map(async (source) => {
      const text = await fetchSource(source.url)
      if (source.vendor === 'microsoft') {
        vendorPages.microsoft += ` ${text}`
      }
      if (source.vendor === 'glean') {
        vendorPages.glean += ` ${text}`
      }
      if (source.vendor === 'openai') {
        vendorPages.openAi += ` ${text}`
      }
      if (source.vendor === 'claude') {
        vendorPages.claude += ` ${text}`
      }
    }),
  )

  const generatedRows = capabilitySeed.map((seed) => {
    const microsoft = deriveMicrosoftState(vendorPages.microsoft, seed.microsoftKeywords)
    const glean = deriveCompetitorState(vendorPages.glean, seed.gleanKeywords, false)
    const openAi = deriveCompetitorState(
      vendorPages.openAi,
      seed.openaiKeywords,
      Boolean(seed.syncNuanceForOpenAi),
    )
    const claude = deriveCompetitorState(
      vendorPages.claude,
      seed.claudeKeywords,
      Boolean(seed.syncNuanceForClaude),
    )

    const matchedCount = [microsoft, glean, openAi, claude].filter((value) => {
      return value === 'Supported' || value === 'Capability difference'
    }).length

    const status = deriveRowStatus(microsoft, glean, openAi, claude)

    return {
      capability: seed.capability,
      microsoft,
      glean,
      openAi,
      claude,
      status,
      severity: seed.severity,
      confidence: deriveConfidence(matchedCount),
      note: `Generated from weekly source matching on ${new Date().toISOString().slice(0, 10)}.`,
    }
  })

  const previousRows = previousRound?.scoreRows ?? []
  const changedCount = generatedRows.filter((row) => {
    const previous = previousRows.find((prev) => prev.capability === row.capability)
    return !previous || previous.status !== row.status
  }).length

  const analysisRound = {
    roundLabel: 'Weekly automated analysis',
    analysisDate: new Date().toISOString().slice(0, 10),
    executiveMetrics: deriveExecutiveMetrics(generatedRows, changedCount),
    capabilityGroups,
    scoreRows: generatedRows,
    domains,
    reviewSteps,
    architectureLayers,
  }

  await fs.mkdir(path.dirname(outputTsPath), { recursive: true })
  await fs.mkdir(path.dirname(outputJsonPath), { recursive: true })

  const outputTs = `import type { AnalysisRound } from './types'\n\nexport const analysisCurrent: AnalysisRound = ${JSON.stringify(analysisRound, null, 2)}\n`
  await fs.writeFile(outputTsPath, outputTs, 'utf8')
  await fs.writeFile(outputJsonPath, JSON.stringify(analysisRound, null, 2), 'utf8')

  console.log('Weekly analysis generated at src/data/analysisCurrent.ts')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})