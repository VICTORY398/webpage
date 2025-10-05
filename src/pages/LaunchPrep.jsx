import { useNavigate } from 'react-router-dom'

const LaunchPrep = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-space-black to-space-grey">
      <div className="bg-space-grey bg-opacity-90 backdrop-blur-md rounded-2xl p-8 max-w-lg mx-4 text-center border border-neon-blue border-opacity-30">
        <div className="text-8xl mb-6">🚀</div>
        
        <h2 className="text-3xl font-orbitron font-bold gradient-text mb-6">
          Launch Preparation
        </h2>
        
        <p className="text-2xl font-rajdhani mb-8 text-white">
          You can go to space now!
        </p>
        
        <button
          onClick={() => navigate('/rocket-launch')}
          className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-orbitron font-bold rounded-lg hover:scale-105 transition-all duration-300 border border-orange-400"
        >
          🚀 LAUNCH ROCKET
        </button>
      </div>
    </div>
  )
}

export default LaunchPrep