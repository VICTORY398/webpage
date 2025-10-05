import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const IntroVideo = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Auto-navigate after 3 seconds for testing
    const timer = setTimeout(() => {
      navigate('/mission-brief')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-orbitron text-blue-400 mb-4">
          Intro Video Loading...
        </h1>
        <p className="text-xl text-white mb-8">
          Redirecting to Mission Brief in 3 seconds
        </p>
        <button
          onClick={() => navigate('/mission-brief')}
          className="px-8 py-3 bg-blue-600 text-white font-orbitron rounded-lg hover:bg-blue-700 transition-all"
        >
          Skip to Mission Brief
        </button>
      </div>
    </div>
  )
}

export default IntroVideo