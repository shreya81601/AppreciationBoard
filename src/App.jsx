import React, { useState } from 'react'
import LandingPage from './components/LandingPage'
import Board from './components/Board'

/**
 * Main App Component
 *
 * Manages the simple navigation between:
 * 1. Landing Page (welcome message)
 * 2. Board Page (appreciation board)
 *
 * No routing library needed - just a simple state toggle.
 */
function App() {
  const [showBoard, setShowBoard] = useState(false)

  return (
    <div className="App">
      {!showBoard ? (
        <LandingPage onNext={() => setShowBoard(true)} />
      ) : (
        <Board />
      )}
    </div>
  )
}

export default App
