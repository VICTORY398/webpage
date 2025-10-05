import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import VideoScene from '../components/VideoScene'

const CupolaView = () => {
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)
  const [countdown, setCountdown] = useState(60)

  const handleVideoEnd = () => {
    setShowAlert(true)
  }

  useEffect(() => {
    if (showAlert && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      navigate('/final-challenge')
    }
  }, [showAlert, countdown, navigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      {/* VIDEO PLACEHOLDER - Replace with ISS Cupola Earth view footage */}
      <VideoScene
        src="/assets/cupola-earth-view.mp4"
        onEnded={handleVideoEnd}
        autoPlay={true}
        muted={false}
        showSkipButton={true}
        onSkip={() => setShowAlert(true)}
      />

      {/* ISS Interior Overlay */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-800 to-transparent opacity-80"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-800 to-transparent opacity-80"></div>



      {/* Earth Information Panel */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 max-w-sm"
      >
        <div className="bg-black bg-opacity-80 backdrop-blur-sm rounded-lg p-6 border border-neon-blue border-opacity-30">
          <h3 className="text-2xl font-orbitron text-neon-blue mb-4">
            ISS Cupola Benefits
          </h3>
          <div className="space-y-4 font-rajdhani text-gray-300">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-semibold text-white">Earth Observation</div>
                <div className="text-sm">Climate monitoring and disaster response</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-semibold text-white">Robotic Operations</div>
                <div className="text-sm">Controlling robotic arms and spacecraft</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-neon-pink rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-semibold text-white">Scientific Research</div>
                <div className="text-sm">Photography and data collection</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ISS Stats Panel */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute right-8 bottom-32 z-10 max-w-sm"
      >
        <div className="bg-black bg-opacity-80 backdrop-blur-sm rounded-lg p-6 border border-neon-purple border-opacity-30">
          <h3 className="text-xl font-orbitron text-neon-purple mb-4">
            ISS Statistics
          </h3>
          <div className="space-y-2 font-rajdhani text-gray-300 text-sm">
            <div className="flex justify-between">
              <span>Altitude:</span>
              <span className="text-neon-blue">408 km</span>
            </div>
            <div className="flex justify-between">
              <span>Speed:</span>
              <span className="text-neon-blue">27,600 km/h</span>
            </div>
            <div className="flex justify-between">
              <span>Orbit Period:</span>
              <span className="text-neon-blue">90 minutes</span>
            </div>
            <div className="flex justify-between">
              <span>Daily Sunrises:</span>
              <span className="text-neon-blue">16</span>
            </div>
            <div className="flex justify-between">
              <span>Years in Orbit:</span>
              <span className="text-neon-purple">25</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Alert Popup */}
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-red-900 bg-opacity-50 backdrop-blur-sm"
        >
          <div className="bg-space-black border-2 border-red-500 rounded-2xl p-8 max-w-md mx-4 text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🚨
            </motion.div>
            
            <h2 className="text-3xl font-orbitron font-bold text-red-400 mb-4">
              ALERT!
            </h2>
            
            <p className="text-lg font-orbitron text-white mb-6 glow-text">
              🚨 Rogue AI station detected!
              <br />
              You have <span className="text-red-400 font-bold">1</span> minute to save the world!
            </p>
            
            <motion.button
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 0 40px rgba(255, 0, 102, 0.8), 0 0 80px rgba(255, 102, 0, 0.5)",
                textShadow: "0 0 20px rgba(255, 255, 255, 1)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (window.playSound) window.playSound('buttonClick')
                navigate('/final-game')
              }}
              onMouseEnter={() => { if (window.playSound) window.playSound('buttonClick') }}
              className="space-button text-white font-orbitron font-bold uppercase tracking-wider rounded-lg transition-all duration-300 relative overflow-hidden"
              style={{
                background: 'linear-gradient(45deg, #ff0066, #ff6600, #ff3399)',
                backgroundSize: '300% 300%',
                animation: 'buttonGradient 2s ease infinite',
                border: '3px solid rgba(255, 0, 102, 0.6)',
                boxShadow: '0 0 30px rgba(255, 0, 102, 0.8)'
              }}
            >
              <span className="relative z-10">🚨 START CHALLENGE</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          </div>
        </motion.div>
      )}



      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default CupolaView