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
    "capability": "ServiceNow ITSM incidents & ticket ingestion",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/native/servicenow/about"
  },
  {
    "category": "Connector coverage",
    "capability": "ServiceNow Knowledge Article support with content publishing",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/connectors/native/servicenow/about"
  },
  {
    "category": "Connector coverage",
    "capability": "APM & CMDB Business Application support",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/native/servicenow/about"
  },
  {
    "category": "Set up capabilities",
    "capability": "SAML/OIDC authentication with federated identity",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/connectors/connector-auth-requirements"
  },
  {
    "category": "Set up capabilities",
    "capability": "ServiceNow OAuth application & token lifecycle management",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/connectors/native/servicenow/setup"
  },
  {
    "category": "Set up capabilities",
    "capability": "Permission & ACL mapping - role-based + record-level access",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/connectors/native/servicenow/about"
  },
  {
    "category": "Manageability capabilities",
    "capability": "Connector sync monitoring - initial sync phases & metrics",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/connectors-monitoring"
  },
  {
    "category": "Manageability capabilities",
    "capability": "Connector health metrics & alerting (Crawl rate, Change rate)",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/connectors-health-index"
  },
  {
    "category": "Manageability capabilities",
    "capability": "Connector error handling & credential failure alerts",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/connectors-health-index"
  },
  {
    "category": "Manageability capabilities",
    "capability": "Content deletion & permission sync - webhooks vs full crawl",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/connectors/crawling-deletion"
  },
  {
    "category": "Manageability capabilities",
    "capability": "Crawl scheduling - full vs incremental refresh frequency",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/connectors/crawling-frequency"
  },
  {
    "category": "Manageability capabilities",
    "capability": "Connector visibility controls & test group rollout",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/connectors/connectors-settings-visibility"
  },
  {
    "category": "Connector coverage",
    "capability": "Microsoft Graph schema, semantic labels & search attributes",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/deployment-overview"
  }
]
