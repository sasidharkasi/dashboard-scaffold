import type { AnalysisRound } from './types'

export const analysisCurrent: AnalysisRound = {
  "roundLabel": "Weekly strict evidence analysis",
  "analysisDate": "2026-08-03",
  "scoringPolicy": "Strict evidence policy: a vendor capability is scored only when at least one direct source match exists.",
  "executiveMetrics": [
    {
      "label": "Overall sync capability position",
      "value": "+7",
      "detail": "Weighted lead/parity score across priority sync capabilities.",
      "tone": "strong"
    },
    {
      "label": "Critical gap count",
      "value": "0",
      "detail": "High-severity gaps that need roadmap or evidence review.",
      "tone": "strong"
    },
    {
      "label": "Top competitor pressure",
      "value": "None",
      "detail": "Pressure requires direct competitor evidence and direct Microsoft evidence gap.",
      "tone": "neutral"
    },
    {
      "label": "Evidence confidence",
      "value": "100%",
      "detail": "Rows backed by at least medium confidence using explicit source matches.",
      "tone": "strong"
    },
    {
      "label": "Changed since last review",
      "value": "6",
      "detail": "Rows whose derived status changed since prior generated round.",
      "tone": "alert"
    }
  ],
  "capabilityGroups": [
    {
      "title": "Connector catalog coverage",
      "focus": "Which enterprise systems are supported as synced or indexed connectors.",
      "rationale": "Answers whether Microsoft covers required source systems for enterprise rollout."
    },
    {
      "title": "Ingestion and freshness",
      "focus": "Full crawl, incremental sync, event freshness, first crawl, permission freshness.",
      "rationale": "Indexed content is only useful if it is current and complete."
    },
    {
      "title": "Permissions and security model",
      "focus": "ACLs, identity sync, external groups, deny-aware access, permission trimming.",
      "rationale": "Synced connectors must preserve source permissions after indexing."
    },
    {
      "title": "Setup and configuration",
      "focus": "Auth model, inclusion rules, schema controls, staged rollout, setup friction.",
      "rationale": "Determines whether large tenants can deploy connectors consistently."
    },
    {
      "title": "Observe and manage",
      "focus": "State, crawl stats, item errors, index browser, usage, edit or pause controls.",
      "rationale": "Admins need operational confidence after deployment, not just successful setup."
    }
  ],
  "scoreRows": [
    {
      "capability": "ServiceNow KB synced connector",
      "microsoft": "Supported",
      "glean": "Not evaluated",
      "openAi": "Not evaluated",
      "claude": "Capability difference",
      "status": "Capability difference",
      "severity": "Medium",
      "confidence": "Medium",
      "note": "Strict evidence run 2026-08-03: 3 matched source records."
    },
    {
      "capability": "Incremental sync",
      "microsoft": "Supported",
      "glean": "Not evaluated",
      "openAi": "Not evaluated",
      "claude": "Capability difference",
      "status": "Capability difference",
      "severity": "High",
      "confidence": "Medium",
      "note": "Strict evidence run 2026-08-03: 2 matched source records."
    },
    {
      "capability": "Permission freshness",
      "microsoft": "Supported",
      "glean": "Not evaluated",
      "openAi": "Not evaluated",
      "claude": "Supported",
      "status": "Parity",
      "severity": "High",
      "confidence": "Medium",
      "note": "Strict evidence run 2026-08-03: 3 matched source records."
    },
    {
      "capability": "Schema configuration",
      "microsoft": "Supported",
      "glean": "Not evaluated",
      "openAi": "Not evaluated",
      "claude": "Capability difference",
      "status": "Capability difference",
      "severity": "Medium",
      "confidence": "Medium",
      "note": "Strict evidence run 2026-08-03: 3 matched source records."
    },
    {
      "capability": "Index browser and crawl diagnostics",
      "microsoft": "Supported",
      "glean": "Not evaluated",
      "openAi": "Not evaluated",
      "claude": "Supported",
      "status": "Parity",
      "severity": "Low",
      "confidence": "Medium",
      "note": "Strict evidence run 2026-08-03: 3 matched source records."
    },
    {
      "capability": "External group ACL support",
      "microsoft": "Supported",
      "glean": "Not evaluated",
      "openAi": "Not evaluated",
      "claude": "Supported",
      "status": "Parity",
      "severity": "High",
      "confidence": "Medium",
      "note": "Strict evidence run 2026-08-03: 3 matched source records."
    }
  ],
  "domains": [
    {
      "name": "ITSM",
      "connectors": [
        "ServiceNow",
        "Jira",
        "Zendesk",
        "Freshservice"
      ]
    },
    {
      "name": "Knowledge and docs",
      "connectors": [
        "Confluence",
        "Google Drive",
        "SharePoint Server",
        "File Share",
        "Websites"
      ]
    },
    {
      "name": "Developer",
      "connectors": [
        "GitHub",
        "GitLab",
        "Azure DevOps"
      ]
    },
    {
      "name": "CRM and sales",
      "connectors": [
        "Salesforce",
        "Dynamics",
        "Gong"
      ]
    },
    {
      "name": "HR and ERP",
      "connectors": [
        "Workday",
        "SAP SuccessFactors",
        "BambooHR"
      ]
    }
  ],
  "reviewSteps": [
    {
      "title": "Scan executive cards",
      "detail": "Check overall position, critical gaps, confidence, and pressure shifts first."
    },
    {
      "title": "Review changed rows",
      "detail": "Limit weekly attention to newly added, disputed, or reclassified capability rows."
    },
    {
      "title": "Inspect high-severity lag items",
      "detail": "Open evidence, separate real gaps from capability-model differences, then decide action."
    },
    {
      "title": "Approve score changes",
      "detail": "Keep the PM in the loop because public docs often describe similar outcomes differently."
    },
    {
      "title": "Convert validated gaps",
      "detail": "Tag each issue as roadmap candidate, watch item, or no action."
    }
  ],
  "architectureLayers": [
    "Evidence source registry",
    "Evidence capture layer",
    "Normalized capability model",
    "Scoring and review layer",
    "Dashboard layer"
  ]
}
