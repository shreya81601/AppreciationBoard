import React from 'react'

/**
 * LandingPage Component
 *
 * Displays the welcome message for Appreciation Week and provides context
 * for what users will be doing on the next page.
 */
function LandingPage({ onNext }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-3xl bg-white rounded-2xl shadow-2xl p-6 md:p-10">
        <div className="mb-6">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-purple-700 mb-2">
              Welcome to
            </h2>
            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-4">
              🎉 Appreciation Board! 🎉
            </h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
        </div>

        <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
          <p>
            This space is for celebrating math teachers — the ones who work tirelessly to make learning meaningful and fun, often without recognition.
          </p>

          <p>
            Take a moment to leave a note of appreciation for a math teacher who made a difference in your life. Your message will appear on our shared board, alongside others' notes of gratitude.
          </p>

          <p>
            After posting, we invite you to share your message directly with your teacher — and when you hear back, come add their response here. We'd love to know what impact this small act of kindness created.
          </p>

          <p className="font-semibold text-center">
            Let's spread joy and make them feel valued!
          </p>

          <p className="text-center text-gray-600 italic text-sm">
            Click "Next" to begin.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
