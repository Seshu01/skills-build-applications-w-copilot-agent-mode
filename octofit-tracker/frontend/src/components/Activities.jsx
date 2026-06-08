import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const result = await fetchCollection('activities')
        setActivities(result.items)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load activities')
      } finally {
        setIsLoading(false)
      }
    }

    void loadActivities()
  }, [])

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
