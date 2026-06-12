import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setHealth(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="health-page">
      <h1>Service Health Monitor</h1>
      {loading && <p>Checking service health…</p>}
      {error && <p className="status-down">Error: {error}</p>}
      {health && (
        <div className="health-card">
          <p><strong>Service:</strong> {health.service}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={health.status === 'UP' ? 'status-up' : 'status-down'}>
              {health.status}
            </span>
          </p>
          <p><strong>Timestamp:</strong> {health.timestamp}</p>
        </div>
      )}
    </div>
  )
}

export default App

