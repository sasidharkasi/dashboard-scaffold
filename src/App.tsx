import { capabilityRows, type Binary } from './data/capabilityComparison'

function cellClass(value: Binary) {
  return value === 'Yes' ? 'binary yes' : 'binary no'
}

function App() {
  return (
    <main className="clean-shell">
      <h1>Capability Comparison</h1>
      <p className="subhead">Binary support matrix across Copilot connectors, OpenAI, Claude, and Glean.</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Capability</th>
              <th>Copilot Connectors</th>
              <th>OpenAI</th>
              <th>Claude</th>
              <th>Glean</th>
            </tr>
          </thead>
          <tbody>
            {capabilityRows.map((row) => (
              <tr key={row.capability}>
                <td>{row.capability}</td>
                <td className={cellClass(row.copilotConnectors)}>{row.copilotConnectors}</td>
                <td className={cellClass(row.openAi)}>{row.openAi}</td>
                <td className={cellClass(row.claude)}>{row.claude}</td>
                <td className={cellClass(row.glean)}>{row.glean}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default App