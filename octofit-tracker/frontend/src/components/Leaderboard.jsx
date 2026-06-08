import { useEffect, useState } from 'react'
import { getApiBaseUrl, normalizeCollectionResponse } from '../lib/api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const leaderboardEndpoint = `${getApiBaseUrl()}/leaderboard/`

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(leaderboardEndpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setEntries(normalizeCollectionResponse(payload))
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load leaderboard')
      } finally {
        setIsLoading(false)
      }
    }

    void loadLeaderboard()
  }, [leaderboardEndpoint])

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
