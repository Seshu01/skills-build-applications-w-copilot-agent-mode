import { useEffect, useState } from 'react'
import { normalizeCollectionResponse } from '../lib/api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const codespaceName = (import.meta.env.VITE_CODESPACE_NAME ?? '').trim()
  const activitiesEndpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(activitiesEndpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setActivities(normalizeCollectionResponse(payload))
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load activities')
      } finally {
        setIsLoading(false)
      }
    }

    void loadActivities()
  }, [activitiesEndpoint])

  if (isLoading) {
    return <p className="status">Loading activities...</p>
  }

  if (error) {
    return <p className="status error">{error}</p>
  }

  return (
    <section className="view-section">
      <h2>Activities</h2>
      <p className="subtitle">Recent logged workouts and sessions.</p>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Minutes</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.userEmail}-${activity.activityDate}`}>
                <td>{activity.userEmail ?? 'N/A'}</td>
                <td>{activity.activityType ?? 'N/A'}</td>
                <td>{activity.durationMinutes ?? 0}</td>
                <td>{activity.caloriesBurned ?? 0}</td>
                <td>{activity.activityDate ? new Date(activity.activityDate).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities
