import { useEffect, useState } from 'react'
import { normalizeCollectionResponse } from '../lib/api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const codespaceName = (import.meta.env.VITE_CODESPACE_NAME ?? '').trim()
  const teamsEndpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(teamsEndpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setTeams(normalizeCollectionResponse(payload))
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load teams')
      } finally {
        setIsLoading(false)
      }
    }

    void loadTeams()
  }, [teamsEndpoint])

  if (isLoading) {
    return <p className="status">Loading teams...</p>
  }

  if (error) {
    return <p className="status error">{error}</p>
  }

  return (
    <section className="view-section">
      <h2>Teams</h2>
      <p className="subtitle">Competitive team standings and progress.</p>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Team</th>
              <th>Points</th>
              <th>Captain</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id ?? team.name}>
                <td>{team.name ?? 'N/A'}</td>
                <td>{team.points ?? 0}</td>
                <td>{team.captainEmail ?? 'N/A'}</td>
                <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Teams
