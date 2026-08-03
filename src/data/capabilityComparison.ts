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
    "category": "Connector Coverage",
    "capability": "Native connector portfolio",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/connectors/"
  },
  {
    "category": "Connector Coverage",
    "capability": "Push API and custom connectors",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/about"
  },
  {
    "category": "Connector Coverage",
    "capability": "Live and hybrid access modes",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/about"
  },
  {
    "category": "Connector Coverage",
    "capability": "Panopto video connector",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/native/panopto/"
  },
  {
    "category": "Connector Coverage",
    "capability": "Veeva Vault connector",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/native/veeva-vault/"
  },
  {
    "category": "Connector Coverage",
    "capability": "Autodesk Construction Cloud connector",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/native/autodesk-construction-cloud/"
  },
  {
    "category": "Connector Coverage",
    "capability": "NetSuite MCP support",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/native/netsuite/"
  },
  {
    "category": "Connector Coverage",
    "capability": "BigQuery integration with natural language",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/tools/connector/googlecloud"
  }
]
