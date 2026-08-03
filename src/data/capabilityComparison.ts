export type Binary = 'Yes' | 'No'

export type CapabilityRow = {
  category: string
  capability: string
  gleanBaseline: Binary
  copilotConnectors: Binary
  missingInCopilot: Binary
  evidenceUrl: string
}

export const capabilityRows: CapabilityRow[] = [
  {
    "category": "Connector coverage",
    "capability": "Native connector portfolio",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/connectors/"
  },
  {
    "category": "Connector coverage",
    "capability": "Push API and custom connectors",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/about"
  },
  {
    "category": "Connector coverage",
    "capability": "Live and hybrid access modes",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/about"
  },
  {
    "category": "Connector coverage",
    "capability": "Panopto video connector",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/native/panopto/"
  },
  {
    "category": "Connector coverage",
    "capability": "Veeva Vault connector",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/native/veeva-vault/"
  },
  {
    "category": "Connector coverage",
    "capability": "Autodesk Construction Cloud connector",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/native/autodesk-construction-cloud/"
  },
  {
    "category": "Connector coverage",
    "capability": "NetSuite MCP support",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/native/netsuite/"
  },
  {
    "category": "Connector coverage",
    "capability": "BigQuery integration with natural language",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/tools/connector/googlecloud"
  },
  {
    "category": "Set up capabilities",
    "capability": "Connector authentication configuration",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/getting-started"
  },
  {
    "category": "Set up capabilities",
    "capability": "Connector content filters and inclusion rules",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/about"
  },
  {
    "category": "Set up capabilities",
    "capability": "Crawl frequency and scheduling setup",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/crawling-frequency"
  },
  {
    "category": "Set up capabilities",
    "capability": "Custom connector onboarding",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/connectors/custom/about"
  },
  {
    "category": "Manageability capabilities",
    "capability": "Connector health status dashboard",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/connectors-monitoring"
  },
  {
    "category": "Manageability capabilities",
    "capability": "Crawl error diagnostics",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/crawling-faq"
  },
  {
    "category": "Manageability capabilities",
    "capability": "Deletion and stale-content cleanup",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/crawling-deletion"
  },
  {
    "category": "Manageability capabilities",
    "capability": "Change-rate and crawl-rate tracking",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/crawling-faq"
  }
]
