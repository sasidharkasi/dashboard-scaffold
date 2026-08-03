export type Binary = 'Yes' | 'No'

export type CapabilityRow = {
  capability: string
  copilotConnectors: Binary
  openAi: Binary
  claude: Binary
  glean: Binary
}

export const capabilityRows: CapabilityRow[] = [
  {
    "capability": "ServiceNow KB synced connector",
    "copilotConnectors": "Yes",
    "openAi": "No",
    "claude": "No",
    "glean": "No"
  },
  {
    "capability": "Incremental sync",
    "copilotConnectors": "Yes",
    "openAi": "No",
    "claude": "No",
    "glean": "No"
  },
  {
    "capability": "Permission freshness",
    "copilotConnectors": "Yes",
    "openAi": "No",
    "claude": "Yes",
    "glean": "No"
  },
  {
    "capability": "Schema configuration",
    "copilotConnectors": "Yes",
    "openAi": "No",
    "claude": "No",
    "glean": "No"
  },
  {
    "capability": "Index browser and crawl diagnostics",
    "copilotConnectors": "Yes",
    "openAi": "No",
    "claude": "Yes",
    "glean": "No"
  },
  {
    "capability": "External group ACL support",
    "copilotConnectors": "Yes",
    "openAi": "No",
    "claude": "Yes",
    "glean": "No"
  }
]
