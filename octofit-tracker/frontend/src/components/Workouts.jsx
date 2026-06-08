import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const result = await fetchCollection('workouts')
        setWorkouts(result.items)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load workouts')
      } finally {
        setIsLoading(false)
      }
    }

    void loadWorkouts()
  }, [])

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
