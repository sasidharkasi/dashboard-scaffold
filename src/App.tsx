import { capabilityRows, type Binary } from './data/capabilityComparison'

function cellClass(value: Binary) {
  return value === 'Yes' ? 'binary yes' : 'binary no'
}

function App() {
  const groupedRows = capabilityRows.reduce<Record<string, typeof capabilityRows>>((acc, row) => {
    if (!acc[row.category]) {
      acc[row.category] = []
    }
    acc[row.category].push(row)
    return acc
  }, {})

  const categories = Object.entries(groupedRows)

  return (
    <main className="clean-shell">
      <h1>Synced Connector Capability Gap View</h1>
      <p className="subhead">Scope is limited to synced connector capabilities only. Focus: where Copilot is missing.</p>

      {categories.map(([category, rows]) => {
        const missingCount = rows.filter((row) => row.missingInCopilot === 'Yes').length

        return (
          <section key={category} className="category-block">
            <div className="category-head">
              <h2>{category}</h2>
              <p>
                {rows.length} capabilities, {missingCount} missing in Copilot
              </p>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Capability</th>
                    <th>Glean Baseline</th>
                    <th>Copilot Connectors</th>
                    <th>Missing In Copilot</th>
                    <th>Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={`${category}-${row.capability}`}>
                      <td>{row.capability}</td>
                      <td className={cellClass(row.gleanBaseline)}>{row.gleanBaseline}</td>
                      <td className={cellClass(row.copilotConnectors)}>{row.copilotConnectors}</td>
                      <td className={cellClass(row.missingInCopilot)}>{row.missingInCopilot}</td>
                      <td>
                        {row.evidenceUrl ? (
                          <a href={row.evidenceUrl} target="_blank" rel="noreferrer">
                            Source
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )
      })}
    </main>
  )
}

export default App