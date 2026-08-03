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
    capability: 'ServiceNow connector available',
    copilotConnectors: 'Yes',
    openAi: 'No',
    claude: 'No',
    glean: 'Yes',
  },
  {
    capability: 'Incremental sync',
    copilotConnectors: 'Yes',
    openAi: 'No',
    claude: 'No',
    glean: 'Yes',
  },
  {
    capability: 'Permission-aware indexing',
    copilotConnectors: 'Yes',
    openAi: 'No',
    claude: 'No',
    glean: 'Yes',
  },
  {
    capability: 'Admin pause and resume controls',
    copilotConnectors: 'Yes',
    openAi: 'No',
    claude: 'No',
    glean: 'Yes',
  },
  {
    capability: 'Connector-level observability',
    copilotConnectors: 'Yes',
    openAi: 'No',
    claude: 'No',
    glean: 'Yes',
  },
]