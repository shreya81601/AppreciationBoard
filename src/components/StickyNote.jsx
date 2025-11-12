import React, { useState } from 'react'
import { db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'

/**
 * StickyNote Component
 *
 * Displays a single appreciation note as a sticky note card.
 * - Front: Shows the role, date, and appreciation message
 * - Back: Shows the teacher's response (if any) or a button to add one
 * - Flips on hover using CSS 3D transforms
 */
function StickyNote({ appreciation, onDelete }) {
  const [isAddingResponse, setIsAddingResponse] = useState(false)
  const [responseText, setResponseText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Array of pastel colors for sticky notes - expanded for more variety
  const pastelColors = [
    'bg-yellow-100',
    'bg-pink-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-purple-100',
    'bg-orange-100',
    'bg-red-100',
    'bg-indigo-100',
    'bg-lime-100',
    'bg-cyan-100',
    'bg-fuchsia-100',
    'bg-rose-100',
    'bg-amber-100',
    'bg-emerald-100',
    'bg-sky-100',
    'bg-violet-100',
  ]

  // Generate consistent color based on ID using better hash
  const getColorIndex = (id) => {
    if (!id) return 0
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash)
    }
    return Math.abs(hash) % pastelColors.length
  }

  const bgColor = pastelColors[getColorIndex(appreciation.id)]

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  // Handle adding/updating teacher response
  const handleSubmitResponse = async (e) => {
    e.preventDefault()
    e.stopPropagation() // Prevent card flip during submission

    if (!responseText.trim()) return

    setIsSubmitting(true)

    try {
      // Update Firestore document
      const docRef = doc(db, 'appreciations', appreciation.id)
      await updateDoc(docRef, {
        response: responseText.trim(),
      })

      setIsAddingResponse(false)
      setResponseText('')
      // Success - the real-time listener will update the UI
    } catch (error) {
      console.error('Error updating response:', error)
      alert('Failed to add response. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flip-card h-64 w-full">
      <div className="flip-card-inner">
        {/* FRONT OF CARD */}
        <div className={`flip-card-front ${bgColor} shadow-lg border-2 border-gray-200`}>
          <div className="flex flex-col h-full">
            {/* Header with role and date */}
            <div className="flex justify-between items-start mb-3">
              <span className="inline-block bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                {appreciation.role}
              </span>
              <span className="text-xs text-gray-600">
                {formatDate(appreciation.createdAt)}
              </span>
            </div>

            {/* Message */}
            <div className="flex-1 overflow-y-auto">
              <p className="text-gray-800 text-sm leading-relaxed break-words">
                {appreciation.message}
              </p>
            </div>

            {/* Hover hint */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500 italic">
                {appreciation.response ? '🔄 Hover to see teacher\'s response' : '🔄 Hover to add response'}
              </p>
            </div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className={`flip-card-back ${bgColor} shadow-lg border-2 border-gray-200`}>
          <div className="flex flex-col h-full">
            <h3 className="font-bold text-gray-700 mb-3 text-center border-b pb-2">
              Teacher's Response
            </h3>

            {appreciation.response ? (
              // Display existing response
              <div className="flex-1 overflow-y-auto">
                <p className="text-gray-800 text-sm leading-relaxed italic break-words">
                  "{appreciation.response}"
                </p>
              </div>
            ) : isAddingResponse ? (
              // Form to add response
              <form
                onSubmit={handleSubmitResponse}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex flex-col"
              >
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Enter teacher's response..."
                  className="flex-1 w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  autoFocus
                  disabled={isSubmitting}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !responseText.trim()}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-3 py-2 rounded text-sm font-semibold transition"
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsAddingResponse(false)
                      setResponseText('')
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded text-sm font-semibold transition"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // Button to start adding response
              <div className="flex-1 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsAddingResponse(true)
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition transform hover:scale-105"
                >
                  + Add Response
                </button>
              </div>
            )}

            {/* Optional delete button for testing */}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (window.confirm('Delete this appreciation?')) {
                    onDelete(appreciation.id)
                  }
                }}
                className="mt-2 text-xs text-red-600 hover:text-red-800 transition"
              >
                🗑️ Delete (Testing Only)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StickyNote
