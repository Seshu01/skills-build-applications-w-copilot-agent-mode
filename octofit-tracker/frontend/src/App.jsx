import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { getApiBaseUrl } from './lib/api'
import './App.css'
import appLogo from '../../../docs/octofitapp-small.png'

function App() {
  const apiBaseUrl = getApiBaseUrl()

  return (
    <div className="app-shell">
      <header className="masthead">
        <div>
          <p className="eyebrow">OctoFit Tracker</p>
          <h1>Presentation Tier</h1>
          <p className="lead">Monitor users, teams, activities, leaderboard, and workout plans from the backend API.</p>
        </div>
        <img src={appLogo} className="brand-mark" alt="OctoFit logo" />
      </header>

      <section className="config-strip">
        <p>
          API base URL: <span>{apiBaseUrl}</span>
        </p>
      </section>

      <nav className="nav nav-pills nav-wrap">
        <NavLink className="nav-link" to="/users">
          Users
        </NavLink>
        <NavLink className="nav-link" to="/teams">
          Teams
        </NavLink>
        <NavLink className="nav-link" to="/activities">
          Activities
        </NavLink>
        <NavLink className="nav-link" to="/leaderboard">
          Leaderboard
        </NavLink>
        <NavLink className="nav-link" to="/workouts">
          Workouts
        </NavLink>
      </nav>

      <main className="content-card">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
