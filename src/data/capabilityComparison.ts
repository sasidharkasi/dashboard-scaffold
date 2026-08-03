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
  },
  {
    "category": "Ingestion & Freshness",
    "capability": "Multi-phase crawling and indexing",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/crawling-frequency"
  },
  {
    "category": "Ingestion & Freshness",
    "capability": "Webhook-based real-time updates",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/crawling-deletion"
  },
  {
    "category": "Ingestion & Freshness",
    "capability": "Change rate and crawl rate monitoring",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/crawling-faq"
  },
  {
    "category": "Ingestion & Freshness",
    "capability": "Deletion handling and cleanup",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/crawling-deletion"
  },
  {
    "category": "Ingestion & Freshness",
    "capability": "Crawl scheduling and frequency control",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/crawling-frequency"
  },
  {
    "category": "Permissions & Security",
    "capability": "Permission mirroring enforcement",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/security/security-principles"
  },
  {
    "category": "Permissions & Security",
    "capability": "Role-based access control (RBAC)",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/about"
  },
  {
    "category": "Permissions & Security",
    "capability": "Tool and action-level access controls",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/tools/managing-tools/managing-role-based-access-tools"
  },
  {
    "category": "Permissions & Security",
    "capability": "MCP server moderator role",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/tools/managing-tools/managing-role-based-access-tools"
  },
  {
    "category": "Permissions & Security",
    "capability": "Audit logging and traceability",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/security/security-principles"
  },
  {
    "category": "Permissions & Security",
    "capability": "Permission-aware sharing for chats",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/user-guide/assistant/html-artifacts"
  },
  {
    "category": "Permissions & Security",
    "capability": "Human-in-the-loop write action confirmations",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/security/security-principles"
  },
  {
    "category": "Setup & Configuration",
    "capability": "Admin console centralized management",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/about"
  },
  {
    "category": "Setup & Configuration",
    "capability": "Connector configuration and management",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/getting-started"
  },
  {
    "category": "Setup & Configuration",
    "capability": "OAuth and SSO configuration",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/oauth/authorization-server"
  },
  {
    "category": "Setup & Configuration",
    "capability": "LLM model hub configuration",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/llms"
  },
  {
    "category": "Setup & Configuration",
    "capability": "Tool and MCP server setup",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/tools/setup-tools"
  },
  {
    "category": "Setup & Configuration",
    "capability": "Admin Chat assistant",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/about"
  },
  {
    "category": "Setup & Configuration",
    "capability": "Multi-cloud deployment options",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/llms"
  },
  {
    "category": "Observability & Admin Operations",
    "capability": "Adoption and engagement insights",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/insights/agents"
  },
  {
    "category": "Observability & Admin Operations",
    "capability": "Agent insights and quality metrics",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/insights/agents"
  },
  {
    "category": "Observability & Admin Operations",
    "capability": "MCP usage and adoption tracking",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/platform/mcp/about"
  },
  {
    "category": "Observability & Admin Operations",
    "capability": "Billing and usage dashboards",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/management/usage/flexcredits-dashboard"
  },
  {
    "category": "Observability & Admin Operations",
    "capability": "Connector health and status monitoring",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/connectors-monitoring"
  },
  {
    "category": "Observability & Admin Operations",
    "capability": "Admin recommendations dashboard",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/administration/management/notifications/admin-notifications-dashboard"
  },
  {
    "category": "Search & Assistant Experience",
    "capability": "Unified enterprise search",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/connectors/connectors-power-glean"
  },
  {
    "category": "Search & Assistant Experience",
    "capability": "Real-time voice conversations",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/user-guide/assistant/real-time-voice"
  },
  {
    "category": "Search & Assistant Experience",
    "capability": "Deep Research agent",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/user-guide/assistant/deep-research"
  },
  {
    "category": "Search & Assistant Experience",
    "capability": "Interactive artifacts and Canvas",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/user-guide/assistant/html-artifacts"
  },
  {
    "category": "Search & Assistant Experience",
    "capability": "Slide deck generation with templates",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/assistant/features/slide-deck-generation"
  },
  {
    "category": "Search & Assistant Experience",
    "capability": "Code search and codebase navigation",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/user-guide/assistant/code-search"
  },
  {
    "category": "Search & Assistant Experience",
    "capability": "Web search integration",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/tools/setup-tools/web-search-tools-setup"
  },
  {
    "category": "Search & Assistant Experience",
    "capability": "Adaptive reasoning",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/assistant/features/adaptive-reasoning"
  },
  {
    "category": "Search & Assistant Experience",
    "capability": "Chat history search and queuing",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/user-guide/assistant/glean-chat/search-past-chats"
  },
  {
    "category": "Governance & Compliance",
    "capability": "Model governance by department",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/llms"
  },
  {
    "category": "Governance & Compliance",
    "capability": "Per-user and per-agent usage limits",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/management/usage/gleancoresuite-dashboard"
  },
  {
    "category": "Governance & Compliance",
    "capability": "Skills governance and publishing",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/managing-skills"
  },
  {
    "category": "Governance & Compliance",
    "capability": "Agent bulk cleanup and lifecycle management",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/managing-agents/deleting-and-restoring-agents"
  },
  {
    "category": "Governance & Compliance",
    "capability": "Compliance and SOC2 documentation",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/security"
  },
  {
    "category": "Governance & Compliance",
    "capability": "Data encryption and tenant isolation",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/security/security-principles"
  },
  {
    "category": "AI Agents & Automation",
    "capability": "Auto Mode autonomous agents",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/agents/auto-mode-agent"
  },
  {
    "category": "AI Agents & Automation",
    "capability": "Workflow/Plan & Execute agents",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/agents/create-powerful-agent"
  },
  {
    "category": "AI Agents & Automation",
    "capability": "Event-triggered agent automation",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/agents/concepts/content-trigger"
  },
  {
    "category": "AI Agents & Automation",
    "capability": "Cross-agent collaboration and sub-agents",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/platform/expose-agents-over-a2a"
  },
  {
    "category": "AI Agents & Automation",
    "capability": "Multi-turn agent conversations",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/agents/auto-mode-agent"
  },
  {
    "category": "AI Agents & Automation",
    "capability": "Agent tools and action execution",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/tools/setup-tools/jira-tools-setup"
  },
  {
    "category": "AI Agents & Automation",
    "capability": "Glean Assistant on external AI platforms",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/administration/platform/a2a-server"
  },
  {
    "category": "AI Agents & Automation",
    "capability": "Glean agents as MCP tools",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/platform/mcp/agents-as-tools"
  },
  {
    "category": "AI Agents & Automation",
    "capability": "LLM selection in agents",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/agents/auto-mode-agent"
  },
  {
    "category": "Platform Integration & Ecosystems",
    "capability": "Glean MCP server and remote MCP support",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/platform/mcp/about"
  },
  {
    "category": "Platform Integration & Ecosystems",
    "capability": "MCP Gateway and external tool access",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/platform/mcp/mcp-gateway"
  },
  {
    "category": "Platform Integration & Ecosystems",
    "capability": "Embedded integrations (Slack, Teams, ServiceNow, Zendesk)",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/platform/embedded-integrations"
  },
  {
    "category": "Platform Integration & Ecosystems",
    "capability": "Slack public channel answers",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/public-mode-glean-slack-channel"
  },
  {
    "category": "Platform Integration & Ecosystems",
    "capability": "ChatGPT app marketplace integration",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/administration/platform/mcp/host-guides/chatgpt"
  },
  {
    "category": "Platform Integration & Ecosystems",
    "capability": "GitHub Copilot and IDE extensions",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/administration/platform/embedded-integrations/github-copilot-extension-install"
  },
  {
    "category": "Content & Knowledge Organization",
    "capability": "Projects and content organization",
    "gleanBaseline": "Yes",
    "copilotConnectors": "Yes",
    "missingInCopilot": "No",
    "evidenceUrl": "https://docs.glean.com/user-guide/knowledge/projects/how-projects-work"
  },
  {
    "category": "Content & Knowledge Organization",
    "capability": "Browser extension and sidebar access",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/user-guide/apps/installing-the-browser-extension"
  },
  {
    "category": "Content & Knowledge Organization",
    "capability": "Personal skills and capability libraries",
    "gleanBaseline": "Yes",
    "copilotConnectors": "No",
    "missingInCopilot": "Yes",
    "evidenceUrl": "https://docs.glean.com/user-guide/assistant/skills"
  }
]
