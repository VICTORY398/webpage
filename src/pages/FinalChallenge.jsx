import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import CelebrationScreen from '../components/CelebrationScreen'

const FinalChallenge = () => {
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showCredits, setShowCredits] = useState(false)

  const handleGameComplete = () => {
    setGameCompleted(true)
    setTimeout(() => {
      setShowCredits(true)
    }, 3000)
  }

  // Simulate game completion for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      handleGameComplete()
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  if (showCredits) {
    return <CelebrationScreen />
  }

  if (gameCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-900 via-space-black to-green-900 flex items-center justify-center relative overflow-hidden"
      >
        <div className="stars-bg fixed inset-0 opacity-30"></div>
        
        {/* Victory Pulse Effect */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-green-400 rounded-full"
        />
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-center z-10"
        >
          {/* Animated Earth with Celebration */}
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="text-8xl"
            >
              🌍
            </motion.div>
            
            {/* Orbiting Success Icons */}
            {['✨', '🎉', '⭐', '🎊'].map((icon, i) => (
              <motion.div
                key={icon}
                className="absolute text-3xl"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0'
                }}
                animate={{
                  rotate: 360,
                  x: Math.cos((i * 90) * Math.PI / 180) * 80,
                  y: Math.sin((i * 90) * Math.PI / 180) * 80
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.25
                }}
              >
                {icon}
              </motion.div>
            ))}
          </div>
          
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              textShadow: [
                "0 0 20px #00ff00",
                "0 0 40px #00ff00, 0 0 60px #ffff00",
                "0 0 20px #00ff00"
              ]
            }}
            transition={{ 
              scale: { duration: 1, times: [0, 0.6, 1] },
              textShadow: { duration: 1.5, repeat: Infinity }
            }}
            className="text-6xl font-orbitron font-bold text-green-400 mb-4"
          >
            🎯 SUCCESS! 🎯
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-rajdhani text-white mb-8"
          >
            🤖 Rogue AI Station Neutralized 💥
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="bg-green-900 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto border-2 border-green-400 border-opacity-50"
          >
            <motion.p 
              animate={{ color: ['#86efac', '#ffffff', '#86efac'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-rajdhani text-lg"
            >
              🛡️ Earth's communication systems are safe! 🛡️
              <br />
              🎊 Preparing EPIC victory celebration... 🎊
            </motion.p>
            
            {/* Loading Bar Effect */}
            <div className="mt-4 bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, delay: 1.5 }}
                className="h-full bg-gradient-to-r from-green-400 to-yellow-400"
              />
            </div>
          </motion.div>
          
          {/* Celebration Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  repeatDelay: 1
                }}
              >
                {['🎉', '✨', '🌟', '💫'][i % 4]}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-red-900 via-space-black to-red-900 flex items-center justify-center relative overflow-hidden"
    >
      <div className="stars-bg fixed inset-0 opacity-20"></div>
      
      {/* Danger Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 bg-red-500 opacity-10"
        />
      </div>

      <div className="text-center z-10 max-w-4xl mx-4">
        <motion.h1
          animate={{ 
            textShadow: [
              "0 0 10px #ff0000",
              "0 0 20px #ff0000, 0 0 30px #ff4444",
              "0 0 10px #ff0000"
            ]
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-6xl md:text-8xl font-orbitron font-bold text-red-400 mb-8"
        >
          FINAL CHALLENGE
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-rajdhani text-white mb-8"
        >
          Stop the Rogue AI Space Station!
        </motion.p>

        {/* Game Integration Placeholder */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-space-grey bg-opacity-90 backdrop-blur-md rounded-2xl p-8 border border-red-500 border-opacity-50 mb-8"
        >
          <h3 className="text-2xl font-orbitron text-red-400 mb-6">
            Game Integration Ready
          </h3>
          
          {/* GAME PLACEHOLDER - Replace this section with your mini-game */}
          <div className="bg-space-black rounded-lg p-8 mb-6 border-2 border-dashed border-red-400">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h4 className="text-xl font-orbitron text-red-400 mb-4">
                Mini-Game Integration Point
              </h4>
              <p className="font-rajdhani text-gray-300 mb-4">
                Replace this section with your mini-game component or iframe
              </p>
              <div className="bg-red-900 bg-opacity-30 rounded p-4 text-left font-mono text-sm text-gray-400">
                {`<!-- INTEGRATION EXAMPLE -->
<iframe 
  src="your-game-url" 
  width="100%" 
  height="400px"
  frameborder="0">
</iframe>

<!-- OR REACT COMPONENT -->
<YourGameComponent 
  onComplete={handleGameComplete}
/>`}
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGameComplete}
            className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-orbitron font-bold uppercase tracking-wider rounded-lg transition-all duration-300 border-2 border-red-400"
          >
            Simulate Game Complete (Demo)
          </motion.button>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="bg-space-black bg-opacity-50 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto border border-gray-600"
        >
          <h4 className="text-lg font-orbitron text-neon-blue mb-3">
            Integration Instructions
          </h4>
          <ul className="text-left font-rajdhani text-gray-300 space-y-2">
            <li>• Replace the placeholder div with your mini-game iframe or React component</li>
            <li>• Call handleGameComplete() when the player wins</li>
            <li>• Customize the challenge description and visuals</li>
            <li>• Add your own game logic and interactions</li>
          </ul>
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
          <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default FinalChallenge