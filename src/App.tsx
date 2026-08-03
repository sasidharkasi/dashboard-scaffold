import { capabilityRows, type Binary } from './data/capabilityComparison'

function cellClass(value: Binary) {
  return value === 'Yes' ? 'binary yes' : 'binary no'
}

function App() {
  return (
    <main className="clean-shell">
      <h1>Glean-Pivot Capability Gap View</h1>
      <p className="subhead">All rows are Glean baseline capabilities. Focus: what Copilot connectors is missing.</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Capability</th>
              <th>Glean Baseline</th>
              <th>Copilot Connectors</th>
              <th>Missing In Copilot</th>
            </tr>
          </thead>
          <tbody>
            {capabilityRows.map((row) => (
              <tr key={row.capability}>
                <td>{row.capability}</td>
                <td className={cellClass(row.gleanBaseline)}>{row.gleanBaseline}</td>
                <td className={cellClass(row.copilotConnectors)}>{row.copilotConnectors}</td>
                <td className={cellClass(row.missingInCopilot)}>{row.missingInCopilot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default App