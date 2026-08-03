import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const sourceRegistryPath = path.join(root, 'analysis', 'source-registry.json')
const capabilitySeedPath = path.join(root, 'analysis', 'capability-seed.json')
const outputTsPath = path.join(root, 'src', 'data', 'analysisCurrent.ts')
const outputJsonPath = path.join(root, 'analysis', 'out', 'latest-round.json')
const outputEvidencePath = path.join(root, 'analysis', 'out', 'latest-evidence.json')
const outputQualitativePath = path.join(root, 'analysis', 'out', 'latest-qualitative.json')
const outputCapabilityTsPath = path.join(root, 'src', 'data', 'capabilityComparison.ts')

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

function extractSnippet(text, keyword) {
  const idx = text.indexOf(keyword.toLowerCase())

  if (idx < 0) {
    return ''
  }

  const start = Math.max(idx - 60, 0)
  const end = Math.min(idx + keyword.length + 120, text.length)
  return text.slice(start, end).trim()
}

function findMatchedKeywords(text, keywords) {
  if (!text || !keywords?.length) {
    return []
  }

  const matches = keywords.filter((keyword) => text.includes(keyword.toLowerCase()))
  return Array.from(new Set(matches))
}

function severityWeight(severity) {
  return severity === 'High' ? 3 : severity === 'Medium' ? 2 : 1
}

function statusPoints(status) {
  return status === 'Lead' ? 2 : status === 'Parity' ? 1 : status === 'Lag' ? -2 : 0
}

function deriveVendorState(vendor, evidenceCount, syncNuance) {
  if (evidenceCount === 0) {
    return 'Not evaluated'
  }

  if ((vendor === 'openai' || vendor === 'claude') && syncNuance) {
    return 'Capability difference'
  }

  return 'Supported'
}

function deriveRowStatus(microsoft, glean, openAi, claude) {
  const competitorSupported = [glean, openAi, claude].includes('Supported')
  const competitorDifference = [openAi, claude].includes('Capability difference')

  if (microsoft === 'Supported' && competitorSupported) {
    return 'Parity'
  }

  if (microsoft === 'Not evaluated' && competitorSupported) {
    return 'Lag'
  }

  if (microsoft === 'Supported' && competitorDifference && !competitorSupported) {
    return 'Capability difference'
  }

  if (microsoft === 'Supported' && !competitorSupported && !competitorDifference) {
    return 'Not evaluated'
  }

  return 'Not evaluated'
}

function deriveConfidence(records) {
  const byVendor = records.reduce(
    (acc, record) => {
      acc[record.vendor] += 1
      return acc
    },
    { microsoft: 0, glean: 0, openai: 0, claude: 0 },
  )

  const total = records.length

  if (byVendor.microsoft >= 1 && total >= 4) {
    return 'High'
  }

  if (byVendor.microsoft >= 1 && total >= 2) {
    return 'Medium'
  }

  return 'Low'
}

function qualitativeBand(evidenceCount) {
  if (evidenceCount >= 3) {
    return 'Strong evidence'
  }

  if (evidenceCount === 2) {
    return 'Moderate evidence'
  }

  if (evidenceCount === 1) {
    return 'Weak evidence'
  }

  return 'No evidence'
}

function vendorNarrative(vendor, state, evidenceCount, syncNuance) {
  if (state === 'Not evaluated') {
    return `${vendor}: no direct evidence found this run.`
  }

  if (state === 'Capability difference') {
    return `${vendor}: evidence exists, but model appears non-sync in this capability context.`
  }

  if (syncNuance) {
    return `${vendor}: supported signal found with nuance check enabled.`
  }

  return `${vendor}: supported signal found from ${evidenceCount} source match(es).`
}

