import React, { useState, useEffect, useRef } from 'react'
import { db } from '../firebase'
import {
  ref,
  push,
  set,
  onValue,
  remove,
  serverTimestamp,
} from 'firebase/database'
import StickyNote from './StickyNote'

/**
 * Board Component
 *
 * Main appreciation board that:
 * - Allows users to submit new appreciations
 * - Displays all appreciations in a sticky note grid
 * - Filters by role (Student/Parent/Admin/All)
 * - Real-time updates when new appreciations are added (using Realtime Database onValue)
 * - Allows adding teacher responses to existing notes
 */
function Board() {
  const [appreciations, setAppreciations] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Form state
  const [role, setRole] = useState('Student')
  const [message, setMessage] = useState('')

  // Filter state
  const [filterRole, setFilterRole] = useState('All')

  // Toast notification state
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Ref for textarea to enable refocus after submission
  const textareaRef = useRef(null)

  /**
   * Submit a new appreciation to Firebase Realtime Database
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!message.trim()) {
      showToastNotification('Please write a message')
      return
    }

    setSubmitting(true)

    // Safety timeout to force reset after 10 seconds
    const safetyTimeout = setTimeout(() => {
      console.warn('Form submission took too long, forcing reset')
      setSubmitting(false)
      setMessage('')
    }, 10000)

    try {
      // Add new item to Realtime Database 'appreciations' node
      const appreciationsRef = ref(db, 'appreciations')
      const newAppreciationRef = push(appreciationsRef)

      await set(newAppreciationRef, {
        role,
        message: message.trim(),
        response: null,
        createdAt: serverTimestamp(), // Use Firebase server timestamp
      })

      clearTimeout(safetyTimeout)
      showToastNotification('✅ Appreciation submitted! Thank you!')

      // Scroll to top to see the new note
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 500)
    } catch (error) {
      clearTimeout(safetyTimeout)
      console.error('Error submitting appreciation:', error)
      showToastNotification('❌ Failed to submit. Please try again.')
    } finally {
      // Ensure proper cleanup and re-enable form
      setSubmitting(false)

      // Clear form and refocus with a small delay to ensure state updates
      setTimeout(() => {
        setMessage('')
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus()
          }
        }, 100)
      }, 100)
    }
  }

  /**
   * Delete an appreciation (for testing purposes)
   */
  const handleDelete = async (id) => {
    try {
      // Delete item from Realtime Database
      const appreciationRef = ref(db, `appreciations/${id}`)
      await remove(appreciationRef)
      showToastNotification('Appreciation deleted')
    } catch (error) {
      console.error('Error deleting appreciation:', error)
      showToastNotification('Failed to delete')
    }
  }

  /**
   * Show toast notification
   */
  const showToastNotification = (message) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  /**
   * Set up real-time listener for Realtime Database
   * Automatically updates when data is added, modified, or deleted
   */
  useEffect(() => {
    // Reference to appreciations node
    const appreciationsRef = ref(db, 'appreciations')

    // Set up real-time listener with onValue
    const unsubscribe = onValue(
      appreciationsRef,
      (snapshot) => {
        const data = snapshot.val()

        if (data) {
          // Convert object to array and add IDs
          const appreciationsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
            // Convert timestamp to Date for display
            createdAt: data[key].createdAt || new Date().getTime(),
          }))

          // Sort by creation time (newest first)
          appreciationsArray.sort((a, b) => b.createdAt - a.createdAt)

          setAppreciations(appreciationsArray)
        } else {
          // No data exists yet
          setAppreciations([])
        }

        setLoading(false)
      },
      (error) => {
        console.error('Error fetching appreciations:', error)
        showToastNotification('Failed to load appreciations')
        setLoading(false)
      }
    )

    // Cleanup listener on unmount
    return () => unsubscribe()
  }, [])

  // Filter appreciations by role
  const filteredAppreciations =
    filterRole === 'All'
      ? appreciations
      : appreciations.filter((item) => item.role === filterRole)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 shadow-md">
        <div className="text-center py-6">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-2">
            Dear Math Teacher,
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-pink-700">
            we appreciate you because...
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Controls */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-3 flex gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-700 self-center mr-2">
              Filter by:
            </span>
            {['All', 'Student', 'Parent', 'Admin'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilterRole(filterOption)}
                className={`px-4 py-1 rounded-full text-sm font-semibold transition ${
                  filterRole === filterOption
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading appreciations...</p>
          </div>
        )}

        {/* Appreciations Grid */}
        {!loading && filteredAppreciations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {filterRole === 'All'
                ? 'No appreciations yet. Be the first to share! 🌟'
                : `No appreciations from ${filterRole.toLowerCase()}s yet.`}
            </p>
          </div>
        )}

        {!loading && filteredAppreciations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredAppreciations.map((appreciation) => (
              <StickyNote
                key={appreciation.id}
                appreciation={appreciation}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Submission Form - Now at the bottom */}
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto mt-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {/* Role Selector */}
              <div className="md:w-1/4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  I am a:
                </label>
                <div className="flex flex-col gap-2">
                  {['Student', 'Parent', 'Admin'].map((roleOption) => (
                    <button
                      key={roleOption}
                      type="button"
                      onClick={() => setRole(roleOption)}
                      className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                        role === roleOption
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {roleOption}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Text Area - Wider and Thinner */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your appreciation:
                </label>
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share why you appreciate your math teacher..."
                  rows="3"
                  className={`w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition resize-none ${
                    submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={submitting}
                />
              </div>

              {/* Submit Button */}
              <div className="md:w-1/6 flex items-end">
                <button
                  type="submit"
                  disabled={submitting || !message.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-lg shadow-md transform transition hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {submitting ? 'Submitting...' : '💌 Submit'}
                </button>
              </div>
            </div>

            {/* Helpful copy about the two-step flow */}
            <div className="mt-4 p-3 bg-purple-50 border-l-4 border-purple-600 rounded">
              <p className="text-sm text-gray-700">
                <strong>💡 Tip:</strong> After submitting, reach out to your teacher directly to share this appreciation! Then come back later to add their response by hovering over your note and clicking "Add Response" on the back.
              </p>
            </div>
          </form>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  )
}

export default Board
