import { useEffect, useState } from 'react'
import { getApiBaseUrl, normalizeCollectionResponse } from '../lib/api'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const usersEndpoint = `${getApiBaseUrl()}/users/`

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(usersEndpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setUsers(normalizeCollectionResponse(payload))
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load users')
      } finally {
        setIsLoading(false)
      }
    }

    void loadUsers()
  }, [usersEndpoint])

  if (isLoading) {
    return <p className="status">Loading users...</p>
  }

  if (error) {
    return <p className="status error">{error}</p>
  }

  return (
    <section className="view-section">
      <h2>Users</h2>
      <p className="subtitle">Athlete profiles from the API.</p>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Fitness Level</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id ?? user.email}>
                <td>{user.name ?? 'N/A'}</td>
                <td>{user.email ?? 'N/A'}</td>
                <td className="text-capitalize">{user.fitnessLevel ?? 'N/A'}</td>
                <td>{user.teamName ?? 'Unassigned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Users