function toBinary(state) {
  return state === 'Supported' ? 'Yes' : 'No'
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

function buildSourceGroups(sourceRegistry) {
  return sourceRegistry.reduce(
    (acc, source) => {
      const vendor = String(source.vendor || '').toLowerCase()
      if (!acc[vendor]) {
        acc[vendor] = []
      }
      acc[vendor].push(source)
      return acc
    },
    { microsoft: [], glean: [], openai: [], claude: [] },
  )
}

function collectVendorEvidence(vendor, sources, vendorTextMap, keywords, observedDate) {
  const records = []

  for (const source of sources) {
    const text = vendorTextMap[source.url] || ''
    const matchedKeywords = findMatchedKeywords(text, keywords)

    if (matchedKeywords.length === 0) {
      continue
    }

    const snippet = extractSnippet(text, matchedKeywords[0])
    records.push({
      vendor,
      sourceLabel: source.label,
      sourceUrl: source.url,
      observedDate,
      matchedKeywords,
      snippet,
    })
  }

  return records
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
    pressure[0].count === 0
      ? 'None'
      : pressure[0].vendor === 'glean'
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
      detail: 'Pressure requires direct competitor evidence and direct Microsoft evidence gap.',
      tone: 'neutral',
    },
    {
      label: 'Evidence confidence',
      value: `${confidencePct}%`,
      detail: 'Rows backed by at least medium confidence using explicit source matches.',
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
  const observedDate = new Date().toISOString().slice(0, 10)

  const sourceGroups = buildSourceGroups(sourceRegistry)
  const vendorTextMap = {}

  await Promise.all(
    sourceRegistry.map(async (source) => {
      const text = await fetchSource(source.url)
      vendorTextMap[source.url] = text
    }),
  )

  const rowEvidence = []
  const qualitativeRows = []
  const binaryRows = []

  const generatedRows = capabilitySeed.map((seed) => {
    const microsoftEvidence = collectVendorEvidence(
      'microsoft',
      sourceGroups.microsoft,
      vendorTextMap,
      seed.microsoftKeywords,
      observedDate,
    )
    const gleanEvidence = collectVendorEvidence(
      'glean',
      sourceGroups.glean,
      vendorTextMap,
      seed.gleanKeywords,
      observedDate,
    )
    const openAiEvidence = collectVendorEvidence(
      'openai',
      sourceGroups.openai,
      vendorTextMap,
      seed.openaiKeywords,
      observedDate,
    )
    const claudeEvidence = collectVendorEvidence(
      'claude',
      sourceGroups.claude,
      vendorTextMap,
      seed.claudeKeywords,
      observedDate,
    )

    const microsoft = deriveVendorState('microsoft', microsoftEvidence.length, false)
    const glean = deriveVendorState('glean', gleanEvidence.length, false)
    const openAi = deriveVendorState('openai', openAiEvidence.length, Boolean(seed.syncNuanceForOpenAi))
    const claude = deriveVendorState('claude', claudeEvidence.length, Boolean(seed.syncNuanceForClaude))

    const status = deriveRowStatus(microsoft, glean, openAi, claude)
    const allEvidence = [...microsoftEvidence, ...gleanEvidence, ...openAiEvidence, ...claudeEvidence]

    const evidenceByVendor = {
      microsoft: microsoftEvidence.length,
      glean: gleanEvidence.length,
      openAi: openAiEvidence.length,
      claude: claudeEvidence.length,
    }

    rowEvidence.push({
      capability: seed.capability,
      records: allEvidence,
    })

    qualitativeRows.push({
      capability: seed.capability,
      severity: seed.severity,
      status,
      evidenceStrength: qualitativeBand(allEvidence.length),
      summary:
        allEvidence.length === 0
          ? 'No direct supporting evidence found this run.'
          : `Found ${allEvidence.length} supporting evidence record(s) across vendors.`,
      narratives: {
        copilotConnectors: vendorNarrative(
          'Copilot connectors',
          microsoft,
          evidenceByVendor.microsoft,
          false,
        ),
        openAi: vendorNarrative(
          'OpenAI',
          openAi,
          evidenceByVendor.openAi,
          Boolean(seed.syncNuanceForOpenAi),
        ),
        claude: vendorNarrative(
          'Claude',
          claude,
          evidenceByVendor.claude,
          Boolean(seed.syncNuanceForClaude),
        ),
        glean: vendorNarrative('Glean', glean, evidenceByVendor.glean, false),
      },
      recommendation:
        status === 'Lag'
          ? 'Escalate for roadmap review.'
          : status === 'Not evaluated'
            ? 'Collect more evidence before scoring.'
            : 'Keep under weekly monitoring.',
    })

    binaryRows.push({
      capability: seed.capability,
      copilotConnectors: toBinary(microsoft),
      openAi: toBinary(openAi),
      claude: toBinary(claude),
      glean: toBinary(glean),
    })

    return {
      capability: seed.capability,
      microsoft,
      glean,
      openAi,
      claude,
      status,
      severity: seed.severity,
      confidence: deriveConfidence(allEvidence),
      note: `Strict evidence run ${observedDate}: ${allEvidence.length} matched source records.`,
    }
  })

  const previousRows = previousRound?.scoreRows ?? []
  const changedCount = generatedRows.filter((row) => {
    const previous = previousRows.find((prev) => prev.capability === row.capability)
    return !previous || previous.status !== row.status
  }).length

  const analysisRound = {
    roundLabel: 'Weekly strict evidence analysis',
    analysisDate: observedDate,
    scoringPolicy:
      'Strict evidence policy: a vendor capability is scored only when at least one direct source match exists.',
    executiveMetrics: deriveExecutiveMetrics(generatedRows, changedCount),
    capabilityGroups,
    scoreRows: generatedRows,
    domains,
    reviewSteps,
    architectureLayers,
  }

  await fs.mkdir(path.dirname(outputTsPath), { recursive: true })
  await fs.mkdir(path.dirname(outputJsonPath), { recursive: true })
  await fs.mkdir(path.dirname(outputEvidencePath), { recursive: true })
  await fs.mkdir(path.dirname(outputQualitativePath), { recursive: true })
  await fs.mkdir(path.dirname(outputCapabilityTsPath), { recursive: true })

  const outputTs = `import type { AnalysisRound } from './types'\n\nexport const analysisCurrent: AnalysisRound = ${JSON.stringify(analysisRound, null, 2)}\n`
  const capabilityTs = `export type Binary = 'Yes' | 'No'\n\nexport type CapabilityRow = {\n  capability: string\n  copilotConnectors: Binary\n  openAi: Binary\n  claude: Binary\n  glean: Binary\n}\n\nexport const capabilityRows: CapabilityRow[] = ${JSON.stringify(binaryRows, null, 2)}\n`

  await fs.writeFile(outputTsPath, outputTs, 'utf8')
  await fs.writeFile(outputJsonPath, JSON.stringify(analysisRound, null, 2), 'utf8')
  await fs.writeFile(outputEvidencePath, JSON.stringify(rowEvidence, null, 2), 'utf8')
  await fs.writeFile(outputQualitativePath, JSON.stringify(qualitativeRows, null, 2), 'utf8')
  await fs.writeFile(outputCapabilityTsPath, capabilityTs, 'utf8')

  console.log('Weekly strict evidence and qualitative analysis generated.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})