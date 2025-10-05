import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing Mission Systems...')
  
  // Removed auto-play music

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: 'Loading Space Modules...' },
      { progress: 40, text: 'Connecting to ISS Network...' },
      { progress: 60, text: 'Calibrating Navigation Systems...' },
      { progress: 80, text: 'Preparing Mission Briefing...' },
      { progress: 100, text: 'Launch Ready!' }
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + 1
        
        // Update loading text at specific milestones
        if (currentStep < loadingSteps.length && nextProgress >= loadingSteps[currentStep].progress) {
          setLoadingText(loadingSteps[currentStep].text)
          currentStep++
        }
        
        if (nextProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return nextProgress
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-b from-space-black via-blue-900 to-space-black flex flex-col items-center justify-center z-50"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Animated Stars Background */}
      <div className="stars-bg fixed inset-0 opacity-40"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center z-10 max-w-2xl mx-4"
      >
        {/* Main Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-orbitron font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4"
        >
          NASA SPACE APPS
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-3xl font-rajdhani text-neon-blue mb-12 glow-text"
        >
          ISS 25th Anniversary Mission
        </motion.h2>
        
        {/* Enhanced Progress Bar */}
        <div className="relative w-96 max-w-full mx-auto mb-6">
          <div className="h-4 bg-space-grey rounded-full overflow-hidden border border-neon-blue border-opacity-30">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Animated Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
          
          {/* Progress Percentage */}
          <motion.div
            className="absolute -top-8 right-0 text-2xl font-orbitron font-bold text-neon-blue"
            animate={{ scale: progress === 100 ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5 }}
          >
            {progress}%
          </motion.div>
        </div>
        
        {/* Loading Text with Typewriter Effect */}
        <motion.p
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg md:text-xl font-rajdhani text-gray-300 mb-8"
        >
          {loadingText}
        </motion.p>
        
        {/* Mission Status Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-rajdhani">
          <div className={`p-3 rounded-lg border ${progress >= 25 ? 'border-green-400 bg-green-900 bg-opacity-30' : 'border-gray-600 bg-gray-900 bg-opacity-30'}`}>
            <div className={`w-2 h-2 rounded-full mx-auto mb-2 ${progress >= 25 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
            <div className={progress >= 25 ? 'text-green-400' : 'text-gray-500'}>Systems</div>
          </div>
          <div className={`p-3 rounded-lg border ${progress >= 50 ? 'border-blue-400 bg-blue-900 bg-opacity-30' : 'border-gray-600 bg-gray-900 bg-opacity-30'}`}>
            <div className={`w-2 h-2 rounded-full mx-auto mb-2 ${progress >= 50 ? 'bg-blue-400' : 'bg-gray-600'}`}></div>
            <div className={progress >= 50 ? 'text-blue-400' : 'text-gray-500'}>Network</div>
          </div>
          <div className={`p-3 rounded-lg border ${progress >= 75 ? 'border-purple-400 bg-purple-900 bg-opacity-30' : 'border-gray-600 bg-gray-900 bg-opacity-30'}`}>
            <div className={`w-2 h-2 rounded-full mx-auto mb-2 ${progress >= 75 ? 'bg-purple-400' : 'bg-gray-600'}`}></div>
            <div className={progress >= 75 ? 'text-purple-400' : 'text-gray-500'}>Navigation</div>
          </div>
          <div className={`p-3 rounded-lg border ${progress >= 100 ? 'border-neon-blue bg-blue-900 bg-opacity-30' : 'border-gray-600 bg-gray-900 bg-opacity-30'}`}>
            <div className={`w-2 h-2 rounded-full mx-auto mb-2 ${progress >= 100 ? 'bg-neon-blue animate-pulse' : 'bg-gray-600'}`}></div>
            <div className={progress >= 100 ? 'text-neon-blue' : 'text-gray-500'}>Ready</div>
          </div>
        </div>
      </motion.div>
      
      {/* Holographic Grid Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen