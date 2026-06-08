import { useEffect, useState } from 'react'
import { normalizeCollectionResponse } from '../lib/api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const codespaceName = (import.meta.env.VITE_CODESPACE_NAME ?? '').trim()
  const workoutsEndpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(workoutsEndpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setWorkouts(normalizeCollectionResponse(payload))
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load workouts')
      } finally {
        setIsLoading(false)
      }
    }

    void loadWorkouts()
  }, [workoutsEndpoint])

  if (isLoading) {
    return <p className="status">Loading workouts...</p>
  }

  if (error) {
    return <p className="status error">{error}</p>
  }

  return (
    <section className="view-section">
      <h2>Workouts</h2>
      <p className="subtitle">Personalized workouts sorted by difficulty and duration.</p>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Duration (min)</th>
              <th>Focus</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout._id ?? workout.title}>
                <td>{workout.title ?? 'N/A'}</td>
                <td className="text-capitalize">{workout.difficulty ?? 'N/A'}</td>
                <td>{workout.durationMinutes ?? 0}</td>
                <td>{workout.focusArea ?? 'General Fitness'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Workouts
