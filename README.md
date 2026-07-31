# Sync Connector Capability Dashboard

Public React dashboard scaffold for comparing Microsoft synced connector capabilities against Glean, OpenAI, and Claude.

## What it includes

- Executive scorecard for synced connector capability position
- Capability matrix with Lead, Closing gaps, Lag, Capability difference, and Not evaluated states
- Taxonomy for catalog coverage, ingestion, permissions, setup, and manageability
- Drill-down sections for connector domains, evidence review, and PM workflow

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Notes

- This repo intentionally excludes the confidential source PDFs from version control.
- The current implementation is a static Vite + React dashboard and is ready for your next code additions.