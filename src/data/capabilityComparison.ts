export type Binary = 'Yes' | 'No'

export type CapabilityRow = {
  capability: string
  gleanBaseline: Binary
  copilotConnectors: Binary
  missingInCopilot: Binary
}

export const capabilityRows: CapabilityRow[] = [
  {
    "capability": "ServiceNow KB synced connector",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No"
  },
  {
    "capability": "Incremental sync",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No"
  },
  {
    "capability": "Permission freshness",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No"
  },
  {
    "capability": "Schema configuration",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No"
  },
  {
    "capability": "Index browser and crawl diagnostics",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No"
  },
  {
    "capability": "External group ACL support",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No"
  }
]
