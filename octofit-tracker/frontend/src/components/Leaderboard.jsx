import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const result = await fetchCollection('leaderboard')
        setEntries(result.items)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load leaderboard')
      } finally {
        setIsLoading(false)
      }
    }

    void loadLeaderboard()
  }, [])

  if (isLoading) {
    return <p className="status">Loading leaderboard...</p>
  }

  if (error) {
    return <p className="status error">{error}</p>
  }

  return (
    <section className="view-section">
      <h2>Leaderboard</h2>
      <p className="subtitle">Top performers across the OctoFit challenge.</p>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id ?? `${entry.rank}-${entry.userEmail}`}>
                <td>{entry.rank ?? '-'}</td>
                <td>{entry.userEmail ?? 'N/A'}</td>
                <td>{entry.points ?? 0}</td>
                <td>{entry.teamName ?? 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard
